# 数税云 Chrome 会话接口采集探测记录

时间：2026-06-29

## 目标

尝试利用当前 Chrome 已登录的数税云会话，自动采集低风险 GET 接口证据，优先验证：

- `GET /prod-api/bussiness/credit/creditInfo/1`
- 后续扩展到开票记录、发票池、分析看板等 L0 查询接口

## 已尝试路径

### 1. Chrome 扩展控制当前数税云页面

已能列出并 claim 当前 Chrome 中的数税云页面：

- `https://fp.enuoyun.com/analysisBoard/purchaseSalesTrend`
- `https://fp.enuoyun.com/billCenter/fullInvoiceQuery`
- `https://fp.enuoyun.com/platform/created`

但当前 Chrome 控制环境的 `playwright.evaluate` 是受限只读上下文：

- `fetch` 不可用
- `XMLHttpRequest` 不可用
- `localStorage` / `sessionStorage` 不可用

因此无法直接在页面上下文发起同源 GET 或读取前端 token。

### 2. 直接打开额度接口页面

Chrome 中存在接口页：

```text
https://fp.enuoyun.com/prod-api/bussiness/credit/creditInfo/1
```

但该标签页被 Chrome 扩展拦截，页面显示：

```text
ERR_BLOCKED_BY_CLIENT
```

因此不能作为稳定证据来源。

### 3. 本机 Chrome 调试端口

本机存在 `127.0.0.1:9333` DevTools 端口，但该端口当前只暴露另一 Chrome profile 的页面，未暴露数税云登录页面。

已确认能看到的页面包括 ERP 票面页，但不是数税云页面，因此无法通过 CDP 抓数税云 Network。

### 4. 读取 Chrome Default Cookies

本机 `Default/Cookies` 中存在数税云 cookie 名：

```text
JSESSIONID
dzfp-ssotoken
SCY-Token
Admin-Expires-In
sidebarStatus
rememberMe
```

仅用 cookie 请求额度接口返回：

```text
401 令牌不能为空
```

说明数税云接口还需要前端 token header。

尝试用 macOS Chrome Safe Storage 老算法解密 cookie token 后，解密结果不是可靠 ASCII token；继续使用会产生错误 header，不能作为证据。

## 当前结论

自动采集真实接口证据尚未打通。当前可信路线仍是：

```text
Chrome DevTools Network 手工导出 HAR
→ 保存到 docs/tax-cloud/network-har/
→ npm run tax-cloud:har:parse-all
→ npm run tax-cloud:har:tasks
→ npm run tax-cloud:audit
```

## 不得做

- 不提交原始 HAR。
- 不把 Cookie/token 写入文档。
- 不用解密失败的 token 继续伪造请求。
- 不对 L3/L4 动作做自动触发探测。

## 下一步

优先采集 `TAX_CLOUD_HAR_CAPTURE_TASKS.md` 中的低风险 L0 页面：

1. `bussiness-credit.creditInfo.har`
2. `platform-records.default-list.har`
3. `billCenter-fullInvoiceQuery.default-list.har`
4. `analysisBoard-purchaseSalesTrend.default-list.har`

采集后用机器审计确认 `HAR-backed real interface evidence` 从 `0/32` 开始增长。
