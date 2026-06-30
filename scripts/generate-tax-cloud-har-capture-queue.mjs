#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outJson = "docs/tax-cloud/TAX_CLOUD_HAR_CAPTURE_QUEUE.json";
const outMd = "docs/tax-cloud/TAX_CLOUD_HAR_CAPTURE_QUEUE.md";

async function readJson(relativePath, fallback = null) {
  try {
    return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

function rankPriority(priority = "") {
  if (priority.includes("P0")) return 0;
  if (priority.includes("P1")) return 1;
  if (priority.includes("P2")) return 2;
  if (priority.includes("P3")) return 3;
  return 9;
}

function rankStatus(status = "") {
  if (status === "missing") return 0;
  if (status.startsWith("invalid")) return 1;
  if (status.startsWith("review")) return 2;
  if (status.startsWith("accepted")) return 9;
  return 5;
}

function safeActionFor(page, verifiedPaths) {
  const success = verifiedPaths.find((item) => item.status === "success");
  const authAccepted = verifiedPaths.find((item) => item.status === "auth-accepted");
  const chosen = success || authAccepted;
  if (chosen) {
    return `进入页面后只触发查询/默认加载，Network 中确认 \`${chosen.method || "GET"} ${chosen.path}\` 出现；不要点提交/保存/确认。`;
  }
  if (/scanCode|scanRecords/.test(page.key)) {
    return "进入页面后只等待默认加载或点击查询/搜索，不生成二维码、不提交扫码开票、不交付。";
  }
  if (/redMark/.test(page.key)) {
    return "进入页面后只抓列表查询，不查询蓝票、不提交红字、不确认。";
  }
  if (/sign/.test(page.key)) {
    return "进入页面后只抓初始化/列表查询，不点签收、确认签收或加入票夹。";
  }
  return "进入页面后只抓默认加载/列表/只读配置接口，不触发保存、重启、下载、导出或提交。";
}

function mdList(items) {
  if (!items?.length) return "无";
  return items.map((item) => `\`${item}\``).join("<br>");
}

const minimal = await readJson("docs/tax-cloud/TAX_CLOUD_MINIMAL_HAR_BATCH.json", { pages: [] });
const crosscheck = await readJson("docs/tax-cloud/TAX_CLOUD_INTERFACE_CROSSCHECK.json", { rows: [] });
const intake = await readJson("docs/tax-cloud/TAX_CLOUD_HAR_INTAKE_VALIDATION.json", { rows: [] });

const crossByPage = new Map((crosscheck.rows || []).map((row) => [row.pageKey, row]));
const intakeByPage = new Map((intake.rows || []).map((row) => [row.pageKey, row]));

const queue = (minimal.pages || []).map((page) => {
  const cross = crossByPage.get(page.key) || {};
  const intakeRow = intakeByPage.get(page.key) || {};
  const verifiedPaths = cross.verifiedPaths || [];
  const successCount = verifiedPaths.filter((item) => item.status === "success").length;
  const expectedPaths = intakeRow.expectedPaths || verifiedPaths.map((item) => item.path).filter(Boolean);
  return {
    pageKey: page.key,
    menu: page.menu,
    priority: page.priority,
    priorityRank: rankPriority(page.priority),
    url: page.url,
    harFile: page.harFile,
    intakeStatus: intakeRow.status || "unknown",
    intakeRank: rankStatus(intakeRow.status),
    successCount,
    expectedPaths,
    safeAction: safeActionFor(page, verifiedPaths),
    forbiddenActions: [
      "保存",
      "提交",
      "确认",
      "签收",
      "红字申请/确认",
      "真实开票",
      "勾选认证",
      "重启任务",
      "导出/下载文件",
      "删除",
    ],
  };
});

queue.sort((a, b) => {
  if (b.successCount !== a.successCount) return b.successCount - a.successCount;
  if (a.priorityRank !== b.priorityRank) return a.priorityRank - b.priorityRank;
  if (a.intakeRank !== b.intakeRank) return a.intakeRank - b.intakeRank;
  return a.pageKey.localeCompare(b.pageKey);
});

const output = {
  generatedAt: new Date().toISOString(),
  source: [
    "docs/tax-cloud/TAX_CLOUD_MINIMAL_HAR_BATCH.json",
    "docs/tax-cloud/TAX_CLOUD_INTERFACE_CROSSCHECK.json",
    "docs/tax-cloud/TAX_CLOUD_HAR_INTAKE_VALIDATION.json",
  ],
  summary: {
    total: queue.length,
    missing: queue.filter((item) => item.intakeStatus === "missing").length,
    withSuccessProbe: queue.filter((item) => item.successCount > 0).length,
  },
  queue,
};

const md = `# 数税云 HAR 捕获队列

生成时间：${output.generatedAt}

## 口径

- 范围：最小 HAR 补齐批次的 ${output.summary.total} 个页面。
- 排序：已探测到业务成功接口优先，其次按 P1/P2/P3，再按 intake 状态。
- 目标：按队列逐页补真实登录态 HAR，让 \`tax-cloud:audit:strict\` 从 13/32 推到 32/32。
- 禁止：保存、提交、确认、签收、红字、真实开票、勾选认证、重启任务、导出/下载文件、删除。

## 汇总

| 项目 | 数量 |
|---|---:|
| queue items | ${output.summary.total} |
| intake missing | ${output.summary.missing} |
| items with success probe | ${output.summary.withSuccessProbe} |

## 队列

| 顺序 | pageKey | 菜单 | HAR 文件 | 当前状态 | URL | 安全动作 | 预期接口 |
|---:|---|---|---|---|---|---|---|
${queue
  .map(
    (item, index) =>
      `| ${index + 1} | \`${item.pageKey}\` | ${item.menu} | \`${item.harFile}\` | ${item.intakeStatus} | ${item.url} | ${item.safeAction.replace(/\|/g, "\\|")} | ${mdList(item.expectedPaths)} |`,
  )
  .join("\n")}

## 执行命令

~~~bash
npm run tax-cloud:har:intake
npm run tax-cloud:har:parse-all
npm run tax-cloud:har:tasks
npm run tax-cloud:audit:strict
~~~
`;

await writeFile(path.join(root, outJson), `${JSON.stringify(output, null, 2)}\n`);
await writeFile(path.join(root, outMd), md);
console.log(JSON.stringify(output.summary, null, 2));
