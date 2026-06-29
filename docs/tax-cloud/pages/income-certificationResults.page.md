# 页面采集：认证结果

## 基本信息

- 一级菜单：进项管理
- 二级菜单：认证结果
- URL：`https://fp.enuoyun.com/income/certificationResults`
- 页面 key：`income-certificationResults`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P0

## 已采集文件

- raw：`docs/tax-cloud/captures/income-certificationResults.raw.json`
- visible DOM：`docs/tax-cloud/captures/income-certificationResults.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/income-certificationResults-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-income-certificationResults-fullpage.png`

## 页面结构

- Tab：认证清单、认证统计表、增值税发票。
- 筛选区：认证所属期、发票种类、认证时间。
- 操作区：查询、重置、展开、导出、打印。
- 顶部汇总：不含税金额、税额、含税金额。
- 列表区：数电号码、发票代码/号码、开票日期、销方名称、不含税金额、税额、可抵扣税额、认证状态、认证所属期、认证时间、用途、不抵扣勾选原因、发票状态、管理状态、信息来源、签收部门、操作人。

## ERP 映射

- ERP 入口：进项认证结果 / 金蝶入账核对。
- 数据来源：数税云认证结果。
- ERP 责任：关联供应商、采购入库、金蝶凭证、留抵台账。

## 接口候选

- 用途状态查询：`ynfp.invoice.usage.status.query`，L0。
- 发票池列表/详情：`ynfp.invoice.pool.list.query` / `ynfp.invoice.pool.detail.query`，L0。
- ERP 批次：`/api/tax-invoices/records/certification-batches`，L1/L2。

## 验收标准

- 清单、统计表、增值税发票三个视图不能合并丢失。
- 顶部金额必须来自接口汇总或有明确计算口径。
- 每条认证结果可反查进项票、供应商、入库单、金蝶入账。
