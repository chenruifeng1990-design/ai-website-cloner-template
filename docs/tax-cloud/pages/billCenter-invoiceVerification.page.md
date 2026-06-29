# 页面采集：查验

## 基本信息

- 一级菜单：票据中心
- 二级菜单：查验
- URL：`https://fp.enuoyun.com/billCenter/invoiceVerification`
- 页面 key：`billCenter-invoiceVerification`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P1

## 已采集文件

- raw：`docs/tax-cloud/captures/billCenter-invoiceVerification.raw.json`
- visible DOM：`docs/tax-cloud/captures/billCenter-invoiceVerification.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/billCenter-invoiceVerification-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-billCenter-invoiceVerification-fullpage.png`

## 页面结构

- 查验表单：发票号码、代码、开票日期、金额、校验码等。
- 操作区：查验、重置、导入、批量查验。
- 结果区：查验结果、票面信息、风险提示。

## ERP 映射

- ERP 入口：发票池详情 / 查验动作。
- 数据来源：数税云查验接口、本地发票池。
- 业务目标：对发票真伪和票面信息进行只读校验。

## 接口候选

- `ynfp.invoice.check`，L2。
- ERP：`/api/tax-invoices/records/provider-check`，L2。

## 验收标准

- 查验失败有明确原因。
- 查验结果写入本地记录但不改变税务状态。
- 批量查验必须有任务进度和失败清单。
