<template>
	<view class="hit">
		<image class="hit-img" src="https://mypui.asnowsoft.cn/imgs/c7.jpg" mode="aspectFill"></image>
		<view class="hit-body">
			<text class="hit-title">天真但不傻，才是真的可爱</text>
			<text class="hit-desc">我想在一个甜甜的午后，享受蜂蜜味的晚风</text>
		</view>
		<myp-icon name="arrow-right" type="error" boxStyle="border-radius:40rpx;border-width:1px;border-color:#EEEEEE;border-style:solid;width:50rpx;height:50rpx;"></myp-icon>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	.hit {
		width: 750rpx;
		padding-left: 32rpx;
		padding-right: 32rpx;
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		
		&-body {
			margin-left: 20rpx;
			flex: 1;
		}
		&-img {
			width: 120rpx;
			height: 120rpx;
			border-radius: 8rpx;
		}
		&-title {
			font-size: 32rpx;
			line-height: 45rpx;
			color: #333333;
			lines: 1;
			text-overflow: ellipsis;
			overflow: hidden;
			/* #ifndef APP-NVUE */
			white-space: nowrap;
			/* #endif */
			width: 500rpx;
		}
		&-desc {
			font-size: 26rpx;
			line-height: 38rpx;
			color: #666666;
			lines: 1;
			text-overflow: ellipsis;
			overflow: hidden;
			/* #ifndef APP-NVUE */
			white-space: nowrap;
			/* #endif */
			width: 500rpx;
		}
	}
</style>
