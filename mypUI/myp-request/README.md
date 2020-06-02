# myp-request
简洁干脆的请求器。颗粒细，可配置和定制能力强。有任何问题可以加我`QQ：382006503`或者`微信：pptpdf`。

`myp-request` 也就是以前的 `wakary-request`。

因为我们自己做了一套 `nvue` 页面 `uni-app` 模式下的 组件 `mypUI`，为了名字更加简短，改为 `myp-request`。

整个处理逻辑都比较`直接`，代码也比较`直白`，就是`简单粗暴`的去适配`uni.request`，并且支持`全局配置`和`独立覆盖`。

- 请求拦截，比如Header/URL配置检测、自动刷新Token等；
- 响应拦截；
- 在uni.request的回调中使用的全局callback；
- api级别的callback；
- 支持常规请求，上传以及下载；
- 支持Promise以及Task；
- 支持同步/异步；
- 支持配置取消/错误的提示信息；
- 更多...

> **注意：**
> 
> 没有对`header`做细致的合并工作（不打算处理），也就是请求中的`header`配置是直接覆盖全局中的`header`配置，而不是差异合并（当然，如果你有特殊需求，可以在`请求拦截器`里面处理`header`）。
> 
> 不对`url`进行任何的检测（自己保证`url`的合法性），最终的`url`就是`baseUrl`和`api`配置中`url`的拼接（当然，你可以在拦截请求器里面修改`url`）。
> 
> 可以根据需要在构建接口时任意添加`参数/字段`，方便你在`拦截器`里面使用。
> 
> 不会`类axios`处理，不会进一步抽象与提炼。

`仿axios`的请求库，插件市场有一个人气很高的`luch-request[支持js/ts]`：[https://ext.dcloud.net.cn/plugin?id=392](https://ext.dcloud.net.cn/plugin?id=392)

...更多请求库请搜索`request` `axios`...

# 使用
源码比较直白，可以看源码:

- `Request`class对象，需要实例化；
- 提供了一个`request`方法，`request`方法会调用您设置的`请求拦截器`，提前拦截；
- 适配`uni.request`，完成 `request` 方法；
- 请求取消或者失败会走`reject`（`catch`中处理）；
- 您可以通过`mypReqToReject`在响应拦截器中自由控制是否进入`reject`；

## 初始化请求器

自己可以新建一个 `request.js`，用来配置自己的请求器。

```js
// 引入 Request
import Request from '@/mypUI/myp-request/index.js'

// 设置 通用的 baseUrl 以及 header
const config = {
	baseUrl: baseUrl,
	header: {"content-type": "application/x-www-form-urlencoded"},
	// 取消请求时的提示信息配置，自己根据自己的需要设置字段以及内容
	// 全局有效，可以在api的options中进行单独覆盖配置
	cancelReject: {
		text: '请求未通过验证,检查是否登录或者数据正确',
		type: 'warning'  // 我用来控制提示UI的样式
	},
	// 请求失败时的提示信息配置，自己根据自己的需要设置字段以及内容
	// 全局有效，可以在api的options中进行单独覆盖配置
	// 您可以不提供该配置，当failReject为null的时候，会自动reject错误信息(uni.request的fail错误信息)
	failReject: {
		type: 'error',  // 我用来控制提示UI的样式
		text: "网络异常，请求发送失败，请检查网络"
	}
}

// 设置自己的请求拦截器，必须加上 `async`
// 请求前的拦截，比如是否登录/过期/刷新token/...
const reqInterceptor = async (options) => {
	// 必须返回一个 Object 或者 false
	// false 代表该 请求被拦截，不会进行请求
	// 请求被拦截时，也可以配置拦截时的提示信息：cancelReject-对象
	// return {mypReqToCancel: true, cancelReject: {...}}
	// 或者返回配置，配置中可以携带请求失败时的提示信息 failReject-对象
	return options
}

// 设置自己的响应拦截器
// 统一对返回的数据进行整理，方便接口统一使用
const resInterceptor = (response, conf={}) => {
	// 必须返回你需要处理的数据，将会进入resolve（then中处理）
	// 如果需要reject，需要设置mypReqToReject:true，还可以携带自己定义的任何提示内容（catch中处理）
	return response
}

// 实例化请求器
// 您可以根据需要实例化多个请求器
const req = new Request(config, reqInterceptor, resInterceptor)

export default req
```

## 构建api或者直接使用

我们使用了一些固定的参数来定义请求的类别：

- type: request-普通请求，upload-上传，download-下载；
- cancelReject: Object。您定义的取消请求时的提示内容；
- failReject: Object。您定义的请求失败时的提示内容；

### 构建api
```js
import request from '@/common/request.js'

// baseUrl: 'https://www.baidu.com'
// 在您需要请求的地方直接使用该api
export function editInfo(data) {
	return request.request({
		url: '/search',
		method: 'POST',
		data: data
	})
}
```

```js
import { editInfo } from '@/api/user.js'

export default {
	methods: {
		changeUserInfo() {
			editInfo({name: 'nickname'}).then(res => {
				// success
			}).catch(err => {
				// error
				// err 有可能是 Error 对象，也有可能是 您自己定义的内容，处理的时候您需要自己判断
				// 一个通用的错误提示组件就可以完成
			})
		}
	}
}
```

### 直接使用

```js
import request from '@/common/request.js'

export default {
	methods: {
		changeUserInfo() {
			request.request({
				url: '/edit_info',
				data: {name: 'nickname'},
				method: 'POST'
			}).then(res => {
				// success
			}).catch(err => {
				// error
			})
		}
	}
}
```

当然，您也可以在其它`js`中使用，比如`store`。

# 建议

在构建`api`或者使用`request`的时候，您可以根据需要在`参数`里面增加字段，这样您可以根据自己的字段在`拦截器`里面做更多的事情。

## 比如

```js
export function login(data) {
	return request.request({
		url: '/login',
		method: 'POST',
		data: data,
		authType: 'None'
	})
}
```

我们在`options`里面增加了一个`authType`参数，这样我们在构建`拦截器`的时候可以根据这个参数来判断该接口是否需要`登录授权`。

```js
const reqInterceptor = async (options) => {
	if (options.authType === 'None') {
		return options
	}
	return false
}
```

# 更多

这就是一个最简单直接的请求库，你可以查看源码，从而根据自己的需要构建一个满意的`拦截器`和`响应器`。

其实就是根据你的接口配置信息以及拦截返回的数据进行判断，进一步去适配`uni.request`。

一切需要的都可以通过拦截器来实现。

# `mypUI`

全新的 `nvue-uniapp` 组件，一套组件支持编译到 `mp/h5/app`。

QQ群：`306797275`
