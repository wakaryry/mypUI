<template>
	<view class="myp-ucv">
		<view class="myp-ucv-top">
			<view class="myp-ucv-top-left">
				<text class="myp-ucv-ym">2019.12</text>
				<text class="myp-ucv-date">16</text>
				<view class="myp-ucv-calendar">
					<text class="myp-ucv-calendar-text">己亥年</text>
					<text class="myp-ucv-calendar-text">十一月廿一</text>
				</view>
			</view>
			<view class="myp-ucv-top-right">
				<view>
					<image class="myp-ucv-top-image" src="/static/swiper/3.jpg" mode="aspectFill"></image>
				</view>
				<view class="myp-ucv-calendar-hint">
					<text class="myp-ucv-calendar-hint-text">「宜入宅安门」</text>
				</view>
			</view>
		</view>
		<view class="myp-ucv-bottom">
			<text class="myp-ucv-title">好物推荐：mypUI开发套件</text>
			<text class="myp-ucv-intro">不只是一把开发的好刀，更是学习和进阶的绝佳材料</text>
			<view class="myp-ucv-go">
				<view class="myp-ucv-tags">
					<view class="myp-ucv-tags-item">
						<view class="myp-ucv-tags-dot"></view>
						<text class="myp-ucv-tags-text">快速开发</text>
					</view>
					<view class="myp-ucv-tags-item">
						<view class="myp-ucv-tags-dot"></view>
						<text class="myp-ucv-tags-text">性能强悍</text>
					</view>
				</view>
				<view>
					<myp-button bgType="warning" text="查看详情" radius="ll" height="base" boxStyle="width:240rpx;"></myp-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//
	// 因为样式复杂程度提高，复用成本变高
	// 不再做配置，如果需要修改请在项目里面拷贝过去修改
	// 如果需要进行服务器端配置，请自己开放响应需要配置的属性
	// 
	
	import mypButton from '@/mypUI/myp-button/index.vue'
	
	export default {
		components: {
			mypButton
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/m.scss';
	
	.myp-ucv {
		flex-direction: column;
		width: 620rpx;
		height: 840rpx;
		background-color: #FFFFFF;
		border-radius: 24rpx;
		overflow: hidden;
		
		&-top {
			flex: 1;
			flex-direction: row;
			border-bottom-color: $m-border-color;
			border-bottom-width: 1px;
			
			&-left {
				width: 200rpx;
				border-right-color: $m-border-color;
				border-right-width: 1px;
				flex-direction: column;
				align-items: center;
			}
			
			&-right {
				flex: 1;
			}
			
			&-image {
				width: 420rpx;
				height: 420rpx;
			}
		}
		
		&-ym {
			font-size: 32rpx;
			font-weight: 600;
			margin-top: 56rpx;
		}
		&-date {
			font-size: 80rpx;
			font-weight: 600;
			line-height: 120rpx;
		}
		&-calendar {
			flex-direction: row;
			&-text {
				width: 60rpx;
				text-align: center;
				font-size: 36rpx;
				line-height: 42rpx;
				// word-wrap: break-word;
				// word-break:break-all;
				lines: 0;
			}
			&-hint {
				flex-direction: row;
				justify-content: center;
				align-items: center;
				height: 110rpx;
				&-text {
					font-size: 52rpx;
				}
			}
		}
		
		&-bottom {
			flex-direction: column;
			height: 310rpx;
			padding: 32rpx;
		}
		
		&-title {
			font-size: 40rpx;
			margin-bottom: 24rpx;
			color: $m-text-color;
		}
		&-intro {
			font-size: 32rpx;
			line-height: 40rpx;
			color: $m-text-color-second;
		}
		&-go {
			margin-top: 12rpx;
			flex-direction: row;
			align-items: center;
		}
		&-tags {
			flex: 1;
			flex-direction: row;
			&-item {
				flex-direction: row;
				align-items: center;
			}
			&-dot {
				width: 12rpx;
				height: 12rpx;
				border-radius: 6rpx;
				background-color: $m-text-color-third;
			}
			&-text {
				color: $m-text-color-third;
				font-size: 32rpx;
				margin-left: 12rpx;
				margin-right: 12rpx;
			}
		}
	}
</style>
