# 页面采集：手工开票

## 基本信息

- 一级菜单：销项管理
- 二级菜单：手工开票
- URL：`https://fp.enuoyun.com/platform/created`
- 页面 key：`platform-created`
- 采集状态：已完成初采

## 已采集文件

- raw DOM/结构：`docs/tax-cloud/captures/platform-created.raw.json`
- visible DOM：`docs/tax-cloud/captures/platform-created.visible-dom.json`
- full-page screenshot：`docs/tax-cloud/screenshots/platform-created-fullpage.png`
- clone design reference：`docs/design-references/tax-cloud-created-fullpage.png`

## 可见功能区

1. 左侧一级/二级菜单。
2. 顶部任务管理/下载中心/企业/管理员。
3. 开票工具栏：
   - 含税
   - 待开发票
   - 清单导入
   - 折扣
   - 普通开具
   - 差额
   - 减按征收
   - 复制
   - 草稿箱
   - 暂存草稿
   - 提交开票
4. 订单编号。
5. 发票类型。
6. 额度区：
   - 开票总额度
   - 可用总额度
   - 开票账号
   - 更新
7. 购买方/通知到 table。
8. 商品明细 table。
9. 价税合计合并行。
10. 销售方/备注 table。
11. 附加信息。
12. 收款人/复核人/开票人/经办人/经办人证件/证件号码。
13. 数电登录/数电认证/电子税局登录侧栏。

## 首批组件 spec

| 组件 | 说明 | 状态 |
|---|---|---|
| `TaxCloudIssueToolbar` | 工具栏按钮和开票模式 | pending |
| `TaxCloudIssueQuotaHeader` | 发票类型、额度和订单号 | pending |
| `TaxCloudBuyerNotifyTable` | 购买方和通知到合并表格 | pending |
| `TaxCloudGoodsInvoiceTable` | 商品明细、合计、价税合计 | pending |
| `TaxCloudSellerRemarkTable` | 销售方和备注合并表格 | pending |
| `TaxCloudExtraInfoTable` | 附加信息/场景模板 | pending |
| `TaxCloudFooterActors` | 收款人/复核人/开票人等底栏 | pending |
| `TaxCloudDigitalLoginPanel` | 数电登录/认证侧栏 | pending |

## 已知差距提醒

ERP 当前票面最容易跑偏的位置：

1. `购买方/通知到` 必须是合并表格，不是普通 grid。
2. `商品明细` 的合计行和价税合计行必须使用表格合并单元格。
3. label 和冒号必须结构化对齐，不要用散文本。
4. 额度接口必须显示真实接口状态，不能写死假值。
5. 数税云原页面有数电登录/认证状态侧栏，ERP 当前票面还没完整映射。

