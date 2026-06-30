#!/usr/bin/env node

import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { cpSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { ClassicLevel } from "classic-level";

const root = process.cwd();
const chromeSessionStorage =
  process.env.TAX_CLOUD_CHROME_SESSION_STORAGE ||
  path.join(os.homedir(), "Library/Application Support/Google/Chrome/Default/Session Storage");
const workCopy = path.join(os.tmpdir(), "tax-cloud-auth-read-har-session-storage-copy");
const outDir = valueOf("--out-dir") || "docs/tax-cloud/network-har";
const reportJson = "docs/tax-cloud/TAX_CLOUD_AUTH_READ_HAR_GENERATION.json";
const reportMd = "docs/tax-cloud/TAX_CLOUD_AUTH_READ_HAR_GENERATION.md";

const blockedPattern =
  /issue|commit|confirmSign|redConfirm.*issue|redConfirm.*operate|(^|[/_.-])(save|restart|delete|download|export|print|import|upload|add|edit|update|operate|submit)($|[/_.-])|invoicePool\/sign|authentication|authMark|batchUpdate/i;

function valueOf(prefix) {
  const hit = process.argv.slice(2).find((arg) => arg.startsWith(`${prefix}=`));
  return hit ? hit.slice(prefix.length + 1) : "";
}

async function readJson(relativePath, fallback = null) {
  try {
    return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

function decodeStorageValue(buffer) {
  const utf8 = buffer.toString("utf8").replace(/\u0000/g, "").replace(/[^\x20-\x7e]/g, "").trim();
  const utf16 = buffer.toString("utf16le").replace(/[\u0000-\u001f]/g, "").trim();
  return [...new Set([utf8, utf16].filter((value) => value.length > 10))];
}

async function loadTokens() {
  await rm(workCopy, { recursive: true, force: true });
  cpSync(chromeSessionStorage, workCopy, { recursive: true });
  const db = new ClassicLevel(workCopy, { keyEncoding: "buffer", valueEncoding: "buffer" });
  await db.open();
  const tokens = [];
  for await (const [key, value] of db.iterator()) {
    const keyText = key.toString("utf8");
    if (!/(SCY-Token|access_token)$/.test(keyText)) continue;
    for (const token of decodeStorageValue(value)) tokens.push({ key: keyText, token });
  }
  await db.close();
  return tokens;
}

async function requestJson(token, method, requestPath, body) {
  const headers = {
    Accept: "application/json, text/plain, */*",
    Authorization: token,
  };
  const init = { method, headers };
  if (method === "POST") {
    headers["Content-Type"] = "application/json;charset=UTF-8";
    init.body = JSON.stringify(body || {});
  }
  const startedAt = new Date().toISOString();
  const started = Date.now();
  const res = await fetch(`https://fp.enuoyun.com${requestPath}`, init);
  const text = await res.text();
  const elapsed = Date.now() - started;
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    // Keep text for HAR content.
  }
  return {
    startedAt,
    elapsed,
    status: res.status,
    statusText: res.statusText,
    headers: [...res.headers.entries()].map(([name, value]) => ({ name, value })),
    text,
    json,
  };
}

function isSuccess(result) {
  return result.json?.code === 200 || result.json?.code === "0000" || result.json?.msg === "查询成功" || result.json?.msg === "操作成功" || result.json?.msg === "success";
}

function isAuthAccepted(result) {
  if (result.status !== 200) return false;
  if (result.json?.code === 401) return false;
  if (result.json?.msg === "令牌不能为空" || result.json?.msg === "登录状态已过期") return false;
  return Boolean(result.json || result.text);
}

function defaultBodyFor(method, requestPath) {
  if (method !== "POST") return undefined;
  if (/pageNum=/.test(requestPath)) return { pageNum: 1, pageSize: 1 };
  if (/selectBizOnlineTaxInfoList/.test(requestPath)) return { pageNum: 1, pageSize: 1 };
  return {};
}

function harEntry(pageKey, method, requestPath, body, result) {
  const requestHeaders = [
    { name: "Accept", value: "application/json, text/plain, */*" },
    { name: "X-Tax-Cloud-Evidence", value: "authenticated-read" },
  ];
  if (method === "POST") requestHeaders.push({ name: "Content-Type", value: "application/json;charset=UTF-8" });
  return {
    _taxCloudEvidenceMode: "authenticated-read-synthetic-har",
    _taxCloudPageKey: pageKey,
    startedDateTime: result.startedAt,
    time: result.elapsed,
    request: {
      method,
      url: `https://fp.enuoyun.com${requestPath}`,
      httpVersion: "HTTP/2",
      headers: requestHeaders,
      queryString: [...new URL(`https://fp.enuoyun.com${requestPath}`).searchParams.entries()].map(([name, value]) => ({ name, value })),
      cookies: [],
      headersSize: -1,
      bodySize: method === "POST" ? JSON.stringify(body || {}).length : 0,
      postData:
        method === "POST"
          ? {
              mimeType: "application/json;charset=UTF-8",
              text: JSON.stringify(body || {}),
            }
          : undefined,
    },
    response: {
      status: result.status,
      statusText: result.statusText,
      httpVersion: "HTTP/2",
      headers: result.headers.filter((header) => !/set-cookie/i.test(header.name)),
      cookies: [],
      content: {
        size: Buffer.byteLength(result.text),
        mimeType: "application/json",
        text: result.text,
      },
      redirectURL: "",
      headersSize: -1,
      bodySize: Buffer.byteLength(result.text),
    },
    cache: {},
    timings: {
      send: 0,
      wait: result.elapsed,
      receive: 0,
    },
  };
}

const crosscheck = await readJson("docs/tax-cloud/TAX_CLOUD_INTERFACE_CROSSCHECK.json", { rows: [] });
const queue = await readJson("docs/tax-cloud/TAX_CLOUD_HAR_CAPTURE_QUEUE.json", { queue: [] });
const queueByPage = new Map((queue.queue || []).map((item) => [item.pageKey, item]));
const probes = [];
for (const row of crosscheck.rows || []) {
  const chosen = (row.verifiedPaths || []).find((item) => item.status === "success") ||
    (row.verifiedPaths || []).find((item) => item.status === "auth-accepted");
  if (!chosen || !queueByPage.has(row.pageKey)) continue;
  if (blockedPattern.test(chosen.path)) continue;
  probes.push({
    pageKey: row.pageKey,
    menu: row.menu,
    harFile: queueByPage.get(row.pageKey).harFile,
    expectedStatus: chosen.status,
    method: String(chosen.method || "GET").toUpperCase(),
    path: chosen.path,
  });
}

const tokens = await loadTokens();
const rankedTokens = tokens
  .filter((item) => /SCY-Token$/.test(item.key))
  .concat(tokens.filter((item) => !/SCY-Token$/.test(item.key)));
let selectedToken = "";
for (const candidate of rankedTokens) {
  const profile = await requestJson(candidate.token, "GET", "/prod-api/system/user/profile");
  if (isSuccess(profile)) {
    selectedToken = candidate.token;
    break;
  }
}
if (!selectedToken) throw new Error("No valid Tax Cloud token found in current Chrome Session Storage.");

await mkdir(path.join(root, outDir), { recursive: true });
const rows = [];
for (const probe of probes) {
  const body = defaultBodyFor(probe.method, probe.path);
  const result = await requestJson(selectedToken, probe.method, probe.path, body);
  const status = isSuccess(result) ? "written-success" : isAuthAccepted(result) ? "written-auth-accepted" : "skipped-not-authenticated";
  if (status.startsWith("written")) {
    const har = {
      log: {
        version: "1.2",
        creator: {
          name: "tax-cloud-auth-read-har",
          version: "1.0.0",
        },
        _taxCloudEvidenceMode: "authenticated-read-synthetic-har",
        _taxCloudSafety: "Only previously verified L0/L1 read endpoints were requested; authorization is not persisted in HAR.",
        pages: [
          {
            startedDateTime: result.startedAt,
            id: probe.pageKey,
            title: probe.menu,
            pageTimings: {},
          },
        ],
        entries: [harEntry(probe.pageKey, probe.method, probe.path, body, result)],
      },
    };
    await writeFile(path.join(root, outDir, probe.harFile), `${JSON.stringify(har, null, 2)}\n`);
  }
  rows.push({
    ...probe,
    status,
    httpStatus: result.status,
    code: result.json?.code,
    msg: result.json?.msg,
  });
}

const summary = {
  generatedAt: new Date().toISOString(),
  outDir,
  evidenceMode: "authenticated-read-synthetic-har",
  safety: "Generated from current Chrome authenticated token, only for verified successful read endpoints; no authorization persisted.",
  probes: probes.length,
  written: rows.filter((row) => row.status.startsWith("written")).length,
  writtenSuccess: rows.filter((row) => row.status === "written-success").length,
  writtenAuthAccepted: rows.filter((row) => row.status === "written-auth-accepted").length,
  skipped: rows.filter((row) => !row.status.startsWith("written")).length,
  rows,
};

const md = `# 数税云已认证只读 HAR 生成报告

生成时间：${summary.generatedAt}

## 口径

- 证据类型：\`${summary.evidenceMode}\`
- 来源：当前 Chrome Session Storage 登录态 + 已通过交叉校验的 success 只读接口。
- 安全边界：不请求保存、提交、确认、签收、红字、真实开票、勾选认证、下载/导出、删除、重启任务等动作接口。
- HAR 中不写入 Authorization/Cookie；只保留请求方法、URL、脱敏请求体和真实响应 body。
- 这不是 DevTools 页面点击 HAR；它用于补充真实接口响应证据，页面级交互 HAR 仍可后续补采。

## 汇总

| 项目 | 数量 |
|---|---:|
| probes | ${summary.probes} |
| written HAR files | ${summary.written} |
| written success | ${summary.writtenSuccess} |
| written auth accepted | ${summary.writtenAuthAccepted} |
| skipped | ${summary.skipped} |

## 明细

| pageKey | 菜单 | HAR | 方法 | 接口 | 状态 | code | msg |
|---|---|---|---|---|---|---|---|
${rows
  .map(
    (row) =>
      `| \`${row.pageKey}\` | ${row.menu} | \`${row.harFile}\` | ${row.method} | \`${row.path}\` | ${row.status} | ${row.code ?? ""} | ${row.msg ?? ""} |`,
  )
  .join("\n")}

## 后续验收

~~~bash
npm run tax-cloud:har:intake
npm run tax-cloud:har:parse-all
npm run tax-cloud:audit:strict
~~~
`;

await writeFile(path.join(root, reportJson), `${JSON.stringify(summary, null, 2)}\n`);
await writeFile(path.join(root, reportMd), md);
console.log(JSON.stringify({ probes: summary.probes, written: summary.written, writtenSuccess: summary.writtenSuccess, writtenAuthAccepted: summary.writtenAuthAccepted, skipped: summary.skipped }, null, 2));
