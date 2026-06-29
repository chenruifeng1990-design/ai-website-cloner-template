# TaxCloudFooterActors Specification

## Overview

- Target page: `https://fp.enuoyun.com/platform/created`
- Screenshot: `docs/tax-cloud/screenshots/platform-created-fullpage.png`
- ERP target: footer actor fields under invoice canvas
- Interaction model: editable text/select fields

## DOM Structure

Footer fields are outside the invoice table border:

- `收款人：`
- `复核人：`
- `开票人：`
- `经办人：`
- `经办人证件：`
- `证件号码：`

## Measured Values

From target visual:

- Fields are laid out in one row at desktop.
- Input height about `28-32px`.
- Label color brown `#9e5309`.
- Input border is light grey or underline-style, depending field.

## ERP Binding

- `开票人` defaults to `郭静云` in current system data.
- `收款人`, `复核人`, `经办人`, `证件类型`, `证件号码` remain manually editable.
- These fields must be included in preview hash so approval locks the exact invoice data.

## Acceptance

- Footer remains outside invoice canvas border.
- Labels align on baseline.
- Empty fields use 数税云 placeholder style.
- Changing any footer field marks draft dirty and requires re-preview before approval.
