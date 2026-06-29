# 页面采集：红字确认单

## 基本信息

- 一级菜单：销项管理
- 二级菜单：红字确认单
- URL：`https://fp.enuoyun.com/platform/redMark`
- 页面 key：`platform-redMark`
- 当前状态：page-captured，api-pending，demo-pending，deferred
- 优先级：P1，高风险后置

## 已采集文件

- raw：`docs/tax-cloud/captures/platform-redMark.raw.json`
- visible DOM：`docs/tax-cloud/captures/platform-redMark.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/platform-redMark-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-platform-redMark-fullpage.png`

## 页面结构

- 筛选区：红字确认单状态、购销方、发票号码、日期。
- 列表区：确认单编号、蓝字发票、红字金额、状态、申请方、操作。
- 操作区：申请、撤销、下载、详情、红冲关联。

## ERP 映射

- ERP 入口：红字/红冲台账，真实动作后置。
- 数据来源：数税云红字确认单，ERP 原蓝字发票、合同、退货/折让事实。
- 业务目标：先做查询和台账，真实红字确认/红冲必须独立审批。

## 接口候选

- `ynfp.invoice.red.confirm.query`，L0。
- `ynfp.invoice.red.confirmDetail.query`，L0。
- `ynfp.invoice.red.confirm.issue`，L3。
- `ynfp.invoice.red.confirm.operate`，L3。
- `ynfp.invoice.red.confirm.down`，L2。

## 验收标准

- L3 红字动作默认禁用。
- 红字确认必须关联蓝字发票和业务原因。
- 真实红冲不得绕过审批、审计和幂等。
