# 数税云 HAR 捕获队列

生成时间：2026-06-30T01:08:34.397Z

## 口径

- 范围：最小 HAR 补齐批次的 19 个页面。
- 排序：已探测到业务成功接口优先，其次按 P1/P2/P3，再按 intake 状态。
- 目标：按队列逐页补真实登录态 HAR，让 `tax-cloud:audit:strict` 从 13/32 推到 32/32。
- 禁止：保存、提交、确认、签收、红字、真实开票、勾选认证、重启任务、导出/下载文件、删除。

## 汇总

| 项目 | 数量 |
|---|---:|
| queue items | 19 |
| intake missing | 0 |
| items with success probe | 14 |

## 队列

| 顺序 | pageKey | 菜单 | HAR 文件 | 当前状态 | URL | 安全动作 | 预期接口 |
|---:|---|---|---|---|---|---|---|
| 1 | `billCenter-accessSetting` | 票据中心/取票设置 | `billCenter-accessSetting.sync.har` | accepted | https://fp.enuoyun.com/billCenter/accessSetting | 进入页面后只触发查询/默认加载，Network 中确认 `POST /prod-api/invoicecenter/sjruzhang/getSjruzhangSetting` 出现；不要点提交/保存/确认。 | `/prod-api/invoicecenter/sjruzhang/getSjruzhangSetting` |
| 2 | `billCenter-invoiceVerification` | 票据中心/查验 | `billCenter-invoiceVerification.default-list.har` | accepted | https://fp.enuoyun.com/billCenter/invoiceVerification | 进入页面后只触发查询/默认加载，Network 中确认 `GET /prod-api/income/invoiceCheck/queryInfoList?pageNum=1&pageSize=1` 出现；不要点提交/保存/确认。 | `/prod-api/getInvoiceCheckDetail`<br>`/prod-api/abnormalInvoice/setting`<br>`/prod-api/income/invoiceCheck/getPeriod`<br>`/prod-api/income/invoiceCheck/queryInfoList?pageNum=1&pageSize=1` |
| 3 | `billCenter-sign` | 票据中心/签收 | `billCenter-sign.action-review.har` | accepted | https://fp.enuoyun.com/billCenter/sign | 进入页面后只触发查询/默认加载，Network 中确认 `GET /prod-api/system/backstage/getInformation` 出现；不要点提交/保存/确认。 | `/prod-api/invoicecenter/integrated/v1/invoicePool/query`<br>`/prod-api/invoicecenter/integrated/v1/invoicePool/query?pageNum=1&pageSize=1`<br>`/prod-api/inputtax/h51InputTax/statistics`<br>`/prod-api/bussiness/bizGoodsInfo/h5/selectBizGoodsInfoOuterList?pageNum=1&pageSize=1`<br>`/prod-api/system/backstage/getInformation` |
| 4 | `billCenter-taskManagement` | 票据中心/任务管理 | `billCenter-taskManagement.default-list.har` | accepted | https://fp.enuoyun.com/billCenter/taskManagement | 进入页面后只触发查询/默认加载，Network 中确认 `GET /prod-api/system/taskRecord/list?pageNum=1&pageSize=1` 出现；不要点提交/保存/确认。 | `/prod-api/system/taskRecord/list?pageNum=1&pageSize=1` |
| 5 | `downloadCenter` | 顶部入口/下载中心 | `downloadCenter.default-list.har` | accepted | https://fp.enuoyun.com/downloadCenter | 进入页面后只触发查询/默认加载，Network 中确认 `POST /prod-api/invoicecenter/invoiceGoods/detailList?pageNum=1&pageSize=1` 出现；不要点提交/保存/确认。 | `/prod-api/invoicecenter/invoiceTemplate/v1/download/template/taskId`<br>`/prod-api/income/statistics/getPeriodStatus`<br>`/prod-api/inputtax/h51InputTax/detailsQuery?pageNum=1&pageSize=1`<br>`/prod-api/invoicecenter/invoiceGoods/detailList?pageNum=1&pageSize=1` |
| 6 | `platform-billIssue` | 销项管理/订单开票 | `platform-billIssue.default-list.har` | accepted | https://fp.enuoyun.com/platform/billIssue | 进入页面后只触发查询/默认加载，Network 中确认 `GET /prod-api/bussiness/bizBillInfo/findDraftList?pageNum=1&pageSize=1` 出现；不要点提交/保存/确认。 | `/prod-api/bussiness/bizBillInfo/findDraftList?pageNum=1&pageSize=1` |
| 7 | `platform-redMark` | 销项管理/红字确认单 | `platform-redMark.default-list.har` | accepted | https://fp.enuoyun.com/platform/redMark | 进入页面后只触发查询/默认加载，Network 中确认 `GET /prod-api/bussiness/redConfirmInfo/list?pageNum=1&pageSize=1` 出现；不要点提交/保存/确认。 | `/prod-api/bussiness/redConfirmInfo/list?pageNum=1&pageSize=1` |
| 8 | `bussiness-customer` | 基础信息/客户管理 | `bussiness-customer.default-list.har` | accepted | https://fp.enuoyun.com/bussiness/customer | 进入页面后只触发查询/默认加载，Network 中确认 `GET /prod-api/bussiness/bizCustomer/selectBizCustomerInfoOutNotList?pageNum=1&pageSize=1` 出现；不要点提交/保存/确认。 | `/prod-api/bussiness/bizCustomer/selectBizCustomerInfoOutNotList?pageNum=1&pageSize=1` |
| 9 | `bussiness-info` | 基础信息/商品信息 | `bussiness-info.default-list.har` | accepted | https://fp.enuoyun.com/bussiness/info | 进入页面后只触发查询/默认加载，Network 中确认 `GET /prod-api/bussiness/bizGoodsInfo/selectBizGoodsInfoOuterList?pageNum=1&pageSize=1` 出现；不要点提交/保存/确认。 | `/prod-api/bussiness/bizGoodsInfo/selectBizGoodsInfoOuterList?pageNum=1&pageSize=1` |
| 10 | `system-onlineTaxationInfo` | 系统设置/网上办税信息 | `system-onlineTaxationInfo.default-list.har` | accepted | https://fp.enuoyun.com/system/onlineTaxationInfo | 进入页面后只触发查询/默认加载，Network 中确认 `POST /prod-api/system/bizOnlineTaxInformation/selectBizOnlineTaxInfoList` 出现；不要点提交/保存/确认。 | `/prod-api/system/bizOnlineTaxInformation/selectBizOnlineTaxInfoList`<br>`/prod-api/system/bizOnlineTaxInformation/getOnlineTax` |
| 11 | `system-departmentInfo` | 系统设置/部门管理 | `system-departmentInfo.default-list.har` | accepted | https://fp.enuoyun.com/system/departmentInfo | 进入页面后只触发查询/默认加载，Network 中确认 `GET /prod-api/system/departmentInfo/list?pageNum=1&pageSize=1` 出现；不要点提交/保存/确认。 | `/prod-api/system/departmentInfo/list?pageNum=1&pageSize=1` |
| 12 | `system-dept` | 系统设置/组织管理 | `system-dept.default-list.har` | accepted | https://fp.enuoyun.com/system/dept | 进入页面后只触发查询/默认加载，Network 中确认 `GET /prod-api/system/dept/list` 出现；不要点提交/保存/确认。 | `/prod-api/system/dept/list` |
| 13 | `system-role` | 系统设置/角色管理 | `system-role.default-list.har` | accepted | https://fp.enuoyun.com/system/role | 进入页面后只触发查询/默认加载，Network 中确认 `GET /prod-api/system/role/list?pageNum=1&pageSize=1` 出现；不要点提交/保存/确认。 | `/prod-api/system/role/list?pageNum=1&pageSize=1` |
| 14 | `system-user` | 系统设置/用户管理 | `system-user.default-list.har` | accepted | https://fp.enuoyun.com/system/user | 进入页面后只触发查询/默认加载，Network 中确认 `GET /prod-api/system/user/list?pageNum=1&pageSize=1` 出现；不要点提交/保存/确认。 | `/prod-api/system/user/list?pageNum=1&pageSize=1` |
| 15 | `platform-invoiceApplication` | 销项管理/开票申请单 | `platform-invoiceApplication.default-list.har` | accepted | https://fp.enuoyun.com/platform/invoiceApplication | 进入页面后只触发查询/默认加载，Network 中确认 `GET /prod-api/deliveryWithGoods/list?pageNum=1&pageSize=1` 出现；不要点提交/保存/确认。 | `/prod-api/deliveryWithGoods/list?pageNum=1&pageSize=1`<br>`/prod-api/income/statistics/applyStatistics`<br>`/prod-api/income/statistics/getStatisticsResult`<br>`/prod-api/invoicecheck/check/list/deductCheck?pageNum=1&pageSize=1`<br>`/prod-api/invoicecheck/check/list/deductCheckAll?pageNum=1&pageSize=1`<br>`/prod-api/invoicecheck/check/list/nodeductCheck?pageNum=1&pageSize=1`<br>`/prod-api/statisticsGoodsRateDetail`<br>`/prod-api/statisticsInvoiceInfoQuery?pageNum=1&pageSize=1` |
| 16 | `platform-scanCode` | 销项管理/扫码开票 | `platform-scanCode.default-list.har` | accepted | https://fp.enuoyun.com/platform/scanCode | 进入页面后只触发查询/默认加载，Network 中确认 `GET /prod-api/system/dict/data/getInvoiceType` 出现；不要点提交/保存/确认。 | `/prod-api/system/dict/data/getInvoiceType`<br>`/prod-api/bussiness/scanInvoice/getScanInvoiceInfo`<br>`/prod-api/bussiness/scanInvoice/getClientGuess`<br>`/prod-api/bussiness/bizGoodsInfo/h5/selectBizGoodsInfoOuterList?pageNum=1&pageSize=1`<br>`/prod-api/bussiness/scanInvoice/getClientDateByCode`<br>`/prod-api/bussiness/scanInvoice/getOuterPdfBase64`<br>`/prod-api/bussiness/scanInvoice/getScanInvoiceBillInfo`<br>`/prod-api/system/aes/config/encrypt`<br>`/prod-api/system/dict/data/getInvoiceType` |
| 17 | `platform-scanRecords` | 销项管理/扫码记录 | `platform-scanRecords.default-list.har` | accepted | https://fp.enuoyun.com/platform/scanRecords | 进入页面后只触发查询/默认加载，Network 中确认 `GET /prod-api/bussiness/scanInvoice/getClientGuess` 出现；不要点提交/保存/确认。 | `/prod-api/bussiness/scanInvoice/getClientGuess`<br>`/prod-api/bussiness/scanInvoice/getClientGuess`<br>`/prod-api/bussiness/scanInvoice/getClientDateByCode`<br>`/prod-api/bussiness/bizGoodsInfo/h5/selectBizGoodsInfoOuterList?pageNum=1&pageSize=1`<br>`/prod-api/bussiness/scanInvoice/getOuterPdfBase64`<br>`/prod-api/bussiness/scanInvoice/getScanInvoiceBillInfo`<br>`/prod-api/bussiness/scanInvoice/getScanInvoiceInfo`<br>`/prod-api/system/aes/config/encrypt`<br>`/prod-api/system/dict/data/getInvoiceType` |
| 18 | `bussiness-configurationManagement` | 基础信息/配置管理 | `bussiness-configurationManagement.default-list.har` | accepted | https://fp.enuoyun.com/bussiness/configurationManagement | 进入页面后只触发查询/默认加载，Network 中确认 `GET /prod-api/system/config/list?pageNum=1&pageSize=1` 出现；不要点提交/保存/确认。 | `/prod-api/system/config/list?pageNum=1&pageSize=1`<br>`/prod-api/system/config/list?pageNum=1&pageSize=1`<br>`/prod-api/system/config/configKey/`<br>`/prod-api/bussiness/scanInvoice/getOuterPdfBase64`<br>`/prod-api/bussiness/scanInvoice/getScanInvoiceBillInfo`<br>`/prod-api/bussiness/scanInvoice/getScanInvoiceInfo`<br>`/prod-api/income/invoiceCheck/getPeriod` |
| 19 | `bussiness-credit` | 基础信息/开票额度配置 | `bussiness-credit.default-list.har` | accepted | https://fp.enuoyun.com/bussiness/credit | 进入页面后只触发查询/默认加载，Network 中确认 `GET /prod-api/bussiness/creditLine/query?pageNum=1&pageSize=1` 出现；不要点提交/保存/确认。 | `/prod-api/bussiness/creditLine/query?pageNum=1&pageSize=1`<br>`/prod-api/bussiness/credit/creditInfo/1?_t=1782781312531`<br>`/prod-api/bussiness/bizBillInfo/h5getFpdyXml` |

## 执行命令

~~~bash
npm run tax-cloud:har:intake
npm run tax-cloud:har:parse-all
npm run tax-cloud:har:tasks
npm run tax-cloud:audit:strict
~~~
