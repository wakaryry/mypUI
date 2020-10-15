<template>
	<view class="hvc">
		<text class="hvc-index">{{index}}</text>
		<view class="hvc-body">
			<text class="hvc-title">{{item.title}}</text>
			<view class="hvc-desc">
				<view v-for="(tag,idx) in item.tags" class="hvc-tag">
					<text class="hvc-tag-text">{{tag}}</text>
				</view>
				<text class="hvc-desc-text">{{item.desc}}</text>
			</view>
		</view>
		<myp-icon name="v-dots" type="third"></myp-icon>
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
			index: {
				type: Number,
				default: 0
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hvc {
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		width: 750rpx;
		height: 120rpx;
		padding-left: 32rpx;
		padding-right: 32rpx;
		
		&-index {
			width: 32rpx;
			text-align: center;
			font-size: 36rpx;
			color: #666464;
		}
		&-body {
			margin-left: 20rpx;
			flex: 1;
		}
		&-title {
			font-size: 32rpx;
			color: #333333;
			line-height: 45rpx;
		}
		&-desc {
			flex-direction: row;
			align-items: center;
			margin-top: 12rpx;
			
			&-text {
				font-size: 24rpx;
				color: #999696;
				line-height: 36rpx;
			}
		}
		&-tag {
			border-width: 1px;
			border-color: $myp-color-error;
			border-style: solid;
			padding-left: 6rpx;
			padding-right: 6rpx;
			height: 32rpx;
			margin-right: 8rpx;
			
			&-text {
				font-size: 12px;
				color: $myp-color-error;
				line-height: 14px;
			}
		}
	}
</style>
