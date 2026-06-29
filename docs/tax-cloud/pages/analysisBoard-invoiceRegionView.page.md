# 页面采集：按进销地区统计

## 基本信息

- 一级菜单：分析看板
- 二级菜单：按进销地区统计
- URL：`https://fp.enuoyun.com/analysisBoard/invoiceRegionView`
- 页面 key：`analysisBoard-invoiceRegionView`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P0

## 已采集文件

- raw：`docs/tax-cloud/captures/analysisBoard-invoiceRegionView.raw.json`
- visible DOM：`docs/tax-cloud/captures/analysisBoard-invoiceRegionView.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/analysisBoard-invoiceRegionView-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-analysisBoard-invoiceRegionView-fullpage.png`

## 页面结构

- 筛选区：统计周期、快捷周期。
- 操作区：查询、导出。
- 图表区：销项流向、进项来源。
- 明细表：地区、份数、金额、税额、含税金额占比。

## ERP 映射

- ERP 入口：分析看板 / 地区统计。
- 数据来源：数税云购销方地区，ERP 客户/供应商地区，金蝶客商资料。
- 业务目标：按地区分析销项流向、进项来源和异常票据分布。

## 接口候选

- ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。
- 发票池列表下钻：`/api/tax-invoices/records/list`，L0。
- 数税云真实分析接口：待 Network 补抓。

## 验收标准

- 销项流向和进项来源必须分开展示。
- 地区维度可下钻到企业和发票。
- 占比口径必须和数税云一致或明确差异。
