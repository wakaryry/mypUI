
myp-button 非常可爱有趣，提供了 文字/按钮/图标 等样式的交互hover能力，还有 disabled/highlight/loading 等状态。

主要特色如下：

- 支持快捷配置与细节配置（正如其它组件一样，mypUI在高效与细节之间做得非常优秀）；
- 支持loading效果；
- 支持disabled/highlight状态；
- 支持 图标-文字-图标 三段式组合设置；
- 支持 border/radius，等；

**示范：**

```html
<myp-button icon="plus" text="左侧带图标" @buttonClicked="toPlus"></myp-button>
<myp-button icon2="arrow-right" text="右侧带图标"></myp-button>
<myp-button icon="plus" icon2="arrow-right" text="左右侧带图标"></myp-button>
```

<p class="tip">我们建议您优先使用主题配置，不要老想着个性化style设置。只有在主题设置不能满足要求的时，才使用style的配置。</p>

myp-button 的配置属性比较多，其实也很简单。毕竟命名规则都是一致的。我们只需要知道 myp-button 是 `icon-text-icon2` 形式的设计即可。

**效果**

![myp-button](/images/doc/button1.png)

> myp-button 默认是 relative定位的，所以您可以很便捷的搭配 badge 等组件来快速实现其它的效果

```html
<myp-button bgType="primary" border="none" radius="ll" icon="upload" text="发布" iconType="inverse" textType="inverse" boxStyle="width:160rpx;height:60rpx;">
	<myp-badge slot="extra" boxStyle="position:absolute;right:6rpx;top:4rpx;"></myp-badge>
</myp-button>
```

其实就是合理的利用插槽来实现内容。

**说明**

- myp-button 不具备 button 的 open-type 等开放能力，需要 开放能力，请使用 原生的button 组件；
- 原生button的border是受after影响的，去除需要设置after；

```html
<button class="btn" open-type="share">分享</button>
<style>
	.btn {
		margin: 0;
		padding: 0;
	}
	.btn::after {
		border: none;
	}
</style>
```
