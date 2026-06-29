# 页面采集：勾选审核

## 基本信息

- 一级菜单：进项管理
- 二级菜单：勾选审核
- URL：`https://fp.enuoyun.com/income/confirmCheck`
- 页面 key：`income-confirmCheck`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P1

## 已采集文件

- raw：`docs/tax-cloud/captures/income-confirmCheck.raw.json`
- visible DOM：`docs/tax-cloud/captures/income-confirmCheck.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/income-confirmCheck-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-income-confirmCheck-fullpage.png`

## 页面结构

- 审核批次列表：批次号、所属期、发票份数、税额、状态、提交人。
- 操作区：查询、重置、审核、撤销、详情。
- 明细态：批次内发票清单。

## ERP 映射

- ERP 入口：进项勾选批次审核。
- 数据来源：ERP 勾选批次、数税云用途状态、金蝶入账状态。
- 业务目标：真实勾选前做内部审核和风险复核。

## 接口候选

- 批次查询：待真实 Network 补抓，L0。
- 审核/确认：待真实 Network 补抓，L3。
- ERP 批次：`/api/tax-invoices/records/certification-batches`，L1/L2。

## 验收标准

- 批次和发票明细可互查。
- 审核通过不等于真实税务提交。
- 真实提交必须有门禁。
