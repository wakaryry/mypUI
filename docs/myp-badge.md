---
title: badge：myp-badge
type: guide
order: 208
page: http://mypui.asnowsoft.cn/h5/#/pages/base/badge
---

## Props

| Prop name | Description                                | Type           | Values | Default   |
| --------- | ------------------------------------------ | -------------- | ------ | --------- |
| size      | 圆点样式的直径大小，不是圆点时需要设置为 0 | string         | -      | '12rpx'   |
| bgType    | 背景主题                                   | string         | -      | 'error'   |
| text      | 文字内容                                   | string\|number | -      | ''        |
| border    | 边框主题                                   | string         | -      | 'none'    |
| textType  | 文字颜色主题                               | string         | -      | 'inverse' |
| textSize  | 文字尺寸主题                               | string         | -      | 'ss'      |
| textStyle | 文字样式                                   | string         | -      | ''        |
| boxStyle  | 外层样式                                   | string         | -      | ''        |

---

badge 提供了 圆点样式 以及 文字样式 的效果。可以自行设置任意尺寸的 圆点 以及 文字内容 与样式。

**示范代码如下：**

```html
<myp-flex bgType="none">
	<view class="myp-justify-center myp-align-center" style="flex: 1;">
		<myp-badge></myp-badge>
	</view>
	<view class="myp-justify-center myp-align-center" style="flex: 1;">
		<myp-badge size="24rpx" bgType="primary"></myp-badge>
	</view>
	<view class="myp-justify-center myp-align-center" style="flex: 1;">
		<myp-badge text="买一赠一" size="0" boxStyle="padding-left:16rpx;padding-right:16rpx;height:40rpx;border-radius:40rpx;"></myp-badge>
	</view>
</myp-flex>
```

<p class="tip">当然，badge可以搭配 myp-button/ myp-title/ myp-grid 等组件一起使用，具体会在相应的组件里面有说明。其实就是 myp-badge 作为插槽内容而已。您自己控制 myp-badge 的位置即可。</p>

**效果**

![myp-badge](/images/doc/badge.jpeg)

<p class="tip">注意：不是圆点时，需要size属性设置为字符串0，也就是 size="0"，否则宽度和高度会受到默认的size影响。</p>
