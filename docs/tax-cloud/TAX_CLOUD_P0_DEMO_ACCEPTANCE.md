# 数税云 P0 demo 验收手册

更新时间：2026-06-29

## 目标

把非手工开票 P0 页面从“已经采集”推进到“可以验收、可以分派 ERP 落地”的状态。

手工开票页已经可用并冻结为票面基线，本手册不再重跑票面，只保留接口和回归保护要求。

## 当前交付

| 交付物 | 路径 | 状态 |
|---|---|---|
| P0 demo 总览页 | `tax-cloud-ui-demos/index.html` | 已生成 |
| P0 动作复核矩阵 | `docs/tax-cloud/TAX_CLOUD_P0_INTERFACE_ACTION_AUDIT.md` | 已生成 |
| P0 页面 spec | `docs/tax-cloud/pages/*.page.md` | 非手工 P0 11 页已生成 |
| 缺口台账 | `docs/tax-cloud/TAX_CLOUD_GAP_LEDGER.md` | 已更新 |
| ERP 映射 | `docs/tax-cloud/TAX_CLOUD_TO_ERP_MAPPING.md` | 待本轮同步更新 |

## P0 页面范围

| # | 页面 | key | 采集 | spec | demo | 接口动作矩阵 | ERP 映射 |
|---:|---|---|---|---|---|---|---|
| 1 | 开票记录 | `platform-records` | done | done | done | done | mapped |
| 2 | 发票池 | `billCenter-fullInvoiceQuery` | done | done | done | done | mapped |
| 3 | 手工勾选 | `income-invoiceCheck` | done | done | done | done | mapped |
| 4 | 统计确认 | `income-confirmSign` | done | done | done | done | mapped |
| 5 | 认证结果 | `income-certificationResults` | done | done | done | done | mapped |
| 6 | 按税率统计 | `analysisBoard-invoceRateView` | done | done | done | done | mapped |
| 7 | 按发票种类统计 | `analysisBoard-invoiceTypeView` | done | done | done | done | mapped |
| 8 | 按上下游企业统计 | `analysisBoard-businessRateView` | done | done | done | done | mapped |
| 9 | 按进销商品统计 | `analysisBoard-goodsRateView` | done | done | done | done | mapped |
| 10 | 按进销趋势统计 | `analysisBoard-purchaseSalesTrend` | done | done | done | done | mapped |
| 11 | 按进销地区统计 | `analysisBoard-invoiceRegionView` | done | done | done | done | mapped |

## 验收方法

### 1. 页面层验收

每个 P0 页面必须满足：

- 有 `raw.json`
- 有 `visible-dom.json`
- 有 `screenshots/*-fullpage.png`
- 有 `pages/*.page.md`
- 在 `tax-cloud-ui-demos/index.html` 中有入口和截图卡片

验收命令：

```bash
find docs/tax-cloud/pages -name '*.page.md' | wc -l
find docs/tax-cloud/screenshots -name '*-fullpage.png' | wc -l
```

预期：

- 页面 spec 至少 12 个：手工开票 1 个 + 非手工 P0 11 个
- 全页截图 33 个

### 2. 接口动作验收

每个 P0 页面必须满足：

- 页面按钮和 Tab 已列入动作矩阵
- 每个动作有风险等级
- 每个动作有数税云接口候选或“待真实 Network”
- 每个动作有 ERP adapter 方向或“暂不开放”

验收文件：

```text
docs/tax-cloud/TAX_CLOUD_P0_INTERFACE_ACTION_AUDIT.md
```

未通过条件：

- 只写“接口待补”，没有按钮动作清单
- 只写接口名，没有风险等级
- L3/L4 动作没有门禁说明

### 3. ERP 映射验收

每个 P0 页面必须说明：

- ERP 入口
- 数据来源
- 和合同、出库、入库、客户、供应商、金蝶的关系
- 是否只读查询
- 是否允许真实税务动作

验收文件：

```text
docs/tax-cloud/TAX_CLOUD_TO_ERP_MAPPING.md
```

### 4. demo 验收

打开：

```text
tax-cloud-ui-demos/index.html
```

逐项检查：

- 11 个非手工 P0 页面全部出现
- 每个页面都显示数税云原始截图
- 每个页面都显示当前状态
- L3/L4 风险有显式标记
- 手工开票被标记为“冻结为基线”，没有进入重跑范围

### 5. 完成定义

本阶段算完成的条件：

```text
页面采集完整
P0 spec 完整
P0 demo 总览完整
P0 动作矩阵完整
ERP 映射口径完整
剩余缺口明确
```

本阶段不代表全部完成：

```text
Chrome Network 逐按钮实抓未完成
P0 ERP adapter 未全部接入
P1/P2/P3 demo 未全部生成
L3/L4 真实动作仍禁止直连
```

## 下一步队列

1. 用 Chrome 登录态逐按钮补抓 P0 Network。
2. 把 P0 查询类接口先接 ERP adapter。
3. 给 P0 页面补默认态、有数据态、空态、错误态截图。
4. 继续生成 P1 页面 spec 和 demo。
5. 逐字段补 ERP / 数税云 / 金蝶数据血缘。
