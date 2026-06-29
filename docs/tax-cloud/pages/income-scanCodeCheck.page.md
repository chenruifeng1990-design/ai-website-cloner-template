# 页面采集：快捷勾选

## 基本信息

- 一级菜单：进项管理
- 二级菜单：快捷勾选
- URL：`https://fp.enuoyun.com/income/scanCodeCheck`
- 页面 key：`income-scanCodeCheck`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P1，高风险动作

## 已采集文件

- raw：`docs/tax-cloud/captures/income-scanCodeCheck.raw.json`
- visible DOM：`docs/tax-cloud/captures/income-scanCodeCheck.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/income-scanCodeCheck-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-income-scanCodeCheck-fullpage.png`

## 页面结构

- 快捷勾选条件区：所属期、发票种类、日期、金额区间。
- 操作区：查询、重置、快捷勾选、导出。
- 结果区：可勾选发票汇总和列表。

## ERP 映射

- ERP 入口：进项用途批次，后置于手工勾选之后。
- 数据来源：数税云进项发票池、ERP 供应商/入库/金蝶状态。
- 业务目标：批量勾选必须先形成 ERP 批次，再走门禁。

## 接口候选

- 用途状态查询：`ynfp.invoice.usage.status.query`，L0。
- 快捷勾选提交：待真实 Network 补抓，L3。

## 验收标准

- 快捷勾选不得自动真实提交。
- 批量范围、所属期、发票数量、税额必须二次确认。
