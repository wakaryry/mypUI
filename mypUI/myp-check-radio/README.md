# myp-radio

> radio单选组件，允许自定义icon，可以使用其它图片

### 规则

- 主题配色作用在icon/title的颜色上；
- 可以实现icon/title位置切换，可以实现占满一行；
- 适用于单选/多选；

## 使用

### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|--------|-----|
| mode | String | 否 | radio | radio/radio-fill/circle-check/box-check/circle-fill-check/box-fill-check/check/custom |
| title | String | | | 文字描述 |
| value | String/Number/Object | | | radio-item绑定的唯一值 |
| icon | String |  | | custom时有效。icon的名字，或者图片地址。图片会自动识别 |
| checkedIcon | String |  | | custom时有效。checked时icon的名字，或者图片地址。图片会自动识别 |
| iconMode | String | 否 | aspectFill | custom时有效，icon/checkedIcon为图片时的mode |
| direction | String | 否 | left | icon显示在左还是右。默认在左 |
| space | String | 否 | 12rpx | icon,title互相之间的水平间距 |
| isBetween | Boolean | 否 | false | 是否铺满一行，左右各占一头。默认不铺满一行 |
| checked | Boolean | 否 | false | 是否选中 |
| disabled | Boolean | 否 | false | 是否禁用 |
| type | String | 否 | | 主题配置，设置icon/title的颜色。可以取`inverse`/`text`/`primary`/`success`/`warning`/`error`。默认对应颜色`class`为`myp-color-`。 |
| size | String | 否 | base | text大小设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-size-`，也就是`myp-size-base` |
| iconSize | String | 否 | l | icon大小设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-size-l` |
| boxStyle | String | 否 | | 对组件最外层进行样式定制 |
| iconStyle | String | 否 | | icon样式设置 |
| disabledIconStyle | String | 否 | | disabled时icon样式设置 |
| checkedIconStyle | String | 否 | | checked时icon样式设置 |
| titleStyle | String | 否 | | title文字样式覆盖 |
| disabledTitleStyle | String | 否 | | title文字样式覆盖 |
| checkedTitleStyle | String | 否 | | title文字样式覆盖 |

### slot

> 无

### 事件回掉
| Event     | Params   | Description  |
|--------|--------|-----|
| radioClicked | | 点击触发 |

### 示例与结果

