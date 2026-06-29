#!/usr/bin/env node

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const outPath = valueOf("--out") || "docs/tax-cloud/TAX_CLOUD_HAR_CAPTURE_TASKS.md";
const jsonOutPath = valueOf("--json") || "docs/tax-cloud/TAX_CLOUD_HAR_CAPTURE_TASKS.json";
const root = process.cwd();
const frozenPageKeys = new Set(["platform-created"]);

function valueOf(prefix) {
  const hit = args.find((arg) => arg.startsWith(`${prefix}=`));
  return hit ? hit.slice(prefix.length + 1) : "";
}

async function readJson(relativePath, fallback) {
  try {
    return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

async function readText(relativePath) {
  try {
    return await readFile(path.join(root, relativePath), "utf8");
  } catch {
    return "";
  }
}

async function listFiles(relativeDir) {
  try {
    return await readdir(path.join(root, relativeDir));
  } catch {
    return [];
  }
}

function extractSectionBullets(markdown, heading) {
  if (!markdown) return [];
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (start === -1) return [];
  const result = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^##\s+/.test(line)) break;
    const match = line.match(/^\s*-\s+(.+?)\s*$/);
    if (match) result.push(match[1]);
  }
  return result;
}

function extractPriority(markdown) {
  const match = markdown.match(/^\s*-\s*优先级：(.+?)\s*$/m);
  return match ? match[1].trim() : "P3";
}

function escapeTable(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function slugify(value) {
  const text = String(value || "")
    .replace(/`[^`]+`/g, "")
    .replace(/[：:，,。；;、（）()【】\[\]<>《》]/g, " ")
    .trim();
  const hits = [
    [/额度|credit/i, "creditInfo"],
    [/列表|清单|查询|筛选|搜索|看板|分析|统计|趋势|排行|地区|税率|默认/i, "default-list"],
    [/详情|明细|查看/i, "detail"],
    [/下载|导出|版式|文件/i, "download"],
    [/同步|取票|获取|拉取/i, "sync"],
    [/保存|暂存|提交|确认|签收|勾选|认证|红字|作废|开票|推送|删除|新增|修改/i, "action-review"],
  ];
  const found = hits.find(([regex]) => regex.test(text));
  if (found) return found[1];
  return "default";
}

function riskFromCandidate(value) {
  const text = String(value || "");
  if (/真实开票|提交开票|红冲|作废|红字|勾选认证|统计确认/.test(text)) return "L4/L3 review";
  if (/签收|取票|同步|下载|导出|版式|推送|任务|新增|修改|删除|保存|暂存/.test(text)) return "L2 review";
  if (/查询|列表|详情|看板|分析|统计|额度|字典/.test(text)) return "L0 query";
  return "manual review";
}

function uniqueTasks(pageKey, candidates) {
  const actionNames = new Map();
  const source = candidates.length ? candidates : ["默认页面加载/列表查询：需要抓取首屏接口，L0。"];
  for (const candidate of source) {
    const base = slugify(candidate);
    const used = actionNames.get(base) || 0;
    actionNames.set(base, used + 1);
  }
  const seen = new Map();
  return source.map((candidate) => {
    const base = slugify(candidate);
    const used = seen.get(base) || 0;
    seen.set(base, used + 1);
    const suffix = used === 0 ? base : `${base}-${used + 1}`;
    return {
      action: suffix,
      candidate,
      risk: riskFromCandidate(candidate),
      harFile: `${pageKey}.${suffix}.har`,
    };
  });
}

const targetPages = await readJson("docs/tax-cloud/captures/target-pages.json", []);
const normalizedFiles = (await listFiles("docs/tax-cloud/apis")).filter((file) => file.endsWith(".har-normalized.json"));
const evidenceByPage = new Map();
for (const file of normalizedFiles) {
  const data = await readJson(`docs/tax-cloud/apis/${file}`, null);
  const pageKey = data?.summary?.pageKey || "";
  if (!pageKey || (data?.summary?.taxCloudApiEntries || 0) <= 0) continue;
  const rows = evidenceByPage.get(pageKey) || [];
  rows.push({
    file,
    taxCloudApiEntries: data.summary.taxCloudApiEntries || 0,
    byRisk: data.summary.byRisk || {},
  });
  evidenceByPage.set(pageKey, rows);
}

const pages = [];
for (const page of targetPages) {
  if (!page.key || frozenPageKeys.has(page.key)) continue;
  const specPath = `docs/tax-cloud/pages/${page.key}.page.md`;
  const spec = await readText(specPath);
  const candidates = extractSectionBullets(spec, "接口候选");
  pages.push({
    key: page.key,
    menu1: page.menu1 || "",
    menu2: page.menu2 || "",
    url: page.url || "",
    priority: extractPriority(spec),
    specPath,
    candidates,
    tasks: uniqueTasks(page.key, candidates),
    evidence: evidenceByPage.get(page.key) || [],
  });
}

const pagesWithEvidence = pages.filter((page) => page.evidence.length > 0);
const pagesMissingEvidence = pages.filter((page) => page.evidence.length === 0);
const taskCount = pages.reduce((sum, page) => sum + page.tasks.length, 0);

const report = `# 数税云 HAR 采集任务清单

生成时间：${new Date().toISOString()}

## 口径

- 手工开票 \`platform-created\` 已冻结为票面基线，本清单不再要求重跑页面复刻。
- 本清单覆盖剩余 ${pages.length} 个非手工页面。
- 原始 HAR 只放在 \`docs/tax-cloud/network-har/\`，该目录已忽略 \`*.har\`，不得提交原始 Cookie/token。
- 每采完一批 HAR 后执行：

\`\`\`bash
npm run tax-cloud:har:parse-all
npm run tax-cloud:har:tasks
npm run tax-cloud:audit
\`\`\`

## 汇总

| 项目 | 数量 |
|---|---:|
| 待采非手工页面 | ${pages.length} |
| 页面动作任务 | ${taskCount} |
| 已有 HAR 证据页面 | ${pagesWithEvidence.length} |
| 缺 HAR 证据页面 | ${pagesMissingEvidence.length} |

## 页面级进度

| 优先级 | pageKey | 菜单 | 建议 HAR 数 | 证据状态 | URL |
|---|---|---|---:|---|---|
${pages
  .map(
    (page) =>
      `| ${escapeTable(page.priority)} | \`${page.key}\` | ${escapeTable(`${page.menu1}/${page.menu2}`)} | ${page.tasks.length} | ${page.evidence.length ? `done(${page.evidence.length})` : "missing"} | ${escapeTable(page.url)} |`,
  )
  .join("\n")}

## 逐页采集任务

${pages
  .map((page) => {
    const evidence = page.evidence.length
      ? page.evidence
          .map((row) => `  - \`${row.file}\`：${row.taxCloudApiEntries} 条接口，risk=${JSON.stringify(row.byRisk)}`)
          .join("\n")
      : "  - 暂无 normalized HAR 证据。";
    const tasks = page.tasks
      .map(
        (task, index) =>
          `| ${index + 1} | \`${task.harFile}\` | ${escapeTable(task.action)} | ${escapeTable(task.risk)} | ${escapeTable(task.candidate)} |`,
      )
      .join("\n");
    return `### ${page.priority} · ${page.menu1}/${page.menu2} · \`${page.key}\`

- URL：${page.url}
- page spec：\`${page.specPath}\`
- 当前证据：
${evidence}

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
${tasks}

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 \`docs/tax-cloud/network-har/\`。
6. 执行 \`npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit\`。
`;
  })
  .join("\n")}
`;

await mkdir(path.dirname(path.join(root, outPath)), { recursive: true });
await writeFile(path.join(root, outPath), report);
await writeFile(
  path.join(root, jsonOutPath),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      frozenPageKeys: [...frozenPageKeys],
      totalPages: pages.length,
      totalTasks: taskCount,
      pagesWithEvidence: pagesWithEvidence.length,
      pagesMissingEvidence: pagesMissingEvidence.map((page) => page.key),
      pages,
    },
    null,
    2,
  ),
);

console.log(`Generated ${outPath}`);
console.log(`Generated ${jsonOutPath}`);
console.log(`Pages: ${pages.length}; tasks: ${taskCount}; pages with evidence: ${pagesWithEvidence.length}`);
