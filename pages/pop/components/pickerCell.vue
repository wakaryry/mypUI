<template>
	<view class="cf">
		<view class="cf-bg">
			<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOrYg.jpg" class="cf-bg-cover" mode="aspectFill"></image>
		</view>
		<view class="cf-title-bg">
			<image class="cf-title-bg-cover" src="https://cdn.img.wenhairu.com/images/2020/05/23/YO2sj.png" mode="aspectFit"></image>
		</view>
		<view class="cf-title">
			<text class="cf-title-text">Picker</text>
			<image class="cf-title-hint" src="https://cdn.img.wenhairu.com/images/2020/05/23/YOvLH.png" mode="aspectFit"></image>
		</view>
		<view class="cf-body">
			<view class="cf-item">
				<view class="cf-item-bg1">
					<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOL8o.png" class="cf-item-bg" mode="aspectFit"></image>
				</view>
				<view class="cf-item-bg2">
					<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOL8o.png" class="cf-item-bg" mode="aspectFit"></image>
				</view>
				<view class="cf-item-body">
					<view class="cf-item-head"></view>
					<text class="cf-item-title">年月日</text>
					<text class="cf-item-desc">山有木兮木有枝</text>
				</view>
				<view class="cf-item-tl">
					<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YTC4D.png" class="cf-item-tl-cover" mode="aspectFit"></image>
				</view>
			</view>
			<view class="cf-item">
				<view class="cf-item-bg1">
					<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOL8o.png" class="cf-item-bg" mode="aspectFit"></image>
				</view>
				<view class="cf-item-bg2">
					<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOL8o.png" class="cf-item-bg" mode="aspectFit"></image>
				</view>
				<view class="cf-item-body">
					<view class="cf-item-head"></view>
					<text class="cf-item-title">时间</text>
					<text class="cf-item-desc">人映桃花水样红</text>
				</view>
				<view class="cf-item-tl">
					<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YTC4D.png" class="cf-item-tl-cover" mode="aspectFit"></image>
				</view>
			</view>
			<view class="cf-item">
				<view class="cf-item-bg1">
					<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOL8o.png" class="cf-item-bg" mode="aspectFit"></image>
				</view>
				<view class="cf-item-bg2">
					<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOL8o.png" class="cf-item-bg" mode="aspectFit"></image>
				</view>
				<view class="cf-item-body">
					<view class="cf-item-head"></view>
					<text class="cf-item-title">周期</text>
					<text class="cf-item-desc">一汀烟雨杏花寒</text>
				</view>
				<view class="cf-item-tl">
					<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YTC4D.png" class="cf-item-tl-cover" mode="aspectFit"></image>
				</view>
			</view>
			<view class="cf-item">
				<view class="cf-item-bg1">
					<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOL8o.png" class="cf-item-bg" mode="aspectFit"></image>
				</view>
				<view class="cf-item-bg2">
					<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOL8o.png" class="cf-item-bg" mode="aspectFit"></image>
				</view>
				<view class="cf-item-body">
					<view class="cf-item-head"></view>
					<text class="cf-item-title">联动</text>
					<text class="cf-item-desc">飞起沙鸥一片</text>
				</view>
				<view class="cf-item-tl">
					<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YTC4D.png" class="cf-item-tl-cover" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	.cf {
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
		&-title {
			position: absolute;
			flex-direction: row;
			align-items: center;
			left: 375rpx;
			top: 30rpx;
			transform: translateX(-50%);
			
			&-bg {
				position: absolute;
				left: 375rpx;
				top: 20rpx;
				transform: translateX(-50%);
				
				&-cover {
					width: 260rpx;
					height: 130rpx;
				}
			}
			&-text {
				font-size: 52rpx;
				line-height: 80rpx;
				color: #FFFFFF;
			}
			&-hint {
				width: 70rpx;
				height: 100rpx;
			}
		}
		&-body {
			position: absolute;
			left: 25rpx;
			top: 140rpx;
			flex-direction: row;
			width: 700rpx;
			justify-content: space-between;
		}
		&-item {
			position: relative;
			width: 152rpx;
			
			&-bg1 {
				position: absolute;
				top: 0;
				left: 0;
			}
			&-bg2 {
				position: absolute;
				top: 12rpx;
				left: 12rpx;
			}
			&-bg {
				width: 140rpx;
				height: 256rpx;
			}
			&-tl {
				position: absolute;
				left: 12rpx;
				top: 12rpx;
				
				&-cover {
					width: 60rpx;
					height: 57rpx;
				}
			}
			&-body {
				position: absolute;
				left: 24rpx;
				top: 24rpx;
				width: 104rpx;
			}
			&-head {
				width: 104rpx;
				height: 68rpx;
				background-color: #729aa1;
			}
			&-title {
				margin-top: 12rpx;
				font-size: 34rpx;
				line-height: 48rpx;
				font-weight: 600;
				color: #729aa1;
			}
			&-desc {
				margin-top: 12rpx;
				font-size: 24rpx;
				line-height: 34rpx;
				color: #729aa1;
			}
		}
	}
</style>
