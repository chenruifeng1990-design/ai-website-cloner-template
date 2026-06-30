# 数税云已认证只读接口探测报告

生成时间：2026-06-30T01:01:53.497Z

## 口径

- 来源：当前 Chrome Session Storage 复制件，只在内存中使用有效 token，报告不落 token。
- 范围：仅 L0/L1 查询、列表、配置读取、资料读取接口。
- 禁止项：未触发保存、删除、签收确认、红字填开、批量开票、真实开票、勾选认证、下载文件。
- 本报告证明“真实已认证 API 可访问性”，但仍不替代 HAR。HAR 严格验收仍以 `tax-cloud:audit:strict` 为准。

## 汇总

| 项目 | 数量 |
|---|---:|
| 探测接口 | 21 |
| 传输可达接口 | 20 |
| 认证被接受接口 | 19 |
| 成功接口 | 11 |
| 覆盖页面 | 19 |
| 传输可达页面 | 18 |
| 认证被接受页面 | 17 |
| 成功页面 | 11 |

## 页面汇总

| pageKey | probes | transportAccepted | authAccepted | success |
|---|---:|---:|---:|---:|
| `system-user` | 1 | 1 | 1 | 1 |
| `system-role` | 1 | 1 | 1 | 1 |
| `system-dept` | 1 | 1 | 1 | 1 |
| `system-departmentInfo` | 1 | 1 | 1 | 1 |
| `system-onlineTaxationInfo` | 2 | 2 | 2 | 1 |
| `bussiness-configurationManagement` | 1 | 1 | 1 | 0 |
| `bussiness-credit` | 2 | 2 | 2 | 0 |
| `bussiness-info` | 1 | 1 | 1 | 1 |
| `bussiness-customer` | 1 | 1 | 1 | 1 |
| `billCenter-taskManagement` | 1 | 1 | 1 | 1 |
| `billCenter-invoiceVerification` | 1 | 0 | 0 | 0 |
| `billCenter-accessSetting` | 1 | 1 | 1 | 1 |
| `billCenter-sign` | 1 | 1 | 1 | 0 |
| `platform-redMark` | 1 | 1 | 1 | 1 |
| `platform-invoiceApplication` | 1 | 1 | 1 | 0 |
| `platform-billIssue` | 1 | 1 | 1 | 1 |
| `platform-scanRecords` | 1 | 1 | 1 | 0 |
| `platform-scanCode` | 1 | 1 | 1 | 0 |
| `downloadCenter` | 1 | 1 | 0 | 0 |

## 接口明细

| pageKey | 方法 | 接口 | 风险 | HTTP | code | msg | 字段 |
|---|---|---|---|---:|---:|---|---|
| `system-user` | GET | `/prod-api/system/user/list?pageNum=1&pageSize=1` | L0 query | 200 | 200 | 查询成功 | total, rows, code, msg |
| `system-role` | GET | `/prod-api/system/role/list?pageNum=1&pageSize=1` | L0 query | 200 | 200 | 查询成功 | total, rows, code, msg |
| `system-dept` | GET | `/prod-api/system/dept/list` | L0 query | 200 | 200 | 操作成功 | 0 |
| `system-departmentInfo` | GET | `/prod-api/system/departmentInfo/list?pageNum=1&pageSize=1` | L0 query | 200 | 200 | 操作成功 | msg, code, data |
| `system-onlineTaxationInfo` | POST | `/prod-api/system/bizOnlineTaxInformation/selectBizOnlineTaxInfoList` | L0 query | 200 | 200 | 操作成功 | total, list, pageNum, pageSize, size, startRow, endRow, pages, prePage, nextPage, isFirstPage, isLastPage, hasPreviousPage, hasNextPage, navigatePages, navigatepageNums, navigateFirstPage, navigateLastPage |
| `system-onlineTaxationInfo` | GET | `/prod-api/system/bizOnlineTaxInformation/getOnlineTax` | L0 query | 200 | 500 | 参数异常! | msg, code |
| `bussiness-configurationManagement` | GET | `/prod-api/system/config/list?pageNum=1&pageSize=1` | L0 query | 200 | 500 | 没有权限，请联系管理员授权 | msg, code |
| `bussiness-credit` | GET | `/prod-api/bussiness/creditLine/query?pageNum=1&pageSize=1` | L0 query | 200 | 500 | 未检测到开票设备，请联系管理员 | msg, code |
| `bussiness-credit` | GET | `/prod-api/bussiness/credit/creditInfo/1?_t=1782781312531` | L0 query | 200 | 500 | 参数异常! | msg, code |
| `bussiness-info` | GET | `/prod-api/bussiness/bizGoodsInfo/selectBizGoodsInfoOuterList?pageNum=1&pageSize=1` | L0 query | 200 | 200 | 查询成功 | total, rows, code, msg |
| `bussiness-customer` | GET | `/prod-api/bussiness/bizCustomer/selectBizCustomerInfoOutNotList?pageNum=1&pageSize=1` | L0 query | 200 | 200 | 查询成功 | total, rows, code, msg |
| `billCenter-taskManagement` | GET | `/prod-api/system/taskRecord/list?pageNum=1&pageSize=1` | L0 query | 200 | 200 | 查询成功 | total, rows, code, msg |
| `billCenter-invoiceVerification` | POST | `/prod-api/invoicecheck/check/list/thirdPlatform/dataList` | L0 query | 404 |  |  | timestamp, status, error, path |
| `billCenter-accessSetting` | POST | `/prod-api/invoicecenter/sjruzhang/getSjruzhangSetting` | L0 query | 200 | 0000 |  | code, message, success |
| `billCenter-sign` | POST | `/prod-api/invoicecenter/integrated/v1/invoicePool/query` | L0 query; sign action not triggered | 200 | 500 | 参数异常! | msg, code |
| `platform-redMark` | GET | `/prod-api/bussiness/redConfirmInfo/list?pageNum=1&pageSize=1` | L0 query | 200 | 200 | 查询成功 | total, rows, code, msg |
| `platform-invoiceApplication` | GET | `/prod-api/deliveryWithGoods/list?pageNum=1&pageSize=1` | L0 query | 200 | 500 | 404 NOT_FOUND | code, msg |
| `platform-billIssue` | GET | `/prod-api/bussiness/bizBillInfo/findDraftList?pageNum=1&pageSize=1` | L0 query | 200 | 200 | 操作成功 | msg, code, data |
| `platform-scanRecords` | GET | `/prod-api/bussiness/scanInvoice/getClientGuess` | L0 query | 200 | 500 | 内部服务器错误 | code, msg |
| `platform-scanCode` | GET | `/prod-api/system/dict/data/getInvoiceType` | L0 dictionary query | 200 | 500 | 内部服务器错误 | code, msg |
| `downloadCenter` | POST | `/prod-api/invoicecenter/invoiceTemplate/v1/download/template/taskId` | L0/L2 metadata query | 200 |  |  |  |

## 失败/未成功诊断

| pageKey | 接口 | 状态 | 原因 | 下一步 |
|---|---|---|---|---|
| `system-onlineTaxationInfo` | `/prod-api/system/bizOnlineTaxInformation/getOnlineTax` | auth-accepted-parameter-required | token 被接受，但只读探针缺页面运行时参数。 | 用真实页面 HAR 反查缺失参数；不得猜测触发 L3/L4 税务动作。 |
| `bussiness-configurationManagement` | `/prod-api/system/config/list?pageNum=1&pageSize=1` | auth-accepted-no-permission | token 被服务端接受，但当前企业/用户权限不足。 | 用页面真实 Network HAR 确认该菜单实际接口；不要用脚本尝试写入或提权动作。 |
| `bussiness-credit` | `/prod-api/bussiness/creditLine/query?pageNum=1&pageSize=1` | auth-accepted-device-required | token 被接受，但接口依赖开票设备/税控上下文。 | 在已登录数税云页面操作并导出 HAR，记录设备上下文参数来源。 |
| `bussiness-credit` | `/prod-api/bussiness/credit/creditInfo/1?_t=1782781312531` | auth-accepted-parameter-required | token 被接受，但只读探针缺页面运行时参数。 | 用真实页面 HAR 反查缺失参数；不得猜测触发 L3/L4 税务动作。 |
| `billCenter-invoiceVerification` | `/prod-api/invoicecheck/check/list/thirdPlatform/dataList` | route-not-confirmed | 候选路径未被当前网关识别，说明静态代码候选不能直接替代真实页面 Network。 | 从 DevTools HAR 获取页面实际请求路径。 |
| `billCenter-sign` | `/prod-api/invoicecenter/integrated/v1/invoicePool/query` | auth-accepted-parameter-required | token 被接受，但只读探针缺页面运行时参数。 | 用真实页面 HAR 反查缺失参数；不得猜测触发 L3/L4 税务动作。 |
| `platform-invoiceApplication` | `/prod-api/deliveryWithGoods/list?pageNum=1&pageSize=1` | auth-accepted-route-or-runtime-missing | token 被接受，但候选接口路径或页面运行时上下文不完整。 | 按页面实际 Network 校正接口路径、method 和 payload。 |
| `platform-scanRecords` | `/prod-api/bussiness/scanInvoice/getClientGuess` | auth-accepted-route-or-runtime-missing | token 被接受，但候选接口路径或页面运行时上下文不完整。 | 按页面实际 Network 校正接口路径、method 和 payload。 |
| `platform-scanCode` | `/prod-api/system/dict/data/getInvoiceType` | auth-accepted-route-or-runtime-missing | token 被接受，但候选接口路径或页面运行时上下文不完整。 | 按页面实际 Network 校正接口路径、method 和 payload。 |
| `downloadCenter` | `/prod-api/invoicecenter/invoiceTemplate/v1/download/template/taskId` | transport-accepted-non-json-or-empty | 服务端返回 HTTP 200，但没有可识别 JSON 成功体，不能算业务成功。 | 需要页面动作 HAR 确认该接口是否为下载/文件流/任务型响应。 |

## 下一步

1. 对成功或认证被接受的页面，继续用 DevTools HAR 导出真实 Network 证据。
2. 对返回 404/500 的接口，根据页面实际 Network 校正路径或参数。
3. 继续保持 L3/L4 动作隔离，不用本脚本触发真实税务动作。
