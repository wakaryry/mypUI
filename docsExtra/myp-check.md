
myp-check 组件提供的是现成的内部item，除了一些基础的样式配置之外，不能通过slot等方式重定义内容等。对于大多数选择组件而言，已经足够使用。

myp-check支持单选/多选。单选多选都是这个组件，单选的时候返回的值也是数组，value属性的类型也依然是数组。

如果您需要更加灵活，可自定义的check类组件，我们还提供了 [myp-check-static](/doc/guide/myp-check-static.html) 以及 [myp-check-slot](/doc/guide/myp-check-slot.html) 组件。

- `myp-check-static`组件是利用 `created` 来管理内容的写法，各个平台都支持；
- `myp-check-slot`组件是利用 `vm.$slots` 写法的单多选组件，部分平台支持。目前 `MP端` 对 `vm.$slots` 支持度不够；

**示范**

```html
<myp-check v-model="model" icon="circle" checkedIcon="radio" :items="items1" direction="right" :isBetween="true" itemBoxStyle="background-color:#F5F7F9;padding-left:32rpx;padding-right:32rpx;" boxStyle="border-radius:16rpx;overflow:hidden;"></myp-check>

<myp-check v-model="model1" icon="circle" checkedIcon="radio" :limits="3" :items="items1" direction="right" :isBetween="true" itemBoxStyle="border-bottom-width:1px;border-bottom-color:#F5F7F9;" @overed="toOveredHint"></myp-check>

<myp-check v-model="model2" icon="circle" checkedIcon="radio" flex="column" :limits="2" :items="items2" textLabel="title" valueLabel="value" disabledLabel="disabled" itemSpace="16rpx"></myp-check>
```

**效果**

![myp-check](/images/doc/check.jpeg)

