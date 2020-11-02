---
title: 单多选：myp-check-item
type: guide
order: 155
---

## Props

| Prop name | Description       | Type           | Values | Default   |
| --------- | ----------------- | -------------- | ------ | --------- |
| value     | 唯一值/返回的内容 | number\|string | -      | ''        |
| disabled  | 是否禁用          | boolean        | -      | false     |
| border    | 边框主题          | string         | -      | ''        |
| radius    | 圆角主题          | string         | -      | ''        |
| bgType    | 背景主题          | string         | -      | ''        |
| hover     | hover 效果        | string         | -      | 'opacity' |
| boxStyle  | 外层样式          | string         | -      | ''        |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

myp-check-item 只用于 myp-check 组件的子组件。而且 myp-check 的子组件必须是 myp-check-item。

如果您不想自定义，请直接使用我们提供的默认可配置的选择组件 [myp-check-static](/doc/guide/myp-check-static.html).

**示范**

```html
<myp-check-static v-model="model" icon="circle" checkedIcon="radio" :items="items1" direction="right" :isBetween="true" itemBoxStyle="background-color:#F5F7F9;padding-left:32rpx;padding-right:32rpx;" boxStyle="border-radius:16rpx;overflow:hidden;"></myp-check-static>

<myp-check-static v-model="model1" icon="circle" checkedIcon="radio" :limits="3" :items="items1" direction="right" :isBetween="true" itemBoxStyle="border-bottom-width:1px;border-bottom-color:#F5F7F9;" @overed="toOveredHint"></myp-check-static>

<myp-check-static v-model="model2" icon="circle" checkedIcon="radio" flex="column" :limits="2" :items="items2" textLabel="title" valueLabel="value" disabledLabel="disabled" itemSpace="16rpx"></myp-check-static>

<myp-check v-model="models3" bgType="none">
	<myp-check-item v-for="(item,idx) in items3" :key="idx" :value="item.value" :disabled="item.disabled" :border="models3.includes(item.value)?'all-primary':'all'" :bgType="models3.includes(item.value)?'primary':'inverse'" boxStyle="flex-direction:row;justify-content:center;align-items:center;height:80rpx;margin-bottom:16rpx;border-radius:16rpx;">
		<text :class="[models3.includes(item.value)?'myp-color-inverse':'myp-color-text', 'myp-size-base']">{{item.title}}</text>
	</myp-check-item>
</myp-check>
```

**效果**

![myp-check](/images/doc/check.jpeg)
