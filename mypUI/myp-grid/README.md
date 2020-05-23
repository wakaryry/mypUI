# myp-grid

> grid组件。支持对item的详细配置

### 规则

- 内外边框分离配置；
- 对提供的数据无特殊的格式要求；
- 对应子组件是myp-grid-item；

## 使用

### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|--------|-----|
| items | Array |  | [] | 需要显示的items，可以指定label，从而对数据无特殊的要求 |
| iconLabel | String |  | icon | items中每一个item取icon的key。默认icon |
| textLabel | String |  | text | items中每一个item取text的key。默认text |
| mode | String | 否 | top | top/right/bottom/left，分别表示item中icon排布的位置.默认top表示icon在上，文字在下 |
| iconType | String |  | icon | item中icon的类型，可以是icon/text。默认icon |
| columns | Number |  | 4 | 一行分布的item个数。一行显示4个 |
| itemHeight | String | 否 | | 每一行的高度，不是scss配置值，而应该是`120rpx`这种设置 |
| hasLine | Boolean | 否 | true | item之间是否存在分割线，默认存在。对最外层的边框无影响 |
| iconTextSpace | String | 否 | 12rpx | item中icon/text之间的间距。默认12rpx |
| iconMode | String | 否 | aspectFill | item中icon为图片时的mode |
| type | String | 否 | | item主题配置，设置icon/text的颜色。可以取`inverse`/`text`/`primary`/`success`/`warning`/`error`。默认对应颜色`class`为`myp-color-`。 |
| size | String | 否 | base | item中text大小设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-size-`，也就是`myp-size-base` |
| iconSize | String | 否 | ll | item中icon大小设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-size-ll` |
| radius | String | 否 | base | 最外层圆角设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-radius-base` |
| border | String | 否 | all | 最外层边框设置。可以取`all`/`top`/`bottom`/`right`/`none`。默认的`class`为`myp-border-all`，带有边框 |
| hover | String | 否 | opacity | item的hover-class设置。可以取`opacity`/`bg`/`bg-opacity`。默认对应的`class`为`myp-hover-opacity` |
| boxStyle | String | 否 | | 对组件最外层进行样式定制 |
| itemBoxClass | String | 否 | item的boxClass |
| itemIconStyle | String | 否 | | item中icon样式设置 |
| itemTextStyle | String | 否 | | item中text文字样式覆盖 |


### slot

> 无

### 事件回掉
| Event     | Params   | Description  |
|--------|--------|-----|
| selected | {row: row,column: column,item: item} | 点击触发 |

### 示例与结果

