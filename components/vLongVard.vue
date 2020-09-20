<template>
	<view class="vlv" :style="boxStyle" bubble="true" @tap="toDetail">
		<image class="vlv-img" :src="item.cover" mode="aspectFill"></image>
		<text class="vlv-title">{{item.title}}</text>
		<view class="vlv-label">
			<text class="vlv-label-text">{{item.label}}</text>
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
	.vlv {
		width: 200rpx;
		height: 400rpx;
		background-color: #F1F1F1;
		border-radius: 12rpx;
		position: relative;
		
		&-img {
			width: 200rpx;
			height: 300rpx;
			border-top-left-radius: 12rpx;
			border-top-right-radius: 12rpx;
		}
		&-title {
			margin-left: 24rpx;
			margin-top: 12rpx;
			font-size: 28rpx;
			line-height: 38rpx;
			color: #666666;
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
		&-label {
			position: absolute;
			left: 24rpx;
			bottom: 120rpx;
			
			&-text {
				font-size: 24rpx;
				color: #FFFFFF;
				line-height: 32rpx;
			}
		}
	}
</style>
