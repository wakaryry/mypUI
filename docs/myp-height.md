---
title: 高度：myp-height
type: guide
order: 74
page: /static/h5/#/pages/base/height
---

## Props

| Prop name | Description                                  | Type   | Values | Default |
| --------- | -------------------------------------------- | ------ | ------ | ------- |
| height    | 自定义高度。允许 status-nav-100rpx-12px 写法 | string | -      | '0'     |
| bgType    | 背景颜色主题                                 | string | -      | 'none'  |
| border    | 边框主题                                     | string | -      | 'none'  |
| radius    | 圆角主题                                     | string | -      | 'none'  |
| boxStyle  | 外层样式                                     | string | -      | ''      |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

myp-height 是有一个有趣的组件。它给予了您快速决策特殊高度的能力。

比如：

- 一个 导航栏高度 的view；

- 一个 状态栏高度 的view；

- 一个 状态栏+导航栏高度 的view；

- 一个 xBar高度 的view；

- 一个 随意组合高度 的view，比如：`status-nav-20px-100rpx` `x-60px` 等；

**使用**

```html
<myp-height bgType="inverse" height="status-nav" boxStyle="width:750rpx;">
  <!-- 您的自定义内容 -->
</myp-height>
```

其它相关文档：

- [myp-status](/doc/guide/myp-status.html) 
- [myp-xbar](/doc/guide/myp-xbar.html) 
- [myp-navbar](/doc/guide/myp-navbar.html)
