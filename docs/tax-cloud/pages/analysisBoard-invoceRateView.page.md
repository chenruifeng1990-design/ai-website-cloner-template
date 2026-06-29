# 页面采集：按税率统计

## 基本信息

- 一级菜单：分析看板
- 二级菜单：按税率统计
- URL：`https://fp.enuoyun.com/analysisBoard/invoceRateView`
- 页面 key：`analysisBoard-invoceRateView`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P0

## 已采集文件

- raw：`docs/tax-cloud/captures/analysisBoard-invoceRateView.raw.json`
- visible DOM：`docs/tax-cloud/captures/analysisBoard-invoceRateView.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/analysisBoard-invoceRateView-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-analysisBoard-invoceRateView-fullpage.png`

## 页面结构

- 筛选区：统计周期、快捷周期。
- 操作区：查询、导出。
- 指标区：销项发票、进项发票。
- 明细表：税率、销项份数/金额/税额/含税金额占比、进项份数/金额/税额/含税金额占比。

## ERP 映射

- ERP 入口：分析看板 / 税率统计。
- 数据来源：数税云发票池汇总，ERP 可补充合同/商品维度。
- 验收重点：6 个分析页必须独立，不得合成一个泛化页面导致指标丢失。

## 接口候选

- ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。
- 数税云真实分析接口：待 Network 补抓。

## 验收标准

- 销项/进项两侧指标同时展示。
- 税率维度明细可导出。
- 汇总口径必须说明是数税云口径、ERP 口径还是混合口径。
