# 页面采集：商品信息

## 基本信息

- 一级菜单：基础信息
- 二级菜单：商品信息
- URL：`https://fp.enuoyun.com/bussiness/info`
- 页面 key：`bussiness-info`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P2

## 已采集文件

- raw：`docs/tax-cloud/captures/bussiness-info.raw.json`
- visible DOM：`docs/tax-cloud/captures/bussiness-info.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/bussiness-info-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-bussiness-info-fullpage.png`

## 页面结构

- 商品列表：商品名称、规格、单位、税收分类编码、税率、启用状态。
- 操作区：新增、编辑、删除、导入、导出。
- 筛选区：商品名称、税编、状态。

## ERP 映射

- ERP 入口：商品税编资料。
- 数据来源：ERP 商品资料、数税云商品库、税收分类编码接口。
- 业务目标：开票明细中的商品、规格、单位、税编可复用。

## 接口候选

- 商品列表/保存：待真实 Network 补抓，L1。
- 税收分类编码：`ynfp.invoice.batch.taxCode`，L0。

## 验收标准

- 商品税编缺失时开票不能提交审批。
- ERP 商品和数税云商品保留映射关系。
