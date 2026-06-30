# 页面采集：下载中心

## 基本信息

- 一级菜单：顶部入口
- 二级菜单：下载中心
- URL：`https://fp.enuoyun.com/downloadCenter`
- 页面 key：`downloadCenter`
- 当前状态：page-captured，api-probed，demo-pending，erp-pending
- 优先级：P1

## 已采集文件

- raw：`docs/tax-cloud/captures/downloadCenter.raw.json`
- visible DOM：`docs/tax-cloud/captures/downloadCenter.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/downloadCenter-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-downloadCenter-fullpage.png`

## 页面结构

当前真实页面是工具下载中心，不是业务下载任务列表。

- 顶部入口：任务管理、下载中心。
- 企业登录态：显示企业名称、管理员、数电账号、登录状态。
- 工具分组：
  - 一、同步工具：365基础服务工具2.0。
  - 二、打印工具：打印助手。
  - 三、51发票客户端：51发票助手（当前 DOM 未暴露文件 href）。
  - 四、数据库工具：数据库工具。
  - 五、ERP导入工具：ERP导入工具。
  - 六、税控系统、A9服务器获取发票客户端：获取发票客户端。
- 认证侧栏：数电登录、数电认证、电子税局登录。

## ERP 映射

- ERP 入口：工具下载帮助页、版式文件下载说明页、税控/同步工具下载入口。
- 数据来源：数税云下载中心静态文件链接、ERP 本地文件任务另行建模。
- 业务目标：明确哪些工具是外部安装包下载，哪些才是 ERP 业务文件/OFD/PDF/XML 下载；两类不能混在一个接口验收口径中。

## 接口候选

- 工具安装包静态链接：Chrome DOM 已确认 `CloudTaxBaseService.exe`、`AisinoPrinterSetup.exe`、`accessClient.exe`、`ERPImportTool.zip`、`shushuiyunkehuduan.zip`，L0-static，不要求 HAR。
- 数税云接口候选：`/prod-api/invoicecenter/invoiceTemplate/v1/download/template/taskId` 当前只读探针 HTTP 200 但空 body，需页面动作 HAR 确认是否为文件流/任务型响应，不算业务成功。
- 版式文件下载：`ynfp.invoice.pool.file.download`，L2，属于发票池/开票记录动作，不等同于下载中心工具包。

## 验收标准

- 页面能区分“工具安装包下载”和“业务文件下载任务”。
- 工具下载链接可见且不自动触发下载。
- 文件下载/版式下载/OFD/PDF/XML 的业务入口必须另按发票池、开票记录等来源页面建模。
- `tax-cloud:audit:strict` 仍以真实 HAR 为准；静态工具链接不替代业务接口 HAR。
