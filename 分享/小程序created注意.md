```
<template>
	<myp-popup pos="left" :show="show" width="636" :height="heightRpx" :offset="114" @overlayClicked="toCancel">
		<view :style="mypContentHeightStyle">
			<myp-navbar bgType="none"></myp-navbar>
			<view style="height: 12rpx;"></view>
			<view class="ap">
				<view class="ap-head">
					<text class="ap-title">{{name}}</text>
				</view>
				<myp-scroll ref="myp-list" bgType="inverse" :extra="82" @inited="toInit" @down="toLoadItems" @up="toLoadItems" boxStyle="flex: 1; width: 636rpx;" width="636rpx">
					<view class="ap-item">
						<circle-cell-small v-for="(s,index) in items" :key="index" :item="s" @select="toSelect"></circle-cell-small>
					</view>
				</myp-scroll>
				<view class="ap-close">
					<myp-button text="关闭" border="none" radius="ll" textType="inverse" boxStyle="width:166rpx;height:62rpx;background-color: #262626;" @buttonClicked="toCancel"></myp-button>
				</view>
			</view>
		</view>
	</myp-popup>
</template>
```

我们知道在popup里面的内容受v-if控制，正常来说，每一次打开都会created，但是在微信小程序端，我们发现，v-if控制的内容，也会第一时间created，v-if变化不会引起created，也就是和正常元素一样，只会created一次，其它不会变化。

所以如果我们想利用created来刷新数据的话，那就需要注意，微信小程序端尽管有v-if变化，但是也只是created一次，而且created的时候时机并不是我们想象的那样v-if为true的第一次，而是和正常元素一样created，这个时候他的props不一定是我们需要的。

因为外部的环境并不适合v-if为true的情况。

所以，我们往往在微信小程序端需要watch show。

