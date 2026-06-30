# 数税云静态 JS 接口候选证据

生成时间：2026-06-30

## 口径

- 来源：当前已登录数税云页面引用的前端 JS bundle。
- 产物：`docs/tax-cloud/apis/static-js-endpoints.json`。
- 本文件只作为接口候选证据，用于指导后续 HAR 补采和 ERP adapter 设计。
- 本文件不能替代真实登录态 HAR；`tax-cloud:audit:strict` 仍以真实 Network/HAR 为准。
- 不触发任何提交、签收、红冲、认证、真实开票等高风险动作。

## 本轮结论

```text
静态 bundle 已下载：18/18
唯一候选路径：313
真实 HAR 当前状态：13/32
剩余真实 HAR 缺口：19
```

## 缺口页候选接口摘录

| 页面 | 源码候选接口 | 风险初判 | 后续动作 |
|---|---|---|---|
| 扫码开票 | `/bussiness/scanInvoice/getScanInvoiceInfo`、`/bussiness/scanInvoice/getScanInvoiceBillInfo`、`/bussiness/scanInvoice/getOuterPdfBase64`、`/bussiness/scanInvoice/H5CommitIssue` | L0-L4 | 只补列表/详情 HAR；`H5CommitIssue` 按真实开票风险隔离 |
| 扫码记录 | `/bussiness/scanInvoice/getClientDateByCode`、`/bussiness/scanInvoice/getClientGuess`、`/bussiness/scanInvoice/invoiceDelivery` | L0-L2 | 先补默认查询和详情，交付动作单独确认 |
| 订单开票 | `/bussiness/billIssue/`、`/bussiness/bizBillInfo/findDraftList`、`/bussiness/bizBillInfo/stagingOrder`、`/bussiness/bizBillInfo/issue`、`/bussiness/bizBillInfo/allElectricInvoice/issue` | L0-L4 | ERP 不走数税云订单直开；真实开票接口保持禁用 |
| 开票申请单 | `/deliveryWithGoods/list`、`/deliveryWithGoods/detail`、`/deliveryWithGoods/search` | L0-L1 | 只做视觉/历史参考，不恢复 ERP 旧 `invoice_application` 主线 |
| 红字确认单 | `/bussiness/redConfirmInfo/list`、`/bussiness/redConfirmInfo/queryBlue`、`/bussiness/redConfirmInfo/commit`、`/bussiness/redConfirmInfo/batchConfirm`、`/bussiness/redConfirmInfo/sync` | L0-L4 | 查询可采；红字申请/确认/同步保持高风险隔离 |
| 签收 | `/invoicePool/signInvoices`、`/invoiceFolder/addFromPool`、`/inputtax/h51InputTax/confirmSign` | L2-L3 | 默认列表可采；签收类动作必须单独确认 |
| 查验 | `/invoicecheck/check/list/thirdPlatform/dataList`、`/invoicecheck/check/list/thirdPlatform/getData`、`/invoicecheck/validate/code/value/`、`/reCheckInvoice` | L0-L2 | 可补查验查询；验证码/重查动作单独隔离 |
| 取票设置 | `/invoicecenter/sjruzhang/getSjruzhangSetting`、`/invoicecenter/sjruzhang/saveSjruzhangSetting`、`/invoicecenter/sjruzhang/restartTask` | L0-L2 | 只读配置先采；保存/重启任务单独确认 |
| 任务管理 | `/system/taskRecord/list`、`/system/taskRecord/restart/`、`/invoicecenter/sjruzhang/getSjruzhangInfo` | L0-L2 | 列表可采；重试动作单独确认 |
| 商品信息 | `/bussiness/bizGoodsInfo/selectBizGoodsInfoOuterList`、`/bussiness/bizGoodsInfo/getGoodsGuess`、`/system/kpm/getSpxxByKpmGoodsId`、`/system/kpm/checkKpmmcRepeat` | L0-L1 | 补商品/税编列表 HAR，保存动作后置 |
| 客户管理 | `/bussiness/bizCustomer/selectBizCustomerInfoOutNotList`、`/bussiness/bizCustomer/getClientGuessIssue`、`/bussiness/bizCustomer/getClientDateByCodeIssue` | L0-L1 | 补客户候选列表和详情 HAR |
| 开票额度配置 | `/bussiness/creditLine/query`、`/prod-api/bussiness/credit/creditInfo/1` | L0-L1 | 额度展示接 `creditInfo/1`；配置保存待真实 Network |
| 配置管理 | `/system/config/list`、`/system/config/configKey/`、`/system/config/clearCache`、`/bussiness/configurationManagement` | L0-L2 | 只读配置先采；清缓存/保存不自动触发 |
| 组织管理 | `/system/dept/list`、`/system/dept/treeselect`、`/system/dept/getOneInfo`、`/system/dept/loginDeptList` | L0-L1 | 只做参考，不覆盖 ERP 组织 |
| 部门管理 | `/system/departmentInfo/list`、`/system/departmentInfo/listByDeptIds` | L0-L1 | 只做参考，不覆盖 ERP 部门 |
| 角色管理 | `/system/role`、`/system/dept/roleDeptTreeselect/` | L0-L1 | ERP 权限为主，只做映射参考 |
| 网上办税信息 | `/system/bizOnlineTaxInformation/getOnlineTax`、`/system/bizOnlineTaxInformation/selectBizOnlineTaxInfoList`、`/system/bizOnlineTaxInformation/getUserLoginInfoByDeptIdAndUserId` | L0-L3 | 只读账号状态可采；登录/认证不在 ERP 自动触发 |
| 用户管理 | `/system/user`、`/system/user/profile/avatar`、`/system/user/noviceGuide` | L0-L1 | 只做数税云账号映射和审计参考 |
| 下载中心 | `/download/template`、`/download/template/taskId`、`/download/XML/taskId`、`/invoicecenter/invoiceTemplate/v1/download/template`、`/invoicecenter/invoiceTemplate/v1/download/XML` | L0-L2 | 任务列表可采；文件下载单独记录来源和审计 |

## 对主任务的影响

1. “接口方向”已经不再空白：19 个缺口页都有静态源码候选路径。
2. “真实完成度”仍然保持严格口径：只有真实登录态 Network/HAR 才能让 `tax-cloud:audit:strict` 通过。
3. 高风险动作边界更清楚：`issue`、`H5CommitIssue`、`redConfirmInfo/commit`、`signInvoices`、认证/确认类接口必须单独门禁。

## 下一步

```text
当前登录 Chrome 页
→ 逐个缺口页进入默认页面
→ 只触发查询/列表/只读详情
→ 保存真实 HAR
→ parse-all
→ strict audit 从 13/32 推进到 32/32
```
