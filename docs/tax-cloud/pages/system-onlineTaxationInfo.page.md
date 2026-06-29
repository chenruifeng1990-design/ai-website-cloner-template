# 页面采集：网上办税信息

## 基本信息

- 一级菜单：系统设置
- 二级菜单：网上办税信息
- URL：`https://fp.enuoyun.com/system/onlineTaxationInfo`
- 页面 key：`system-onlineTaxationInfo`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P2

## 已采集文件

- raw：`docs/tax-cloud/captures/system-onlineTaxationInfo.raw.json`
- visible DOM：`docs/tax-cloud/captures/system-onlineTaxationInfo.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/system-onlineTaxationInfo-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-system-onlineTaxationInfo-fullpage.png`

## 页面结构

- 数电账号/电子税局信息：账号、登录状态、认证状态、企业税号。
- 操作区：新增、编辑、登录、认证、刷新。
- 安全信息：密码、证书、认证方式。

## ERP 映射

- ERP 入口：数电/电子税局安全配置。
- 数据来源：数税云网上办税信息，ERP 安全存储。
- 业务目标：支撑额度查询、发票池同步、真实开票前状态检查。

## 接口候选

- `/system/bizOnlineTaxInformation/getOnlineTax`，L0。
- 登录/认证动作：待真实 Network 补抓，L3，默认不在 ERP 触发。

## 验收标准

- 密码和认证信息必须安全存储。
- ERP 页面不得明文暴露敏感凭证。
- 登录/扫脸认证类动作后置。
