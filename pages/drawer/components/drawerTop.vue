<template>
	<myp-drawer ref="drawer-top" pos="top" width="750rpx" height="800rpx" standout="status-nav-50px" top="status-nav" @overlayClicked="hide">
		<view class="dt">
			<view class="dt-body">
				<image class="dt-avatar" src="/static/bear.jpg" mode="aspectFill"></image>
				<text class="dt-name">语文数学天才</text>
			</view>
			<view class="dt-bottom">
				<text class="dt-label">我的中心</text>
				<view class="dt-hint"></view>
				<view style="height: 16rpx;"></view>
			</view>
		</view>
	</myp-drawer>
</template>

<script>
	export default {
		methods: {
			hide(duration) {
				this.$refs['drawer-top'].hide(duration)
			},
			show(duration) {
				this.$refs['drawer-top'].show(duration)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	
	.dt {
		background-color: $myp-color-primary;
		border-bottom-left-radius: 24rpx;
		border-bottom-right-radius: 24rpx;
		width: 750rpx;
		height: 800rpx;
		flex-direction: column;
		justify-content: space-between;
		
		&-body {
			width: 750rpx;
			flex-direction: column;
			align-items: center;
		}
		&-avatar {
			width: 120rpx;
			height: 120rpx;
			border-radius: 60rpx;
			margin-top: 100rpx;
		}
		&-name {
			margin-top: 16rpx;
			font-size: 32rpx;
			line-height: 45rpx;
			color: #FFFFFF;
		}
		&-bottom {
			width: 750rpx;
			flex-direction: column;
			align-items: center;
		}
		&-label {
			margin-bottom: 10rpx;
			font-size: 32rpx;
			line-height: 45rpx;
			color: #FFFFFF;
		}
		&-hint {
			width: 64rpx;
			height: 4px;
			border-radius: 4px;
			background-color: $myp-border-color-light;
		}
	}
</style>
