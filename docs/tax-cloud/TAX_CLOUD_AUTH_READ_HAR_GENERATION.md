# 数税云已认证只读 HAR 生成报告

生成时间：2026-06-30T01:07:40.229Z

## 口径

- 证据类型：`authenticated-read-synthetic-har`
- 来源：当前 Chrome Session Storage 登录态 + 已通过交叉校验的 success 只读接口。
- 安全边界：不请求保存、提交、确认、签收、红字、真实开票、勾选认证、下载/导出、删除、重启任务等动作接口。
- HAR 中不写入 Authorization/Cookie；只保留请求方法、URL、脱敏请求体和真实响应 body。
- 这不是 DevTools 页面点击 HAR；它用于补充真实接口响应证据，页面级交互 HAR 仍可后续补采。

## 汇总

| 项目 | 数量 |
|---|---:|
| probes | 19 |
| written HAR files | 19 |
| written success | 14 |
| written auth accepted | 5 |
| skipped | 0 |

## 明细

| pageKey | 菜单 | HAR | 方法 | 接口 | 状态 | code | msg |
|---|---|---|---|---|---|---|---|
| `billCenter-accessSetting` | 票据中心/取票设置 | `billCenter-accessSetting.sync.har` | POST | `/prod-api/invoicecenter/sjruzhang/getSjruzhangSetting` | written-success | 0000 |  |
| `billCenter-invoiceVerification` | 票据中心/查验 | `billCenter-invoiceVerification.default-list.har` | GET | `/prod-api/income/invoiceCheck/queryInfoList?pageNum=1&pageSize=1` | written-success | 200 | 查询成功 |
| `billCenter-sign` | 票据中心/签收 | `billCenter-sign.action-review.har` | GET | `/prod-api/system/backstage/getInformation` | written-success | 200 | success |
| `billCenter-taskManagement` | 票据中心/任务管理 | `billCenter-taskManagement.default-list.har` | GET | `/prod-api/system/taskRecord/list?pageNum=1&pageSize=1` | written-success | 200 | 查询成功 |
| `downloadCenter` | 顶部入口/下载中心 | `downloadCenter.default-list.har` | POST | `/prod-api/invoicecenter/invoiceGoods/detailList?pageNum=1&pageSize=1` | written-success | 0000 |  |
| `platform-billIssue` | 销项管理/订单开票 | `platform-billIssue.default-list.har` | GET | `/prod-api/bussiness/bizBillInfo/findDraftList?pageNum=1&pageSize=1` | written-success | 200 | 操作成功 |
| `platform-invoiceApplication` | 销项管理/开票申请单 | `platform-invoiceApplication.default-list.har` | GET | `/prod-api/deliveryWithGoods/list?pageNum=1&pageSize=1` | written-auth-accepted | 500 | 404 NOT_FOUND |
| `platform-redMark` | 销项管理/红字确认单 | `platform-redMark.default-list.har` | GET | `/prod-api/bussiness/redConfirmInfo/list?pageNum=1&pageSize=1` | written-success | 200 | 查询成功 |
| `platform-scanCode` | 销项管理/扫码开票 | `platform-scanCode.default-list.har` | GET | `/prod-api/system/dict/data/getInvoiceType` | written-auth-accepted | 500 | 内部服务器错误 |
| `platform-scanRecords` | 销项管理/扫码记录 | `platform-scanRecords.default-list.har` | GET | `/prod-api/bussiness/scanInvoice/getClientGuess` | written-auth-accepted | 500 | 内部服务器错误 |
| `bussiness-configurationManagement` | 基础信息/配置管理 | `bussiness-configurationManagement.default-list.har` | GET | `/prod-api/system/config/list?pageNum=1&pageSize=1` | written-auth-accepted | 500 | 没有权限，请联系管理员授权 |
| `bussiness-credit` | 基础信息/开票额度配置 | `bussiness-credit.default-list.har` | GET | `/prod-api/bussiness/creditLine/query?pageNum=1&pageSize=1` | written-auth-accepted | 500 | 未检测到开票设备，请联系管理员 |
| `bussiness-customer` | 基础信息/客户管理 | `bussiness-customer.default-list.har` | GET | `/prod-api/bussiness/bizCustomer/selectBizCustomerInfoOutNotList?pageNum=1&pageSize=1` | written-success | 200 | 查询成功 |
| `bussiness-info` | 基础信息/商品信息 | `bussiness-info.default-list.har` | GET | `/prod-api/bussiness/bizGoodsInfo/selectBizGoodsInfoOuterList?pageNum=1&pageSize=1` | written-success | 200 | 查询成功 |
| `system-onlineTaxationInfo` | 系统设置/网上办税信息 | `system-onlineTaxationInfo.default-list.har` | POST | `/prod-api/system/bizOnlineTaxInformation/selectBizOnlineTaxInfoList` | written-success | 200 | 操作成功 |
| `system-departmentInfo` | 系统设置/部门管理 | `system-departmentInfo.default-list.har` | GET | `/prod-api/system/departmentInfo/list?pageNum=1&pageSize=1` | written-success | 200 | 操作成功 |
| `system-dept` | 系统设置/组织管理 | `system-dept.default-list.har` | GET | `/prod-api/system/dept/list` | written-success | 200 | 操作成功 |
| `system-role` | 系统设置/角色管理 | `system-role.default-list.har` | GET | `/prod-api/system/role/list?pageNum=1&pageSize=1` | written-success | 200 | 查询成功 |
| `system-user` | 系统设置/用户管理 | `system-user.default-list.har` | GET | `/prod-api/system/user/list?pageNum=1&pageSize=1` | written-success | 200 | 查询成功 |

## 后续验收

~~~bash
npm run tax-cloud:har:intake
npm run tax-cloud:har:parse-all
npm run tax-cloud:audit:strict
~~~
