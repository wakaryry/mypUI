---
title: 单多选：myp-check-static
type: guide
order: 156
---

## Props

| Prop name         | Description                                               | Type    | Values | Default    |
| ----------------- | --------------------------------------------------------- | ------- | ------ | ---------- |
| icon              | 未选中时图标                                              | string  | -      | 'circle'   |
| checkedIcon       | 选中时图标                                                | string  | -      | 'radio'    |
| direction         | 图标左右位置                                              | string  | -      | 'left'     |
| flex              | 选项布局方式                                              | string  | -      | 'row'      |
| isBetween         | flex 为 row 时，图标与文字是否 space-between              | boolean | -      | false      |
| items             | items 内容                                                | array   | -      | []         |
| value             | 选中的值                                                  | array   | -      | []         |
| limits            | 限制最多可选数量。0 表示不限制                            | number  | -      | 0          |
| disabled          | 全部禁用                                                  | boolean | -      | false      |
| textLabel         | text 内容的字段                                           | string  | -      | null       |
| textFormat        | 格式化输出，允许输出多个字段内容，比如 '{name} (ID:{id})' | string  | -      | ''         |
| valueLabel        | 唯一值的字段                                              | string  | -      | null       |
| disabledLabel     | 禁用的字段                                                | string  | -      | null       |
| boxStyle          | 外层样式                                                  | string  | -      | ''         |
| itemBoxStyle      | 选项外层样式                                              | string  | -      | ''         |
| itemSpace         | flex 为 column 时各选项的间距                             | string  | -      | '16rpx'    |
| textType          | 文字颜色主题                                              | string  | -      | 'text'     |
| checkedTextType   | 选中时文字颜色主题                                        | string  | -      | 'text'     |
| disabledTextType  | 禁用时文字颜色主题                                        | string  | -      | 'disabled' |
| iconType          | 图标颜色主题                                              | string  | -      | 'text'     |
| checkedIconType   | 选中时图标颜色主题                                        | string  | -      | 'text'     |
| disabledIconType  | 禁用时图标颜色主题                                        | string  | -      | 'disabled' |
| textSize          | 文字尺寸主题                                              | string  | -      | 'base'     |
| height            | 选项高度主题                                              | string  | -      | 'base'     |
| space             | 文字与图标的间距                                          | string  | -      | '12rpx'    |
| textStyle         | 文字样式                                                  | string  | -      | ''         |
| disabledTextStyle | 禁用时文字样式                                            | string  | -      | ''         |
| checkedTextStyle  | 选中时文字样式                                            | string  | -      | ''         |
| iconSize          | 图标尺寸主题                                              | string  | -      | 'l'        |
| iconStyle         | 图标样式                                                  | string  | -      | ''         |
| iconBoxStyle      | 图标外层样式                                              | string  | -      | ''         |
| disabledIconStyle | 禁用时图标样式                                            | string  | -      | ''         |
| checkedIconStyle  | 选中时图标样式                                            | string  | -      | ''         |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| overed     |           |
| input      | undefined |
| change     | undefined |

---

myp-check-static 组件提供的是现成的内部item，除了一些基础的样式配置之外，不能通过slot等方式重定义内容等。对于大多数选择组件而言，已经足够使用。

myp-check-static 支持单选/多选。单选多选都是这个组件，单选的时候返回的值也是数组，value属性的类型也依然是数组。

如果您需要更加灵活，可自定义的check类组件，我们还提供了 [myp-check](/doc/guide/myp-check.html) 组件。

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
