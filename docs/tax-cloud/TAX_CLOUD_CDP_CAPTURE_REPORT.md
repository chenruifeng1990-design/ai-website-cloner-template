# 数税云 CDP HAR 自动采集报告

生成时间：2026-06-29T11:13:53.745Z
修正时间：2026-06-30

## 口径

- 采集方式：Chrome DevTools Protocol，端口 `127.0.0.1:9333`。
- 只自动打开页面首屏并监听 Network，不点击提交、签收、红冲、认证、真实开票等动作。
- 2026-06-30 复核确认：本报告中的 `captured` 结果实际来自未登录/非当前用户 Chrome target，只捕获到登录重定向壳页面和验证码 `/prod-api/code`，不属于业务接口证据。
- 2026-06-30 再复核：`127.0.0.1:9333/json/list` 当前没有任何 `fp.enuoyun.com` target；用户当前 Chrome 中的数税云标签页只能通过 Chrome 扩展通道看到，不能用 9333 CDP 端口直接补 HAR。
- 本报告保留用于追溯；下表输出的 `*.cdp-load.har` 不再计入 `tax-cloud:audit:strict` 完成口径。
- 原始 HAR 目录被 git 忽略；提交前请运行 `npm run tax-cloud:har:parse-all` 生成脱敏 normalized 文件。

## 汇总

| 项目 | 数量 |
|---|---:|
| selected pages | 16 |
| captured pages | 0（业务口径） |
| invalid login/shell captures | 16 |
| no-api pages | 16（业务口径） |
| failed pages | 0 |
| login redirects | 0 |

## 明细

| pageKey | 菜单 | 状态 | API 数 | 输出 | final URL | 备注 |
|---|---|---|---:|---|---|---|
| `platform-scanCode` | 销项管理/扫码开票 | invalid-login-shell | 0 | `docs/tax-cloud/network-har/platform-scanCode.cdp-load.har` | https://fp.enuoyun.com/platform/scanCode | 只保留追溯，不计入完成 |
| `platform-redMark` | 销项管理/红字确认单 | invalid-login-shell | 0 | `docs/tax-cloud/network-har/platform-redMark.cdp-load.har` | https://fp.enuoyun.com/platform/redMark | 只保留追溯，不计入完成 |
| `billCenter-sign` | 票据中心/签收 | invalid-login-shell | 0 | `docs/tax-cloud/network-har/billCenter-sign.cdp-load.har` | https://fp.enuoyun.com/billCenter/sign | 只保留追溯，不计入完成 |
| `billCenter-invoiceVerification` | 票据中心/查验 | invalid-login-shell | 0 | `docs/tax-cloud/network-har/billCenter-invoiceVerification.cdp-load.har` | https://fp.enuoyun.com/billCenter/invoiceVerification | 只保留追溯，不计入完成 |
| `billCenter-accessSetting` | 票据中心/取票设置 | invalid-login-shell | 0 | `docs/tax-cloud/network-har/billCenter-accessSetting.cdp-load.har` | https://fp.enuoyun.com/billCenter/accessSetting | 只保留追溯，不计入完成 |
| `billCenter-taskManagement` | 票据中心/任务管理 | invalid-login-shell | 0 | `docs/tax-cloud/network-har/billCenter-taskManagement.cdp-load.har` | https://fp.enuoyun.com/billCenter/taskManagement | 只保留追溯，不计入完成 |
| `bussiness-info` | 基础信息/商品信息 | invalid-login-shell | 0 | `docs/tax-cloud/network-har/bussiness-info.cdp-load.har` | https://fp.enuoyun.com/bussiness/info | 只保留追溯，不计入完成 |
| `bussiness-customer` | 基础信息/客户管理 | invalid-login-shell | 0 | `docs/tax-cloud/network-har/bussiness-customer.cdp-load.har` | https://fp.enuoyun.com/bussiness/customer | 只保留追溯，不计入完成 |
| `bussiness-credit` | 基础信息/开票额度配置 | invalid-login-shell | 0 | `docs/tax-cloud/network-har/bussiness-credit.cdp-load.har` | https://fp.enuoyun.com/bussiness/credit | 只保留追溯，不计入完成 |
| `bussiness-configurationManagement` | 基础信息/配置管理 | invalid-login-shell | 0 | `docs/tax-cloud/network-har/bussiness-configurationManagement.cdp-load.har` | https://fp.enuoyun.com/bussiness/configurationManagement | 只保留追溯，不计入完成 |
| `system-dept` | 系统设置/组织管理 | invalid-login-shell | 0 | `docs/tax-cloud/network-har/system-dept.cdp-load.har` | https://fp.enuoyun.com/system/dept | 只保留追溯，不计入完成 |
| `system-departmentInfo` | 系统设置/部门管理 | invalid-login-shell | 0 | `docs/tax-cloud/network-har/system-departmentInfo.cdp-load.har` | https://fp.enuoyun.com/system/departmentInfo | 只保留追溯，不计入完成 |
| `system-role` | 系统设置/角色管理 | invalid-login-shell | 0 | `docs/tax-cloud/network-har/system-role.cdp-load.har` | https://fp.enuoyun.com/system/role | 只保留追溯，不计入完成 |
| `system-onlineTaxationInfo` | 系统设置/网上办税信息 | invalid-login-shell | 0 | `docs/tax-cloud/network-har/system-onlineTaxationInfo.cdp-load.har` | https://fp.enuoyun.com/system/onlineTaxationInfo | 只保留追溯，不计入完成 |
| `system-user` | 系统设置/用户管理 | invalid-login-shell | 0 | `docs/tax-cloud/network-har/system-user.cdp-load.har` | https://fp.enuoyun.com/system/user | 只保留追溯，不计入完成 |
| `downloadCenter` | 顶部入口/下载中心 | invalid-login-shell | 0 | `docs/tax-cloud/network-har/downloadCenter.cdp-load.har` | https://fp.enuoyun.com/downloadCenter | 只保留追溯，不计入完成 |

## 后续命令

```bash
npm run tax-cloud:har:parse-all
npm run tax-cloud:har:tasks
npm run tax-cloud:audit:strict
```
