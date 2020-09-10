---
title: 列表：myp-list
type: guide
order: 60
---

## Props

| Prop name      | Description | Type           | Values | Default                                                                              |
| -------------- | ----------- | -------------- | ------ | ------------------------------------------------------------------------------------ |
| includeXBar    |             | boolean        | -      | true                                                                                 |
| overrideXBar   |             | boolean        | -      | true                                                                                 |
| xBarBgType     |             | string         | -      | ''                                                                                   |
| xBarStyle      |             | string         | -      | ''                                                                                   |
| showScrollbar  |             | boolean        | -      | true                                                                                 |
| includeStatus  |             | boolean        | -      | false                                                                                |
| includeNav     |             | boolean        | -      | false                                                                                |
| tabHeight      |             | number         | -      | 0                                                                                    |
| extra          |             | number\|string | -      | 0                                                                                    |
| height         |             | number\|string | -      | '0'                                                                                  |
| useFlex        |             | boolean        | -      | false                                                                                |
| width          |             | string         | -      | '750rpx'                                                                             |
| footToken      |             | string         | -      | '0px'                                                                                |
| boxStyle       |             | string         | -      | ''                                                                                   |
| scrollStyle    |             | string         | -      | ''                                                                                   |
| bgType         |             | string         | -      | 'page'                                                                               |
| hasFoot        |             | boolean        | -      | false                                                                                |
| footBottom     |             | string         | -      | '0px'                                                                                |
| footStyle      |             | string         | -      | ''                                                                                   |
| useLoading     |             | boolean        | -      | false                                                                                |
| loadMoreOffset |             | number         | -      | 60                                                                                   |
| autoUpdate     |             | boolean        | -      | false                                                                                |
| down           |             | object         | -      | {<br> use: true,<br> offset: uni.upx2px(140),<br> inRate: 0.8,<br> outRate: 0.2<br>} |
| up             |             | object         | -      | {<br> use: true,<br> offset: 80<br>}                                                 |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| scroll     | undefined |
| down       |           |
| up         |           |
| inited     |           |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
| foot    |             |          |

---

<p class="tip">在nvue页面开发中，list组件可以说是最常用的，也是最重要的组件之一。nvue页面中，页面不会自己有滚动效果，内容必须包裹在scroll/list中才会实现 页面/内容 的滚动。uniapp的处理是默认给所有的页面最外层包裹一个scroll，从而使页面具备滚动的能力。</p>

<p class="tip">但是考虑到，我们一般会自己自定义各种刷新，以及页面内部会再次使用到scroll/list，我们给所有页面禁用了uniapp自动添加的外层scroll。</p>

`myp-list` 在是 weex的 list 组件与 其它端的 scroll-view 封装而成。

> 主要功能如下：

- 高度控制；
- 可开可关闭的 下拉刷新 与 上提加载；
- 可以设置 是使用 loader 组件来实现 上提加载，还是使用 loadMore 事件来实现上提加载；
- 自动兼容 安全区 xBar；
- ...

如果您只是纯粹的想使用一个不带刷新和加载的列表，请使用 `myp-list-simple`，其文档见 [myp-list-simple](/doc/guide/myp-list-simple.html)

## 快速使用

```html
<template>
  <myp-list ref="myp-list" :autoUpdate="true" @down="toLoadData" @up="toLoadData">
    <myp-list-cell v-for="(item,idx) in items" :key="idx">
      <!-- 您的具体内容
      <item-cell :item="item"></item-cell>
	  -->
    </myp-list-cell>
  </myp-list>
</template>

<script>
  export default {
	data() {
	  return {
		items: []
	  }
	},
	methods: {
	  toLoadData() {
		const ins = this.$refs['myp-list']
		const cp = ins.mypCurrentPage
		requestApi({page: cp}).then(response => {
		  if (cp === 1) {
			this.items = response.results || []
		  } else {
			this.items = this.items.concat(response.results || [])
		  }
		  // true or false means if having a next page
		  ins.mypEndSuccess(true)
		}).catch(err => {
		  ins.mypEndError()
		})
	  }
	}
  }
</script>
```

以上代码就会实现一个 自动铺满屏幕（不包含status和navbar）的list组件，而且不需要您额外考虑 xbar 以及遮挡问题，他会自动处理，保证list的元素全部可见。

`myp-list` 默认插槽 的子组件必须是 `myp-list-cell`。（因为weex端，list下只能是cell组件）

`autoUpdate` 可以决定是否自动加载数据（也就是拉取第一页的数据），下拉和上提对应 `down` 和 `up` 事件。

在 `loadData` 方法中，我们不需要自己去管理当前的页面等状态，`myp-list` 会自己管理，你只需要调用 成功或者失败 的回掉即可。

## 高度控制

`myp-list` 默认是 占满剩余屏幕（也就是不包含 status和navbar，占满其它剩余空间）。您可以设置 `includeStatus` `includeNav` `tabHeight` `extra` `height` 来决定她的最终高度。

### includeStatus

是否包含status，也就是是否包含顶部的状态栏。默认是 `false`，不包含。一般与 `includeNav` 搭配使用。

### includeNav

是否包含 navbar，也就是是否包含导航栏。默认是 `false`，不包含。该导航栏的高度默认是 `44px`，您可以根据需要在 `myp-mixin/windowMixin.js` 中查看以及设置 导航栏的高度。

### includeXBar

是否包含xBar。默认是包含 xBar 的。包含 xBar 的时候会自动考虑 xBar 的遮挡问题。默认是 xbar 处也会显示内容，list滚动到底部的时候内容不会被 xBar 遮挡住。如果您需要控制 xBar 与 list内容 存在的方式，`overrideXBar` 可以满足您的需求。 `includeXBar:true` 时，`overrideXBar:true` 会表示 内容高度包含 xBar，`overrideXBar:false` 表示内容高度不包含 xBar， xBar 具备独立的占位。但不管 `overrideXBar` 怎么设置，我们都为您自动考虑了最终内容与xbar的遮挡问题。

### tabHeight

tabbar 的高度，默认是 `0` ，也就是 当前页面没有 tabbar，`Number` 类型，对应的单位是 `px` （我们不建议使用 rpx 作为 tabbar 的高度）。uniapp 的 tabbar 高度默认是 `50px`。

### extra

需要排除掉的额外高度，作为辅助与补充。比如list上面有一个高度为 `80rpx` 的 tabs 组件。这个时候我们需要额外减去这个高度，我们就设置 `extra="80rpx"`。可以是 `String`，可以是 `Number`，可以带 `rpx` 或者 `px` 单位，不带单位默认为 `rpx`。允许拼接写法：`80-40px-100rpx` （表示 80rpx + 40px + 100rpx）。

### height

height默认是 0。也就是 list 的高度通过计算而来，不是 height 直接控制。如果设置了大于 0 的高度，会直接使用 height的高度，不再考虑别的高度决定元素。height 可以是 `String`，可以是 `Number`，可以带 `rpx` 或者 `px` 单位，不带单位默认为 `rpx`。不支持拼接写法。

## 刷新与加载

我们提供了刷新与加载的开关，以及事件。大致为：`autoUpdate` `down` `up` `@inited` `@down` `@up` 。

### down

下拉刷新的开关。默认是打开的，也就是：`{use: true, offset: uni.upx2px(140), inRate: 0.8, outRate: 0.2}`。

- `use`: 刷新的开关。不需要下拉刷新，`use:false` 即可。
- `offset`: 刷新栏的高度。
- `inRate`: 满足释放刷新之前的拉下难易程度。
- `outRate`: 满足释放刷新之后的拉下难易程度。

刷新开启之后，会有对应的 `@down` 事件。

### up

上提加载的开关。默认是打开的。也就是：`{use: true, offset: 80}`。

不需要上提加载，直接 `use:false` 即可。`offset` 为触发上提加载时距离底部的距离。一般为加载组件的高度。

<p class="tip">在 app-nvue 端，我们提供了 两种 上提加载更多 的机制。</p>

`app-nvue` 端默认使用的是 list的 `loadmoreoffset` 配置与 `@loadmore` 事件。在 `myp-list` 组件中对应的属性配置是 `useLoading:true` 以及 `loadMoreOffset:60`

如果您需要使用 `weex` 中的 `loading` 组件来做 上提加载更多，您需要设置：`useLoading:true`。我们默认是关闭了 `useLoading`，而是使用 `loadMoreOffset` 这个属性来配置可触发加载更多时的底部距离。

不管使用啥，上提加载对应的事件是 `@up`。

### autoUpdate

是否自动加载第一页数据。默认不加载，也就是 `autoUpdate:false`。

`autoUpdate:true` 即可自动加载第一页数据，当然前提条件是 开启了 下拉刷新。

**TODO: 不开启下拉刷新的时候，如果开启了上提加载，`autoUpdate:true` 也可以自动加载第一页。当前，您完全可以在 `@inited` 事件里面手动实现，也就是调用 `ins.mypLoad()` 方法**

> 如果您不开启 `autoUpdate` 如何加载第一页数据了？

一般情况下，我们调用 `ins.mypRefresh()` 进行手动刷新，`ins.mypLoad()` 进行手动加载。您只需要提供 `@down` 或者 `@up` 事件的回调即可。

**注意**：这里的 ins 指的是 myp-list 的ref。比如 `<myp-list ref="myp-list"></myp-list>`, ins 就是 `this.$refs['myp-list']` whatever

### @dwon

开启了下拉刷新，就必须提供 `@dwon` 事件，并且在里面处理您的刷新逻辑。一般情况下， `@down` 与 `@up` 公用一个处理逻辑。

### @up

开启了 上提加载，就必须提供 `@up` 事件。一般与 `@down` 回调是同一个函数。

```js
toLoadData() {
	const ins = this.$refs['myp-list']
	const cp = ins.mypCurrentPage
	requestApi({page: cp}).then(response => {
		if (cp === 1) {
			this.items = response.results || []
		} else {
			this.items = this.items.concat(response.results || [])
		}
		ins.mypEndSuccess(response.next)
	}).catch(err => {
		ins.mypEndError()
	})
}
```

刷新与加载一体处理，而且我们不需要手动去管理页码等，myp-list 会自动为您处理。当然，您需要通知他如何处理，以及是否有下一页等。

也就是上面写的，`ins.mypEndSuccess(ifHasNextPage)` 以及 `ins.mypEndError()`。刷新或者加载成功/失败都需要调用相应的接口，以便 `myp-list` 能够正确的为您处理业务。

### @inited

有时候，您需要一个时机，这个时机是 myp-list 已经准备好了的时候。我们为您提供了 `@inited` 事件监听。这说明 myp-list 已经准备好了一切，您可以尽情的调用。有时候页面内容的初始化刷新，您可以在此事件的回调中处理。

`@inited` 通知是 晚于 页面的 onLoad 的，也就是 页面 onLoad 之后，我们才能监听到 `@inited` 事件。这对于我们来说很方便，恰好 onLoad 准备好了页面的各种初始化数据环境，比如 上一个页面传过来的 某个 id，我们需要用这个 id 去刷新 列表。

`autoUpdate` 也是一样。

## xBar的处理

默认情况下，我们是包含 xBar的，而且 list的内容会出现在 xBar 的位置，滑动到最底部的时候 xBar 不会遮挡住内容。也就是 `includeXBar:true` 和 `overrideXBar:true`。

`overrideXBar:false` 时，xBar 会有独立的占位，list内容的高度不会包含 xBar。

您还可以为 xBar 设置 背景主题，以及设置 个性化的style，他们分别对应：`xBarBgType` `xBarBgStyle`。

具体您可以看 `/mypUI/myp-mixin/xBarMixin.js`。其文档为 [xBarMixin](/doc/guide/xBarMixin.html)

## 底部固定的元素

我们在使用 list 组件的时候，有一种最常见的情况就是 页面的底部 有一个 与list滚动无关的foot。比如：一个个人信息页面，最底部有一个 保存按钮；在某些列表展示页面，最底下有一个 创建内容的入口（发帖等）...

我们一般希望，这些元素悬浮在list之上，他固定位置不动，至少不随着 list 的滚动而滚动。list内容会出现在它的底下，然后最终list的内容拉到最底部时又不能被遮挡。

这个时候，我们就需要用到其它的设置了: `hasFoot` `footBottom` `footStyle`。

### hasFoot

是否包含一个 悬浮的foot组件。默认是false，也就是不包含。当 `hasFoot:true` 时，您可以 设置 `footBottom` 来设定它距离 myp-list 组件底部的距离，这个 `footBottom` 不需要考虑 xBar，我们会根据您的 xBar 相关的设置自动考虑进去。

foot 的内容，我们给您提供了一个名字为 foot 的插槽。

```html
<myp-list :hasFoot="true" footBottom="16px">
  <view slot="foot">
    <!-- 这里是您的foot内容 -->
  </view>
</myp-list>
```

### footBottom

footBottom 就是foot与list底部的距离，默认是 0。可以是 `Number/String`。可以带 单位 `rpx/px`。不带单位默认为 `rpx`。

<p class="tip">我们没有处理有 footBottom 时list内容最底部的遮挡，您可以自己加一个 具备相同高度的cell，或者使用 footToken 设置。</p>

### footToken

自定义给list的底部加一个具备 footToken 高度的 空cell，通常情况是为了 处理内容遮挡，比如处理 foot时的内容遮挡。通常您可以设置成 foot内容的高度 + footBottom 的值。

### footStyle

允许给 foot 插槽外层的 view 设置一个 个性化的style。比如： `footStyle:"left:75rpx;width:600rpx;"`

## 其它事件

### @scroll

list 滚动时的 scroll 事件的监听。

## 其它props

### width

list的宽度设置。

### bgType

list的主题背景色设置。比如: `bgType="primary"`

### scrollStyle

myp-list 的个性化 `scroll/list` 的 style 配置。

### boxStyle

myp-list 组件的 个性化style 配置。比如您可以设置 `boxStyle="position:absolute;"` 等。

## slots

### 默认插槽

list的内容。必须由 `<myp-list-cell></myp-list-cell>` 包裹。

### foot插槽

foot内容，具体见上面的 [底部固定的元素](#底部固定的元素)

## TODO

- 页面无内容提示占位；
- 提供整个内容页的刷新显示（比如空白页面刷新时，刷新组件占满全屏）；
- 回到顶部；
- 更多更灵活的页面页码管理；
