# 页面采集：开票记录

## 基本信息

- 一级菜单：销项管理
- 二级菜单：开票记录
- URL：`https://fp.enuoyun.com/platform/records`
- 页面 key：`platform-records`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P0

## 已采集文件

- raw：`docs/tax-cloud/captures/platform-records.raw.json`
- visible DOM：`docs/tax-cloud/captures/platform-records.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/platform-records-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-platform-records-fullpage.png`

## 页面结构

- 状态 Tab：全部、开票中、开票失败、发票生成、开票完成。
- 筛选区：创建时间、快捷日期、发票抬头、发票种类、数电票号码。
- 操作区：查询、重置、展开、批量导出、列配置。
- 列表区：订单编号、发票代码/号码、数电票号码、发票抬头、特定业务、主要商品名称、不含税金额、税额、含税金额、税率、清单标志、交付手机/邮箱、开票状态、回传状态、操作人、开票方式、创建时间、操作。
- 侧栏：数电登录、数电认证、电子税局登录。

## ERP 映射

- ERP 入口：开票核对 / 发票反查业务 / 销项开票记录。
- 数据来源：数税云开票结果、ERP 合同/出库回挂、金蝶入账状态。
- 业务目标：从真实发票反查合同、出库单、客户、金蝶凭证和异常处理队列。

## 接口候选

- 开票结果查询：`ynfp.invoice.detail.query`，L0。
- 发票明细列表：`ynfp.invoice.detail.list.query`，L0，曾返回 7007，需要复测权限。
- ERP 列表：`/api/tax-invoices/records/list`，L0。
- 版式下载：`/api/tax-invoices/records/layout-file-download`，L2。
- 对账：`/api/tax-invoices/records/reconcile`，L0。

## 验收标准

- Tab 状态能独立筛选。
- 列表字段不丢失，金额字段右对齐。
- 每条发票可进入详情或反查业务源单。
- 下载/导出必须标风险等级，真实下载走 L2 记录。
- 未绑定合同/金蝶的发票进入异常队列。
