# 页面采集：配置管理

## 基本信息

- 一级菜单：基础信息
- 二级菜单：配置管理
- URL：`https://fp.enuoyun.com/bussiness/configurationManagement`
- 页面 key：`bussiness-configurationManagement`
- 当前状态：page-captured，api-pending，demo-pending，deferred
- 优先级：P2/P3

## 已采集文件

- raw：`docs/tax-cloud/captures/bussiness-configurationManagement.raw.json`
- visible DOM：`docs/tax-cloud/captures/bussiness-configurationManagement.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/bussiness-configurationManagement-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-bussiness-configurationManagement-fullpage.png`

## 页面结构

- 配置列表：配置名称、配置项、启用状态、更新时间。
- 操作区：新增、编辑、删除、启停、保存。

## ERP 映射

- ERP 入口：税务配置白名单。
- 数据来源：数税云配置项、ERP 系统配置。
- 业务目标：只迁移与开票、取票、额度、数电账号相关的必要配置。

## 接口候选

- 配置列表/保存：待真实 Network 补抓，L1/L2。

## 验收标准

- 每个配置项必须判断是否进入 ERP。
- 权限、组织、用户类配置优先沿用 ERP，不重复迁移。
