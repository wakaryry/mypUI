
myp-drawer 组件，提供了从不同方向出现的抽屉的实现。是一个重量级的组件，也是后期打算重点打磨的组件之一。实际上 mypUI 里面的弹层交互类组件都是非常非常优秀的，在很早以前我们的组件就为很多人提供了思路。

当前主要特色：

- 不同方向的打开；
- 与 myp-popup/myp-popup-always一致的属性配置；
- 程序api打开抽屉；
- 手势拖拽打开抽屉；
- 全屏遮罩；
- 等。

其实他是在 myp-popup-always 的基础上增加了 手势拖拽功能。所以 myp-popup-always支持的它都支持。myp-popup-always其实与myp-popup一致。这三个组件，保持神级一致。用起来非常顺手与方便。

> 具体如何选择？

- myp-popup 内部内容是 v-if 控制的，不支持 standout。大部分的 popup都可以用；
- myp-popup-always 内部内容不受 v-if控制，支持 standout，用于standout以及明确需要与其它内容配合控制层级的地方；
- myp-drawer 是 myp-popup-always 的手势强化版，用于手势拖拽抽屉等；

其它文档地址：

- [myp-popup](/doc/guide/myp-popup.html)
- [myp-popup-always](/doc/guide/myp-popup-always.html)

如果您不知道自己该选择哪个，请直接使用 myp-popup。

**示范**

myp-drawer 用法上稍微有所不同，不再是使用 `show` 来控制，而是采用 `ref method` 来控制。

```html
<template>
	<myp-drawer ref="drawer-bottom" pos="bottom" standout="60px" width="750rpx" height="x-1000rpx" @overlayClicked="hide">
		<bottom></bottom>
		<myp-xbar bgType="primary" boxStyle="width:750rpx;"></myp-xbar>
	</myp-drawer>
</template>

<script>
	import bottom from './bottom.vue'
	
	export default {
		components: {
			bottom
		},
		methods: {
			hide(duration) {
				this.$refs['drawer-bottom'].hide(duration)
			},
			show(duration) {
				this.$refs['drawer-bottom'].show(duration)
			}
		}
	}
</script>
```

以上代码就构建了一个 从底部出现的，事先露出 60px standout高度的 drawer。它支持手势拉出。

**结果**

![myp-drawer](/images/doc/drawer-close.png)
![myp-drawer](/images/doc/drawer-open.png)

**TODO**

- 增加手势收起；
- 开放swipe动作支持；
- 开放打开/收起的progress，方便外部实现某些随动/联动动画；

