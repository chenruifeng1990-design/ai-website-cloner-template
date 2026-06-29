# 页面采集：按发票种类统计

## 基本信息

- 一级菜单：分析看板
- 二级菜单：按发票种类统计
- URL：`https://fp.enuoyun.com/analysisBoard/invoiceTypeView`
- 页面 key：`analysisBoard-invoiceTypeView`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P0

## 已采集文件

- raw：`docs/tax-cloud/captures/analysisBoard-invoiceTypeView.raw.json`
- visible DOM：`docs/tax-cloud/captures/analysisBoard-invoiceTypeView.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/analysisBoard-invoiceTypeView-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-analysisBoard-invoiceTypeView-fullpage.png`

## 页面结构

- 筛选区：统计周期、快捷周期。
- 操作区：查询、导出。
- 指标区：销项发票、进项发票。
- 明细表：发票种类、销项份数/金额/税额/占比、进项份数/金额/税额/占比、总计。

## ERP 映射

- ERP 入口：分析看板 / 发票种类统计。
- 数据来源：数税云发票池。
- ERP 补充：关联业务类型、合同类型、金蝶入账状态。

## 接口候选

- ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。
- 数税云真实分析接口：待 Network 补抓。

## 验收标准

- 发票种类维度不丢失。
- 销项和进项金额、税额、占比口径分别展示。
- 可以下钻到发票池筛选结果。
