#!/usr/bin/env node

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

const args = process.argv.slice(2);
const inputDir = valueOf("--input") || "docs/tax-cloud/network-har";
const outputDir = valueOf("--out-dir") || "docs/tax-cloud/apis";
const reportPath = valueOf("--report") || "docs/tax-cloud/TAX_CLOUD_HAR_BATCH_PARSE_REPORT.md";
const root = process.cwd();

function valueOf(prefix) {
  const hit = args.find((arg) => arg.startsWith(`${prefix}=`));
  return hit ? hit.slice(prefix.length + 1) : "";
}

function usage() {
  console.log(`Usage:
  node scripts/parse-tax-cloud-har-directory.mjs [--input=docs/tax-cloud/network-har] [--out-dir=docs/tax-cloud/apis]

HAR file naming:
  <page-key>.<action>.har
  <page-key>.har

Example:
  docs/tax-cloud/network-har/platform-records.default-list.har
`);
}

async function readJson(relativePath, fallback) {
  try {
    return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

function inferPageKey(fileName, pageKeys) {
  const base = fileName.replace(/\.har$/i, "");
  const sorted = [...pageKeys].sort((a, b) => b.length - a.length);
  return sorted.find((key) => base === key || base.startsWith(`${key}.`) || base.startsWith(`${key}-`)) || "";
}

function asPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

const targetPages = await readJson("docs/tax-cloud/captures/target-pages.json", []);
const pageKeys = targetPages.map((page) => page.key).filter(Boolean);

let files = [];
try {
  files = (await readdir(path.join(root, inputDir))).filter((file) => file.toLowerCase().endsWith(".har")).sort();
} catch {
  files = [];
}

if (args.includes("--help")) {
  usage();
  process.exit(0);
}

await mkdir(path.join(root, outputDir), { recursive: true });

const rows = [];
for (const file of files) {
  const pageKey = inferPageKey(file, pageKeys);
  const inputPath = asPosix(path.join(inputDir, file));
  const outputPath = asPosix(path.join(outputDir, `${file.replace(/\.har$/i, "")}.har-normalized.json`));
  if (!pageKey) {
    rows.push({
      file,
      pageKey: "",
      outputPath: "",
      status: "skipped",
      reason: "cannot infer page key from file name",
      taxCloudApiEntries: 0,
    });
    continue;
  }

  const result = spawnSync(
    process.execPath,
    ["scripts/parse-tax-cloud-har.mjs", inputPath, `--page-key=${pageKey}`, `--out=${outputPath}`],
    { cwd: root, encoding: "utf8" },
  );
  if (result.status !== 0) {
    rows.push({
      file,
      pageKey,
      outputPath,
      status: "failed",
      reason: (result.stderr || result.stdout || "parse failed").trim(),
      taxCloudApiEntries: 0,
    });
    continue;
  }
  const parsed = await readJson(outputPath, null);
  rows.push({
    file,
    pageKey,
    outputPath,
    status: "parsed",
    reason: "",
    taxCloudApiEntries: parsed?.summary?.taxCloudApiEntries || 0,
    byRisk: parsed?.summary?.byRisk || {},
  });
}

const parsedRows = rows.filter((row) => row.status === "parsed");
const pagesWithEvidence = new Set(parsedRows.filter((row) => row.taxCloudApiEntries > 0).map((row) => row.pageKey));
const report = `# 数税云 HAR 批量解析报告

生成时间：${new Date().toISOString()}

## 汇总

| 项目 | 数量 |
|---|---:|
| HAR files found | ${files.length} |
| parsed files | ${parsedRows.length} |
| pages with API evidence | ${pagesWithEvidence.size} |
| skipped/failed files | ${rows.filter((row) => row.status !== "parsed").length} |

## 明细

| HAR 文件 | pageKey | 状态 | API 条数 | 输出 | 备注 |
|---|---|---|---:|---|---|
${rows
  .map(
    (row) =>
      `| \`${row.file}\` | ${row.pageKey ? `\`${row.pageKey}\`` : "-"} | ${row.status} | ${row.taxCloudApiEntries} | ${row.outputPath ? `\`${row.outputPath}\`` : "-"} | ${String(row.reason || "").replace(/\|/g, "\\|")} |`,
  )
  .join("\n")}

## 使用方式

    npm run tax-cloud:har:parse-all
    npm run tax-cloud:audit

原始 HAR 文件默认被 \`docs/tax-cloud/network-har/.gitignore\` 忽略；只提交脱敏后的 \`docs/tax-cloud/apis/*.har-normalized.json\` 和本报告。
`;

await mkdir(path.dirname(path.join(root, reportPath)), { recursive: true });
await writeFile(path.join(root, reportPath), report);

console.log(report);
