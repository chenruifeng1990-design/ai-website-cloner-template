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

- 当前采集态不是订单列表，而是进入页面后的引导/配置弹窗。
- 可见控件：关闭、取消、立即前往。
- 业务含义：订单开票依赖前置配置或授权状态，未直接露出订单列表。
- 后续需要在点击“立即前往”前确认是否会进入配置页或触发外部流程；该动作先按 L1/L2 review 处理，不自动执行。

## ERP 映射

- ERP 入口：待开票合同/出库单，不直接使用数税云订单作为业务主线。
- 数据来源：ERP 合同、出库、缺口台账，数税云订单页只做视觉参考。
- 业务目标：确保“我要开票”从 ERP gapToInvoice > 0 进入数税云真实开票草稿。

## 接口候选

- 数税云订单开票配置/引导态：待真实 Network 补抓，L0/L1。
- 数税云订单列表：需要完成前置配置后再补抓，L0。
- ERP 合同直达草稿：`/api/invoice-registration/tax-drafts/from-contract`，L1。

## 验收标准

- 不恢复旧 `invoice_application` 主线。
- 订单开票视觉可参考，但当前默认态先按“配置引导页”建模；业务数据仍以 ERP 合同/出库为准。
- 已开/未开金额必须和缺口台账一致。
