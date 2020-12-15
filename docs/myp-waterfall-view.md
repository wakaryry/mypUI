---
title: 瀑布流：myp-waterfall-view
type: guide
order: 64
page: https://mypui.asnowsoft.cn/h5/#/pages/scroll/waterfall
---

> 支持左右两列
> 头条小程序不支持作用域插槽
> 头条小程序直接写

## Props

| Prop name  | Description                                                                                                                     | Type   | Values | Default |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | ------- |
| idLabel    | item 的唯一值键                                                                                                                 | string | -      | 'id'    |
| calculator | 高度计算方法.<br>不使用自动计算高度的，体验太差.<br>高度难以确定的，根据元素内容预估高度即可.<br>不提供就直接是左右各一个排下去 | func   | -      | null    |
| columnGap  | 栏目之间的间距                                                                                                                  | string | -      | '0'     |
| leftGap    | 内容距离左侧的间距                                                                                                              | string | -      | '0'     |
| rightGap   | 内容距离右侧的间距                                                                                                              | string | -      | '0'     |
| boxStyle   |                                                                                                                                 | string | -      | ''      |

## Slots

| Name  | Description | Bindings                                                        |
| ----- | ----------- | --------------------------------------------------------------- |
| left  |             | [<br> {<br> "name": "lefts",<br> "title": "binding"<br> }<br>]  |
| right |             | [<br> {<br> "name": "rights",<br> "title": "binding"<br> }<br>] |

---
