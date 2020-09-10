
myp-button 非常可爱有趣，提供了 文字/按钮/图标 等样式的交互hover能力，还有 disabled/highlight/loading 等状态。

主要特色如下：

- 支持快捷配置与细节配置（正如其它组件一样，mypUI在高效与细节之间做得非常优秀）；
- 支持loading效果；
- 支持disabled/highlight状态；
- 支持 图标-文字-图标 三段式组合设置；
- 支持 border/radius，等；

## 使用

```html
<myp-button text="手机号登陆" bgType="primary" border="none" radius="ll" @buttonClicked="toPhoneLogin"></myp-button>
```

<p class="tip">我们建议您优先使用主题配置，不要老想着个性化style设置。只有在主题设置不能满足要求的时，才使用style的配置。</p>

myp-button 的配置属性比较多，其实也很简单。毕竟命名规则都是一致的。我们只需要知道 myp-button 是 `icon-text-icon2` 形式的设计即可。

myp-button 是 `flex-direction:row` 的形式。其props如下：

- 盒子类：`bgType` `height(s/l之类)` `radius` `border` `disabled` `highlight` `hover` `space` `boxStyle`

- text：`text` `textType` `textSize` `textStyle`

- icon：`icon` `iconMode` `iconType` `iconSize` `iconStyle` `iconBoxStyle`

- icon2：`icon2` `icon2Mode` `icon2Type` `icon2Size` `icon2Style` `icon2BoxStyle`

- loading：`loading` `loadingSrc` `loadingWidth` `loadingHeight`

- 事件：`@buttonClicked`

- 默认插槽

## 盒子

myp-button 外层view设置，以及一些整体状态等配置。和其它组件一样，命名非常统一，你只需要用过一个组件，就能知道其它组件的用法。很直接，很干脆，用起来很有效率。

`bgType` `height(s/l之类)` `radius` `border` `disabled` `highlight` `hover` `space` `boxStyle`

### bgType

背景色主题配置。比如 `bgType="primary"`。默认无主题，也就是 白色背景。透明背景为：`bgType="none"`

### height

mypUI.scss 中定义的高度快捷配置。默认 base。支持 `ss` `s` `base` `l` `ll`。

### radius

mypUI.scss 中定义的 radius 快捷配置。默认 base。支持 `ss` `s` `base` `l` `ll`。无 radius 设置为 none。

### border

主题中定义的 border 快捷配置。border属性是同时支持 范围与颜色 的，比如：`border="all"` `border="bottom"` `border="all-primary"` `border="bottom-error"`。无 border 设置为 none。

### hover

hover 属性配置，也就是 uniapp中的 hover-class 配置。默认是 opacity，也就是 透明度发生变化。可以选择的值有：`bg` `opacity` `bg-opacity`。无 hover 效果设置为 none。

### space

图标与文字之间的间隔快捷配置。默认是 12rpx。必须带单位。

<p class="tip">我们建议您在使用 mypUI 的过程中，涉及到 自定义宽高尺寸的属性，带上宽高的单位。我们会逐渐取消掉 Number 类型的 宽高属性配置，一律要求带上单位。这是一种开发规范，我们也能基于此进行优化。</p>

### disabled

禁用状态。默认false。禁用以及loading时按钮是不可点击的。除了用作状态标记之外，一般用于点击保护，比如：只有输入正确长度的手机号和密码才能点击登陆。

### highlight

highlight 状态标记。默认是 false。

<p class="tip">highlight有什么用？其实highlight disabled 以及普通状态，合起来就有三个状态，这就实现了 一个 button 组件可以在不同的状态下具备不同的样式。就好比 原生app组件 button 一样，具备不同的状态，不同的样式。可以用于做 切换、标记，等。</p>

### boxStyle

外层盒子style设置。我们一般用于设置一些特别的宽高。

<p class="tip">如果您需要在这里私有化border-color，border-style，border-width，您必须给其加上 !important。因为为了兼容H5，这些设置在 class中加了 !important。</p>

## text

button 内文字属性设置，它的相关属性依然是那么的熟悉。素质四连，简单高效：

`text` `textType` `textSize` `textStyle`

### text

button 文字，默认为空。

### textType

文字主题类型，也就是颜色设置。比如：`textType="primary"`。

### textSize

文字尺寸scss变量设置，可选：`ss` `s` `base` `l` `ll`。默认是 `base`。

### textStyle

文字text的style个性化设置。

## icon

左侧图标设置。其实就是设置左侧的 myp-icon组件。依然是熟悉的味道：

`icon` `iconMode` `iconType` `iconSize` `iconStyle` `iconBoxStyle`

### icon

左侧的图标。默认没有内容。可以是字体图标，也可以是图片。支持网络图片。

### iconMode

如果 icon 是图片的话，支持图片的 mode 设置。默认是 `aspectFill`。

### iconType

图标的主题颜色。

### iconSize

图标的尺寸设置，scss变量名字，可选：`ss` `s` `base` `l` `ll`。默认 `l`。

### iconStyle

图标的 style设置。图片图标的话，可以自定义宽高。字体图标可以个性化font-size等属性。

### iconBoxStyle

icon的外层包裹，比如给图标加个border等。

## icon2

icon2 是文字右侧的图标。它和 icon 是一致的。不再细说。

`icon2` `icon2Mode` `icon2Type` `icon2Size` `icon2Style` `icon2BoxStyle`

## loading

我们允许给 button 设置为 loading 状态，这个时候 左侧的icon会变成loading图标，而且整个按钮不可点击。

`loading` `loadingSrc` `loadingWidth` `loadingHeight`

### loading

是否是 loading状态，默认是 false。打开之后 显示 loading 图标，禁用点击。

### loadingSrc

loading 图片的src。默认是 `/static/ui/loading.gif`。

### loadingWidth

loading 图片的宽度。默认 36rpx。

### loadingHeight

loading 图片的高度。默认 36rpx。

## @buttonClicked

点击 myp-button 任意位置触发。
