# myp-request
简洁干脆的请求器。颗粒细，可配置和定制能力强。有任何问题可以加我QQ：382006503或者微信。

`myp-request` 也就是以前的 `wakary-request`。

因为我们自己做了一套 `nvue` 页面 `uni-app` 模式下的 组件 `mypUI`，为了名字更加简短，改为 `myp-request`。

已在大项目中使用：

- 请求拦截，比如Header/URL配置检测、自动刷新Token等；
- 响应拦截；
- 在uni.request的回调中使用的全局callback；
- api级别的callback；
- 支持常规请求，上传以及下载；
- 支持Promise以及Task；
- 支持同步/异步；
- 支持配置取消/错误的提示信息；
- 更多...

# 使用
源码结构比较清晰，可以看源码:

- `Request` class 对象，需要实例化；
- 提供了一个 `request` 方法，`request` 方法 会调用 您设置的 请求拦截器，提前拦截；
- 适配`uni.request`，完成 `request` 方法；
- 请求取消或者失败会走`reject`（`catch`中处理）；
- 您可以通过 `mypReqToReject` 在响应拦截器中自由控制是否进入`reject`；

## 初始化请求器

自己可以新建一个 `request.js`，用来配置自己的请求器。

```js
// 引入 Request
import Request from '@/mypUI/myp-request/index.js'

// 设置 通用的 baseUrl 以及 header
const config = {
	baseUrl: baseUrl,
	header: {"Content-Type": "application/x-www-form-urlencoded"},
	// 取消请求时的提示信息配置，自己根据自己的需要设置字段以及内容
	// 全局有效，可以在api的options中进行单独覆盖配置
	cancelReject: {
		text: '请求未通过验证,检查是否登录或者数据正确',
		type: 'warning'
	},
	// 请求失败时的提示信息配置，自己根据自己的需要设置字段以及内容
	// 全局有效，可以在api的options中进行单独覆盖配置
	// 您可以不提供该配置，当failReject为null的时候，会自动reject错误信息(uni.request的fail错误信息)
	failReject: {
		type: 'error',
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
	// 或者返回配置，配置中可以携带 请求失败时的提示信息 failReject-对象
	return options
}

// 设置自己的响应拦截器
// 统一对返回的数据进行整理，方便接口统一使用
const resInterceptor = (response, conf={}) => {
	// todo your logic, must return the data u needed. it will be resolved.
	// if u want to reject, u could return {mypReqToReject:true,...other k-v}
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

// 在您需要请求的地方直接使用该api
export function editInfo(data) {
	return request.request({
		url: 'your url',
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
				url: 'url',
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
		url: 'your login url',
		method: 'POST',
		data: data,
		authType: 'None'
	})
}
```

我们在`options`里面增加了一个 `authType` 参数，这样我们在构建`拦截器`的时候可以根据这个参数来判断该接口是否需要`登录授权`。

```js
const reqInterceptor = async (options) => {
	if (options.authType === 'None') {
		return options
	}
	return false
}
```

# 更多

最重要的事情不是您可以发送请求了，而是您应该查看源代码，从而明白如何根据自己的需要构建一个满意的`拦截器`和`响应器`。甚至自己也能知道如何利用`uni.request`构建一个自己的`请求器`。

只有会了才是您自己的。

# `mypUI`

全新的 `nvue-uniapp` 组件，一套组件支持编译到 `mp/h5/app`。

## 特点：

- `nvue`页面组件，一套页面适合全端，且`app`端对应为`weex`原生，对于`app`端性能提升很大；
- 开放主题配置，通过`scss`变量配置主题，默认配置5套主题，支持无限套主题；
- 基于效率与细节定制双重考虑，支持快速使用与细节定制；
- 不仅仅只是一套UI组件，还有更多关于uniapp的注意细节，使用示范；
- 代码规范，注重代码质量与开发效率。

## 包含内容

- 常用组件：button/cell/icon/grid/input/item/radio/check/group/tag/notify/over/loading/popup/toast/navbar/tabbar/tabs/refresh/loading/divider/picker...UI组件上该有的都有;
- 能够在大项目中直接使用的request请求库；
- 打开与关闭动画都良好的popup/modal/actionsheet等，且在app端优化。百分比支持关闭动画，不只是打开动画；
- 快速从icons的css文件中提取icon的Python脚本；
- Vue/uni-app整套的教程，包含基础和进阶，高级，不需要再次花时间和金钱来徘徊（事件机制/通信/vuex/router/nextTrick/refs/mixin/provide/inject/...）；
- 下拉刷新/上提加载，封装良好，scroll全平台支持，而且app支持weex中的list；
- 自定义的tabbar（非swiper方式实现）以及navbar，支持popup全屏；
- ...

