#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const auditPath = "docs/tax-cloud/TAX_CLOUD_MISSING_PAGES_LOGIN_STATE_AUDIT.json";
const outPath = "docs/tax-cloud/TAX_CLOUD_MISSING_PAGES_LOGIN_STATE_AUDIT.md";

const authPanelButtons = new Set(["刷新二维码", "我已认证", "登录"]);

function escapeCell(value) {
  return String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ")
    .trim();
}

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function shortText(value, max = 180) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

const audit = JSON.parse(await readFile(path.join(root, auditPath), "utf8"));
const rows = audit.rows || [];

const enrichedRows = rows.map((row) => {
  const riskButtons = unique(row.riskButtons || []);
  const authButtons = riskButtons.filter((button) => authPanelButtons.has(button));
  const businessRiskButtons = riskButtons.filter((button) => !authPanelButtons.has(button));
  return {
    ...row,
    authButtons,
    businessRiskButtons,
  };
});

const businessRiskIndex = new Map();
const authPanelIndex = new Map();
for (const row of enrichedRows) {
  for (const button of row.businessRiskButtons) {
    businessRiskIndex.set(button, [...(businessRiskIndex.get(button) || []), row.key]);
  }
  for (const button of row.authButtons) {
    authPanelIndex.set(button, [...(authPanelIndex.get(button) || []), row.key]);
  }
}

const loginReachable = enrichedRows.filter((row) => (row.loginSignals || []).length > 0).length;
const businessRiskLines = [...businessRiskIndex.entries()]
  .sort(([a], [b]) => a.localeCompare(b, "zh-Hans-CN"))
  .map(([button, keys]) => `- \`${button}\`：${unique(keys).map((key) => `\`${key}\``).join("、")}`)
  .join("\n");
const authPanelLines = [...authPanelIndex.entries()]
  .sort(([a], [b]) => a.localeCompare(b, "zh-Hans-CN"))
  .map(([button, keys]) => `- \`${button}\`：${unique(keys).length} 个页面认证侧栏出现，仅证明认证面板存在，不计入业务接口采集任务。`)
  .join("\n");

const report = `# 数税云 19 个缺口页登录态巡检报告

生成时间：${audit.generatedAt || new Date().toISOString()}

## 口径

- 本报告来自当前 Chrome 已登录数税云页面逐页只读巡检。
- 只执行页面导航和 DOM 读取，不点击提交、签收、红冲、认证、真实开票、删除、保存等动作。
- 本报告证明 19 个缺口页在登录态下可达，并把业务高风险按钮与认证面板按钮分开；不替代真实 HAR。
- 真实接口完成仍以 \`npm run tax-cloud:audit:strict\` 的 HAR 证据为准。

## 总览

| 项目 | 数量 |
|---|---:|
| 巡检页面 | ${enrichedRows.length} |
| 登录态可达 | ${loginReachable} |
| 仍缺真实 HAR | ${enrichedRows.length} |
| 出现业务高风险按钮的页面 | ${enrichedRows.filter((row) => row.businessRiskButtons.length > 0).length} |

## 页面明细

| pageKey | 菜单 | 登录态信号 | 业务高风险按钮/动作 | 认证面板按钮 | 当前状态摘要 |
|---|---|---|---|---|---|
${enrichedRows
  .map(
    (row) =>
      `| \`${row.key}\` | ${escapeCell(row.menu)} | ${escapeCell((row.loginSignals || []).join("、"))} | ${escapeCell(row.businessRiskButtons.join("、") || "无")} | ${escapeCell(row.authButtons.join("、") || "无")} | ${escapeCell(shortText(row.textSample))} |`,
  )
  .join("\n")}

## 业务高风险动作边界

下列按钮/动作只记录，不在自动采集流程中点击：

${businessRiskLines || "- 无"}

## 认证面板按钮说明

下列按钮来自数电登录/认证侧栏，不属于当前业务页按钮，不作为业务接口缺口：

${authPanelLines || "- 无"}

## 下一步

\`\`\`text
打开页面 → DevTools Network Clear → 只执行查询/默认列表/只读详情 → Save all as HAR with content → parse-all → audit:strict
\`\`\`

优先顺序：

1. 低风险 L0/L1 查询页：扫码记录、订单开票列表、申请单列表、查验列表、任务列表、商品/客户列表、额度配置、系统列表。
2. L2 任务/下载类只做列表，不点下载/重试/同步。
3. L3/L4 动作保持隔离：批量开票、红字确认单填开、签收确认、认证/勾选、保存配置、删除。
`;

await mkdir(path.dirname(path.join(root, outPath)), { recursive: true });
await writeFile(path.join(root, outPath), report);
console.log(report);
