# 数税云最小 HAR 补齐批次

生成时间：2026-06-30T00:45:33.300Z

## 口径

- 目标：先让 `tax-cloud:audit:strict` 的页面级真实 HAR 证据从当前 `13/32` 补到 `32/32`。
- 策略：每个缺口页优先只抓 1 条最低风险、最接近默认加载/列表/读取的 HAR。
- 不包含：保存、提交、签收、红字、真实开票、认证、重启任务、下载文件等高风险或真实副作用动作。
- 本文件不替代完整任务表；完整任务仍看 `TAX_CLOUD_HAR_CAPTURE_TASKS.md`。

## 汇总

| 项目 | 数量 |
|---|---:|
| 缺 HAR 页面 | 19 |
| 最小补齐 HAR | 19 |

## 最小批次

| 优先级 | pageKey | 菜单 | 建议 HAR 文件名 | 风险 | 采集动作 | URL |
|---|---|---|---|---|---|---|
| P1 | `billCenter-accessSetting` | 票据中心/取票设置 | `billCenter-accessSetting.sync.har` | L0 query | 取票设置读取：`/invoicecenter/sjruzhang/getSjruzhangSetting` 候选，L0。 | https://fp.enuoyun.com/billCenter/accessSetting |
| P1 | `billCenter-invoiceVerification` | 票据中心/查验 | `billCenter-invoiceVerification.default-list.har` | L0 query | 默认页面加载/列表查询：需要抓取首屏接口，L0。 | https://fp.enuoyun.com/billCenter/invoiceVerification |
| P1，高风险后置 | `billCenter-sign` | 票据中心/签收 | `billCenter-sign.action-review.har` | L0 query | 单张签收表单初始化：待真实 Network 补抓，L0。 | https://fp.enuoyun.com/billCenter/sign |
| P1 | `billCenter-taskManagement` | 票据中心/任务管理 | `billCenter-taskManagement.default-list.har` | L0 query | 数据同步任务列表：`/system/taskRecord/list` 候选，L0。 | https://fp.enuoyun.com/billCenter/taskManagement |
| P1 | `downloadCenter` | 顶部入口/下载中心 | `downloadCenter.default-list.har` | L0 query | 默认页面加载/列表查询：只抓首屏和低风险查询接口；如页面无业务 API，记录页面事实，不推进保存/提交类动作。 | https://fp.enuoyun.com/downloadCenter |
| P1 | `platform-billIssue` | 销项管理/订单开票 | `platform-billIssue.default-list.har` | L0 query | 数税云订单列表：需要完成前置配置后再补抓，L0。 | https://fp.enuoyun.com/platform/billIssue |
| P1 visual-only | `platform-invoiceApplication` | 销项管理/开票申请单 | `platform-invoiceApplication.default-list.har` | L0 query | 数税云申请单列表：待真实 Network 补抓，L0。 | https://fp.enuoyun.com/platform/invoiceApplication |
| P1，高风险后置 | `platform-redMark` | 销项管理/红字确认单 | `platform-redMark.default-list.har` | L0 query | 默认页面加载/列表查询：需要抓取首屏接口，L0。 | https://fp.enuoyun.com/platform/redMark |
| P1 | `platform-scanCode` | 销项管理/扫码开票 | `platform-scanCode.default-list.har` | L0 query | 扫码记录查询：和 `platform-scanRecords` 联动，L0。 | https://fp.enuoyun.com/platform/scanCode |
| P1 | `platform-scanRecords` | 销项管理/扫码记录 | `platform-scanRecords.default-list.har` | L0 query | 扫码记录列表：待真实 Network 补抓，L0。 | https://fp.enuoyun.com/platform/scanRecords |
| P2/P3 | `bussiness-configurationManagement` | 基础信息/配置管理 | `bussiness-configurationManagement.default-list.har` | L0 query | 默认页面加载/列表查询：只抓首屏和低风险查询接口；如页面无业务 API，记录页面事实，不推进保存/提交类动作。 | https://fp.enuoyun.com/bussiness/configurationManagement |
| P2 | `bussiness-credit` | 基础信息/开票额度配置 | `bussiness-credit.default-list.har` | L0 query | 默认页面加载/列表查询：只抓首屏和低风险查询接口；如页面无业务 API，记录页面事实，不推进保存/提交类动作。 | https://fp.enuoyun.com/bussiness/credit |
| P2 | `bussiness-customer` | 基础信息/客户管理 | `bussiness-customer.default-list.har` | L0 query | 默认页面加载/列表查询：只抓首屏和低风险查询接口；如页面无业务 API，记录页面事实，不推进保存/提交类动作。 | https://fp.enuoyun.com/bussiness/customer |
| P2 | `bussiness-info` | 基础信息/商品信息 | `bussiness-info.default-list.har` | L0 query | 默认页面加载/列表查询：只抓首屏和低风险查询接口；如页面无业务 API，记录页面事实，不推进保存/提交类动作。 | https://fp.enuoyun.com/bussiness/info |
| P2 | `system-onlineTaxationInfo` | 系统设置/网上办税信息 | `system-onlineTaxationInfo.default-list.har` | L0 query | 默认页面加载/列表查询：只抓首屏和低风险查询接口；如页面无业务 API，记录页面事实，不推进保存/提交类动作。 | https://fp.enuoyun.com/system/onlineTaxationInfo |
| P3 | `system-departmentInfo` | 系统设置/部门管理 | `system-departmentInfo.default-list.har` | L0 query | 默认页面加载/列表查询：只抓首屏和低风险查询接口；如页面无业务 API，记录页面事实，不推进保存/提交类动作。 | https://fp.enuoyun.com/system/departmentInfo |
| P3 | `system-dept` | 系统设置/组织管理 | `system-dept.default-list.har` | L0 query | 默认页面加载/列表查询：只抓首屏和低风险查询接口；如页面无业务 API，记录页面事实，不推进保存/提交类动作。 | https://fp.enuoyun.com/system/dept |
| P3 | `system-role` | 系统设置/角色管理 | `system-role.default-list.har` | L0 query | 默认页面加载/列表查询：只抓首屏和低风险查询接口；如页面无业务 API，记录页面事实，不推进保存/提交类动作。 | https://fp.enuoyun.com/system/role |
| P3 | `system-user` | 系统设置/用户管理 | `system-user.default-list.har` | L0 query | 默认页面加载/列表查询：只抓首屏和低风险查询接口；如页面无业务 API，记录页面事实，不推进保存/提交类动作。 | https://fp.enuoyun.com/system/user |

## 执行步骤

1. 使用当前已登录 Chrome，不重新登录、不打开无关页面。
2. 对每一行页面：打开 URL，确认企业和账号正确。
3. DevTools Network 勾选 Preserve log，然后 Clear。
4. 只执行“采集动作”描述的默认加载/列表/读取动作。
5. Save all as HAR with content，按“建议 HAR 文件名”保存到 `docs/tax-cloud/network-har/`。
6. 每批保存后执行：

```bash
npm run tax-cloud:har:parse-all
npm run tax-cloud:har:tasks
npm run tax-cloud:minimal-har
npm run tax-cloud:audit:strict
```

## 安全线

- 看到“保存、提交、签收、红字、开票、重启、删除、认证、下载文件”等按钮，不点击。
- 如果页面默认弹窗只有“立即前往/保存设置/签收”等动作，先只保存默认加载 HAR；不要为了补接口去推进业务动作。
- 如果某页默认加载仍无业务 API，记录为页面事实，不用高风险动作硬补。
