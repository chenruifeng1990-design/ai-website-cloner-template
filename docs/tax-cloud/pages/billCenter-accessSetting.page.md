# 页面采集：取票设置

## 基本信息

- 一级菜单：票据中心
- 二级菜单：取票设置
- URL：`https://fp.enuoyun.com/billCenter/accessSetting`
- 页面 key：`billCenter-accessSetting`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P1

## 已采集文件

- raw：`docs/tax-cloud/captures/billCenter-accessSetting.raw.json`
- visible DOM：`docs/tax-cloud/captures/billCenter-accessSetting.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/billCenter-accessSetting-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-billCenter-accessSetting-fullpage.png`

## 页面结构

- 取票配置：账号、票种、方向、自动取票周期、启停状态。
- 操作区：新增、编辑、删除、启用、停用。
- 列表区：配置名称、企业、账号、规则、状态、更新时间。

## ERP 映射

- ERP 入口：税务同步配置。
- 数据来源：数税云取票设置、ERP 同步游标。
- 业务目标：控制发票池同步任务的范围和周期。

## 接口候选

- 取票设置列表/保存：待真实 Network 补抓，L1/L2。
- ERP 同步游标：`/api/tax-invoices/sync-cursors`，L0。

## 验收标准

- 配置变化必须审计。
- 自动取票不能重复入池。
- 失败任务能进入任务管理。
