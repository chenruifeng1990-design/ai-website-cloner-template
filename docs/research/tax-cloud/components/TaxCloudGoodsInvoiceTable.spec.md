# TaxCloudGoodsInvoiceTable Specification

## Overview

- Target page: `https://fp.enuoyun.com/platform/created`
- Screenshot: `docs/tax-cloud/screenshots/platform-created-fullpage.png`
- ERP target: goods detail table in `DigitalInvoiceSlipForm`
- Interaction model: editable line items, tax-code lookup, add/remove line actions

## Required Table Structure

Use one table with 10 physical columns:

1. Index
2. `简称·项目名称`
3. `规格型号`
4. `单位`
5. `数量`
6. `单价`
7. `金额`
8. `税率/征收率`
9. `税额`
10. `操作`

Rows:

1. Header row, height about `25-26px`
2. Active/editable line row, height `26px`, background light cyan `#e9fbff`
3. Blank row, height `26px`
4. Blank row, height `26px`
5. Total row, height `30px`
6. Upper/lowercase amount row, height `30px`

## Merge Rules

Total row:

- First cell `colSpan=6`, label `合  计`
- Amount value in amount column
- Tax rate column blank
- Tax amount value in tax amount column
- Operation column blank

Amount row:

- First cell `colSpan=2`, label `价税合计（大写）`
- Middle cell `colSpan=5`, uppercase RMB value
- Right cell `colSpan=3`, lowercase RMB value

## Measured Values

From 数税云 capture:

- Main detail table: `1471 x 164`
- Header tr: `1471 x 26`
- Active current row: `1471 x 26`
- Whole ERP target after fix: `~163.9px`

Captured text skeleton:

```text
简称·项目名称 规格型号 单位 数量 单价 金额 税率/征收率 税额 操作
1
合计 ￥ ￥
价税合计（大写） （小写）￥
```

## Alignment Rules

- Header text centered.
- Index column centered.
- Product name left aligned.
- Quantity, unit price, amount, and tax amount right aligned.
- Currency symbol and numeric values must use consistent baseline.
- Do not let extra DOM accessibility columns create visual duplicate totals.

## ERP Binding

- Product line values come from contract/outbound source facts.
- Tax code is required before preview/approval.
- `金额` is tax-included line amount in current business draft, while total row must show tax-free amount and tax amount separately.

## Acceptance

- Row/colspan exactly match this spec.
- Blank rows preserve table height even with one line.
- Total row and amount row align with 数税云's merged-cell boundaries.
