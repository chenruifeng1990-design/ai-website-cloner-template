# 页面采集：按进销趋势统计

## 基本信息

- 一级菜单：分析看板
- 二级菜单：按进销趋势统计
- URL：`https://fp.enuoyun.com/analysisBoard/purchaseSalesTrend`
- 页面 key：`analysisBoard-purchaseSalesTrend`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P0

## 已采集文件

- raw：`docs/tax-cloud/captures/analysisBoard-purchaseSalesTrend.raw.json`
- visible DOM：`docs/tax-cloud/captures/analysisBoard-purchaseSalesTrend.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/analysisBoard-purchaseSalesTrend-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-analysisBoard-purchaseSalesTrend-fullpage.png`

## 页面结构

- 筛选区：统计周期、快捷周期。
- 操作区：查询、导出。
- 图表区：销项发票趋势、进项发票趋势。
- 明细表：时间、份数、金额、税额、含税金额。

## ERP 映射

- ERP 入口：分析看板 / 进销趋势。
- 数据来源：数税云开票/收票时间序列，ERP 合同履约时间线，金蝶入账时间线。
- 业务目标：识别业务发生、发票发生、入账发生之间的时间差。

## 接口候选

- ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。
- 发票池列表下钻：`/api/tax-invoices/records/list`，L0。
- 数税云真实分析接口：待 Network 补抓。

## 验收标准

- 销项趋势和进项趋势分开展示。
- 月度/周期维度能下钻到发票明细。
- 趋势口径必须说明按开票日期、认证日期还是入账日期。
