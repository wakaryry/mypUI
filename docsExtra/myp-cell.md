
myp-cell 是通用的 单行cell 展示组件。为 icon-title-value-indicator 四段式设计。基本能满足所有的单行cell要求。

- hover效果以及配置；
- 支持border/radius等快捷配置；
- 支持细节配置；
- 开放 特殊的 slot；

## 使用

```html
<myp-cell icon="setting" title="设置" indicator="right" @cellClicked="toSet"></myp-cell>
```

使用非常简单，和其它组件一样，即支持快速配置，也支持细节定义。

### @cellClicked

点击事件监听。非常语意化的名字设计，就和 `buttonClicked` 一样，无需记忆。

<p class="tip">不要什么内容都想着用myp-cell去包裹，也不要老想着去自定义里面的插槽内容。单行使用就是这个组件最佳的用法。</p>

下面我们对其配置属性做个介绍，其整体属性如下：

- 盒子：`bgType` `height` `space` `border` `radius` `hover` `boxStyle`；
- icon：`icon` `iconType` `iconSize` `iconStyle` `iconBoxStyle` `iconMode`；
- title：`title` `titleType` `titleSize` `titleStyle`；
- value：`value` `valueType` `valueSize` `valueStyle`；
- indicator：`indicator` `indicatorType` `indicatorSize` `indicatorStyle` `indicatorBoxStyle` `indicatorMode`；
- 插槽：default, extra；
- 事件：`@cellClicked`；

## 盒子

和其它组件一样，非常统一的配置。

`bgType` `height` `space` `border` `radius` `hover` `boxStyle`

> 需要注意的是：myp-cell 组件默认提供了 32rpx 的左右 padding。主要是为了减少左右侧的padding配置频率。

### bgType

背景色主题配置。比如：`bgType="primary"`。

### height

高度scss配置，可选：`ss` `s` `base` `l` `ll`。默认是 `l`。

### border

主题中定义的 border 快捷配置。border属性是同时支持 范围与颜色 的，比如：`border="all"` `border="bottom"` `border="all-primary"` `border="bottom-error"`。无 border 设置为 none。

### radius

mypUI.scss 中定义的 radius 快捷配置。默认 base。支持 `ss` `s` `base` `l` `ll`。无 radius 设置为 none。

### hover

hover 属性配置，也就是 uniapp中的 hover-class 配置。默认是 opacity，也就是 透明度发生变化。可以选择的值有：`bg` `opacity` `bg-opacity`。无 hover 效果设置为 none。

### space

图标与文字之间的间隔快捷配置。默认是 12rpx。必须带单位。

<p class="tip">我们建议您在使用 mypUI 的过程中，涉及到 自定义宽高尺寸的属性，带上宽高的单位。我们会逐渐取消掉 Number 类型的 宽高属性配置，一律要求带上单位。这是一种开发规范，我们也能基于此进行优化。</p>

### boxStyle

外层盒子style设置。我们一般用于设置一些特别的宽高。我们在 myp-cell 的外层 class 中默认设置了 左右 32rpx 的padding。如果您需要别的值，请覆盖。

<p class="tip">如果您需要在这里私有化border-color，border-style，border-width，您必须给其加上 !important。因为为了兼容H5，这些设置在 class中加了 !important。</p>

## icon

左侧图标设置。其实就是设置左侧的 myp-icon组件。依然是熟悉的味道：

`icon` `iconType` `iconSize` `iconStyle` `iconBoxStyle` `iconMode`

### icon

左侧的图标。默认没有内容。可以是字体图标，也可以是图片。支持网络图片。

### iconMode

如果 icon 是图片的话，支持图片的 mode 设置。默认是 `aspectFill`。

### iconType

图标的主题颜色。默认设置是 text，也就是 `myp-color-text`。

### iconSize

图标的尺寸设置，scss变量名字，可选：`ss` `s` `base` `l` `ll`。默认 `l`。

### iconStyle

图标的 style设置。图片图标的话，可以自定义宽高。字体图标可以个性化font-size等属性。

### iconBoxStyle

icon的外层包裹，比如给图标加个border等。

## title

cell 内 title 文字属性设置，它的相关属性依然是那么的熟悉。素质四连，简单高效：

`title` `titleType` `titleSize` `titleStyle`

### title

左侧 title 文字，默认为空。

### titleType

文字主题类型，也就是颜色设置。比如：`titleType="primary"`。

### titleSize

文字尺寸scss变量设置，可选：`ss` `s` `base` `l` `ll`。默认是 `base`。

### titleStyle

文字title的style个性化设置。

## value

`value` `valueType` `valueSize` `valueStyle`

和 title 设置一样，不再细说。

> 需要注意的是：value 默认是占满cell组件的剩余宽度的。而且是 向右对齐。如果别的对齐，请覆盖。默认 size为base，type是second。

## indicator

`indicator` `indicatorType` `indicatorSize` `indicatorStyle` `indicatorBoxStyle` `indicatorMode`

cell 右侧的指示器。比如 `indicator="right"`。默认 size是l，type是second。

## 插槽

### 默认

默认slot，覆盖title/value。

### extra

extra，在value与indicator之间提供更多插入更多内容的配置。比如，您在这之间需要一个 点击更新 的提示按钮。

```html
<myp-cell icon="bold-refresh" title="软件更新" indicator="right" space="24rpx" boxStyle="padding-left:38rpx;padding-right:48rpx;">
	<view slot="extra" class="cell-upload">
		<myp-icon name="solid-up" type="inverse" size="l"></myp-icon>
		<text class="cell-upload-text">有新版本</text>
	</view>
</myp-cell>
```

![cell-extra](/images/doc/cell-extra.jpg)

## 说明

我们将UI分成了两部分，一部分是公共组件，另一部分是业务中常见的一些组件。

一个UI组件里面考虑太多的因素，或者试图利用它去实现一堆的内容，显然是不合适的。

很多业务常用组件，是很难通过一个UI组件来配置完成的，或者说就相当于重新写了一个组件。

与其这样，我们还不如保持UI组件的轻量化。

我们不仅会提供公用的UI组件，也会提供大多数业务所涉及到的样式组件 myppUI。

公用UI组件基本上可以通过配置一下就能满足要求，如果改动量很大，或者层级嵌套很深，建议重新写一个组件，毕竟去适配一个组件消耗的精力可能比自己写一个还要大。

而且作为公用（大家都可以用的组件）来说，需要考虑很多因素，而自己写的往往只需要完成样式即可。适配所有人和适配自己是完全不一样的。

原则就是：宁愿多写几个，也不可一个去勉强适应多个。
