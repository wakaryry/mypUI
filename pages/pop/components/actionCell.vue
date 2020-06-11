<template>
	<view class="ct">
		<view class="ct-bg">
			<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOrYg.jpg" class="ct-bg-cover" mode="aspectFill"></image>
		</view>
		<view class="ct-title-bg">
			<image class="ct-title-bg-cover" src="https://cdn.img.wenhairu.com/images/2020/05/23/YO2sj.png" mode="aspectFit"></image>
		</view>
		<view class="ct-title">
			<text class="ct-title-text">ActionSheet</text>
			<image class="ct-title-hint" src="https://cdn.img.wenhairu.com/images/2020/05/23/YOvLH.png" mode="aspectFit"></image>
		</view>
		<view class="ct-body">
			<view class="ct-item">
				<view class="ct-item-top">
					<image class="ct-item-bg" src="https://cdn.img.wenhairu.com/images/2020/05/23/YOsSU.png" mode="aspectFit"></image>
					<view class="ct-item-title">
						<text class="ct-item-title-text">A</text>
					</view>
				</view>
				<view class="ct-item-desc">
					<text class="ct-item-desc-text">100%宽度</text>
				</view>
			</view>
			<view class="ct-item">
				<view class="ct-item-top">
					<image class="ct-item-bg" src="https://cdn.img.wenhairu.com/images/2020/05/23/YOsSU.png" mode="aspectFit"></image>
					<view class="ct-item-title">
						<text class="ct-item-title-text">B</text>
					</view>
				</view>
				<view class="ct-item-desc">
					<text class="ct-item-desc-text">两边有间距</text>
				</view>
			</view>
			<view class="ct-item">
				<view class="ct-item-top">
					<image class="ct-item-bg" src="https://cdn.img.wenhairu.com/images/2020/05/23/YOsSU.png" mode="aspectFit"></image>
					<view class="ct-item-title">
						<text class="ct-item-title-text">C</text>
					</view>
				</view>
				<view class="ct-item-desc">
					<text class="ct-item-desc-text">带特殊取消</text>
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
			width: 700rpx;
			top: 120rpx;
			flex-direction: row;
			justify-content: space-between;
		}
		&-item {
			flex-direction: column;
			align-items: center;
			
			&-top {
				position: relative;
			}
			&-bg {
				width: 230rpx;
				height: 230rpx;
			}
			&-title {
				position: absolute;
				left: 55rpx;
				top: 55rpx;
				border-radius: 120rpx;
				height: 120rpx;
				width: 120rpx;
				justify-content: center;
				align-items: center;
				background-color: #FFFFFF;
				
				&-text {
					font-size: 52rpx;
					color: #729aa1;
					font-weight: 600;
				}
			}
			&-desc {
				width: 230rpx;
				flex-direction: row;
				justify-content: center;
				
				&-text {
					font-size: 28rpx;
					line-height: 42rpx;
					color: #729aa1;
				}
			}
		}
	}
</style>
