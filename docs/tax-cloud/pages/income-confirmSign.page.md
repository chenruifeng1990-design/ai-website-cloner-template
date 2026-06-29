# 页面采集：统计确认

## 基本信息

- 一级菜单：进项管理
- 二级菜单：统计确认
- URL：`https://fp.enuoyun.com/income/confirmSign`
- 页面 key：`income-confirmSign`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P0

## 已采集文件

- raw：`docs/tax-cloud/captures/income-confirmSign.raw.json`
- visible DOM：`docs/tax-cloud/captures/income-confirmSign.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/income-confirmSign-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-income-confirmSign-fullpage.png`

## 页面结构

- 步骤：申请统计、统计完成、统计确认。
- 操作区：导出统计结果、下载发票明细。
- 表格一：抵扣类勾选统计结果，字段包含发票种类、合计份数、有效抵扣税额合计、出口转内销证明份数、其他发票份数等。
- 表格二：增值税申报进项抵扣汇总，字段包含进项抵扣类型、份数、金额、税额。
- 侧栏：数电登录、数电认证、电子税局登录。

## ERP 映射

- ERP 入口：留抵台账 / 进项统计确认。
- 数据来源：数税云统计确认结果。
- ERP 责任：和进项发票池、认证结果、金蝶入账状态形成勾稽。

## 接口候选

- 统计确认相关接口需通过 Network 补抓。
- 认证结果/批次：`/api/tax-invoices/records/certification-batches`，L1/L2。
- 发票池明细：`/api/tax-invoices/records/list`，L0。

## 验收标准

- 三步状态必须可表达当前阶段。
- 汇总金额、税额、份数必须能下钻到明细。
- 留抵口径必须写清来源，不能用前端计算替代税务平台结果。
- 统计确认类真实动作必须按 L3 门禁处理。
