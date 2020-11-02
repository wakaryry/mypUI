# myp-waterfall

## Props

| Prop name      | Description                                      | Type           | Values | Default                                                                              |
| -------------- | ------------------------------------------------ | -------------- | ------ | ------------------------------------------------------------------------------------ |
| showScrollbar  | 是否显示 scrollbar                               | boolean        | -      | true                                                                                 |
| bgType         | 背景主题                                         | string         | -      | 'page'                                                                               |
| position       | 定位                                             | string         | -      | 'static'                                                                             |
| top            | 定位的 top                                       | string         | -      | '0'                                                                                  |
| bottom         | 定位的 bottom                                    | string         | -      | '0'                                                                                  |
| boxStyle       | 外层样式                                         | string         | -      | ''                                                                                   |
| extra          | 需要从屏幕高度减去的高度                         | string         | -      | 'status-nav'                                                                         |
| height         | 设置了 height，会直接使用 height，忽略其它的计算 | string         | -      | '0'                                                                                  |
| reverse        | 是否颠倒列表                                     | boolean        | -      | false                                                                                |
| useLoading     | 是否启用 loading 组件，而不是 loadmoreofset 触发 | boolean        | -      | false                                                                                |
| loadMoreOffset | 使用 loadmoreofset 时的触发偏移量                | number         | -      | 60                                                                                   |
| columnCount    | 每一行的栏目数                                   | string\|number | -      | 'auto'                                                                               |
| columnWidth    | 每一栏的宽度                                     | string         | -      | 'auto'                                                                               |
| columnGap      | 栏目之间的间距                                   | string         | -      | '0'                                                                                  |
| leftGap        | 内容距离左侧的间距                               | string         | -      | '0'                                                                                  |
| rightGap       | 内容距离右侧的间距                               | string         | -      | '0'                                                                                  |
| autoUpdate     | 是否自动加载第一页数据                           | boolean        | -      | false                                                                                |
| down           | 下拉刷新的配置                                   | object         | -      | {<br> use: true,<br> offset: uni.upx2px(140),<br> inRate: 0.8,<br> outRate: 0.2<br>} |
| up             | 上提加载的配置                                   | object         | -      | {<br> use: true,<br> offset: 80<br>}                                                 |

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
