# 页面采集：取票设置

## 基本信息

- 一级菜单：票据中心
- 二级菜单：取票设置
- URL：`https://fp.enuoyun.com/billCenter/accessSetting`
- 页面 key：`billCenter-accessSetting`
- 当前状态：page-captured，api-pending，demo-pending，erp-pending
- 优先级：P1

## 已采集文件

- raw：`docs/tax-cloud/captures/billCenter-accessSetting.raw.json`
- visible DOM：`docs/tax-cloud/captures/billCenter-accessSetting.visible-dom.json`
- 截图：`docs/tax-cloud/screenshots/billCenter-accessSetting-fullpage.png`
- 视觉参考：`docs/design-references/tax-cloud-billCenter-accessSetting-fullpage.png`

## 页面结构

- 默认 Tab：发票获取设置。
- 同页 Tab：发票获取设置、银行单据获取设置、异常发票规则配置。
- 当前默认页是配置表单，不是配置列表。
- 可见配置：若干开关项、同时获取 PDF/XML/OFD 文件、初始化设置、年度选择。
- 当前可见操作：保存设置。

## ERP 映射

- ERP 入口：税务同步配置。
- 数据来源：数税云取票设置、ERP 同步游标。
- 业务目标：控制发票池同步任务的范围和周期。

## 接口候选

- 取票设置读取：`/invoicecenter/sjruzhang/getSjruzhangSetting` 候选，L0。
- 取票设置保存：`/invoicecenter/sjruzhang/saveSjruzhangSetting` 候选，L2，禁止自动触发。
- 取票任务重启：`/invoicecenter/sjruzhang/restartTask` 候选，L2，禁止自动触发。
- ERP 同步游标：`/api/tax-invoices/sync-cursors`，L0。

## 验收标准

- 配置变化必须审计；保存设置不得在采集流程中点击。
- 自动取票不能重复入池。
- 失败任务能进入任务管理。
