# TaxCloudSellerRemarkTable Specification

## Overview

- Target page: `https://fp.enuoyun.com/platform/created`
- Screenshot: `docs/tax-cloud/screenshots/platform-created-fullpage.png`
- ERP target: seller + remark block in `DigitalInvoiceSlipForm`
- Interaction model: seller data mostly fixed, display toggles editable

## Required Table Structure

Rows: 4 fixed rows.

Columns:

1. Seller vertical label: `销 售 方`, rowSpan `4`
2. Seller field label column
3. Seller main value column
4. Seller secondary label column
5. Seller secondary value/action column
6. Seller action column
7. Remark vertical label: `备 注`, rowSpan `4`
8. Remark textarea, rowSpan `4`

Row layout:

| Row | Seller side | Remark side |
|---|---|---|
| 1 | `名 称 ：` + seller name | remark textarea begins |
| 2 | `纳税人识别号 ：` + seller tax number | textarea continues |
| 3 | `地 址 ：` + seller address + `电 话 ：` + seller tel + `展示` | textarea continues |
| 4 | `开户行名称 ：` + seller bank + `开户行账号 ：` + seller account + `展示` | textarea continues |

## Measured Values

- Whole seller/remark block height: `120px`
- Row height: `30px`
- ERP current structural target after fix: `~121.8px`
- Seller and remark areas share a single continuous table border.

## Text Rules

- Seller field labels right aligned.
- Colons aligned vertically.
- Remark text area starts near top-left, not centered.
- Seller values are normal grey/black text, disabled fields are visually quiet.

## ERP Binding

- Seller name: fixed company name.
- Seller tax number: fixed company tax number.
- Address/tel/bank/account should come from company config or issue draft extras.
- Remark should include source bill trace, but not duplicate fields if 数税云 API payload already carries seller fields.

## Acceptance

- `备 注` is a merged vertical cell.
- Remark textarea spans four seller rows.
- Seller row heights stay fixed; long content should truncate/clip rather than expand the table.
