# myp-waterfall

## Props

| Prop name       | Description                                      | Type           | Values | Default                                                                              |
| --------------- | ------------------------------------------------ | -------------- | ------ | ------------------------------------------------------------------------------------ |
| showScrollbar   | 是否显示 scrollbar                               | boolean        | -      | true                                                                                 |
| bgType          | 背景主题                                         | string         | -      | 'page'                                                                               |
| position        | 定位                                             | string         | -      | 'static'                                                                             |
| top             | 定位的 top                                       | string         | -      | '0'                                                                                  |
| bottom          | 定位的 bottom                                    | string         | -      | '0'                                                                                  |
| boxStyle        | 外层样式                                         | string         | -      | ''                                                                                   |
| extra           | 需要从屏幕高度减去的高度                         | string         | -      | 'status-nav'                                                                         |
| height          | 设置了 height，会直接使用 height，忽略其它的计算 | string         | -      | '0'                                                                                  |
| reverse         | 是否颠倒列表                                     | boolean        | -      | false                                                                                |
| loadMainText    | 可以继续加载时的文字提示                         | string         | -      | '继续加载更多'                                                                       |
| loadingText     | 正在加载时的文字提示                             | string         | -      | '正在加载'                                                                           |
| noMoreText      | 没有更多时的文字提示                             | string         | -      | '没有更多啦'                                                                         |
| showNoMore      | 是否展示没有更多                                 | boolean        | -      | true                                                                                 |
| loadingSrc      | 加载中的 gif 图片                                | string         | -      | '/static/ui/loading-small.gif'                                                       |
| loadingStyle    | loading 的外层样式                               | string         | -      | ''                                                                                   |
| refreshMainText | 下拉时提示文字                                   | string         | -      | '下拉即可刷新...'                                                                    |
| pullingText     | 下拉时提示文字                                   | string         | -      | '释放即可刷新...'                                                                    |
| refreshingText  | 正在刷新的提示文字                               | string         | -      | '正在努力加载...'                                                                    |
| refreshStyle    | 刷新组件的外层样式                               | string         | -      | ''                                                                                   |
| useLoading      | 是否启用 loading 组件，而不是 loadmoreofset 触发 | boolean        | -      | false                                                                                |
| loadMoreOffset  | 使用 loadmoreofset 时的触发偏移量                | number         | -      | 60                                                                                   |
| columnCount     | 每一行的栏目数                                   | string\|number | -      | 'auto'                                                                               |
| columnWidth     | 每一栏的宽度                                     | string         | -      | 'auto'                                                                               |
| columnGap       | 栏目之间的间距                                   | string         | -      | '0'                                                                                  |
| leftGap         | 内容距离左侧的间距                               | string         | -      | '0'                                                                                  |
| rightGap        | 内容距离右侧的间距                               | string         | -      | '0'                                                                                  |
| autoUpdate      | 是否自动加载第一页数据                           | boolean        | -      | false                                                                                |
| down            | 下拉刷新的配置                                   | object         | -      | {<br> use: true,<br> offset: uni.upx2px(140),<br> inRate: 0.8,<br> outRate: 0.2<br>} |
| up              | 上提加载的配置                                   | object         | -      | {<br> use: true,<br> offset: 80<br>}                                                 |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| scroll     | undefined |
| down       |           |
| up         |           |
| inited     |           |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| header  |             |          |
| default |             |          |

---
