<template>
	<view class="sh">
		<myp-height height="status-nav-20rpx"></myp-height>
		<image src="/static/logo.png" mode="aspectFill" class="sh-logo"></image>
		<text class="sh-title">mypUI-快速开发nvue页面</text>
		<view class="sh-stars">
			<myp-icon v-for="i in [1,2,3,4,5]" :key="i" name="diamond" type="error" size="l" boxStyle="margin-left:4rpx;margin-right:4rpx;"></myp-icon>
		</view>
		<view class="sh-desc">
			<text class="sh-desc-text">做最顺手的开发套件</text>
			<text class="sh-desc-text sh-desc-space">166万开发者使用</text>
		</view>
		<view class="sh-tags">
			<view class="sh-tags-item">
				<myp-icon name="headphone" type="inverse" size="s"></myp-icon>
				<text class="sh-tags-item-text">自由畅想</text>
			</view>
			<view class="sh-tags-item">
				<myp-icon name="triangle" type="inverse" size="s"></myp-icon>
				<text class="sh-tags-item-text">统一规范</text>
			</view>
			<view class="sh-tags-item">
				<myp-icon name="class" type="inverse" size="s"></myp-icon>
				<text class="sh-tags-item-text">得心应手</text>
			</view>
		</view>
		<view style="height: 40rpx;"></view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	
	.sh {
		width: 750rpx;
		/* #ifndef APP-NVUE */
		background-image: linear-gradient(95deg, $myp-color-primary, $myp-color-success);
		/* #endif */
		/* #ifdef APP-NVUE */
		background-image: linear-gradient(to right, $myp-color-primary, $myp-color-success);
		/* #endif */
		flex-direction: column;
		align-items: center;
		
		&-logo {
			width: 140rpx;
			height: 140rpx;
			border-radius: 20rpx;
		}
		&-title {
			font-size: 32rpx;
			color: #FFFFFF;
			line-height: 45rpx;
			margin-top: 20rpx;
			font-weight: 600;
		}
		&-stars {
			height: 45rpx;
			margin-top: 20rpx;
			flex-direction: row;
			align-items: center;
		}
		&-desc {
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-top: 16rpx;
			
			&-text {
				font-size: 28rpx;
				line-height: 40rpx;
				color: #FFFFFF;
			}
			&-space {
				margin-left: 20rpx;
			}
		}
		&-tags {
			flex-direction: row;
			justify-content: center;
			margin-top: 16rpx;
			
			&-item {
				flex-direction: row;
				align-items: center;
				margin-left: 12rpx;
				margin-right: 12rpx;
				
				&-text {
					font-size: 28rpx;
					line-height: 40rpx;
					color: #FFFFFF;
					margin-left: 8rpx;
				}
			}
		}
	}
</style>
