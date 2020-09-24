<template>
	<view class="sc">
		<image class="sc-cover" :src="item.cover" mode="aspectFill"></image>
		<view v-if="item.label" class="sc-label">
			<text class="sc-label-text">{{item.label}}</text>
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	
	.sc {
		width: 686rpx;
		height: 280rpx;
		position: relative;
		
		&-cover {
			border-radius: 12rpx;
			width: 686rpx;
			height: 280rpx;
		}
		&-label {
			position: absolute;
			right: 0;
			bottom: 0;
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
			align-items: center;
			justify-content: center;
			padding-left: 16rpx;
			padding-right: 16rpx;
			height: 46rpx;
			background-color: rgba($color: $myp-color-primary, $alpha: 0.6);
			border-top-left-radius: 12rpx;
			border-bottom-right-radius: 12rpx;
			
			&-text {
				font-size: 24rpx;
				line-height: 34rpx;
				color: #FFFFFF;
			}
		}
	}
</style>
