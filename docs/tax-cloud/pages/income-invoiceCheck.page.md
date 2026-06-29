# 页面采集：手工勾选

## 基本信息

- 一级菜单：进项管理
- 二级菜单：手工勾选
- URL：`https://fp.enuoyun.com/income/invoiceCheck`
- 页面 key：`income-invoiceCheck`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P0

## 已采集文件

- raw：`docs/tax-cloud/captures/income-invoiceCheck.raw.json`
- visible DOM：`docs/tax-cloud/captures/income-invoiceCheck.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/income-invoiceCheck-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-income-invoiceCheck-fullpage.png`

## 页面结构

- Tab：未勾选、已勾选。
- 筛选区：数电号码、开票日期、发票种类、发票代码、发票号码、销方名称、签收部门。
- 操作区：查询、重置、展开、下载发票、抵扣勾选、不抵扣勾选、导入、导出。
- 提醒区：当前税款所属期和可操作截止日期。
- 列表区：数电号码、发票代码/号码、开票日期、金额、票面税额、有效抵扣税额、销售方名称、销售方税号、票种、发票来源、发票状态、红字锁定标志、业务类型、风险等级、签收部门、报销状态/时间、签收状态/时间等。

## ERP 映射

- ERP 入口：进项收票 / 用途状态。
- 数据来源：数税云进项票据池。
- ERP 责任：关联供应商、采购入库、金蝶应付/凭证、留抵台账。

## 接口候选

- 用途状态查询：`ynfp.invoice.usage.status.query`，L0。
- 发票池列表：`ynfp.invoice.pool.list.query`，L0。
- 下载发票：`ynfp.invoice.pool.file.download`，L2。
- 勾选/不抵扣类动作：需重新确认真实接口，按 L3 预设。
- ERP 状态动作：`/api/tax-invoices/records/status-action`，L2/L3。

## 验收标准

- 未勾选/已勾选状态分离。
- 抵扣和不抵扣动作必须默认门禁，不得静默提交。
- 每张进项票能反查供应商、入库单、金蝶入账。
- 当前所属期和截止日必须显示真实来源或明确暂无。
