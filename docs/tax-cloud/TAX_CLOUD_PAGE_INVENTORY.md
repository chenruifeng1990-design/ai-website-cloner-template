# 数税云页面清单与采集状态

状态说明：

- `captured`：已采集 raw DOM/截图。
- `pending`：待进入页面采集。
- `erp-only`：ERP 增强页面，非数税云原菜单。
- `visual-only`：只借鉴视觉，不接原业务流程。

| 一级菜单 | 二级页面 | URL | 状态 | 下一步 |
|---|---|---|---|---|
| 销项管理 | 手工开票 | `/platform/created` | captured | 写票面组件 spec；抽取工具栏/票面表格结构 |
| 销项管理 | 扫码开票 | `/platform/scanCode` | pending | 采集二维码、链接、提交状态 |
| 销项管理 | 扫码记录 | `/platform/scanRecords` | pending | 采集筛选、表格、详情 |
| 销项管理 | 开票记录 | `/platform/records` | pending | 采集发票列表、详情、版式、交付/回传动作 |
| 销项管理 | 订单开票 | `/platform/billIssue` | pending | 采集订单列表、开票动作 |
| 销项管理 | 开票申请单 | `/platform/invoiceApplication` | visual-only | 只参考审批单视觉，ERP 主线用飞书审批 |
| 销项管理 | 红字确认单 | `/platform/redMark` | pending | 采集红字流程、状态、详情 |
| 进项管理 | 快捷勾选 | `/income/scanCodeCheck` | pending | 采集勾选入口、批量动作 |
| 进项管理 | 手工勾选 | `/income/invoiceCheck` | pending | 采集发票选择表、用途状态 |
| 进项管理 | 勾选审核 | `/income/confirmCheck` | pending | 采集审核批次/确认动作 |
| 进项管理 | 统计确认 | `/income/confirmSign` | pending | 采集统计确认和留抵展示 |
| 进项管理 | 认证结果 | `/income/certificationResults` | pending | 采集认证结果列表 |
| 票据中心 | 发票池 | `/billCenter/fullInvoiceQuery` | pending | 采集全量查询、筛选、详情、操作 |
| 票据中心 | 签收 | `/billCenter/sign` | pending | 采集签收列表和批量签收 |
| 票据中心 | 查验 | `/billCenter/invoiceVerification` | pending | 采集查验表单、结果、批量查验 |
| 票据中心 | 取票设置 | `/billCenter/accessSetting` | pending | 采集取票账号/规则配置 |
| 票据中心 | 任务管理 | `/billCenter/taskManagement` | pending | 采集任务列表、失败重试 |
| 分析看板 | 按税率统计 | `/analysisBoard/invoceRateView` | pending | 独立采集，不合并成总览 |
| 分析看板 | 按发票种类统计 | `/analysisBoard/invoiceTypeView` | pending | 独立采集 |
| 分析看板 | 按上下游企业统计 | `/analysisBoard/businessRateView` | pending | 独立采集 |
| 分析看板 | 按进销商品统计 | `/analysisBoard/goodsRateView` | pending | 独立采集 |
| 分析看板 | 按进销趋势统计 | `/analysisBoard/purchaseSalesTrend` | pending | 独立采集 |
| 分析看板 | 按进销地区统计 | `/analysisBoard/invoiceRegionView` | pending | 独立采集 |
| 基础信息 | 商品信息 | `/bussiness/info` | pending | 采集商品/税编资料 |
| 基础信息 | 客户管理 | `/bussiness/customer` | pending | 采集客户资料库 |
| 基础信息 | 开票额度配置 | `/bussiness/credit` | pending | 采集额度配置 |
| 基础信息 | 配置管理 | `/bussiness/configurationManagement` | pending | 采集配置项 |
| 系统设置 | 组织管理 | `/system/dept` | pending | 判断是否需要 ERP 复刻 |
| 系统设置 | 部门管理 | `/system/departmentInfo` | pending | 判断是否需要 ERP 复刻 |
| 系统设置 | 角色管理 | `/system/role` | pending | 判断是否需要 ERP 复刻 |
| 系统设置 | 网上办税信息 | `/system/onlineTaxationInfo` | pending | 重点采集数电/税局资料 |
| 系统设置 | 用户管理 | `/system/user` | pending | 判断是否需要 ERP 复刻 |
| 顶部入口 | 下载中心 | `/downloadCenter` | pending | 采集下载任务/文件列表 |
| ERP 增强 | 历史同步 | N/A | erp-only | 视觉参考任务管理/发票池 |
| ERP 增强 | 三方对账 | N/A | erp-only | 视觉参考分析看板/发票池 |
| ERP 增强 | 金蝶入账 | N/A | erp-only | 视觉参考发票池/明细表 |

## 已采集文件

- `docs/tax-cloud/captures/platform-created.raw.json`
- `docs/tax-cloud/captures/platform-created.visible-dom.json`
- `docs/tax-cloud/screenshots/platform-created-fullpage.png`
- `docs/design-references/tax-cloud-created-fullpage.png`

