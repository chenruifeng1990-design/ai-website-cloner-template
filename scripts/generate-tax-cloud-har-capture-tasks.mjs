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
  if (/不要求\s*HAR|L0-static|静态链接/.test(text)) return "L0 static";
  if (/读取|列表|查询|详情|看板|分析|统计|额度|字典|初始化/.test(text) && /L0/.test(text)) return "L0 query";
  if (/真实开票|提交开票|红冲|作废|红字|勾选认证|统计确认/.test(text)) return "L4/L3 review";
  if (/签收|取票|同步|下载|导出|版式|推送|任务|新增|修改|删除|保存|暂存/.test(text)) return "L2 review";
  if (/查询|列表|详情|看板|分析|统计|额度|字典/.test(text)) return "L0 query";
  return "manual review";
}

function isHarExemptCandidate(value) {
  const text = String(value || "");
  return (
    /不要求\s*HAR|L0-static/.test(text) ||
    /(^|\s)ERP\s|`\/api\//.test(text) ||
    /禁止自动触发|真实后果待确认|ynfp\./.test(text)
  );
}

function uniqueTasks(pageKey, candidates) {
  const actionNames = new Map();
  const harCandidates = candidates.filter((candidate) => !isHarExemptCandidate(candidate));
  const source = harCandidates.length ? harCandidates : ["默认页面加载/列表查询：需要抓取首屏接口，L0。"];
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

function excludedCandidates(candidates) {
  return candidates.filter((candidate) => isHarExemptCandidate(candidate));
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

const staticEndpointHints = {
  "platform-scanCode": [
    "/bussiness/scanInvoice/getScanInvoiceInfo",
    "/bussiness/scanInvoice/getScanInvoiceBillInfo",
    "/bussiness/scanInvoice/getOuterPdfBase64",
    "/bussiness/scanInvoice/H5CommitIssue",
  ],
  "platform-scanRecords": [
    "/bussiness/scanInvoice/getClientDateByCode",
    "/bussiness/scanInvoice/getClientGuess",
    "/bussiness/scanInvoice/invoiceDelivery",
  ],
  "platform-billIssue": [
    "/bussiness/billIssue/",
    "/bussiness/bizBillInfo/findDraftList",
    "/bussiness/bizBillInfo/stagingOrder",
    "/bussiness/bizBillInfo/issue",
    "/bussiness/bizBillInfo/allElectricInvoice/issue",
  ],
  "platform-invoiceApplication": ["/deliveryWithGoods/list", "/deliveryWithGoods/detail", "/deliveryWithGoods/search"],
  "platform-redMark": [
    "/bussiness/redConfirmInfo/list",
    "/bussiness/redConfirmInfo/queryBlue",
    "/bussiness/redConfirmInfo/commit",
    "/bussiness/redConfirmInfo/batchConfirm",
    "/bussiness/redConfirmInfo/sync",
  ],
  "billCenter-sign": ["/invoicePool/signInvoices", "/invoiceFolder/addFromPool", "/inputtax/h51InputTax/confirmSign"],
  "billCenter-invoiceVerification": [
    "/invoicecheck/check/list/thirdPlatform/dataList",
    "/invoicecheck/check/list/thirdPlatform/getData",
    "/invoicecheck/validate/code/value/",
    "/reCheckInvoice",
  ],
  "billCenter-accessSetting": [
    "/invoicecenter/sjruzhang/getSjruzhangSetting",
    "/invoicecenter/sjruzhang/saveSjruzhangSetting",
    "/invoicecenter/sjruzhang/restartTask",
  ],
  "billCenter-taskManagement": ["/system/taskRecord/list", "/system/taskRecord/restart/", "/invoicecenter/sjruzhang/getSjruzhangInfo"],
  "bussiness-info": [
    "/bussiness/bizGoodsInfo/selectBizGoodsInfoOuterList",
    "/bussiness/bizGoodsInfo/getGoodsGuess",
    "/system/kpm/getSpxxByKpmGoodsId",
    "/system/kpm/checkKpmmcRepeat",
  ],
  "bussiness-customer": [
    "/bussiness/bizCustomer/selectBizCustomerInfoOutNotList",
    "/bussiness/bizCustomer/getClientGuessIssue",
    "/bussiness/bizCustomer/getClientDateByCodeIssue",
  ],
  "bussiness-credit": ["/bussiness/creditLine/query", "/prod-api/bussiness/credit/creditInfo/1"],
  "bussiness-configurationManagement": [
    "/system/config/list",
    "/system/config/configKey/",
    "/system/config/clearCache",
    "/bussiness/configurationManagement",
  ],
  "system-dept": ["/system/dept/list", "/system/dept/treeselect", "/system/dept/getOneInfo", "/system/dept/loginDeptList"],
  "system-departmentInfo": ["/system/departmentInfo/list", "/system/departmentInfo/listByDeptIds"],
  "system-role": ["/system/role", "/system/dept/roleDeptTreeselect/"],
  "system-onlineTaxationInfo": [
    "/system/bizOnlineTaxInformation/getOnlineTax",
    "/system/bizOnlineTaxInformation/selectBizOnlineTaxInfoList",
    "/system/bizOnlineTaxInformation/getUserLoginInfoByDeptIdAndUserId",
  ],
  "system-user": ["/system/user", "/system/user/profile/avatar", "/system/user/noviceGuide"],
  downloadCenter: [
    "/download/template",
    "/download/template/taskId",
    "/download/XML/taskId",
    "/invoicecenter/invoiceTemplate/v1/download/template",
    "/invoicecenter/invoiceTemplate/v1/download/XML",
  ],
};

function staticEvidenceForPage(staticEndpointEvidence, pageKey) {
  const groupKey = staticGroupByPageKey[pageKey];
  const groupItems = groupKey && staticEndpointEvidence?.groups?.[groupKey] ? staticEndpointEvidence.groups[groupKey] : [];
  const byEndpoint = new Map(groupItems.map((item) => [item.endpoint, item]));
  return (staticEndpointHints[pageKey] || []).map((endpoint) => {
    const hit = byEndpoint.get(endpoint);
    return {
      endpoint,
      file: hit?.file || "",
      foundInStaticBundle: Boolean(hit),
    };
  });
}

const targetPages = await readJson("docs/tax-cloud/captures/target-pages.json", []);
const normalizedFiles = (await listFiles("docs/tax-cloud/apis")).filter((file) => file.endsWith(".har-normalized.json"));
const staticEndpointEvidence = await readJson("docs/tax-cloud/apis/static-js-endpoints.json", null);
const isRealHarEvidence = (summary) => {
  if (!summary) return false;
  if (summary.pageKey === "platform-created") return false;
  if (summary.placeholder) return false;
  if (summary.evidenceMode === "placeholder") return false;
  return (summary.taxCloudApiEntries || 0) > 0;
};
const evidenceByPage = new Map();
for (const file of normalizedFiles) {
  const data = await readJson(`docs/tax-cloud/apis/${file}`, null);
  const pageKey = data?.summary?.pageKey || "";
  if (!isRealHarEvidence(data?.summary)) continue;
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
    excludedCandidates: excludedCandidates(candidates),
    staticEvidence: staticEvidenceForPage(staticEndpointEvidence, page.key),
    evidence: evidenceByPage.get(page.key) || [],
  });
}

const pagesWithEvidence = pages.filter((page) => page.evidence.length > 0);
const pagesMissingEvidence = pages.filter((page) => page.evidence.length === 0);
const taskCount = pages.reduce((sum, page) => sum + page.tasks.length, 0);
const excludedCandidateCount = pages.reduce((sum, page) => sum + page.excludedCandidates.length, 0);

const report = `# 数税云 HAR 采集任务清单

生成时间：${new Date().toISOString()}

## 口径

- 手工开票 \`platform-created\` 已冻结为票面基线，本清单不再要求重跑页面复刻。
- 本清单覆盖剩余 ${pages.length} 个非手工页面。
- 原始 HAR 只放在 \`docs/tax-cloud/network-har/\`，该目录已忽略 \`*.har\`，不得提交原始 Cookie/token。
- “源码候选接口”来自 \`docs/tax-cloud/apis/static-js-endpoints.json\`，只能用于指导补采，不能替代真实 HAR。
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
| 非默认 HAR 采集候选 | ${excludedCandidateCount} |
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
    const staticEvidence = page.staticEvidence.length
      ? page.staticEvidence
          .map(
            (row) =>
              `  - \`${row.endpoint}\`${row.file ? `（${row.file}）` : ""}${row.foundInStaticBundle ? "" : "（当前静态包未命中，保留人工复核）"}`,
          )
          .join("\n")
      : "  - 暂无静态 JS 候选接口。";
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
- 源码候选接口：
${staticEvidence}

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

## 非默认 HAR 采集候选

以下候选不是漏项，而是默认 HAR 补抓清单刻意排除的内容：ERP 内部接口、开放 API interfaceCode、静态安装包链接，或明确禁止自动触发/真实后果未确认的动作。它们保留在 page spec、接口清单和风险矩阵里，进入 ERP 落地或高风险专项时再处理。

| pageKey | 菜单 | 排除候选 |
|---|---|---|
${pages
  .flatMap((page) =>
    page.excludedCandidates.map(
      (candidate) => `| \`${page.key}\` | ${escapeTable(`${page.menu1}/${page.menu2}`)} | ${escapeTable(candidate)} |`,
    ),
  )
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
      totalExcludedCandidates: excludedCandidateCount,
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
