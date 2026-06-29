# 数税云到聚兴 ERP 映射

## 映射原则

1. 数税云是税务事实源。
2. ERP 是业务事实源：合同、出库、入库、缺口、审批。
3. 金蝶是记账层：判断发票是否已入账、凭证关系是否闭环。
4. 飞书是唯一审批层：旧 ERP 开票申请不回主线。

## 一级菜单映射

| 数税云一级菜单 | ERP 当前位置 | 差距 |
|---|---|---|
| 销项管理 | 开票核对 → 我要核对/查账 → 销项管理 | 缺数税云原页面视觉；手工开票票面仍需结构级对齐 |
| 进项管理 | 开票核对 → 我要核对/查账 → 进项管理 | 勾选/认证/留抵视觉和真实接口仍需逐页补 |
| 票据中心 | 开票核对 → 我要核对/查账 → 票据中心 | ERP 多了历史同步、三方对账、金蝶入账 |
| 分析看板 | 开票核对 → 我要核对/查账 → 分析看板 | 数税云是 6 个二级页，ERP 当前是聚合页，需拆分 |
| 基础信息 | 分散在客户/供应商/税编/额度配置 | 需要补完整资料库视觉和数据来源 |
| 系统设置 | ERP 暂无完整映射 | 只采集与数电、企业、权限相关部分 |

## 关键模块映射

| 数税云页面 | ERP 模块 | 落地方式 |
|---|---|---|
| 手工开票 | `TaxInvoiceIssuePage` / `DigitalInvoiceSlipForm` | 用 clone spec 重写票面 table 结构 |
| 开票记录 | `TaxInvoiceSavedRecordsPanel(defaultDirection=sale)` | 补数税云筛选、详情、版式动作视觉 |
| 订单开票 | `OrderInvoiceWorkbench` | 用 ERP 合同/出库数据驱动，视觉参考数税云 |
| 扫码开票 | `ScanInvoiceWorkbench` | 补二维码和扫码申请状态 |
| 扫码记录 | `ScanRecordWorkbench` | 补数税云记录页结构 |
| 红字确认单 | `RedInvoiceWorkbench` | 真实红字接口接通前只做审批/草稿 |
| 进项发票池 | `TaxInvoiceSavedRecordsPanel(defaultDirection=purchase)` | 补数税云进项池列表/详情 |
| 手工勾选 | `CertificationSelectionPanel(mode=manual)` | 视觉参考数税云，真实提交需高风险门禁 |
| 快捷勾选 | `CertificationSelectionPanel(mode=quick)` | 同上 |
| 勾选审核 | `CertificationAuditPanel` | 补批次审核视觉 |
| 统计确认/留抵 | `VatCreditPeriodPanel` | 补数税云统计确认页面 |
| 认证结果 | `TaxInvoiceSavedRecordsPanel` | 补认证结果状态维度 |
| 发票池 | `TaxInvoiceSavedRecordsPanel` | 核心事实池 |
| 签收 | `TaxInvoiceSavedRecordsPanel` + status action | 需要明确真实签收接口风险 |
| 查验 | provider check | 补查验表单/结果页 |
| 取票设置 | `TicketObtainSettingsPanel` | 补配置页视觉 |
| 任务管理 | `TicketTaskPanel` | 补任务列表/失败重试 |
| 分析看板 6 页 | `TaxInvoiceAnalyticsWorkspace` | 从聚合页拆为 6 个数税云式页面/Tab |
| 商品信息 | 税编/商品资料 | 待新增/完善 |
| 客户管理 | `TaxInvoiceCustomerProfilesPanel(direction=sale)` | 补数税云客户管理视觉 |
| 开票额度配置 | 额度接口/配置页 | 待新增配置页 |
| 网上办税信息 | 数电/电子税局配置 | 待新增映射 |
| 下载中心 | 版式文件/任务下载 | 补下载中心视觉 |

## 不允许恢复的旧链路

```text
合同 → invoice_application → 本地申请审批 → 数税云草稿
```

新链路固定为：

```text
合同/出库缺口
→ tax_invoice_issue_draft
→ 数税云票面
→ 保存/预览
→ 飞书审批
→ 审批通过真实开票
```

