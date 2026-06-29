# 数税云 P0 页面接口动作复核矩阵

更新时间：2026-06-29

## 口径

本文件只覆盖非手工开票 P0 页面。`/platform/created` 手工开票票面已经可用并冻结为视觉基线，后续只补额度、销方、客户库、税编、场景模板和截图回归保护，不再重跑票面结构。

接口复核分三层：

| 层级 | 含义 | 当前处理 |
|---|---|---|
| 数税云页面动作 | 从真实页面 DOM/截图识别出的按钮、筛选、Tab、弹窗入口 | 已列入本矩阵 |
| 数税云真实接口 | Chrome Network 捕获的网页端接口或开放 API interfaceCode | P0 先按已知接口候选标注，仍需逐动作实抓补齐 |
| ERP adapter | ERP 当前已有或应新增的后端/前端接口 | 已映射到现有能力或标记待建 |

风险等级：

| 等级 | 定义 | 策略 |
|---|---|---|
| L0 | 纯查询 | 可优先接入 |
| L1 | ERP 本地状态或导入导出 | 可接入，需审计 |
| L2 | 调数税云读取/下载/查验/取票任务 | 可接入，需任务记录和失败可见 |
| L3 | 改变税务平台状态，如签收、入账、勾选、红字确认 | 默认禁用，必须单独门禁 |
| L4 | 真实开票 | 只允许走飞书审批、preview hash、服务端总闸 |

## P0 页面总览

| # | 页面 | 数税云 URL | ERP 入口 | 状态 |
|---:|---|---|---|---|
| 1 | 开票记录 | `/platform/records` | `tax-sales-records` | P0 动作矩阵已列，Network 待补 |
| 2 | 发票池 | `/billCenter/fullInvoiceQuery` | `tax-pool` | P0 动作矩阵已列，Network 待补 |
| 3 | 手工勾选 | `/income/invoiceCheck` | `tax-purchases-manual-check` | P0 动作矩阵已列，L3 门禁待补 |
| 4 | 统计确认 | `/income/confirmSign` | `tax-purchases-credit` | P0 动作矩阵已列，L3 门禁待补 |
| 5 | 认证结果 | `/income/certificationResults` | `tax-purchases-result` | P0 动作矩阵已列，Network 待补 |
| 6 | 按税率统计 | `/analysisBoard/invoceRateView` | `tax-dashboard` | 分析子页独立保留 |
| 7 | 按发票种类统计 | `/analysisBoard/invoiceTypeView` | `tax-dashboard` | 分析子页独立保留 |
| 8 | 按上下游企业统计 | `/analysisBoard/businessRateView` | `tax-dashboard` | 分析子页独立保留 |
| 9 | 按进销商品统计 | `/analysisBoard/goodsRateView` | `tax-dashboard` | 分析子页独立保留 |
| 10 | 按进销趋势统计 | `/analysisBoard/purchaseSalesTrend` | `tax-dashboard` | 分析子页独立保留 |
| 11 | 按进销地区统计 | `/analysisBoard/invoiceRegionView` | `tax-dashboard` | 分析子页独立保留 |

## 1. 开票记录

| 页面动作 | 风险 | 数税云接口候选 | ERP 对应 | 验收 |
|---|---|---|---|---|
| 状态 Tab：全部/开票中/开票失败/发票生成/开票完成 | L0 | `ynfp.invoice.detail.list.query` 或网页端开票记录列表 | `/api/tax-invoices/records/list` direction=sale | Tab 切换不混状态 |
| 筛选：创建时间、发票抬头、票种、数电票号码 | L0 | 同列表接口 | `/api/tax-invoices/records/list` | 筛选条件进入请求并可重置 |
| 查看详情/预览 | L0 | `ynfp.invoice.detail.query`、`ynfp.invoice.pool.detail.query` | `/api/tax-invoices/records/provider-detail` | 详情只读展示原始回执 |
| 版式文件下载 | L2 | `ynfp.invoice.pool.file.download` | `/api/tax-invoices/records/layout-file-download` | PDF/OFD/XML 下载失败有错误回显 |
| 反查合同/出库/金蝶 | L0/L1 | ERP 内部映射 | `/api/tax-invoices/records/business-reconcile`、`/api/tax-invoices/records/reconcile` | 未匹配进入异常队列 |
| 回传/交付/冲红入口 | L3 | 待真实 Network 确认 | 暂不开放真实动作 | 按钮不得静默提交数税云 |

## 2. 发票池

| 页面动作 | 风险 | 数税云接口候选 | ERP 对应 | 验收 |
|---|---|---|---|---|
| 发票池/异常发票 Tab | L0 | `ynfp.invoice.pool.list.query` | `/api/tax-invoices/records/list` | 异常票和普通池不混淆 |
| 多条件筛选、分页、列配置 | L0 | 发票池列表网页端接口或开放 API | `/api/tax-invoices/records/list` | 票种、方向、金额、认证、入账状态可筛 |
| 发票详情 | L0 | `ynfp.invoice.pool.detail.query` | `/api/tax-invoices/records/provider-detail` | 可看结构化明细和原始 provider raw |
| 发票获取/取票 | L2 | `ynfp.invoice.obtain`、`ynfp.invoice.pool.eInvoice.list` | `/api/tax-invoices/sync-sales`、`/api/tax-invoices/sync-purchases` | 任务有进度、错误和幂等入池 |
| 查验 | L2 | `ynfp.invoice.check` | `/api/tax-invoices/records/provider-check` | 查验结果写回本地，不改变税务状态 |
| 版式下载 | L2 | `ynfp.invoice.pool.file.download` | `/api/tax-invoices/records/layout-file-download` | 单票/批量下载均记录任务 |
| 签收、报销、入账、勾选 | L3 | `ynfp.invoice.sign`、`ynfp.invoice.reimb`、`ynfp.invoice.pool.rz.tj/tz`、用途确认类接口 | `/api/tax-invoices/records/status-action` 仅本地状态 | 真实动作默认禁用，必须单独开门禁 |
| 业务回挂 | L1 | ERP 内部 | `/api/tax-invoices/records/link/confirm`、`/link/revoke` | 低置信度不得自动绑定 |

## 3. 手工勾选

| 页面动作 | 风险 | 数税云接口候选 | ERP 对应 | 验收 |
|---|---|---|---|---|
| 未勾选/已勾选 Tab | L0 | `ynfp.invoice.pool.list.query` + 用途状态字段 | `/api/tax-invoices/records/list` direction=purchase | Tab 按用途状态分离 |
| 发票筛选 | L0 | 发票池列表/用途状态查询 | `/api/tax-invoices/records/list` | 支持供应商、票号、日期、金额 |
| 用途状态查询 | L0 | `ynfp.invoice.usage.status.query` | 待补 adapter 或入池字段 | 显示未认证/已认证/转出等状态 |
| 下载发票 | L2 | `ynfp.invoice.pool.file.download` | `/api/tax-invoices/records/layout-file-download` | 下载只读、失败可见 |
| 抵扣勾选/不抵扣勾选 | L3 | 待抓真实接口 | `/api/tax-invoices/records/status-action` 当前只做 ERP 批次 | 不得直接提交税局；先生成 ERP 勾选批次 |
| 导入/导出 | L1 | 网页端导入导出接口待抓 | ERP CSV/Excel 后置 | 导入不直接改变税局状态 |

## 4. 统计确认

| 页面动作 | 风险 | 数税云接口候选 | ERP 对应 | 验收 |
|---|---|---|---|---|
| 所属期/期间切换 | L0 | 统计确认网页端查询接口待抓 | `VatCreditPeriodPanel` + dashboard | 期间变化刷新进项税额、留抵、认证批次 |
| 统计汇总查询 | L0 | 用途/统计查询接口待抓 | `/api/tax-invoices/records/dashboard` | 来源为进项池和本地确认台账 |
| 确认/撤销确认 | L3 | 待抓真实接口 | 当前不得真实提交 | 只允许展示或 ERP 本地流程，真实确认必须单独审批 |
| 留抵台账 | L0/L1 | 数税云底层票据 + ERP 测算 | ERP 留抵测算 | 明确“测算留抵”，不冒充税局最终余额 |

## 5. 认证结果

| 页面动作 | 风险 | 数税云接口候选 | ERP 对应 | 验收 |
|---|---|---|---|---|
| 认证结果列表 | L0 | `ynfp.invoice.pool.list.query` + 认证状态字段 | `/api/tax-invoices/records/list` direction=purchase | 已认证/未认证/转出可筛选 |
| 批次结果查询 | L0 | 用途状态/认证结果接口待抓 | `/api/tax-invoices/records/certification-batches` | ERP 批次和发票明细可互查 |
| 供应商/入库/金蝶反查 | L0/L1 | ERP 内部 | `/api/tax-invoices/records/business-reconcile`、`/records/reconcile` | 每张进项票可看供应商、入库、凭证 |
| 结果导出 | L1 | 网页端导出接口待抓 | ERP 导出后置 | 导出字段和页面列一致 |

## 6. 分析看板 6 页

分析看板不能再写成一个笼统页面，必须保留 6 个独立子页面口径。

| 数税云页面 | 页面动作 | 风险 | ERP 对应 | 验收 |
|---|---|---|---|---|
| 按税率统计 | 税率分桶、金额/税额/票数统计、下钻 | L0 | `/api/tax-invoices/records/dashboard` + `taxRateBuckets` | 13%、9%、6%、免税等分桶不丢 |
| 按发票种类统计 | 票种分桶、下钻 | L0 | dashboard + invoiceType buckets | 数电专票/普票等票种可拆 |
| 按上下游企业统计 | 客户/供应商排行、下钻 | L0 | dashboard + counterparty buckets | 销项看客户，进项看供应商 |
| 按进销商品统计 | 商品排行、下钻 | L0 | dashboard + goods buckets | 商品名称未知要进完整性提醒 |
| 按进销趋势统计 | 月/日趋势、销项/进项切换 | L0 | dashboard + trend buckets | 趋势不和税率/票种混为一页 |
| 按进销地区统计 | 地区排行、下钻 | L0 | dashboard + region buckets | 地区来源不足时显示识别率 |

## 额度接口补充

手工开票页右上角额度来自数税云网页端接口：

```text
GET /prod-api/bussiness/credit/creditInfo/1
```

示例回执：

```json
{
  "msg": "操作成功",
  "code": 200,
  "data": {
    "remainCreditAmount": "3372369.76",
    "creditAmount": "10303435.35"
  }
}
```

ERP 对应接口：`GET /api/tax-invoices/issue-credit?type=1`。线上必须配置数税云网页端登录态，后端才能代理读取。未配置时页面只能显示 `--`，不得写死假额度。

## 本轮验收结论

- 33 个页面的页面层采集已完成。
- 非手工 P0 的 11 个页面已经形成动作级复核矩阵。
- 真正的 Network 请求仍需在 Chrome 登录态下逐动作补录；本文件已经给出补录清单和风险边界。
- ERP 当前只能优先落 L0/L1/L2 查询、下载、查验、同步任务；L3/L4 全部默认禁止直连。
