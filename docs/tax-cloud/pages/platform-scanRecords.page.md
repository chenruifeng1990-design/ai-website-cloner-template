# 页面采集：扫码记录

## 基本信息

- 一级菜单：销项管理
- 二级菜单：扫码记录
- URL：`https://fp.enuoyun.com/platform/scanRecords`
- 页面 key：`platform-scanRecords`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P1

## 已采集文件

- raw：`docs/tax-cloud/captures/platform-scanRecords.raw.json`
- visible DOM：`docs/tax-cloud/captures/platform-scanRecords.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/platform-scanRecords-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-platform-scanRecords-fullpage.png`

## 页面结构

- 筛选区：创建时间、开票抬头、扫码状态、订单编号。
- 操作区：查询、重置、展开、导出、列配置。
- 列表区：扫码单号、客户名称、税号、金额、状态、创建时间、有效期、操作。
- 详情态：扫码填写内容、附件、发票申请状态。

## ERP 映射

- ERP 入口：扫码开票记录，作为客户外部补资料的辅助台账。
- 数据来源：数税云扫码记录，ERP 客户资料和合同/出库候选。
- 业务目标：把扫码补齐资料转为 ERP 客户资料候选或开票草稿候选。

## 接口候选

- 扫码记录列表：待真实 Network 补抓，L0。
- 扫码记录详情：待真实 Network 补抓，L0。
- 导出：待真实 Network 补抓，L1。

## 验收标准

- 扫码状态不与真实开票状态混淆。
- 客户资料变更必须进入待确认队列。
- 已生成发票的扫码记录可反查开票记录。
