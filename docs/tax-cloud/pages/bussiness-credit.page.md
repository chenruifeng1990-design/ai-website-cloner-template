# 页面采集：开票额度配置

## 基本信息

- 一级菜单：基础信息
- 二级菜单：开票额度配置
- URL：`https://fp.enuoyun.com/bussiness/credit`
- 页面 key：`bussiness-credit`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P2

## 已采集文件

- raw：`docs/tax-cloud/captures/bussiness-credit.raw.json`
- visible DOM：`docs/tax-cloud/captures/bussiness-credit.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/bussiness-credit-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-bussiness-credit-fullpage.png`

## 页面结构

- 额度配置列表：数电账号、开票类型、总额度、可用额度、更新时间。
- 操作区：查询、更新、配置、刷新。

## ERP 映射

- ERP 入口：开票额度展示和配置参考。
- 数据来源：数税云额度接口，ERP 只做代理展示，不伪造额度。
- 业务目标：手工开票页右上角额度显示真实数税云额度。

## 接口候选

- `GET /prod-api/bussiness/credit/creditInfo/1`，L0。
- ERP：`GET /api/tax-invoices/issue-credit?type=1`，L0。

## 验收标准

- 未配置数税云网页登录态时显示 `--`。
- 不允许写死额度。
- 额度更新时间可见。
