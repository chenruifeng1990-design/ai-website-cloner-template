# 数税云接口与 ERP 现有接口清单

本文件分两层：

1. 数税云真实页面/开放 API 能力。
2. ERP 当前已封装接口。

## 数税云手工开票页 platform API 路径

来源：ERP 后端 `tax-invoice-issue-platform.logic.ts` 已整理的 Created 页路径。

| 能力 | 数税云 platform 路径候选 | ERP 接口 | 风险 |
|---|---|---|---|
| 流水号 | `/bussiness/bizBillInfo/getSerialNumber`, `/bussiness/bizInvoiceInfo/getSerialNumber` | `/api/tax-invoices/issue-bootstrap` | L0 |
| 销方信息 | `/bussiness/bizInvoiceInfo/getSellerInfo`, `/bussiness/bizInvoiceInfo/getDefaultSellerInfo` | `/api/tax-invoices/issue-bootstrap` | L0 |
| 授信额度 | `/bussiness/credit/creditInfo/2`, `/bussiness/credit/creditInfo`, `/bussiness/bizInvoiceInfo/getCreditInfo/2`, `/bussiness/bizInvoiceInfo/getCreditInfo` | `/api/tax-invoices/issue-credit` | L0 |
| 网上办税信息 | `/system/bizOnlineTaxInformation/getOnlineTax` | `/api/tax-invoices/issue-bootstrap` | L0 |
| 备注/显示配置 | `/bussiness/bizInvoiceInfo/getRemarkConfig`, `/bussiness/bizInvoiceInfo/getListMap`, `/bussiness/bizInvoiceInfo/getInvoiceRemarkConfig` | `/api/tax-invoices/issue-bootstrap` | L0 |
| 草稿箱 | `/bussiness/bizBillInfo/findDraftList`, `/bussiness/bizInvoiceInfo/getDraftInvoiceList`, `/bussiness/bizInvoiceInfo/getStagingOrderList` | `/api/tax-invoices/issue-drafts` | L0 |
| 待开发票 | `/bussiness/bizInvoiceInfo/getWaitInvoiceList`, `/bussiness/bizInvoiceInfo/getQuickInvoiceList` | `/api/tax-invoices/issue-wait-invoices` | L0 |
| 暂存草稿 | `/bussiness/bizBillInfo/stagingOrder`, `/bussiness/bizInvoiceInfo/stagingOrder`, `/bussiness/bizInvoiceInfo/saveStagingOrder` | `/api/tax-invoices/issue-platform-staging` | L2 |
| 清单导入 | `/bussiness/bizInvoiceInfo/billListImport2` | `/api/tax-invoices/issue-bill-import` | L1 |
| 设备信息 | `/bussiness/bizInvoiceInfo/getEquipment` | 待确认 | L0 |
| 场景模板列表 | `/bussiness/bizInvoiceInfo/getSceneTemplateList`, `/bussiness/bizInvoiceInfo/querySceneTemplateList`, `/bussiness/bizInvoiceInfo/getRemarkTemplateList` | `/api/tax-invoices/issue-scene-templates` | L0 |
| 场景模板详情 | `/bussiness/bizInvoiceInfo/getSceneTemplateDetail`, `/bussiness/bizInvoiceInfo/querySceneTemplateDetail` | `/api/tax-invoices/issue-scene-templates/:templateId` | L0 |
| 购方地址列表 | `/bussiness/bizInvoiceInfo/getClientAddressList`, `/bussiness/bizInvoiceInfo/queryClientAddressList`, `/bussiness/bizInvoiceInfo/getBuyerAddressList` | `/api/tax-invoices/issue-buyer-addresses` | L0 |

## 数税云开放 API interfaceCode

来源：ERP 后端 `tax-invoice-values.ts`。

| 能力 | interfaceCode | 风险 | ERP 当前状态 |
|---|---|---|---|
| 真实开票 | `ynfp.invoice.issue.sync` | L4 | 有门禁，需飞书审批后触发 |
| 开票结果查询 | `ynfp.invoice.detail.query` | L0 | 已封装 |
| 发票明细列表 | `ynfp.invoice.detail.list.query` | L0 | 权限曾返回 7007，需复测 |
| 发票池列表 | `ynfp.invoice.pool.list.query` | L0 | 权限曾返回 7007，需复测 |
| 发票池详情 | `ynfp.invoice.pool.detail.query` | L0 | 待实测 |
| 版式文件下载 | `ynfp.invoice.pool.file.download` | L2 | 已封装下载入口 |
| 发票获取/取票 | `ynfp.invoice.obtain` | L2 | 待实测 |
| 按订单查票 | `ynfp.invoice.list.by.order` | L0 | 待映射订单开票 |
| 电子凭证列表 | `ynfp.invoice.pool.eInvoice.list` | L0 | 权限曾返回 7007 |
| 文件获取 | `ynfp.invoice.pool.file.obtain` | L2 | 待实测 |
| 税局入账状态查询 | `ynfp.invoice.pool.rz.cx` | L0 | 权限曾返回 7007 |
| 税局入账状态提交 | `ynfp.invoice.pool.rz.tj` | L3 | 高风险，暂不开放 |
| 入账状态调整 | `ynfp.invoice.pool.rz.tz` | L3 | 高风险，暂不开放 |
| 商品税收编码 | `ynfp.invoice.batch.taxCode` | L0 | 权限曾返回 7007 |
| 发票查验 | `ynfp.invoice.check` | L2 | 已有 provider check |
| 签收 | `ynfp.invoice.sign` | L2/L3 | 待确认真实后果 |
| 报销 | `ynfp.invoice.reimb` | L2/L3 | 暂不开放真实动作 |
| 用途状态查询 | `ynfp.invoice.usage.status.query` | L0 | 待映射 |
| 红字确认初始化 | `ynfp.invoice.red.confirm.init` | L2 | 待接 |
| 红字确认单开具 | `ynfp.invoice.red.confirm.issue` | L3 | 高风险 |
| 红字确认单查询 | `ynfp.invoice.red.confirm.query` | L0 | 待接 |
| 红字确认单详情 | `ynfp.invoice.red.confirmDetail.query` | L0 | 待接 |
| 红字确认单操作 | `ynfp.invoice.red.confirm.operate` | L3 | 高风险 |
| 红字确认单下载 | `ynfp.invoice.red.confirm.down` | L2 | 待接 |
| 关联负数发票 | `ynfp.invoice.associate.negative` | L3 | 高风险 |

## ERP 当前已封装接口

### 开票草稿

| ERP 接口 | 方法 | 说明 | 风险 |
|---|---|---|---|
| `/api/invoice-registration/tax-drafts/from-contract` | POST | 合同直达数税云真实开票草稿 | L1 |
| `/api/invoice-registration/tax-drafts/:id` | GET/POST/PATCH | 草稿读取/保存 | L1 |
| `/api/invoice-registration/tax-drafts/:id/recognize` | POST | 粘贴/文本识别预填 | L1 |
| `/api/invoice-registration/tax-drafts/:id/preview` | POST | 预览并锁 preview hash | L2 |
| `/api/invoice-registration/tax-drafts/:id/submit-approval` | POST | 提交飞书审批 | L2 |
| `/api/invoice-registration/tax-drafts/:id/issue-after-approval` | POST | 审批后真实开票 | L4 |
| `/api/invoice-registration/tax-drafts/:id/submit` | POST | 手动真实提交 | L4 |
| `/api/invoice-registration/tax-drafts/:id/query` | POST | 查询开票结果 | L0 |
| `/api/invoice-registration/tax-drafts/:id/void` | POST | 草稿作废 | L2 |

### 票面辅助

| ERP 接口 | 方法 | 说明 | 风险 |
|---|---|---|---|
| `/api/tax-invoices/issue-bootstrap` | GET | 销方、额度、显示配置、流水号聚合 | L0 |
| `/api/tax-invoices/issue-credit` | GET | 授信额度 | L0 |
| `/api/tax-invoices/issue-drafts` | GET | 草稿箱 | L0 |
| `/api/tax-invoices/issue-wait-invoices` | GET | 待开发票 | L0 |
| `/api/tax-invoices/issue-tax-codes` | GET | 税收分类编码 | L0 |
| `/api/tax-invoices/issue-scene-templates` | GET | 场景模板 | L0 |
| `/api/tax-invoices/issue-buyer-addresses` | GET | 购方地址/客户库 | L0 |
| `/api/tax-invoices/issue-platform-staging` | POST | 数税云平台暂存 | L2 |
| `/api/tax-invoices/issue-bill-import` | POST | 清单导入 | L1 |

### 发票池/票据中心

| ERP 接口 | 方法 | 说明 | 风险 |
|---|---|---|---|
| `/api/tax-invoices/records/list` | POST | 发票池列表 | L0 |
| `/api/tax-invoices/records/dashboard` | POST | 分析看板聚合 | L0 |
| `/api/tax-invoices/records/provider-detail` | POST | 数税云详情 | L0 |
| `/api/tax-invoices/records/provider-check` | POST | 发票查验 | L2 |
| `/api/tax-invoices/records/layout-file-download` | POST | 版式文件下载 | L2 |
| `/api/tax-invoices/records/status-action` | POST | 签收/勾选/入账等本地或平台动作 | L2/L3 |
| `/api/tax-invoices/sync-sales` | POST | 销项同步 | L2 |
| `/api/tax-invoices/sync-purchases` | POST | 进项同步 | L2 |
| `/api/tax-invoices/sync-cursors` | POST | 同步游标 | L0 |
| `/api/tax-invoices/records/certification-batches` | POST | 勾选批次 | L1/L2 |

### 对账/金蝶/业务回挂

| ERP 接口 | 方法 | 说明 | 风险 |
|---|---|---|---|
| `/api/tax-invoices/records/reconcile` | POST | 税票/金蝶对账 | L0 |
| `/api/tax-invoices/records/business-reconcile` | POST | 税票/业务源单对账 | L0 |
| `/api/tax-invoices/records/exception-queue` | POST | 异常队列 | L0 |
| `/api/tax-invoices/records/exception-queue/resolve` | POST | 异常处理 | L1 |
| `/api/tax-invoices/records/match-candidates` | POST | 源单候选 | L0 |
| `/api/tax-invoices/records/link/confirm` | POST | 确认业务回挂 | L1 |
| `/api/tax-invoices/records/link/revoke` | POST | 取消业务回挂 | L1 |
| `/api/tax-invoices/records/link/list` | POST | 回挂列表 | L0 |
| `/api/invoice-registration/kingdee-invoices` | GET | 金蝶发票入账列表 | L0 |

## 待补采集

真实数税云页面 Network 尚未全部逐页抓取。当前机器验收口径：

```text
页面/spec/菜单采集：33/33
真实 HAR 接口证据：13/32 非手工页面
剩余真实 HAR 缺口：19 个页面
缺口页登录态巡检：19/19
缺口页已认证只读接口探测：覆盖 19/19，18 页传输可达，17 页认证被接受，11 页成功
```

已经补充静态 JS 源码候选接口证据：

```text
docs/tax-cloud/TAX_CLOUD_STATIC_JS_INTERFACE_EVIDENCE.md
docs/tax-cloud/apis/static-js-endpoints.json
```

这批源码候选接口只能用于指导补采和 ERP adapter 设计，不能替代真实 HAR。

已经补充当前 Chrome Session Storage 的已认证只读接口探测：

```text
docs/tax-cloud/TAX_CLOUD_AUTHENTICATED_READ_API_PROBE.md
docs/tax-cloud/apis/authenticated-read-probe.json
```

该探测只调用 L0/L1 查询接口，token 只在内存中使用，不落盘；它证明当前认证态和一批查询接口可通，并把未成功接口拆成“权限不足/参数缺失/设备依赖/路径待确认/文件流待确认”等诊断，但仍不替代真实 HAR。

当前已补充非手工 P0 页面的动作级矩阵：

```text
docs/tax-cloud/TAX_CLOUD_P0_INTERFACE_ACTION_AUDIT.md
```

当前也已补充 P1/P2/P3 的动作级矩阵：

```text
docs/tax-cloud/TAX_CLOUD_P1_P2_P3_INTERFACE_ACTION_AUDIT.md
```

下一轮必须在 Chrome 登录态下进入每个菜单页，按这两个矩阵逐动作记录实际 XHR/fetch 调用，并和上述 ERP 封装逐项比对。L3/L4 动作即使抓到接口，也不得直接接入 ERP 主流程。

## 剩余 19 个页面的源码候选接口补强

来源：`docs/tax-cloud/apis/static-js-endpoints.json` 与 `docs/tax-cloud/TAX_CLOUD_STATIC_JS_INTERFACE_EVIDENCE.md`。

| 页面 | 源码候选接口重点 | 风险口径 |
|---|---|---|
| 扫码开票 | `/bussiness/scanInvoice/getScanInvoiceInfo`、`/bussiness/scanInvoice/getScanInvoiceBillInfo`、`/bussiness/scanInvoice/getOuterPdfBase64`、`/bussiness/scanInvoice/H5CommitIssue` | `H5CommitIssue` 按 L4 隔离 |
| 扫码记录 | `/bussiness/scanInvoice/getClientDateByCode`、`/bussiness/scanInvoice/getClientGuess`、`/bussiness/scanInvoice/invoiceDelivery` | 详情/交付分离 |
| 订单开票 | `/bussiness/billIssue/`、`/bussiness/bizBillInfo/findDraftList`、`/bussiness/bizBillInfo/stagingOrder`、`/bussiness/bizBillInfo/issue` | `issue` 不接 ERP 直开 |
| 开票申请单 | `/deliveryWithGoods/list`、`/deliveryWithGoods/detail`、`/deliveryWithGoods/search` | visual-only，不恢复旧申请主线 |
| 红字确认单 | `/bussiness/redConfirmInfo/list`、`/bussiness/redConfirmInfo/queryBlue`、`/bussiness/redConfirmInfo/commit`、`/bussiness/redConfirmInfo/batchConfirm`、`/bussiness/redConfirmInfo/sync` | 红字动作 L3/L4 隔离 |
| 签收 | `/invoicePool/signInvoices`、`/invoiceFolder/addFromPool`、`/inputtax/h51InputTax/confirmSign` | 签收动作单独确认 |
| 查验 | `/invoicecheck/check/list/thirdPlatform/dataList`、`/invoicecheck/check/list/thirdPlatform/getData`、`/invoicecheck/validate/code/value/`、`/reCheckInvoice` | 查询可采，验证码/重查隔离 |
| 取票设置 | `/invoicecenter/sjruzhang/getSjruzhangSetting`、`/invoicecenter/sjruzhang/saveSjruzhangSetting`、`/invoicecenter/sjruzhang/restartTask` | 保存/重启任务需审计 |
| 任务管理 | `/system/taskRecord/list`、`/system/taskRecord/restart/`、`/invoicecenter/sjruzhang/getSjruzhangInfo` | 列表优先，重试隔离 |
| 商品信息 | `/bussiness/bizGoodsInfo/selectBizGoodsInfoOuterList`、`/bussiness/bizGoodsInfo/getGoodsGuess`、`/system/kpm/getSpxxByKpmGoodsId`、`/system/kpm/checkKpmmcRepeat` | 商品/税编映射 |
| 客户管理 | `/bussiness/bizCustomer/selectBizCustomerInfoOutNotList`、`/bussiness/bizCustomer/getClientGuessIssue`、`/bussiness/bizCustomer/getClientDateByCodeIssue` | 客户资料候选，不自动覆盖 ERP/金蝶 |
| 开票额度配置 | `/bussiness/creditLine/query`、`/prod-api/bussiness/credit/creditInfo/1` | 额度展示 L0，配置动作待审 |
| 配置管理 | `/system/config/list`、`/system/config/configKey/`、`/system/config/clearCache`、`/bussiness/configurationManagement` | 清缓存/保存不自动触发 |
| 组织管理 | `/system/dept/list`、`/system/dept/treeselect`、`/system/dept/getOneInfo`、`/system/dept/loginDeptList` | 只做参考 |
| 部门管理 | `/system/departmentInfo/list`、`/system/departmentInfo/listByDeptIds` | 只做参考 |
| 角色管理 | `/system/role`、`/system/dept/roleDeptTreeselect/` | ERP 权限为主 |
| 网上办税信息 | `/system/bizOnlineTaxInformation/getOnlineTax`、`/system/bizOnlineTaxInformation/selectBizOnlineTaxInfoList`、`/system/bizOnlineTaxInformation/getUserLoginInfoByDeptIdAndUserId` | 登录/认证不自动触发 |
| 用户管理 | `/system/user`、`/system/user/profile/avatar`、`/system/user/noviceGuide` | 只做账号映射和审计参考 |
| 下载中心 | 静态工具包链接：`CloudTaxBaseService.exe`、`AisinoPrinterSetup.exe`、`accessClient.exe`、`ERPImportTool.zip`、`shushuiyunkehuduan.zip`；业务文件接口候选：`/download/template`、`/download/template/taskId`、`/download/XML/taskId`、`/invoicecenter/invoiceTemplate/v1/download/template`、`/invoicecenter/invoiceTemplate/v1/download/XML` | 工具安装包与业务文件下载必须拆分；当前页面不是下载任务列表 |
