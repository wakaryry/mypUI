# myp-grid-item

> item/grid-item组件。支持`primary`、`success`、`warning`、`error`主题配置

### 规则

- 默认的单行/两行item；
- 主题配色作用在icon/text的颜色上；
- 可以实现icon/text/icon+text/text+text形式任何排布item；
- 不仅仅只是用于grid里面，任何地方需要使用item的都可以使用；

## 使用

### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|--------|-----|
| icon | String |  | | icon的名字，或者图片地址。图片会自动识别。默认不带icon。也可以是文字或者数字等，具体值和iconType对应 |
| iconType | String |  | icon | icon的类型，可以是icon/text。默认icon |
| text | String |  | | 文字描述 |
| space | String | 否 | 12rpx | icon,text互相之间的水平/垂直间距 |
| mode | String | 否 | top | top/right/bottom/left 分别表示icon排布的位置.默认top表示icon在上，文字在下 |
| iconMode | String | 否 | aspectFill | icon为图片时的mode |
| type | String | 否 | | 主题配置，设置icon/text的颜色。可以取`inverse`/`text`/`primary`/`success`/`warning`/`error`。默认对应颜色`class`为`myp-color-`。 |
| size | String | 否 | base | text大小设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-size-`，也就是`myp-size-base` |
| iconSize | String | 否 | l | icon大小设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-size-l` |
| hover | String | 否 | opacity | 按钮的hover-class设置。可以取`opacity`/`bg`/`bg-opacity`。默认对应的`class`为`myp-hover-opacity` |
| boxClass | String | 否 | | 对组件最外层进行样式定制，主要是如果boxStyle中有样式影响hover，可以将其移入boxClass中 |
| boxStyle | String | 否 | | 对组件最外层进行样式定制 |
| iconStyle | String | 否 | | icon样式设置 |
| textStyle | String | 否 | | text文字样式覆盖 |

- type/size/iconSize/等可以实现快速设置，根据scss配置，可以快速实现自己的效果；
- 其它的style设置可以覆盖掉这些快捷设置的效果；
- 既满足一键配置，也满足灵活定义。也就是满足共性，包容特性；
- 在部分平台下，boxStyle中如果设置了background-color/opacity等影响hover的属性，hover时会没有效果，我们提供了一个boxClass来对这些属性进行设置；

### slot

> 无

### 事件回掉
| Event     | Params   | Description  |
|--------|--------|-----|
| itemClicked | | 点击触发 |

### 示例与结果

