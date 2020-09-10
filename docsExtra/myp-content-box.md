
我们提供了一个 myp-content-box 的组件，里面除了混入了 myp-list 类组件的 styleMixin，什么都没有。

这个组件到底是做什么的？为什么会有这个组件？

一切还得从 公元前520年 说起。那时候，天地虽不是初生，但混沌依旧，万物皆有灵，一切是那么的玄幻莫测。

实际上就是：

> 我们在小程序上面无法设置出root-view占 百分之百屏幕的高度，也就是我们的页面高度在没有内容支撑的时候，无法实现全屏root-view。

具体什么原因嘛。有可能是 nvue页面本来就是这样，也有可能是 我们禁用了最外层的 scroll-view 导致的。不过我初步测试了一下，不禁用外层的 scroll-view， 也是不能设置出一个全屏高度的root-view，毕竟 禁用 scroll-view 是对 app-nvue 来设置的。

> 以下设置中在 mp端 root-view 并不能占满全屏。因为 page 的设置不生效。

```html
<template>
  <!-- root view -->
  <view class="root-v"></view>
</template>

<style lang="scss">

/* #ifndef APP-NVUE */
page {
	height: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
}
/* #endif */

.root {
	&-v {
		flex: 1;
		flex-direction: column;
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
	}
}
</style>
```

那怎么办？

myp-list 类组件可以自动撑开整个页面，但是很多时候，我们并不需要一个 list来撑开页面。比如，我们的页面是 swiper页面，swiper里面包含了 list，我们并不想要在 swiper外面再包一个 list。

所以，我们提供了一个 高度盒子，它具备 myp-list 类组件所有的高度控制能力，但是只是一个空view，具备一个默认插槽。

它不具备 myp-list 的刷新/加载 等能力，不过其它高度控制类属性确是一模一样的：`includeStatus` `includeNav` `includeXBar` `tabHeight` `extra` `height` 等。

使用方法和规则与 myp-list 类组件一致。具体请看[myp-list](/doc/guide/myp-list.html)。

## 用法

```html
<template>
  <view>
    <myp-navbar title="swiper-list"></myp-navbar>
    <myp-tabs-h boxStyle="height:80rpx;"></myp-tabs-h>
    <myp-content-box extra="80rpx">
      <!-- 在这里可以直接使用 flex 来决策高度 -->
      <swiper style="flex:1;width:750rpx;">
        <swiper-item></swiper-item>
      </swiper>
    </myp-content-box>
  </view>
</template>
```

我们可以看到，在上面代码中，由于 root view 没有铺满屏幕高度的能力，我们的 swiper 的高度就不太好处理。这个时候，我们就先找一个盒子撑开高度，然后 swiper 通过 flex 获得其高度即可。

默认属性下，盒子高度 = 屏幕的高度 - 状态栏高度 - 导航栏高度。

当然，有时候，我们可能不想在swiper外面包裹一层view，有没有什么办法了？

办法有好几种：

> 自己可以调用 系统的方法，获取 屏幕高度，减去部分高度，然后就是 swiper 的高度了；

> 直接调用我们缓存的 app.globalData 里面的 screenHeight 获取屏幕高度；

> 使用 contentBoxMixin (`/mypUI/myp-mixin/contentBoxMixin.js`) 混入当前页面，然后设置相应的值来做控制；

这些方法，有一个共性，就是都需要显示的为 swiper 设置高度。而且目前，我们也都是这么做的。

mypUI 内部，我们会不断优化，尽量在减少混入的同时，又能最大程度的复用。

contentBoxMixin 的混入，不会重复去获取系统信息，会直接使用 globalData 里面的缓存信息。

不过有个时候，你会发现，我们频繁的需要使用高度决策，一个页面里面可能使用了好些个子组件，这些子组件有可能都需要单独使用上面的方法来决策高度。

这个时候，你可能会觉得这些组件每个里面都混入一次高度计算的mixin，实在是有点小别扭。那你可以直接使用 globalData 里面的缓存值。

具体使用什么哪种高度决策，取决于您自己。

不过，您应该避免过多的依赖高度决策，或者是滥用高度决策。只有在flex不能满足的时候明确使用高度决策。

contentBoxMixin 的文档请看 [contentBoxMixin](/doc/guide/contentBoxMixin.html)
