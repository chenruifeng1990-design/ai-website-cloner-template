# 页面采集：部门管理

## 基本信息

- 一级菜单：系统设置
- 二级菜单：部门管理
- URL：`https://fp.enuoyun.com/system/departmentInfo`
- 页面 key：`system-departmentInfo`
- 当前状态：page-captured，api-pending，demo-pending，deferred
- 优先级：P3

## 已采集文件

- raw：`docs/tax-cloud/captures/system-departmentInfo.raw.json`
- visible DOM：`docs/tax-cloud/captures/system-departmentInfo.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/system-departmentInfo-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-system-departmentInfo-fullpage.png`

## ERP 映射

- ERP 已有部门/岗位体系，本页只做参考。
- 签收部门字段可映射到 ERP 部门，但不能反向覆盖。

## 接口候选

- 部门列表/保存：待真实 Network 补抓，L1。

## 验收标准

- 部门字段只作为税务平台维度。
- ERP 部门是主数据源。
