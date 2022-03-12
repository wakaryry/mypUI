---
title: 定位：myp-position
type: guide
order: 77
page: /static/h5/#/pages/base/position
---

## Props

| Prop name | Description     | Type    | Values | Default  |
| --------- | --------------- | ------- | ------ | -------- |
| fixed     | 是否 fixed 定位 | boolean | -      | false    |
| pos       | 定位的位置      | string  | -      | 'bottom' |
| offset    | 定位的偏移量    | string  | -      | '0px'    |
| bgType    | 背景主题        | string  | -      | 'none'   |
| boxStyle  | 外层样式        | string  | -      | ''       |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

myp-position 是特殊定位的包裹层。也就是 `absolute` `fixed` 定位的封装盒子。

用来做 顶部或者底部 的定位。

## 使用

```html
<myp-position pos="bottom" offset="x-60px" boxStyle="left:75rpx;width:600rpx;"></myp-position>
```

## pos

定位的基线，基于 顶部，还是基于 底部。

只可以取值：`top` 或者 `bottom`。

## offset

offset 单位随意，默认 rpx，支持 语意字符串。是与定位基线的距离。也就是：`top:offsetPx;` 之类的。

## fixed

默认false，也就是 absolute 定位。true 时为 fixed 定位。

## boxStyle

个性化 style 设置。
