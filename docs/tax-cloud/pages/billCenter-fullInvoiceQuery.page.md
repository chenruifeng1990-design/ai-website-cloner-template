# 页面采集：发票池

## 基本信息

- 一级菜单：票据中心
- 二级菜单：发票池
- URL：`https://fp.enuoyun.com/billCenter/fullInvoiceQuery`
- 页面 key：`billCenter-fullInvoiceQuery`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P0

## 已采集文件

- raw：`docs/tax-cloud/captures/billCenter-fullInvoiceQuery.raw.json`
- visible DOM：`docs/tax-cloud/captures/billCenter-fullInvoiceQuery.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/billCenter-fullInvoiceQuery-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-billCenter-fullInvoiceQuery-fullpage.png`

## 页面结构

- Tab：发票池、异常发票。
- 筛选区：查询类型、开票日期、快捷周期、更多条件。
- 操作区：查询、重置、展开、导出、发票打印、版式下载、发票获取、签收、报销、入账、勾选、列配置、版式文件。
- 列表区：票种、异常发票、发票风险等级、销方名称、销方税号、数电票号码、发票代码、发票号码、金额、税额、价税合计、开票日期、签收部门、报销部门、发票来源、发票状态、认证状态/时间、报销状态/时间、税局入账状态/时间、签收状态/时间、查验结果、开票人、备注、税率、主要商品名称、乘车人、版式文件、操作。

## ERP 映射

- ERP 入口：发票反查业务主入口。
- 数据来源：数税云真实发票池。
- ERP 责任：关联合同、出库/入库、金蝶凭证、异常队列。
- 金蝶关系：只判断已入账/未入账及凭证号，不替代数税云发票源。

## 接口候选

- 发票池列表：`ynfp.invoice.pool.list.query`，L0，曾返回 7007，需要复测。
- 发票池详情：`ynfp.invoice.pool.detail.query`，L0。
- 版式文件下载：`ynfp.invoice.pool.file.download`，L2。
- 发票获取/取票：`ynfp.invoice.obtain`，L2。
- 税局入账状态查询：`ynfp.invoice.pool.rz.cx`，L0。
- 入账状态提交/调整：`ynfp.invoice.pool.rz.tj` / `ynfp.invoice.pool.rz.tz`，L3，默认禁用。

## 验收标准

- 发票池和异常发票 Tab 不混淆。
- 每个批量按钮必须有接口、风险等级和禁用策略。
- 发票详情可反查 ERP 业务源单和金蝶入账状态。
- L3 动作默认不开放，必须经过单独门禁设计。
