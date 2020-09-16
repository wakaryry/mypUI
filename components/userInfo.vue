<template>
	<view class="ui">
		<image class="ui-bg" src="https://cdn.img.wenhairu.com/images/2020/05/23/YOOyB.md.jpg" mode="aspectFill"></image>
		<view class="ui-body">
			<image class="ui-av" src="https://cdn.img.wenhairu.com/images/2020/05/23/YTR3U.md.jpg" mode="aspectFill"></image>
			<text class="ui-name">家乡的稻子熟了</text>
			<text class="ui-sign">找一个安静的地方，过一份清闲生活</text>
			<view class="ui-num">
				<text class="ui-care">关注：16</text>
				<text class="ui-fans">粉丝：80万</text>
			</view>
			<myp-button bgType="error" icon="plus" text="关注" iconType="inverse" textType="inverse" border="none" radius="ll" boxStyle="width:240rpx;height:80rpx;"></myp-button>
		</view>
		<view class="ui-token"></view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	.ui {
		width: 750rpx;
		height: 560rpx;
		position: relative;
		
		&-bg {
			width: 750rpx;
			height: 560rpx;
		}
		&-body {
			position: absolute;
			left: 0;
			top: 64rpx;
			width: 750rpx;
			flex-direction: column;
			align-items: center;
		}
		&-av {
			width: 120rpx;
			height: 120rpx;
			border-radius: 120rpx;
		}
		&-name {
			margin-top: 16rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 50rpx;
			font-weight: 700;
		}
		&-sign {
			margin-top: 12rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			line-height: 38rpx;
		}
		&-num {
			margin-top: 16rpx;
			margin-bottom: 24rpx;
			flex-direction: row;
			align-items: center;
		}
		&-care {
			font-size: 28rpx;
			color: #FFFFFF;
			line-height: 38rpx;
		}
		&-fans {
			font-size: 28rpx;
			color: #FFFFFF;
			line-height: 38rpx;
			margin-left: 32rpx;
		}
		&-token {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 750rpx;
			height: 60rpx;
			border-top-left-radius: 60rpx;
			border-top-right-radius: 60rpx;
			background-color: #FFFFFF;
		}
	}
</style>
