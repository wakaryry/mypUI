---
title: contentBoxMixin
type: guide
order: 2020
---

和 [myp-content-box](/doc/guide/myp-content-box.html) 里面说到的一样，有时候页面或者某个组件的高度无法决策，我们需要明确指定它的高度。

这时候，可以使用：

- 直接去调用系统方法获取屏幕高度，然后计算需要实际需要的高度；

- 调用 `globalData` 里面缓存好的数据去计算需要的高度；

- 使用 外层盒子组件 `myp-content-box` 来决策高度；

- 混入 计算高度的 mixin，辅助计算高度；

contentBoxMixin（`/mypUI/myp-mixin/contentBoxMixin.js`）就是用来辅助计算高度的。

你只需要按照规则设置，您就能拿到您想要的高度。

实际上，这个规则，我们已经在别的地方见过很多次了。他们就是 与 xBar statusbar navbar tabbar extra 等相关的内容。

我们肯定对 `includeStatus` `includeNav` `includeXBar` `tabHeight` `extra` `height` 等这些设置和规则不再陌生。

contentBoxMixin 也一样，不过是对外暴露的名字不一样而已。

<p class="tip">为什么名字不一样？因为 开放的mixin，为了避免命名冲突，对外暴露都加了一个 myp 前缀</p>

默认属性下，得到的高度 = 屏幕的高度 - 状态栏高度 - 导航栏高度。

## 使用

contentBoxMixin 的设置是开放在 data 中的。

```js
	data() {
		return {
			mypIncludeStatus: false,  // 默认不包含状态栏
			mypIncludeNav: false,   // 默认不包含导航栏
			mypTabHeight: 0,
			mypIncludeXBar: true,
			mypExtra: '0px'
		}
	}
```

您可以根据需要修改他们的值，最终你直接使用 `mypContentHeight` `mypContentHeightStyle` 即可。

`mypContentHeight` 是 Number值，对应 px。`mypContentHeightStyle` 可以直接在 style中使用，已经带上单位。

比如：

```html
<template>
  <view :style="mypContentHeightStyle"></view>
</template>

<script>
  import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js'
  export default {
    mixins: [contentBoxMixin],
    data() {
      return {
        mypExtra: '100rpx'
      }
    }
  }
</script>
```
