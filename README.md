## mypUI

**第一个高效且强悍的nvue开源组件库。做最好、最顺手的nvue组件库**

- 适用于`nvue`页面的组件与工具（app端对应weex，不再是webview）；
- 纯`flex`布局，符合`weex`规范（兼容Vue页面只需要加几个display:flex即可）；
- 规范与统一，确保代码质量和开发效率；
- 可配置主题；
- 细节开放到位，在好用和可灵活适配之间把握到位；
- request/router/share...各种工具集；
- 页面内容完全自己控制，移除掉了系统自带的navbar和tabbar，以及外层自动包裹的scroll；
- 页面排版更加灵活。遮罩层全屏覆盖。status/nav/xBar处理也非常灵活与方便；
- 精简`page.json`的配置，减少独立配置；
- 已在`Android`/`iOS`/`mp-wexin`/`mp-qq`/`mp-toutiao`等上面有实际应用；

mypUI 是基于 uniapp 的一套组件库与工具集，可以 **高效且规范** 地开发出 uniapp 支持的各端应用（APP/各家小程序/H5/快应用）。兼容 nvue 页面 和 vue 页面。nvue 页面对应的 app端 依托 weex 编译为原生，具备良好的性能与体验。mypUI 绝对能为您带来 **稳定、高效、规范** 的开发体验。

## 集成mypUI

### 拷贝UI组件

直接将`mypUI`放在您的项目根目录下。

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

> easycom 是什么？请看官方文档 [easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)

### 定义您的 UI 主题

`mypUI` 下的 `mypui.scss` 是主题 `scss变量` 定义文件。您需要根据您的项目UI的主题色对其进行修改。

如果主题内定义的变量无法满足您的要求，您可以在里面进行添加，并适当在 `base.scss` 里面增加相应的 `class` 即可。

如果您需要用到主题内定义的`scss变量`，一定要记得在使用的地方引入`mypui.scss`，否则编译会报错。

```html
<style lang="scss">
	@import '@/mypUI/mypui.scss';
</style>
```

> 注意：在 `app.vue` 里面全局引入 `mypui.scss` 是不会起作用的。毕竟里面只是定义了一些 scss变量

### 初始化系统变量

我们建议您在 `onLaunch` 里面对系统变量进行初始化（当然，这是可选的，`mypUI` 内部接口会根据需要调用初始化的接口）。

初始化代码如下：

- 先引入并放入mixins；

- 然后调用初始化方法；

```html
<script>
	import systemMixin from '@/mypUI/myp-mixin/systemMixin.js'
	
	export default {
		globalData: {
			currentTab: 0
		},
		mixins: [systemMixin],
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-NVUE || H5
			this.mypInitSystemInfo()
			// #endif
			// #ifndef APP-NVUE || H5
			setTimeout(()=>{
				this.mypInitSystemInfo()
			}, 0)
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

> 如果在使用的过程中，您发现有任何不如意或者bug存在，敬请联系我们，或者给出您的宝贵意见。当然，您也可以给出您的实现方式。或者给我们提一个 [pr](https://github.com/wakaryry/mypUI)

## 找到代码与我们

- [mypUI-github](https://github.com/wakaryry/mypUI) 欢迎star

- [mypUI-uniapp插件市场](https://ext.dcloud.net.cn/plugin?id=2190) 需要您的好评

- [mypUI-文档开源](https://github.com/wakaryry/mypui-doc)

- [mypUI-文档地址](https://www.mypui.cn)

- 作者wx：`pptpdf`

- 作者qq：`382006503`

- 欢迎加入wx群和qq群。wx群请加wx，qq群请加qq群号：`306797275`

> 强烈建议加入wx与qq群，获取更多mypUI的动态与帮助

## 快速体验

- 安装HBuilderX；
- 下载或者clone本UI库；
- 在HBuilderX里面打开或者导入；
- 运行到自己想要体验的平台即可；

## 说明

- 当时写这套`nvue`组件的时候，还没有任何一款`nvue`页面组件在开放或者售卖;
- 第一版的时候，其实是根据`weex-ui`改的。`scroll`是根据`mescroll`改的（当时`mescroll`还不是`mixin`的形式，现在`mescroll`和以前也大不相同了吧）;
- 不要盲目去适配一个组件，当一个组件的适配程度比较复杂的时候，宁愿重新写，也不去适配;

希望对你有用。

## 工具与申明

- [免费图片压缩](https://tinypng.com/)
- [免费图片托管](https://img.wenhairu.com/)
- [mescroll](https://ext.dcloud.net.cn/plugin?id=343)。我最开始的scroll刷新和加载更多处理参考了mescroll

如果您发现我们使用了您的`设计`或者`图片`资源，如有侵权，恳请告知，我们一定第一时间删除或者按照您的要求添加申明。

项目中的图片基本上来自于`百度图片`，以及`ui.cn`上面的设计。`ui.cn`上面的资源，我们会列出`设计者名单`以及`主页地址`。
