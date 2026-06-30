#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const root = process.cwd();
const port = Number(valueOf("--port") || 9333);
const host = valueOf("--host") || "127.0.0.1";
const waitMs = Number(valueOf("--wait-ms") || 8000);
const outDir = valueOf("--out-dir") || "docs/tax-cloud/network-har";
const reportPath = valueOf("--report") || "docs/tax-cloud/TAX_CLOUD_CDP_CAPTURE_REPORT.md";
const all = args.includes("--all");
const minimal = args.includes("--minimal");
const includeFrozen = args.includes("--include-frozen");
const limit = Number(valueOf("--limit") || 0);
const requestedPages = args
  .filter((arg) => !arg.startsWith("--"))
  .flatMap((arg) => arg.split(","))
  .map((arg) => arg.trim())
  .filter(Boolean);

const frozenPageKeys = new Set(["platform-created"]);

function valueOf(prefix) {
  const hit = args.find((arg) => arg.startsWith(`${prefix}=`));
  return hit ? hit.slice(prefix.length + 1) : "";
}

function usage() {
  console.log(`Usage:
  node scripts/capture-tax-cloud-cdp-har.mjs --page-key=<key>
  node scripts/capture-tax-cloud-cdp-har.mjs platform-records billCenter-fullInvoiceQuery
  node scripts/capture-tax-cloud-cdp-har.mjs --all --limit=5
  node scripts/capture-tax-cloud-cdp-har.mjs --minimal

Requirements:
  Chrome must be running with a logged-in fp.enuoyun.com profile and a DevTools port,
  for example --remote-debugging-port=9333.

Output:
  Raw HAR files are written to docs/tax-cloud/network-har/ and are git-ignored.
`);
}

async function readJson(relativePath, fallback) {
  try {
    return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

function asPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function shouldKeepPage(page) {
  if (!page?.key || !page?.url) return false;
  if (!includeFrozen && frozenPageKeys.has(page.key)) return false;
  if (minimal) return false;
  if (all) return true;
  return requestedPages.includes(page.key);
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }
  return response.json();
}

async function openCdpTarget(url) {
  // Chrome uses PUT for /json/new in newer versions; GET still works in older builds.
  const endpoint = `http://${host}:${port}/json/new?${encodeURIComponent(url)}`;
  let response = await fetch(endpoint, { method: "PUT" });
  if (!response.ok) response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Cannot create CDP target: ${response.status} ${response.statusText}`);
  return response.json();
}

function createCdpClient(wsUrl) {
  const socket = new WebSocket(wsUrl);
  let nextId = 1;
  const pending = new Map();
  const listeners = new Map();

  socket.addEventListener("message", (event) => {
    const payload = JSON.parse(event.data);
    if (payload.id && pending.has(payload.id)) {
      const { resolve, reject } = pending.get(payload.id);
      pending.delete(payload.id);
      if (payload.error) reject(new Error(payload.error.message || JSON.stringify(payload.error)));
      else resolve(payload.result || {});
      return;
    }
    if (payload.method && listeners.has(payload.method)) {
      for (const listener of listeners.get(payload.method)) listener(payload.params || {});
    }
  });

  const open = new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  return {
    async ready() {
      await open;
    },
    send(method, params = {}) {
      const id = nextId++;
      socket.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
    },
    on(method, listener) {
      const existing = listeners.get(method) || [];
      existing.push(listener);
      listeners.set(method, existing);
    },
    close() {
      socket.close();
    },
  };
}

function parseHeaders(headers = {}) {
  return Object.entries(headers).map(([name, value]) => ({ name, value: String(value) }));
}

function safeUrl(url) {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

function isTaxCloudApi(url) {
  const parsed = safeUrl(url);
  if (!parsed || parsed.hostname !== "fp.enuoyun.com") return false;
  if (isLoginOrShellOnly(parsed)) return false;
  return (
    parsed.pathname.startsWith("/prod-api/") ||
    parsed.pathname.includes("/api/") ||
    parsed.pathname.includes("/bussiness/") ||
    parsed.pathname.includes("/billCenter/") ||
    parsed.pathname.includes("/income/") ||
    parsed.pathname.includes("/analysisBoard/") ||
    parsed.pathname.includes("/system/")
  );
}

function isLoginOrShellOnly(parsed) {
  if (parsed.pathname === "/prod-api/code") return true;
  if (parsed.pathname === "/login") return true;
  const shellPrefixes = [
    "/platform/",
    "/income/",
    "/billCenter/",
    "/analysisBoard/",
    "/bussiness/",
    "/system/",
    "/downloadCenter",
  ];
  return shellPrefixes.some((prefix) => parsed.pathname === prefix.slice(0, -1) || parsed.pathname.startsWith(prefix));
}

function redactHeaders(headers = {}) {
  const skipped = new Set(["authorization", "cookie", "set-cookie", "x-csrf-token", "x-xsrf-token", "x-auth-token", "token"]);
  return Object.fromEntries(
    Object.entries(headers).filter(([name]) => !skipped.has(String(name).toLowerCase())),
  );
}

function makeHar(page, requests, finalUrl) {
  const entries = [];
  let index = 0;
  for (const request of requests.values()) {
    if (!request.request || !request.response) continue;
    const url = request.request.url || "";
    const startedDateTime = request.wallTime
      ? new Date(request.wallTime * 1000).toISOString()
      : new Date().toISOString();
    const responseBody = request.body || {};
    entries.push({
      pageref: page.key,
      startedDateTime,
      time: Math.max(0, Math.round(((request.finishedAt || request.responseAt || request.requestAt || 0) - (request.requestAt || 0)) * 1000)),
      request: {
        method: request.request.method,
        url,
        httpVersion: "HTTP/2",
        headers: parseHeaders(redactHeaders(request.request.headers || {})),
        queryString: [...(safeUrl(url)?.searchParams.entries() || [])].map(([name, value]) => ({ name, value })),
        cookies: [],
        headersSize: -1,
        bodySize: request.request.postData ? request.request.postData.length : 0,
        postData: request.request.postData
          ? { mimeType: request.request.headers?.["Content-Type"] || request.request.headers?.["content-type"] || "", text: request.request.postData }
          : undefined,
      },
      response: {
        status: request.response.status || 0,
        statusText: request.response.statusText || "",
        httpVersion: "HTTP/2",
        headers: parseHeaders(redactHeaders(request.response.headers || {})),
        cookies: [],
        content: {
          size: responseBody.body ? responseBody.body.length : 0,
          mimeType: request.response.mimeType || "",
          text: responseBody.body || "",
          encoding: responseBody.base64Encoded ? "base64" : undefined,
        },
        redirectURL: "",
        headersSize: -1,
        bodySize: responseBody.body ? responseBody.body.length : 0,
      },
      cache: {},
      timings: {
        send: 0,
        wait: Math.max(0, Math.round(((request.responseAt || request.finishedAt || 0) - (request.requestAt || 0)) * 1000)),
        receive: Math.max(0, Math.round(((request.finishedAt || request.responseAt || 0) - (request.responseAt || request.finishedAt || 0)) * 1000)),
      },
      _index: index++,
    });
  }

  return {
    log: {
      version: "1.2",
      creator: {
        name: "tax-cloud-cdp-capture",
        version: "1.0.0",
      },
      pages: [
        {
          id: page.key,
          startedDateTime: new Date().toISOString(),
          title: `${page.menu1 || ""}/${page.menu2 || ""}`,
          pageTimings: {},
          _finalUrl: finalUrl,
        },
      ],
      entries,
    },
  };
}

function hasLoginShellSignal(requests, finalUrl, title) {
  if (/\/login\b/.test(finalUrl || "")) return true;
  if (/登录/.test(title || "")) return true;
  for (const request of requests.values()) {
    const url = request.request?.url || "";
    if (url.includes("/prod-api/code")) return true;
    if (url.includes("/login")) return true;
  }
  return false;
}

async function capturePage(page) {
  const target = await openCdpTarget("about:blank");
  const client = createCdpClient(target.webSocketDebuggerUrl);
  await client.ready();

  const requests = new Map();
  let finalUrl = "";
  let title = "";

  client.on("Network.requestWillBeSent", (params) => {
    const current = requests.get(params.requestId) || {};
    requests.set(params.requestId, {
      ...current,
      requestId: params.requestId,
      request: params.request,
      wallTime: params.wallTime,
      requestAt: params.timestamp,
    });
  });
  client.on("Network.responseReceived", (params) => {
    const current = requests.get(params.requestId) || {};
    requests.set(params.requestId, {
      ...current,
      response: params.response,
      responseAt: params.timestamp,
    });
  });
  client.on("Network.loadingFinished", (params) => {
    const current = requests.get(params.requestId) || {};
    requests.set(params.requestId, {
      ...current,
      finishedAt: params.timestamp,
    });
  });
  client.on("Page.frameNavigated", (params) => {
    if (params.frame?.parentId) return;
    finalUrl = params.frame?.url || finalUrl;
  });

  await client.send("Page.enable");
  await client.send("Network.enable", { maxResourceBufferSize: 10_000_000, maxTotalBufferSize: 50_000_000 });
  await client.send("Page.navigate", { url: page.url });
  await new Promise((resolve) => setTimeout(resolve, waitMs));

  for (const [requestId, request] of requests.entries()) {
    if (!request.response || !isTaxCloudApi(request.request?.url || "")) continue;
    try {
      request.body = await client.send("Network.getResponseBody", { requestId });
    } catch {
      request.body = { body: "", base64Encoded: false };
    }
  }

  try {
    const result = await client.send("Runtime.evaluate", { expression: "document.title", returnByValue: true });
    title = result?.result?.value || "";
  } catch {
    title = "";
  }

  const har = makeHar(page, requests, finalUrl);
  client.close();
  await fetch(`http://${host}:${port}/json/close/${target.id}`).catch(() => {});

  const apiCount = har.log.entries.filter((entry) => isTaxCloudApi(entry.request.url)).length;
  const loginRedirected = /\/login\b/.test(finalUrl || "");
  const loginShell = hasLoginShellSignal(requests, finalUrl, title);
  return { page, har, apiCount, finalUrl, title, loginRedirected, loginShell };
}

if (args.includes("--help")) {
  usage();
  process.exit(0);
}

const targetPages = await readJson("docs/tax-cloud/captures/target-pages.json", []);
let pages = [];
if (minimal) {
  const minimalBatch = await readJson("docs/tax-cloud/TAX_CLOUD_MINIMAL_HAR_BATCH.json", null);
  if (!minimalBatch) {
    throw new Error("Missing docs/tax-cloud/TAX_CLOUD_MINIMAL_HAR_BATCH.json. Run npm run tax-cloud:minimal-har first.");
  }
  pages = minimalBatch.pages.map((item) => {
    const target = targetPages.find((page) => page.key === item.key) || {};
    return {
      ...target,
      key: item.key,
      menu1: item.menu?.split("/")[0] || target.menu1 || "",
      menu2: item.menu?.split("/").slice(1).join("/") || target.menu2 || "",
      url: item.url || target.url,
      suggestedHarFile: item.harFile,
    };
  });
} else {
  pages = targetPages.filter(shouldKeepPage);
}
if (limit > 0) pages = pages.slice(0, limit);

if (pages.length === 0) {
  usage();
  throw new Error("No target pages selected. Pass page keys or --all.");
}

await mkdir(path.join(root, outDir), { recursive: true });

const rows = [];
for (const page of pages) {
  try {
    const result = await capturePage(page);
    const fileName = page.suggestedHarFile || `${page.key}.cdp-load.har`;
    const outputPath = asPosix(path.join(outDir, fileName));
    if (result.apiCount > 0) {
      await writeFile(path.join(root, outputPath), `${JSON.stringify(result.har, null, 2)}\n`);
    }
    const status =
      result.apiCount > 0 ? "captured" : result.loginShell || result.loginRedirected ? "invalid-login-shell" : "no-api";
    rows.push({
      pageKey: page.key,
      menu: `${page.menu1 || ""}/${page.menu2 || ""}`,
      status,
      apiCount: result.apiCount,
      finalUrl: result.finalUrl,
      loginRedirected: result.loginRedirected,
      loginShell: result.loginShell,
      outputPath: result.apiCount > 0 ? outputPath : "",
      note:
        status === "invalid-login-shell"
          ? "login/captcha/shell capture; use logged-in current Chrome and manual DevTools HAR"
          : "",
    });
  } catch (error) {
    rows.push({
      pageKey: page.key,
      menu: `${page.menu1 || ""}/${page.menu2 || ""}`,
      status: "failed",
      apiCount: 0,
      finalUrl: "",
      loginRedirected: false,
      outputPath: "",
      note: error.message || String(error),
    });
  }
}

const report = `# 数税云 CDP HAR 自动采集报告

生成时间：${new Date().toISOString()}

## 口径

- 采集方式：Chrome DevTools Protocol，端口 \`${host}:${port}\`。
- 只自动打开页面首屏并监听 Network，不点击提交、签收、红冲、认证、真实开票等动作。
- 运行模式：${minimal ? "minimal HAR batch" : all ? "all selected pages" : "explicit selected pages"}。
- 只有捕获到数税云业务 API 请求时才写入 \`docs/tax-cloud/network-har/*.har\`；登录页、验证码、SPA 路由壳页面不计入业务证据。
- 原始 HAR 目录被 git 忽略；提交前请运行 \`npm run tax-cloud:har:parse-all\` 生成脱敏 normalized 文件。

## 汇总

| 项目 | 数量 |
|---|---:|
| selected pages | ${rows.length} |
| captured pages | ${rows.filter((row) => row.status === "captured").length} |
| invalid login/shell captures | ${rows.filter((row) => row.status === "invalid-login-shell").length} |
| no-api pages | ${rows.filter((row) => row.status === "no-api").length} |
| failed pages | ${rows.filter((row) => row.status === "failed").length} |
| login redirects | ${rows.filter((row) => row.loginRedirected).length} |

## 明细

| pageKey | 菜单 | 状态 | API 数 | 输出 | final URL | 备注 |
|---|---|---|---:|---|---|---|
${rows
  .map(
    (row) =>
      `| \`${row.pageKey}\` | ${row.menu.replace(/\|/g, "\\|")} | ${row.status} | ${row.apiCount} | ${row.outputPath ? `\`${row.outputPath}\`` : "-"} | ${row.finalUrl || "-"} | ${String(row.note || "").replace(/\|/g, "\\|")} |`,
  )
  .join("\n")}

## 后续命令

\`\`\`bash
npm run tax-cloud:har:parse-all
npm run tax-cloud:har:tasks
npm run tax-cloud:audit:strict
\`\`\`
`;

await writeFile(path.join(root, reportPath), report);
console.log(report);
