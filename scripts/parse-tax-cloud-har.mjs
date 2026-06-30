#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);

function usage() {
  console.log(`Usage:
  node scripts/parse-tax-cloud-har.mjs <har-file> [--page-key=<key>] [--out=<file>]

Examples:
  node scripts/parse-tax-cloud-har.mjs docs/tax-cloud/network-har/platform-records.har --page-key=platform-records
  node scripts/parse-tax-cloud-har.mjs docs/tax-cloud/network-har/platform-records.har --page-key=platform-records --out=docs/tax-cloud/apis/platform-records.har-normalized.json
`);
}

const harPath = args.find((arg) => !arg.startsWith("--"));
const pageKey = valueOf("--page-key") || inferPageKey(harPath);
const outPath =
  valueOf("--out") ||
  (pageKey
    ? `docs/tax-cloud/apis/${pageKey}.har-normalized.json`
    : "docs/tax-cloud/apis/har-normalized.json");

if (!harPath) {
  usage();
  process.exit(1);
}

function valueOf(prefix) {
  const hit = args.find((arg) => arg.startsWith(`${prefix}=`));
  return hit ? hit.slice(prefix.length + 1) : "";
}

function inferPageKey(filePath) {
  if (!filePath) return "";
  return path.basename(filePath).replace(/\.har$/i, "").replace(/\.json$/i, "");
}

function headerMap(headers = []) {
  const skipped = new Set([
    "authorization",
    "cookie",
    "set-cookie",
    "x-csrf-token",
    "x-xsrf-token",
    "x-auth-token",
    "token",
  ]);
  const result = {};
  for (const header of headers) {
    const name = String(header.name || "").toLowerCase();
    if (!name || skipped.has(name)) continue;
    result[name] = header.value;
  }
  return result;
}

function parsePostData(postData) {
  if (!postData) return null;
  if (Array.isArray(postData.params) && postData.params.length > 0) {
    return {
      mimeType: postData.mimeType || "",
      params: postData.params.map((param) => ({
        name: param.name,
        valuePreview: preview(param.value),
      })),
    };
  }
  const text = postData.text || "";
  if (!text) return { mimeType: postData.mimeType || "", textPreview: "" };
  const json = tryJson(text);
  return {
    mimeType: postData.mimeType || "",
    json,
    textPreview: json ? preview(json, 1200) : preview(redactSensitiveText(text), 1200),
  };
}

function parseResponse(content) {
  if (!content) return null;
  const text = content.text || "";
  const decoded = content.encoding === "base64" ? "" : text;
  const json = tryJson(decoded);
  return {
    mimeType: content.mimeType || "",
    size: content.size,
    json,
    textPreview: json ? preview(json, 1600) : preview(redactSensitiveText(decoded), 1600),
  };
}

function tryJson(text) {
  if (!text || typeof text !== "string") return null;
  const trimmed = text.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return null;
  try {
    return redactJson(JSON.parse(trimmed));
  } catch {
    return null;
  }
}

function preview(value, max = 500) {
  if (value == null) return "";
  const text = typeof value === "string" ? value : JSON.stringify(value);
  return text.length <= max ? text : `${text.slice(0, max)}...`;
}

function redactJson(value) {
  const sensitiveKeys = new Set([
    "authorization",
    "cookie",
    "set-cookie",
    "token",
    "access_token",
    "refresh_token",
    "x-csrf-token",
    "x-xsrf-token",
    "x-auth-token",
    "password",
    "passwd",
    "secret",
    "appsecret",
    "app_secret",
  ]);
  if (Array.isArray(value)) return value.map((item) => redactJson(item));
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, entryValue]) => {
      const normalizedKey = key.toLowerCase();
      if (sensitiveKeys.has(normalizedKey) || normalizedKey.includes("token") || normalizedKey.includes("secret")) {
        return [key, "[REDACTED]"];
      }
      return [key, redactJson(entryValue)];
    }),
  );
}

function redactSensitiveText(text) {
  return String(text || "")
    .replace(/(authorization|cookie|set-cookie|token|access_token|refresh_token|password|secret)(["'\s:=]+)([^"',;\s]+)/gi, "$1$2[REDACTED]")
    .replace(/(Bearer\s+)[A-Za-z0-9._~+/=-]+/gi, "$1[REDACTED]");
}

function classifyRisk(method, url, responseJson) {
  const upperMethod = String(method || "").toUpperCase();
  const lowerUrl = String(url || "").toLowerCase();
  const interfaceCode =
    responseJson?.interfaceCode ||
    responseJson?.data?.interfaceCode ||
    responseJson?.request?.interfaceCode ||
    "";
  const combined = `${lowerUrl} ${String(interfaceCode).toLowerCase()}`;

  const redActionPattern = /(^|[/_.-])(red|redmark|redconfirm|redinvoice|red-letter)($|[/_.-])/;
  const redReadonlyPattern = /redconfirminfo\/list|redconfirm.*\/list|redmark.*\/list/;
  if (
    combined.includes("issue.sync") ||
    (redActionPattern.test(combined) && !redReadonlyPattern.test(combined)) ||
    /redconfirm.*(issue|operate|submit|confirm|save)|redmark.*(issue|operate|submit|confirm|save)/.test(combined) ||
    combined.includes("invoiceissue")
  ) {
    return "L4/L3-review";
  }
  if (
    combined.includes("sign") ||
    combined.includes("rz.tj") ||
    combined.includes("rz.tz") ||
    combined.includes("confirm") ||
    combined.includes("usage") ||
    combined.includes("checksubmit")
  ) {
    return "L3-review";
  }
  if (
    /(^|[/_.-])(download|export|print|import|upload|restart|clearcache|delete|save|update|add|edit|operate|task)($|[/_.-])/.test(combined) ||
    combined.includes("file") ||
    combined.includes("obtain") ||
    combined.includes("check") ||
    combined.includes("task")
  ) {
    return "L2-review";
  }
  if (upperMethod === "GET") return "L0-candidate";
  return "L1-review";
}

function isTaxCloudApi(url) {
  try {
    const parsed = new URL(url);
    if (isLoginOrShellOnly(parsed)) return false;
    return (
      parsed.hostname === "fp.enuoyun.com" &&
      (parsed.pathname.startsWith("/prod-api/") ||
        parsed.pathname.includes("/api/") ||
        parsed.pathname.includes("/bussiness/") ||
        parsed.pathname.includes("/billCenter/") ||
        parsed.pathname.includes("/income/") ||
        parsed.pathname.includes("/analysisBoard/") ||
        parsed.pathname.includes("/system/"))
    );
  } catch {
    return false;
  }
}

function isLoginOrShellOnly(parsed) {
  const pathname = parsed.pathname;
  if (pathname === "/prod-api/code") return true;
  if (pathname === "/login") return true;
  const shellPrefixes = [
    "/platform/",
    "/income/",
    "/billCenter/",
    "/analysisBoard/",
    "/bussiness/",
    "/system/",
    "/downloadCenter",
  ];
  // CDP captures of unauthenticated navigation can include only the SPA route
  // document plus captcha. Those are not business API evidence.
  return parsed.hostname === "fp.enuoyun.com" && shellPrefixes.some((prefix) => pathname === prefix.slice(0, -1) || pathname.startsWith(prefix));
}

function normalizeEntry(entry, index) {
  const request = entry.request || {};
  const response = entry.response || {};
  const responseParsed = parseResponse(response.content);
  const url = request.url || "";
  const parsedUrl = safeUrl(url);
  return {
    index,
    pageKey,
    startedDateTime: entry.startedDateTime,
    method: request.method,
    url,
    host: parsedUrl?.host || "",
    path: parsedUrl?.pathname || "",
    query: parsedUrl ? Object.fromEntries(parsedUrl.searchParams.entries()) : {},
    status: response.status,
    statusText: response.statusText,
    timeMs: entry.time,
    risk: classifyRisk(request.method, url, responseParsed?.json),
    requestHeaders: headerMap(request.headers),
    requestPostData: parsePostData(request.postData),
    responseHeaders: headerMap(response.headers),
    response: responseParsed,
  };
}

function safeUrl(url) {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

const raw = await readFile(harPath, "utf8");
const har = JSON.parse(raw);
const entries = har.log?.entries || [];
const normalized = entries
  .map((entry, index) => normalizeEntry(entry, index))
  .filter((entry) => isTaxCloudApi(entry.url));

const summary = {
  sourceHar: harPath,
  pageKey,
  generatedAt: new Date().toISOString(),
  totalEntries: entries.length,
  taxCloudApiEntries: normalized.length,
  byRisk: normalized.reduce((acc, entry) => {
    acc[entry.risk] = (acc[entry.risk] || 0) + 1;
    return acc;
  }, {}),
  endpoints: normalized.map((entry) => ({
    method: entry.method,
    path: entry.path,
    status: entry.status,
    risk: entry.risk,
  })),
};

const output = { summary, entries: normalized };
await mkdir(path.dirname(outPath), { recursive: true });
await writeFile(outPath, `${JSON.stringify(output, null, 2)}\n`);

console.log(`Wrote ${outPath}`);
console.log(JSON.stringify(summary, null, 2));
