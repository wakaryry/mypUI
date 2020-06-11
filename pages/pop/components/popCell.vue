<template>
	<view class="co">
		<view class="co-bg">
			<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOl0d.png" class="co-bg-cover" mode="aspectFill"></image>
		</view>
		<view class="co-body">
			<text class="co-body-title">弹层  X  物语</text>
			<text class="co-body-desc">非常精细灵活的弹层，方向/动画/offset...</text>
			<view class="co-body-actions">
				<text class="co-body-item">左</text>
				<text class="co-body-item">右</text>
				<text class="co-body-item">上</text>
				<text class="co-body-item">下</text>
				<text class="co-body-item">中</text>
			</view>
			<view class="co-body-actions">
				<text class="co-body-item">距</text>
				<text class="co-body-item">距</text>
				<text class="co-body-item">距</text>
				<text class="co-body-item">距</text>
				<text class="co-body-item">距</text>
			</view>
			<view class="co-body-actions">
				<text class="co-body-item">双</text>
				<text class="co-body-item">双</text>
				<text class="co-body-item">双</text>
				<text class="co-body-item">双</text>
				<text class="co-body-item">双</text>
			</view>
			<view class="co-body-actions">
				<text class="co-body-item">凸</text>
				<text class="co-body-item">凸</text>
				<text class="co-body-item">凸</text>
				<text class="co-body-item">凸</text>
				<text class="co-body-item">凸</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	.co {
		position: relative;
		width: 750rpx;
		height: 422rpx;
		overflow: hidden;
		
		&-bg {
			width: 750rpx;
			height: 422rpx;
			overflow: hidden;
			
			&-cover {
				width: 750rpx;
				height: 422rpx;
			}
		}
		
		&-body {
			position: absolute;
			width: 680rpx;
			flex-direction: column;
			align-items: center;
			left: 375rpx;
			top: 211rpx;
			transform: translate(-50%, -50%);
			
			&-title {
				font-size: 52rpx;
				color: #FFFFFF;
				line-height: 80rpx;
				font-weight: 600;
			}
			&-desc {
				font-size: 32rpx;
				color: #FFFFFF;
				line-height: 45rpx;
			}
			&-actions {
				flex-direction: row;
				justify-content: center;
				align-items: center;
				flex-wrap: nowrap;
			}
			&-item {
				margin-left: 12rpx;
				margin-right: 12rpx;
				font-size: 28rpx;
				line-height: 42rpx;
				color: #FFFFFF;
			}
		}
	}
</style>
