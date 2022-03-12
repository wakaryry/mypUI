---
title: 导航栏：myp-navbar
type: guide
order: 100
page: /static/h5/#/pages/nav/navbar
---

## Props

| Prop name      | Description              | Type    | Values | Default     |
| -------------- | ------------------------ | ------- | ------ | ----------- |
| lefts          | 左侧 item 集             | array   | -      | []          |
| title          | 标题                     | string  | -      | null        |
| icon           | 标题右侧图标             | string  | -      | null        |
| rights         | 右侧 item 集             | array   | -      | []          |
| bgType         | 背景主题                 | string  | -      | 'nav'       |
| border         | 边框主题                 | string  | -      | 'none'      |
| titleType      | 标题颜色主题             | string  | -      | 'nav-title' |
| titleSize      | 标题尺寸主题             | string  | -      | 'nav-title' |
| titleStyle     | 标题样式                 | string  | -      | ''          |
| iconType       | 标题图标颜色主题         | string  | -      | 'nav-title' |
| iconSize       | 标题图标尺寸主题         | string  | -      | 'nav-title' |
| iconStyle      | 标题图标样式             | string  | -      | ""          |
| itemIconType   | item 图标颜色主题        | string  | -      | 'nav-icon'  |
| itemIconSize   | item 图标尺寸主题        | string  | -      | 'nav-icon'  |
| itemIconStyle  | item 图标样式            | string  | -      | ""          |
| itemTextType   | item 文字颜色主题        | string  | -      | 'nav-item'  |
| itemTextSize   | item 文字尺寸主题        | string  | -      | 'nav-item'  |
| itemTextStyle  | item 文字样式            | string  | -      | ''          |
| height         | 自定义 px 高度           | number  | -      | 44          |
| includeStatus  | 是否包含状态栏           | boolean | -      | true        |
| isSeize        | 是否占位                 | boolean | -      | true        |
| fixed          | 是否 fixed 定位          | boolean | -      | true        |
| leftStyle      | lefts 整体样式           | string  | -      | ''          |
| leftBgType     | lefts 整体的背景主题     | string  | -      | ''          |
| leftItemStyle  | lefts 中 item 的样式     | string  | -      | ''          |
| rightStyle     | rights 整体样式          | string  | -      | ''          |
| rightBgType    | rights 整体背景主题      | string  | -      | ''          |
| rightItemStyle | rights 中 item 的样式    | string  | -      | ''          |
| centerStyle    | 中间 title 外层的样式    | string  | -      | ''          |
| boxStyle       | 外层样式                 | string  | -      | ''          |
| statusNavStyle | status 与 nav 的外层样式 | string  | -      | ''          |
| navStyle       | nav 的外层样式           | string  | -      | ''          |

## Events

| Event name   | Type      | Description |
| ------------ | --------- | ----------- |
| leftAction   | undefined |
| centerAction |           |
| rightAction  | undefined |

## Slots

| Name  | Description | Bindings |
| ----- | ----------- | -------- |
| left  |             |          |
| title |             |          |
| right |             |          |
| extra |             |          |

---

myp-navbar 是一个通用的自定义导航栏组件。

## 使用

```html
<myp-navbar title="我是导航栏"></myp-navbar>
```

这就是一个默认 标题栏居中 的导航栏。

myp-navbar 主要的字段就是 `title` `lefts` `rights` `@leftAction` `@rightAction`。一个通用的导航栏，通常就是 中间标题 + 左右按钮。当然，还有一些背景等配置。

## 整体配置

`bgType` `isSeize` `fixed` `height` `includeStatus` `boxStyle` `navStyle`

### bgType

背景主题色，比如 `bgType="primary"`。

### isSeize

是否占位，只在 `fixed` 为 `true` 时起作用。就是指，`position:fixed` 时，是否在视图中有一个相同高度的空白view占位。

默认开启了 fixed。默认占位。您可以根据需要修改。

### fixed

是否启用 `position:fixed`。默认 `:fixed="true"`，启用了 固定定位，而且开启了占位。可以根据需要调整。

### height

默认是 44px。Number类型。px单位。建议您不要修改这个值，如果您不知道您在做什么。

修改 height 高度值，会导致其它的高度决策出现问题，如果您不做其它处理的话。我们的navHeight 默认是 44px，您可以根据需要全局全局修改这个配置值（`/mypUI/myp-mixin/windowMixin.js` 中 `mypGetNavHeight` 用到这个值），然后 myp-navbar 中设置配置中的height。

如果您只是单独的某个页面修改这个值，请适配单独那个页面的高度决策。

### includeStatus

是否包含 status 状态栏。默认包含。Boolean值，默认 true。

### boxStyle

整个navbar的 style设置。

### navStyle

导航栏除去status的那部分 style 设置。

## 中间标题

我们默认采用了 左-中-右 三段式的设计。左右两侧分别是 200rpx，中间是 350rpx。当你需要一些别的 设计的时候，您可能需要修改 这三段各段的宽度。默认他们就是排成一行，不换行。

中间 title，包含了 title 和 icon，也就是允许在文字的右侧设置一个 icon 图标。

### title

中间标题栏，以及它的主题、大小、个性化等设置。

`title` `titleType` `titleSize` `titleStyle`。

- title：导航栏标题，比如：首页；
- titleType：标题的主题色，也就是文字的颜色，比如：nav-title，具体看 `myp-color-` 下可以使用的主题色；
- titleSize：标题的字体大小，也就是 font-size，比如：nav-title，具体看 `myp-size-` 下可以使用的尺寸；
- titleStyle：对标题的style进行设置，比如：颜色、尺寸等；

### icon

标题右侧出现的 图标，以及它的主题、大小、个性化等设置。

`icon` `iconType` `iconSize` `iconStyle`。

- icon：图标的名字，可以是 字体图标的名字，也可以是 图片地址，支持网络图片；
- iconType：图标的主题，也就是图标的颜色；
- iconSize：图标的尺寸，也就是 font-size，支持：ss s base l ll，具体多大得看你的主题配置文件；
- iconStyle：style的个性化设置，图片的话需要在这里设置宽高等信息；

### centerStyle

在 title与icon 的外层，包裹了一个 view，它对外暴露了 style的设置，也就是 centerStyle。我们一般用于修改中间标题区的宽度。

中间内容区的宽度默认是 350rpx，您可以根据需要修改宽度。而且默认是 超过350rpx宽度的 text 会被截断，是 ellipsis 截断。

## 左右按钮

左右按钮的设置非常灵活，支持 一次性设置样式，也支持 单独的配置样式。左右按钮支持 图标与文字 的组合。

`lefts` `rights`

- 1. `itemTextType` `itemTextSize` `itemTextStyle` `itemIconType` `itemIconSize` `itemIconStyle` 

- 2. `leftItemStyle` `rightItemStyle`

- 3. `leftBgType` `leftStyle` `rightBgType` `rightStyle`

lefts rights 是 数组类型，他们包含了 各侧按钮的数量 以及 按钮的个性化配置。

`[{icon: 'left', text: '返回'}]`

> 我们把 左右侧 的每一个按钮叫做 item。

可以大概知道，上面我们列出的一堆属性就是针对 item 的统一化的配置。从名字我们就能够知道，他们分别对应谁，以及对应什么方面。

- `1.` 项，主要是为 所有 item 的 文字和icon图标 的统一配置信息；

- `2.` 项，是对 item 的外层整体进行配置；

- `3.` 项，是对 所有 items 的整体进行配置，也就是 对 left/right 这片区域进行配置。

每一个 item 都可以重置 统一的 item 配置。

每个 item 全面的配置信息如下：

```js
{
	icon: 'left',  // icon 图标或者图片
	text: '返回',  // 文字
	iconType: 'inverse',  // icon 主题色
	iconSize: 'l',  // icon尺寸
	iconStyle: '',  // icon style
	textType: 'inverse',  // text 主题色
	textSize: 'l',  // text 尺寸
	textStyle: '', // text style
	style: '',  // 整个 item 的 style
	bgType: 'primary'  // 整个 item 的背景主题色
}
```

## 事件

我们为 左-中-右 提供了统一名字的 点击响应。

### @leftAction

携带参数，左侧按钮的 index 值。

### @rightAction

携带参数，右侧按钮的 index 值。

### @centerAction

## 插槽

提供了 left/right/title 三个插槽。注意 中间的不叫 center，而是叫做 title。
