# 页面采集：任务管理

## 基本信息

- 一级菜单：票据中心
- 二级菜单：任务管理
- URL：`https://fp.enuoyun.com/billCenter/taskManagement`
- 页面 key：`billCenter-taskManagement`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P1

## 已采集文件

- raw：`docs/tax-cloud/captures/billCenter-taskManagement.raw.json`
- visible DOM：`docs/tax-cloud/captures/billCenter-taskManagement.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/billCenter-taskManagement-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-billCenter-taskManagement-fullpage.png`

## 页面结构

- 默认 Tab：数据同步任务。
- 同页 Tab：数据同步任务、下载任务。
- 当前默认页可见多条“重新开始”按钮，大部分为禁用态。
- 可见筛选/分页控件：下拉选择、上一页/下一页、页码输入。
- 下载任务 Tab 需要切换后另采，不与数据同步任务混成一个表。

## ERP 映射

- ERP 入口：同步任务和下载任务中心。
- 数据来源：数税云任务、ERP 发票同步任务、本地下载任务。
- 业务目标：让取票、下载、查验、导入导出都有进度和失败处理。

## 接口候选

- 数据同步任务列表：`/system/taskRecord/list` 候选，L0。
- 任务重试：`/system/taskRecord/restart/` 候选，L2，禁止自动触发。
- 下载任务列表：切换下载任务 Tab 后待真实 Network 补抓，L0/L2。
- ERP 同步任务：`/api/tax-invoices/sync-sales`、`/api/tax-invoices/sync-purchases`，L2。

## 验收标准

- 任务失败不静默。
- 重试必须幂等。
- 下载任务和工具下载中心不是同一页面语义；下载结果需要关联来源业务动作。
