# 数税云 HAR 采集任务清单

生成时间：2026-06-29T08:39:09.097Z

## 口径

- 手工开票 `platform-created` 已冻结为票面基线，本清单不再要求重跑页面复刻。
- 本清单覆盖剩余 32 个非手工页面。
- 原始 HAR 只放在 `docs/tax-cloud/network-har/`，该目录已忽略 `*.har`，不得提交原始 Cookie/token。
- 每采完一批 HAR 后执行：

```bash
npm run tax-cloud:har:parse-all
npm run tax-cloud:har:tasks
npm run tax-cloud:audit
```

## 汇总

| 项目 | 数量 |
|---|---:|
| 待采非手工页面 | 32 |
| 页面动作任务 | 81 |
| 已有 HAR 证据页面 | 0 |
| 缺 HAR 证据页面 | 32 |

## 页面级进度

| 优先级 | pageKey | 菜单 | 建议 HAR 数 | 证据状态 | URL |
|---|---|---|---:|---|---|
| P1 | `platform-scanCode` | 销项管理/扫码开票 | 3 | missing | https://fp.enuoyun.com/platform/scanCode |
| P1 | `platform-scanRecords` | 销项管理/扫码记录 | 3 | missing | https://fp.enuoyun.com/platform/scanRecords |
| P0 | `platform-records` | 销项管理/开票记录 | 5 | missing | https://fp.enuoyun.com/platform/records |
| P1 | `platform-billIssue` | 销项管理/订单开票 | 2 | missing | https://fp.enuoyun.com/platform/billIssue |
| P1 visual-only | `platform-invoiceApplication` | 销项管理/开票申请单 | 2 | missing | https://fp.enuoyun.com/platform/invoiceApplication |
| P1，高风险后置 | `platform-redMark` | 销项管理/红字确认单 | 5 | missing | https://fp.enuoyun.com/platform/redMark |
| P1，高风险动作 | `income-scanCodeCheck` | 进项管理/快捷勾选 | 2 | missing | https://fp.enuoyun.com/income/scanCodeCheck |
| P0 | `income-invoiceCheck` | 进项管理/手工勾选 | 5 | missing | https://fp.enuoyun.com/income/invoiceCheck |
| P1 | `income-confirmCheck` | 进项管理/勾选审核 | 3 | missing | https://fp.enuoyun.com/income/confirmCheck |
| P0 | `income-confirmSign` | 进项管理/统计确认 | 3 | missing | https://fp.enuoyun.com/income/confirmSign |
| P0 | `income-certificationResults` | 进项管理/认证结果 | 3 | missing | https://fp.enuoyun.com/income/certificationResults |
| P0 | `billCenter-fullInvoiceQuery` | 票据中心/发票池 | 6 | missing | https://fp.enuoyun.com/billCenter/fullInvoiceQuery |
| P1，高风险后置 | `billCenter-sign` | 票据中心/签收 | 2 | missing | https://fp.enuoyun.com/billCenter/sign |
| P1 | `billCenter-invoiceVerification` | 票据中心/查验 | 2 | missing | https://fp.enuoyun.com/billCenter/invoiceVerification |
| P1 | `billCenter-accessSetting` | 票据中心/取票设置 | 2 | missing | https://fp.enuoyun.com/billCenter/accessSetting |
| P1 | `billCenter-taskManagement` | 票据中心/任务管理 | 2 | missing | https://fp.enuoyun.com/billCenter/taskManagement |
| P0 | `analysisBoard-invoceRateView` | 分析看板/按税率统计 | 2 | missing | https://fp.enuoyun.com/analysisBoard/invoceRateView |
| P0 | `analysisBoard-invoiceTypeView` | 分析看板/按发票种类统计 | 2 | missing | https://fp.enuoyun.com/analysisBoard/invoiceTypeView |
| P0 | `analysisBoard-businessRateView` | 分析看板/按上下游企业统计 | 3 | missing | https://fp.enuoyun.com/analysisBoard/businessRateView |
| P0 | `analysisBoard-goodsRateView` | 分析看板/按进销商品统计 | 3 | missing | https://fp.enuoyun.com/analysisBoard/goodsRateView |
| P0 | `analysisBoard-purchaseSalesTrend` | 分析看板/按进销趋势统计 | 3 | missing | https://fp.enuoyun.com/analysisBoard/purchaseSalesTrend |
| P0 | `analysisBoard-invoiceRegionView` | 分析看板/按进销地区统计 | 3 | missing | https://fp.enuoyun.com/analysisBoard/invoiceRegionView |
| P2 | `bussiness-info` | 基础信息/商品信息 | 2 | missing | https://fp.enuoyun.com/bussiness/info |
| P2 | `bussiness-customer` | 基础信息/客户管理 | 2 | missing | https://fp.enuoyun.com/bussiness/customer |
| P2 | `bussiness-credit` | 基础信息/开票额度配置 | 2 | missing | https://fp.enuoyun.com/bussiness/credit |
| P2/P3 | `bussiness-configurationManagement` | 基础信息/配置管理 | 1 | missing | https://fp.enuoyun.com/bussiness/configurationManagement |
| P3 | `system-dept` | 系统设置/组织管理 | 1 | missing | https://fp.enuoyun.com/system/dept |
| P3 | `system-departmentInfo` | 系统设置/部门管理 | 1 | missing | https://fp.enuoyun.com/system/departmentInfo |
| P3 | `system-role` | 系统设置/角色管理 | 1 | missing | https://fp.enuoyun.com/system/role |
| P2 | `system-onlineTaxationInfo` | 系统设置/网上办税信息 | 2 | missing | https://fp.enuoyun.com/system/onlineTaxationInfo |
| P3 | `system-user` | 系统设置/用户管理 | 1 | missing | https://fp.enuoyun.com/system/user |
| P1 | `downloadCenter` | 顶部入口/下载中心 | 2 | missing | https://fp.enuoyun.com/downloadCenter |

## 逐页采集任务

### P1 · 销项管理/扫码开票 · `platform-scanCode`

- URL：https://fp.enuoyun.com/platform/scanCode
- page spec：`docs/tax-cloud/pages/platform-scanCode.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `platform-scanCode.default.har` | default | manual review | 扫码链接/二维码生成：待真实 Network 补抓，L2。 |
| 2 | `platform-scanCode.default-list.har` | default-list | L0 query | 扫码记录查询：和 `platform-scanRecords` 联动，L0。 |
| 3 | `platform-scanCode.action-review.har` | action-review | L4/L3 review | 真实开票：禁止从本页直接触发 L4，必须回到 ERP 草稿审批链路。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1 · 销项管理/扫码记录 · `platform-scanRecords`

- URL：https://fp.enuoyun.com/platform/scanRecords
- page spec：`docs/tax-cloud/pages/platform-scanRecords.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `platform-scanRecords.default-list.har` | default-list | L0 query | 扫码记录列表：待真实 Network 补抓，L0。 |
| 2 | `platform-scanRecords.detail.har` | detail | L0 query | 扫码记录详情：待真实 Network 补抓，L0。 |
| 3 | `platform-scanRecords.download.har` | download | L2 review | 导出：待真实 Network 补抓，L1。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 销项管理/开票记录 · `platform-records`

- URL：https://fp.enuoyun.com/platform/records
- page spec：`docs/tax-cloud/pages/platform-records.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `platform-records.default-list.har` | default-list | L0 query | 开票结果查询：`ynfp.invoice.detail.query`，L0。 |
| 2 | `platform-records.default-list-2.har` | default-list-2 | L0 query | 发票明细列表：`ynfp.invoice.detail.list.query`，L0，曾返回 7007，需要复测权限。 |
| 3 | `platform-records.default-list-3.har` | default-list-3 | L0 query | ERP 列表：`/api/tax-invoices/records/list`，L0。 |
| 4 | `platform-records.download.har` | download | L2 review | 版式下载：`/api/tax-invoices/records/layout-file-download`，L2。 |
| 5 | `platform-records.default.har` | default | manual review | 对账：`/api/tax-invoices/records/reconcile`，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1 · 销项管理/订单开票 · `platform-billIssue`

- URL：https://fp.enuoyun.com/platform/billIssue
- page spec：`docs/tax-cloud/pages/platform-billIssue.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `platform-billIssue.default-list.har` | default-list | L0 query | 数税云订单列表：待真实 Network 补抓，L0。 |
| 2 | `platform-billIssue.default.har` | default | manual review | ERP 合同直达草稿：`/api/invoice-registration/tax-drafts/from-contract`，L1。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1 visual-only · 销项管理/开票申请单 · `platform-invoiceApplication`

- URL：https://fp.enuoyun.com/platform/invoiceApplication
- page spec：`docs/tax-cloud/pages/platform-invoiceApplication.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `platform-invoiceApplication.default-list.har` | default-list | L0 query | 数税云申请单列表：待真实 Network 补抓，L0。 |
| 2 | `platform-invoiceApplication.action-review.har` | action-review | L2 review | ERP 不新增旧申请接口。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1，高风险后置 · 销项管理/红字确认单 · `platform-redMark`

- URL：https://fp.enuoyun.com/platform/redMark
- page spec：`docs/tax-cloud/pages/platform-redMark.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `platform-redMark.default.har` | default | manual review | `ynfp.invoice.red.confirm.query`，L0。 |
| 2 | `platform-redMark.default-2.har` | default-2 | manual review | `ynfp.invoice.red.confirmDetail.query`，L0。 |
| 3 | `platform-redMark.default-3.har` | default-3 | manual review | `ynfp.invoice.red.confirm.issue`，L3。 |
| 4 | `platform-redMark.default-4.har` | default-4 | manual review | `ynfp.invoice.red.confirm.operate`，L3。 |
| 5 | `platform-redMark.default-5.har` | default-5 | manual review | `ynfp.invoice.red.confirm.down`，L2。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1，高风险动作 · 进项管理/快捷勾选 · `income-scanCodeCheck`

- URL：https://fp.enuoyun.com/income/scanCodeCheck
- page spec：`docs/tax-cloud/pages/income-scanCodeCheck.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `income-scanCodeCheck.default-list.har` | default-list | L0 query | 用途状态查询：`ynfp.invoice.usage.status.query`，L0。 |
| 2 | `income-scanCodeCheck.action-review.har` | action-review | manual review | 快捷勾选提交：待真实 Network 补抓，L3。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 进项管理/手工勾选 · `income-invoiceCheck`

- URL：https://fp.enuoyun.com/income/invoiceCheck
- page spec：`docs/tax-cloud/pages/income-invoiceCheck.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `income-invoiceCheck.default-list.har` | default-list | L0 query | 用途状态查询：`ynfp.invoice.usage.status.query`，L0。 |
| 2 | `income-invoiceCheck.default-list-2.har` | default-list-2 | L0 query | 发票池列表：`ynfp.invoice.pool.list.query`，L0。 |
| 3 | `income-invoiceCheck.download.har` | download | L2 review | 下载发票：`ynfp.invoice.pool.file.download`，L2。 |
| 4 | `income-invoiceCheck.action-review.har` | action-review | manual review | 勾选/不抵扣类动作：需重新确认真实接口，按 L3 预设。 |
| 5 | `income-invoiceCheck.default.har` | default | manual review | ERP 状态动作：`/api/tax-invoices/records/status-action`，L2/L3。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1 · 进项管理/勾选审核 · `income-confirmCheck`

- URL：https://fp.enuoyun.com/income/confirmCheck
- page spec：`docs/tax-cloud/pages/income-confirmCheck.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `income-confirmCheck.default-list.har` | default-list | L0 query | 批次查询：待真实 Network 补抓，L0。 |
| 2 | `income-confirmCheck.action-review.har` | action-review | manual review | 审核/确认：待真实 Network 补抓，L3。 |
| 3 | `income-confirmCheck.default.har` | default | manual review | ERP 批次：`/api/tax-invoices/records/certification-batches`，L1/L2。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 进项管理/统计确认 · `income-confirmSign`

- URL：https://fp.enuoyun.com/income/confirmSign
- page spec：`docs/tax-cloud/pages/income-confirmSign.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `income-confirmSign.default-list.har` | default-list | L4/L3 review | 统计确认相关接口需通过 Network 补抓。 |
| 2 | `income-confirmSign.action-review.har` | action-review | manual review | 认证结果/批次：`/api/tax-invoices/records/certification-batches`，L1/L2。 |
| 3 | `income-confirmSign.detail.har` | detail | manual review | 发票池明细：`/api/tax-invoices/records/list`，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 进项管理/认证结果 · `income-certificationResults`

- URL：https://fp.enuoyun.com/income/certificationResults
- page spec：`docs/tax-cloud/pages/income-certificationResults.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `income-certificationResults.default-list.har` | default-list | L0 query | 用途状态查询：`ynfp.invoice.usage.status.query`，L0。 |
| 2 | `income-certificationResults.default-list-2.har` | default-list-2 | L0 query | 发票池列表/详情：`ynfp.invoice.pool.list.query` / `ynfp.invoice.pool.detail.query`，L0。 |
| 3 | `income-certificationResults.default.har` | default | manual review | ERP 批次：`/api/tax-invoices/records/certification-batches`，L1/L2。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 票据中心/发票池 · `billCenter-fullInvoiceQuery`

- URL：https://fp.enuoyun.com/billCenter/fullInvoiceQuery
- page spec：`docs/tax-cloud/pages/billCenter-fullInvoiceQuery.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `billCenter-fullInvoiceQuery.default-list.har` | default-list | L0 query | 发票池列表：`ynfp.invoice.pool.list.query`，L0，曾返回 7007，需要复测。 |
| 2 | `billCenter-fullInvoiceQuery.detail.har` | detail | L0 query | 发票池详情：`ynfp.invoice.pool.detail.query`，L0。 |
| 3 | `billCenter-fullInvoiceQuery.download.har` | download | L2 review | 版式文件下载：`ynfp.invoice.pool.file.download`，L2。 |
| 4 | `billCenter-fullInvoiceQuery.sync.har` | sync | L2 review | 发票获取/取票：`ynfp.invoice.obtain`，L2。 |
| 5 | `billCenter-fullInvoiceQuery.default-list-2.har` | default-list-2 | L0 query | 税局入账状态查询：`ynfp.invoice.pool.rz.cx`，L0。 |
| 6 | `billCenter-fullInvoiceQuery.default-list-3.har` | default-list-3 | manual review | 入账状态提交/调整：`ynfp.invoice.pool.rz.tj` / `ynfp.invoice.pool.rz.tz`，L3，默认禁用。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1，高风险后置 · 票据中心/签收 · `billCenter-sign`

- URL：https://fp.enuoyun.com/billCenter/sign
- page spec：`docs/tax-cloud/pages/billCenter-sign.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `billCenter-sign.default-list.har` | default-list | L2 review | 签收列表：待真实 Network 补抓，L0。 |
| 2 | `billCenter-sign.action-review.har` | action-review | manual review | `ynfp.invoice.sign`，L2/L3，真实后果待确认。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1 · 票据中心/查验 · `billCenter-invoiceVerification`

- URL：https://fp.enuoyun.com/billCenter/invoiceVerification
- page spec：`docs/tax-cloud/pages/billCenter-invoiceVerification.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `billCenter-invoiceVerification.default.har` | default | manual review | `ynfp.invoice.check`，L2。 |
| 2 | `billCenter-invoiceVerification.default-2.har` | default-2 | manual review | ERP：`/api/tax-invoices/records/provider-check`，L2。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1 · 票据中心/取票设置 · `billCenter-accessSetting`

- URL：https://fp.enuoyun.com/billCenter/accessSetting
- page spec：`docs/tax-cloud/pages/billCenter-accessSetting.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `billCenter-accessSetting.default-list.har` | default-list | L2 review | 取票设置列表/保存：待真实 Network 补抓，L1/L2。 |
| 2 | `billCenter-accessSetting.sync.har` | sync | L2 review | ERP 同步游标：`/api/tax-invoices/sync-cursors`，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1 · 票据中心/任务管理 · `billCenter-taskManagement`

- URL：https://fp.enuoyun.com/billCenter/taskManagement
- page spec：`docs/tax-cloud/pages/billCenter-taskManagement.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `billCenter-taskManagement.default-list.har` | default-list | L2 review | 任务列表/详情/重试：待真实 Network 补抓，L1/L2。 |
| 2 | `billCenter-taskManagement.sync.har` | sync | L2 review | ERP 同步任务：`/api/tax-invoices/sync-sales`、`/api/tax-invoices/sync-purchases`，L2。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 分析看板/按税率统计 · `analysisBoard-invoceRateView`

- URL：https://fp.enuoyun.com/analysisBoard/invoceRateView
- page spec：`docs/tax-cloud/pages/analysisBoard-invoceRateView.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `analysisBoard-invoceRateView.default.har` | default | manual review | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。 |
| 2 | `analysisBoard-invoceRateView.default-list.har` | default-list | L0 query | 数税云真实分析接口：待 Network 补抓。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 分析看板/按发票种类统计 · `analysisBoard-invoiceTypeView`

- URL：https://fp.enuoyun.com/analysisBoard/invoiceTypeView
- page spec：`docs/tax-cloud/pages/analysisBoard-invoiceTypeView.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `analysisBoard-invoiceTypeView.default.har` | default | manual review | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。 |
| 2 | `analysisBoard-invoiceTypeView.default-list.har` | default-list | L0 query | 数税云真实分析接口：待 Network 补抓。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 分析看板/按上下游企业统计 · `analysisBoard-businessRateView`

- URL：https://fp.enuoyun.com/analysisBoard/businessRateView
- page spec：`docs/tax-cloud/pages/analysisBoard-businessRateView.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `analysisBoard-businessRateView.default.har` | default | manual review | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。 |
| 2 | `analysisBoard-businessRateView.detail.har` | detail | manual review | 发票池明细下钻：`/api/tax-invoices/records/list`，L0。 |
| 3 | `analysisBoard-businessRateView.default-list.har` | default-list | L0 query | 数税云真实分析接口：待 Network 补抓。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 分析看板/按进销商品统计 · `analysisBoard-goodsRateView`

- URL：https://fp.enuoyun.com/analysisBoard/goodsRateView
- page spec：`docs/tax-cloud/pages/analysisBoard-goodsRateView.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `analysisBoard-goodsRateView.default.har` | default | manual review | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。 |
| 2 | `analysisBoard-goodsRateView.default-2.har` | default-2 | manual review | 商品税编：`ynfp.invoice.batch.taxCode`，L0，曾返回 7007，需要复测。 |
| 3 | `analysisBoard-goodsRateView.default-list.har` | default-list | L0 query | 数税云真实分析接口：待 Network 补抓。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 分析看板/按进销趋势统计 · `analysisBoard-purchaseSalesTrend`

- URL：https://fp.enuoyun.com/analysisBoard/purchaseSalesTrend
- page spec：`docs/tax-cloud/pages/analysisBoard-purchaseSalesTrend.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `analysisBoard-purchaseSalesTrend.default.har` | default | manual review | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。 |
| 2 | `analysisBoard-purchaseSalesTrend.default-list.har` | default-list | L0 query | 发票池列表下钻：`/api/tax-invoices/records/list`，L0。 |
| 3 | `analysisBoard-purchaseSalesTrend.default-list-2.har` | default-list-2 | L0 query | 数税云真实分析接口：待 Network 补抓。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 分析看板/按进销地区统计 · `analysisBoard-invoiceRegionView`

- URL：https://fp.enuoyun.com/analysisBoard/invoiceRegionView
- page spec：`docs/tax-cloud/pages/analysisBoard-invoiceRegionView.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `analysisBoard-invoiceRegionView.default.har` | default | manual review | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。 |
| 2 | `analysisBoard-invoiceRegionView.default-list.har` | default-list | L0 query | 发票池列表下钻：`/api/tax-invoices/records/list`，L0。 |
| 3 | `analysisBoard-invoiceRegionView.default-list-2.har` | default-list-2 | L0 query | 数税云真实分析接口：待 Network 补抓。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P2 · 基础信息/商品信息 · `bussiness-info`

- URL：https://fp.enuoyun.com/bussiness/info
- page spec：`docs/tax-cloud/pages/bussiness-info.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `bussiness-info.default-list.har` | default-list | L2 review | 商品列表/保存：待真实 Network 补抓，L1。 |
| 2 | `bussiness-info.default.har` | default | manual review | 税收分类编码：`ynfp.invoice.batch.taxCode`，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P2 · 基础信息/客户管理 · `bussiness-customer`

- URL：https://fp.enuoyun.com/bussiness/customer
- page spec：`docs/tax-cloud/pages/bussiness-customer.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `bussiness-customer.default-list.har` | default-list | L2 review | 客户列表/详情/保存：待真实 Network 补抓，L1。 |
| 2 | `bussiness-customer.action-review.har` | action-review | manual review | 开票页客户库：`/api/tax-invoices/issue-buyer-addresses`，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P2 · 基础信息/开票额度配置 · `bussiness-credit`

- URL：https://fp.enuoyun.com/bussiness/credit
- page spec：`docs/tax-cloud/pages/bussiness-credit.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `bussiness-credit.default.har` | default | manual review | `GET /prod-api/bussiness/credit/creditInfo/1`，L0。 |
| 2 | `bussiness-credit.default-2.har` | default-2 | manual review | ERP：`GET /api/tax-invoices/issue-credit?type=1`，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P2/P3 · 基础信息/配置管理 · `bussiness-configurationManagement`

- URL：https://fp.enuoyun.com/bussiness/configurationManagement
- page spec：`docs/tax-cloud/pages/bussiness-configurationManagement.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `bussiness-configurationManagement.default-list.har` | default-list | L2 review | 配置列表/保存：待真实 Network 补抓，L1/L2。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P3 · 系统设置/组织管理 · `system-dept`

- URL：https://fp.enuoyun.com/system/dept
- page spec：`docs/tax-cloud/pages/system-dept.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `system-dept.default-list.har` | default-list | L2 review | 组织列表/保存：待真实 Network 补抓，L1。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P3 · 系统设置/部门管理 · `system-departmentInfo`

- URL：https://fp.enuoyun.com/system/departmentInfo
- page spec：`docs/tax-cloud/pages/system-departmentInfo.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `system-departmentInfo.default-list.har` | default-list | L2 review | 部门列表/保存：待真实 Network 补抓，L1。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P3 · 系统设置/角色管理 · `system-role`

- URL：https://fp.enuoyun.com/system/role
- page spec：`docs/tax-cloud/pages/system-role.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `system-role.default-list.har` | default-list | L0 query | 角色列表/权限树：待真实 Network 补抓，L1。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P2 · 系统设置/网上办税信息 · `system-onlineTaxationInfo`

- URL：https://fp.enuoyun.com/system/onlineTaxationInfo
- page spec：`docs/tax-cloud/pages/system-onlineTaxationInfo.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `system-onlineTaxationInfo.default.har` | default | manual review | `/system/bizOnlineTaxInformation/getOnlineTax`，L0。 |
| 2 | `system-onlineTaxationInfo.default-list.har` | default-list | manual review | 登录/认证动作：待真实 Network 补抓，L3，默认不在 ERP 触发。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P3 · 系统设置/用户管理 · `system-user`

- URL：https://fp.enuoyun.com/system/user
- page spec：`docs/tax-cloud/pages/system-user.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `system-user.default-list.har` | default-list | L2 review | 用户列表/保存/启停：待真实 Network 补抓，L1。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1 · 顶部入口/下载中心 · `downloadCenter`

- URL：https://fp.enuoyun.com/downloadCenter
- page spec：`docs/tax-cloud/pages/downloadCenter.page.md`
- 当前证据：
  - 暂无 normalized HAR 证据。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `downloadCenter.default-list.har` | default-list | L2 review | 下载任务列表/文件下载：待真实 Network 补抓，L0/L2。 |
| 2 | `downloadCenter.download.har` | download | L2 review | 版式文件下载：`ynfp.invoice.pool.file.download`，L2。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

