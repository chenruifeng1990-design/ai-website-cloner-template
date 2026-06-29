# 页面采集：用户管理

## 基本信息

- 一级菜单：系统设置
- 二级菜单：用户管理
- URL：`https://fp.enuoyun.com/system/user`
- 页面 key：`system-user`
- 当前状态：page-captured，api-pending，demo-pending，deferred
- 优先级：P3

## 已采集文件

- raw：`docs/tax-cloud/captures/system-user.raw.json`
- visible DOM：`docs/tax-cloud/captures/system-user.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/system-user-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-system-user-fullpage.png`

## ERP 映射

- ERP 用户体系为主，本页只做数税云账号映射参考。
- 高风险动作的操作人应记录 ERP 用户和数税云账号双重身份。

## 接口候选

- 用户列表/保存/启停：待真实 Network 补抓，L1。

## 验收标准

- 不重复维护用户主数据。
- 审计日志可追踪 ERP 用户和数税云账号。
