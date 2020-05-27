# myp-button

> button组件

### 规则

- 默认宽度会铺满父组件，可以设置宽度进行限制；
- 支持图标/文字/loading；
- 支持背景/文字/图标主题；
- 图标在左，文字在右；
- 兼容nvue/vue；

## 使用

### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|--------|-----|
| text | String |  | 确定 | 按钮的文字描述 |
| icon | String |  | | icon的名字，或者图片地址。图片会自动识别。默认不带icon |
| loading | Boolean | 否 | false | 是否显示loading。true时显示loading |
| loadingSrc | String | 否 | | loading为true时显示，这时候icon会隐藏。默认gif是：`/static/ui/loading.gif` |
| bgType | String | 否 | | 背景色主题配置。具体值参考`base.scss`。默认对应背景`class`为`myp-bg-`，颜色为`$myp-bg-color-inverse`。 |
| height | String | 否 | l | 高度设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-height-l` |
| hover | String | 否 | opacity | 按钮的hover-class设置。可以取`opacity`/`bg`/`bg-opacity`。默认对应的`class`为`myp-hover-opacity`。其它设置表示无hover效果 |
| radius | String | 否 | base | 圆角设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-radius-base`。其它设置可以取消圆角 |
| border | String | 否 | all | 边框设置。可以同时设置边框和颜色。默认对应的`class`为`myp-border-all`，带有边框。无效设置可以取消边框 |
| disabled | Boolean | 否 | false | 禁用点击，且会具备`myp-disabled`class的禁用效果 |
| highlight | Boolean | 否 | false | 用于状态标记，是否`hightlight`，方便设置和切换状态使用 |
| space | String | 否 | 12rpx | `loading/icon`与`text`之间的水平间距 |
| textType | String | 否 | text | text颜色设置。具体参考`base.scss`的`.myp-color`。默认对应的`class`为`myp-color-`，也就是`myp-color-text` |
| textSize | String | 否 | base | text大小设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-size-`，也就是`myp-size-base` |
| iconType | String | 否 | text | 字体icon颜色设置。具体参考`base.scss`的`.myp-color`。默认对应的`class`为`myp-color-`，也就是`myp-color-text` |
| iconSize | String | 否 | l | 字体icon大小设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-size-l` |
| iconMode | String | 否 | aspectFill | icon为图片时的mode |
| boxStyle | String | 否 | | 对组件最外层进行样式定制 |
| disabledStyle | String | 否 | | disabled状态下组件最外层样式设置 |
| highlightStyle | String | 否 | | highlight状态下组件最外层样式设置 |
| textStyle | String | 否 | | 组件内文字样式覆盖 |
| disabledTextStyle | String | 否 | | disabled时组件内文字样式覆盖 |
| highlightTextStyle | String | 否 | | highlight组件内文字样式覆盖 |
| iconStyle | String | 否 | | 组件内icon样式覆盖 |
| disabledIconStyle | String | 否 | | disabled时组件内icon样式覆盖 |
| highlightIconStyle | String | 否 | | highlight时组件内icon样式覆盖 |
| loadingWidth | String | 否 | 36rpx | loading的宽度设置 |
| loadingHeight | String | 否 | 36rpx | loading的高度设置 |

- 默认`button`内是水平垂直居中的，`boxStyle`可以覆盖掉这个设置；
- 其它的`style`设置可以覆盖掉这些快捷设置的效果；
- 既满足一键配置，也满足灵活定义。也就是满足共性，包容特性；
- 具体的`props`取值，应该参考`base.scss`以及`mypui.scss`；

### slot

> 默认slot

### 事件回掉
| Event     | Params   | Description  |
|--------|--------|-----|
| buttonClicked | | 点击触发 |

### 示例与结果

