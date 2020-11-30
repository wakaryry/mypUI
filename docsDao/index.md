---
title: 快速上手
type: guide
order: 2
---

mypUI 是基于 uniapp/weex 的一套组件库与工具集，可以 **高效且规范** 地开发出 uniapp 支持的各端应用（APP/各家小程序/H5/快应用）。兼容 nvue 页面 和 vue 页面。nvue 页面对应的 app端 依托 weex 编译为原生，具备良好的性能与体验。

mypUI 从学习成本、开发经验，以及记忆成本、性能优化、包体积等多方面考虑，不断优化，已经是一个不可多得的优秀框架，绝对能为您带来 **稳定、高效、规范** 的开发体验。

再说，作者经历过 `Objective-c` `swift` `Python` `go` `Javascript` 等多语言开发，前后台都有涉及，绝对有信心和能力维护好一套优秀的组件，也不允许自己使用一套不规范的UI。

## 集成mypUI

### 拷贝UI组件

直接将`mypUI`放在您的项目根目录下。

> 或者npm安装：`npm install @mypui/myp-ui`

```bash
npm install @mypui/myp-ui
```

> 注意：使用npm安装mypUI之前，您得确保您的项目进行了npm初始化：`npm init`，保证项目下存在`package.json`配置文件。否则可能会遇到一些意想不到的问题。

### 复制UI的静态资源

`loadingSrc`等公用静态资源直接使用了示范UI项目中 `/static/ui` 下面的静态文件，没有使用网络图片，所以需要拷贝到自己的项目下（`/static/ui`这个路径还是需要保持一致的）。

静态文件的路径依然保持和示范项目中一致即可也就是依然是 `/static/ui` 路径。

### 使css生效

为了减少包体积，UI内使用了 `全局css` 。您需要在 `app.vue` 里面引入 `mypUI` 中的 `base.scss`。

也就是：

``` html
<style lang="scss">
	@import '@/mypUI/base.scss';
</style>
```

因为使用了 `scss变量`，记得设置 `style` 的 `lang="scss"`。

> 注意：如果您使用的是npm安装，记得引入方式为：`@import '@mypui/myp-ui/base.scss';`。

具体的scss变量的引入以及自定义和规范，请看文档：[主题](/doc/guide/theme.html) 以及 [设计](/doc/guide/design.html).

### 配置 `easycom`

UI内部使用了 `easycom` 的组件自动引入，所以您必须在项目中开启 `easycom`。

在 `pages.json` 中添加如下代码：

```js
"easycom": {
	"autoscan": true,
	"custom": {
		"myp-(.*)": "@/mypUI/myp-$1/myp-$1.vue" // 匹配mypUI内的vue文件
	}
}
```

> 注意：npm安装时，easycom配置为：`"myp-(.*)": "@mypui/myp-ui/myp-$1/myp-$1.vue"`

> easycom 是什么？请看官方文档 [easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)

### 定义您的 UI 主题

`mypUI` 下的 `mypui.scss` 是主题 `scss变量` 定义文件。您需要根据您的项目UI的主题色对其进行修改。

我们不建议您直接修改 `mypui.scss`，您只需要把 `mypui.scss` 中的变量复制粘贴到 `uni.scss` 中，然后就可以随心所欲的修改变量值了（当然，你不能删除掉 `uni.scss`，不然是会报错的）。

如果主题内定义的变量无法满足您的要求，您还可以在 `uni.scss` 里面进行添加，然后新增一个相应的 `class` 文件即可，并在 `app.vue` 下引入。

关于主题的具体说明与使用，请查阅 [主题](/doc/guide/theme.html)。

如果您需要用到主题内定义的`scss变量`，然后您也在 `uni.scss`中进行了复制粘贴，那么您可以在项目里面的任何地方直接使用，不需要再次引入scss变量。

### 是否锁定屏幕

我们建议您锁定屏幕。

app.vue 中设置如下：

```js
onLaunch: function() {
	// #ifdef APP-PLUS
	plus.screen.lockOrientation('portrait-primary'); //锁定屏幕
	// #endif
}
```

`pages.json`中可以设置 `globalStyle`：

```json
"globalStyle": {
	"pageOrientation": "portrait"
}
```

### 初始化系统变量

我们建议您在 `onLaunch` 里面对系统变量进行初始化（当然，这是可选的，`mypUI` 内部接口会根据需要调用初始化的接口）。

初始化代码如下：

```html
<script>
	import {initSystemInfo} from '@/mypUI/utils/system.js'
	
	export default {
		globalData: {
			currentTab: 0
		},
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS || H5
			initSystemInfo()
			// #endif
			// #ifndef APP-PLUS || H5
			setTimeout(()=>{
				initSystemInfo()
			}, 0)
			// #endif
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary'); //锁定屏幕
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import '@/mypUI/base.scss';
</style>
```

### 现在开始愉快的使用吧

自由且无需手动导入 `mypUI` 的使用方式，正式开始。

祝您使用愉快。

<p class="tip">如果在使用的过程中，您发现有任何不如意或者bug存在，敬请联系我们，或者给出您的宝贵意见。当然，您也可以给出您的实现方式。或者给我们提一个 <a href="https://github.com/wakaryry/mypUI">pr</a></p>

## 找到代码与我们

- [mypUI-github](https://github.com/wakaryry/mypUI) 欢迎star

- [mypUI-uniapp插件市场](https://ext.dcloud.net.cn/plugin?id=2190) 需要您的好评

- [mypUI-文档开源](https://github.com/wakaryry/mypui-doc)

- [mypUI-文档地址](https://www.mypui.cn)

- npm地址：[https://www.npmjs.com/package/@mypui/myp-ui](https://www.npmjs.com/package/@mypui/myp-ui)

- 作者wx：`pptpdf`

- 作者qq：`382006503`

- 欢迎加入wx群和qq群。wx群请加wx，qq群请加qq群号：`306797275`

<p class="tip">强烈建议加入wx与qq群，获取更多mypUI的动态与帮助</p>

## 快速体验

- 安装HBuilderX；
- 下载或者clone本UI库；
- 在HBuilderX里面打开或者导入；
- 运行到自己想要体验的平台即可；

**Android APP下载地址**

[Android Demo APK下载](https://mypui.asnowsoft.cn/apk/mypUI.apk)

![Android下载](https://mypui.asnowsoft.cn/apk/mypUI.png)

<p class="tip">想了解我们是怎么使用 mypUI 的吗？又如何对 mypUI 有一个更加全面的了解？或者说站在一个代码设计者的角度去了解 mypUI? 纵观全局，对你更加高效的使用mypUI非常有用。建议您一定要看看</p>

<a class="button" href="global.html">全局视角了解mypUI</a>

您可以配合 mypUI 的示范代码 来做更加深入的理解。
