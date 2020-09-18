<template>
	<view class="vitc">
		<view class="vitc-top">
			<image src="https://mypui.asnowsoft.cn/imgs/c1.jpg" class="vitc-img" mode="aspectFill"></image>
			<view class="vitc-tag">
				<myp-icon name="comment-dots" type="inverse" size="s"></myp-icon>
				<text class="vitc-tag-text">21.4亿</text>
			</view>
		</view>
		<text class="vitc-text">[最佳裁判]今天我们一起吃火锅</text>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	.vitc {
		width: 200rpx;
		
		&-top {
			width: 200rpx;
			height: 200rpx;
			border-radius: 12rpx;
			position: relative;
		}
		&-img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 12rpx;
		}
		&-tag {
			flex-direction: row;
			align-items: center;
			position: absolute;
			right: 12rpx;
			top: 8rpx;
			
			&-text {
				margin-left: 6rpx;
				color: #FFFFFF;
				font-size: 24rpx;
				line-height: 30rpx;
			}
		}
		&-text {
			margin-top: 8rpx;
			width: 200rpx;
			font-size: 28rpx;
			line-height: 40rpx;
			color: #333333;
			lines: 2;
			overflow: hidden;
			text-overflow: ellipsis;
			/* #ifndef APP-NVUE */
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			/* #endif */
		}
	}
</style>
