# 页面采集：订单开票

## 基本信息

- 一级菜单：销项管理
- 二级菜单：订单开票
- URL：`https://fp.enuoyun.com/platform/billIssue`
- 页面 key：`platform-billIssue`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P1

## 已采集文件

- raw：`docs/tax-cloud/captures/platform-billIssue.raw.json`
- visible DOM：`docs/tax-cloud/captures/platform-billIssue.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/platform-billIssue-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-platform-billIssue-fullpage.png`

## 页面结构

- 订单查询区：订单编号、客户、日期、状态。
- 订单列表：订单金额、可开金额、已开金额、开票状态。
- 操作区：查询、重置、开票、详情。

## ERP 映射

- ERP 入口：待开票合同/出库单，不直接使用数税云订单作为业务主线。
- 数据来源：ERP 合同、出库、缺口台账，数税云订单页只做视觉参考。
- 业务目标：确保“我要开票”从 ERP gapToInvoice > 0 进入数税云真实开票草稿。

## 接口候选

- 数税云订单列表：待真实 Network 补抓，L0。
- ERP 合同直达草稿：`/api/invoice-registration/tax-drafts/from-contract`，L1。

## 验收标准

- 不恢复旧 `invoice_application` 主线。
- 订单开票视觉可参考，但业务数据以 ERP 合同/出库为准。
- 已开/未开金额必须和缺口台账一致。
