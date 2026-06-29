# 页面采集：开票申请单

## 基本信息

- 一级菜单：销项管理
- 二级菜单：开票申请单
- URL：`https://fp.enuoyun.com/platform/invoiceApplication`
- 页面 key：`platform-invoiceApplication`
- 当前状态：page-captured，api-pending，demo-pending，visual-only
- 优先级：P1 visual-only

## 已采集文件

- raw：`docs/tax-cloud/captures/platform-invoiceApplication.raw.json`
- visible DOM：`docs/tax-cloud/captures/platform-invoiceApplication.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/platform-invoiceApplication-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-platform-invoiceApplication-fullpage.png`

## 页面结构

- 申请单列表：申请单号、购方、金额、状态、申请时间、操作。
- 筛选区：申请状态、时间、购方信息。
- 操作区：查询、重置、导出、详情。

## ERP 映射

- ERP 旧开票申请主线已废弃。
- 本页面只做视觉和字段参考，不参与 ERP 新开票主线。
- 新链路固定为：合同/出库缺口 → `tax_invoice_issue_draft` → 飞书审批 → 真实开票。

## 接口候选

- 数税云申请单列表：待真实 Network 补抓，L0。
- ERP 不新增旧申请接口。

## 验收标准

- 文档和代码不得把本页面映射回旧 `invoice_application` 主流程。
- 如需保留入口，只能标为历史/参考。
