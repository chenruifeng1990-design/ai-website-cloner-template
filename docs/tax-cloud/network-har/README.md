# 数税云 HAR 存放目录

把 Chrome DevTools 导出的 HAR 文件放在这里。

命名建议：

```text
<page-key>.<action>.har
```

示例：

```text
platform-records.default-list.har
billCenter-fullInvoiceQuery.search.har
income-invoiceCheck.manual-check-query.har
bussiness-credit.creditInfo.har
```

解析命令：

```bash
npm run tax-cloud:har:parse-all
```

输出目录：

```text
docs/tax-cloud/apis/
```

单文件排查：

```bash
node scripts/parse-tax-cloud-har.mjs docs/tax-cloud/network-har/platform-records.default-list.har --page-key=platform-records
```

安全规则：

- 解析脚本不会输出 `Cookie`、`Authorization`、`Set-Cookie` 等敏感头。
- 解析脚本会对 JSON 中的 `token`、`secret`、`password` 等敏感字段做递归脱敏。
- HAR 原文件可能包含 Cookie 和 token，不能提交到公开仓库。
- 如果 HAR 必须入库，需要先脱敏。
