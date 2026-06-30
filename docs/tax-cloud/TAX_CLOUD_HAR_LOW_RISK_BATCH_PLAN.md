# 数税云 HAR 补抓批次计划（低风险优先）

生成时间：2026-06-29T09:29:32.039Z

总任务数：26

| # | menu | URL | harFile | action | risk |
|---|---|---|---|---|---|
| 1 | 分析看板/按上下游企业统计 | https://fp.enuoyun.com/analysisBoard/businessRateView | analysisBoard-businessRateView.default-list.har | default-list | L0 query |
| 2 | 分析看板/按发票种类统计 | https://fp.enuoyun.com/analysisBoard/invoiceTypeView | analysisBoard-invoiceTypeView.default-list.har | default-list | L0 query |
| 3 | 分析看板/按税率统计 | https://fp.enuoyun.com/analysisBoard/invoceRateView | analysisBoard-invoceRateView.default-list.har | default-list | L0 query |
| 4 | 分析看板/按进销商品统计 | https://fp.enuoyun.com/analysisBoard/goodsRateView | analysisBoard-goodsRateView.default-list.har | default-list | L0 query |
| 5 | 分析看板/按进销地区统计 | https://fp.enuoyun.com/analysisBoard/invoiceRegionView | analysisBoard-invoiceRegionView.default-list.har | default-list | L0 query |
| 6 | 分析看板/按进销地区统计 | https://fp.enuoyun.com/analysisBoard/invoiceRegionView | analysisBoard-invoiceRegionView.default-list-2.har | default-list-2 | L0 query |
| 7 | 分析看板/按进销趋势统计 | https://fp.enuoyun.com/analysisBoard/purchaseSalesTrend | analysisBoard-purchaseSalesTrend.default-list.har | default-list | L0 query |
| 8 | 分析看板/按进销趋势统计 | https://fp.enuoyun.com/analysisBoard/purchaseSalesTrend | analysisBoard-purchaseSalesTrend.default-list-2.har | default-list-2 | L0 query |
| 9 | 票据中心/发票池 | https://fp.enuoyun.com/billCenter/fullInvoiceQuery | billCenter-fullInvoiceQuery.default-list.har | default-list | L0 query |
| 10 | 票据中心/发票池 | https://fp.enuoyun.com/billCenter/fullInvoiceQuery | billCenter-fullInvoiceQuery.detail.har | detail | L0 query |
| 11 | 票据中心/发票池 | https://fp.enuoyun.com/billCenter/fullInvoiceQuery | billCenter-fullInvoiceQuery.default-list-2.har | default-list-2 | L0 query |
| 12 | 系统设置/角色管理 | https://fp.enuoyun.com/system/role | system-role.default-list.har | default-list | L0 query |
| 13 | 进项管理/勾选审核 | https://fp.enuoyun.com/income/confirmCheck | income-confirmCheck.default-list.har | default-list | L0 query |
| 14 | 进项管理/快捷勾选 | https://fp.enuoyun.com/income/scanCodeCheck | income-scanCodeCheck.default-list.har | default-list | L0 query |
| 15 | 进项管理/手工勾选 | https://fp.enuoyun.com/income/invoiceCheck | income-invoiceCheck.default-list.har | default-list | L0 query |
| 16 | 进项管理/手工勾选 | https://fp.enuoyun.com/income/invoiceCheck | income-invoiceCheck.default-list-2.har | default-list-2 | L0 query |
| 17 | 进项管理/认证结果 | https://fp.enuoyun.com/income/certificationResults | income-certificationResults.default-list.har | default-list | L0 query |
| 18 | 进项管理/认证结果 | https://fp.enuoyun.com/income/certificationResults | income-certificationResults.default-list-2.har | default-list-2 | L0 query |
| 19 | 销项管理/开票申请单 | https://fp.enuoyun.com/platform/invoiceApplication | platform-invoiceApplication.default-list.har | default-list | L0 query |
| 20 | 销项管理/开票记录 | https://fp.enuoyun.com/platform/records | platform-records.default-list.har | default-list | L0 query |
| 21 | 销项管理/开票记录 | https://fp.enuoyun.com/platform/records | platform-records.default-list-2.har | default-list-2 | L0 query |
| 22 | 销项管理/开票记录 | https://fp.enuoyun.com/platform/records | platform-records.default-list-3.har | default-list-3 | L0 query |
| 23 | 销项管理/扫码开票 | https://fp.enuoyun.com/platform/scanCode | platform-scanCode.default-list.har | default-list | L0 query |
| 24 | 销项管理/扫码记录 | https://fp.enuoyun.com/platform/scanRecords | platform-scanRecords.default-list.har | default-list | L0 query |
| 25 | 销项管理/扫码记录 | https://fp.enuoyun.com/platform/scanRecords | platform-scanRecords.detail.har | detail | L0 query |
| 26 | 销项管理/订单开票 | https://fp.enuoyun.com/platform/billIssue | platform-billIssue.default-list.har | default-list | L0 query |

说明：仅包含低风险查询类动作（L0）。高风险动作与写操作请另行 review。

执行建议：每采一项后立即执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`