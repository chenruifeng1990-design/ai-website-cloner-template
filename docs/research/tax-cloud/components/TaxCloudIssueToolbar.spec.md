# TaxCloudIssueToolbar Specification

## Overview

- Target page: `https://fp.enuoyun.com/platform/created`
- Screenshot: `docs/tax-cloud/screenshots/platform-created-fullpage.png`
- ERP target: `client/src/pages/InvoiceRegistrationPage/DigitalInvoiceSlipForm.tsx`
- Interaction model: click-driven toolbar actions, with disabled states controlled by validation and approval gates

## DOM Structure

Toolbar sits above the invoice canvas and is independent from the invoice table.

Observed controls:

- `含税`
- `待开发票`
- `清单导入`
- `折扣`
- `普通开具`
- `差额`
- `减按征收`
- `复制`
- `草稿箱`
- `暂存草稿`
- `预览发票`
- `提交开票`
- `授信额度`
- more menu `...`

## Measured Values

From `docs/tax-cloud/captures/platform-created.raw.json`:

- `含税`: `58 x 30`, y `82`
- `待开发票`: `84 x 33`, y `82`
- Select controls: `120 x 32`
- Order input: `220 x 36`
- Toolbar button height: `30-33px`

## Visual Rules

- Buttons use small rounded rectangle styling, light grey border, white background.
- Primary right-side buttons use blue fills.
- Disabled buttons keep position and size, but opacity/light blue state changes.
- Left action group and right submit group must remain on one row at desktop width.

## States & Behaviors

- `含税`: selected by default, blue outline/check state.
- `折扣` and `提交开票`: disabled when invoice data is incomplete.
- `预览发票`: disabled until validation passes.
- `授信额度`: active action, should refresh credit area.

## ERP Binding

- `预览发票`: calls draft preview and locks preview hash.
- `提交开票`: in ERP must submit Feishu approval first, not directly issue tax invoice.
- `授信额度`: maps to `/api/tax-invoices/issue-credit`; requires server `ENUOYUN_PLATFORM_*` config.
- `开票申请单` old ERP module must not be revived.

## Acceptance

- Button order and relative spacing match 数税云.
- Disabled/active button states visible.
- No toolbar action can bypass ERP approval and server real-issue gates.
