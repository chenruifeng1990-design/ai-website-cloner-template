#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const jsonOutPath = "docs/tax-cloud/TAX_CLOUD_INTERFACE_CROSSCHECK.json";
const mdOutPath = "docs/tax-cloud/TAX_CLOUD_INTERFACE_CROSSCHECK.md";

async function readJson(file, fallback = null) {
  try {
    return JSON.parse(await readFile(path.join(root, file), "utf8"));
  } catch {
    return fallback;
  }
}

function classifyRisk(endpoint) {
  const text = endpoint.toLowerCase();
  if (/issue|h5commit|redconfirminfo\/commit|batchconfirm|signinvoices|confirmsign/.test(text)) return "L3/L4 action";
  if (/save|restart|clearcache|download|export|print|delivery/.test(text)) return "L2 action";
  if (/add|edit|update|delete|import|upload/.test(text)) return "L1/L2 mutation";
  return "L0 query";
}

const staticGroupByPageKey = {
  "platform-scanCode": "scanRecords",
  "platform-scanRecords": "scanRecords",
  "platform-billIssue": "billIssue",
  "platform-invoiceApplication": "invoiceApplication",
  "platform-redMark": "redMark",
  "billCenter-sign": "sign",
  "billCenter-invoiceVerification": "invoiceVerification",
  "billCenter-accessSetting": "accessSetting",
  "billCenter-taskManagement": "taskManagement",
  "bussiness-info": "goods",
  "bussiness-customer": "customer",
  "bussiness-credit": "credit",
  "bussiness-configurationManagement": "config",
  "system-dept": "system",
  "system-departmentInfo": "system",
  "system-role": "system",
  "system-onlineTaxationInfo": "system",
  "system-user": "system",
  downloadCenter: "download",
};

const minimalBatch = await readJson("docs/tax-cloud/TAX_CLOUD_MINIMAL_HAR_BATCH.json", { pages: [] });
const staticEvidence = await readJson("docs/tax-cloud/apis/static-js-endpoints.json", { groups: {} });
const authProbe = await readJson("docs/tax-cloud/apis/authenticated-read-probe.json", { results: [] });
const staticReadProbe = await readJson("docs/tax-cloud/apis/static-read-candidate-probe.json", { results: [] });

const probeByPage = new Map();
for (const result of [...(authProbe.results || []), ...(staticReadProbe.results || [])]) {
  const bucket = probeByPage.get(result.pageKey) || [];
  bucket.push(result);
  probeByPage.set(result.pageKey, bucket);
}

const rows = minimalBatch.pages.map((page) => {
  const groupKey = staticGroupByPageKey[page.key];
  const staticEndpoints = (staticEvidence.groups?.[groupKey] || [])
    .map((item) => item.endpoint)
    .filter(Boolean);
  const uniqueStaticEndpoints = [...new Set(staticEndpoints)];
  const probes = probeByPage.get(page.key) || [];
  const verifiedPaths = probes.map((probe) => ({
    method: probe.method,
    path: probe.path,
    httpStatus: probe.httpStatus,
    code: probe.code,
    msg: probe.msg,
    status:
      probe.code === 200 || probe.code === "0000" || probe.msg === "查询成功" || probe.msg === "操作成功"
        ? "success"
        : probe.httpStatus === 200 && probe.code !== 401
          ? "auth-accepted"
          : probe.httpStatus
            ? "transport-only"
            : "failed",
  }));
  const safeStaticEndpoints = uniqueStaticEndpoints.filter((endpoint) => classifyRisk(endpoint) === "L0 query");
  const riskyStaticEndpoints = uniqueStaticEndpoints.filter((endpoint) => classifyRisk(endpoint) !== "L0 query");
  return {
    pageKey: page.key,
    menu: page.menu,
    priority: page.priority,
    minimalHarFile: page.harFile,
    minimalAction: page.action,
    staticGroup: groupKey,
    staticEndpointCount: uniqueStaticEndpoints.length,
    safeStaticEndpoints: safeStaticEndpoints.slice(0, 12),
    riskyStaticEndpoints: riskyStaticEndpoints.slice(0, 12),
    verifiedPaths,
    nextStep: probes.some((probe) => probe.code === 200 || probe.code === "0000")
      ? "按该成功接口补真实 HAR，校正 payload/分页字段。"
      : probes.some((probe) => probe.httpStatus === 200)
        ? "认证已被接受，需从真实页面 HAR 反查缺失参数或运行时上下文。"
        : "只能使用静态候选定位页面 Network，禁止猜测提交类接口。",
  };
});

const summary = {
  generatedAt: new Date().toISOString(),
  missingHarPages: rows.length,
  pagesWithStaticEvidence: rows.filter((row) => row.staticEndpointCount > 0).length,
  pagesWithAuthProbe: rows.filter((row) => row.verifiedPaths.length > 0).length,
  pagesWithSuccessfulProbe: rows.filter((row) => row.verifiedPaths.some((probe) => probe.status === "success")).length,
  staticReadSecondPass: staticReadProbe.summary || null,
  rows,
};

function mdList(items) {
  if (!items.length) return "无";
  return items.map((item) => `\`${item}\``).join("<br>");
}

function mdProbeList(items) {
  if (!items.length) return "无";
  return items
    .map((item) => `\`${item.method} ${item.path}\`：${item.status}${item.msg ? `（${item.msg}）` : ""}`)
    .join("<br>");
}

const md = `# 数税云接口交叉校验表

生成时间：${summary.generatedAt}

## 口径

- 范围：当前仍缺真实 HAR 的 ${summary.missingHarPages} 个页面。
- 证据来源：静态 JS 候选接口 + 当前 Chrome 登录态只读接口探测。
- 额外二次探测：对基础只读探测未成功的页面，使用静态 JS 中明显查询类候选做安全二次探测。
- 本表用于校准接口方向，不能替代真实 Network/HAR。
- 禁止项：不触发保存、提交、签收确认、红字确认、勾选认证、真实开票、下载文件。

## 汇总

| 项目 | 数量 |
|---|---:|
| 缺 HAR 页面 | ${summary.missingHarPages} |
| 有静态源码候选页面 | ${summary.pagesWithStaticEvidence} |
| 有已认证探测页面 | ${summary.pagesWithAuthProbe} |
| 有业务成功探测页面 | ${summary.pagesWithSuccessfulProbe} |
| 二次探测业务成功接口 | ${summary.staticReadSecondPass?.success ?? 0} |
| 二次探测业务成功页面 | ${summary.staticReadSecondPass?.pagesWithSuccess ?? 0} |

## 明细

| pageKey | 菜单 | 静态候选 | 已认证探测 | 风险候选摘录 | 下一步 |
|---|---|---|---|---|---|
${rows
  .map(
    (row) =>
      `| \`${row.pageKey}\` | ${row.menu} | ${mdList(row.safeStaticEndpoints)} | ${mdProbeList(row.verifiedPaths)} | ${mdList(row.riskyStaticEndpoints)} | ${row.nextStep} |`,
  )
  .join("\n")}

## 结论

这 ${summary.missingHarPages} 个页面已经不是“未知接口”状态：静态候选和已认证探测都已归位。下一步只差真实 HAR，把页面实际请求的 method、payload、分页参数和响应字段落成脱敏 normalized 证据。
`;

await mkdir(path.join(root, "docs/tax-cloud"), { recursive: true });
await writeFile(path.join(root, jsonOutPath), JSON.stringify(summary, null, 2));
await writeFile(path.join(root, mdOutPath), md);

console.log(
  JSON.stringify(
    {
      missingHarPages: summary.missingHarPages,
      pagesWithStaticEvidence: summary.pagesWithStaticEvidence,
      pagesWithAuthProbe: summary.pagesWithAuthProbe,
      pagesWithSuccessfulProbe: summary.pagesWithSuccessfulProbe,
    },
    null,
    2,
  ),
);
