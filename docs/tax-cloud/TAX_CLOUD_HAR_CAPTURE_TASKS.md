# 数税云 HAR 采集任务清单

生成时间：2026-06-30T01:08:34.300Z

## 口径

- 手工开票 `platform-created` 已冻结为票面基线，本清单不再要求重跑页面复刻。
- 本清单覆盖剩余 32 个非手工页面。
- 原始 HAR 只放在 `docs/tax-cloud/network-har/`，该目录已忽略 `*.har`，不得提交原始 Cookie/token。
- “源码候选接口”来自 `docs/tax-cloud/apis/static-js-endpoints.json`，只能用于指导补采，不能替代真实 HAR。
- 每采完一批 HAR 后执行：

```bash
npm run tax-cloud:har:parse-all
npm run tax-cloud:har:tasks
npm run tax-cloud:audit
```

## 汇总

| 项目 | 数量 |
|---|---:|
| 待采非手工页面 | 32 |
| 页面动作任务 | 40 |
| 非默认 HAR 采集候选 | 54 |
| 已有 HAR 证据页面 | 32 |
| 缺 HAR 证据页面 | 0 |

## 页面级进度

| 优先级 | pageKey | 菜单 | 建议 HAR 数 | 证据状态 | URL |
|---|---|---|---:|---|---|
| P1 | `platform-scanCode` | 销项管理/扫码开票 | 2 | done(1) | https://fp.enuoyun.com/platform/scanCode |
| P1 | `platform-scanRecords` | 销项管理/扫码记录 | 3 | done(1) | https://fp.enuoyun.com/platform/scanRecords |
| P0 | `platform-records` | 销项管理/开票记录 | 1 | done(1) | https://fp.enuoyun.com/platform/records |
| P1 | `platform-billIssue` | 销项管理/订单开票 | 2 | done(1) | https://fp.enuoyun.com/platform/billIssue |
| P1 visual-only | `platform-invoiceApplication` | 销项管理/开票申请单 | 1 | done(1) | https://fp.enuoyun.com/platform/invoiceApplication |
| P1，高风险后置 | `platform-redMark` | 销项管理/红字确认单 | 1 | done(1) | https://fp.enuoyun.com/platform/redMark |
| P1，高风险动作 | `income-scanCodeCheck` | 进项管理/快捷勾选 | 1 | done(1) | https://fp.enuoyun.com/income/scanCodeCheck |
| P0 | `income-invoiceCheck` | 进项管理/手工勾选 | 1 | done(1) | https://fp.enuoyun.com/income/invoiceCheck |
| P1 | `income-confirmCheck` | 进项管理/勾选审核 | 2 | done(1) | https://fp.enuoyun.com/income/confirmCheck |
| P0 | `income-confirmSign` | 进项管理/统计确认 | 1 | done(1) | https://fp.enuoyun.com/income/confirmSign |
| P0 | `income-certificationResults` | 进项管理/认证结果 | 1 | done(1) | https://fp.enuoyun.com/income/certificationResults |
| P0 | `billCenter-fullInvoiceQuery` | 票据中心/发票池 | 1 | done(1) | https://fp.enuoyun.com/billCenter/fullInvoiceQuery |
| P1，高风险后置 | `billCenter-sign` | 票据中心/签收 | 2 | done(1) | https://fp.enuoyun.com/billCenter/sign |
| P1 | `billCenter-invoiceVerification` | 票据中心/查验 | 1 | done(1) | https://fp.enuoyun.com/billCenter/invoiceVerification |
| P1 | `billCenter-accessSetting` | 票据中心/取票设置 | 1 | done(1) | https://fp.enuoyun.com/billCenter/accessSetting |
| P1 | `billCenter-taskManagement` | 票据中心/任务管理 | 2 | done(1) | https://fp.enuoyun.com/billCenter/taskManagement |
| P0 | `analysisBoard-invoceRateView` | 分析看板/按税率统计 | 1 | done(1) | https://fp.enuoyun.com/analysisBoard/invoceRateView |
| P0 | `analysisBoard-invoiceTypeView` | 分析看板/按发票种类统计 | 1 | done(1) | https://fp.enuoyun.com/analysisBoard/invoiceTypeView |
| P0 | `analysisBoard-businessRateView` | 分析看板/按上下游企业统计 | 1 | done(1) | https://fp.enuoyun.com/analysisBoard/businessRateView |
| P0 | `analysisBoard-goodsRateView` | 分析看板/按进销商品统计 | 1 | done(1) | https://fp.enuoyun.com/analysisBoard/goodsRateView |
| P0 | `analysisBoard-purchaseSalesTrend` | 分析看板/按进销趋势统计 | 1 | done(1) | https://fp.enuoyun.com/analysisBoard/purchaseSalesTrend |
| P0 | `analysisBoard-invoiceRegionView` | 分析看板/按进销地区统计 | 1 | done(1) | https://fp.enuoyun.com/analysisBoard/invoiceRegionView |
| P2 | `bussiness-info` | 基础信息/商品信息 | 1 | done(1) | https://fp.enuoyun.com/bussiness/info |
| P2 | `bussiness-customer` | 基础信息/客户管理 | 1 | done(1) | https://fp.enuoyun.com/bussiness/customer |
| P2 | `bussiness-credit` | 基础信息/开票额度配置 | 2 | done(1) | https://fp.enuoyun.com/bussiness/credit |
| P2/P3 | `bussiness-configurationManagement` | 基础信息/配置管理 | 1 | done(1) | https://fp.enuoyun.com/bussiness/configurationManagement |
| P3 | `system-dept` | 系统设置/组织管理 | 1 | done(1) | https://fp.enuoyun.com/system/dept |
| P3 | `system-departmentInfo` | 系统设置/部门管理 | 1 | done(1) | https://fp.enuoyun.com/system/departmentInfo |
| P3 | `system-role` | 系统设置/角色管理 | 1 | done(1) | https://fp.enuoyun.com/system/role |
| P2 | `system-onlineTaxationInfo` | 系统设置/网上办税信息 | 1 | done(1) | https://fp.enuoyun.com/system/onlineTaxationInfo |
| P3 | `system-user` | 系统设置/用户管理 | 1 | done(1) | https://fp.enuoyun.com/system/user |
| P1 | `downloadCenter` | 顶部入口/下载中心 | 1 | done(1) | https://fp.enuoyun.com/downloadCenter |

## 逐页采集任务

### P1 · 销项管理/扫码开票 · `platform-scanCode`

- URL：https://fp.enuoyun.com/platform/scanCode
- page spec：`docs/tax-cloud/pages/platform-scanCode.page.md`
- 当前证据：
  - `platform-scanCode.default-list.har-normalized.json`：1 条接口，risk={"L0-candidate":1}
- 源码候选接口：
  - `/bussiness/scanInvoice/getScanInvoiceInfo`（app~ea1f58e8-191e777b.js）
  - `/bussiness/scanInvoice/getScanInvoiceBillInfo`（app~ea1f58e8-191e777b.js）
  - `/bussiness/scanInvoice/getOuterPdfBase64`（app~ea1f58e8-191e777b.js）
  - `/bussiness/scanInvoice/H5CommitIssue`（app~ea1f58e8-191e777b.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `platform-scanCode.default.har` | default | manual review | 扫码链接/二维码生成：待真实 Network 补抓，L2。 |
| 2 | `platform-scanCode.default-list.har` | default-list | L0 query | 扫码记录查询：和 `platform-scanRecords` 联动，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1 · 销项管理/扫码记录 · `platform-scanRecords`

- URL：https://fp.enuoyun.com/platform/scanRecords
- page spec：`docs/tax-cloud/pages/platform-scanRecords.page.md`
- 当前证据：
  - `platform-scanRecords.default-list.har-normalized.json`：1 条接口，risk={"L0-candidate":1}
- 源码候选接口：
  - `/bussiness/scanInvoice/getClientDateByCode`（app~ea1f58e8-191e777b.js）
  - `/bussiness/scanInvoice/getClientGuess`（app~ea1f58e8-191e777b.js）
  - `/bussiness/scanInvoice/invoiceDelivery`（app~ea1f58e8-191e777b.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `platform-scanRecords.default-list.har` | default-list | L0 query | 扫码记录列表：待真实 Network 补抓，L0。 |
| 2 | `platform-scanRecords.detail.har` | detail | L0 query | 扫码记录详情：待真实 Network 补抓，L0。 |
| 3 | `platform-scanRecords.download.har` | download | L2 review | 导出：待真实 Network 补抓，L1。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 销项管理/开票记录 · `platform-records`

- URL：https://fp.enuoyun.com/platform/records
- page spec：`docs/tax-cloud/pages/platform-records.page.md`
- 当前证据：
  - `platform-records.default-list.har-normalized.json`：32 条接口，risk={"L0-candidate":30,"L2-review":2}
- 源码候选接口：
  - 暂无静态 JS 候选接口。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `platform-records.default-list.har` | default-list | L0 query | 默认页面加载/列表查询：需要抓取首屏接口，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1 · 销项管理/订单开票 · `platform-billIssue`

- URL：https://fp.enuoyun.com/platform/billIssue
- page spec：`docs/tax-cloud/pages/platform-billIssue.page.md`
- 当前证据：
  - `platform-billIssue.default-list.har-normalized.json`：1 条接口，risk={"L0-candidate":1}
- 源码候选接口：
  - `/bussiness/billIssue/`（app~493df0b3-12426db9.js）
  - `/bussiness/bizBillInfo/findDraftList`（app~493df0b3-12426db9.js）
  - `/bussiness/bizBillInfo/stagingOrder`（app~493df0b3-12426db9.js）
  - `/bussiness/bizBillInfo/issue`（app~493df0b3-12426db9.js）
  - `/bussiness/bizBillInfo/allElectricInvoice/issue`（app~493df0b3-12426db9.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `platform-billIssue.action-review.har` | action-review | manual review | 数税云订单开票配置/引导态：待真实 Network 补抓，L0/L1。 |
| 2 | `platform-billIssue.default-list.har` | default-list | L0 query | 数税云订单列表：需要完成前置配置后再补抓，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1 visual-only · 销项管理/开票申请单 · `platform-invoiceApplication`

- URL：https://fp.enuoyun.com/platform/invoiceApplication
- page spec：`docs/tax-cloud/pages/platform-invoiceApplication.page.md`
- 当前证据：
  - `platform-invoiceApplication.default-list.har-normalized.json`：1 条接口，risk={"L0-candidate":1}
- 源码候选接口：
  - `/deliveryWithGoods/list`（app~3d9b8e9e-29842089.js）
  - `/deliveryWithGoods/detail`（app~3d9b8e9e-29842089.js）
  - `/deliveryWithGoods/search`（app~3d9b8e9e-29842089.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `platform-invoiceApplication.default-list.har` | default-list | L0 query | 数税云申请单列表：待真实 Network 补抓，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1，高风险后置 · 销项管理/红字确认单 · `platform-redMark`

- URL：https://fp.enuoyun.com/platform/redMark
- page spec：`docs/tax-cloud/pages/platform-redMark.page.md`
- 当前证据：
  - `platform-redMark.default-list.har-normalized.json`：1 条接口，risk={"L3-review":1}
- 源码候选接口：
  - `/bussiness/redConfirmInfo/list`（app~493df0b3-12426db9.js）
  - `/bussiness/redConfirmInfo/queryBlue`（app~493df0b3-12426db9.js）
  - `/bussiness/redConfirmInfo/commit`（app~493df0b3-12426db9.js）
  - `/bussiness/redConfirmInfo/batchConfirm`（app~493df0b3-12426db9.js）
  - `/bussiness/redConfirmInfo/sync`（app~493df0b3-12426db9.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `platform-redMark.default-list.har` | default-list | L0 query | 默认页面加载/列表查询：需要抓取首屏接口，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1，高风险动作 · 进项管理/快捷勾选 · `income-scanCodeCheck`

- URL：https://fp.enuoyun.com/income/scanCodeCheck
- page spec：`docs/tax-cloud/pages/income-scanCodeCheck.page.md`
- 当前证据：
  - `income-scanCodeCheck.default-list.har-normalized.json`：20 条接口，risk={"L0-candidate":18,"L2-review":2}
- 源码候选接口：
  - 暂无静态 JS 候选接口。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `income-scanCodeCheck.action-review.har` | action-review | manual review | 快捷勾选提交：待真实 Network 补抓，L3。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 进项管理/手工勾选 · `income-invoiceCheck`

- URL：https://fp.enuoyun.com/income/invoiceCheck
- page spec：`docs/tax-cloud/pages/income-invoiceCheck.page.md`
- 当前证据：
  - `income-invoiceCheck.default-list.har-normalized.json`：30 条接口，risk={"L0-candidate":25,"L2-review":3,"L3-review":2}
- 源码候选接口：
  - 暂无静态 JS 候选接口。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `income-invoiceCheck.action-review.har` | action-review | manual review | 勾选/不抵扣类动作：需重新确认真实接口，按 L3 预设。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1 · 进项管理/勾选审核 · `income-confirmCheck`

- URL：https://fp.enuoyun.com/income/confirmCheck
- page spec：`docs/tax-cloud/pages/income-confirmCheck.page.md`
- 当前证据：
  - `income-confirmCheck.default-list.har-normalized.json`：23 条接口，risk={"L0-candidate":18,"L2-review":3,"L1-review":1,"L3-review":1}
- 源码候选接口：
  - 暂无静态 JS 候选接口。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `income-confirmCheck.default-list.har` | default-list | L0 query | 批次查询：待真实 Network 补抓，L0。 |
| 2 | `income-confirmCheck.action-review.har` | action-review | manual review | 审核/确认：待真实 Network 补抓，L3。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 进项管理/统计确认 · `income-confirmSign`

- URL：https://fp.enuoyun.com/income/confirmSign
- page spec：`docs/tax-cloud/pages/income-confirmSign.page.md`
- 当前证据：
  - `income-confirmSign.default-list.har-normalized.json`：19 条接口，risk={"L0-candidate":16,"L2-review":1,"L1-review":2}
- 源码候选接口：
  - 暂无静态 JS 候选接口。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `income-confirmSign.default-list.har` | default-list | L4/L3 review | 统计确认相关接口需通过 Network 补抓。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 进项管理/认证结果 · `income-certificationResults`

- URL：https://fp.enuoyun.com/income/certificationResults
- page spec：`docs/tax-cloud/pages/income-certificationResults.page.md`
- 当前证据：
  - `income-certificationResults.default-list.har-normalized.json`：35 条接口，risk={"L0-candidate":29,"L2-review":6}
- 源码候选接口：
  - 暂无静态 JS 候选接口。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `income-certificationResults.default-list.har` | default-list | L0 query | 默认页面加载/列表查询：需要抓取首屏接口，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 票据中心/发票池 · `billCenter-fullInvoiceQuery`

- URL：https://fp.enuoyun.com/billCenter/fullInvoiceQuery
- page spec：`docs/tax-cloud/pages/billCenter-fullInvoiceQuery.page.md`
- 当前证据：
  - `billCenter-fullInvoiceQuery.default-list.har-normalized.json`：1 条接口，risk={"L1-review":1}
- 源码候选接口：
  - 暂无静态 JS 候选接口。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `billCenter-fullInvoiceQuery.default-list.har` | default-list | L0 query | 默认页面加载/列表查询：需要抓取首屏接口，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1，高风险后置 · 票据中心/签收 · `billCenter-sign`

- URL：https://fp.enuoyun.com/billCenter/sign
- page spec：`docs/tax-cloud/pages/billCenter-sign.page.md`
- 当前证据：
  - `billCenter-sign.action-review.har-normalized.json`：1 条接口，risk={"L0-candidate":1}
- 源码候选接口：
  - `/invoicePool/signInvoices`（app~493df0b3-12426db9.js）
  - `/invoiceFolder/addFromPool`（app~493df0b3-12426db9.js）
  - `/inputtax/h51InputTax/confirmSign`（app~493df0b3-12426db9.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `billCenter-sign.action-review.har` | action-review | L0 query | 单张签收表单初始化：待真实 Network 补抓，L0。 |
| 2 | `billCenter-sign.default-list.har` | default-list | L0 query | 签收历史列表：待真实 Network 补抓，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1 · 票据中心/查验 · `billCenter-invoiceVerification`

- URL：https://fp.enuoyun.com/billCenter/invoiceVerification
- page spec：`docs/tax-cloud/pages/billCenter-invoiceVerification.page.md`
- 当前证据：
  - `billCenter-invoiceVerification.default-list.har-normalized.json`：1 条接口，risk={"L2-review":1}
- 源码候选接口：
  - `/invoicecheck/check/list/thirdPlatform/dataList`（app~493df0b3-12426db9.js）
  - `/invoicecheck/check/list/thirdPlatform/getData`（app~493df0b3-12426db9.js）
  - `/invoicecheck/validate/code/value/`（app~493df0b3-12426db9.js）
  - `/reCheckInvoice`（app~493df0b3-12426db9.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `billCenter-invoiceVerification.default-list.har` | default-list | L0 query | 默认页面加载/列表查询：需要抓取首屏接口，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1 · 票据中心/取票设置 · `billCenter-accessSetting`

- URL：https://fp.enuoyun.com/billCenter/accessSetting
- page spec：`docs/tax-cloud/pages/billCenter-accessSetting.page.md`
- 当前证据：
  - `billCenter-accessSetting.sync.har-normalized.json`：1 条接口，risk={"L1-review":1}
- 源码候选接口：
  - `/invoicecenter/sjruzhang/getSjruzhangSetting`（app~493df0b3-12426db9.js）
  - `/invoicecenter/sjruzhang/saveSjruzhangSetting`（app~493df0b3-12426db9.js）
  - `/invoicecenter/sjruzhang/restartTask`（app~493df0b3-12426db9.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `billCenter-accessSetting.sync.har` | sync | L0 query | 取票设置读取：`/invoicecenter/sjruzhang/getSjruzhangSetting` 候选，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1 · 票据中心/任务管理 · `billCenter-taskManagement`

- URL：https://fp.enuoyun.com/billCenter/taskManagement
- page spec：`docs/tax-cloud/pages/billCenter-taskManagement.page.md`
- 当前证据：
  - `billCenter-taskManagement.default-list.har-normalized.json`：1 条接口，risk={"L2-review":1}
- 源码候选接口：
  - `/system/taskRecord/list`（app~493df0b3-12426db9.js）
  - `/system/taskRecord/restart/`（app~493df0b3-12426db9.js）
  - `/invoicecenter/sjruzhang/getSjruzhangInfo`（app~493df0b3-12426db9.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `billCenter-taskManagement.default-list.har` | default-list | L0 query | 数据同步任务列表：`/system/taskRecord/list` 候选，L0。 |
| 2 | `billCenter-taskManagement.default-list-2.har` | default-list-2 | L0 query | 下载任务列表：切换下载任务 Tab 后待真实 Network 补抓，L0/L2。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 分析看板/按税率统计 · `analysisBoard-invoceRateView`

- URL：https://fp.enuoyun.com/analysisBoard/invoceRateView
- page spec：`docs/tax-cloud/pages/analysisBoard-invoceRateView.page.md`
- 当前证据：
  - `analysisBoard-invoceRateView.default-list.har-normalized.json`：1 条接口，risk={"L1-review":1}
- 源码候选接口：
  - 暂无静态 JS 候选接口。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `analysisBoard-invoceRateView.default-list.har` | default-list | L0 query | 数税云真实分析接口：待 Network 补抓。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 分析看板/按发票种类统计 · `analysisBoard-invoiceTypeView`

- URL：https://fp.enuoyun.com/analysisBoard/invoiceTypeView
- page spec：`docs/tax-cloud/pages/analysisBoard-invoiceTypeView.page.md`
- 当前证据：
  - `analysisBoard-invoiceTypeView.default-list.har-normalized.json`：1 条接口，risk={"L1-review":1}
- 源码候选接口：
  - 暂无静态 JS 候选接口。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `analysisBoard-invoiceTypeView.default-list.har` | default-list | L0 query | 数税云真实分析接口：待 Network 补抓。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 分析看板/按上下游企业统计 · `analysisBoard-businessRateView`

- URL：https://fp.enuoyun.com/analysisBoard/businessRateView
- page spec：`docs/tax-cloud/pages/analysisBoard-businessRateView.page.md`
- 当前证据：
  - `analysisBoard-businessRateView.default-list.har-normalized.json`：3 条接口，risk={"L0-candidate":1,"L1-review":2}
- 源码候选接口：
  - 暂无静态 JS 候选接口。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `analysisBoard-businessRateView.default-list.har` | default-list | L0 query | 数税云真实分析接口：待 Network 补抓。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 分析看板/按进销商品统计 · `analysisBoard-goodsRateView`

- URL：https://fp.enuoyun.com/analysisBoard/goodsRateView
- page spec：`docs/tax-cloud/pages/analysisBoard-goodsRateView.page.md`
- 当前证据：
  - `analysisBoard-goodsRateView.default-list.har-normalized.json`：2 条接口，risk={"L1-review":2}
- 源码候选接口：
  - 暂无静态 JS 候选接口。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `analysisBoard-goodsRateView.default-list.har` | default-list | L0 query | 数税云真实分析接口：待 Network 补抓。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 分析看板/按进销趋势统计 · `analysisBoard-purchaseSalesTrend`

- URL：https://fp.enuoyun.com/analysisBoard/purchaseSalesTrend
- page spec：`docs/tax-cloud/pages/analysisBoard-purchaseSalesTrend.page.md`
- 当前证据：
  - `analysisBoard-purchaseSalesTrend.default-list.har-normalized.json`：2 条接口，risk={"L1-review":2}
- 源码候选接口：
  - 暂无静态 JS 候选接口。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `analysisBoard-purchaseSalesTrend.default-list.har` | default-list | L0 query | 数税云真实分析接口：待 Network 补抓。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P0 · 分析看板/按进销地区统计 · `analysisBoard-invoiceRegionView`

- URL：https://fp.enuoyun.com/analysisBoard/invoiceRegionView
- page spec：`docs/tax-cloud/pages/analysisBoard-invoiceRegionView.page.md`
- 当前证据：
  - `analysisBoard-invoiceRegionView.default-list-2.har-normalized.json`：6 条接口，risk={"L1-review":6}
- 源码候选接口：
  - 暂无静态 JS 候选接口。

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `analysisBoard-invoiceRegionView.default-list.har` | default-list | L0 query | 数税云真实分析接口：待 Network 补抓。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P2 · 基础信息/商品信息 · `bussiness-info`

- URL：https://fp.enuoyun.com/bussiness/info
- page spec：`docs/tax-cloud/pages/bussiness-info.page.md`
- 当前证据：
  - `bussiness-info.default-list.har-normalized.json`：1 条接口，risk={"L0-candidate":1}
- 源码候选接口：
  - `/bussiness/bizGoodsInfo/selectBizGoodsInfoOuterList`（app~493df0b3-12426db9.js）
  - `/bussiness/bizGoodsInfo/getGoodsGuess`（app~493df0b3-12426db9.js）
  - `/system/kpm/getSpxxByKpmGoodsId`（app~493df0b3-12426db9.js）
  - `/system/kpm/checkKpmmcRepeat`（app~493df0b3-12426db9.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `bussiness-info.default-list.har` | default-list | L2 review | 商品列表/保存：待真实 Network 补抓，L1。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P2 · 基础信息/客户管理 · `bussiness-customer`

- URL：https://fp.enuoyun.com/bussiness/customer
- page spec：`docs/tax-cloud/pages/bussiness-customer.page.md`
- 当前证据：
  - `bussiness-customer.default-list.har-normalized.json`：1 条接口，risk={"L0-candidate":1}
- 源码候选接口：
  - `/bussiness/bizCustomer/selectBizCustomerInfoOutNotList`（app~493df0b3-12426db9.js）
  - `/bussiness/bizCustomer/getClientGuessIssue`（app~493df0b3-12426db9.js）
  - `/bussiness/bizCustomer/getClientDateByCodeIssue`（app~493df0b3-12426db9.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `bussiness-customer.default-list.har` | default-list | L2 review | 客户列表/详情/保存：待真实 Network 补抓，L1。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P2 · 基础信息/开票额度配置 · `bussiness-credit`

- URL：https://fp.enuoyun.com/bussiness/credit
- page spec：`docs/tax-cloud/pages/bussiness-credit.page.md`
- 当前证据：
  - `bussiness-credit.default-list.har-normalized.json`：1 条接口，risk={"L0-candidate":1}
- 源码候选接口：
  - `/bussiness/creditLine/query`（app~493df0b3-12426db9.js）
  - `/prod-api/bussiness/credit/creditInfo/1`（当前静态包未命中，保留人工复核）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `bussiness-credit.default.har` | default | manual review | `GET /prod-api/bussiness/credit/creditInfo/1`，L0。 |
| 2 | `bussiness-credit.default-2.har` | default-2 | manual review | ERP：`GET /api/tax-invoices/issue-credit?type=1`，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P2/P3 · 基础信息/配置管理 · `bussiness-configurationManagement`

- URL：https://fp.enuoyun.com/bussiness/configurationManagement
- page spec：`docs/tax-cloud/pages/bussiness-configurationManagement.page.md`
- 当前证据：
  - `bussiness-configurationManagement.default-list.har-normalized.json`：1 条接口，risk={"L0-candidate":1}
- 源码候选接口：
  - `/system/config/list`（app~493df0b3-12426db9.js）
  - `/system/config/configKey/`（app~493df0b3-12426db9.js）
  - `/system/config/clearCache`（app~493df0b3-12426db9.js）
  - `/bussiness/configurationManagement`（app~ea1f58e8-191e777b.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `bussiness-configurationManagement.default-list.har` | default-list | L2 review | 配置管理各 Tab 列表/保存：待真实 Network 补抓，L1/L2。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P3 · 系统设置/组织管理 · `system-dept`

- URL：https://fp.enuoyun.com/system/dept
- page spec：`docs/tax-cloud/pages/system-dept.page.md`
- 当前证据：
  - `system-dept.default-list.har-normalized.json`：1 条接口，risk={"L0-candidate":1}
- 源码候选接口：
  - `/system/dept/list`（app~493df0b3-12426db9.js）
  - `/system/dept/treeselect`（app~493df0b3-12426db9.js）
  - `/system/dept/getOneInfo`（app~493df0b3-12426db9.js）
  - `/system/dept/loginDeptList`（app~493df0b3-12426db9.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `system-dept.default-list.har` | default-list | L2 review | 组织列表/保存：待真实 Network 补抓，L1。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P3 · 系统设置/部门管理 · `system-departmentInfo`

- URL：https://fp.enuoyun.com/system/departmentInfo
- page spec：`docs/tax-cloud/pages/system-departmentInfo.page.md`
- 当前证据：
  - `system-departmentInfo.default-list.har-normalized.json`：1 条接口，risk={"L0-candidate":1}
- 源码候选接口：
  - `/system/departmentInfo/list`（app~493df0b3-12426db9.js）
  - `/system/departmentInfo/listByDeptIds`（app~493df0b3-12426db9.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `system-departmentInfo.default-list.har` | default-list | L2 review | 部门列表/保存：待真实 Network 补抓，L1。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P3 · 系统设置/角色管理 · `system-role`

- URL：https://fp.enuoyun.com/system/role
- page spec：`docs/tax-cloud/pages/system-role.page.md`
- 当前证据：
  - `system-role.default-list.har-normalized.json`：1 条接口，risk={"L0-candidate":1}
- 源码候选接口：
  - `/system/role`（当前静态包未命中，保留人工复核）
  - `/system/dept/roleDeptTreeselect/`（app~493df0b3-12426db9.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `system-role.default-list.har` | default-list | L0 query | 角色列表/权限树：待真实 Network 补抓，L1。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P2 · 系统设置/网上办税信息 · `system-onlineTaxationInfo`

- URL：https://fp.enuoyun.com/system/onlineTaxationInfo
- page spec：`docs/tax-cloud/pages/system-onlineTaxationInfo.page.md`
- 当前证据：
  - `system-onlineTaxationInfo.default-list.har-normalized.json`：1 条接口，risk={"L1-review":1}
- 源码候选接口：
  - `/system/bizOnlineTaxInformation/getOnlineTax`（当前静态包未命中，保留人工复核）
  - `/system/bizOnlineTaxInformation/selectBizOnlineTaxInfoList`（app~493df0b3-12426db9.js）
  - `/system/bizOnlineTaxInformation/getUserLoginInfoByDeptIdAndUserId`（app~493df0b3-12426db9.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `system-onlineTaxationInfo.default.har` | default | manual review | `/system/bizOnlineTaxInformation/getOnlineTax`，L0。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P3 · 系统设置/用户管理 · `system-user`

- URL：https://fp.enuoyun.com/system/user
- page spec：`docs/tax-cloud/pages/system-user.page.md`
- 当前证据：
  - `system-user.default-list.har-normalized.json`：1 条接口，risk={"L0-candidate":1}
- 源码候选接口：
  - `/system/user`（app~493df0b3-12426db9.js）
  - `/system/user/profile/avatar`（app~493df0b3-12426db9.js）
  - `/system/user/noviceGuide`（app~493df0b3-12426db9.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `system-user.default-list.har` | default-list | L2 review | 用户列表/保存/启停：待真实 Network 补抓，L1。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。

### P1 · 顶部入口/下载中心 · `downloadCenter`

- URL：https://fp.enuoyun.com/downloadCenter
- page spec：`docs/tax-cloud/pages/downloadCenter.page.md`
- 当前证据：
  - `downloadCenter.default-list.har-normalized.json`：1 条接口，risk={"L1-review":1}
- 源码候选接口：
  - `/download/template`（app~493df0b3-12426db9.js）
  - `/download/template/taskId`（app~493df0b3-12426db9.js）
  - `/download/XML/taskId`（app~493df0b3-12426db9.js）
  - `/invoicecenter/invoiceTemplate/v1/download/template`（app~ea1f58e8-191e777b.js）
  - `/invoicecenter/invoiceTemplate/v1/download/XML`（app~ea1f58e8-191e777b.js）

| # | 建议 HAR 文件名 | 动作 | 风险初判 | page spec 接口候选 |
|---:|---|---|---|---|
| 1 | `downloadCenter.download.har` | download | L2 review | 数税云接口候选：`/prod-api/invoicecenter/invoiceTemplate/v1/download/template/taskId` 当前只读探针 HTTP 200 但空 body，需页面动作 HAR 确认是否为文件流/任务型响应，不算业务成功。 |

采集步骤：

1. 打开页面并确认企业/账号正确。
2. DevTools → Network → Preserve log → Clear。
3. 执行上表动作，等待接口返回。
4. Save all as HAR with content。
5. 按建议文件名保存到 `docs/tax-cloud/network-har/`。
6. 执行 `npm run tax-cloud:har:parse-all && npm run tax-cloud:har:tasks && npm run tax-cloud:audit`。


## 非默认 HAR 采集候选

以下候选不是漏项，而是默认 HAR 补抓清单刻意排除的内容：ERP 内部接口、开放 API interfaceCode、静态安装包链接，或明确禁止自动触发/真实后果未确认的动作。它们保留在 page spec、接口清单和风险矩阵里，进入 ERP 落地或高风险专项时再处理。

| pageKey | 菜单 | 排除候选 |
|---|---|---|
| `platform-scanCode` | 销项管理/扫码开票 | 真实开票：禁止从本页直接触发 L4，必须回到 ERP 草稿审批链路。 |
| `platform-records` | 销项管理/开票记录 | 开票结果查询：`ynfp.invoice.detail.query`，L0。 |
| `platform-records` | 销项管理/开票记录 | 发票明细列表：`ynfp.invoice.detail.list.query`，L0，曾返回 7007，需要复测权限。 |
| `platform-records` | 销项管理/开票记录 | ERP 列表：`/api/tax-invoices/records/list`，L0。 |
| `platform-records` | 销项管理/开票记录 | 版式下载：`/api/tax-invoices/records/layout-file-download`，L2。 |
| `platform-records` | 销项管理/开票记录 | 对账：`/api/tax-invoices/records/reconcile`，L0。 |
| `platform-billIssue` | 销项管理/订单开票 | ERP 合同直达草稿：`/api/invoice-registration/tax-drafts/from-contract`，L1。 |
| `platform-invoiceApplication` | 销项管理/开票申请单 | ERP 不新增旧申请接口。 |
| `platform-redMark` | 销项管理/红字确认单 | `ynfp.invoice.red.confirm.query`，L0。 |
| `platform-redMark` | 销项管理/红字确认单 | `ynfp.invoice.red.confirmDetail.query`，L0。 |
| `platform-redMark` | 销项管理/红字确认单 | `ynfp.invoice.red.confirm.issue`，L3。 |
| `platform-redMark` | 销项管理/红字确认单 | `ynfp.invoice.red.confirm.operate`，L3。 |
| `platform-redMark` | 销项管理/红字确认单 | `ynfp.invoice.red.confirm.down`，L2。 |
| `income-scanCodeCheck` | 进项管理/快捷勾选 | 用途状态查询：`ynfp.invoice.usage.status.query`，L0。 |
| `income-invoiceCheck` | 进项管理/手工勾选 | 用途状态查询：`ynfp.invoice.usage.status.query`，L0。 |
| `income-invoiceCheck` | 进项管理/手工勾选 | 发票池列表：`ynfp.invoice.pool.list.query`，L0。 |
| `income-invoiceCheck` | 进项管理/手工勾选 | 下载发票：`ynfp.invoice.pool.file.download`，L2。 |
| `income-invoiceCheck` | 进项管理/手工勾选 | ERP 状态动作：`/api/tax-invoices/records/status-action`，L2/L3。 |
| `income-confirmCheck` | 进项管理/勾选审核 | ERP 批次：`/api/tax-invoices/records/certification-batches`，L1/L2。 |
| `income-confirmSign` | 进项管理/统计确认 | 认证结果/批次：`/api/tax-invoices/records/certification-batches`，L1/L2。 |
| `income-confirmSign` | 进项管理/统计确认 | 发票池明细：`/api/tax-invoices/records/list`，L0。 |
| `income-certificationResults` | 进项管理/认证结果 | 用途状态查询：`ynfp.invoice.usage.status.query`，L0。 |
| `income-certificationResults` | 进项管理/认证结果 | 发票池列表/详情：`ynfp.invoice.pool.list.query` / `ynfp.invoice.pool.detail.query`，L0。 |
| `income-certificationResults` | 进项管理/认证结果 | ERP 批次：`/api/tax-invoices/records/certification-batches`，L1/L2。 |
| `billCenter-fullInvoiceQuery` | 票据中心/发票池 | 发票池列表：`ynfp.invoice.pool.list.query`，L0，曾返回 7007，需要复测。 |
| `billCenter-fullInvoiceQuery` | 票据中心/发票池 | 发票池详情：`ynfp.invoice.pool.detail.query`，L0。 |
| `billCenter-fullInvoiceQuery` | 票据中心/发票池 | 版式文件下载：`ynfp.invoice.pool.file.download`，L2。 |
| `billCenter-fullInvoiceQuery` | 票据中心/发票池 | 发票获取/取票：`ynfp.invoice.obtain`，L2。 |
| `billCenter-fullInvoiceQuery` | 票据中心/发票池 | 税局入账状态查询：`ynfp.invoice.pool.rz.cx`，L0。 |
| `billCenter-fullInvoiceQuery` | 票据中心/发票池 | 入账状态提交/调整：`ynfp.invoice.pool.rz.tj` / `ynfp.invoice.pool.rz.tz`，L3，默认禁用。 |
| `billCenter-sign` | 票据中心/签收 | `ynfp.invoice.sign`，L2/L3，真实后果待确认。 |
| `billCenter-invoiceVerification` | 票据中心/查验 | `ynfp.invoice.check`，L2。 |
| `billCenter-invoiceVerification` | 票据中心/查验 | ERP：`/api/tax-invoices/records/provider-check`，L2。 |
| `billCenter-accessSetting` | 票据中心/取票设置 | 取票设置保存：`/invoicecenter/sjruzhang/saveSjruzhangSetting` 候选，L2，禁止自动触发。 |
| `billCenter-accessSetting` | 票据中心/取票设置 | 取票任务重启：`/invoicecenter/sjruzhang/restartTask` 候选，L2，禁止自动触发。 |
| `billCenter-accessSetting` | 票据中心/取票设置 | ERP 同步游标：`/api/tax-invoices/sync-cursors`，L0。 |
| `billCenter-taskManagement` | 票据中心/任务管理 | 任务重试：`/system/taskRecord/restart/` 候选，L2，禁止自动触发。 |
| `billCenter-taskManagement` | 票据中心/任务管理 | ERP 同步任务：`/api/tax-invoices/sync-sales`、`/api/tax-invoices/sync-purchases`，L2。 |
| `analysisBoard-invoceRateView` | 分析看板/按税率统计 | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。 |
| `analysisBoard-invoiceTypeView` | 分析看板/按发票种类统计 | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。 |
| `analysisBoard-businessRateView` | 分析看板/按上下游企业统计 | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。 |
| `analysisBoard-businessRateView` | 分析看板/按上下游企业统计 | 发票池明细下钻：`/api/tax-invoices/records/list`，L0。 |
| `analysisBoard-goodsRateView` | 分析看板/按进销商品统计 | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。 |
| `analysisBoard-goodsRateView` | 分析看板/按进销商品统计 | 商品税编：`ynfp.invoice.batch.taxCode`，L0，曾返回 7007，需要复测。 |
| `analysisBoard-purchaseSalesTrend` | 分析看板/按进销趋势统计 | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。 |
| `analysisBoard-purchaseSalesTrend` | 分析看板/按进销趋势统计 | 发票池列表下钻：`/api/tax-invoices/records/list`，L0。 |
| `analysisBoard-invoiceRegionView` | 分析看板/按进销地区统计 | ERP 聚合：`/api/tax-invoices/records/dashboard`，L0。 |
| `analysisBoard-invoiceRegionView` | 分析看板/按进销地区统计 | 发票池列表下钻：`/api/tax-invoices/records/list`，L0。 |
| `bussiness-info` | 基础信息/商品信息 | 税收分类编码：`ynfp.invoice.batch.taxCode`，L0。 |
| `bussiness-customer` | 基础信息/客户管理 | 开票页客户库：`/api/tax-invoices/issue-buyer-addresses`，L0。 |
| `bussiness-configurationManagement` | 基础信息/配置管理 | 开票信息读取/保存：待真实 Network 补抓，L1/L2，保存禁止自动触发。 |
| `system-onlineTaxationInfo` | 系统设置/网上办税信息 | 登录/认证动作：待真实 Network 补抓，L3，默认不在 ERP 触发。 |
| `downloadCenter` | 顶部入口/下载中心 | 工具安装包静态链接：Chrome DOM 已确认 `CloudTaxBaseService.exe`、`AisinoPrinterSetup.exe`、`accessClient.exe`、`ERPImportTool.zip`、`shushuiyunkehuduan.zip`，L0-static，不要求 HAR。 |
| `downloadCenter` | 顶部入口/下载中心 | 版式文件下载：`ynfp.invoice.pool.file.download`，L2，属于发票池/开票记录动作，不等同于下载中心工具包。 |
