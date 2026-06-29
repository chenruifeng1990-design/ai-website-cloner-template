# 页面采集：按上下游企业统计

## 基本信息

- 一级菜单：分析看板
- 二级菜单：按上下游企业统计
- URL：`https://fp.enuoyun.com/analysisBoard/businessRateView`
- 页面 key：`analysisBoard-businessRateView`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P0

## 已采集文件

- raw：`docs/tax-cloud/captures/analysisBoard-businessRateView.raw.json`
- visible DOM：`docs/tax-cloud/captures/analysisBoard-businessRateView.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/analysisBoard-businessRateView-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-analysisBoard-businessRateView-fullpage.png`

## 页面结构

- 筛选区：统计周期、快捷周期、企业方向/类型选择。
- 操作区：查询、导出。
- 图表区：上下游企业透视图。
- 明细表：上游/下游企业清单，字段包含企业名称、企业税号、份数、金额、税额、含税金额。

## ERP 映射

- ERP 入口：分析看板 / 客户供应商税票分析。
- 数据来源：数税云发票池，ERP 客户/供应商资料，金蝶客商。
- 业务目标：发现客户/供应商开票集中度、未入账、异常票据。

## 接口候选

- ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。
- 发票池明细下钻：`/api/tax-invoices/records/list`，L0。
- 数税云真实分析接口：待 Network 补抓。

## 验收标准

- 上游和下游企业不能混表。
- 企业名称和税号必须保留。
- 可以按企业下钻到发票池和 ERP 客商资料。
