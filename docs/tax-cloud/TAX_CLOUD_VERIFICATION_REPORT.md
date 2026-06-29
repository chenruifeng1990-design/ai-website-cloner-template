# 数税云全量任务机器验收报告

生成时间：2026-06-29T08:39:29.223Z

## 结论

全量验收未通过。

当前状态：

```text
partial: page/spec/action/demo layers pass; real HAR interface evidence still incomplete
```

## 总体验收

| 检查项 | 结果 | 证据 |
|---|---|---|
| 33 page targets | PASS | 33/33 target pages |
| Page capture four-piece plus page spec | PASS | 33/33 complete |
| Core control documents | PASS | 12/12 present |
| P0 action matrix covers all non-manual P0 pages | PASS | all P0 keys present |
| P0 demo covers all non-manual P0 pages | PASS | all P0 demo keys present |
| P1/P2/P3 action matrix covers remaining pages | PASS | all remaining keys present |
| Page spec candidate interface evidence | PASS | 33/33 pages have candidate interface notes |
| HAR-backed real interface evidence | FAIL | 0/32 non-manual pages have normalized HAR evidence |

## 页面层明细

| key | 菜单 | raw | visible DOM | screenshot | design ref | page spec |
|---|---|---|---|---|---|---|
| `platform-created` | 销项管理/手工开票 | yes | yes | yes | yes | yes |
| `platform-scanCode` | 销项管理/扫码开票 | yes | yes | yes | yes | yes |
| `platform-scanRecords` | 销项管理/扫码记录 | yes | yes | yes | yes | yes |
| `platform-records` | 销项管理/开票记录 | yes | yes | yes | yes | yes |
| `platform-billIssue` | 销项管理/订单开票 | yes | yes | yes | yes | yes |
| `platform-invoiceApplication` | 销项管理/开票申请单 | yes | yes | yes | yes | yes |
| `platform-redMark` | 销项管理/红字确认单 | yes | yes | yes | yes | yes |
| `income-scanCodeCheck` | 进项管理/快捷勾选 | yes | yes | yes | yes | yes |
| `income-invoiceCheck` | 进项管理/手工勾选 | yes | yes | yes | yes | yes |
| `income-confirmCheck` | 进项管理/勾选审核 | yes | yes | yes | yes | yes |
| `income-confirmSign` | 进项管理/统计确认 | yes | yes | yes | yes | yes |
| `income-certificationResults` | 进项管理/认证结果 | yes | yes | yes | yes | yes |
| `billCenter-fullInvoiceQuery` | 票据中心/发票池 | yes | yes | yes | yes | yes |
| `billCenter-sign` | 票据中心/签收 | yes | yes | yes | yes | yes |
| `billCenter-invoiceVerification` | 票据中心/查验 | yes | yes | yes | yes | yes |
| `billCenter-accessSetting` | 票据中心/取票设置 | yes | yes | yes | yes | yes |
| `billCenter-taskManagement` | 票据中心/任务管理 | yes | yes | yes | yes | yes |
| `analysisBoard-invoceRateView` | 分析看板/按税率统计 | yes | yes | yes | yes | yes |
| `analysisBoard-invoiceTypeView` | 分析看板/按发票种类统计 | yes | yes | yes | yes | yes |
| `analysisBoard-businessRateView` | 分析看板/按上下游企业统计 | yes | yes | yes | yes | yes |
| `analysisBoard-goodsRateView` | 分析看板/按进销商品统计 | yes | yes | yes | yes | yes |
| `analysisBoard-purchaseSalesTrend` | 分析看板/按进销趋势统计 | yes | yes | yes | yes | yes |
| `analysisBoard-invoiceRegionView` | 分析看板/按进销地区统计 | yes | yes | yes | yes | yes |
| `bussiness-info` | 基础信息/商品信息 | yes | yes | yes | yes | yes |
| `bussiness-customer` | 基础信息/客户管理 | yes | yes | yes | yes | yes |
| `bussiness-credit` | 基础信息/开票额度配置 | yes | yes | yes | yes | yes |
| `bussiness-configurationManagement` | 基础信息/配置管理 | yes | yes | yes | yes | yes |
| `system-dept` | 系统设置/组织管理 | yes | yes | yes | yes | yes |
| `system-departmentInfo` | 系统设置/部门管理 | yes | yes | yes | yes | yes |
| `system-role` | 系统设置/角色管理 | yes | yes | yes | yes | yes |
| `system-onlineTaxationInfo` | 系统设置/网上办税信息 | yes | yes | yes | yes | yes |
| `system-user` | 系统设置/用户管理 | yes | yes | yes | yes | yes |
| `downloadCenter` | 顶部入口/下载中心 | yes | yes | yes | yes | yes |

## HAR 证据

| 项目 | 数量 |
|---|---:|
| normalized HAR files | 0 |
| pages with HAR evidence | 0 |
| required non-manual pages | 32 |
| missing HAR evidence pages | 32 |

## 候选接口证据

| 项目 | 数量 |
|---|---:|
| pages with candidate interface notes | 33 |
| pages missing candidate interface notes | 0 |

| key | 候选接口/策略数量 | 说明 |
|---|---:|---|
| `platform-created` | 10 | 流水号：`/bussiness/bizBillInfo/getSerialNumber`、`/bussiness/bizInvoiceInfo/getSerialNumber`，L0。<br>销方信息：`/bussiness/bizInvoiceInfo/getSellerInfo`、`/bussiness/bizInvoiceInfo/getDefaultSellerInfo`，L0。<br>额度：`/prod-api/bussiness/credit/creditInfo/1`、`/bussiness/credit/creditInfo/2`、`/bussiness/bizInvoiceInfo/getCreditInfo/2`，L0。<br>网上办税信息：`/system/bizOnlineTaxInformation/getOnlineTax`，L0。<br>草稿箱/待开发票：`/bussiness/bizBillInfo/findDraftList`、`/bussiness/bizInvoiceInfo/getDraftInvoiceList`、`/bussiness/bizInvoiceInfo/getWaitInvoiceList`，L0。<br>暂存草稿：`/bussiness/bizBillInfo/stagingOrder`、`/bussiness/bizInvoiceInfo/saveStagingOrder`，L2。<br>清单导入：`/bussiness/bizInvoiceInfo/billListImport2`，L1。<br>税收分类编码：`ynfp.invoice.batch.taxCode`，L0，曾返回 7007，需要复测。<br>场景模板：`/bussiness/bizInvoiceInfo/getSceneTemplateList`、`/bussiness/bizInvoiceInfo/getSceneTemplateDetail`，L0。<br>真实开票：`ynfp.invoice.issue.sync`，L4，只能走 ERP 飞书审批、preview hash、服务端总闸。 |
| `platform-scanCode` | 3 | 扫码链接/二维码生成：待真实 Network 补抓，L2。<br>扫码记录查询：和 `platform-scanRecords` 联动，L0。<br>真实开票：禁止从本页直接触发 L4，必须回到 ERP 草稿审批链路。 |
| `platform-scanRecords` | 3 | 扫码记录列表：待真实 Network 补抓，L0。<br>扫码记录详情：待真实 Network 补抓，L0。<br>导出：待真实 Network 补抓，L1。 |
| `platform-records` | 5 | 开票结果查询：`ynfp.invoice.detail.query`，L0。<br>发票明细列表：`ynfp.invoice.detail.list.query`，L0，曾返回 7007，需要复测权限。<br>ERP 列表：`/api/tax-invoices/records/list`，L0。<br>版式下载：`/api/tax-invoices/records/layout-file-download`，L2。<br>对账：`/api/tax-invoices/records/reconcile`，L0。 |
| `platform-billIssue` | 2 | 数税云订单列表：待真实 Network 补抓，L0。<br>ERP 合同直达草稿：`/api/invoice-registration/tax-drafts/from-contract`，L1。 |
| `platform-invoiceApplication` | 2 | 数税云申请单列表：待真实 Network 补抓，L0。<br>ERP 不新增旧申请接口。 |
| `platform-redMark` | 5 | `ynfp.invoice.red.confirm.query`，L0。<br>`ynfp.invoice.red.confirmDetail.query`，L0。<br>`ynfp.invoice.red.confirm.issue`，L3。<br>`ynfp.invoice.red.confirm.operate`，L3。<br>`ynfp.invoice.red.confirm.down`，L2。 |
| `income-scanCodeCheck` | 2 | 用途状态查询：`ynfp.invoice.usage.status.query`，L0。<br>快捷勾选提交：待真实 Network 补抓，L3。 |
| `income-invoiceCheck` | 5 | 用途状态查询：`ynfp.invoice.usage.status.query`，L0。<br>发票池列表：`ynfp.invoice.pool.list.query`，L0。<br>下载发票：`ynfp.invoice.pool.file.download`，L2。<br>勾选/不抵扣类动作：需重新确认真实接口，按 L3 预设。<br>ERP 状态动作：`/api/tax-invoices/records/status-action`，L2/L3。 |
| `income-confirmCheck` | 3 | 批次查询：待真实 Network 补抓，L0。<br>审核/确认：待真实 Network 补抓，L3。<br>ERP 批次：`/api/tax-invoices/records/certification-batches`，L1/L2。 |
| `income-confirmSign` | 3 | 统计确认相关接口需通过 Network 补抓。<br>认证结果/批次：`/api/tax-invoices/records/certification-batches`，L1/L2。<br>发票池明细：`/api/tax-invoices/records/list`，L0。 |
| `income-certificationResults` | 3 | 用途状态查询：`ynfp.invoice.usage.status.query`，L0。<br>发票池列表/详情：`ynfp.invoice.pool.list.query` / `ynfp.invoice.pool.detail.query`，L0。<br>ERP 批次：`/api/tax-invoices/records/certification-batches`，L1/L2。 |
| `billCenter-fullInvoiceQuery` | 6 | 发票池列表：`ynfp.invoice.pool.list.query`，L0，曾返回 7007，需要复测。<br>发票池详情：`ynfp.invoice.pool.detail.query`，L0。<br>版式文件下载：`ynfp.invoice.pool.file.download`，L2。<br>发票获取/取票：`ynfp.invoice.obtain`，L2。<br>税局入账状态查询：`ynfp.invoice.pool.rz.cx`，L0。<br>入账状态提交/调整：`ynfp.invoice.pool.rz.tj` / `ynfp.invoice.pool.rz.tz`，L3，默认禁用。 |
| `billCenter-sign` | 2 | 签收列表：待真实 Network 补抓，L0。<br>`ynfp.invoice.sign`，L2/L3，真实后果待确认。 |
| `billCenter-invoiceVerification` | 2 | `ynfp.invoice.check`，L2。<br>ERP：`/api/tax-invoices/records/provider-check`，L2。 |
| `billCenter-accessSetting` | 2 | 取票设置列表/保存：待真实 Network 补抓，L1/L2。<br>ERP 同步游标：`/api/tax-invoices/sync-cursors`，L0。 |
| `billCenter-taskManagement` | 2 | 任务列表/详情/重试：待真实 Network 补抓，L1/L2。<br>ERP 同步任务：`/api/tax-invoices/sync-sales`、`/api/tax-invoices/sync-purchases`，L2。 |
| `analysisBoard-invoceRateView` | 2 | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。<br>数税云真实分析接口：待 Network 补抓。 |
| `analysisBoard-invoiceTypeView` | 2 | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。<br>数税云真实分析接口：待 Network 补抓。 |
| `analysisBoard-businessRateView` | 3 | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。<br>发票池明细下钻：`/api/tax-invoices/records/list`，L0。<br>数税云真实分析接口：待 Network 补抓。 |
| `analysisBoard-goodsRateView` | 3 | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。<br>商品税编：`ynfp.invoice.batch.taxCode`，L0，曾返回 7007，需要复测。<br>数税云真实分析接口：待 Network 补抓。 |
| `analysisBoard-purchaseSalesTrend` | 3 | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。<br>发票池列表下钻：`/api/tax-invoices/records/list`，L0。<br>数税云真实分析接口：待 Network 补抓。 |
| `analysisBoard-invoiceRegionView` | 3 | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。<br>发票池列表下钻：`/api/tax-invoices/records/list`，L0。<br>数税云真实分析接口：待 Network 补抓。 |
| `bussiness-info` | 2 | 商品列表/保存：待真实 Network 补抓，L1。<br>税收分类编码：`ynfp.invoice.batch.taxCode`，L0。 |
| `bussiness-customer` | 2 | 客户列表/详情/保存：待真实 Network 补抓，L1。<br>开票页客户库：`/api/tax-invoices/issue-buyer-addresses`，L0。 |
| `bussiness-credit` | 2 | `GET /prod-api/bussiness/credit/creditInfo/1`，L0。<br>ERP：`GET /api/tax-invoices/issue-credit?type=1`，L0。 |
| `bussiness-configurationManagement` | 1 | 配置列表/保存：待真实 Network 补抓，L1/L2。 |
| `system-dept` | 1 | 组织列表/保存：待真实 Network 补抓，L1。 |
| `system-departmentInfo` | 1 | 部门列表/保存：待真实 Network 补抓，L1。 |
| `system-role` | 1 | 角色列表/权限树：待真实 Network 补抓，L1。 |
| `system-onlineTaxationInfo` | 2 | `/system/bizOnlineTaxInformation/getOnlineTax`，L0。<br>登录/认证动作：待真实 Network 补抓，L3，默认不在 ERP 触发。 |
| `system-user` | 1 | 用户列表/保存/启停：待真实 Network 补抓，L1。 |
| `downloadCenter` | 2 | 下载任务列表/文件下载：待真实 Network 补抓，L0/L2。<br>版式文件下载：`ynfp.invoice.pool.file.download`，L2。 |

缺 HAR 证据页面：

```text
platform-scanCode
platform-scanRecords
platform-records
platform-billIssue
platform-invoiceApplication
platform-redMark
income-scanCodeCheck
income-invoiceCheck
income-confirmCheck
income-confirmSign
income-certificationResults
billCenter-fullInvoiceQuery
billCenter-sign
billCenter-invoiceVerification
billCenter-accessSetting
billCenter-taskManagement
analysisBoard-invoceRateView
analysisBoard-invoiceTypeView
analysisBoard-businessRateView
analysisBoard-goodsRateView
analysisBoard-purchaseSalesTrend
analysisBoard-invoiceRegionView
bussiness-info
bussiness-customer
bussiness-credit
bussiness-configurationManagement
system-dept
system-departmentInfo
system-role
system-onlineTaxationInfo
system-user
downloadCenter
```

## 缺失控制文档

```text
none
```

## 使用方式

```bash
npm run tax-cloud:audit
npm run tax-cloud:audit:strict
```

`tax-cloud:audit:strict` 只有在页面、文档、动作矩阵、P0 demo、真实 HAR 接口证据全部满足时才通过。
