# myp-button

> button组件。支持`primary`、`success`、`warning`、`error`主题配置

### 规则

- 默认宽度会铺满父组件，可以设置宽度进行限制；
- 支持图标/文字/loading；
- 主题作用于背景色上；

## 使用

### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|--------|-----|
| text | String |  | 确定 | 按钮的文字描述 |
| icon | String |  | | icon的名字，或者图片地址。图片会自动识别。默认不带icon |
| loading | Boolean | 否 | false | 是否显示loading。true时显示loading |
| loadingSrc | String | 否 | | loading为true时显示，这时候icon会隐藏。默认gif是：https://img.alicdn.com/tfs/TB1Ep_9NVXXXXb8XVXXXXXXXXXX-74-74.gif |
| type | String | 否 | | 主题配置，设置button的背景色。可以取`inverse`/`text`/`primary`/`success`/`warning`/`error`。默认对应背景`class`为`myp-bg-`。 |
| size | String | 否 | base | text大小设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-size-`，也就是`myp-size-base` |
| iconSize | String | 否 | l | 字体icon大小设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-size-l` |
| iconMode | String | 否 | aspectFill | icon为图片时的mode |
| height | String | 否 | l | 高度设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-height-l` |
| hover | String | 否 | opacity | 按钮的hover-class设置。可以取`opacity`/`bg`/`bg-opacity`。默认对应的`class`为`myp-hover-opacity`。其它设置表示无hover效果 |
| radius | String | 否 | base | 圆角设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-radius-base`。其它设置可以取消圆角 |
| border | String | 否 | all | 边框设置。可以取`all`/`top`/`bottom`/`right`/`none`。默认对应的`class`为`myp-border-all`，带有边框。无效设置可以取消边框 |
| disabled | Boolean | 否 | false | 禁用点击，且会具备`myp-disabled`class的禁用效果 |
| highlight | Boolean | 否 | false | 用于状态标记，是否hightlight，方便设置和切换状态使用 |
| space | String | 否 | 12rpx | loading/icon与text之间的水平间距 |
| boxClass | String | 否 | | 对组件最外层进行样式定制，主要是如果boxStyle中有样式影响hover，可以将其移入boxClass中 |
| boxStyle | String | 否 | | 对组件最外层进行样式定制 |
| disabledStyle | String | 否 | | disabled状态下组件最外层样式设置 |
| highlightStyle | String | 否 | | highlight状态下组件最外层样式设置 |
| textStyle | String | 否 | | 组件内文字样式覆盖 |
| disabledTextStyle | String | 否 | | disabled时组件内文字样式覆盖 |
| highlightTextStyle | String | 否 | | highlight组件内文字样式覆盖 |
| iconStyle | String | 否 | | 组件内icon样式覆盖 |
| disabledIconStyle | String | 否 | | disabled时组件内icon样式覆盖 |
| highlightIconStyle | String | 否 | | highlight时组件内icon样式覆盖 |
| loadingWidth | String | 否 | | loading的宽度设置 |
| loadingHeight | String | 否 | | loading的高度设置 |

- type/size/iconSize/height/radius/border可以实现快速设置，根据scss配置，可以快速实现自己的效果；
- 默认button内是水平垂直居中的，boxStyle可以覆盖掉这个设置；
- 其它的style设置可以覆盖掉这些快捷设置的效果；
- 既满足一键配置，也满足灵活定义。也就是满足共性，包容特性；
- 在部分平台下，boxStyle中如果设置了background-color/opacity等影响hover的属性，hover时会没有效果，我们提供了一个boxClass来对这些属性进行设置；

### slot

> 无

### 事件回掉
| Event     | Params   | Description  |
|--------|--------|-----|
| buttonClicked | | 点击触发 |

### 示例与结果

