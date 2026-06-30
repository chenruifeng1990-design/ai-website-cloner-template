#!/usr/bin/env node

import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const harDir = valueOf("--har-dir") || "docs/tax-cloud/network-har";
const outMd = valueOf("--out") || "docs/tax-cloud/TAX_CLOUD_HAR_INTAKE_VALIDATION.md";
const outJson = valueOf("--json") || "docs/tax-cloud/TAX_CLOUD_HAR_INTAKE_VALIDATION.json";

function valueOf(prefix) {
  const hit = args.find((arg) => arg.startsWith(`${prefix}=`));
  return hit ? hit.slice(prefix.length + 1) : "";
}

async function readJson(relativePath, fallback = null) {
  try {
    return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

function safeUrl(url) {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

function isLoginShellPath(parsed) {
  if (!parsed) return false;
  if (parsed.pathname === "/prod-api/code" || parsed.pathname === "/login") return true;
  const shellPrefixes = [
    "/platform/",
    "/income/",
    "/billCenter/",
    "/analysisBoard/",
    "/bussiness/",
    "/system/",
    "/downloadCenter",
  ];
  return parsed.hostname === "fp.enuoyun.com" && shellPrefixes.some((prefix) => parsed.pathname === prefix.slice(0, -1) || parsed.pathname.startsWith(prefix));
}

function isBusinessApiPath(parsed) {
  if (!parsed || parsed.hostname !== "fp.enuoyun.com") return false;
  if (isLoginShellPath(parsed)) return false;
  return (
    parsed.pathname.startsWith("/prod-api/") ||
    parsed.pathname.includes("/api/") ||
    parsed.pathname.includes("/bussiness/") ||
    parsed.pathname.includes("/income/") ||
    parsed.pathname.includes("/system/") ||
    parsed.pathname.includes("/invoicecenter/") ||
    parsed.pathname.includes("/invoicecheck/")
  );
}

function classifyRisk(method, url) {
  const text = `${method || ""} ${url || ""}`.toLowerCase();
  if (/redconfirminfo\/list|redconfirm.*\/list|redmark.*\/list/i.test(text)) {
    return String(method || "").toUpperCase() === "GET" ? "L0-candidate" : "L1-review";
  }
  if (/issue|h5commit|redconfirm.*(issue|operate|submit|confirm|save)|redmark.*(issue|operate|submit|confirm|save)|allElectricInvoice\/issue/i.test(text)) return "L4/L3-review";
  if (/sign|confirm|rz\.tj|rz\.tz|auth|authentication|usage|checksubmit/i.test(text)) return "L3-review";
  if (/(^|[/_.-])(download|export|print|import|upload|restart|clearcache|delete|save|update|add|edit|operate|task)($|[/_.-])/i.test(text)) return "L2-review";
  return String(method || "").toUpperCase() === "GET" ? "L0-candidate" : "L1-review";
}

function normalizedPath(url) {
  const parsed = safeUrl(url);
  if (!parsed) return "";
  return parsed.pathname;
}

function pathMatchesExpected(actualPath, expectedPath) {
  if (!actualPath || !expectedPath) return false;
  const cleanExpected = expectedPath.split("?")[0];
  const variants = new Set([cleanExpected]);
  if (cleanExpected.startsWith("/prod-api/")) variants.add(cleanExpected.slice("/prod-api".length));
  else variants.add(`/prod-api${cleanExpected}`);
  return [...variants].some((item) => actualPath === item || actualPath.endsWith(item));
}

function expectedPathsFor(row) {
  return (row.verifiedPaths || [])
    .filter((item) => item.status === "success" || item.status === "auth-accepted")
    .map((item) => item.path)
    .filter(Boolean);
}

async function parseHar(relativePath) {
  try {
    const har = JSON.parse(await readFile(path.join(root, harDir, relativePath), "utf8"));
    const entries = har.log?.entries || [];
    const apiEntries = entries
      .map((entry) => {
        const request = entry.request || {};
        const response = entry.response || {};
        const parsed = safeUrl(request.url || "");
        return {
          method: request.method || "",
          url: request.url || "",
          path: parsed?.pathname || "",
          status: response.status,
          risk: classifyRisk(request.method, request.url),
          isBusinessApi: isBusinessApiPath(parsed),
          isLoginShell: isLoginShellPath(parsed),
        };
      })
      .filter((entry) => entry.url);
    return {
      exists: true,
      totalEntries: entries.length,
      businessApiEntries: apiEntries.filter((entry) => entry.isBusinessApi).length,
      loginShellEntries: apiEntries.filter((entry) => entry.isLoginShell).length,
      highRiskEntries: apiEntries.filter((entry) => /^L[34]/.test(entry.risk)).length,
      endpoints: apiEntries.filter((entry) => entry.isBusinessApi).map((entry) => ({
        method: entry.method,
        path: entry.path,
        status: entry.status,
        risk: entry.risk,
      })),
    };
  } catch (error) {
    return {
      exists: false,
      error: String(error?.message || error),
    };
  }
}

const minimalBatch = await readJson("docs/tax-cloud/TAX_CLOUD_MINIMAL_HAR_BATCH.json", { pages: [] });
const crosscheck = await readJson("docs/tax-cloud/TAX_CLOUD_INTERFACE_CROSSCHECK.json", { rows: [] });
const crosscheckByPage = new Map((crosscheck.rows || []).map((row) => [row.pageKey, row]));

let harFiles = [];
try {
  harFiles = (await readdir(path.join(root, harDir))).filter((file) => file.endsWith(".har"));
} catch {
  harFiles = [];
}

const rows = [];
for (const page of minimalBatch.pages || []) {
  const harFile = page.harFile;
  const parsed = await parseHar(harFile);
  const expectedPaths = expectedPathsFor(crosscheckByPage.get(page.key) || {});
  const matchedExpectedPaths = parsed.endpoints
    ? expectedPaths.filter((expected) => parsed.endpoints.some((endpoint) => pathMatchesExpected(endpoint.path, expected)))
    : [];
  const status = !parsed.exists
    ? "missing"
    : parsed.businessApiEntries <= 0
      ? parsed.loginShellEntries > 0
        ? "invalid-login-shell"
        : "invalid-no-business-api"
      : parsed.highRiskEntries > 0
        ? "review-high-risk"
        : matchedExpectedPaths.length > 0
          ? "accepted"
          : expectedPaths.length > 0
            ? "review-unmatched-api"
            : "accepted-no-expectation";
  rows.push({
    pageKey: page.key,
    menu: page.menu,
    harFile,
    status,
    expectedPaths,
    matchedExpectedPaths,
    ...parsed,
  });
}

const summary = {
  generatedAt: new Date().toISOString(),
  harDir,
  expectedHarFiles: rows.length,
  filesInHarDir: harFiles.length,
  accepted: rows.filter((row) => row.status === "accepted" || row.status === "accepted-no-expectation").length,
  missing: rows.filter((row) => row.status === "missing").length,
  invalid: rows.filter((row) => row.status.startsWith("invalid")).length,
  review: rows.filter((row) => row.status.startsWith("review")).length,
  rows,
};

function mdList(items) {
  if (!items || items.length === 0) return "无";
  return items.map((item) => `\`${item}\``).join("<br>");
}

const md = `# 数税云 HAR Intake 校验报告

生成时间：${summary.generatedAt}

## 口径

- 范围：最小 HAR 补齐批次中的 ${summary.expectedHarFiles} 个文件。
- 目的：导入人工 HAR 后，快速判断是否为真实业务 HAR。
- 接受条件：HAR 文件存在，包含 \`fp.enuoyun.com\` 真实业务 API，且优先命中交叉校验中的 success/auth 接口。
- 拒绝条件：缺文件、只有 SPA 路由/登录壳/验证码、没有业务 API。
- 复核条件：包含高风险接口，或包含业务 API 但未命中预期接口。

## 汇总

| 项目 | 数量 |
|---|---:|
| expected HAR files | ${summary.expectedHarFiles} |
| files in HAR dir | ${summary.filesInHarDir} |
| accepted | ${summary.accepted} |
| missing | ${summary.missing} |
| invalid | ${summary.invalid} |
| review | ${summary.review} |

## 明细

| pageKey | HAR | 状态 | 业务 API | 登录壳 | 高风险 | 命中预期 | 预期接口 |
|---|---|---|---:|---:|---:|---|---|
${rows
  .map(
    (row) =>
      `| \`${row.pageKey}\` | \`${row.harFile}\` | ${row.status} | ${row.businessApiEntries || 0} | ${row.loginShellEntries || 0} | ${row.highRiskEntries || 0} | ${mdList(row.matchedExpectedPaths)} | ${mdList(row.expectedPaths)} |`,
  )
  .join("\n")}

## 使用

~~~bash
npm run tax-cloud:har:intake
~~~

通过后再运行：

~~~bash
npm run tax-cloud:har:parse-all
npm run tax-cloud:har:tasks
npm run tax-cloud:audit:strict
~~~
`;

await writeFile(path.join(root, outJson), `${JSON.stringify(summary, null, 2)}\n`);
await writeFile(path.join(root, outMd), md);
console.log(JSON.stringify({
  expectedHarFiles: summary.expectedHarFiles,
  accepted: summary.accepted,
  missing: summary.missing,
  invalid: summary.invalid,
  review: summary.review,
}, null, 2));
