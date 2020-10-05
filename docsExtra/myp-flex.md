
myp-flex 是flex布局的组件化。

<p class="tip">注意：在MP端自定义组件中的个性化属性配置的一些差异。</p>

**示范**

```html
<myp-flex bgType="none">
	<!-- 以下条件编译只是示范各端的差异：在MP端自定义组件需要再次设置style为flex:1. -->
	<!-- 当然你可以不区分，全部都设置style为flex:1 -->
	<!-- #ifndef APP-NVUE || H5 -->
	<myp-item bgType="none" v-for="(item,idx) in apps" :key="idx" :icon="item.icon" :text="item.name" iconType="inverse" style="flex:1;" boxStyle="height:180rpx;flex:1;" iconBoxStyle="width:80rpx;height:80rpx;border-radius:80rpx;background-color:#FF9090;"></myp-item>
	<!-- #endif -->
	<!-- APP端boxStyle中设置即可 -->
	<!-- #ifdef APP-NVUE || H5 -->
	<myp-item bgType="none" v-for="(item,idx) in apps" :key="idx" :icon="item.icon" :text="item.name" iconType="inverse" boxStyle="height:180rpx;flex:1;" iconBoxStyle="width:80rpx;height:80rpx;border-radius:80rpx;background-color:#FF9090;"></myp-item>
	<!-- #endif -->
</myp-flex>

<myp-flex border="none" radius="base" justify="center" boxStyle="margin-left:32rpx;margin-right:32rpx;">
	<myp-item bgType="none" v-for="(item,idx) in apps3" :key="idx" :icon="item.icon" :text="item.name" iconType="inverse" boxStyle="height:180rpx;width:160rpx;" iconBoxStyle="width:80rpx;height:80rpx;border-radius:80rpx;background-color:#FF9090;"></myp-item>
</myp-flex>

<myp-flex direction="column" border="none" radius="base" boxStyle="width: 200rpx; height: 560rpx;">
	<view style="width: 100rpx;height: 160rpx;background-color: #fca177;"></view>
	<view style="width: 100rpx;height: 160rpx;background-color: #35a2d7;"></view>
	<view style="width: 100rpx;height: 160rpx;background-color: #f5a9d5;"></view>
</myp-flex>
```

**结果**

![myp-flex](/images/doc/flex.png)
