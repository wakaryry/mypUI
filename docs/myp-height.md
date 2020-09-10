---
title: 高度：myp-height
type: guide
order: 69
---

## Props

| Prop name | Description | Type   | Values | Default |
| --------- | ----------- | ------ | ------ | ------- |
| height    |             | string | -      | '0'     |
| bgType    |             | string | -      | 'none'  |
| boxStyle  |             | string | -      | ''      |

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

## 使用

```html
<myp-height bgType="inverse" height="status-nav" boxStyle="width:750rpx;">
  <!-- 您的自定义内容 -->
</myp-height>
```

三个属性：`bgType` `height` `boxStyle` 。

## bgType

主题背景色。`myp-bg-` 下定义的可以使用的主题色。

## height

高度设置。单位随意，默认 rpx。可以自由组合，支持语意字符串：`status` `nav` `x` 。

## boxStyle

个性化的style设置。

其它相关文档：

- [myp-x-status](/doc/guide/myp-x-status.html) 
- [myp-x-bar](/doc/guide/myp-x-bar.html) 
- [myp-navbar](/doc/guide/myp-navbar.html)
