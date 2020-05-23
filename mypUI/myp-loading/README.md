# myp-loading

> 全局loading组件。可以设置遮罩层

### 规则

- 全局`fixed`的`loading`；
- 可以设置背景遮罩层，可以更改`图片`与设置`文字`；
- 不会自动关闭，需要手动控制显示/隐藏，常用于加载或者请求时的全局loading状态提示；

## 使用

### 可配置参数

| Prop      | Type   | Required  | Default   | Description  |
|-------------|------------|--------|--------|-----|
| show | Boolean |  | false | 控制显示/隐藏loading |
| src | String | 否 | | loading显示的图标. 默认 https://img.alicdn.com/tfs/TB1Ep_9NVXXXXb8XVXXXXXXXXXX-74-74.gif |
| text | String | 否 |  | 文字描述 |
| delay | String/Number | 否 | 0 | 延迟多久才显示 |
| needMask | Boolean | 否 | false | 是否添加全页面遮罩层 |
| maskStyle | String | 否 | | 覆盖默认的遮罩层样式 |
| contentStyle | String | 否 | | 覆盖默认的`内容容器`的样式，包裹着`image`和`text` |
| imageStyle | String | 否 | | 覆盖默认`image`组件的样式 |
| textStyle | String | 否 | | 覆盖默认的文字样式 |

- 默认`内容容器`是`200rpx * 200rpx`，背景色是`rgba(0,0,0,0.8)`，通过`contentStyle`修改背景色;
- 默认`loading图片`是`75rpx * 75rpx`，通过imageStyle修改大小；
- 默认文字只显示一行，最大宽度`140rpx`，大小`24rpx`；

- [默认gif图片](https://img.alicdn.com/tfs/TB1Ep_9NVXXXXb8XVXXXXXXXXXX-74-74.gif)

![](https://img.alicdn.com/tfs/TB1Ep_9NVXXXXb8XVXXXXXXXXXX-74-74.gif)

### slot
> 无

### 事件回掉
| Event     | Params   | Description  |
|--------|--------|-----|
| maskClicked | | needMask为true的时候可以触发 |

### 示例与结果

