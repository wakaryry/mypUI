<template>
	<view class="vitc" bubble="true" @tap="toDetail">
		<view class="vitc-top">
			<image :src="item.cover" class="vitc-img" mode="aspectFill"></image>
			<view class="vitc-tag">
				<myp-icon name="comment-dots" type="inverse" size="s"></myp-icon>
				<text class="vitc-tag-text">{{item.label}}</text>
			</view>
		</view>
		<text class="vitc-text">{{item.title}}</text>
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
	.vitc {
		width: 200rpx;
		
		&-top {
			width: 200rpx;
			height: 200rpx;
			border-radius: 12rpx;
			position: relative;
		}
		&-img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 12rpx;
		}
		&-tag {
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
			align-items: center;
			position: absolute;
			right: 12rpx;
			top: 8rpx;
			
			&-text {
				margin-left: 6rpx;
				color: #FFFFFF;
				font-size: 24rpx;
				line-height: 30rpx;
			}
		}
		&-text {
			margin-top: 8rpx;
			width: 200rpx;
			font-size: 28rpx;
			line-height: 40rpx;
			color: #333333;
			lines: 2;
			overflow: hidden;
			text-overflow: ellipsis;
			/* #ifndef APP-NVUE */
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			/* #endif */
		}
	}
</style>
