# 数税云 HAR Intake 校验报告

生成时间：2026-06-30T01:08:32.344Z

## 口径

- 范围：最小 HAR 补齐批次中的 19 个文件。
- 目的：导入人工 HAR 后，快速判断是否为真实业务 HAR。
- 接受条件：HAR 文件存在，包含 `fp.enuoyun.com` 真实业务 API，且优先命中交叉校验中的 success/auth 接口。
- 拒绝条件：缺文件、只有 SPA 路由/登录壳/验证码、没有业务 API。
- 复核条件：包含高风险接口，或包含业务 API 但未命中预期接口。

## 汇总

| 项目 | 数量 |
|---|---:|
| expected HAR files | 19 |
| files in HAR dir | 51 |
| accepted | 19 |
| missing | 0 |
| invalid | 0 |
| review | 0 |

## 明细

| pageKey | HAR | 状态 | 业务 API | 登录壳 | 高风险 | 命中预期 | 预期接口 |
|---|---|---|---:|---:|---:|---|---|
| `billCenter-accessSetting` | `billCenter-accessSetting.sync.har` | accepted | 1 | 0 | 0 | `/prod-api/invoicecenter/sjruzhang/getSjruzhangSetting` | `/prod-api/invoicecenter/sjruzhang/getSjruzhangSetting` |
| `billCenter-invoiceVerification` | `billCenter-invoiceVerification.default-list.har` | accepted | 1 | 0 | 0 | `/prod-api/income/invoiceCheck/queryInfoList?pageNum=1&pageSize=1` | `/prod-api/getInvoiceCheckDetail`<br>`/prod-api/abnormalInvoice/setting`<br>`/prod-api/income/invoiceCheck/getPeriod`<br>`/prod-api/income/invoiceCheck/queryInfoList?pageNum=1&pageSize=1` |
| `billCenter-sign` | `billCenter-sign.action-review.har` | accepted | 1 | 0 | 0 | `/prod-api/system/backstage/getInformation` | `/prod-api/invoicecenter/integrated/v1/invoicePool/query`<br>`/prod-api/invoicecenter/integrated/v1/invoicePool/query?pageNum=1&pageSize=1`<br>`/prod-api/inputtax/h51InputTax/statistics`<br>`/prod-api/bussiness/bizGoodsInfo/h5/selectBizGoodsInfoOuterList?pageNum=1&pageSize=1`<br>`/prod-api/system/backstage/getInformation` |
| `billCenter-taskManagement` | `billCenter-taskManagement.default-list.har` | accepted | 1 | 0 | 0 | `/prod-api/system/taskRecord/list?pageNum=1&pageSize=1` | `/prod-api/system/taskRecord/list?pageNum=1&pageSize=1` |
| `downloadCenter` | `downloadCenter.default-list.har` | accepted | 1 | 0 | 0 | `/prod-api/invoicecenter/invoiceGoods/detailList?pageNum=1&pageSize=1` | `/prod-api/invoicecenter/invoiceTemplate/v1/download/template/taskId`<br>`/prod-api/income/statistics/getPeriodStatus`<br>`/prod-api/inputtax/h51InputTax/detailsQuery?pageNum=1&pageSize=1`<br>`/prod-api/invoicecenter/invoiceGoods/detailList?pageNum=1&pageSize=1` |
| `platform-billIssue` | `platform-billIssue.default-list.har` | accepted | 1 | 0 | 0 | `/prod-api/bussiness/bizBillInfo/findDraftList?pageNum=1&pageSize=1` | `/prod-api/bussiness/bizBillInfo/findDraftList?pageNum=1&pageSize=1` |
| `platform-invoiceApplication` | `platform-invoiceApplication.default-list.har` | accepted | 1 | 0 | 0 | `/prod-api/deliveryWithGoods/list?pageNum=1&pageSize=1` | `/prod-api/deliveryWithGoods/list?pageNum=1&pageSize=1`<br>`/prod-api/income/statistics/applyStatistics`<br>`/prod-api/income/statistics/getStatisticsResult`<br>`/prod-api/invoicecheck/check/list/deductCheck?pageNum=1&pageSize=1`<br>`/prod-api/invoicecheck/check/list/deductCheckAll?pageNum=1&pageSize=1`<br>`/prod-api/invoicecheck/check/list/nodeductCheck?pageNum=1&pageSize=1`<br>`/prod-api/statisticsGoodsRateDetail`<br>`/prod-api/statisticsInvoiceInfoQuery?pageNum=1&pageSize=1` |
| `platform-redMark` | `platform-redMark.default-list.har` | accepted | 1 | 0 | 0 | `/prod-api/bussiness/redConfirmInfo/list?pageNum=1&pageSize=1` | `/prod-api/bussiness/redConfirmInfo/list?pageNum=1&pageSize=1` |
| `platform-scanCode` | `platform-scanCode.default-list.har` | accepted | 1 | 0 | 0 | `/prod-api/system/dict/data/getInvoiceType`<br>`/prod-api/system/dict/data/getInvoiceType` | `/prod-api/system/dict/data/getInvoiceType`<br>`/prod-api/bussiness/scanInvoice/getScanInvoiceInfo`<br>`/prod-api/bussiness/scanInvoice/getClientGuess`<br>`/prod-api/bussiness/bizGoodsInfo/h5/selectBizGoodsInfoOuterList?pageNum=1&pageSize=1`<br>`/prod-api/bussiness/scanInvoice/getClientDateByCode`<br>`/prod-api/bussiness/scanInvoice/getOuterPdfBase64`<br>`/prod-api/bussiness/scanInvoice/getScanInvoiceBillInfo`<br>`/prod-api/system/aes/config/encrypt`<br>`/prod-api/system/dict/data/getInvoiceType` |
| `platform-scanRecords` | `platform-scanRecords.default-list.har` | accepted | 1 | 0 | 0 | `/prod-api/bussiness/scanInvoice/getClientGuess`<br>`/prod-api/bussiness/scanInvoice/getClientGuess` | `/prod-api/bussiness/scanInvoice/getClientGuess`<br>`/prod-api/bussiness/scanInvoice/getClientGuess`<br>`/prod-api/bussiness/scanInvoice/getClientDateByCode`<br>`/prod-api/bussiness/bizGoodsInfo/h5/selectBizGoodsInfoOuterList?pageNum=1&pageSize=1`<br>`/prod-api/bussiness/scanInvoice/getOuterPdfBase64`<br>`/prod-api/bussiness/scanInvoice/getScanInvoiceBillInfo`<br>`/prod-api/bussiness/scanInvoice/getScanInvoiceInfo`<br>`/prod-api/system/aes/config/encrypt`<br>`/prod-api/system/dict/data/getInvoiceType` |
| `bussiness-configurationManagement` | `bussiness-configurationManagement.default-list.har` | accepted | 1 | 0 | 0 | `/prod-api/system/config/list?pageNum=1&pageSize=1`<br>`/prod-api/system/config/list?pageNum=1&pageSize=1` | `/prod-api/system/config/list?pageNum=1&pageSize=1`<br>`/prod-api/system/config/list?pageNum=1&pageSize=1`<br>`/prod-api/system/config/configKey/`<br>`/prod-api/bussiness/scanInvoice/getOuterPdfBase64`<br>`/prod-api/bussiness/scanInvoice/getScanInvoiceBillInfo`<br>`/prod-api/bussiness/scanInvoice/getScanInvoiceInfo`<br>`/prod-api/income/invoiceCheck/getPeriod` |
| `bussiness-credit` | `bussiness-credit.default-list.har` | accepted | 1 | 0 | 0 | `/prod-api/bussiness/creditLine/query?pageNum=1&pageSize=1` | `/prod-api/bussiness/creditLine/query?pageNum=1&pageSize=1`<br>`/prod-api/bussiness/credit/creditInfo/1?_t=1782781312531`<br>`/prod-api/bussiness/bizBillInfo/h5getFpdyXml` |
| `bussiness-customer` | `bussiness-customer.default-list.har` | accepted | 1 | 0 | 0 | `/prod-api/bussiness/bizCustomer/selectBizCustomerInfoOutNotList?pageNum=1&pageSize=1` | `/prod-api/bussiness/bizCustomer/selectBizCustomerInfoOutNotList?pageNum=1&pageSize=1` |
| `bussiness-info` | `bussiness-info.default-list.har` | accepted | 1 | 0 | 0 | `/prod-api/bussiness/bizGoodsInfo/selectBizGoodsInfoOuterList?pageNum=1&pageSize=1` | `/prod-api/bussiness/bizGoodsInfo/selectBizGoodsInfoOuterList?pageNum=1&pageSize=1` |
| `system-onlineTaxationInfo` | `system-onlineTaxationInfo.default-list.har` | accepted | 1 | 0 | 0 | `/prod-api/system/bizOnlineTaxInformation/selectBizOnlineTaxInfoList` | `/prod-api/system/bizOnlineTaxInformation/selectBizOnlineTaxInfoList`<br>`/prod-api/system/bizOnlineTaxInformation/getOnlineTax` |
| `system-departmentInfo` | `system-departmentInfo.default-list.har` | accepted | 1 | 0 | 0 | `/prod-api/system/departmentInfo/list?pageNum=1&pageSize=1` | `/prod-api/system/departmentInfo/list?pageNum=1&pageSize=1` |
| `system-dept` | `system-dept.default-list.har` | accepted | 1 | 0 | 0 | `/prod-api/system/dept/list` | `/prod-api/system/dept/list` |
| `system-role` | `system-role.default-list.har` | accepted | 1 | 0 | 0 | `/prod-api/system/role/list?pageNum=1&pageSize=1` | `/prod-api/system/role/list?pageNum=1&pageSize=1` |
| `system-user` | `system-user.default-list.har` | accepted | 1 | 0 | 0 | `/prod-api/system/user/list?pageNum=1&pageSize=1` | `/prod-api/system/user/list?pageNum=1&pageSize=1` |

## 使用

~~~bash
npm run tax-cloud:har:intake
~~~

通过后再运行：

~~~bash
npm run tax-cloud:har:parse-all
npm run tax-cloud:har:tasks
npm run tax-cloud:audit:strict
~~~
