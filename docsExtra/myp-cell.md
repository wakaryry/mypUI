
myp-cell 是通用的 单行cell 展示组件。为 icon-title-value-indicator 四段式设计。基本能满足所有的单行cell要求。

- hover效果以及配置；
- 支持border/radius等快捷配置；
- 支持细节配置；
- 开放 特殊的 slot；

<p class="tip">myp-cell默认提供了32rpx的左右padding。覆盖请设置boxStyle的padding-left/padding-right</p>

**示范**

```html
<myp-cell icon="book" title="我的知识" boxStyle="padding-left:32rpx;"></myp-cell>

<myp-cell icon="star-two" title="我的收藏" value="查看更多收藏" valueStyle="text-align:right;" indicator="right" boxStyle="padding-left:32rpx;padding-right:32rpx;"></myp-cell>

<myp-cell icon="setting" title="通用设置" border="all" radius="s" indicator="right" boxStyle="padding-left:32rpx;padding-right:32rpx;margin-left:32rpx;margin-right:32rpx;"></myp-cell>

<myp-cell bgType="error" icon="setting" title="通用设置" value="更多设置请查看源码以及文档" iconType="inverse" titleType="inverse" valueType="inverse" indicatorType="inverse" border="none" radius="s" indicator="right" boxStyle="padding-left:32rpx;padding-right:32rpx;margin-left:32rpx;margin-right:32rpx;"></myp-cell>

<myp-cell icon="bold-refresh" title="软件更新" indicator="right" space="24rpx" boxStyle="padding-left:38rpx;padding-right:48rpx;">
	<view slot="extra" class="cell-upload">
		<myp-icon name="solid-up" type="inverse" size="l"></myp-icon>
		<text class="cell-upload-text">有新版本</text>
	</view>
</myp-cell>

<myp-cell icon="solid-about" title="关于我们" indicator="right" space="24rpx" boxStyle="padding-left:38rpx;padding-right:48rpx;" @selected="toAbout"></myp-cell>
```

![myp-cell](/images/doc/cell.jpeg)

使用非常简单，和其它组件一样，即支持快速配置，也支持细节定义。

事件监听也具备非常语意化的名字设计，就和 `buttonClicked` 一样，无需记忆。

<p class="tip">不要什么内容都想着用myp-cell去包裹，也不要老想着去自定义里面的插槽内容。单行使用就是这个组件最佳的用法。</p>
