# 页面采集：下载中心

## 基本信息

- 一级菜单：顶部入口
- 二级菜单：下载中心
- URL：`https://fp.enuoyun.com/downloadCenter`
- 页面 key：`downloadCenter`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P1

## 已采集文件

- raw：`docs/tax-cloud/captures/downloadCenter.raw.json`
- visible DOM：`docs/tax-cloud/captures/downloadCenter.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/downloadCenter-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-downloadCenter-fullpage.png`

## 页面结构

- 下载任务列表：文件名、类型、任务状态、创建时间、完成时间、操作。
- 筛选区：文件类型、任务状态、时间。
- 操作区：下载、删除、重试、查看错误。

## ERP 映射

- ERP 入口：版式文件下载、导出任务、批量查验结果。
- 数据来源：数税云下载中心、ERP 本地文件任务。
- 业务目标：统一管理 OFD/PDF/XML、导出表、查验结果等文件。

## 接口候选

- 下载任务列表/文件下载：待真实 Network 补抓，L0/L2。
- 版式文件下载：`ynfp.invoice.pool.file.download`，L2。

## 验收标准

- 每个下载任务有来源页面和来源动作。
- 文件过期、失败、权限不足要可见。
