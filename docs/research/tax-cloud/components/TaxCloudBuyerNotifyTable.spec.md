# TaxCloudBuyerNotifyTable Specification

## Overview

- Target page: `https://fp.enuoyun.com/platform/created`
- Screenshot: `docs/tax-cloud/screenshots/platform-created-fullpage.png`
- ERP target: buyer + notification block in `DigitalInvoiceSlipForm`
- Interaction model: editable buyer fields plus customer-library picker and display toggles

## Required Table Structure

This must be a single merged table-like structure. Do not split into unrelated flex rows.

Rows: 4 fixed rows.

Columns:

1. Buyer vertical label: `购 买 方`, rowSpan `4`
2. Buyer field label column
3. Buyer main value column
4. Buyer secondary label column
5. Buyer secondary value/action column
6. Buyer action column
7. Notify vertical label: `通 知 到`, rowSpan `4`
8. Notify field label column
9. Notify value column

Row layout:

| Row | Buyer side | Notify side |
|---|---|---|
| 1 | `名 称 ：` + buyer name + customer library + `延用` | `手机号码 ：` |
| 2 | `纳税人识别号 ：` + buyer tax number | `邮箱地址 ：` |
| 3 | `地 址 ：` + address + `电 话 ：` + tel + `展示` | `抄送手机 ：` |
| 4 | `开户行名称 ：` + bank + `银行账号 ：` + account + `展示` | `抄送邮箱 ：` |

## Measured Values

From 数税云 capture:

- Whole buyer/notify block height: `120px`
- Row height: `30px`
- Outer border: `#9e5309`, strong brown
- Inner horizontal divider: light grey `#e4e7ed`
- Vertical label width: about `21px`
- Text size: `13px`

ERP current structural target:

- Table row heights: `~30.2px`
- Total table height: `~121.8px`
- `rowSpan`: first cell `1/4`, notify cell `1/4`

## Text Alignment Rules

- Field labels are right aligned.
- Colons are vertically aligned on a shared x-axis.
- Required asterisks are not shown in ERP mimic.
- Amount and number fields in later tables are right aligned; this buyer table text remains left/value aligned.

## Interaction States

- `客户库` opens buyer profile selector.
- `延用` reuses matched buyer profile.
- Address/tel display checkbox toggles whether buyer address and phone appear on invoice.
- Bank display checkbox toggles whether buyer bank and account appear on invoice.

## Acceptance

- The buyer and notify areas share one continuous outer border.
- `通 知 到` is a vertical merged cell, not a separate floating label.
- Row height stays fixed at `30px`; no row can expand with content.
- Labels and colons align exactly down each field group.
