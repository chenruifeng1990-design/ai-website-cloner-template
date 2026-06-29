# 数税云页面清单与落地状态

更新时间：2026-06-29

## 状态口径

页面清单分成 5 个维度，不再只用 `captured / pending`，避免“页面已采集但接口未采集”被误解。

| 状态字段 | 含义 |
|---|---|
| 页面采集 | 是否已有 URL、截图、raw JSON、visible DOM |
| 接口采集 | 是否逐动作确认 Network / JS API / 后端 adapter |
| 页面 spec | 是否完成页面级结构说明 |
| demo | 是否完成 clone/demo 样板 |
| ERP 落地 | 是否进入 ERP 主干 |

状态值：

- `done`：完成。
- `pending`：未完成。
- `partial`：部分完成。
- `visual-only`：只做视觉参考，不进入 ERP 主流程。
- `erp-only`：ERP 增强页面，非数税云原菜单。
- `deferred`：后置。

## 采集结论

当前 33 个数税云可见页面已经完成第一轮页面级采集：

- URL：33/33
- 全页截图：33/33
- raw JSON：33/33
- visible DOM：33/33
- 设计参考截图：33/33

但还没有完成逐动作接口采集、弹窗/抽屉/详情态采集、业务字段血缘映射。因此当前阶段结论是：

```text
页面层：done
接口层：P0 action-audited，真实 Network pending / partial
状态层：pending
业务映射层：partial
ERP 落地：pending / partial
```

## 页面总表

| # | 一级菜单 | 二级页面 | URL | key | 页面采集 | 接口采集 | 页面 spec | demo | ERP 落地 | 处理策略 |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | 销项管理 | 手工开票 | `/platform/created` | `platform-created` | done | partial | accepted | accepted | partial | 已可用，冻结为票面基线；后续只做接口补齐和回归保护，不再重跑票面 |
| 2 | 销项管理 | 扫码开票 | `/platform/scanCode` | `platform-scanCode` | done | pending | pending | pending | pending | P1，采二维码、链接、提交状态 |
| 3 | 销项管理 | 扫码记录 | `/platform/scanRecords` | `platform-scanRecords` | done | pending | pending | pending | pending | P1，采筛选、表格、详情 |
| 4 | 销项管理 | 开票记录 | `/platform/records` | `platform-records` | done | pending | draft | pending | pending | P0，发票列表/详情/下载/交付动作 |
| 5 | 销项管理 | 订单开票 | `/platform/billIssue` | `platform-billIssue` | done | pending | pending | pending | pending | P1，采订单开票列表和开票动作 |
| 6 | 销项管理 | 开票申请单 | `/platform/invoiceApplication` | `platform-invoiceApplication` | done | pending | pending | pending | visual-only | 只参考视觉和字段，不恢复 ERP 旧申请主线 |
| 7 | 销项管理 | 红字确认单 | `/platform/redMark` | `platform-redMark` | done | pending | pending | pending | deferred | P1，高风险，真实动作后置 |
| 8 | 进项管理 | 快捷勾选 | `/income/scanCodeCheck` | `income-scanCodeCheck` | done | pending | pending | pending | pending | P0/P1，勾选入口、批量动作需标 L3 |
| 9 | 进项管理 | 手工勾选 | `/income/invoiceCheck` | `income-invoiceCheck` | done | pending | draft | pending | pending | P0，进项发票选择和用途状态 |
| 10 | 进项管理 | 勾选审核 | `/income/confirmCheck` | `income-confirmCheck` | done | pending | pending | pending | pending | P1，采审核批次/确认动作 |
| 11 | 进项管理 | 统计确认 | `/income/confirmSign` | `income-confirmSign` | done | pending | draft | pending | pending | P0，留抵和统计确认口径 |
| 12 | 进项管理 | 认证结果 | `/income/certificationResults` | `income-certificationResults` | done | pending | draft | pending | pending | P0/P1，认证结果和金蝶核对 |
| 13 | 票据中心 | 发票池 | `/billCenter/fullInvoiceQuery` | `billCenter-fullInvoiceQuery` | done | pending | draft | pending | pending | P0，税票主入口，详情/反查业务核心 |
| 14 | 票据中心 | 签收 | `/billCenter/sign` | `billCenter-sign` | done | pending | pending | pending | deferred | P1，高风险动作，先台账后真实签收 |
| 15 | 票据中心 | 查验 | `/billCenter/invoiceVerification` | `billCenter-invoiceVerification` | done | pending | pending | pending | pending | P1，查验表单、结果、批量查验 |
| 16 | 票据中心 | 取票设置 | `/billCenter/accessSetting` | `billCenter-accessSetting` | done | pending | pending | pending | pending | P1，取票账号/规则配置 |
| 17 | 票据中心 | 任务管理 | `/billCenter/taskManagement` | `billCenter-taskManagement` | done | pending | pending | pending | pending | P1，同步任务、失败重试、下载中心关联 |
| 18 | 分析看板 | 按税率统计 | `/analysisBoard/invoceRateView` | `analysisBoard-invoceRateView` | done | pending | draft | pending | pending | P0，必须独立页面 |
| 19 | 分析看板 | 按发票种类统计 | `/analysisBoard/invoiceTypeView` | `analysisBoard-invoiceTypeView` | done | pending | draft | pending | pending | P0，必须独立页面 |
| 20 | 分析看板 | 按上下游企业统计 | `/analysisBoard/businessRateView` | `analysisBoard-businessRateView` | done | pending | draft | pending | pending | P0，客户/供应商统计 |
| 21 | 分析看板 | 按进销商品统计 | `/analysisBoard/goodsRateView` | `analysisBoard-goodsRateView` | done | pending | draft | pending | pending | P0，商品维度统计 |
| 22 | 分析看板 | 按进销趋势统计 | `/analysisBoard/purchaseSalesTrend` | `analysisBoard-purchaseSalesTrend` | done | pending | draft | pending | pending | P0，趋势统计 |
| 23 | 分析看板 | 按进销地区统计 | `/analysisBoard/invoiceRegionView` | `analysisBoard-invoiceRegionView` | done | pending | draft | pending | pending | P0，地区统计 |
| 24 | 基础信息 | 商品信息 | `/bussiness/info` | `bussiness-info` | done | pending | pending | pending | pending | P2，商品/税编资料 |
| 25 | 基础信息 | 客户管理 | `/bussiness/customer` | `bussiness-customer` | done | pending | pending | pending | pending | P2，客户资料库 |
| 26 | 基础信息 | 开票额度配置 | `/bussiness/credit` | `bussiness-credit` | done | pending | pending | pending | pending | P2，额度配置，和开票页额度展示关联 |
| 27 | 基础信息 | 配置管理 | `/bussiness/configurationManagement` | `bussiness-configurationManagement` | done | pending | pending | pending | deferred | P2/P3，先判定 ERP 是否需要 |
| 28 | 系统设置 | 组织管理 | `/system/dept` | `system-dept` | done | pending | pending | pending | deferred | P3，ERP 权限体系为主 |
| 29 | 系统设置 | 部门管理 | `/system/departmentInfo` | `system-departmentInfo` | done | pending | pending | pending | deferred | P3，ERP 权限体系为主 |
| 30 | 系统设置 | 角色管理 | `/system/role` | `system-role` | done | pending | pending | pending | deferred | P3，ERP 权限体系为主 |
| 31 | 系统设置 | 网上办税信息 | `/system/onlineTaxationInfo` | `system-onlineTaxationInfo` | done | pending | pending | pending | pending | P2，数电/电子税局配置优先 |
| 32 | 系统设置 | 用户管理 | `/system/user` | `system-user` | done | pending | pending | pending | deferred | P3，ERP 用户体系为主 |
| 33 | 顶部入口 | 下载中心 | `/downloadCenter` | `downloadCenter` | done | pending | pending | pending | pending | P1，版式文件/任务下载 |

## 文件路径约定

每个页面已具备以下文件：

```text
docs/tax-cloud/captures/<key>.raw.json
docs/tax-cloud/captures/<key>.visible-dom.json
docs/tax-cloud/screenshots/<key>-fullpage.png
docs/design-references/tax-cloud-<key>-fullpage.png
```

例外：

- `platform-created` 的设计参考图为 `docs/design-references/tax-cloud-created-fullpage.png`。

## 下一步

1. 在 Chrome 登录态下按 `TAX_CLOUD_P0_INTERFACE_ACTION_AUDIT.md` 逐动作补真实 Network。
2. 给非手工 P0 页面生成 demo 样板，不再重跑手工开票票面。
3. 把 P0 动作矩阵映射到 ERP adapter 和回归测试。
4. P1/P2/P3 按缺口台账继续补页面状态、接口和数据血缘。
