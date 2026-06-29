# 数税云全量页面采集验收报告

## 采集结果

- 目标页面：33 个
- 已采集：33 个
- 失败：0 个
- 截图文件：33 个
- DOM 文件：33 个
- 采集内容：真实登录态页面 URL、页面标题、可见 DOM、控件数量、表格数量、全页截图、设计参考截图

## 页面清单

| 一级菜单 | 二级页面 | URL | 表格 | 控件 | 输入 | 按钮 | 状态 |
|---|---|---|---:|---:|---:|---:|---|
| 销项管理 | 手工开票 | `https://fp.enuoyun.com/platform/created` | 27 | 72 | 26 | 12 | captured |
| 销项管理 | 扫码开票 | `https://fp.enuoyun.com/platform/scanCode` | 0 | 16 | 15 | 32 | captured |
| 销项管理 | 扫码记录 | `https://fp.enuoyun.com/platform/scanRecords` | 4 | 18 | 20 | 36 | captured |
| 销项管理 | 开票记录 | `https://fp.enuoyun.com/platform/records` | 4 | 27 | 34 | 77 | captured |
| 销项管理 | 订单开票 | `https://fp.enuoyun.com/platform/billIssue` | 0 | 5 | 4 | 21 | captured |
| 销项管理 | 开票申请单 | `https://fp.enuoyun.com/platform/invoiceApplication` | 4 | 32 | 31 | 50 | captured |
| 销项管理 | 红字确认单 | `https://fp.enuoyun.com/platform/redMark` | 4 | 15 | 19 | 52 | captured |
| 进项管理 | 快捷勾选 | `https://fp.enuoyun.com/income/scanCodeCheck` | 2 | 14 | 8 | 36 | captured |
| 进项管理 | 手工勾选 | `https://fp.enuoyun.com/income/invoiceCheck` | 3 | 23 | 29 | 39 | captured |
| 进项管理 | 勾选审核 | `https://fp.enuoyun.com/income/confirmCheck` | 2 | 9 | 4 | 23 | captured |
| 进项管理 | 统计确认 | `https://fp.enuoyun.com/income/confirmSign` | 4 | 8 | 3 | 20 | captured |
| 进项管理 | 认证结果 | `https://fp.enuoyun.com/income/certificationResults` | 3 | 21 | 21 | 30 | captured |
| 票据中心 | 发票池 | `https://fp.enuoyun.com/billCenter/fullInvoiceQuery` | 4 | 35 | 62 | 83 | captured |
| 票据中心 | 签收 | `https://fp.enuoyun.com/billCenter/sign` | 0 | 19 | 11 | 23 | captured |
| 票据中心 | 查验 | `https://fp.enuoyun.com/billCenter/invoiceVerification` | 0 | 17 | 7 | 26 | captured |
| 票据中心 | 取票设置 | `https://fp.enuoyun.com/billCenter/accessSetting` | 0 | 8 | 30 | 31 | captured |
| 票据中心 | 任务管理 | `https://fp.enuoyun.com/billCenter/taskManagement` | 3 | 18 | 5 | 28 | captured |
| 分析看板 | 按税率统计 | `https://fp.enuoyun.com/analysisBoard/invoceRateView` | 3 | 28 | 10 | 34 | captured |
| 分析看板 | 按发票种类统计 | `https://fp.enuoyun.com/analysisBoard/invoiceTypeView` | 3 | 20 | 10 | 26 | captured |
| 分析看板 | 按上下游企业统计 | `https://fp.enuoyun.com/analysisBoard/businessRateView` | 6 | 46 | 12 | 47 | captured |
| 分析看板 | 按进销商品统计 | `https://fp.enuoyun.com/analysisBoard/goodsRateView` | 0 | 11 | 10 | 20 | captured |
| 分析看板 | 按进销趋势统计 | `https://fp.enuoyun.com/analysisBoard/purchaseSalesTrend` | 6 | 21 | 10 | 24 | captured |
| 分析看板 | 按进销地区统计 | `https://fp.enuoyun.com/analysisBoard/invoiceRegionView` | 6 | 28 | 10 | 31 | captured |
| 基础信息 | 商品信息 | `https://fp.enuoyun.com/bussiness/info` | 4 | 17 | 11 | 36 | captured |
| 基础信息 | 客户管理 | `https://fp.enuoyun.com/bussiness/customer` | 4 | 12 | 9 | 30 | captured |
| 基础信息 | 开票额度配置 | `https://fp.enuoyun.com/bussiness/credit` | 3 | 10 | 4 | 23 | captured |
| 基础信息 | 配置管理 | `https://fp.enuoyun.com/bussiness/configurationManagement` | 2 | 40 | 29 | 29 | captured |
| 系统设置 | 组织管理 | `https://fp.enuoyun.com/system/dept` | 3 | 10 | 4 | 24 | captured |
| 系统设置 | 部门管理 | `https://fp.enuoyun.com/system/departmentInfo` | 2 | 7 | 4 | 23 | captured |
| 系统设置 | 角色管理 | `https://fp.enuoyun.com/system/role` | 3 | 22 | 6 | 40 | captured |
| 系统设置 | 网上办税信息 | `https://fp.enuoyun.com/system/onlineTaxationInfo` | 3 | 18 | 21 | 30 | captured |
| 系统设置 | 用户管理 | `https://fp.enuoyun.com/system/user` | 3 | 15 | 7 | 30 | captured |
| 顶部入口 | 下载中心 | `https://fp.enuoyun.com/downloadCenter` | 0 | 8 | 3 | 18 | captured |

## 关键发现

- clone-website 本身不是后台系统接口克隆器，它适合把截图和 DOM 变成页面规格、组件规格和 Next.js demo。
- 数税云不是一个页面，而是至少 33 个可见页面；其中分析看板是 6 个独立二级页面，不应只做一个综合 Dashboard。
- 票面复刻不能继续用普通 div/grid 拼，需要以数税云的合并单元格结构为准：购方/通知到、商品明细、价税合计、销方/备注、附加信息分别是独立表格结构。
- ERP 应保留自身业务闭环：合同/出库/金蝶/飞书审批/数税云真实开票。数税云旧“开票申请单”只作为视觉和字段参考，不恢复 ERP 旧 invoice_application 主流程。

## 下一步执行单

1. 从这些截图和 DOM 生成每个页面的组件规格，优先级：手工开票票面、发票池、开票记录、进项勾选、分析看板 6 页。
2. 对照 ERP 现有模块，补齐缺页：分析看板 6 个二级页、基础信息 4 页、系统设置 5 页、票据中心任务/签收/查验/取票设置。
3. 对手工开票页面单独重构表格结构，先还原合并单元格，再做字段预填和接口绑定。
4. 静态 JS 接口扫描 + ERP 后端映射，形成“数税云接口候选 -> ERP 接口 -> 风险等级”的接口对照表。
