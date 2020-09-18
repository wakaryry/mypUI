---
title: 布局：myp-flex
type: guide
order: 30
---

## Props

| Prop name | Description | Type   | Values | Default  |
| --------- | ----------- | ------ | ------ | -------- |
| direction |             | string | -      | 'row'    |
| wrap      |             | string | -      | 'nowrap' |
| justify   |             | string | -      | 'start'  |
| align     |             | string | -      | 'center' |
| bgType    |             | string | -      | ''       |
| border    |             | string | -      | 'none'   |
| radius    |             | string | -      | 'none'   |
| boxStyle  |             | string | -      | ''       |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

myp-flex 是flex布局的组件化。

```html
<myp-flex>
	<view style="flex:1;"></view>
	<view style="flex:1;"></view>
	<view style="flex:1;"></view>
</myp-flex>
```
