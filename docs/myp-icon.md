---
title: 图标：myp-icon
type: guide
order: 204
page: https://mypui.asnowsoft.cn/h5/#/pages/base/icon
---

## Props

| Prop name | Description                    | Type   | Values | Default |
| --------- | ------------------------------ | ------ | ------ | ------- |
| fontClass | 自定义的字体样式类             | string | -      | ''      |
| name      | 字体图标的名字，允许是图片路径 | string | -      | 'right' |
| type      | 图标的颜色主题                 | string | -      | ''      |
| size      | 图标的尺寸主题                 | string | -      | 'l'     |
| hover     | hover 主题                     | string | -      | 'none'  |
| iconStyle | 图标或者图片样式               | string | -      | ""      |
| boxStyle  | 外层样式                       | string | -      | ''      |

## Events

| Event name  | Type | Description |
| ----------- | ---- | ----------- |
| iconClicked |      |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

myp-icon 提供了快速使用 icon图标 的能力，支持 字体图标、本地图片，以及网络图片。

```html
<myp-icon name="setting" type="text" size="l" @iconClicked="toSet"></myp-icon>
```

myp-icon 其实就是 view 包裹了一个 image 或者 text。我们可以分别对其进行设置。

`name` `type` `size` `iconStyle` `mode` `hover` `boxStyle`

**如何自定义图标**

我们的图标来自于 iconfont。您可以在上面挑选，也可以上传自己的设计。

需要注意的是：字体的命名，在nvue-app下，很有可能字体图标因为命名存在冲突，从而安装失败。所以，您可以给您的图标字体起一个个性化的名字。

比如 mypUI 中的名字为：`mypiconfont`。

我们组件内部对 myp-icon 有依赖（当然，我们可以通过开放slot的形式消除这种依赖，不过个人觉得没有必要），我们提供了以下方式来更好的管理图标：

> 您直接自定义一个自己的icon组件，在里面维护自己的图标库，然后配合 easycom 的匹配规则，覆盖掉 myp-cion 的查找。

您可以看到，我们在 demo 中提供了一个 `custom` 的文件夹，里面有一个我们自定义的 `myp-icon` 组件，然后在 `pages.json` 中，我们配置如下：

```json
{
	"easycom": {
		"autoscan": true,
		"custom": {
			"myp-icon": "@/custom/myp-icon/myp-icon.vue", // 允许覆盖某个组件，比如 myp-icon
			"myp-(.*)": "@/mypUI/myp-$1/myp-$1.vue" // 匹配mypUI内的vue文件
		}
	}
}
```

这样的好处就是，我们内部依然可以依赖该组件，而您又可以直接自己管理该组件，不受 mypUI 更新的影响。

**如何提取图标的code**

关于字体图标的使用，是可以直接使用 unicode 代码的，但是unicode代码不太友好，我们基本上识别不出它是谁，所以，我们添加了一个js对象，他给每一个 图标的unicode代码一个语意化的命名。这样我们用起来就简单多了。

但是有时候，我们的图标几十几百个，没有一个批量的处理程序，手动处理简直就是灾难，为此，我们提供了一个 python 提取程序。您只数据按照要求定义数据源，然后运行程序即可。

具体使用文档见：[icons提取器](/doc/tool/icon.html)
