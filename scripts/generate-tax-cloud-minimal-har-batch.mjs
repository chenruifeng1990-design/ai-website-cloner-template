#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outPath = "docs/tax-cloud/TAX_CLOUD_MINIMAL_HAR_BATCH.md";
const jsonOutPath = "docs/tax-cloud/TAX_CLOUD_MINIMAL_HAR_BATCH.json";

async function readJson(relativePath, fallback) {
  try {
    return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

function escapeTable(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function taskScore(task) {
  const text = `${task.action || ""} ${task.risk || ""} ${task.candidate || ""}`;
  let score = 0;
  if (/L0 query/.test(text)) score += 100;
  if (/default-list|default|读取|列表|查询|初始化|配置\/引导态/.test(text)) score += 50;
  if (/L2|L3|L4|review|保存|提交|签收|红字|重启|下载|导出|开票/.test(text)) score -= 50;
  if (/禁止|真实后果/.test(text)) score -= 100;
  return score;
}

function pickMinimalTask(page) {
  const tasks = [...(page.tasks || [])].filter(
    (task) => !/L2|L3|L4|manual|review/i.test(task.risk || "") && !/L1|L2|L3|L4|保存|提交|启停|删除|修改/.test(task.candidate || ""),
  );
  tasks.sort((a, b) => taskScore(b) - taskScore(a));
  return (
    tasks[0] || {
      harFile: `${page.key}.default-list.har`,
      action: "default-list",
      risk: "L0 query",
      candidate: "默认页面加载/列表查询：只抓首屏和低风险查询接口；如页面无业务 API，记录页面事实，不推进保存/提交类动作。",
    }
  );
}

function priorityRank(priority) {
  if (/P0/.test(priority)) return 0;
  if (/P1/.test(priority)) return 1;
  if (/P2/.test(priority)) return 2;
  return 3;
}

const tasksDoc = await readJson("docs/tax-cloud/TAX_CLOUD_HAR_CAPTURE_TASKS.json", null);
if (!tasksDoc) {
  throw new Error("Missing docs/tax-cloud/TAX_CLOUD_HAR_CAPTURE_TASKS.json. Run npm run tax-cloud:har:tasks first.");
}

const missingPages = (tasksDoc.pages || [])
  .filter((page) => !(page.evidence || []).length)
  .map((page) => ({ ...page, minimalTask: pickMinimalTask(page) }))
  .sort((a, b) => priorityRank(a.priority) - priorityRank(b.priority) || String(a.key).localeCompare(String(b.key)));

const summary = {
  generatedAt: new Date().toISOString(),
  source: "docs/tax-cloud/TAX_CLOUD_HAR_CAPTURE_TASKS.json",
  missingPages: missingPages.length,
  minimalTasks: missingPages.filter((page) => page.minimalTask).length,
  pages: missingPages.map((page) => ({
    key: page.key,
    menu: `${page.menu1}/${page.menu2}`,
    priority: page.priority,
    url: page.url,
    harFile: page.minimalTask?.harFile || "",
    action: page.minimalTask?.action || "",
    risk: page.minimalTask?.risk || "",
    candidate: page.minimalTask?.candidate || "",
  })),
};

const md = `# 数税云最小 HAR 补齐批次

生成时间：${summary.generatedAt}

## 口径

- 目标：先让 \`tax-cloud:audit:strict\` 的页面级真实 HAR 证据从当前 \`13/32\` 补到 \`32/32\`。
- 策略：每个缺口页优先只抓 1 条最低风险、最接近默认加载/列表/读取的 HAR。
- 不包含：保存、提交、签收、红字、真实开票、认证、重启任务、下载文件等高风险或真实副作用动作。
- 本文件不替代完整任务表；完整任务仍看 \`TAX_CLOUD_HAR_CAPTURE_TASKS.md\`。

## 汇总

| 项目 | 数量 |
|---|---:|
| 缺 HAR 页面 | ${summary.missingPages} |
| 最小补齐 HAR | ${summary.minimalTasks} |

## 最小批次

| 优先级 | pageKey | 菜单 | 建议 HAR 文件名 | 风险 | 采集动作 | URL |
|---|---|---|---|---|---|---|
${summary.pages
  .map(
    (page) =>
      `| ${escapeTable(page.priority)} | \`${page.key}\` | ${escapeTable(page.menu)} | \`${page.harFile}\` | ${escapeTable(page.risk)} | ${escapeTable(page.candidate)} | ${escapeTable(page.url)} |`,
  )
  .join("\n")}

## 执行步骤

1. 使用当前已登录 Chrome，不重新登录、不打开无关页面。
2. 对每一行页面：打开 URL，确认企业和账号正确。
3. DevTools Network 勾选 Preserve log，然后 Clear。
4. 只执行“采集动作”描述的默认加载/列表/读取动作。
5. Save all as HAR with content，按“建议 HAR 文件名”保存到 \`docs/tax-cloud/network-har/\`。
6. 每批保存后执行：

\`\`\`bash
npm run tax-cloud:har:parse-all
npm run tax-cloud:har:tasks
npm run tax-cloud:minimal-har
npm run tax-cloud:audit:strict
\`\`\`

## 安全线

- 看到“保存、提交、签收、红字、开票、重启、删除、认证、下载文件”等按钮，不点击。
- 如果页面默认弹窗只有“立即前往/保存设置/签收”等动作，先只保存默认加载 HAR；不要为了补接口去推进业务动作。
- 如果某页默认加载仍无业务 API，记录为页面事实，不用高风险动作硬补。
`;

await mkdir(path.dirname(path.join(root, outPath)), { recursive: true });
await writeFile(path.join(root, jsonOutPath), JSON.stringify(summary, null, 2));
await writeFile(path.join(root, outPath), md);

console.log(JSON.stringify({ missingPages: summary.missingPages, minimalTasks: summary.minimalTasks }, null, 2));
