
<p class="tip">在nvue页面开发中，list组件可以说是最常用的，也是最重要的组件之一。nvue页面中，页面不会自己有滚动效果，内容必须包裹在scroll/list中才会实现 页面/内容 的滚动。uniapp的处理是默认给所有的页面最外层包裹一个scroll，从而使页面具备滚动的能力。</p>

<p class="tip">但是考虑到，我们一般会自己自定义各种刷新，以及页面内部会再次使用到scroll/list，我们给所有页面禁用了uniapp自动添加的外层scroll。</p>

`myp-list` 在是 weex的 list 组件与 其它端的 scroll-view 封装而成。

> 主要功能如下：

- app端高度继承，MP/H5端高度控制；
- 可开可关闭的 下拉刷新 与 上提加载；
- 可以设置 是使用 loader 组件来实现 上提加载，还是使用 loadMore 事件来实现上提加载；
- 可以用来做聊天列表，并提供了示范；
- ...

**快速使用**

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
		// 您需要更换这个api接口
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

以上代码就会实现一个 自动铺满屏幕（不包含status和navbar）的list组件。

`myp-list` 默认插槽 的子组件必须是 `myp-list-cell`。（因为weex端，list下只能是cell组件）

`autoUpdate` 可以决定是否自动加载数据（也就是拉取第一页的数据），下拉和上提对应 `down` 和 `up` 事件。

在 `loadData` 方法中，我们不需要自己去管理当前的页面等状态，`myp-list` 会自己管理，你只需要调用 成功或者失败 的回掉即可。

**刷新与加载**

我们提供了刷新与加载的开关，以及事件。大致为：`autoUpdate` `down` `up` `@inited` `@down` `@up` 。

**down**

下拉刷新的开关。默认是打开的，也就是：`{use: true, offset: uni.upx2px(140), inRate: 0.8, outRate: 0.2}`。

- `use`: 刷新的开关。不需要下拉刷新，`use:false` 即可。
- `offset`: 刷新栏的高度。
- `inRate`: 满足释放刷新之前的拉下难易程度。
- `outRate`: 满足释放刷新之后的拉下难易程度。

关闭刷新可以是 `:down="{use:false}"` ，也可以是 `:down="null"`。

刷新开启之后，会有对应的 `@down` 事件。

**up**

上提加载的开关。默认是打开的。也就是：`{use: true, offset: 80}`。

不需要上提加载，直接 `use:false` 即可。`offset` 为触发上提加载时距离底部的距离。一般为加载组件的高度。

<p class="tip">在 app-nvue 端，我们提供了 两种 上提加载更多 的机制。</p>

`app-nvue` 端默认使用的是 list的 `loadmoreoffset` 配置与 `@loadmore` 事件。在 `myp-list` 组件中对应的属性配置是 `useLoading:true` 以及 `loadMoreOffset:60`

如果您需要使用 `weex` 中的 `loading` 组件来做 上提加载更多，您需要设置：`useLoading:true`。我们默认是关闭了 `useLoading`，而是使用 `loadMoreOffset` 这个属性来配置可触发加载更多时的底部距离。

关闭上提加载可以是 `:up="{use:false}"` ，也可以是 `:up="null"`。

不管使用啥，上提加载对应的事件是 `@up`。

**autoUpdate**

是否自动加载第一页数据。默认不加载，也就是 `autoUpdate:false`。

`autoUpdate:true` 即可自动加载第一页数据，当然前提条件是 开启了 下拉刷新或者上提加载。

> 如果您不开启 `autoUpdate` 如何加载第一页数据了？

一般情况下，我们调用 `ins.mypRefresh()` 进行手动刷新，`ins.mypLoad()` 进行手动加载。您只需要提供 `@down` 或者 `@up` 事件的回调即可。

**注意**：这里的 ins 指的是 myp-list 的ref。比如 `<myp-list ref="myp-list"></myp-list>`, ins 就是 `this.$refs['myp-list']` whatever

**@dwon**

开启了下拉刷新，就必须提供 `@dwon` 事件，并且在里面处理您的刷新逻辑。一般情况下， `@down` 与 `@up` 公用一个处理逻辑。

**@up**

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

**@inited**

有时候，您需要一个时机，这个时机是 myp-list 已经准备好了的时候。我们为您提供了 `@inited` 事件监听。这说明 myp-list 已经准备好了一切，您可以尽情的调用。有时候页面内容的初始化刷新，您可以在此事件的回调中处理。

`@inited` 通知是 晚于 页面的 onLoad 的，也就是 页面 onLoad 之后，我们才能监听到 `@inited` 事件。这对于我们来说很方便，恰好 onLoad 准备好了页面的各种初始化数据环境，比如 上一个页面传过来的 某个 id，我们需要用这个 id 去刷新 列表。

`autoUpdate` 也是一样。

**@scroll**

list 滚动时的 scroll 事件的监听。
