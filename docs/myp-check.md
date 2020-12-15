---
title: 单多选：myp-check
type: guide
order: 155
page: https://mypui.asnowsoft.cn/h5/#/pages/base/check
---

## Props

| Prop name | Description                    | Type    | Values | Default |
| --------- | ------------------------------ | ------- | ------ | ------- |
| value     | 初始值/绑定值                  | array   | -      | []      |
| limits    | 限制最多可选数量. 0 表示不限制 | number  | -      | 0       |
| disabled  | 是否全局禁用                   | boolean | -      | false   |
| bgType    | 背景主题                       | string  | -      | ''      |
| border    | 边框主题                       | string  | -      | ''      |
| radius    | 圆角主题                       | string  | -      | ''      |
| boxStyle  | 外层样式                       | string  | -      | ''      |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| overed     |           |
| input      | undefined |
| change     | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

myp-check 组件需要自己管理选项内容以及状态，提供了一个单多选的盒子，用户可以自定义各种选项样式，不再受 myp-check-static 的限制。

myp-check支持单选/多选。单选多选都是这个组件，单选的时候返回的值也是数组，value属性的类型也依然是数组。

<p class="tip">myp-check组件下的选项必须由 myp-check-item 包裹，否则无法按照预期使用</p>

如果您只需要一些简单的默认样式，我们还提供了 [myp-check-static](/doc/guide/myp-check-static.html)组件。

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

