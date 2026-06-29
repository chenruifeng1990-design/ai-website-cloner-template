# 数税云全量任务机器验收报告

生成时间：2026-06-29T08:18:22.953Z

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
| Core control documents | PASS | 11/11 present |
| P0 action matrix covers all non-manual P0 pages | PASS | all P0 keys present |
| P0 demo covers all non-manual P0 pages | PASS | all P0 demo keys present |
| P1/P2/P3 action matrix covers remaining pages | PASS | all remaining keys present |
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
