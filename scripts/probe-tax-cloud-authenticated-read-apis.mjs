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
const workCopy = path.join(os.tmpdir(), "tax-cloud-session-storage-probe-copy");
const outJson = "docs/tax-cloud/apis/authenticated-read-probe.json";
const outMd = "docs/tax-cloud/TAX_CLOUD_AUTHENTICATED_READ_API_PROBE.md";

const safeProbes = [
  {
    pageKey: "system-user",
    menu: "系统设置/用户管理",
    method: "GET",
    path: "/prod-api/system/user/list?pageNum=1&pageSize=1",
    risk: "L0 query",
  },
  {
    pageKey: "system-role",
    menu: "系统设置/角色管理",
    method: "GET",
    path: "/prod-api/system/role/list?pageNum=1&pageSize=1",
    risk: "L0 query",
  },
  {
    pageKey: "system-dept",
    menu: "系统设置/组织管理",
    method: "GET",
    path: "/prod-api/system/dept/list",
    risk: "L0 query",
  },
  {
    pageKey: "system-departmentInfo",
    menu: "系统设置/部门管理",
    method: "GET",
    path: "/prod-api/system/departmentInfo/list?pageNum=1&pageSize=1",
    risk: "L0 query",
  },
  {
    pageKey: "system-onlineTaxationInfo",
    menu: "系统设置/网上办税信息",
    method: "POST",
    path: "/prod-api/system/bizOnlineTaxInformation/selectBizOnlineTaxInfoList",
    body: { pageNum: 1, pageSize: 1 },
    risk: "L0 query",
  },
  {
    pageKey: "system-onlineTaxationInfo",
    menu: "系统设置/网上办税信息",
    method: "GET",
    path: "/prod-api/system/bizOnlineTaxInformation/getOnlineTax",
    risk: "L0 query",
  },
  {
    pageKey: "bussiness-configurationManagement",
    menu: "基础信息/配置管理",
    method: "GET",
    path: "/prod-api/system/config/list?pageNum=1&pageSize=1",
    risk: "L0 query",
  },
  {
    pageKey: "bussiness-credit",
    menu: "基础信息/开票额度配置",
    method: "GET",
    path: "/prod-api/bussiness/creditLine/query?pageNum=1&pageSize=1",
    risk: "L0 query",
  },
  {
    pageKey: "bussiness-credit",
    menu: "基础信息/开票额度配置",
    method: "GET",
    path: "/prod-api/bussiness/credit/creditInfo/1?_t={{now}}",
    risk: "L0 query",
  },
  {
    pageKey: "bussiness-info",
    menu: "基础信息/商品信息",
    method: "GET",
    path: "/prod-api/bussiness/bizGoodsInfo/selectBizGoodsInfoOuterList?pageNum=1&pageSize=1",
    risk: "L0 query",
  },
  {
    pageKey: "bussiness-customer",
    menu: "基础信息/客户管理",
    method: "GET",
    path: "/prod-api/bussiness/bizCustomer/selectBizCustomerInfoOutNotList?pageNum=1&pageSize=1",
    risk: "L0 query",
  },
  {
    pageKey: "billCenter-taskManagement",
    menu: "票据中心/任务管理",
    method: "GET",
    path: "/prod-api/system/taskRecord/list?pageNum=1&pageSize=1",
    risk: "L0 query",
  },
  {
    pageKey: "billCenter-invoiceVerification",
    menu: "票据中心/查验",
    method: "POST",
    path: "/prod-api/invoicecheck/check/list/thirdPlatform/dataList",
    body: { pageNum: 1, pageSize: 1 },
    risk: "L0 query",
  },
  {
    pageKey: "billCenter-accessSetting",
    menu: "票据中心/取票设置",
    method: "POST",
    path: "/prod-api/invoicecenter/sjruzhang/getSjruzhangSetting",
    body: {},
    risk: "L0 query",
  },
  {
    pageKey: "billCenter-sign",
    menu: "票据中心/签收",
    method: "POST",
    path: "/prod-api/invoicecenter/integrated/v1/invoicePool/query",
    body: { pageNum: 1, pageSize: 1 },
    risk: "L0 query; sign action not triggered",
  },
  {
    pageKey: "platform-redMark",
    menu: "销项管理/红字确认单",
    method: "GET",
    path: "/prod-api/bussiness/redConfirmInfo/list?pageNum=1&pageSize=1",
    risk: "L0 query",
  },
  {
    pageKey: "platform-invoiceApplication",
    menu: "销项管理/开票申请单",
    method: "GET",
    path: "/prod-api/deliveryWithGoods/list?pageNum=1&pageSize=1",
    risk: "L0 query",
  },
  {
    pageKey: "platform-billIssue",
    menu: "销项管理/订单开票",
    method: "GET",
    path: "/prod-api/bussiness/bizBillInfo/findDraftList?pageNum=1&pageSize=1",
    risk: "L0 query",
  },
  {
    pageKey: "platform-scanRecords",
    menu: "销项管理/扫码记录",
    method: "GET",
    path: "/prod-api/bussiness/scanInvoice/getClientGuess",
    risk: "L0 query",
  },
  {
    pageKey: "platform-scanCode",
    menu: "销项管理/扫码开票",
    method: "GET",
    path: "/prod-api/system/dict/data/getInvoiceType",
    risk: "L0 dictionary query",
  },
  {
    pageKey: "downloadCenter",
    menu: "顶部入口/下载中心",
    method: "POST",
    path: "/prod-api/invoicecenter/invoiceTemplate/v1/download/template/taskId",
    body: {},
    risk: "L0/L2 metadata query",
  },
];

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

async function requestProbe(token, probe) {
  const headers = {
    Accept: "application/json, text/plain, */*",
    Authorization: token,
  };
  const init = { method: probe.method, headers };
  if (probe.method === "POST") {
    headers["Content-Type"] = "application/json;charset=UTF-8";
    init.body = JSON.stringify(probe.body || {});
  }
  const startedAt = new Date().toISOString();
  const requestPath = probe.path.replaceAll("{{now}}", String(Date.now()));
  try {
    const res = await fetch(`https://fp.enuoyun.com${requestPath}`, init);
    const text = await res.text();
    let json = null;
    try {
      json = JSON.parse(text);
    } catch {
      // ignore non-json
    }
    return {
      ...probe,
      path: requestPath,
      startedAt,
      httpStatus: res.status,
      code: json?.code,
      msg: json?.msg,
      topLevelKeys: json ? Object.keys(json).slice(0, 20) : [],
      dataKeys: json?.data && typeof json.data === "object" ? Object.keys(json.data).slice(0, 20) : [],
      rowCount: Array.isArray(json?.rows) ? json.rows.length : undefined,
      total: typeof json?.total === "number" ? json.total : undefined,
      textSample: json ? undefined : text.slice(0, 120),
    };
  } catch (error) {
    return {
      ...probe,
      path: requestPath,
      startedAt,
      error: String(error?.message || error),
    };
  }
}

function isAuthAccepted(result) {
  if (result.httpStatus !== 200) return false;
  if (result.code === 401) return false;
  if (result.msg === "令牌不能为空" || result.msg === "登录状态已过期") return false;
  return Boolean(result.code || result.topLevelKeys?.length || result.textSample);
}

function isSuccess(result) {
  return result.code === 200 || result.code === "0000" || result.msg === "查询成功" || result.msg === "操作成功";
}

function isTransportAccepted(result) {
  return result.httpStatus === 200;
}

function diagnosticFor(result) {
  if (isSuccess(result)) {
    return {
      status: "success",
      reason: "接口返回业务成功码，可作为已认证只读接口证据；仍需 HAR 作为严格验收依据。",
      next: "导出该页面 DevTools HAR，补齐真实 Network 证据。",
    };
  }
  if (isAuthAccepted(result)) {
    const message = result.msg || result.error || "";
    if (/没有权限/.test(message)) {
      return {
        status: "auth-accepted-no-permission",
        reason: "token 被服务端接受，但当前企业/用户权限不足。",
        next: "用页面真实 Network HAR 确认该菜单实际接口；不要用脚本尝试写入或提权动作。",
      };
    }
    if (/未检测到开票设备/.test(message)) {
      return {
        status: "auth-accepted-device-required",
        reason: "token 被接受，但接口依赖开票设备/税控上下文。",
        next: "在已登录数税云页面操作并导出 HAR，记录设备上下文参数来源。",
      };
    }
    if (/参数异常/.test(message)) {
      return {
        status: "auth-accepted-parameter-required",
        reason: "token 被接受，但只读探针缺页面运行时参数。",
        next: "用真实页面 HAR 反查缺失参数；不得猜测触发 L3/L4 税务动作。",
      };
    }
    if (/NOT_FOUND|内部服务器错误/.test(message)) {
      return {
        status: "auth-accepted-route-or-runtime-missing",
        reason: "token 被接受，但候选接口路径或页面运行时上下文不完整。",
        next: "按页面实际 Network 校正接口路径、method 和 payload。",
      };
    }
    return {
      status: "auth-accepted-business-failed",
      reason: "token 被接受，但业务接口未返回成功。",
      next: "需要页面级 HAR 校正路径、参数或权限上下文。",
    };
  }
  if (isTransportAccepted(result)) {
    return {
      status: "transport-accepted-non-json-or-empty",
      reason: "服务端返回 HTTP 200，但没有可识别 JSON 成功体，不能算业务成功。",
      next: "需要页面动作 HAR 确认该接口是否为下载/文件流/任务型响应。",
    };
  }
  if (result.httpStatus === 404 || result.httpStatus === 405) {
    return {
      status: "route-not-confirmed",
      reason: "候选路径未被当前网关识别，说明静态代码候选不能直接替代真实页面 Network。",
      next: "从 DevTools HAR 获取页面实际请求路径。",
    };
  }
  return {
    status: "failed",
    reason: "当前只读探针未形成可用接口证据。",
    next: "保留为缺口，等待真实 HAR。",
  };
}

const tokens = await loadTokens();
const rankedTokens = tokens
  .filter((item) => /SCY-Token$/.test(item.key))
  .concat(tokens.filter((item) => !/SCY-Token$/.test(item.key)));

let selectedToken = null;
const tokenAttempts = [];
for (const candidate of rankedTokens) {
  const profileResult = await requestProbe(candidate.token, {
    pageKey: "_auth",
    menu: "认证探测",
    method: "GET",
    path: "/prod-api/system/user/profile",
    risk: "L0 auth check",
  });
  tokenAttempts.push({
    key: candidate.key,
    tokenLength: candidate.token.length,
    httpStatus: profileResult.httpStatus,
    code: profileResult.code,
    msg: profileResult.msg,
  });
  if (isSuccess(profileResult)) {
    selectedToken = candidate.token;
    break;
  }
}

if (!selectedToken) {
  throw new Error(`No valid read token found. Attempts: ${JSON.stringify(tokenAttempts)}`);
}

const results = [];
for (const probe of safeProbes) {
  results.push(await requestProbe(selectedToken, probe));
}

const pageSummary = {};
for (const result of results) {
  pageSummary[result.pageKey] ||= { probes: 0, transportAccepted: 0, authAccepted: 0, success: 0 };
  pageSummary[result.pageKey].probes += 1;
  if (isTransportAccepted(result)) pageSummary[result.pageKey].transportAccepted += 1;
  if (isAuthAccepted(result)) pageSummary[result.pageKey].authAccepted += 1;
  if (isSuccess(result)) pageSummary[result.pageKey].success += 1;
}

const diagnostics = results.map((result) => ({
  pageKey: result.pageKey,
  method: result.method,
  path: result.path,
  httpStatus: result.httpStatus,
  code: result.code,
  msg: result.msg,
  ...diagnosticFor(result),
}));

const output = {
  generatedAt: new Date().toISOString(),
  source: "Chrome Session Storage copied locally; token used in memory only and omitted from output.",
  tokenAttempts,
  summary: {
    probes: results.length,
    transportAccepted: results.filter(isTransportAccepted).length,
    authAccepted: results.filter(isAuthAccepted).length,
    success: results.filter(isSuccess).length,
    pagesCovered: Object.keys(pageSummary).length,
    pagesWithTransportAccepted: Object.values(pageSummary).filter((item) => item.transportAccepted > 0).length,
    pagesWithAuthAccepted: Object.values(pageSummary).filter((item) => item.authAccepted > 0).length,
    pagesWithSuccess: Object.values(pageSummary).filter((item) => item.success > 0).length,
  },
  pageSummary,
  results,
  diagnostics,
};

await mkdir(path.join(root, "docs/tax-cloud/apis"), { recursive: true });
await writeFile(path.join(root, outJson), JSON.stringify(output, null, 2));

const md = `# 数税云已认证只读接口探测报告

生成时间：${output.generatedAt}

## 口径

- 来源：当前 Chrome Session Storage 复制件，只在内存中使用有效 token，报告不落 token。
- 范围：仅 L0/L1 查询、列表、配置读取、资料读取接口。
- 禁止项：未触发保存、删除、签收确认、红字填开、批量开票、真实开票、勾选认证、下载文件。
- 本报告证明“真实已认证 API 可访问性”，但仍不替代 HAR。HAR 严格验收仍以 \`tax-cloud:audit:strict\` 为准。

## 汇总

| 项目 | 数量 |
|---|---:|
| 探测接口 | ${output.summary.probes} |
| 传输可达接口 | ${output.summary.transportAccepted} |
| 认证被接受接口 | ${output.summary.authAccepted} |
| 成功接口 | ${output.summary.success} |
| 覆盖页面 | ${output.summary.pagesCovered} |
| 传输可达页面 | ${output.summary.pagesWithTransportAccepted} |
| 认证被接受页面 | ${output.summary.pagesWithAuthAccepted} |
| 成功页面 | ${output.summary.pagesWithSuccess} |

## 页面汇总

| pageKey | probes | transportAccepted | authAccepted | success |
|---|---:|---:|---:|---:|
${Object.entries(pageSummary)
  .map(([key, item]) => `| \`${key}\` | ${item.probes} | ${item.transportAccepted} | ${item.authAccepted} | ${item.success} |`)
  .join("\n")}

## 接口明细

| pageKey | 方法 | 接口 | 风险 | HTTP | code | msg | 字段 |
|---|---|---|---|---:|---:|---|---|
${results
  .map(
    (item) =>
      `| \`${item.pageKey}\` | ${item.method} | \`${item.path.replace(/\|/g, "\\|")}\` | ${item.risk} | ${item.httpStatus ?? ""} | ${item.code ?? ""} | ${(item.msg || item.error || "").replace(/\|/g, "\\|")} | ${(item.dataKeys?.length ? item.dataKeys : item.topLevelKeys || []).join(", ").replace(/\|/g, "\\|")} |`,
  )
  .join("\n")}

## 失败/未成功诊断

| pageKey | 接口 | 状态 | 原因 | 下一步 |
|---|---|---|---|---|
${diagnostics
  .filter((item) => item.status !== "success")
  .map(
    (item) =>
      `| \`${item.pageKey}\` | \`${item.path.replace(/\|/g, "\\|")}\` | ${item.status} | ${item.reason.replace(/\|/g, "\\|")} | ${item.next.replace(/\|/g, "\\|")} |`,
  )
  .join("\n")}

## 下一步

1. 对成功或认证被接受的页面，继续用 DevTools HAR 导出真实 Network 证据。
2. 对返回 404/500 的接口，根据页面实际 Network 校正路径或参数。
3. 继续保持 L3/L4 动作隔离，不用本脚本触发真实税务动作。
`;

await writeFile(path.join(root, outMd), md);
console.log(JSON.stringify(output.summary, null, 2));
