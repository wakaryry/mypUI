---
title: 全局视野
type: guide
order: 3
---

为了让您更加深入的理解mypUI，以及更加高效的使用，我们特意从设计者的角度来解读mypUI。或者您也可以把这篇全局视野当作是我们建议的最佳实践。希望对您有用。祝您使用愉快。

从全局出发，您需要了解：

- 整套UI依赖的主题规范：[主题配置](/doc/guide/theme.html)；

- 组件/接口的设计与命名规范：[设计规范](/doc/guide/design.html)；

- 页面元素与快速构建；

本文档讲的就是页面元素与快速构建。

<p class="tip">为了更加高效与统一的开发，我们的UI示范，以及我本人所开发的所有uniapp应用，都去除掉了系统自带的 <strong>navbar</strong> 以及 <strong>tabbar</strong> 。并且禁用了外层自动包裹的 <strong>scroll-view</strong> 。</p>

我们的 `pages.json` 的配置如下：

```json
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index",
			"style": {
				"disableScroll": true
			}
		}
	],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "",
		"navigationBarBackgroundColor": "#FFFFFF",
		"navigationStyle": "custom"
	},
	"easycom": {
	  "autoscan": true,
	  "custom": {
	    "myp-(.*)": "@/mypUI/myp-$1/myp-$1.vue" // 匹配mypUI内的vue文件
	  }
	}
}
```

移除掉 `navbar` 以及 `tabbar`，我们主要出于以下考虑：

> - 统一的样式：一个应用难免会自定义 `navbar`；
> - 减少独立的配置，或者说各端差异化的适配。开发方式更加统一与高效：`pages.json`里面的配置其实比较繁琐，过多的配置，反而适得其反，对开发不友好；
> - 更加灵活的页面与元素处理：可以自由的控制 `navbar`的层次以及页面其它元素的层次；
> - 全屏元素可控，可全屏遮挡；
> - 某些业务逻辑使得必须使用自定义的`tabbar`：比如一个应用根据用户不同身份进入加载不同个数的`tabbar`；

<p class="tip">当然，是否启用完全自定义页面内容，取决于您自己。不过，我建议您别太纠结这些方面，马上去做，去实现，去完成，去赚钱，这些才是最重要的。</p>

为什么我们要禁用掉最外层的 `scroll-view` ？

> 我们做页面的内容，难免会自己使用`scroll-view`，比如利用 `scroll-view` 做自定义的 `下拉刷新` 以及 `上提加载`，而且 `nvue` 页面，app端的 `scroll-view` 本来就是手动加上去的。为了统一的开发与处理下拉上提，我们直接自己决定滚动层，封装更加便捷高效的 `list`。在 nvue-app 端，如果不禁用最外层的scroll，其实默认页面会包裹一层`scroll-view`的。

`mypUI` 内几乎所有的设计都是考虑过自定义`navbar`以及`tabbar`的开发方式的。并且提供了非常便捷和灵活的页面内容以及高度的管理方式。下面我们将具体说明如何利用`mypUI`快速构建一个页面。

## 快速构建页面

一个页面，其实就是 `导航`，`内容`，再加上 `交互`。

非常简单，我们利用 `mypUI` 提供的组件，以及便捷开发的 `mixin`（大多数mixin，在demo里面提供，不是组件库里面的，毕竟这与组件无关），很快就可以构建一个自动铺满且带返回操作的页面。

代码如下：

```html
<template>
	<view>
		<myp-navbar title="导航栏标题" :lefts="leftIcons" @leftAction="navLeftAction"></myp-navbar>
		<myp-list :down="null" :up="null">
			<myp-list-cell>
				<text>...</text>
			</myp-list-cell>
		</myp-list>
		<myp-loading ref="myp-loading"></myp-loading>
		<myp-toast ref="myp-toast"></myp-toast>
	</view>
</template>

<script>
	import navHelper from '@/router/navHelper.js'
	import toastMixin from '@/mypUI/myp-mixin/toastMixin.js'
	import loadingMixin from '@/mypUI/myp-mixin/loadingMixin.js'
	
	export default {
		mixins: [navHelper, toastMixin, loadingMixin],
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss">
</style>
```

以上代码就完全撑起了一个页面，她具备以下特点：

- 内容区自动铺满整个页面高度，而且可以直接设置内容区的背景色；
- 包含了navbar的返回按钮以及返回动作等（在navHelper这个mixin中，需要手动引入）；
- 包含了toast/loading等交互组件，可以直接使用快捷的toast与loading（相关便捷使用的mixin需要手动引入）。

一切都是那么的简单干脆。我们不需要关注太多的各端差异配置，我们只管处理好我们自己的内容组件与业务逻辑即可。

当然，里面引入的mixin，并不是必须的，这些只是我们为了页面便捷使用与统一配置的一些快捷js而已，具体的代码放在demo中，并不是组件库的一部分。

然后，在此基础上，我们配合list组件的刷新与加载，搭配上接口，就已经是一个非常完整的内容展示页面了。

甚至，我们可以通过 `几句简短的描述`，就能够自动生成一个 `带接口和数据交互` 的常规页面(当然，这还需要我们更多有关自动生成页面的支持，或许我们可以考虑一个 `mypUI` 的自动生成页面的 `npm` 包)。

比如，我们定义以下内容，就自动生成一个`我的帖子`列表页面：

```json
{
	"navbar": "我的帖子",
	"list": {
		"refresh": true,
		"load": true,
		"cell": "rich-album"
	},
	"api": {
		"name": "getMineAlbums",
		"from": "album.js"
	}
}
```

实际上，一切都很简单。

快速的开发nvue页面，我们只需要熟练以下三个方面：

- 灵活的运用 `页面元素的层级`：比如`navbar`的层级，`popup`等的层级，就可以决定`popup`是遮挡住`navbar`还是不遮挡`navbar`；

- `内容区`与`绝对/固定定位元素`的管理；

- 纯flex布局，至少得在 `app-nvue` 上是纯flex布局；

掌握这几个方面，就能随心所欲的利用 `mypUI` 开发出自己想要的页面了。

下面我们将重点介绍 `层级控制`。

## 层级控制

在nvue页面中，** app端不支持 `z-index` **，元素的层级，受其在页面中的 渲染先后顺序，以及 定位 有关。

比如，你做一个受 `v-if` 控制的 `mask`，`mask` 在底层，同时出现的还有受 `v-if` 控制的其它展示内容，这些展示内容要求在 `mask` 的上面。

那么你需要保证 `mask` 的 `created` 要先于 `展示内容` 的 `created`，否则，`mask`层会出现在 `展示内容层` 的上面，从而出现遮挡。详情可以参看我们的 `myp-popup` 组件，里面有明确的代码表明，多个 `v-if` 控制的同级组件，如何进行层级控制。

<p class="tip">如果你的页面/组件出现了层级的问题，请留意各组件created的先后顺序，确保合适的层级</p>

有些人可能很好奇，为什么 `mypUI` 里的 `popup`，提供了两份(`myp-popup`、 `myp-popup-always`)。

> - 一是，`myp-popup-always`会一直存在于视图中，里面内容只会`created`一次。`myp-popup`内部受`v-if`控制，内部内容以及遮罩层的`created`受`v-if`控制，由于`myp-popup`里面的定位都是`fixed`，打开的时候就会出现在最上层。为了有层级要求的业务，比如弹出的时候，`navbar`始终在最上层，我们可以直接使用`myp-popup-always`，代码上只需要保证`navbar`在`myp-popup-always`的下面即可（当然，`navbar`这个时候也需要是`fixed`定位）。
>
> - 二是，我们有个时候需要一个组件，她具备`popup`的特性，但是要求收起时，还能露出一小截。`myp-popup-always`就能满足这种特性。

代码示范如下：


