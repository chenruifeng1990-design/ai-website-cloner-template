#!/usr/bin/env node

import { access, copyFile, mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const root = process.cwd();
const args = process.argv.slice(2);
const sourceDir = valueOf("--from") || path.join(os.homedir(), "Downloads");
const targetDir = valueOf("--to") || "docs/tax-cloud/network-har";
const outMd = valueOf("--out") || "docs/tax-cloud/TAX_CLOUD_HAR_DOWNLOAD_COLLECT_REPORT.md";
const outJson = valueOf("--json") || "docs/tax-cloud/TAX_CLOUD_HAR_DOWNLOAD_COLLECT_REPORT.json";
const overwrite = args.includes("--overwrite");

function valueOf(prefix) {
  const hit = args.find((arg) => arg.startsWith(`${prefix}=`));
  return hit ? hit.slice(prefix.length + 1) : "";
}

async function readJson(relativePath, fallback = null) {
  try {
    return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function normalizeHarName(name) {
  return name
    .replace(/\.har$/i, "")
    .replace(/\s+\(\d+\)$/g, "")
    .replace(/\s+-\s+Copy$/i, "")
    .concat(".har");
}

function mdList(items) {
  if (!items.length) return "无";
  return items.map((item) => `\`${item}\``).join("<br>");
}

const queue = await readJson("docs/tax-cloud/TAX_CLOUD_HAR_CAPTURE_QUEUE.json", { queue: [] });
const expected = new Map((queue.queue || []).map((item) => [item.harFile, item]));
const files = (await readdir(sourceDir).catch(() => [])).filter((file) => file.toLowerCase().endsWith(".har"));
const filesByNormalizedName = new Map();
for (const file of files) {
  const normalized = normalizeHarName(file);
  if (!filesByNormalizedName.has(normalized)) filesByNormalizedName.set(normalized, []);
  filesByNormalizedName.get(normalized).push(file);
}

await mkdir(path.join(root, targetDir), { recursive: true });

const rows = [];
for (const [harFile, item] of expected.entries()) {
  const sourceCandidates = filesByNormalizedName.get(harFile) || [];
  const sourceFile = sourceCandidates[0] || "";
  const sourcePath = sourceFile ? path.join(sourceDir, sourceFile) : "";
  const targetPath = path.join(root, targetDir, harFile);
  const targetAlreadyExists = await exists(targetPath);
  let action = "missing-source";
  let sourceSize = 0;
  if (sourcePath) {
    sourceSize = (await stat(sourcePath)).size;
    if (targetAlreadyExists && !overwrite) {
      action = "skipped-existing";
    } else {
      await copyFile(sourcePath, targetPath);
      action = targetAlreadyExists ? "overwritten" : "copied";
    }
  }
  rows.push({
    pageKey: item.pageKey,
    menu: item.menu,
    harFile,
    sourceFile,
    sourceSize,
    targetAlreadyExists,
    action,
  });
}

const extraHarFiles = files.filter((file) => !expected.has(normalizeHarName(file)));
const summary = {
  generatedAt: new Date().toISOString(),
  sourceDir,
  targetDir,
  overwrite,
  expectedFiles: rows.length,
  copied: rows.filter((row) => row.action === "copied").length,
  overwritten: rows.filter((row) => row.action === "overwritten").length,
  skippedExisting: rows.filter((row) => row.action === "skipped-existing").length,
  missingSource: rows.filter((row) => row.action === "missing-source").length,
  extraHarFiles: extraHarFiles.length,
  rows,
  extraHarFilesList: extraHarFiles,
};

const md = `# 数税云 HAR 下载目录收集报告

生成时间：${summary.generatedAt}

## 口径

- 来源目录：\`${summary.sourceDir}\`
- 目标目录：\`${summary.targetDir}\`
- 预期文件：来自 \`TAX_CLOUD_HAR_CAPTURE_QUEUE.json\`
- 默认不覆盖已归档 HAR；需要覆盖时加 \`--overwrite\`。

## 汇总

| 项目 | 数量 |
|---|---:|
| expected files | ${summary.expectedFiles} |
| copied | ${summary.copied} |
| overwritten | ${summary.overwritten} |
| skipped existing | ${summary.skippedExisting} |
| missing source | ${summary.missingSource} |
| extra HAR files in source dir | ${summary.extraHarFiles} |

## 明细

| pageKey | 菜单 | 目标 HAR | 来源文件 | 来源大小 | 动作 |
|---|---|---|---|---:|---|
${rows
  .map(
    (row) =>
      `| \`${row.pageKey}\` | ${row.menu} | \`${row.harFile}\` | ${row.sourceFile ? `\`${row.sourceFile}\`` : "无"} | ${row.sourceSize} | ${row.action} |`,
  )
  .join("\n")}

## 来源目录额外 HAR

${mdList(extraHarFiles)}

## 使用

~~~bash
npm run tax-cloud:har:collect
npm run tax-cloud:har:intake
npm run tax-cloud:har:parse-all
npm run tax-cloud:audit:strict
~~~
`;

await writeFile(path.join(root, outJson), `${JSON.stringify(summary, null, 2)}\n`);
await writeFile(path.join(root, outMd), md);
console.log(JSON.stringify({
  expectedFiles: summary.expectedFiles,
  copied: summary.copied,
  overwritten: summary.overwritten,
  skippedExisting: summary.skippedExisting,
  missingSource: summary.missingSource,
  extraHarFiles: summary.extraHarFiles,
}, null, 2));
