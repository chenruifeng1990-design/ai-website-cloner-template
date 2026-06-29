# TaxCloudIssueQuotaHeader Specification

## Overview

- Target page: `https://fp.enuoyun.com/platform/created`
- Screenshot: `docs/tax-cloud/screenshots/platform-created-fullpage.png`
- ERP target: `DigitalInvoiceSlipForm` header area
- Interaction model: static display plus manual refresh

## DOM Structure

The header has three visual zones:

- Left: order number input
- Center: invoice type select `数电票（增值税专用发票）`
- Right: credit block

Credit block text:

- `开票总额度：`
- `可用总额度：`
- `开票账号：`
- refresh button `更新`

## Measured Values

From captured 数税云 page:

- Order input: `220 x 36`
- Invoice type select: visually centered, about `410px` wide and `50px` high in ERP mimic
- Credit area: right aligned, label color brown `#9e5309`
- Refresh button: blue, small, beside credit line group

## Visual Rules

- Invoice title box is centered between order input and credit area.
- Credit labels are stacked vertically and left aligned within the right block.
- Numeric credit values are plain text, not form inputs.
- Empty values in ERP display as `--`, but only when backend platform credit config is unavailable.

## Data Binding

ERP fields:

- `creditAmount`
- `remainCreditAmount`
- `invoiceAccount`

Backend source:

- `/api/tax-invoices/issue-credit`
- `TaxInvoiceService.getIssueBootstrap()`
- `ENUOYUN_PLATFORM_TOKEN`, or `ENUOYUN_PLATFORM_USERNAME` + `ENUOYUN_PLATFORM_PASSWORD`

## Acceptance

- Credit area position matches target.
- Clicking `授信额度` or `更新` refreshes the same credit snapshot.
- If values are `--`, UI must surface a backend configuration gap, not silently imply zero quota.
