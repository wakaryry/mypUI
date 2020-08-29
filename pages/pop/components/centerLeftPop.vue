<template>
	<myp-popup :show="show" pos="left-center" width="600rpx" height="660rpx" @overlayClicked="toStop">
		<view class="cp">
			<view class="cp-token"></view>
			<view class="cp-body">
				<text class="cp-title">欢迎使用mypUI</text>
				<view class="cp-contact">
					<view class="cp-item">
						<myp-icon name="wechat"></myp-icon>
						<text class="cp-item-text">pptpdf</text>
						<myp-icon name="copy"></myp-icon>
					</view>
					<view class="cp-item">
						<myp-icon name="qq"></myp-icon>
						<text class="cp-item-text">382006503</text>
						<myp-icon name="copy"></myp-icon>
					</view>
				</view>
				<text class="cp-sign">其实坚持而且认真地去做一件事，是会获得掌声和金钱回报的</text>
			</view>
			<image class="cp-logo" src="/static/logo.png" mode="aspectFill"></image>
			<view class="cp-action">
				<myp-button bgType="error" textType="inverse" border="none" radius="ll" text="下次再来" height="base" boxStyle="width:320rpx;" @buttonClicked="toCancel"></myp-button>
			</view>
		</view>
	</myp-popup>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			toCancel() {
				this.$emit("cancel")
			},
			toStop() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	
	.cp {
		position: relative;
		width: 600rpx;
		height: 660rpx;
		
		&-token {
			height: 60rpx;
		}
		&-body {
			width: 600rpx;
			height: 600rpx;
			border-radius: 24rpx;
			background-color: #FFFFFF;
			padding-left: 36rpx;
			padding-right: 36rpx;
			flex-direction: column;
			align-items: center;
			padding-top: 120rpx;
		}
		&-title {
			font-size: 36rpx;
			line-height: 50rpx;
			color: $myp-text-color;
			font-weight: 600;
		}
		&-contact {
			margin-top: 16rpx;
			flex-direction: row;
			align-items: center;
		}
		&-item {
			margin-left: 16rpx;
			margin-right: 16rpx;
			flex-direction: row;
			align-items: center;
			
			&-text {
				font-size: 30rpx;
				color: $myp-text-color-second;
				line-height: 42rpx;
				margin-left: 12rpx;
				margin-right: 12rpx;
			}
		}
		&-sign {
			margin-top: 20rpx;
			font-size: 28rpx;
			color: $myp-text-color-third;
			line-height: 42rpx;
		}
		&-logo {
			width: 120rpx;
			height: 120rpx;
			border-radius: 60rpx;
			border-width: 1px;
			border-color: $myp-color-warning;
			position: absolute;
			top: 0;
			left: 300rpx;
			transform: translateX(-50%);
		}
		&-action {
			position: absolute;
			left: 0;
			width: 600rpx;
			flex-direction: row;
			justify-content: center;
			bottom: 32rpx;
		}
	}
</style>
