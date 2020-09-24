<template>
	<view class="tc">
		<view class="tc-title">
			<myp-icon name="solid-calendar" size="ll" type="error" iconStyle="font-size:42rpx;"></myp-icon>
			<text class="tc-title-text">今日话题</text>
		</view>
		<view class="tc-bottom">
			<view class="tc-body">
				<text class="tc-label">主题系统</text>
				<text class="tc-desc">了解内部采用的主题系统以及规范样式</text>
			</view>
			<myp-icon name="solid-circle-arrow" type="error" iconStyle="font-size:100rpx;" @iconClicked="toDetail"></myp-icon>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			toDetail() {
				this.$emit("detail")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tc {
		width: 686rpx;
		height: 200rpx;
		background-color: #FFFFFF;
		border-width: 1px;
		border-color: #EDEDED;
		border-style: solid;
		box-shadow: 0 6rpx 6rpx 0 rgba(240,240,240,0.50);
		border-radius: 16rpx;
		padding-left: 20rpx;
		padding-top: 20rpx;
		padding-right: 20rpx;
		
		&-title {
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
			align-items: center;
			
			&-text {
				margin-left: 12rpx;
				font-size: 36rpx;
				font-weight: 700;
				line-height: 50rpx;
				color: #FF9090;
			}
		}
		&-bottom {
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-top: 12rpx;
		}
		&-body {
			
		}
		&-label {
			font-size: 30rpx;
			line-height: 42rpx;
			font-weight: 700;
			color: #333333;
		}
		&-desc {
			margin-top: 4rpx;
			font-size: 30rpx;
			line-height: 42rpx;
			color: #666666;
		}
	}
</style>
