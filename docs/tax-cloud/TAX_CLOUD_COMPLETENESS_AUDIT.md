# 数税云 33 页完整性复核

复核时间：2026-06-29

## 结论

当前 33 个数税云可见页面已经完成第一轮页面级采集，且每页四件套完整：

- raw JSON
- visible DOM
- 全页截图
- design reference 截图

这代表“页面层第一轮完整”，不代表“接口层、状态层、业务映射层完整”。

```text
页面层：完整
接口层：未完整
状态层：未完整
业务映射层：未完整
ERP 落地层：未完整
```

## 文件完整性统计

| 项目 | 数量 | 结论 |
|---|---:|---|
| target pages | 33 | 完整 |
| raw JSON | 33 | 完整 |
| visible DOM | 33 | 完整 |
| screenshots | 33 | 完整 |
| design references | 33 | 完整 |
| 缺失页面 | 0 | 无 |

## 产物路径

本次完整性复核以以下目录为准：

```text
目标页清单：docs/tax-cloud/captures/target-pages.json
raw JSON：docs/tax-cloud/captures/*.raw.json
visible DOM：docs/tax-cloud/captures/*.visible-dom.json
全页截图：docs/tax-cloud/screenshots/*-fullpage.png
视觉参考图：docs/design-references/tax-cloud-*-fullpage.png
手工开票组件 spec：docs/research/tax-cloud/components/*.spec.md
```

## 页面文件复核表

| # | 一级菜单 | 二级页面 | key | 文件完整 | 表格 | 控件 | 输入 | 按钮 | 模式 |
|---:|---|---|---|---|---:|---:|---:|---:|---|
| 1 | 销项管理 | 手工开票 | `platform-created` | yes | 27 | 72 | 26 | 12 | - |
| 2 | 销项管理 | 扫码开票 | `platform-scanCode` | yes | 0 | 16 | 15 | 32 | - |
| 3 | 销项管理 | 扫码记录 | `platform-scanRecords` | yes | 4 | 18 | 20 | 36 | - |
| 4 | 销项管理 | 开票记录 | `platform-records` | yes | 4 | 27 | 34 | 77 | - |
| 5 | 销项管理 | 订单开票 | `platform-billIssue` | yes | 0 | 5 | 4 | 21 | - |
| 6 | 销项管理 | 开票申请单 | `platform-invoiceApplication` | yes | 4 | 32 | 31 | 50 | visual-only |
| 7 | 销项管理 | 红字确认单 | `platform-redMark` | yes | 4 | 15 | 19 | 52 | - |
| 8 | 进项管理 | 快捷勾选 | `income-scanCodeCheck` | yes | 2 | 14 | 8 | 36 | - |
| 9 | 进项管理 | 手工勾选 | `income-invoiceCheck` | yes | 3 | 23 | 29 | 39 | - |
| 10 | 进项管理 | 勾选审核 | `income-confirmCheck` | yes | 2 | 9 | 4 | 23 | - |
| 11 | 进项管理 | 统计确认 | `income-confirmSign` | yes | 4 | 8 | 3 | 20 | - |
| 12 | 进项管理 | 认证结果 | `income-certificationResults` | yes | 3 | 21 | 21 | 30 | - |
| 13 | 票据中心 | 发票池 | `billCenter-fullInvoiceQuery` | yes | 4 | 35 | 62 | 83 | - |
| 14 | 票据中心 | 签收 | `billCenter-sign` | yes | 0 | 19 | 11 | 23 | - |
| 15 | 票据中心 | 查验 | `billCenter-invoiceVerification` | yes | 0 | 17 | 7 | 26 | - |
| 16 | 票据中心 | 取票设置 | `billCenter-accessSetting` | yes | 0 | 8 | 30 | 31 | - |
| 17 | 票据中心 | 任务管理 | `billCenter-taskManagement` | yes | 3 | 18 | 5 | 28 | - |
| 18 | 分析看板 | 按税率统计 | `analysisBoard-invoceRateView` | yes | 3 | 28 | 10 | 34 | - |
| 19 | 分析看板 | 按发票种类统计 | `analysisBoard-invoiceTypeView` | yes | 3 | 20 | 10 | 26 | - |
| 20 | 分析看板 | 按上下游企业统计 | `analysisBoard-businessRateView` | yes | 6 | 46 | 12 | 47 | - |
| 21 | 分析看板 | 按进销商品统计 | `analysisBoard-goodsRateView` | yes | 0 | 11 | 10 | 20 | - |
| 22 | 分析看板 | 按进销趋势统计 | `analysisBoard-purchaseSalesTrend` | yes | 6 | 21 | 10 | 24 | - |
| 23 | 分析看板 | 按进销地区统计 | `analysisBoard-invoiceRegionView` | yes | 6 | 28 | 10 | 31 | - |
| 24 | 基础信息 | 商品信息 | `bussiness-info` | yes | 4 | 17 | 11 | 36 | - |
| 25 | 基础信息 | 客户管理 | `bussiness-customer` | yes | 4 | 12 | 9 | 30 | - |
| 26 | 基础信息 | 开票额度配置 | `bussiness-credit` | yes | 3 | 10 | 4 | 23 | - |
| 27 | 基础信息 | 配置管理 | `bussiness-configurationManagement` | yes | 2 | 40 | 29 | 29 | - |
| 28 | 系统设置 | 组织管理 | `system-dept` | yes | 3 | 10 | 4 | 24 | - |
| 29 | 系统设置 | 部门管理 | `system-departmentInfo` | yes | 2 | 7 | 4 | 23 | - |
| 30 | 系统设置 | 角色管理 | `system-role` | yes | 3 | 22 | 6 | 40 | - |
| 31 | 系统设置 | 网上办税信息 | `system-onlineTaxationInfo` | yes | 3 | 18 | 21 | 30 | - |
| 32 | 系统设置 | 用户管理 | `system-user` | yes | 3 | 15 | 7 | 30 | - |
| 33 | 顶部入口 | 下载中心 | `downloadCenter` | yes | 0 | 8 | 3 | 18 | - |

## 还不算完整的部分

### 1. 接口层

缺口：

- 逐按钮 Network 请求未全量确认。
- 部分接口只来自静态 JS 或 ERP 现有封装推断。
- 写入类、税务状态类接口未完成风险复核。

验收条件：

- 每个页面都必须有“接口已确认 / 暂无接口 / 待补抓原因”。
- 每个按钮都必须有接口或禁用说明。
- L3/L4 接口必须有门禁说明。

### 2. 状态层

缺口：

- 弹窗、抽屉、详情页未全部采集。
- 空态、有数据态、错误态、权限不足态未全部采集。
- 批量选择、导入、导出、下载状态未全部采集。

验收条件：

- 每个页面至少覆盖默认态、空态、有数据态、错误态。
- 有详情/弹窗的页面必须有单独截图和 spec。

### 3. 业务映射层

缺口：

- 页面字段和 ERP/金蝶/飞书/数税云的数据来源未逐字段确认。
- 进项、留抵、金蝶入账关系还缺字段血缘表。

验收条件：

- 每个字段都明确来源、是否可编辑、保存位置、是否参与税务提交。
- 金蝶已入账/未入账状态必须能和发票池数据关联。

### 4. demo 和 ERP 落地层

缺口：

- 33 个页面已经都有 page spec 初版。
- 目前只有 P0 demo 总览，P1/P2/P3 还没有页面级 demo。
- 手工开票页 7 个组件 spec 已可作为冻结基线。
- ERP 主干只完成了部分真实开票页，不等于税务工作台完成。

验收条件：

- P0 页面全部有 demo。
- P0/P1 页面有 ERP 映射和接口策略。
- 高风险动作在 demo 和 ERP 中默认禁用或有门禁。

## 下一步判定

下一步不是重复采集 33 页，而是进入缺口补齐：

```text
已采页面三件套
→ 页面 spec（已完成 33/33 初版）
→ 接口逐动作复核
→ 状态补采
→ ERP 映射
→ demo
→ ERP 落地
```

当前可用机器验收：

```bash
npm run tax-cloud:audit
npm run tax-cloud:audit:strict
```

`tax-cloud:audit` 用于生成当前进度报告；`tax-cloud:audit:strict` 用于判断是否真正达到“全部跑完并验收”。当前如果没有 32 个非手工页面的 normalized HAR 证据，strict 必然失败，不能宣布接口层完成。
