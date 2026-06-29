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
  pageRows.push({
    key,
    menu: `${page.menu1 || ""}/${page.menu2 || ""}`,
    raw: await exists(raw),
    visibleDom: await exists(visibleDom),
    screenshot: await exists(screenshot),
    designReference: await exists(designReference),
    spec: await exists(spec),
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
    taxCloudApiEntries: data?.summary?.taxCloudApiEntries || 0,
    byRisk: data?.summary?.byRisk || {},
  });
}

const pageLayerMissing = pageRows.filter(
  (row) => !row.raw || !row.visibleDom || !row.screenshot || !row.designReference || !row.spec,
);
const missingDocs = expectedDocsRows.filter((row) => !row.exists);
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

const pageByKey = Object.fromEntries(targetPages.map((page) => [page.key, page]));
const missingP0Actions = expectedP0DemoKeys.filter((key) => !pageCoveredInText(pageByKey[key] || { key }, p0ActionText));
const missingP0Demo = expectedP0DemoKeys.filter((key) => !p0DemoText.includes(key));
const p123ActionCoverageMissing = pageKeys.filter((key) => {
  if (expectedP0DemoKeys.includes(key) || key === "platform-created") return false;
  return !pageCoveredInText(pageByKey[key] || { key }, p123ActionText);
});

const totalHarPages = new Set(harRows.filter((row) => row.taxCloudApiEntries > 0).map((row) => row.pageKey)).size;
const requiredHarPageKeys = pageKeys.filter((key) => key !== "platform-created");
const missingHarEvidence = requiredHarPageKeys.filter(
  (key) => !harRows.some((row) => row.pageKey === key && row.taxCloudApiEntries > 0),
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
    name: "HAR-backed real interface evidence",
    pass: missingHarEvidence.length === 0,
    evidence: `${totalHarPages}/${requiredHarPageKeys.length} non-manual pages have normalized HAR evidence`,
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
| required non-manual pages | ${requiredHarPageKeys.length} |
| missing HAR evidence pages | ${missingHarEvidence.length} |

缺 HAR 证据页面：

\`\`\`text
${missingHarEvidence.length > 0 ? missingHarEvidence.join("\n") : "none"}
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
