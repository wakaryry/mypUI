<template>
	<view class="ct">
		<view class="ct-bg">
			<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOiW0.jpg" class="ct-bg-cover" mode="aspectFill"></image>
		</view>
		<view class="ct-foot">
			<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YTWDS.png" class="ct-foot-cover" mode="aspectFill"></image>
		</view>
		<view class="ct-title">
			<text v-for="(item,idx) in ['T','o','a','s','t']" :key="idx" class="ct-title-text">{{item}}</text>
		</view>
		<view class="ct-one">
			<view class="ct-item-title">
				<text class="ct-item-title-text">弹出</text>
				<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOvLH.png" class="ct-item-hint" mode="aspectFit"></image>
			</view>
			<view class="ct-item-desc">
				<text class="ct-item-desc-text">弹出Toast，一定周期后隐藏</text>
			</view>
		</view>
		<view class="ct-two">
			<view class="ct-item-title">
				<text class="ct-item-title-text">滑出</text>
				<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOvLH.png" class="ct-item-hint" mode="aspectFit"></image>
			</view>
			<view class="ct-item-desc">
				<text class="ct-item-desc-text">滑出Toast，一定周期后隐藏</text>
			</view>
		</view>
		<view class="ct-three">
			<view class="ct-item-title">
				<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOvLH.png" class="ct-item-hint" mode="aspectFit"></image>
				<text class="ct-item-title-text">弹出</text>
			</view>
			<view class="ct-item-desc">
				<text class="ct-item-desc-text" style="text-align: right;">弹出Toast，改变mode</text>
			</view>
		</view>
		<view class="ct-four">
			<view class="ct-item-title">
				<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOvLH.png" class="ct-item-hint" mode="aspectFit"></image>
				<text class="ct-item-title-text">弹出</text>
			</view>
			<view class="ct-item-desc">
				<text class="ct-item-desc-text" style="text-align: right;">弹出Toast，改变位置</text>
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
	
	.ct {
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
		
		&-foot {
			position: absolute;
			left: 375rpx;
			bottom: 0;
			transform: translateX(-50%);
			
			&-cover {
				width: 700rpx;
				height: 261rpx;
			}
		}
		&-title {
			position: absolute;
			left: 375rpx;
			top: 4rpx;
			transform: translateX(-50%);
			width: 42rpx;
			flex-direction: column;
			align-items: center;
			
			&-text {
				font-size: 32rpx;
				line-height: 42rpx;
				color: #FFFFFF;
				font-weight: 700;
			}
		}
		&-one {
			position: absolute;
			left: 25rpx;
			top: 200rpx;
		}
		&-two {
			position: absolute;
			left: 120rpx;
			top: 32rpx;
		}
		&-three {
			position: absolute;
			right: 120rpx;
			top: 32rpx;
			flex-direction: column;
			align-items: flex-end;
		}
		&-four {
			position: absolute;
			right: 25rpx;
			top: 200rpx;
			flex-direction: column;
			align-items: flex-end;
		}
		&-item {
			&-title {
				flex-direction: row;
				align-items: center;
				
				&-text {
					font-size: 32rpx;
					font-weight: 600;
					color: #FFFFFF;
					line-height: 46rpx;
				}
			}
			&-hint {
				width: 50rpx;
				height: 70rpx;
			}
			&-desc {
				&-text {
					width: 200rpx;
					font-size: 26rpx;
					line-height: 36rpx;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
