# 数税云当前 Chrome 登录页证据

生成时间：2026-06-29
修正时间：2026-06-30

## 口径

- 本文件只记录“用户当前 Chrome 已打开、已登录的数税云页面”证据。
- 2026-06-30 复核确认：此前 `*.cdp-load.har` 并未真正复用用户已登录 Chrome 登录态，实际只抓到了登录重定向壳页面和验证码接口 `/prod-api/code`。
- 2026-06-30 再复核：Chrome 扩展通道可见当前用户已打开的数税云标签页（如 `downloadCenter`、`analysisBoard/purchaseSalesTrend`、`platform/created`），但页面安全读域不开放 `fetch`、`XMLHttpRequest`、`localStorage/sessionStorage`；不能直接从扩展通道抓 Network。
- 2026-06-30 再复核：`127.0.0.1:9333/json/list` 当前没有任何 `fp.enuoyun.com` target，因此该 CDP 端口不能代表用户当前已登录数税云标签页。
- `*.cdp-load.har` 已从业务接口完成证据中剔除，不能再作为“默认页面真实接口已完成”的依据。
- 本文件不替代 HAR 证据；`tax-cloud:audit:strict` 仍要求 `docs/tax-cloud/network-har/*.har` 经解析后的真实接口证据。

## 当前打开页

| 页面 | URL | 结论 |
|---|---|---|
| 发票池 | `https://fp.enuoyun.com/billCenter/fullInvoiceQuery` | 已登录，可见真实发票池数据 |
| 进销趋势分析 | `https://fp.enuoyun.com/analysisBoard/purchaseSalesTrend` | 已登录，可见真实看板数据 |
| 税率统计 | `https://fp.enuoyun.com/analysisBoard/invoceRateView` | 已采真实 HAR |
| 发票种类统计 | `https://fp.enuoyun.com/analysisBoard/invoiceTypeView` | 已采真实 HAR |
| 上下游企业统计 | `https://fp.enuoyun.com/analysisBoard/businessRateView` | 已采真实 HAR |
| 进销商品统计 | `https://fp.enuoyun.com/analysisBoard/goodsRateView` | 已采真实 HAR |
| 进销地区统计 | `https://fp.enuoyun.com/analysisBoard/invoiceRegionView` | 已采真实 HAR，当前 HAR 含同组看板噪声，后续可补干净版 |
| 开票记录 | `https://fp.enuoyun.com/platform/records` | 已采真实 HAR |
| 认证结果 | `https://fp.enuoyun.com/income/certificationResults` | 已采真实 HAR |
| 统计确认 | `https://fp.enuoyun.com/income/confirmSign` | 已采真实 HAR |
| 手工勾选 | `https://fp.enuoyun.com/income/invoiceCheck` | 已采真实 HAR |
| 勾选审核 | `https://fp.enuoyun.com/income/confirmCheck` | 已采真实 HAR |
| 快捷勾选 | `https://fp.enuoyun.com/income/scanCodeCheck` | 已采真实 HAR |
| 扫码开票 | `https://fp.enuoyun.com/platform/scanCode` | 待真实登录态 HAR |
| 扫码记录 | `https://fp.enuoyun.com/platform/scanRecords` | 待真实登录态 HAR |
| 订单开票 | `https://fp.enuoyun.com/platform/billIssue` | 待真实登录态 HAR |
| 开票申请单 | `https://fp.enuoyun.com/platform/invoiceApplication` | 待真实登录态 HAR |
| 红字确认单 | `https://fp.enuoyun.com/platform/redMark` | 待真实登录态 HAR |
| 签收 | `https://fp.enuoyun.com/billCenter/sign` | 待真实登录态 HAR |
| 查验 | `https://fp.enuoyun.com/billCenter/invoiceVerification` | 待真实登录态 HAR |
| 取票设置 | `https://fp.enuoyun.com/billCenter/accessSetting` | 待真实登录态 HAR |
| 任务管理 | `https://fp.enuoyun.com/billCenter/taskManagement` | 待真实登录态 HAR |
| 商品信息 | `https://fp.enuoyun.com/bussiness/info` | 待真实登录态 HAR |
| 客户管理 | `https://fp.enuoyun.com/bussiness/customer` | 待真实登录态 HAR |
| 开票额度配置 | `https://fp.enuoyun.com/bussiness/credit` | 待真实登录态 HAR |
| 配置管理 | `https://fp.enuoyun.com/bussiness/configurationManagement` | 待真实登录态 HAR |
| 组织管理 | `https://fp.enuoyun.com/system/dept` | 待真实登录态 HAR |
| 部门管理 | `https://fp.enuoyun.com/system/departmentInfo` | 待真实登录态 HAR |
| 角色管理 | `https://fp.enuoyun.com/system/role` | 待真实登录态 HAR |
| 网上办税信息 | `https://fp.enuoyun.com/system/onlineTaxationInfo` | 待真实登录态 HAR |
| 用户管理 | `https://fp.enuoyun.com/system/user` | 待真实登录态 HAR |
| 下载中心 | `https://fp.enuoyun.com/downloadCenter` | 待真实登录态 HAR |
| 手工开票 | `https://fp.enuoyun.com/platform/created` | 已冻结为票面基线，不再重跑 |

## 下载中心当前页证据（2026-06-30 续跑）

- 当前 Chrome 标签：`https://fp.enuoyun.com/downloadCenter`
- 企业：邯郸市聚兴碳素有限公司
- 可见入口：任务管理、下载中心
- 账号状态：认证侧栏显示数电账号、登录状态为已登录
- 页面性质：工具下载中心，不是业务下载任务列表
- 当前页面暴露的工具分组：
  - 同步工具：365基础服务工具2.0
  - 打印工具：打印助手
  - 51发票客户端：51发票助手（当前 DOM 未暴露文件 href）
  - 数据库工具：数据库工具
  - ERP导入工具：ERP导入工具
  - 税控系统、A9服务器获取发票客户端：获取发票客户端
- 当前页面暴露的文件链接：
  - `https://download.enuoyun.com/rjxz/YINUO365/YCSFW/SSY/CloudTaxBaseService.exe`
  - `https://fp.enuoyun.com/AisinoPrinterSetup.exe`
  - `https://fp.enuoyun.com/accessClient.exe`
  - `https://fp.enuoyun.com/ERPImportTool.zip`
  - `https://fp.enuoyun.com/shushuiyunkehuduan.zip`
- 结论：
  - 下载中心应在 ERP 映射中拆成“工具安装包下载”与“业务文件下载/OFD/PDF/XML/导出任务”两类。
  - 当前只读探针中的 `/prod-api/invoicecenter/invoiceTemplate/v1/download/template/taskId` 返回 HTTP 200 空 body，不能作为业务成功证据；需真实页面动作 HAR 判断是否为文件流或任务型响应。
  - 本段仅证明当前 Chrome 登录态页面结构，不替代 `tax-cloud:audit:strict` 所需 HAR。

## 当前 Chrome 标签复核（2026-06-30 续跑）

本轮按用户要求只读取当前 Chrome 已打开标签，不重新打开数税云页面、不刷新、不导航、不点击。

当前可见数税云相关标签：

| 标签 | URL | 只读结论 |
|---|---|---|
| 下载中心 | `https://fp.enuoyun.com/downloadCenter` | 已登录页面，可见数税云菜单、企业名、工具下载分组、数电登录侧栏；不是登录壳 |
| 额度接口标签 | `https://fp.enuoyun.com/prod-api/bussiness/credit/creditInfo/1?...` | 当前标签实际落在 `chrome-error://chromewebdata/`，显示 `ERR_BLOCKED_BY_CLIENT`，不能作为额度接口已通证据 |
| 进销趋势分析 | `https://fp.enuoyun.com/analysisBoard/purchaseSalesTrend` | 已登录标签，且已有真实 HAR 证据 |
| 手工开票 | `https://fp.enuoyun.com/platform/created` | 已冻结为票面基线，不再重跑 |

下载中心当前页面只读文本样本包含：

```text
销项管理 / 进项管理 / 票据中心 / 分析看板 / 基础信息 / 系统设置 / 任务管理 / 下载中心
邯郸市聚兴碳素有限公司
一、同步工具
二、打印工具
三、51发票客户端
四、数据库工具
五、ERP导入工具
六、税控系统、A9服务器获取发票客户端
数电登录 / 数电认证 / 电子税局登录
```

结论：当前 Chrome 登录态能证明 `downloadCenter` 页面可读，但不能替代 Network HAR；额度接口必须以真实 HAR 或后端接口接入结果为准，不能使用 blocked 标签内容。

## 发票池当前页证据

- 企业：邯郸市聚兴碳素有限公司
- 页面模块：票据中心 / 发票池
- 已采真实 HAR：`docs/tax-cloud/network-har/billCenter-fullInvoiceQuery.default-list.har`
- 已生成脱敏接口证据：`docs/tax-cloud/apis/billCenter-fullInvoiceQuery.default-list.har-normalized.json`
- 真实列表接口：
  - Method：`POST`
  - URL：`https://fp.enuoyun.com/prod-api/invoicecenter/integrated/v1/invoicePool/query`
  - 风险初判：`L1-review`（列表查询，仍需人工确认是否存在隐性同步副作用）
  - 请求关键字段：`kprqq=2026-06-01`、`kprqz=2026-06-27`、`pageNum=1`、`pageSize=10`、`deptIdList=[129850]`
  - 返回关键字段：`total=45`，列表字段含 `invoiceId`、`qdfphm`、`xfmc`、`gfmc`、`je`、`se`、`jshj`、`fpzt`、`pdfMongoId`、`signStatus`、`gxStatus`
- 页面动作：查询、重置、导出、发票打印、版式下载、发票获取、签收、报销、入账、勾选、列配置
- 当前可见真实数据示例：
  - 河北星源新材料有限公司，税号 `91130424MADJT7UT3F`
  - 数电票号码示例：`26132000002027632111`
  - 金额 `92884.96`，税额 `12075.04`，价税合计 `104960.00`
  - 开票日期 `2026-06-26`
  - 发票来源：税务数字账户
  - 发票状态：正常
  - 报销状态：未报销
  - 税局入账状态：未入账
  - 签收状态：未签收

## 进销趋势分析当前页证据

- 企业：邯郸市聚兴碳素有限公司
- 页面模块：分析看板 / 按进销趋势统计
- 已采真实 HAR：`docs/tax-cloud/network-har/analysisBoard-purchaseSalesTrend.default-list.har`
- 已生成脱敏接口证据：`docs/tax-cloud/apis/analysisBoard-purchaseSalesTrend.default-list.har-normalized.json`
- 真实看板接口：
  - Method：`POST`
  - URL：`https://fp.enuoyun.com/prod-api/dashboard/integrated/v1/invoiceTime/statistics`
  - 风险初判：`L1-review`（看板统计查询）
  - 请求关键字段：`statisticsTimeStart=2026-05-01`、`statisticsTimeEnd=2026-06-29`
  - 返回关键字段：`cancellationList`、`arriveList`，含 `invoiceTime`、`count`、`noTaxAmount`、`taxAmount`、`totalAmount`
- 站内菜单日志接口：
  - Method：`POST`
  - URL：`https://fp.enuoyun.com/prod-api/system/typeLog/save`
  - 用途：菜单进入日志，不作为业务数据接口
- 筛选项：统计周期、本月、上月、本季度、上季度、本年、查询
- 销项趋势可见数据：
  - `2026-06`：份数 `9`，金额 `5763449.66`，税额 `749248.46`，含税金额 `6512698.12`
  - `2026-05`：份数 `5`，金额 `9367451.58`，税额 `1217768.7`，含税金额 `10585220.28`
  - `2026-04`：份数 `2`，金额 `7395345.94`，税额 `961394.97`，含税金额 `8356740.91`
- 进项趋势可见数据：
  - `2026-06`：份数 `45`，金额 `8952962.54`，税额 `1147130.02`，含税金额 `10100092.56`
  - `2026-05`：份数 `60`，金额 `6117594.46`，税额 `769686.14`，含税金额 `6887280.6`
  - `2026-04`：份数 `124`，金额 `7915714.95`，税额 `988942.97`，含税金额 `8904657.92`

## 分析看板本轮补采证据

本轮在用户当前已登录 Chrome 数税云页面中补采了分析看板接口，不重新打开数税云登录流程，不触发税务写入动作。

| 页面 | HAR | 真实接口 | 状态 |
|---|---|---|---|
| 按税率统计 | `docs/tax-cloud/network-har/analysisBoard-invoceRateView.default-list.har` | `POST /prod-api/dashboard/integrated/v1/taxRate/statistics` | 已解析 |
| 按发票种类统计 | `docs/tax-cloud/network-har/analysisBoard-invoiceTypeView.default-list.har` | `POST /prod-api/dashboard/integrated/v1/invoiceType/statistics` | 已解析 |
| 按上下游企业统计 | `docs/tax-cloud/network-har/analysisBoard-businessRateView.default-list.har` | `POST /prod-api/dashboard/integrated/v1/enterprise/statistics` | 已解析 |
| 按进销商品统计 | `docs/tax-cloud/network-har/analysisBoard-goodsRateView.default-list.har` | `POST /prod-api/dashboard/integrated/v1/goods/statistics` | 已解析，干净 HAR |
| 按进销趋势统计 | `docs/tax-cloud/network-har/analysisBoard-purchaseSalesTrend.default-list.har` | `POST /prod-api/dashboard/integrated/v1/invoiceTime/statistics` | 已解析 |
| 按进销地区统计 | `docs/tax-cloud/network-har/analysisBoard-invoiceRegionView.default-list-2.har` | `POST /prod-api/dashboard/integrated/v1/region/statistics` | 已解析，含同组看板额外请求，待补干净版 |
| 开票记录默认列表 | `docs/tax-cloud/network-har/platform-records.default-list.har` | `GET /prod-api/bussiness/bizInvoiceInfo/list`、`GET /prod-api/bussiness/bizInvoiceInfo/listStatic` | 已解析 |
| 认证结果默认列表 | `docs/tax-cloud/network-har/income-certificationResults.default-list.har` | `GET /prod-api/income/invoiceCheck/getAuthenticationList`、`GET /prod-api/income/invoiceCheck/getAuthenticationListStatic` | 已解析 |
| 统计确认默认页 | `docs/tax-cloud/network-har/income-confirmSign.default-list.har` | `POST /prod-api/inputtax/h51InputTax/timeQuery`、`POST /prod-api/inputtax/h51InputTax/workState` | 已解析 |
| 手工勾选默认列表 | `docs/tax-cloud/network-har/income-invoiceCheck.default-list.har` | `GET /prod-api/income/invoiceCheck/queryCheckList`、`GET /prod-api/income/invoiceCheck/queryCheckListStatic` | 已解析 |
| 勾选审核默认列表 | `docs/tax-cloud/network-har/income-confirmCheck.default-list.har` | `POST /prod-api/income/invoiceCheck/gxConfirmList` | 已解析 |
| 快捷勾选默认页 | `docs/tax-cloud/network-har/income-scanCodeCheck.default-list.har` | `/prod-api/income/invoiceCheckConfig`、进项字典接口 | 已解析 |

2026-06-30 修正后脚本实测：

```text
HAR-backed real interface evidence: FAIL
pages with API evidence: 13/32 non-manual pages
missing HAR evidence pages: 19
strict audit: FAIL
```

## 被剔除的 CDP 补采证据

以下文件仍保留用于追溯，但 2026-06-30 复核确认它们只包含登录重定向页面和验证码接口，不计入业务接口完成证据。

```text
platform-scanCode.cdp-load.har
platform-scanRecords.cdp-load.har
platform-billIssue.cdp-load.har
platform-invoiceApplication.cdp-load.har
platform-redMark.cdp-load.har
billCenter-sign.cdp-load.har
billCenter-invoiceVerification.cdp-load.har
billCenter-accessSetting.cdp-load.har
billCenter-taskManagement.cdp-load.har
bussiness-info.cdp-load.har
bussiness-customer.cdp-load.har
bussiness-credit.cdp-load.har
bussiness-configurationManagement.cdp-load.har
system-dept.cdp-load.har
system-departmentInfo.cdp-load.har
system-role.cdp-load.har
system-onlineTaxationInfo.cdp-load.har
system-user.cdp-load.har
downloadCenter.cdp-load.har
```

## 当前限制

- 本轮验收覆盖“默认页面加载/默认列表/默认看板”真实接口证据。
- 真实业务 HAR 证据当前只覆盖 13 个非手工页面；剩余 19 个页面需要从已登录 Chrome 会话中重新采集。
- 详情、下载、同步、签收、入账、认证、红冲、真实开票等动作仍按高风险动作处理，不能自动触发。
- `analysisBoard-invoiceRegionView.default-list-2.har` 已包含地区统计真实接口，但同文件还混入商品/趋势接口；如后续做颗粒级 HAR 清洁验收，可单独复采干净版。

## 验收命令

已执行：

```bash
npm run tax-cloud:har:parse-all
npm run tax-cloud:har:tasks
npm run tax-cloud:audit:strict
```
