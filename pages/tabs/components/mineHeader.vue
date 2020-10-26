<template>
	<view class="mh">
		<view class="mh-av">
			<image src="/static/robot.png" class="mh-av-token" mode="aspectFill"></image>
			<view class="mh-av-mask"></view>
			<myp-icon type="inverse" name="solid-camera" iconStyle="font-size:52rpx;" boxStyle="position:absolute;left:60rpx;top:60rpx;transform:translate(-50%, -50%);"></myp-icon>
		</view>
		<view class="mh-body">
			<view class="mh-top">
				<view class="mh-name">
					<text class="mh-name-text">点击设置昵称</text>
					<myp-icon name="right" type="second"></myp-icon>
				</view>
				<myp-icon name="solid-vip" type="second" iconStyle="font-size:46rpx;"></myp-icon>
			</view>
			<text class="mh-sign">如果能拿100分，绝不拿80分，绝不拿80分</text>
			<view class="mh-other">
				<text class="mh-other-text">M币：0.0</text>
				<text class="mh-other-text" style="margin-left: 24rpx;">硬币：0.0</text>
			</view>
		</view>
		<view class="mh-right">
			<text class="mh-right-text">空间</text>
			<myp-icon name="right" type="second"></myp-icon>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	
	
	.mh {
		height: 176rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		align-items: center;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		width: 750rpx;
		
		&-av {
			position: relative;
			background-color: $myp-text-color-third;
			width: 120rpx;
			height: 120rpx;
			border-radius: 120rpx;
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			justify-content: center;
			align-items: center;
			
			&-token {
				width: 92rpx;
				height: 92rpx;
			}
			&-mask {
				position: absolute;
				left: 0;
				top: 0;
				width: 120rpx;
				height: 120rpx;
				border-radius: 120rpx;
				background-color: $myp-bg-color-mask;
			}
		}
		&-body {
			flex: 1;
			margin-left: 24rpx;
		}
		&-top {
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
			align-items: center;
		}
		&-name {
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
			align-items: center;
			border-radius: 4rpx;
			background-color: $myp-bg-color-dark;
			padding-left: 12rpx;
			padding-right: 12rpx;
			margin-right: 8rpx;
			
			&-text {
				font-size: $myp-font-size-base;
				color: $myp-text-color;
				line-height: 42rpx;
			}
		}
		&-sign {
			margin-top: 6rpx;
			margin-bottom: 6rpx;
			font-size: $myp-font-size-ss;
			color: $myp-color-error;
			line-height: 38rpx;
			lines: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			/* #ifndef APP-NVUE */
			white-space: nowrap;
			max-width: 440rpx;
			/* #endif */
		}
		&-other {
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
			align-items: center;
			
			&-text {
				font-size: $myp-font-size-s;
				color: $myp-text-color-second;
				line-height: 42rpx;
			}
		}
		&-right {
			margin-left: 24rpx;
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
			align-items: center;
			
			&-text {
				font-size: $myp-font-size-s;
				color: $myp-text-color-second;
				line-height: 38rpx;
			}
		}
	}
</style>
