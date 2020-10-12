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
