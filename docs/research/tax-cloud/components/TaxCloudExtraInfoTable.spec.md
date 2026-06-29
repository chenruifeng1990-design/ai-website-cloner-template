# TaxCloudExtraInfoTable Specification

## Overview

- Target page: `https://fp.enuoyun.com/platform/created`
- Screenshot: `docs/tax-cloud/screenshots/platform-created-fullpage.png`
- ERP target: extra info block below seller/remark table
- Interaction model: optional scene template and add-extra-content action

## DOM Structure

This section is part of the invoice canvas below seller/remark:

- Header row: `附加信息`
- Body row:
  - `场景模板`
  - scene template select
  - `+ 添加附加内容` dashed button

## Measured Values

From target visual:

- Header is one full-width row with brown top/bottom borders.
- Body is a white block, about `88-110px` high depending viewport.
- Scene template select is small, left aligned.
- Add button is a dashed rectangle spanning most of the content width.

## Visual Rules

- Keep the same outer brown border as the invoice body.
- Header text centered and brown.
- Body inputs use light grey border and placeholder color.
- Button uses dashed border, neutral grey text.

## ERP Binding

- Scene template can remain a placeholder until 数税云 scene-template API is mapped.
- Add-extra-content should remain disabled or local-only unless backend payload supports it.

## Acceptance

- This block remains attached to the invoice canvas.
- It must not be rendered as a floating card.
- Horizontal borders align with the table above.
