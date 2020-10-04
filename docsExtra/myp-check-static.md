
myp-check-static 组件提供的是现成的内部item，除了一些基础的样式配置之外，不能通过slot等方式重定义内容等。对于大多数选择组件而言，已经足够使用。

myp-check-static 支持单选/多选。单选多选都是这个组件，单选的时候返回的值也是数组，value属性的类型也依然是数组。

如果您需要更加灵活，可自定义的check类组件，我们还提供了 [myp-check](/doc/guide/myp-check.html) 组件。

**示范**

```html
<myp-check v-model="model" icon="circle" checkedIcon="radio" :items="items1" direction="right" :isBetween="true" itemBoxStyle="background-color:#F5F7F9;padding-left:32rpx;padding-right:32rpx;" boxStyle="border-radius:16rpx;overflow:hidden;"></myp-check>

<myp-check v-model="model1" icon="circle" checkedIcon="radio" :limits="3" :items="items1" direction="right" :isBetween="true" itemBoxStyle="border-bottom-width:1px;border-bottom-color:#F5F7F9;" @overed="toOveredHint"></myp-check>

<myp-check v-model="model2" icon="circle" checkedIcon="radio" flex="column" :limits="2" :items="items2" textLabel="title" valueLabel="value" disabledLabel="disabled" itemSpace="16rpx"></myp-check>

<myp-check v-model="models3" bgType="none">
	<myp-check-item v-for="(item,idx) in items3" :key="idx" :value="item.value" :disabled="item.disabled" :border="models3.includes(item.value)?'all-primary':'all'" :bgType="models3.includes(item.value)?'primary':'inverse'" boxStyle="flex-direction:row;justify-content:center;align-items:center;height:80rpx;margin-bottom:16rpx;border-radius:16rpx;">
		<text :class="[models3.includes(item.value)?'myp-color-inverse':'myp-color-text', 'myp-size-base']">{{item.title}}</text>
	</myp-check-item>
</myp-check>
```

**效果**

![myp-check](/images/doc/check.jpeg)
