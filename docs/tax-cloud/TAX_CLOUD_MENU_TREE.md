# 数税云真实菜单树

采集时间：2026-06-29

来源：Chrome 已登录数税云 `https://fp.enuoyun.com/platform/created` 可见 DOM。

## 一级/二级菜单

### 销项管理

| 二级菜单 | URL | 当前 ERP 对应 |
|---|---|---|
| 手工开票 | `https://fp.enuoyun.com/platform/created` | `issue-draft/:draftId` 数税云真实开票页 |
| 扫码开票 | `https://fp.enuoyun.com/platform/scanCode` | 销项管理 → 扫码开票 |
| 扫码记录 | `https://fp.enuoyun.com/platform/scanRecords` | 销项管理 → 扫码记录 |
| 开票记录 | `https://fp.enuoyun.com/platform/records` | 销项管理 → 开票记录 / 发票池 |
| 订单开票 | `https://fp.enuoyun.com/platform/billIssue` | 销项管理 → 订单开票 |
| 开票申请单 | `https://fp.enuoyun.com/platform/invoiceApplication` | 仅借鉴视觉，ERP 主线用飞书审批 |
| 红字确认单 | `https://fp.enuoyun.com/platform/redMark` | 销项管理 → 红字确认单 |

### 进项管理

| 二级菜单 | URL | 当前 ERP 对应 |
|---|---|---|
| 快捷勾选 | `https://fp.enuoyun.com/income/scanCodeCheck` | 进项管理 → 快捷勾选 |
| 手工勾选 | `https://fp.enuoyun.com/income/invoiceCheck` | 进项管理 → 手工勾选 |
| 勾选审核 | `https://fp.enuoyun.com/income/confirmCheck` | 进项管理 → 勾选审核 |
| 统计确认 | `https://fp.enuoyun.com/income/confirmSign` | 进项管理 → 统计确认/留抵 |
| 认证结果 | `https://fp.enuoyun.com/income/certificationResults` | 进项管理 → 认证结果 |

### 票据中心

| 二级菜单 | URL | 当前 ERP 对应 |
|---|---|---|
| 发票池 | `https://fp.enuoyun.com/billCenter/fullInvoiceQuery` | 票据中心 → 发票池 |
| 签收 | `https://fp.enuoyun.com/billCenter/sign` | 票据中心 → 签收管理 |
| 查验 | `https://fp.enuoyun.com/billCenter/invoiceVerification` | 票据中心 → 发票查验 |
| 取票设置 | `https://fp.enuoyun.com/billCenter/accessSetting` | 票据中心 → 取票设置 |
| 任务管理 | `https://fp.enuoyun.com/billCenter/taskManagement` | 票据中心 → 任务管理 |

### 分析看板

| 二级菜单 | URL | 当前 ERP 对应 |
|---|---|---|
| 按税率统计 | `https://fp.enuoyun.com/analysisBoard/invoceRateView` | ERP 分析看板内页签，需拆独立页面 |
| 按发票种类统计 | `https://fp.enuoyun.com/analysisBoard/invoiceTypeView` | ERP 分析看板内页签，需拆独立页面 |
| 按上下游企业统计 | `https://fp.enuoyun.com/analysisBoard/businessRateView` | ERP 分析看板内页签，需拆独立页面 |
| 按进销商品统计 | `https://fp.enuoyun.com/analysisBoard/goodsRateView` | ERP 分析看板内页签，需拆独立页面 |
| 按进销趋势统计 | `https://fp.enuoyun.com/analysisBoard/purchaseSalesTrend` | ERP 分析看板内页签，需拆独立页面 |
| 按进销地区统计 | `https://fp.enuoyun.com/analysisBoard/invoiceRegionView` | ERP 分析看板内页签，需拆独立页面 |

### 基础信息

| 二级菜单 | URL | 当前 ERP 对应 |
|---|---|---|
| 商品信息 | `https://fp.enuoyun.com/bussiness/info` | 税收分类编码/商品资料 |
| 客户管理 | `https://fp.enuoyun.com/bussiness/customer` | 客户/供应商开票资料 |
| 开票额度配置 | `https://fp.enuoyun.com/bussiness/credit` | 额度配置/额度接口 |
| 配置管理 | `https://fp.enuoyun.com/bussiness/configurationManagement` | 数税云配置能力待映射 |

### 系统设置

| 二级菜单 | URL | 当前 ERP 对应 |
|---|---|---|
| 组织管理 | `https://fp.enuoyun.com/system/dept` | 待映射 |
| 部门管理 | `https://fp.enuoyun.com/system/departmentInfo` | 待映射 |
| 角色管理 | `https://fp.enuoyun.com/system/role` | 待映射 |
| 网上办税信息 | `https://fp.enuoyun.com/system/onlineTaxationInfo` | 数电/电子税局配置 |
| 用户管理 | `https://fp.enuoyun.com/system/user` | 待映射 |

### 顶部入口

| 入口 | URL | 当前 ERP 对应 |
|---|---|---|
| 下载中心 | `https://fp.enuoyun.com/downloadCenter` | 票据中心 → 版式文件/下载中心 |
| 个人中心 | `https://fp.enuoyun.com/user/profile` | 暂不进入 ERP 主线 |

## 关键发现

1. 分析看板不是一个页面，而是 6 个独立二级页面。
2. 基础信息、系统设置存在真实二级菜单，不能在计划中省略。
3. 销项“开票申请单”是数税云原模块，但 ERP 新主线不能恢复旧 `invoice_application`。
4. 票据中心少于 ERP 当前 tabs：ERP 增加了历史同步、版式文件、三方对账、金蝶入账，这些是业务增强，不是数税云原菜单。

