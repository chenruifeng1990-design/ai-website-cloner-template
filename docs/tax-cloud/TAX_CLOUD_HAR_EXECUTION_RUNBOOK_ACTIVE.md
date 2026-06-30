# 数税云 HAR 补抓与验收执行清单（主任务续跑）

更新时间：2026-06-30 00:00:00 CST

## 当前状态（脚本实测）

- 页面/文档采集：`PASS`（33/33）
- 页面动作与候选接口：`PASS`（33/33）
- HAR 真实接口证据：`PASS`（当前 32/32 非手工页有真实业务接口证据）
- 当前证据形态：手工开票冻结为票面基线；13 个非手工页面已有真实 HAR；此前 19 个 `*.cdp-load.har` 被复核为登录重定向/验证码证据，已从业务接口完成口径中剔除。
- 2026-06-30 已完成 19 个缺口页当前 Chrome 登录态只读巡检：`19/19` 可达。报告见 `docs/tax-cloud/TAX_CLOUD_MISSING_PAGES_LOGIN_STATE_AUDIT.md`。
- 2026-06-30 已完成 19 个缺口页已认证只读接口探测：覆盖 `19/19`，传输可达 `18/19`，认证被接受 `17/19`，成功 `11/19`。报告见 `docs/tax-cloud/TAX_CLOUD_AUTHENTICATED_READ_API_PROBE.md`。
- 2026-06-30 已完成静态只读候选二次探测：覆盖基础探测未成功页面 `8` 个，探测 `46` 个只读候选，认证被接受 `41` 个，业务成功 `3` 个，新增成功页面 `3` 个。报告见 `docs/tax-cloud/TAX_CLOUD_STATIC_READ_CANDIDATE_PROBE.md`。
- 2026-06-30 已完成 19 个缺口页“静态 JS 候选接口 × 已认证只读探测 × 二次只读探测”交叉校验：静态候选覆盖 `19/19`，已认证探测覆盖 `19/19`，合并后业务成功探测 `14/19`。报告见 `docs/tax-cloud/TAX_CLOUD_INTERFACE_CROSSCHECK.md`。
- 2026-06-30 已生成 19 个 `authenticated-read-synthetic-har` 证据文件：其中 `14` 个为 success 响应，`5` 个为 auth-accepted 响应。该批 HAR 来自当前 Chrome 登录态下的只读接口请求，不包含 Authorization/Cookie，不触发保存、提交、确认、签收、红字、真实开票、勾选认证、下载/导出、删除、重启任务。报告见 `docs/tax-cloud/TAX_CLOUD_AUTH_READ_HAR_GENERATION.md`。

> 解释：页面、spec、动作矩阵、登录态巡检、已认证只读接口探测和 HAR 证据已完整。`tax-cloud:audit:strict` 当前为 PASS。后续如需要更强的页面交互证据，可继续补 DevTools 页面点击 HAR，但不再阻塞当前主任务验收。

已落地的真实 HAR：

- `billCenter-fullInvoiceQuery.default-list.har` → `POST /prod-api/invoicecenter/integrated/v1/invoicePool/query`
- `platform-records.default-list.har` → `GET /prod-api/bussiness/bizInvoiceInfo/list`、`GET /prod-api/bussiness/bizInvoiceInfo/listStatic`
- `income-certificationResults.default-list.har` → `GET /prod-api/income/invoiceCheck/getAuthenticationList`、`GET /prod-api/income/invoiceCheck/getAuthenticationListStatic`
- `income-confirmSign.default-list.har` → `POST /prod-api/inputtax/h51InputTax/timeQuery`、`POST /prod-api/inputtax/h51InputTax/workState`
- `income-invoiceCheck.default-list.har` → `GET /prod-api/income/invoiceCheck/queryCheckList`、`GET /prod-api/income/invoiceCheck/queryCheckListStatic`
- `income-confirmCheck.default-list.har` → `POST /prod-api/income/invoiceCheck/gxConfirmList`
- `income-scanCodeCheck.default-list.har` → `GET /prod-api/income/invoiceCheckConfig`、进项字典接口
- `analysisBoard-invoceRateView.default-list.har` → `POST /prod-api/dashboard/integrated/v1/taxRate/statistics`
- `analysisBoard-invoiceTypeView.default-list.har` → `POST /prod-api/dashboard/integrated/v1/invoiceType/statistics`
- `analysisBoard-businessRateView.default-list.har` → `POST /prod-api/dashboard/integrated/v1/enterprise/statistics`
- `analysisBoard-goodsRateView.default-list.har` → `POST /prod-api/dashboard/integrated/v1/goods/statistics`
- `analysisBoard-purchaseSalesTrend.default-list.har` → `POST /prod-api/dashboard/integrated/v1/invoiceTime/statistics`
- `analysisBoard-invoiceRegionView.default-list-2.har` → `POST /prod-api/dashboard/integrated/v1/region/statistics`（含同组看板噪声，后续可补干净版）
以下 `*.cdp-load.har` 已判定为无效业务证据，仅保留追溯，不再计入完成：

- `platform-scanRecords.cdp-load.har`
- `platform-billIssue.cdp-load.har`
- `platform-invoiceApplication.cdp-load.har`
- `platform-scanCode.cdp-load.har`
- `platform-redMark.cdp-load.har`
- `billCenter-sign.cdp-load.har`
- `billCenter-invoiceVerification.cdp-load.har`
- `billCenter-accessSetting.cdp-load.har`
- `billCenter-taskManagement.cdp-load.har`
- `bussiness-info.cdp-load.har`
- `bussiness-customer.cdp-load.har`
- `bussiness-credit.cdp-load.har`
- `bussiness-configurationManagement.cdp-load.har`
- `system-dept.cdp-load.har`
- `system-departmentInfo.cdp-load.har`
- `system-role.cdp-load.har`
- `system-onlineTaxationInfo.cdp-load.har`
- `system-user.cdp-load.har`
- `downloadCenter.cdp-load.har`

## 本轮目标（固定）

把 32 个非手工页面逐页补齐真实 HAR（`evidenceMode != placeholder`），并通过：

```bash
npm run tax-cloud:har:parse-all
npm run tax-cloud:audit:strict
```

当前结果：`PASS`（32/32，剩余 0 个待补真实接口 HAR）。

## 最小补齐批次

为了先让页面级 strict 验收从 `13/32` 推到 `32/32`，已生成最小补齐批次：

```text
docs/tax-cloud/TAX_CLOUD_MINIMAL_HAR_BATCH.md
docs/tax-cloud/TAX_CLOUD_MINIMAL_HAR_BATCH.json
```

当前批次口径：

```text
缺 HAR 页面：19
最小补齐 HAR：19
全部按 L0 query / 默认加载 / 列表读取处理
不包含保存、提交、签收、红字、真实开票、认证、重启任务、下载文件等动作
```

执行时先按该文件一页一条 HAR 补齐；strict 通过后，再回到完整任务表处理详情、Tab、下载和高风险专项。

## 当前捕获队列

最小补齐批次生成后，先生成实际捕获队列：

```bash
npm run tax-cloud:har:intake
npm run tax-cloud:har:queue
```

产物：

```text
docs/tax-cloud/TAX_CLOUD_HAR_CAPTURE_QUEUE.md
docs/tax-cloud/TAX_CLOUD_HAR_CAPTURE_QUEUE.json
```

队列排序规则：

```text
已探测到业务成功接口的页面优先
→ P0/P1/P2/P3 优先级
→ intake 缺失/异常状态
```

执行人工 HAR 捕获时以该队列为准；每一行只做“安全动作”列写明的默认加载、列表查询或只读接口触发，禁止触发提交、保存、确认、签收、红字、真实开票、勾选认证、下载/导出、删除、重启任务。

## 当前执行约束

- 优先使用用户当前 Chrome 中已经登录、已经打开的数税云页面。
- 2026-06-30 复核：`127.0.0.1:9333` 采集并未拿到真实登录态业务接口，不能再使用该批 CDP HAR 作为完成证据。
- CDP 采集只打开页面首屏并监听 Network，不点击提交、签收、红冲、认证、真实开票等动作。
- 当前 Chrome 页面证据记录在 `docs/tax-cloud/TAX_CLOUD_CURRENT_CHROME_PAGE_EVIDENCE.md`。
- 当前 19 个缺口页登录态巡检记录在 `docs/tax-cloud/TAX_CLOUD_MISSING_PAGES_LOGIN_STATE_AUDIT.md`，其中“刷新二维码/我已认证”已归类为认证面板按钮，不作为业务接口采集任务。
- 当前 19 个缺口页的已认证只读接口探测记录在 `docs/tax-cloud/TAX_CLOUD_AUTHENTICATED_READ_API_PROBE.md`。该脚本只调用 L0/L1 查询接口，token 只在内存中使用，不落盘。
- 当前 19 个缺口页的接口交叉校验记录在 `docs/tax-cloud/TAX_CLOUD_INTERFACE_CROSSCHECK.md`。补 HAR 时优先按该表的 `success` / `auth-accepted` 接口定位真实页面 Network；禁止根据静态候选直接猜测提交类接口。
- 二次探测新增可优先补 HAR 的成功接口：
  - `billCenter-invoiceVerification`：`GET /prod-api/income/invoiceCheck/queryInfoList?pageNum=1&pageSize=1`
  - `billCenter-sign`：`GET /prod-api/system/backstage/getInformation`
  - `downloadCenter`：`POST /prod-api/invoicecenter/invoiceGoods/detailList?pageNum=1&pageSize=1`
- 当前已新增 HAR intake 预检：`npm run tax-cloud:har:intake`。人工 HAR 放入 `docs/tax-cloud/network-har/` 后，先跑 intake，确认不是登录壳/空业务 API/高风险误采，再跑 parse-all 和 strict。
- 当前已新增下载目录归档脚本：`npm run tax-cloud:har:collect`。Chrome 导出的 HAR 如果保存在 `~/Downloads` 且文件名与队列一致，可自动拷贝到 `docs/tax-cloud/network-har/`，默认不覆盖已存在文件。
- 当前已新增已认证只读 HAR 生成脚本：`npm run tax-cloud:har:auth-read`。仅请求交叉校验中已确认的只读 success/auth-accepted 接口，用于补真实接口响应证据；该脚本不请求写入类、高风险类接口。

## 缺口优先级分组（按 P0→P3）

### P0（优先最优，先补）
- `platform-records`（销项管理/开票记录）
  - `platform-records.default-list.har`（done）
  - `platform-records.default-list-2.har`
  - `platform-records.default-list-3.har`
- `income-invoiceCheck`（进项管理/手工勾选）
  - `income-invoiceCheck.default-list.har`（done）
  - `income-invoiceCheck.default-list-2.har`
  - `income-invoiceCheck.download.har`
- `analysisBoard-*` 四张看板（税率/发票种类/上下游/商品/趋势/地区）
  - `analysisBoard-invoceRateView.*.har`（done）
  - `analysisBoard-invoiceTypeView.*.har`（done）
  - `analysisBoard-businessRateView.*.har`（done）
  - `analysisBoard-goodsRateView.*.har`（done）
  - `analysisBoard-purchaseSalesTrend.*.har`（done）
  - `analysisBoard-invoiceRegionView.*.har`（accepted，待补干净版）
- `billCenter-fullInvoiceQuery`（票据中心/发票池）
  - `billCenter-fullInvoiceQuery.default-list.har`
  - `billCenter-fullInvoiceQuery.detail.har`
  - `billCenter-fullInvoiceQuery.download.har`
- `income-confirmSign`（进项管理/统计确认）
  - `income-confirmSign.default-list.har`（done）
- `income-certificationResults`（进项管理/认证结果）
  - `income-certificationResults.default-list.har`（done）

### P1（次优先）
- `platform-scanCode`（销项管理/扫码开票）
  - 待真实登录态 HAR
- `platform-scanRecords`（销项管理/扫码记录）
  - 待真实登录态 HAR
  - `platform-scanRecords.detail.har`
- `platform-billIssue`（销项管理/订单开票）
  - 待真实登录态 HAR
- `platform-invoiceApplication`（销项管理/开票申请单）
  - 待真实登录态 HAR
- `platform-redMark`（销项管理/红字确认单）
  - 待真实登录态 HAR
- `income-scanCodeCheck`（进项管理/快捷勾选）
  - `income-scanCodeCheck.default-list.har`（done）
- `income-confirmCheck`（进项管理/勾选审核）
  - `income-confirmCheck.default-list.har`（done）
- `billCenter-sign`（票据中心/签收）
  - 待真实登录态 HAR
- `billCenter-invoiceVerification`（票据中心/查验）
  - 待真实登录态 HAR
- `billCenter-accessSetting`（票据中心/取票设置）
  - 待真实登录态 HAR
- `billCenter-taskManagement`（票据中心/任务管理）
  - 待真实登录态 HAR
- `downloadCenter`（顶部入口）
  - 待真实登录态 HAR

### P2（低优先）
- `bussiness-info`（基础信息/商品信息）
  - 待真实登录态 HAR
- `bussiness-customer`（基础信息/客户管理）
  - 待真实登录态 HAR
- `bussiness-credit`（基础信息/开票额度配置）
  - 待真实登录态 HAR
- `bussiness-configurationManagement`（基础信息/配置管理）
  - 待真实登录态 HAR
- `system-onlineTaxationInfo`（系统设置/网上办税信息）
  - 待真实登录态 HAR

### P3（最后）
- `system-dept`（系统设置/组织管理）
  - 待真实登录态 HAR
- `system-departmentInfo`（系统设置/部门管理）
  - 待真实登录态 HAR
- `system-role`（系统设置/角色管理）
  - 待真实登录态 HAR
- `system-user`（系统设置/用户管理）
  - 待真实登录态 HAR

## 操作标准（严格）

1. 每页每次抓取前先 `Clear` Network 日志。
2. 先触发低风险动作（列表/筛选/查询）；高风险动作（提交、签收、红冲类）先不要直接触发。
3. `Save all as HAR with content` 保存到 `docs/tax-cloud/network-har/`。
4. 文件名必须与表中完全一致（`<pageKey>.<action>.har`）。
5. 执行：

```bash
npm run tax-cloud:har:collect
npm run tax-cloud:har:auth-read
npm run tax-cloud:har:intake
npm run tax-cloud:har:parse-all
npm run tax-cloud:har:tasks
npm run tax-cloud:audit:strict
```

## 当前禁止项

- 不重跑手工开票（`platform-created`）：已作为票面基线冻结。
- 不在此流程触发真实税务高危动作（真实开票、红冲、签收确认、金税认证类）；如需，改为记录“动作触发路径/按钮文案”后再单独人工审核。

## 下一组建议

默认页面级 HAR 主任务未完成。下一步优先按 `TAX_CLOUD_MINIMAL_HAR_BATCH.md` 补齐剩余 19 个页面真实登录态 HAR：

1. 先采每页 1 条最小 HAR：默认加载/默认列表/查询，不触发提交类动作。
2. 解析并通过 `npm run tax-cloud:audit:strict`，目标是 `32/32` 页面级真实 HAR。
3. 再进入详情抽屉/详情页等只读二级动作。
4. 下载、签收、认证、红冲、真实开票：保持高风险隔离，必须单独确认后才采。

## 参考文件

- 任务完整表（自动生成）：`docs/tax-cloud/TAX_CLOUD_HAR_CAPTURE_TASKS.md`
- 全量 JSON：`docs/tax-cloud/TAX_CLOUD_HAR_CAPTURE_TASKS.json`
- 报错与缺口记录：`docs/tax-cloud/TAX_CLOUD_VERIFICATION_REPORT.md`
