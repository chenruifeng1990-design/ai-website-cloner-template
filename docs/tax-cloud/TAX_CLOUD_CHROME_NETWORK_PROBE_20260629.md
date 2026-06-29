# 数税云 Chrome Network 探测记录

时间：2026-06-29

## 目标

确认是否可以直接复用当前 Chrome 登录态，自动读取数税云网页端接口请求和额度接口。

## 已确认的 Chrome 标签

| 页面 | URL | 结果 |
|---|---|---|
| 数税云手工开票 | `https://fp.enuoyun.com/platform/created` | 可连接，可读取页面基本状态 |
| 数税云发票池 | `https://fp.enuoyun.com/billCenter/fullInvoiceQuery` | 已打开，未执行写动作 |
| 额度接口页 | `https://fp.enuoyun.com/prod-api/bussiness/credit/creditInfo/1?...` | 当前被 Chrome 扩展拦截为 `ERR_BLOCKED_BY_CLIENT` |

## 探测结论

当前 Chrome 控制工具可以连接已有标签，但不能直接完成“真实 Network 全量抓取”：

1. 已打开的额度接口页被 Chrome 扩展拦截，页面显示：

```text
ERR_BLOCKED_BY_CLIENT
```

2. 在数税云页面上下文中，Chrome 插件提供的只读执行环境不暴露：

```text
fetch
XMLHttpRequest
```

因此不能通过页面脚本直接补发同源 GET 请求。

3. 当前可稳定取得的是：

- 页面 URL
- 页面标题
- DOM / 可见结构
- 截图

4. 当前不能稳定取得的是：

- DevTools Network 中每个 XHR/fetch 的 headers
- Cookie 明文
- 请求 payload
- response body
- 已发生请求的完整 HAR

## 对任务的影响

文档和 demo 侧不受影响：

- 33 页采集完整
- 33 页 page spec 初版完整
- P0/P1/P2/P3 动作矩阵完整

接口实抓仍然未完成：

```text
Chrome 登录态存在
但当前自动化接口无法直接导出 Network/HAR
```

## 推荐补抓方式

### 方案 A：人工导出 HAR

在 Chrome DevTools Network 中：

1. 打开目标页面。
2. 勾选 Preserve log。
3. 点击页面动作。
4. 右键 Network 列表。
5. Save all as HAR with content。
6. 把 HAR 文件放到：

```text
docs/tax-cloud/network-har/
```

随后用脚本解析 HAR，更新：

```text
TAX_CLOUD_API_INVENTORY.md
TAX_CLOUD_P0_INTERFACE_ACTION_AUDIT.md
TAX_CLOUD_P1_P2_P3_INTERFACE_ACTION_AUDIT.md
```

解析脚本：

```bash
node scripts/parse-tax-cloud-har.mjs docs/tax-cloud/network-har/<file>.har --page-key=<page-key>
```

### 方案 B：临时关闭拦截插件后重试额度接口

当前额度接口页被扩展拦截。临时停用相关拦截扩展后，重新打开：

```text
https://fp.enuoyun.com/prod-api/bussiness/credit/creditInfo/1
```

预期回执应类似：

```json
{
  "msg": "操作成功",
  "code": 200,
  "data": {
    "remainCreditAmount": "3372369.76",
    "creditAmount": "10303435.35"
  }
}
```

### 方案 C：服务端代理读取

把数税云网页登录态或平台 token 配到 ERP 后端，由后端代理请求：

```text
GET /api/tax-invoices/issue-credit?type=1
```

该方案适合额度、销方、场景模板、客户库等 L0/L1 查询；不适合直接绕过门禁执行 L3/L4 动作。

## 当前验收状态

| 项 | 状态 |
|---|---|
| Chrome 标签连接 | done |
| 数税云页面读取 | done |
| 额度接口自动读取 | blocked |
| Network/HAR 自动导出 | blocked |
| 需要人工 HAR 或服务端代理 | yes |

## 继续执行要求

下一步如要进入真实接口层，必须满足至少一个条件：

- 提供 HAR 文件；
- 允许并完成 Chrome 扩展拦截排查；
- 在 ERP 后端配置数税云 platform 登录态/token；
- 使用能够访问 DevTools Network 的浏览器调试通道。
