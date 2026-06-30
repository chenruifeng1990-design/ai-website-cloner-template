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
const workCopy = path.join(os.tmpdir(), "tax-cloud-static-read-probe-session-storage-copy");
const outJson = "docs/tax-cloud/apis/static-read-candidate-probe.json";
const outMd = "docs/tax-cloud/TAX_CLOUD_STATIC_READ_CANDIDATE_PROBE.md";

const staticGroupByPageKey = {
  "platform-scanCode": "scanRecords",
  "platform-scanRecords": "scanRecords",
  "platform-invoiceApplication": "invoiceApplication",
  "billCenter-sign": "sign",
  "billCenter-invoiceVerification": "invoiceVerification",
  "bussiness-credit": "credit",
  "bussiness-configurationManagement": "config",
  downloadCenter: "download",
};

const manualSafeHints = {
  "platform-scanCode": ["/bussiness/scanInvoice/getScanInvoiceInfo", "/bussiness/scanInvoice/getClientGuess"],
  "platform-scanRecords": ["/bussiness/scanInvoice/getClientGuess", "/bussiness/scanInvoice/getClientDateByCode"],
  "platform-invoiceApplication": ["/deliveryWithGoods/list", "/deliveryWithGoods/search"],
  "billCenter-sign": ["/invoicecenter/integrated/v1/invoicePool/query", "/inputtax/h51InputTax/statistics"],
  "billCenter-invoiceVerification": [
    "/invoicecheck/check/list/thirdPlatform/dataList",
    "/invoicecheck/check/list/thirdPlatform/getData",
    "/getInvoiceCheckDetail",
  ],
  "bussiness-credit": ["/bussiness/creditLine/query", "/bussiness/credit/creditInfo/1"],
  "bussiness-configurationManagement": ["/system/config/list", "/system/config/configKey/"],
  downloadCenter: ["/invoicecenter/invoiceTemplate/v1/download/template/taskId", "/invoicecenter/invoiceTemplate/"],
};

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
    for (const token of decodeStorageValue(value)) {
      tokens.push({ key: keyText, token });
    }
  }
  await db.close();
  return tokens;
}

async function readJson(relativePath, fallback = null) {
  try {
    return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

function isSafeReadEndpoint(endpoint) {
  const text = endpoint.toLowerCase();
  if (!/^\/[a-z0-9]/i.test(endpoint)) return false;
  if (
    /issue|commit|confirm|sign|save|restart|delete|clearcache|download|export|print|import|upload|add|edit|update|operate|delivery|auth|authentication|pay|notice|avatar|password|pwd|batch/i.test(
      text,
    )
  ) {
    return false;
  }
  return /list|query|select|get|find|detail|statistics|status|config|setting|info|guess|search/i.test(text);
}

function withProdApi(endpoint) {
  const clean = endpoint.startsWith("/prod-api/") ? endpoint.slice("/prod-api".length) : endpoint;
  return `/prod-api${clean}`;
}

function addQueryDefaults(endpoint) {
  if (/[?&]pageNum=/.test(endpoint)) return endpoint;
  if (/list|query|select|find|search/i.test(endpoint)) {
    return `${endpoint}${endpoint.includes("?") ? "&" : "?"}pageNum=1&pageSize=1`;
  }
  return endpoint;
}

async function requestProbe(token, probe) {
  const headers = {
    Accept: "application/json, text/plain, */*",
    Authorization: token,
  };
  const methods = probe.methods || ["GET", "POST"];
  const attempts = [];
  for (const method of methods) {
    const init = { method, headers: { ...headers } };
    if (method === "POST") {
      init.headers["Content-Type"] = "application/json;charset=UTF-8";
      init.body = JSON.stringify(probe.body || { pageNum: 1, pageSize: 1 });
    }
    try {
      const res = await fetch(`https://fp.enuoyun.com${probe.path}`, init);
      const text = await res.text();
      let json = null;
      try {
        json = JSON.parse(text);
      } catch {
        // Non-JSON means this is not useful as business evidence, but keep the transport fact.
      }
      const result = {
        pageKey: probe.pageKey,
        menu: probe.menu,
        method,
        path: probe.path,
        httpStatus: res.status,
        code: json?.code,
        msg: json?.msg,
        topLevelKeys: json ? Object.keys(json).slice(0, 12) : [],
        dataKeys: json?.data && typeof json.data === "object" ? Object.keys(json.data).slice(0, 12) : [],
        rowCount: Array.isArray(json?.rows) ? json.rows.length : undefined,
        total: typeof json?.total === "number" ? json.total : undefined,
        textSample: json ? undefined : text.slice(0, 80),
      };
      attempts.push(result);
      if (isSuccess(result)) return result;
    } catch (error) {
      attempts.push({
        pageKey: probe.pageKey,
        menu: probe.menu,
        method,
        path: probe.path,
        error: String(error?.message || error),
      });
    }
  }
  return attempts.find(isAuthAccepted) || attempts.find((item) => item.httpStatus === 200) || attempts[0];
}

function isSuccess(result) {
  return result.code === 200 || result.code === "0000" || result.msg === "查询成功" || result.msg === "操作成功";
}

function isAuthAccepted(result) {
  if (result.httpStatus !== 200) return false;
  if (result.code === 401) return false;
  if (result.msg === "令牌不能为空" || result.msg === "登录状态已过期") return false;
  return Boolean(result.code || result.topLevelKeys?.length || result.textSample);
}

const authProbe = await readJson("docs/tax-cloud/apis/authenticated-read-probe.json", { pageSummary: {} });
const staticEndpoints = await readJson("docs/tax-cloud/apis/static-js-endpoints.json", { groups: {} });
const minimalBatch = await readJson("docs/tax-cloud/TAX_CLOUD_MINIMAL_HAR_BATCH.json", { pages: [] });

const targetPages = minimalBatch.pages.filter((page) => (authProbe.pageSummary?.[page.key]?.success || 0) === 0);

const tokens = await loadTokens();
const rankedTokens = tokens
  .filter((item) => /SCY-Token$/.test(item.key))
  .concat(tokens.filter((item) => !/SCY-Token$/.test(item.key)));

let selectedToken = null;
for (const candidate of rankedTokens) {
  const profile = await requestProbe(candidate.token, {
    pageKey: "_auth",
    menu: "认证探测",
    methods: ["GET"],
    path: "/prod-api/system/user/profile",
  });
  if (isSuccess(profile)) {
    selectedToken = candidate.token;
    break;
  }
}

if (!selectedToken) throw new Error("No valid token found for static read probe.");

const results = [];
for (const page of targetPages) {
  const group = staticGroupByPageKey[page.key];
  const groupEndpoints = (staticEndpoints.groups?.[group] || []).map((item) => item.endpoint).filter(Boolean);
  const hinted = manualSafeHints[page.key] || [];
  const candidates = [...new Set([...hinted, ...groupEndpoints])]
    .filter(isSafeReadEndpoint)
    .slice(0, 8)
    .map((endpoint) => addQueryDefaults(withProdApi(endpoint)));

  for (const path of candidates) {
    const result = await requestProbe(selectedToken, {
      pageKey: page.key,
      menu: page.menu,
      path,
      methods: ["GET", "POST"],
    });
    results.push(result);
    if (isSuccess(result)) break;
  }
}

const pageSummary = {};
for (const result of results) {
  pageSummary[result.pageKey] ||= { probes: 0, transportAccepted: 0, authAccepted: 0, success: 0 };
  pageSummary[result.pageKey].probes += 1;
  if (result.httpStatus === 200) pageSummary[result.pageKey].transportAccepted += 1;
  if (isAuthAccepted(result)) pageSummary[result.pageKey].authAccepted += 1;
  if (isSuccess(result)) pageSummary[result.pageKey].success += 1;
}

const output = {
  generatedAt: new Date().toISOString(),
  source:
    "Static JS safe-read candidates plus current Chrome Session Storage token; token used in memory only and omitted from output.",
  scope: {
    targetPages: targetPages.map((page) => page.key),
    safety:
      "Only endpoints with query/list/select/get/find/detail/statistics/status/config/setting/info/guess/search names; action-like endpoints are excluded.",
  },
  summary: {
    pagesCovered: Object.keys(pageSummary).length,
    probes: results.length,
    transportAccepted: results.filter((item) => item.httpStatus === 200).length,
    authAccepted: results.filter(isAuthAccepted).length,
    success: results.filter(isSuccess).length,
    pagesWithSuccess: Object.values(pageSummary).filter((item) => item.success > 0).length,
  },
  pageSummary,
  results,
};

await mkdir(path.join(root, "docs/tax-cloud/apis"), { recursive: true });
await writeFile(path.join(root, outJson), JSON.stringify(output, null, 2));

function statusOf(result) {
  if (isSuccess(result)) return "success";
  if (isAuthAccepted(result)) return "auth-accepted";
  if (result.httpStatus === 200) return "transport";
  return "failed";
}

const md = `# 数税云静态只读候选二次探测报告

生成时间：${output.generatedAt}

## 口径

- 范围：基础只读探测中尚未返回业务成功的缺 HAR 页面。
- 来源：静态 JS 候选接口 + 当前 Chrome Session Storage 中的有效登录态。
- 只探测名称明显为查询/列表/详情/配置读取的接口。
- 禁止项：不探测名称含保存、提交、签收、红字、真实开票、认证、下载、导出、删除、重启、导入、上传、批量处理等动作的接口。
- 本报告仍不替代真实 HAR，只用于缩小后续人工 Network 补抓范围。

## 汇总

| 项目 | 数量 |
|---|---:|
| 覆盖页面 | ${output.summary.pagesCovered} |
| 探测接口 | ${output.summary.probes} |
| 传输可达 | ${output.summary.transportAccepted} |
| 认证被接受 | ${output.summary.authAccepted} |
| 业务成功 | ${output.summary.success} |
| 有业务成功页面 | ${output.summary.pagesWithSuccess} |

## 页面汇总

| pageKey | probes | transportAccepted | authAccepted | success |
|---|---:|---:|---:|---:|
${Object.entries(pageSummary)
  .map(([pageKey, item]) => `| \`${pageKey}\` | ${item.probes} | ${item.transportAccepted} | ${item.authAccepted} | ${item.success} |`)
  .join("\n")}

## 成功/可用接口

| pageKey | 方法 | 接口 | 状态 | msg |
|---|---|---|---|---|
${results
  .filter((result) => isSuccess(result) || isAuthAccepted(result))
  .map((result) => `| \`${result.pageKey}\` | ${result.method} | \`${result.path}\` | ${statusOf(result)} | ${result.msg || ""} |`)
  .join("\n")}
`;

await writeFile(path.join(root, outMd), md);
console.log(JSON.stringify(output.summary, null, 2));
