---
title: 列表：myp-list-simple
type: guide
order: 61
---

## Props

| Prop name     | Description | Type    | Values | Default  |
| ------------- | ----------- | ------- | ------ | -------- |
| showScrollbar |             | boolean | -      | true     |
| bgType        |             | string  | -      | 'page'   |
| position      |             | string  | -      | 'static' |
| top           |             | string  | -      | '0'      |
| bottom        |             | string  | -      | '0'      |
| boxStyle      |             | string  | -      | ''       |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| scroll     | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

myp-list-simple 是 myp-list 组件的简化版，它移除了 刷新和加载 的功能，只是一个简单的数据展示组件。我们在不需要 刷新和加载 的页面，通常都是使用该组件来撑开页面和获得滚动能力。

如果您需要 刷新和加载，请使用 myp-list，它的文档在 [myp-list文档](/doc/guide/myp-list.html)

myp-list-simple 组件和 myp-list 一样，其默认插槽下的内容，必须包裹在 `myp-list-cell` 之中。它也有 `foot` 插槽。

除去 刷新和加载 的属性配置以及监听事件，它和 myp-list 一模一样。其实他们都公用着一套相同的 `styleMixin`。

