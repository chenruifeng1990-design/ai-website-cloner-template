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

- 筛选区：任务类型、状态、创建时间、操作人。
- 列表区：任务名称、类型、总数、成功数、失败数、状态、开始/结束时间、错误信息。
- 操作区：刷新、重试、下载结果、查看失败明细。

## ERP 映射

- ERP 入口：同步任务和下载任务中心。
- 数据来源：数税云任务、ERP 发票同步任务、本地下载任务。
- 业务目标：让取票、下载、查验、导入导出都有进度和失败处理。

## 接口候选

- 任务列表/详情/重试：待真实 Network 补抓，L1/L2。
- ERP 同步任务：`/api/tax-invoices/sync-sales`、`/api/tax-invoices/sync-purchases`，L2。

## 验收标准

- 任务失败不静默。
- 重试必须幂等。
- 下载结果能关联下载中心。
