---
title: 盒子：myp-content-box
type: guide
order: 70
page: /static/h5/#/pages/base/content_box
---

## Props

| Prop name | Description                                   | Type   | Values | Default      |
| --------- | --------------------------------------------- | ------ | ------ | ------------ |
| bgType    | 背景主题                                      | string | -      | 'page'       |
| border    | 边框主题                                      | string | -      | ''           |
| radius    | 圆角主题                                      | string | -      | ''           |
| extra     | 需要从屏幕高度减去的高度                      | string | -      | 'status-nav' |
| height    | height 非 0 时，会直接使用 height，忽略 extra | string | -      | '0'          |
| boxStyle  | 外层样式                                      | string | -      | ''           |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

我们提供了一个 myp-content-box 的组件，这个组件主要是用来 组件化快速决策高度。

**这个组件需要注意的就是 `extra` 属性的配置。**

我们约定如下：

- extra指的是需要从屏幕高度上减去的高度；
- height属性设置为非0时，extra属性无效；
- extra是可以多段拼接的，比如：`status-nav-x-100rpx-40px`，它表示 `状态栏高度+导航栏高度+xBar安全区高度+100rpx的高度+40px的高度`，非常灵活与方便；

**为什么会有这个组件？**

一切还得从 公元前520年 说起。那时候，天地虽不是初生，但混沌依旧，万物皆有灵，一切是那么的玄幻莫测。

实际上就是：myp-content-box 是 contentBoxMixin 的组件化。我们建议您在App端少用甚至不要用到该组件，因为大多数的高度在app端都可以通过 `flex:1` 来实现。

默认属性下，盒子高度 = 屏幕的高度 - 状态栏高度 - 导航栏高度。

当然，有时候，我们可能不想在swiper外面包裹一层view，有没有什么办法了？

办法有好几种：

> 自己可以调用 系统的方法，获取 屏幕高度，减去部分高度，然后就是 swiper 的高度了；

> 直接调用我们缓存的 app.globalData 里面的 screenHeight 获取屏幕高度；

> 使用 contentBoxMixin (`/mypUI/myp-mixin/contentBoxMixin.js`) 混入当前页面，然后设置相应的值来做控制；

这些方法，有一个共性，就是都需要显示的为 swiper 设置高度。而且目前，我们也都是这么做的。

mypUI 内部，我们会不断优化，尽量在减少混入的同时，又能最大程度的复用。

contentBoxMixin 的混入，不会重复去获取系统信息，会直接使用 globalData 里面的缓存信息。

不过有个时候，你会发现，我们频繁的需要使用高度决策，一个页面里面可能使用了好些个子组件，这些子组件有可能都需要单独使用上面的方法来决策高度。

这个时候，你可能会觉得这些组件每个里面都混入一次高度计算的mixin，实在是有点小别扭。那你可以直接使用 globalData 里面的缓存值。

具体使用什么哪种高度决策，取决于您自己。

不过，您应该避免过多的依赖高度决策，或者是滥用高度决策。只有在flex不能满足的时候明确使用高度决策。

contentBoxMixin 的文档请看 [contentBoxMixin](/doc/guide/contentBoxMixin.html)
