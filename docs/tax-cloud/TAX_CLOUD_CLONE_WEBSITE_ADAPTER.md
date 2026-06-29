# clone-website 用于数税云后台的适配方案

## 为什么需要适配

原始 `clone-website` 适合克隆一个公开网站页面，例如官网、落地页、产品页。数税云是登录态后台系统，特点不同：

- 多一级/二级菜单。
- 页面里有大量表格、筛选、弹窗、抽屉。
- 有真实税务写入动作。
- 有接口权限、数电登录、扫码认证状态。
- 需要映射到 ERP/金蝶/飞书，不是纯视觉页面。

所以不能直接 `/clone-website https://fp.enuoyun.com/platform/created` 后就结束。

## 适配后的流水线

```text
1. Capture Menu Tree
2. Capture Page Inventory
3. Capture API/Action Inventory
4. Write Page Spec
5. Generate Demo
6. Visual QA
7. ERP Mapping
```

## 目录约定

```text
docs/tax-cloud/
  TAX_CLOUD_MENU_TREE.md
  TAX_CLOUD_PAGE_INVENTORY.md
  TAX_CLOUD_API_INVENTORY.md
  TAX_CLOUD_TO_ERP_MAPPING.md
  captures/
    <page-key>.raw.json
    <page-key>.visible-dom.json
  screenshots/
    <page-key>-fullpage.png
  pages/
    <page-key>.page.md
  apis/
    <page-key>.api.md
  mapping/
    <page-key>.mapping.md

docs/research/tax-cloud/components/
  <component>.spec.md

docs/design-references/
  tax-cloud-<page-key>-fullpage.png
```

## 页面 key 规则

把 URL path 转成 key：

```text
/platform/created                -> platform-created
/billCenter/fullInvoiceQuery     -> billCenter-fullInvoiceQuery
/analysisBoard/invoiceTypeView   -> analysisBoard-invoiceTypeView
```

## 每个页面必须采集的内容

```text
页面 URL
页面标题
一级菜单
二级菜单
截图
可见 DOM
按钮列表
输入项列表
表格列表
弹窗/抽屉
筛选条件
批量动作
状态标签
接口列表
风险等级
ERP 对应模块
```

## 每个组件 spec 必须包含

```text
组件名称
目标页面
截图引用
DOM 结构
表格结构
rowSpan / colSpan
列宽
行高
边框颜色/粗细
字号/字重/行高
文字对齐
按钮状态
输入框状态
空态
错误态
加载态
交互方式
响应式变化
```

## 数税云票面特殊要求

票面不能再用 div/grid 仿结构，必须用真实 table 语义描述：

```text
工具栏：独立组件
票面标题/额度：独立组件
购买方 + 通知到：同一张 table，左侧 rowSpan，右侧 colSpan
商品明细：明细表 table
合计/价税合计：table 的合并行
销售方 + 备注：同一张 table，左侧 rowSpan，右侧备注 colSpan
附加信息：table 底部区域
收款人/复核人/开票人/经办人：票面外底栏
```

结构级验收项：

- 冒号垂直对齐。
- label 右对齐。
- 数字金额右对齐。
- 购买方/销售方竖排标题与原页面一致。
- 商品表头、明细行、空白行、合计行高度一致。
- 合并单元格边界一致。
- 额度区、标题区、订单号位置一致。

## 接口采集规则

每个按钮都要落到接口清单，不允许只写“待接”。

记录格式：

```text
按钮/动作：
页面区域：
接口 URL：
method：
payload：
response：
风险等级：
是否已在 ERP 封装：
是否可接真实接口：
是否需要 mock：
```

## clone 产物进入 ERP 的规则

1. clone 生成的页面先进入 demo。
2. demo 通过截图验收后，再拆成 ERP 组件。
3. 真实业务接口由 ERP adapter 接管。
4. L3/L4 税务动作默认 mock/禁用，除非已有审批和服务端门禁。
5. 不允许 clone 产物直接替换 ERP 主线。

## 当前首个页面任务

页面：`/platform/created`

已采集：

- `docs/tax-cloud/captures/platform-created.raw.json`
- `docs/tax-cloud/captures/platform-created.visible-dom.json`
- `docs/tax-cloud/screenshots/platform-created-fullpage.png`

下一步组件 spec：

```text
TaxCloudIssueToolbar.spec.md
TaxCloudIssueQuotaHeader.spec.md
TaxCloudBuyerNotifyTable.spec.md
TaxCloudGoodsInvoiceTable.spec.md
TaxCloudSellerRemarkTable.spec.md
TaxCloudExtraInfoTable.spec.md
TaxCloudFooterActors.spec.md
```

