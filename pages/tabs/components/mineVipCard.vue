<template>
	<view class="mvc">
		<view style="height: 80rpx;"></view>
		<view class="mvc-bg"></view>
		<view class="mvc-bg-cover"></view>
		<view class="mvc-vip">
			<view>
				<text class="myp-color-error myp-size-base" style="font-weight: 700; line-height: 42rpx;">我的大会员</text>
				<text class="myp-color-error myp-size-ss" style="line-height: 34rpx; margin-top: 10rpx;">了解更多权益</text>
			</view>
			<myp-icon name="right" type="error"></myp-icon>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	.mvc {
		position: relative;
		width: 750rpx;
		
		&-bg {
			background-image: linear-gradient(to top, rgba($myp-color-error, 0.2), #FFFFFF);
			height: 40rpx;
			
			&-cover {
				position: absolute;
				left: 24rpx;
				right: 24rpx;
				bottom: 0;
				height: 120rpx;
				background-color: #FFFFFF;
			}
		}
		&-vip {
			position: absolute;
			left: 24rpx;
			right: 24rpx;
			bottom: 0;
			height: 120rpx;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding-left: 32rpx;
			padding-right: 36rpx;
			border-left-width: 1px;
			border-right-width: 1px;
			border-top-width: 1px;
			border-top-left-radius: 8rpx;
			border-top-right-radius: 8rpx;
			border-left-color: rgba($myp-color-error, 0.4);
			border-top-color: rgba($myp-color-error, 0.4);
			border-right-color: rgba($myp-color-error, 0.4);
			border-left-style: solid;
			border-top-style: solid;
			border-right-style: solid;
			background-color: rgba($myp-color-error, 0.2);
		}
	}
</style>
