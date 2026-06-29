# 页面采集：签收

## 基本信息

- 一级菜单：票据中心
- 二级菜单：签收
- URL：`https://fp.enuoyun.com/billCenter/sign`
- 页面 key：`billCenter-sign`
- 当前状态：page-captured，api-pending，demo-pending，deferred
- 优先级：P1，高风险后置

## 已采集文件

- raw：`docs/tax-cloud/captures/billCenter-sign.raw.json`
- visible DOM：`docs/tax-cloud/captures/billCenter-sign.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/billCenter-sign-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-billCenter-sign-fullpage.png`

## 页面结构

- 签收查询区：发票号码、购销方、日期、签收状态。
- 操作区：查询、重置、签收、批量签收、导出。
- 列表区：发票信息、签收部门、签收时间、操作人、状态。

## ERP 映射

- ERP 入口：发票池详情中的签收状态和签收台账。
- 数据来源：数税云发票池、ERP 部门/人员。
- 业务目标：先展示签收状态，真实签收动作单独审批。

## 接口候选

- 签收列表：待真实 Network 补抓，L0。
- `ynfp.invoice.sign`，L2/L3，真实后果待确认。

## 验收标准

- 签收状态可展示。
- 真实签收默认禁用，必须确认税务后果。
