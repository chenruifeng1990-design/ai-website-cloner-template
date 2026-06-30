# 数税云静态只读候选二次探测报告

生成时间：2026-06-30T01:02:01.238Z

## 口径

- 范围：基础只读探测中尚未返回业务成功的缺 HAR 页面。
- 来源：静态 JS 候选接口 + 当前 Chrome Session Storage 中的有效登录态。
- 只探测名称明显为查询/列表/详情/配置读取的接口。
- 禁止项：不探测名称含保存、提交、签收、红字、真实开票、认证、下载、导出、删除、重启、导入、上传、批量处理等动作的接口。
- 本报告仍不替代真实 HAR，只用于缩小后续人工 Network 补抓范围。

## 汇总

| 项目 | 数量 |
|---|---:|
| 覆盖页面 | 8 |
| 探测接口 | 46 |
| 传输可达 | 41 |
| 认证被接受 | 41 |
| 业务成功 | 3 |
| 有业务成功页面 | 3 |

## 页面汇总

| pageKey | probes | transportAccepted | authAccepted | success |
|---|---:|---:|---:|---:|
| `billCenter-invoiceVerification` | 6 | 4 | 4 | 1 |
| `billCenter-sign` | 4 | 4 | 4 | 1 |
| `downloadCenter` | 3 | 3 | 3 | 1 |
| `platform-invoiceApplication` | 8 | 7 | 7 | 0 |
| `platform-scanCode` | 8 | 8 | 8 | 0 |
| `platform-scanRecords` | 8 | 8 | 8 | 0 |
| `bussiness-configurationManagement` | 8 | 6 | 6 | 0 |
| `bussiness-credit` | 1 | 1 | 1 | 0 |

## 成功/可用接口

| pageKey | 方法 | 接口 | 状态 | msg |
|---|---|---|---|---|
| `billCenter-invoiceVerification` | GET | `/prod-api/getInvoiceCheckDetail` | auth-accepted | 404 NOT_FOUND |
| `billCenter-invoiceVerification` | GET | `/prod-api/abnormalInvoice/setting` | auth-accepted | 404 NOT_FOUND |
| `billCenter-invoiceVerification` | GET | `/prod-api/income/invoiceCheck/getPeriod` | auth-accepted | 参数异常! |
| `billCenter-invoiceVerification` | GET | `/prod-api/income/invoiceCheck/queryInfoList?pageNum=1&pageSize=1` | success | 查询成功 |
| `billCenter-sign` | GET | `/prod-api/invoicecenter/integrated/v1/invoicePool/query?pageNum=1&pageSize=1` | auth-accepted | 参数异常! |
| `billCenter-sign` | GET | `/prod-api/inputtax/h51InputTax/statistics` | auth-accepted | Request method 'GET' not supported |
| `billCenter-sign` | GET | `/prod-api/bussiness/bizGoodsInfo/h5/selectBizGoodsInfoOuterList?pageNum=1&pageSize=1` | auth-accepted | 内部服务器错误 |
| `billCenter-sign` | GET | `/prod-api/system/backstage/getInformation` | success | success |
| `downloadCenter` | GET | `/prod-api/income/statistics/getPeriodStatus` | auth-accepted | 参数异常! |
| `downloadCenter` | GET | `/prod-api/inputtax/h51InputTax/detailsQuery?pageNum=1&pageSize=1` | auth-accepted | Request method 'GET' not supported |
| `downloadCenter` | POST | `/prod-api/invoicecenter/invoiceGoods/detailList?pageNum=1&pageSize=1` | success |  |
| `platform-invoiceApplication` | GET | `/prod-api/income/statistics/applyStatistics` | auth-accepted | 申请标志不能为空 |
| `platform-invoiceApplication` | GET | `/prod-api/income/statistics/getStatisticsResult` | auth-accepted | 税款所属期不能为空 |
| `platform-invoiceApplication` | GET | `/prod-api/invoicecheck/check/list/deductCheck?pageNum=1&pageSize=1` | auth-accepted | 参数异常! |
| `platform-invoiceApplication` | GET | `/prod-api/invoicecheck/check/list/deductCheckAll?pageNum=1&pageSize=1` | auth-accepted | 参数异常! |
| `platform-invoiceApplication` | GET | `/prod-api/invoicecheck/check/list/nodeductCheck?pageNum=1&pageSize=1` | auth-accepted | 参数异常! |
| `platform-invoiceApplication` | GET | `/prod-api/statisticsGoodsRateDetail` | auth-accepted | 404 NOT_FOUND |
| `platform-invoiceApplication` | GET | `/prod-api/statisticsInvoiceInfoQuery?pageNum=1&pageSize=1` | auth-accepted | 404 NOT_FOUND |
| `platform-scanCode` | GET | `/prod-api/bussiness/scanInvoice/getScanInvoiceInfo` | auth-accepted | 内部服务器错误 |
| `platform-scanCode` | GET | `/prod-api/bussiness/scanInvoice/getClientGuess` | auth-accepted | 内部服务器错误 |
| `platform-scanCode` | GET | `/prod-api/bussiness/bizGoodsInfo/h5/selectBizGoodsInfoOuterList?pageNum=1&pageSize=1` | auth-accepted | 内部服务器错误 |
| `platform-scanCode` | GET | `/prod-api/bussiness/scanInvoice/getClientDateByCode` | auth-accepted | 内部服务器错误 |
| `platform-scanCode` | GET | `/prod-api/bussiness/scanInvoice/getOuterPdfBase64` | auth-accepted | 内部服务器错误 |
| `platform-scanCode` | GET | `/prod-api/bussiness/scanInvoice/getScanInvoiceBillInfo` | auth-accepted | 内部服务器错误 |
| `platform-scanCode` | GET | `/prod-api/system/aes/config/encrypt` | auth-accepted | 内部服务器错误 |
| `platform-scanCode` | GET | `/prod-api/system/dict/data/getInvoiceType` | auth-accepted | 内部服务器错误 |
| `platform-scanRecords` | GET | `/prod-api/bussiness/scanInvoice/getClientGuess` | auth-accepted | 内部服务器错误 |
| `platform-scanRecords` | GET | `/prod-api/bussiness/scanInvoice/getClientDateByCode` | auth-accepted | 内部服务器错误 |
| `platform-scanRecords` | GET | `/prod-api/bussiness/bizGoodsInfo/h5/selectBizGoodsInfoOuterList?pageNum=1&pageSize=1` | auth-accepted | 内部服务器错误 |
| `platform-scanRecords` | GET | `/prod-api/bussiness/scanInvoice/getOuterPdfBase64` | auth-accepted | 内部服务器错误 |
| `platform-scanRecords` | GET | `/prod-api/bussiness/scanInvoice/getScanInvoiceBillInfo` | auth-accepted | 内部服务器错误 |
| `platform-scanRecords` | GET | `/prod-api/bussiness/scanInvoice/getScanInvoiceInfo` | auth-accepted | 内部服务器错误 |
| `platform-scanRecords` | GET | `/prod-api/system/aes/config/encrypt` | auth-accepted | 内部服务器错误 |
| `platform-scanRecords` | GET | `/prod-api/system/dict/data/getInvoiceType` | auth-accepted | 内部服务器错误 |
| `bussiness-configurationManagement` | GET | `/prod-api/system/config/list?pageNum=1&pageSize=1` | auth-accepted | 没有权限，请联系管理员授权 |
| `bussiness-configurationManagement` | GET | `/prod-api/system/config/configKey/` | auth-accepted | 参数异常! |
| `bussiness-configurationManagement` | GET | `/prod-api/bussiness/scanInvoice/getOuterPdfBase64` | auth-accepted | 内部服务器错误 |
| `bussiness-configurationManagement` | GET | `/prod-api/bussiness/scanInvoice/getScanInvoiceBillInfo` | auth-accepted | 内部服务器错误 |
| `bussiness-configurationManagement` | GET | `/prod-api/bussiness/scanInvoice/getScanInvoiceInfo` | auth-accepted | 内部服务器错误 |
| `bussiness-configurationManagement` | GET | `/prod-api/income/invoiceCheck/getPeriod` | auth-accepted | 参数异常! |
| `bussiness-credit` | GET | `/prod-api/bussiness/bizBillInfo/h5getFpdyXml` | auth-accepted | 参数异常! |
