# myp-list-index

## Props

| Prop name          | Description                                      | Type    | Values | Default      |
| ------------------ | ------------------------------------------------ | ------- | ------ | ------------ |
| showScrollbar      | 是否显示 scrollbar                               | boolean | -      | true         |
| bgType             | 背景主题                                         | string  | -      | 'page'       |
| position           | 定位                                             | string  | -      | 'static'     |
| top                | 定位的 top                                       | string  | -      | '0'          |
| bottom             | 定位的 bottom                                    | string  | -      | '0'          |
| boxStyle           | 外层样式                                         | string  | -      | ''           |
| extra              | 需要从屏幕高度减去的高度                         | string  | -      | 'status-nav' |
| height             | 设置了 height，会直接使用 height，忽略其它的计算 | string  | -      | '0'          |
| reverse            | 是否颠倒列表                                     | boolean | -      | false        |
| normalList         | 普通 list 内容                                   | array   | -      | []           |
| onlyShowList       | 是否只展示普通 list 内容                         | boolean | -      | false        |
| showIndex          | 是否展示 index                                   | boolean | -      | true         |
| needAnimation      | 滚动时是否有动画效果                             | boolean | -      | true         |
| hotList            | 热门 list 配置                                   | object  | -      | {}           |
| specialList        | 特殊 list 配置                                   | object  | -      | {}           |
| groupTitleStyle    | group 类型的 title 样式                          | string  | -      | ''           |
| titleStyle         | title 样式                                       | string  | -      | ''           |
| groupItemStyle     | group 类型的 item 样式                           | string  | -      | ''           |
| groupItemTextStyle | group 类型的 item 文字样式                       | string  | -      | ''           |
| groupItemDescStyle | group 类型的 item 描述文字样式                   | string  | -      | ''           |
| itemStyle          | item 样式                                        | string  | -      | ''           |
| itemTextStyle      | item 文字样式                                    | string  | -      | ''           |
| itemDescStyle      | item 描述文字样式                                | string  | -      | ''           |
| indexBoxStyle      | index 的外层样式                                 | string  | -      | ''           |
| indexTextStyle     | index 的文字样式                                 | string  | -      | ''           |

## Events

| Event name  | Type      | Description |
| ----------- | --------- | ----------- |
| scroll      | undefined |
| itemClicked | undefined |

## Slots

| Name | Description | Bindings |
| ---- | ----------- | -------- |
| head |             |          |

---
