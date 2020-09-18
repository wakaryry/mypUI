---
title: 图标：myp-icon
type: guide
order: 204
---

## Props

| Prop name | Description | Type   | Values | Default     |
| --------- | ----------- | ------ | ------ | ----------- |
| name      |             | string | -      | 'right'     |
| type      |             | string | -      | ''          |
| size      |             | string | -      | 'l'         |
| mode      |             | string | -      | 'aspectFit' |
| hover     |             | string | -      | 'none'      |
| iconStyle |             | string | -      | ""          |
| boxStyle  |             | string | -      | ''          |

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

## 使用

```html
<myp-icon name="setting" type="text" size="l" @iconClicked="toSet"></myp-icon>
```

myp-icon 其实就是 view 包裹了一个 image 或者 text。我们可以分别对其进行设置。

`name` `type` `size` `iconStyle` `mode` `hover` `boxStyle`

## @iconClicked

点击图标的事件监听。

## props

`name` `type` `size` `iconStyle` `mode` `hover` `boxStyle`

### name

icon的名字，也就是 mypUI 下，icons.js 中自己定义的 key，这个key将对应上 icon 的 code。比如：`copy: '\ue643'`，name就是 copy。

### type

icon的颜色主题。给字体icon设置一个颜色。只有字体icon才会有作用。图片不起作用。

### size

icon的字体大小配置，默认是 `ll`。对图片设置无效。

### iconStyle

对icon的个性化style设置，图片同样设置这个属性。

### mode 

图片的 mode，默认是 aspectFill。

### hover

hover效果。可以配置 `bg` `opacity` `bg-opacity`。

### boxStyle

最外层包裹层的设置。

## 如何自定义图标

我们的图标来自于 iconfont。您可以在上面挑选，也可以上传自己的设计。

需要注意的是：字体的命名，在nvue-app下，很有可能字体图标因为命名存在冲突，从而安装失败。所以，您可以给您的图标字体起一个个性化的名字。

比如 mypUI 中的名字为：`mypiconfont`。

## 如何提取图标的code

关于字体图标的使用，是可以直接使用 unicode 代码的，但是unicode代码不太友好，我们基本上识别不出它是谁，所以，我们添加了一个js对象，他给每一个 图标的unicode代码一个语意化的命名。这样我们用起来就简单多了。

但是有时候，我们的图标几十几百个，没有一个批量的处理程序，手动处理简直就是灾难，为此，我们提供了一个 python 提取程序。您只数据按照要求定义数据源，然后运行程序即可。

具体使用文档见：[icons提取器](/doc/tool/icon.html)
