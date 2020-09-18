---
title: 弹窗2：myp-popup-always
type: guide
order: 251
---

## Props

| Prop name    | Description | Type    | Values | Default                                                                                               |
| ------------ | ----------- | ------- | ------ | ----------------------------------------------------------------------------------------------------- |
| show         |             | boolean | -      | false                                                                                                 |
| pos          |             | string  | -      | 'bottom'                                                                                              |
| bgType       |             | string  | -      | 'none'                                                                                                |
| duration     |             | number  | -      | 300                                                                                                   |
| overlay      |             | object  | -      | {<br> timingFunction: ['ease-in', 'ease-out'],<br> duration: 300,<br> bg: '',<br> bgType: 'mask'<br>} |
| height       |             | string  | -      | '0'                                                                                                   |
| extra        |             | string  | -      | '0'                                                                                                   |
| standout     |             | string  | -      | '0'                                                                                                   |
| leftOffset   |             | string  | -      | '-1'                                                                                                  |
| rightOffset  |             | string  | -      | '-1'                                                                                                  |
| bottomOffset |             | string  | -      | '-1'                                                                                                  |
| topOffset    |             | string  | -      | '-1'                                                                                                  |
| width        |             | string  | -      | '750rpx'                                                                                              |
| animation    |             | object  | -      | {<br> timingFunction: 'ease-in-out'<br>}                                                              |
| left         |             | string  | -      | '0'                                                                                                   |
| top          |             | string  | -      | '0'                                                                                                   |
| right        |             | string  | -      | '0'                                                                                                   |
| bottom       |             | string  | -      | '0'                                                                                                   |
| boxStyle     |             | string  | -      | ''                                                                                                    |

## Events

| Event name     | Type      | Description |
| -------------- | --------- | ----------- |
| overlayClicked | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| overlay |             |          |
| default |             |          |

---

myp-popup-always 几乎是与 myp-popup 一样的，属性一样，用法一样。

他们之间的区别在于：

- myp-popup-always 里面的内容不受 v-if 控制，会一直存在于 视图 之中，而 myp-popup 的内容区是 受 v-if 控制的；

- myp-popup-always 因为一直存在，所以它支持 standout 属性，允许 不打开的时候还能够 对外露出一小截；

这里只讲差异的内容，其它内容请查阅：[myp-popup](/doc/guide/myp-popup.html)

## standout

允许对外露出一小截内容，standout 就是对外露出的高度。单位随意，默认 rpx。

## 用途

除了实现 standout 外，myp-popup-always 还能有什么用？

这个问题，其实就是：为什么要有 `myp-popup` `myp-popup-always` 两个组件？

除了上面说过的 standout 特性。我们主要考虑的是：

> myp-popup 内容是 v-if 控制的，它可能在打开的时候永远在其它视图之上，而有个时候我们需要它处于某个视图的下面，比如从页面顶部弹出内容的时候，我们希望，它处于自定义导航栏的下面，而不是在自定义导航栏的上面。这个时候 myp-popup 做不到。

所以，myp-popup-always 的存在，很大程度上是为了业务的需要，其实也是视图层级机制的需要。

我们在制作 筛选filter 的时候，经常需要 上面的总览条件不被遮挡，下面的具体filter内容具备弹层效果，myp-popup-always 就能够很好的帮助到您。

myp-popup-always 能够自由 可控的 调整其在视图中的层级。想要他处于某个元素的下面或者上面都可以轻易的做到。

> 这样navbar就始终在弹层的上面

```html
<template>
  <view>
    <myp-popup-always></myp-popup-always>
    <myp-navbar :fixed="true" :isSeize="false"></myp-navbar>
  </view>
</template>
```

> 这样navbar就始终在弹层的下面

```html
<template>
  <view>
    <myp-navbar :fixed="true" :isSeize="false"></myp-navbar>
    <myp-popup-always></myp-popup-always>
  </view>
</template>
```

具体可以去看我们的demo 中 filter类目。
