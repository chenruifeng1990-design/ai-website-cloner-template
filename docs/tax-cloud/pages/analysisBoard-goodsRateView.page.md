# 页面采集：按进销商品统计

## 基本信息

- 一级菜单：分析看板
- 二级菜单：按进销商品统计
- URL：`https://fp.enuoyun.com/analysisBoard/goodsRateView`
- 页面 key：`analysisBoard-goodsRateView`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P0

## 已采集文件

- raw：`docs/tax-cloud/captures/analysisBoard-goodsRateView.raw.json`
- visible DOM：`docs/tax-cloud/captures/analysisBoard-goodsRateView.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/analysisBoard-goodsRateView-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-analysisBoard-goodsRateView-fullpage.png`

## 页面结构

- 筛选区：统计周期、快捷周期。
- 操作区：查询、切换表单模式。
- 图表区：销项商品类别占比、进项商品类别占比。
- 商品项：焦炭及其副产品、石墨及炭素制品、无运输工具承运陆路运输业务、其他加工劳务、钢材等。

## ERP 映射

- ERP 入口：分析看板 / 商品税票分析。
- 数据来源：数税云商品名称/税收分类，ERP 商品资料，合同/出入库明细。
- 业务目标：商品税编、开票项目和业务商品保持一致。

## 接口候选

- ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。
- 商品税编：`ynfp.invoice.batch.taxCode`，L0，曾返回 7007，需要复测。
- 数税云真实分析接口：待 Network 补抓。

## 验收标准

- 销项商品和进项商品两组占比独立。
- 支持图表模式和表单模式。
- 商品维度可反查税编、合同商品、出入库商品。
