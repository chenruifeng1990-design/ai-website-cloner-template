# 数税云 HAR 采集与解析手册

更新时间：2026-06-29

## 目标

把“页面动作矩阵”推进到“真实接口证据”。

当前状态：

- 33 个页面采集完成。
- 33 个页面 page spec 完成。
- P0/P1/P2/P3 动作矩阵完成。
- Chrome 自动 Network 导出受限。

因此下一步以 HAR 文件作为接口证据来源。

## 输入

Chrome DevTools 导出的 HAR 文件：

```text
docs/tax-cloud/network-har/*.har
```

## 输出

解析后的标准接口清单：

```text
docs/tax-cloud/apis/*.har-normalized.json
```

## 采集步骤

1. 在 Chrome 打开数税云页面。
2. 打开 DevTools → Network。
3. 勾选 Preserve log。
4. 清空 Network。
5. 点击一个页面动作。
6. 等页面返回结果。
7. 右键 Network 列表。
8. 选择 Save all as HAR with content。
9. 保存到：

```text
docs/tax-cloud/network-har/
```

命名：

```text
<page-key>.<action>.har
```

示例：

```text
platform-records.default-list.har
platform-records.detail.har
billCenter-fullInvoiceQuery.search.har
income-invoiceCheck.query-unchecked.har
analysisBoard-invoceRateView.query.har
```

## 解析命令

推荐批量解析：

```bash
npm run tax-cloud:har:parse-all
```

批量脚本会：

- 扫描 `docs/tax-cloud/network-har/*.har`。
- 按 `<page-key>.<action>.har` 或 `<page-key>.har` 自动识别页面。
- 输出到 `docs/tax-cloud/apis/*.har-normalized.json`。
- 生成 `docs/tax-cloud/TAX_CLOUD_HAR_BATCH_PARSE_REPORT.md`。

批量解析后继续跑：

```bash
npm run tax-cloud:audit
```

单文件排查命令：

```bash
node scripts/parse-tax-cloud-har.mjs docs/tax-cloud/network-har/platform-records.default-list.har --page-key=platform-records
```

指定输出：

```bash
node scripts/parse-tax-cloud-har.mjs docs/tax-cloud/network-har/platform-records.default-list.har \
  --page-key=platform-records \
  --out=docs/tax-cloud/apis/platform-records.default-list.har-normalized.json
```

## 解析规则

脚本会：

- 只保留 `fp.enuoyun.com` 相关接口。
- 过滤 `Cookie`、`Authorization`、`Set-Cookie` 等敏感头。
- 保留 method、URL、path、query、status、耗时。
- 尝试解析 request body JSON。
- 尝试解析 response JSON。
- 按 URL/method/interfaceCode 初步标风险等级。

风险等级只是候选，最终以人工复核为准。

## 验收标准

每个 HAR 解析结果必须满足：

- `summary.taxCloudApiEntries > 0`
- 每个接口有 method、path、status。
- L3/L4 候选接口被标为 review，不得直接接入。
- 请求/响应中不出现 Cookie 或 Authorization 原文。

检查命令：

```bash
node scripts/parse-tax-cloud-har.mjs <har-file> --page-key=<key>
```

## 回填位置

解析后按页面回填：

| 页面范围 | 回填文件 |
|---|---|
| 总接口表 | `docs/tax-cloud/TAX_CLOUD_API_INVENTORY.md` |
| P0 页面 | `docs/tax-cloud/TAX_CLOUD_P0_INTERFACE_ACTION_AUDIT.md` |
| P1/P2/P3 页面 | `docs/tax-cloud/TAX_CLOUD_P1_P2_P3_INTERFACE_ACTION_AUDIT.md` |
| 页面 spec | `docs/tax-cloud/pages/<page-key>.page.md` |

## 不允许做的事

- 不提交未脱敏 HAR。
- 不把 Cookie/token 写入 markdown。
- 不因为抓到 L3/L4 接口就直接接 ERP。
- 不把数税云网页动作绕过飞书审批和服务端总闸。

## 完成定义

接口层真正完成，需要：

```text
每个页面动作
→ 有 HAR 证据或明确无需接口
→ 有风险等级
→ 有 ERP adapter 策略
→ 有失败态和审计要求
```

只有文档里的“接口候选”不能算接口层完成。
