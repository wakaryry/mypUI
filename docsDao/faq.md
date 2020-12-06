---
title: 常见问题
type: guide
order: 3002
---

> 为什么组件都是vue后缀？

组件的后缀无关紧要，vue和nvue都一样。具体组件是nvue还是vue，跟页面有关。用在nvue页面上就是nvue组件，用在vue页面上，就是vue组件。

> 支持编译到小程序/H5吗？

mypUI支持编译到各个平台，不仅支持nvue页面，也支持vue页面。

> 支持Vue页面吗？

mypUI支持编译到各个平台，不仅支持nvue页面，也支持vue页面。

> nvue如何实现全局挂载？

nvue页面在app端，不存在Vue的prototype挂载。

> nvue有哪些可用的全局变量管理方式？

nvue页面，在app端，动态的全局js变量实际上是无法正常保持住变量值的。所以请使用globalData、vuex、storage等。vuex不能在非页面mixin级别的js中使用，使用也拿不到正确的值。

> 头条小程序下组件同名ref的问题

头条小程序下，同一个页面下的子组件，如果子组件内部ref存在同名，获取组件的ref，会是最后created的那一个。其它平台暂时没有这个问题，头条小程序以前也没有这个问题。如果您在头条小程序下出现数据拉取不正确等问题，可以检查下是不是这个问题。

> list下为什么无法触发第二次加载更多

不要把所有的内容放在一个cell里面，否则会出现无法触发上提加载的问题。尽量使用cell循环。

> list下为什么滚动条位置有问题

- 不要把所有的内容放在一个cell下；
- 不要试图给cell上面加一堆的style；

> textarea内容闪

如果你的textarea存在内容时而出现，时而不见，或者内容闪烁的情况。先检查上一个页面是否存在弹窗类组件没有关闭。如果没有问题，可以独立这个页面测试是否有问题。独立没有问题，大概率是上一个页面某种写法导致闪烁。没有啥好办法。

> 页面内容闪烁

- 检查是否存在box-shadow；

**Android平台阴影(box-shadow)问题**

Android平台weex对阴影样式(box-shadow)支持不完善，如设置圆角边框时阴影样式显示不正常、设置动画时在Android7上显示不正常、在Android10上出现闪烁现象等。

为解决这些问题，从HBuilderX 2.4.7起，新增elevation属性（组件的属性，不是css样式）设置组件的层级，Number类型，层级值越大阴影越明显，阴影效果也与组件位置有关，越靠近页面底部阴影效果越明显

```html
<view elevation="5px"></view>
```

**注意**

设置elevation属性产生的阴影暂时无法修改颜色

为了避免elevation属性的阴影效果与阴影样式(box-shadow)冲突，设置elevation属性后box-shadow样式失效

使用elevation需要阴影元素的父元素大于阴影范围，否则会对阴影进行裁剪

IOS不支持elevation属性，请使用box-shadow设置阴影

- swiper-list可能会造成下一个页面闪烁或者有历史内容残留

swiper-list是双列表潜逃，支持公用header，以及swiper切换的效果。swiper-list有可能会导致下一个页面出现残影或者内容闪烁。（还在排查与取证阶段）

> 兄弟absolute定位的问题

两个兄弟absolute定位，都使用v-if来动态的控制，动态改变v-if，我们会发现，在nvue-app上，会导致样式有问题。他们的布局变成了互相影响的布局，而不是absolute。如果你发现了这种情况，可以一个使用v-if，另一个使用opacity来控制。当然，opacity控制的内容，实际上还是存在占位的，如果需要有点击等响应的话，需要注意层级。

> 可以使用原生tabbar吗？

是否使用原生tabbar是您自己决定的，myp-list支持原生tabbar或者自定义tabbar的。myp-list在app端都是自适应的，不管是原生还是自定义，都能自适应高度。

> 为什么myp-list在页面中无法出现下拉刷新和上提加载？

这是个好问题。你可能会发现自己的list开启了刷新和上提，但是就是看不到效果，为什么？

有可能你的list外层还有一个list/scroll。导致滚动无法触发到内部list的事件。对于页面来说，如果我们自己使用list，最好是禁用掉页面的滚动效果，也就是开启 disableScroll。
