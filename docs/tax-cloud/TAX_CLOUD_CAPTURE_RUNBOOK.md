# 数税云 Clone 工作台执行手册

## 目标

把数税云后台系统按真实菜单、真实页面、真实接口、真实交互状态完整采集，再用 `clone-website` 模板生成可验收的静态/交互 demo，最后映射回聚兴 ERP。

本工作台只做采集、复刻和对照，不直接改 ERP 主项目。

## 当前工作台

- 模板项目：`/Users/chenruifeng/Desktop/视频生成/ai-website-cloner-template`
- 数税云采集目录：`docs/tax-cloud/`
- clone 视觉参考：`docs/design-references/`
- 组件 spec 目录：`docs/research/tax-cloud/components/`
- 已采集页面：`https://fp.enuoyun.com/platform/created`

## 工具能力边界

`clone-website` 适合：

- 页面截图
- DOM 结构提取
- computed style 提取
- 字体/颜色/间距/边框 token 提取
- 状态、hover、弹窗、表格结构记录
- 生成 Next.js/Tailwind demo
- 视觉 QA 对比

`clone-website` 不负责：

- 自动拉完整后台菜单树
- 自动抓完整 Network 接口
- 判断真实税务风险
- 对接飞书审批
- 对接金蝶
- 直接改线上 ERP

因此本项目增加一层“数税云后台采集规程”：

```text
菜单树采集
→ 页面状态采集
→ 接口/动作采集
→ clone-website 视觉复刻
→ ERP 映射
→ 组件化落地
```

## 执行顺序

1. 在 Chrome 登录数税云。
2. 对每个一级菜单展开二级菜单，记录真实 URL。
3. 进入每个二级页面，保存：
   - full-page screenshot
   - visible DOM
   - links/buttons/inputs/tables
   - page text
   - scripts/stylesheets
4. 对页面做交互采集：
   - 默认态
   - 有数据态
   - 空态
   - 筛选态
   - 弹窗态
   - 详情态
   - 批量选择态
   - 错误态
5. 对每个按钮动作抓接口：
   - URL
   - method
   - request payload
   - response shape
   - 写入/查询风险
6. 为每个页面写 component spec。
7. 用模板生成独立 demo。
8. 只在 demo 验收后，再迁移到 ERP。

## 风险分级

| 级别 | 含义 | 示例 |
|---|---|---|
| L0 | 只读查询 | 列表、详情、字典、额度查询 |
| L1 | 本地状态 | 筛选、导出、前端状态切换 |
| L2 | 平台任务 | 同步、取票、下载、查验、签收 |
| L3 | 税务状态动作 | 勾选、认证、红字确认、统计确认 |
| L4 | 真实开票 | 提交开票、审批后自动开票 |

L3/L4 不允许在 clone demo 中接真实提交接口，只能标记接口、保留 UI 和 mock。

## 必须保留的 ERP 业务口径

```text
合同/出库事实
→ 数税云真实开票草稿
→ 保存/预览
→ 飞书审批
→ 审批通过
→ 数税云真实开票
→ 发票池入池
→ 金蝶入账核对
→ 三方对账
```

数税云“开票申请单”只能借鉴视觉，不恢复旧 ERP `invoice_application` 主流程。

## 已完成初始化

- 已拉取 `JCodesMore/ai-website-cloner-template`
- 已安装依赖
- `npm run typecheck` 通过
- `npm run lint` 通过
- `npm run build` 通过
- 已采集 `platform/created` raw JSON
- 已保存 `platform/created` full-page screenshot

