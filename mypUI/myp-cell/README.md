# myp-cell

> cell/list-cell组件。支持`primary`、`success`、`warning`、`error`主题配置

### 规则

- icon/title/value/indicator，默认可以实现一行4段；
- 默认title对应一级标题，value是二级标题或者是描述内容；
- 搭配slot可以实现多行或者一行更多段；

## 使用

### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|--------|-----|
| icon | String |  | | icon的名字，或者图片地址。图片会自动识别。默认不带icon |
| title | String |  | | 标题文字描述。默认对应文字颜色 |
| value | String |  | | 二级文字描述。默认对应二级文字颜色 |
| indicator | String |  | right | indicator icon的名字，或者图片地址。图片会自动识别。默认`right`。 可以通过showIndicator或者 indicator为空字符串等来覆盖 |
| showIndicator | Boolean | false | | 是否显示 indicator，默认不显示 |
| type | String | 否 | | 主题配置，设置cell的背景色。可以取`inverse`/`text`/`primary`/`success`/`warning`/`error`。默认对应背景`class`为`myp-bg-`。 |
| size | String | 否 | base | title大小设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-size-`，也就是`myp-size-base` |
| valueSize | String | 否 | s | value大小设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-size-s` |
| iconMode | String | 否 | aspectFill | icon为图片时的mode |
| indicatorMode | String | 否 | aspectFill | indicator为图片时的mode |
| height | String | 否 | l | 高度设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-height-l` |
| hover | String | 否 | bg | 按钮的hover-class设置。可以取`opacity`/`bg`/`bg-opacity`。默认对应的`class`为`myp-hover-bg`。其它设置表示无hover效果 |
| radius | String | 否 |  | 圆角设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认无圆角 |
| border | String | 否 |  | 边框设置。可以取`all`/`top`/`bottom`/`right`/`none`。默认无边框 |
| space | String | 否 | 12rpx | icon,title,value,indicator互相之间的水平间距 |
| iconSize | String | 否 | l | icon大小设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-size-l` |
| iconStyle | String | 否 | | icon样式设置 |
| indicatorSize | String | 否 | l | indicator大小设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-size-l` |
| indicatorStyle | String | 否 | | indicator样式设置 |
| boxClass | String | 否 | | 对组件最外层进行样式定制，主要是如果boxStyle中有样式影响hover，可以将其移入boxClass中 |
| boxStyle | String | 否 | | 对组件最外层进行样式定制 |
| titleStyle | String | 否 | | 组件内title文字样式覆盖 |
| valueStyle | String | 否 | | 组件内value文字样式覆盖 |

- type/size/iconSize/height/radius/border等可以实现快速设置，根据scss配置，可以快速实现自己的效果；
- 其它的style设置可以覆盖掉这些快捷设置的效果；
- 既满足一键配置，也满足灵活定义。也就是满足共性，包容特性；
- 在部分平台下，boxStyle中如果设置了background-color/opacity等影响hover的属性，hover时会没有效果，我们提供了一个boxClass来对这些属性进行设置；

### slot

- 默认slot，覆盖title/value；
- extra，在value与indicator之间提供更多配置；

### 事件回掉
| Event     | Params   | Description  |
|--------|--------|-----|
| selected | | 点击触发 |

### 示例与结果

## 说明
我对一套UI的理解就是，公用性比较强的组件集合。

我们把这些常用的，配置量偏小的，或者说只要很少的配置就能满足要求的组件合起来组成一套UI。而不是试图去使用这些UI组件去适配所有的样式，希望借此满足所有的组件。

一个UI组件里面考虑太多的因素，或者试图利用它去实现一堆的内容，显然是不合适的。

我们将UI分成了两部分，一部分是公共组件，另一部分是业务中常见的一些组件。

很多业务常用组件，是很难通过一个UI组件来配置完成的，或者说就相当于重新写了一个组件。

与其这样，我们还不如保持UI组件的轻量化。

在这套组件内，我们不仅会提供公用的UI组件，也会提供大多数业务所涉及到的样式组件。

公用UI组件基本上可以通过配置一下就能满足要求，如果改动量很大，或者层级嵌套很深，建议重新写一个组件，毕竟去适配一个组件消耗的精力可能比自己写一个还要大。

而且作为公用（大家都可以用的组件）来说，需要考虑很多因素，而自己写的往往只需要完成样式即可。适配所有人和适配自己是完全不一样的。

原则就是：宁愿多写几个，也不可一个去勉强适应多个。
