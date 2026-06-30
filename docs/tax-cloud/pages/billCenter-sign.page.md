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

- 默认 Tab：`签收`。
- 同页 Tab：签收、签收历史、单张签收、扫码签收、扫描签收、版式/图像签收、Excel签收。
- 当前默认表单：发票代码/扫码枪、发票号码或后 4 位、开票日期、校验码后六位、签收部门、业务类型、计税方式、备注。
- 当前可见操作：重置、签收。
- 签收历史/批量签收/导出等不是当前默认首屏，需要切换 Tab 后另采。

## ERP 映射

- ERP 入口：发票池详情中的签收状态和签收台账。
- 数据来源：数税云发票池、ERP 部门/人员。
- 业务目标：先展示签收状态，真实签收动作单独审批。

## 接口候选

- 单张签收表单初始化：待真实 Network 补抓，L0。
- 签收历史列表：待真实 Network 补抓，L0。
- `ynfp.invoice.sign`，L2/L3，真实后果待确认。

## 验收标准

- 签收状态可展示。
- 真实签收默认禁用，必须确认税务后果；不得把默认“签 收”按钮接成普通查询动作。
