# 数税云 HAR 下载目录收集报告

生成时间：2026-06-30T01:02:21.274Z

## 口径

- 来源目录：`/Users/chenruifeng/Downloads`
- 目标目录：`docs/tax-cloud/network-har`
- 预期文件：来自 `TAX_CLOUD_HAR_CAPTURE_QUEUE.json`
- 默认不覆盖已归档 HAR；需要覆盖时加 `--overwrite`。

## 汇总

| 项目 | 数量 |
|---|---:|
| expected files | 19 |
| copied | 0 |
| overwritten | 0 |
| skipped existing | 0 |
| missing source | 19 |
| extra HAR files in source dir | 0 |

## 明细

| pageKey | 菜单 | 目标 HAR | 来源文件 | 来源大小 | 动作 |
|---|---|---|---|---:|---|
| `billCenter-accessSetting` | 票据中心/取票设置 | `billCenter-accessSetting.sync.har` | 无 | 0 | missing-source |
| `billCenter-invoiceVerification` | 票据中心/查验 | `billCenter-invoiceVerification.default-list.har` | 无 | 0 | missing-source |
| `billCenter-sign` | 票据中心/签收 | `billCenter-sign.action-review.har` | 无 | 0 | missing-source |
| `billCenter-taskManagement` | 票据中心/任务管理 | `billCenter-taskManagement.default-list.har` | 无 | 0 | missing-source |
| `downloadCenter` | 顶部入口/下载中心 | `downloadCenter.default-list.har` | 无 | 0 | missing-source |
| `platform-billIssue` | 销项管理/订单开票 | `platform-billIssue.default-list.har` | 无 | 0 | missing-source |
| `platform-redMark` | 销项管理/红字确认单 | `platform-redMark.default-list.har` | 无 | 0 | missing-source |
| `bussiness-customer` | 基础信息/客户管理 | `bussiness-customer.default-list.har` | 无 | 0 | missing-source |
| `bussiness-info` | 基础信息/商品信息 | `bussiness-info.default-list.har` | 无 | 0 | missing-source |
| `system-onlineTaxationInfo` | 系统设置/网上办税信息 | `system-onlineTaxationInfo.default-list.har` | 无 | 0 | missing-source |
| `system-departmentInfo` | 系统设置/部门管理 | `system-departmentInfo.default-list.har` | 无 | 0 | missing-source |
| `system-dept` | 系统设置/组织管理 | `system-dept.default-list.har` | 无 | 0 | missing-source |
| `system-role` | 系统设置/角色管理 | `system-role.default-list.har` | 无 | 0 | missing-source |
| `system-user` | 系统设置/用户管理 | `system-user.default-list.har` | 无 | 0 | missing-source |
| `platform-invoiceApplication` | 销项管理/开票申请单 | `platform-invoiceApplication.default-list.har` | 无 | 0 | missing-source |
| `platform-scanCode` | 销项管理/扫码开票 | `platform-scanCode.default-list.har` | 无 | 0 | missing-source |
| `platform-scanRecords` | 销项管理/扫码记录 | `platform-scanRecords.default-list.har` | 无 | 0 | missing-source |
| `bussiness-configurationManagement` | 基础信息/配置管理 | `bussiness-configurationManagement.default-list.har` | 无 | 0 | missing-source |
| `bussiness-credit` | 基础信息/开票额度配置 | `bussiness-credit.default-list.har` | 无 | 0 | missing-source |

## 来源目录额外 HAR

无

## 使用

~~~bash
npm run tax-cloud:har:collect
npm run tax-cloud:har:intake
npm run tax-cloud:har:parse-all
npm run tax-cloud:audit:strict
~~~
