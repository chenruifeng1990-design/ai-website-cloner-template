# 页面采集：扫码开票

## 基本信息

- 一级菜单：销项管理
- 二级菜单：扫码开票
- URL：`https://fp.enuoyun.com/platform/scanCode`
- 页面 key：`platform-scanCode`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P1

## 已采集文件

- raw：`docs/tax-cloud/captures/platform-scanCode.raw.json`
- visible DOM：`docs/tax-cloud/captures/platform-scanCode.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/platform-scanCode-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-platform-scanCode-fullpage.png`

## 页面结构

- 扫码开票配置区：开票类型、扫码开票方式、有效期、备注。
- 明细行配置：项目名称、规格型号、单位、数量、金额等。
- 二维码/链接生成区：生成、复制、下载、作废。
- 结果状态：客户扫码后补全信息、待开票、已开票、失效。

## ERP 映射

- ERP 入口：扫码开票工作台，后置于合同直达开票主线。
- 数据来源：ERP 客户资料、商品税编、数税云扫码申请状态。
- 业务目标：支持外部客户扫码补齐开票资料，但真实开票仍进入飞书审批和真实开票门禁。

## 接口候选

- 扫码链接/二维码生成：待真实 Network 补抓，L2。
- 扫码记录查询：和 `platform-scanRecords` 联动，L0。
- 真实开票：禁止从本页直接触发 L4，必须回到 ERP 草稿审批链路。

## 验收标准

- 二维码生成、复制、失效状态可表达。
- 客户填写资料不得直接覆盖 ERP 客户资料，需人工确认。
- 生成扫码单不能绕过飞书审批。
