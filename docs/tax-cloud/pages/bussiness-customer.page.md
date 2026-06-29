# 页面采集：客户管理

## 基本信息

- 一级菜单：基础信息
- 二级菜单：客户管理
- URL：`https://fp.enuoyun.com/bussiness/customer`
- 页面 key：`bussiness-customer`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P2

## 已采集文件

- raw：`docs/tax-cloud/captures/bussiness-customer.raw.json`
- visible DOM：`docs/tax-cloud/captures/bussiness-customer.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/bussiness-customer-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-bussiness-customer-fullpage.png`

## 页面结构

- 客户列表：名称、税号、地址、电话、开户行、银行账号、状态。
- 操作区：新增、编辑、删除、导入、导出。
- 详情弹窗：开票资料、联系人、历史开票记录。

## ERP 映射

- ERP 入口：客户开票资料库。
- 数据来源：ERP 客户、合同客户、金蝶客户、数税云客户库。
- 业务目标：统一购方资料，减少手工开票缺税号/地址/银行信息。

## 接口候选

- 客户列表/详情/保存：待真实 Network 补抓，L1。
- 开票页客户库：`/api/tax-invoices/issue-buyer-addresses`，L0。

## 验收标准

- 客户资料来源和更新时间可见。
- 金蝶客户、ERP 客户、数税云客户不能盲目互相覆盖。
