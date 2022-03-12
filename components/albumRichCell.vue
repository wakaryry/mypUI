<template>
	<view class="arc">
		<image class="arc-av" src="/static/imgs/a10.jpg" mode="aspectFill"></image>
		<view class="arc-body">
			<text class="arc-title">家乡的荷花开了，青蛙大了</text>
			<text class="arc-time">5月20日</text>
			<text class="arc-content">无论你走到哪里，都应该始终记得：过去都是假的。</text>
			<image class="arc-cover" src="/static/imgs/c7.jpg" mode="aspectFill"></image>
			<view class="arc-actions">
				<view class="arc-actions-left">
					<view class="arc-item">
						<myp-icon name="cycle" type="second"></myp-icon>
						<text class="arc-item-text">转发</text>
					</view>
					<view class="arc-item" style="margin-left: 86rpx;">
						<myp-icon name="comment-dots" type="second"></myp-icon>
						<text class="arc-item-text">16</text>
					</view>
					<view class="arc-item" style="margin-left: 86rpx;">
						<myp-icon name="thumb" type="second"></myp-icon>
						<text class="arc-item-text">93</text>
					</view>
				</view>
				<myp-icon name="v-dots" type="third"></myp-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	.arc {
		width: 750rpx;
		background-color: #FFFFFF;
		padding-left: 40rpx;
		padding-top: 46rpx;
		padding-right: 40rpx;
		padding-bottom: 40rpx;
		border-bottom-width: 1px;
		border-bottom-color: #EBEBEB;
		border-bottom-style: solid;
		flex-direction: row;
		flex-wrap: nowrap;
		
		&-av {
			width: 86rpx;
			height: 86rpx;
			border-radius: 86rpx;
		}
		&-body {
			flex: 1;
			margin-left: 24rpx;
		}
		&-title {
			width: 560rpx;
			font-size: 32rpx;
			line-height: 45rpx;
			color: #0273F1;
		}
		&-time {
			margin-top: 6rpx;
			font-size: 24rpx;
			line-height: 35rpx;
		}
		&-content {
			margin-top: 20rpx;
			width: 560rpx;
			font-size: 32rpx;
			line-height: 45rpx;
			color: #333333;
		}
		&-cover {
			margin-top: 8rpx;
			width: 540rpx;
			height: 360rpx;
		}
		&-actions {
			margin-top: 48rpx;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-between;
			
			&-left {
				flex-direction: row;
				flex-wrap: nowrap;
				align-items: center;
			}
		}
		&-item {
			flex-direction: row;
			align-items: center;
			
			&-text {
				margin-left: 8rpx;
				font-size: 26rpx;
				color: #999999;
				line-height: 36rpx;
			}
		}
	}
</style>
