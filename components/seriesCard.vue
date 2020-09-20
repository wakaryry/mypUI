<template>
	<view class="sc" :style="boxStyle" bubble="true" @tap="toDetail">
		<image :src="item.cover" class="sc-img" mode="aspectFill"></image>
		<view class="sc-over"></view>
		<view class="sc-label">
			<text class="sc-label-text">{{item.label}}</text>
		</view>
		<view class="sc-title">
			<text class="sc-title-text">{{item.title}}</text>
		</view>
		<view class="sc-users">
			<view class="sc-users-item" style="left: 56rpx;">
				<image src="https://mypui.asnowsoft.cn/imgs/a9.jpg" class="sc-users-av" mode="aspectFill"></image>
			</view>
			<view class="sc-users-item" style="left: 28rpx;">
				<image src="https://mypui.asnowsoft.cn/imgs/a9.jpg" class="sc-users-av" mode="aspectFill"></image>
			</view>
			<view class="sc-users-item" style="left: 0;">
				<image src="https://mypui.asnowsoft.cn/imgs/a9.jpg" class="sc-users-av" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: ()=>{
					return {}
				}
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		methods: {
			toDetail() {
				this.$emit("detail", this.item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sc {
		width: 200rpx;
		height: 300rpx;
		border-radius: 12rpx;
		position: relative;
		
		&-img {
			width: 200rpx;
			height: 300rpx;
			border-radius: 12rpx;
		}
		&-over {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			border-radius: 12rpx;
			background-color: rgba($color: #000000, $alpha: 0.1);
		}
		&-label {
			position: absolute;
			left: 0;
			top: 0;
			height: 40rpx;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			padding-left: 12rpx;
			padding-right: 12rpx;
			background-color: rgba($color: #FFFFFF, $alpha: 0.4);
			border-top-left-radius: 12rpx;
			border-bottom-right-radius: 12rpx;
			
			&-text {
				font-size: 24rpx;
				line-height: 34rpx;
				color: #FFFFFF;
			}
		}
		&-title {
			position: absolute;
			left: 24rpx;
			top: 60rpx;
			
			&-text {
				width: 152rpx;
				color: #FFFFFF;
				font-size: 32rpx;
				line-height: 45rpx;
				font-weight: 700;
				overflow: hidden;
				/* #ifdef APP-NVUE */
				lines: 2;
				text-overflow: ellipsis;
				/* #endif */
				/* #ifndef APP-NVUE */
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				/* #endif */
			}
		}
		&-users {
			position: absolute;
			left: 24rpx;
			bottom: 24rpx;
			height: 40rpx;
			
			&-item {
				position: absolute;
				top: 0;
			}
			&-av {
				width: 40rpx;
				height: 40rpx;
				border-radius: 40rpx;
				border-width: 1px;
				border-style: solid;
				border-color: #FFFFFF;
			}
		}
	}
</style>
