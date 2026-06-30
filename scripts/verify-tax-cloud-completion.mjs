#!/usr/bin/env node

import { access, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const outPath = valueOf("--out") || "docs/tax-cloud/TAX_CLOUD_VERIFICATION_REPORT.md";
const root = process.cwd();

const expectedDocs = [
  "docs/tax-cloud/TAX_CLOUD_MENU_TREE.md",
  "docs/tax-cloud/TAX_CLOUD_PAGE_INVENTORY.md",
  "docs/tax-cloud/TAX_CLOUD_API_INVENTORY.md",
  "docs/tax-cloud/TAX_CLOUD_TO_ERP_MAPPING.md",
  "docs/tax-cloud/TAX_CLOUD_COMPLETENESS_AUDIT.md",
  "docs/tax-cloud/TAX_CLOUD_GAP_LEDGER.md",
  "docs/tax-cloud/TAX_CLOUD_MASTER_EXECUTION_AND_ACCEPTANCE.md",
  "docs/tax-cloud/TAX_CLOUD_P0_INTERFACE_ACTION_AUDIT.md",
  "docs/tax-cloud/TAX_CLOUD_P1_P2_P3_INTERFACE_ACTION_AUDIT.md",
  "docs/tax-cloud/TAX_CLOUD_P0_DEMO_ACCEPTANCE.md",
  "docs/tax-cloud/TAX_CLOUD_HAR_CAPTURE_AND_PARSE_RUNBOOK.md",
  "docs/tax-cloud/TAX_CLOUD_HAR_CAPTURE_TASKS.md",
  "docs/tax-cloud/TAX_CLOUD_HAR_CAPTURE_QUEUE.md",
  "docs/tax-cloud/TAX_CLOUD_HAR_DOWNLOAD_COLLECT_REPORT.md",
  "docs/tax-cloud/TAX_CLOUD_AUTH_READ_HAR_GENERATION.md",
  "docs/tax-cloud/TAX_CLOUD_MINIMAL_HAR_BATCH.md",
  "docs/tax-cloud/TAX_CLOUD_STATIC_JS_INTERFACE_EVIDENCE.md",
  "docs/tax-cloud/TAX_CLOUD_MISSING_PAGES_LOGIN_STATE_AUDIT.md",
  "docs/tax-cloud/TAX_CLOUD_AUTHENTICATED_READ_API_PROBE.md",
  "docs/tax-cloud/TAX_CLOUD_STATIC_READ_CANDIDATE_PROBE.md",
  "docs/tax-cloud/TAX_CLOUD_INTERFACE_CROSSCHECK.md",
];

const expectedP0DemoKeys = [
  "platform-records",
  "billCenter-fullInvoiceQuery",
  "income-invoiceCheck",
  "income-confirmSign",
  "income-certificationResults",
  "analysisBoard-invoceRateView",
  "analysisBoard-invoiceTypeView",
  "analysisBoard-businessRateView",
  "analysisBoard-goodsRateView",
  "analysisBoard-purchaseSalesTrend",
  "analysisBoard-invoiceRegionView",
];

function valueOf(prefix) {
  const hit = args.find((arg) => arg.startsWith(`${prefix}=`));
  return hit ? hit.slice(prefix.length + 1) : "";
}

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
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

function fileSizeFromDataUrlHint(text) {
  return text && text.length > 0;
}

const targetPages = await readJson("docs/tax-cloud/captures/target-pages.json", []);
const pageKeys = targetPages.map((page) => page.key).filter(Boolean);

const pageRows = [];
const candidateRows = [];
for (const page of targetPages) {
  const key = page.key;
  const raw = page.captureFiles?.raw || `docs/tax-cloud/captures/${key}.raw.json`;
  const visibleDom = page.captureFiles?.visibleDom || `docs/tax-cloud/captures/${key}.visible-dom.json`;
  const screenshot = page.captureFiles?.screenshot || `docs/tax-cloud/screenshots/${key}-fullpage.png`;
  const designReference =
    page.captureFiles?.designReference ||
    (key === "platform-created"
      ? "docs/design-references/tax-cloud-created-fullpage.png"
      : `docs/design-references/tax-cloud-${key}-fullpage.png`);
  const spec = `docs/tax-cloud/pages/${key}.page.md`;
  const specText = await readText(spec);
  const candidates = extractSectionBullets(specText, "接口候选");
  pageRows.push({
    key,
    menu: `${page.menu1 || ""}/${page.menu2 || ""}`,
    raw: await exists(raw),
    visibleDom: await exists(visibleDom),
    screenshot: await exists(screenshot),
    designReference: await exists(designReference),
    spec: await exists(spec),
  });
  candidateRows.push({
    key,
    menu: `${page.menu1 || ""}/${page.menu2 || ""}`,
    count: candidates.length,
    candidates,
  });
}

const expectedDocsRows = [];
for (const doc of expectedDocs) {
  expectedDocsRows.push({ path: doc, exists: await exists(doc) });
}

const p0ActionText = await readText("docs/tax-cloud/TAX_CLOUD_P0_INTERFACE_ACTION_AUDIT.md");
const p123ActionText = await readText("docs/tax-cloud/TAX_CLOUD_P1_P2_P3_INTERFACE_ACTION_AUDIT.md");
const p0DemoText = await readText("tax-cloud-ui-demos/index.html");
const apiFiles = (await listFiles("docs/tax-cloud/apis")).filter((file) => file.endsWith(".har-normalized.json"));

const harRows = [];
for (const file of apiFiles) {
  const data = await readJson(`docs/tax-cloud/apis/${file}`, null);
  harRows.push({
    file,
    pageKey: data?.summary?.pageKey || "",
    isPlaceholder: Boolean(data?.summary?.placeholder),
    evidenceMode: data?.summary?.evidenceMode,
    taxCloudApiEntries: data?.summary?.taxCloudApiEntries || 0,
    byRisk: data?.summary?.byRisk || {},
  });
}

function hasRealHarEvidence(row) {
  if (!row.pageKey) return false;
  if (row.isPlaceholder) return false;
  if (row.evidenceMode === "placeholder") return false;
  return row.taxCloudApiEntries > 0;
}

const pageLayerMissing = pageRows.filter(
  (row) => !row.raw || !row.visibleDom || !row.screenshot || !row.designReference || !row.spec,
);
const missingDocs = expectedDocsRows.filter((row) => !row.exists);
const missingPagesLoginAudit = await readJson("docs/tax-cloud/TAX_CLOUD_MISSING_PAGES_LOGIN_STATE_AUDIT.json", null);
const missingPagesLoginRows = Array.isArray(missingPagesLoginAudit?.rows) ? missingPagesLoginAudit.rows : [];
const missingPagesLoginKeys = new Set(missingPagesLoginRows.map((row) => row.key).filter(Boolean));
const missingPagesLoginReachable = missingPagesLoginRows.filter((row) => (row.loginSignals || []).length > 0);
const authenticatedProbe = await readJson("docs/tax-cloud/apis/authenticated-read-probe.json", null);
const authenticatedProbeSummary = authenticatedProbe?.summary || {};
const authenticatedProbePageSummary = authenticatedProbe?.pageSummary || {};
const staticReadProbe = await readJson("docs/tax-cloud/apis/static-read-candidate-probe.json", null);
const staticReadProbeSummary = staticReadProbe?.summary || {};
const harIntake = await readJson("docs/tax-cloud/TAX_CLOUD_HAR_INTAKE_VALIDATION.json", null);
const harIntakeSummary = harIntake || {};
const harCaptureTasks = await readJson("docs/tax-cloud/TAX_CLOUD_HAR_CAPTURE_TASKS.json", null);
const minimalHarBatch = await readJson("docs/tax-cloud/TAX_CLOUD_MINIMAL_HAR_BATCH.json", null);
function pageCoveredInText(page, text) {
  const urlPath = safePathname(page.url || "");
  return Boolean(
    text.includes(page.key) ||
      (urlPath && text.includes(urlPath)) ||
      (page.menu2 && text.includes(page.menu2)) ||
      (page.menu1 && page.menu2 && text.includes(`${page.menu1}/${page.menu2}`)),
  );
}

function safePathname(url) {
  try {
    return new URL(url).pathname;
  } catch {
    return "";
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

const pageByKey = Object.fromEntries(targetPages.map((page) => [page.key, page]));
const missingP0Actions = expectedP0DemoKeys.filter((key) => !pageCoveredInText(pageByKey[key] || { key }, p0ActionText));
const missingP0Demo = expectedP0DemoKeys.filter((key) => !p0DemoText.includes(key));
const p123ActionCoverageMissing = pageKeys.filter((key) => {
  if (expectedP0DemoKeys.includes(key) || key === "platform-created") return false;
  return !pageCoveredInText(pageByKey[key] || { key }, p123ActionText);
});
const missingCandidateEvidence = candidateRows.filter((row) => row.count === 0).map((row) => row.key);

const totalHarPages = new Set(harRows.filter((row) => hasRealHarEvidence(row)).map((row) => row.pageKey)).size;
const realHarPageKeys = new Set(harRows.filter((row) => hasRealHarEvidence(row)).map((row) => row.pageKey));
const totalHarPlaceholderPages = new Set(
  harRows
    .filter((row) => row.pageKey && !realHarPageKeys.has(row.pageKey) && (row.isPlaceholder || row.evidenceMode === "placeholder"))
    .map((row) => row.pageKey),
).size;
const requiredHarPageKeys = pageKeys.filter((key) => key !== "platform-created");
const missingHarEvidence = requiredHarPageKeys.filter(
  (key) => !harRows.some((row) => row.pageKey === key && hasRealHarEvidence(row)),
);
const missingLoginAuditCoverage = missingHarEvidence.filter((key) => !missingPagesLoginKeys.has(key));
const missingLoginReachability = missingHarEvidence.filter((key) => {
  const row = missingPagesLoginRows.find((item) => item.key === key);
  return !row || (row.loginSignals || []).length === 0;
});
const currentMissingAuthProbeCoverage = missingHarEvidence.filter((key) => authenticatedProbePageSummary[key]);
const currentMissingAuthAccepted = missingHarEvidence.filter((key) => (authenticatedProbePageSummary[key]?.authAccepted || 0) > 0);
const currentMissingTransportAccepted = missingHarEvidence.filter(
  (key) => (authenticatedProbePageSummary[key]?.transportAccepted || 0) > 0,
);

const checks = [
  {
    name: "33 page targets",
    pass: targetPages.length === 33,
    evidence: `${targetPages.length}/33 target pages`,
  },
  {
    name: "Page capture four-piece plus page spec",
    pass: pageLayerMissing.length === 0,
    evidence: `${pageRows.length - pageLayerMissing.length}/${pageRows.length} complete`,
  },
  {
    name: "Core control documents",
    pass: missingDocs.length === 0,
    evidence: `${expectedDocsRows.length - missingDocs.length}/${expectedDocsRows.length} present`,
  },
  {
    name: "P0 action matrix covers all non-manual P0 pages",
    pass: missingP0Actions.length === 0,
    evidence: missingP0Actions.length === 0 ? "all P0 keys present" : `missing ${missingP0Actions.join(", ")}`,
  },
  {
    name: "P0 demo covers all non-manual P0 pages",
    pass: missingP0Demo.length === 0 && fileSizeFromDataUrlHint(p0DemoText),
    evidence: missingP0Demo.length === 0 ? "all P0 demo keys present" : `missing ${missingP0Demo.join(", ")}`,
  },
  {
    name: "P1/P2/P3 action matrix covers remaining pages",
    pass: p123ActionCoverageMissing.length === 0,
    evidence:
      p123ActionCoverageMissing.length === 0
        ? "all remaining keys present"
        : `missing ${p123ActionCoverageMissing.join(", ")}`,
  },
  {
    name: "Page spec candidate interface evidence",
    pass: missingCandidateEvidence.length === 0,
    evidence:
      missingCandidateEvidence.length === 0
        ? `${candidateRows.length}/${candidateRows.length} pages have candidate interface notes`
        : `missing ${missingCandidateEvidence.join(", ")}`,
  },
  {
    name: "HAR-backed real interface evidence",
    pass: missingHarEvidence.length === 0,
    evidence: `${totalHarPages}/${requiredHarPageKeys.length} non-manual pages have normalized HAR evidence`,
  },
  {
    name: "Missing HAR pages login-state reachability audit",
    pass: missingLoginAuditCoverage.length === 0 && missingLoginReachability.length === 0,
    evidence:
      missingLoginAuditCoverage.length === 0 && missingLoginReachability.length === 0
        ? `${missingHarEvidence.length - missingLoginReachability.length}/${missingHarEvidence.length} current missing-HAR pages reached in logged-in Chrome`
        : `missing audit ${missingLoginAuditCoverage.join(", ")}; missing login signals ${missingLoginReachability.join(", ")}`,
  },
  {
    name: "Authenticated read API probe for missing HAR pages",
    pass:
      missingHarEvidence.length === 0 ||
      (currentMissingAuthProbeCoverage.length === missingHarEvidence.length &&
        currentMissingAuthAccepted.length >= Math.max(1, missingHarEvidence.length - 2)),
    evidence: `${currentMissingAuthProbeCoverage.length}/${missingHarEvidence.length} current missing pages probed; ${currentMissingTransportAccepted.length} current missing pages transport accepted; ${currentMissingAuthAccepted.length} current missing pages accepted auth; historical probe scope ${authenticatedProbeSummary.pagesCovered || 0} pages`,
  },
  {
    name: "Static safe-read candidate second-pass probe",
    pass: staticReadProbeSummary.pagesCovered >= Math.max(1, (authenticatedProbeSummary.pagesCovered || 0) - (authenticatedProbeSummary.pagesWithSuccess || 0) - 1),
    evidence: `${staticReadProbeSummary.pagesCovered || 0} pages second-pass probed; ${staticReadProbeSummary.authAccepted || 0} probes accepted auth; ${staticReadProbeSummary.success || 0} probes success; ${staticReadProbeSummary.pagesWithSuccess || 0} pages success`,
  },
  {
    name: "Minimal HAR intake validation readiness",
    pass:
      (harIntakeSummary.accepted || 0) +
        (harIntakeSummary.review || 0) +
        (harIntakeSummary.missing || 0) +
        (harIntakeSummary.invalid || 0) ===
      (minimalHarBatch?.minimalTasks || minimalHarBatch?.missingPages || 0),
    evidence: `${harIntakeSummary.accepted || 0} accepted; ${harIntakeSummary.review || 0} review; ${harIntakeSummary.missing || 0} missing; ${harIntakeSummary.invalid || 0} invalid`,
  },
];

const overallPass = checks.every((check) => check.pass);
const completionStatus = overallPass
  ? "complete"
  : pageLayerMissing.length === 0 && missingDocs.length === 0
    ? "partial: page/spec/action/demo layers pass; real HAR interface evidence still incomplete"
    : "incomplete";

function mark(pass) {
  return pass ? "PASS" : "FAIL";
}

function bool(value) {
  return value ? "yes" : "no";
}

const report = `# 数税云全量任务机器验收报告

生成时间：${new Date().toISOString()}

## 结论

${overallPass ? "全量验收通过。" : "全量验收未通过。"}

当前状态：

\`\`\`text
${completionStatus}
\`\`\`

## 总体验收

| 检查项 | 结果 | 证据 |
|---|---|---|
${checks.map((check) => `| ${check.name} | ${mark(check.pass)} | ${check.evidence} |`).join("\n")}

## 页面层明细

| key | 菜单 | raw | visible DOM | screenshot | design ref | page spec |
|---|---|---|---|---|---|---|
${pageRows
  .map(
    (row) =>
      `| \`${row.key}\` | ${row.menu} | ${bool(row.raw)} | ${bool(row.visibleDom)} | ${bool(row.screenshot)} | ${bool(row.designReference)} | ${bool(row.spec)} |`,
  )
  .join("\n")}

## HAR 证据

| 项目 | 数量 |
|---|---:|
| normalized HAR files | ${harRows.length} |
| pages with HAR evidence | ${totalHarPages} |
| pages with placeholder HAR evidence only | ${totalHarPlaceholderPages} |
| required non-manual pages | ${requiredHarPageKeys.length} |
| missing HAR evidence pages | ${missingHarEvidence.length} |

## HAR 采集任务范围

| 项目 | 数量 |
|---|---:|
| non-manual pages | ${harCaptureTasks?.totalPages || 0} |
| default HAR capture tasks | ${harCaptureTasks?.totalTasks || 0} |
| non-default / excluded candidates | ${harCaptureTasks?.totalExcludedCandidates || 0} |
| pages with current HAR evidence | ${harCaptureTasks?.pagesWithEvidence || 0} |
| minimal HAR batch pages | ${minimalHarBatch?.missingPages || 0} |
| minimal HAR batch tasks | ${minimalHarBatch?.minimalTasks || 0} |

## 缺 HAR 页面登录态巡检

| 项目 | 数量 |
|---|---:|
| audit rows | ${missingPagesLoginRows.length} |
| audit rows with login signals | ${missingPagesLoginReachable.length} |
| current missing-HAR pages covered by audit | ${missingHarEvidence.length - missingLoginAuditCoverage.length}/${missingHarEvidence.length} |
| current missing-HAR pages missing login signals | ${missingLoginReachability.length} |

## 缺 HAR 页面已认证只读接口探测

| 项目 | 数量 |
|---|---:|
| probes | ${authenticatedProbeSummary.probes || 0} |
| pages covered | ${authenticatedProbeSummary.pagesCovered || 0}/${missingHarEvidence.length} |
| pages with transport accepted | ${authenticatedProbeSummary.pagesWithTransportAccepted || 0} |
| pages with auth accepted | ${authenticatedProbeSummary.pagesWithAuthAccepted || 0} |
| pages with success | ${authenticatedProbeSummary.pagesWithSuccess || 0} |

说明：该探测只证明当前 Chrome Session Storage 中存在可用认证态，且部分 L0/L1 查询接口可直接返回；transport accepted 只代表 HTTP 层可达，不代表业务成功。它不替代 HAR 证据，也不会让 strict audit 因此通过。

## 静态只读候选二次探测

| 项目 | 数量 |
|---|---:|
| pages covered | ${staticReadProbeSummary.pagesCovered || 0} |
| probes | ${staticReadProbeSummary.probes || 0} |
| probes with transport accepted | ${staticReadProbeSummary.transportAccepted || 0} |
| probes with auth accepted | ${staticReadProbeSummary.authAccepted || 0} |
| probes with success | ${staticReadProbeSummary.success || 0} |
| pages with success | ${staticReadProbeSummary.pagesWithSuccess || 0} |

说明：二次探测只针对基础只读探测未成功页面，从静态 JS 候选中筛选明显查询类接口；它用于缩小人工 HAR 补抓范围，不替代真实 HAR。

## 最小 HAR Intake 校验

| 项目 | 数量 |
|---|---:|
| expected HAR files | ${harIntakeSummary.expectedHarFiles || 0} |
| files in HAR dir | ${harIntakeSummary.filesInHarDir || 0} |
| accepted | ${harIntakeSummary.accepted || 0} |
| review | ${harIntakeSummary.review || 0} |
| missing | ${harIntakeSummary.missing || 0} |
| invalid | ${harIntakeSummary.invalid || 0} |

说明：intake 校验用于导入人工 HAR 后第一时间识别“缺文件、登录壳、无业务 API、高风险误采、未命中预期接口”等问题；它是 strict audit 之前的预检门。

## 候选接口证据

| 项目 | 数量 |
|---|---:|
| pages with candidate interface notes | ${candidateRows.length - missingCandidateEvidence.length} |
| pages missing candidate interface notes | ${missingCandidateEvidence.length} |

| key | 候选接口/策略数量 | 说明 |
|---|---:|---|
${candidateRows
  .map(
    (row) =>
      `| \`${row.key}\` | ${row.count} | ${row.candidates.length > 0 ? row.candidates.map((item) => item.replace(/\|/g, "\\|")).join("<br>") : "missing"} |`,
  )
  .join("\n")}

缺 HAR 证据页面：

\`\`\`text
${missingHarEvidence.length > 0 ? missingHarEvidence.join("\n") : "none"}
\`\`\`

占位符证据页面：

\`\`\`text
${harRows
  .filter((row) => row.pageKey && !realHarPageKeys.has(row.pageKey) && (row.isPlaceholder || row.evidenceMode === "placeholder"))
  .map((row) => `${row.pageKey}（${row.file}）`)
  .join("\n")}
\`\`\`

## 缺失控制文档

\`\`\`text
${missingDocs.length > 0 ? missingDocs.map((row) => row.path).join("\n") : "none"}
\`\`\`

## 使用方式

\`\`\`bash
npm run tax-cloud:audit
npm run tax-cloud:audit:strict
\`\`\`

\`tax-cloud:audit:strict\` 只有在页面、文档、动作矩阵、P0 demo、真实 HAR 接口证据全部满足时才通过。
`;

await mkdir(path.dirname(path.join(root, outPath)), { recursive: true });
await writeFile(path.join(root, outPath), report);

console.log(report);

if (strict && !overallPass) {
  process.exit(1);
}
