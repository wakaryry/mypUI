<template>
	<view bubble="true" class="hic" hover-class="m-hover-opacity" @tap="toSelect">
		<view class="hic-head">
			<view class="hic-head-left">
				<view class="hic-head-image">
					<image class="hic-head-image-image" :src="item.avatar" mode="aspectFill"></image>
					<image class="hic-head-image-badge" src="/static/vip.png" mode="aspectFill"></image>
				</view>
				<view class="hic-head-body">
					<text class="hic-head-name">{{item.name}}</text>
					<text class="hic-head-desc">{{item.desc}}</text>
				</view>
			</view>
			<view>
				<myp-button icon="plus" text="关 注" bgType="error" radius="ll" iconSize="base" textSize="base" height="s" boxStyle="width:180rpx;"></myp-button>
			</view>
		</view>
		<myp-divider type="border-dark"></myp-divider>
		<view class="hic-body">
			<text class="hic-body-intro">{{item.content}}</text>
			<image class="hic-body-image" :src="item.cover" mode="aspectFill"></image>
			<text class="hic-body-badge">{{item.badge>0?'+'+item.badge:''}}</text>
		</view>
		<view class="hic-footer">
			<text class="hic-footer-name">{{item.identity+'：'+item.name}}</text>
			<myp-icon name="close" size="base" type="third"></myp-icon>
		</view>
	</view>
</template>

<script>
	import mypButton from '@/mypUI/myp-button/index.vue'
	import mypDivider from '@/mypUI/myp-divider/index.vue'
	import mypIcon from '@/mypUI/myp-icon/index.vue'
	
	export default {
		components: {
			mypButton,
			mypDivider,
			mypIcon
		},
		props: {
			item: {
				type: Object,
				default: ()=>{
					return {}
				}
			}
		},
		methods: {
			toSelect() {
				this.$emit("select")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/m.scss';
	.hic {
		background-color: $m-bg-color-second;
		padding: 0 24rpx;
		border-radius: 12rpx;
		
		&-head {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 32rpx 0;
			
			&-left {
				flex-direction: row;
				height: 90rpx;
			}
			
			&-image {
				width: 90rpx;
				height: 90rpx;
				position: relative;
				
				&-image {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50rpx;
				}
				
				&-badge {
					position: absolute;
					right: 0;
					bottom: 0;
					width: 24rpx;
					height: 24rpx;
					border-radius: 20rpx;
				}
			}
			
			&-body {
				margin-left: 16rpx;
			}
			
			&-name {
				color: $m-text-color;
				font-size: 32rpx;
				line-height: 50rpx;
			}
			
			&-desc {
				color: $m-text-color-third;
				font-size: 24rpx;
				line-height: 36rpx;
			}
		}
		
		&-body {
			position: relative;
			flex-direction: row;
			height: 120rpx;
			margin-top: 32rpx;
			
			&-intro {
				flex: 1;
				font-size: 28rpx;
				line-height: 36rpx;
				color: $m-text-color-second;
				overflow: hidden;
				/* #ifdef APP-NVUE */
				lines: 3;
				text-overflow: ellipsis;
				/* #endif */
				/* #ifndef APP-NVUE */
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				/* #endif */
			}
			
			&-image {
				margin-left: 40rpx;
				width: 120rpx;
				height: 120rpx;
				border-radius: 12rpx;
			}
			
			&-badge {
				position: absolute;
				top: 12rpx;
				right: 6rpx;
				font-size: 26rpx;
				color: #FFFFFF;
			}
		}
		
		&-footer {
			flex-direction: row;
			justify-content: space-between;
			height: 76rpx;
			align-items: center;
			
			&-name {
				font-size: 26rpx;
				color: $m-text-color-third;
			}
		}
	}
</style>
