<template>
	<view class="hit" bubble="true" @tap="toDetail">
		<image class="hit-img" :src="item.cover" mode="aspectFill"></image>
		<view class="hit-body">
			<text class="hit-title">{{item.title}}</text>
			<text class="hit-desc">{{item.desc}}</text>
		</view>
		<myp-icon name="arrow-right" type="error" boxStyle="border-radius:40rpx;border-width:1px;border-color:#EEEEEE;border-style:solid;width:50rpx;height:50rpx;" @iconClicked="toDetail"></myp-icon>
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
	.hit {
		width: 750rpx;
		padding-left: 32rpx;
		padding-right: 32rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		
		&-body {
			margin-left: 20rpx;
			flex: 1;
		}
		&-img {
			width: 120rpx;
			height: 120rpx;
			border-radius: 8rpx;
		}
		&-title {
			font-size: 32rpx;
			line-height: 45rpx;
			color: #333333;
			lines: 1;
			text-overflow: ellipsis;
			overflow: hidden;
			/* #ifndef APP-NVUE */
			white-space: nowrap;
			/* #endif */
			width: 500rpx;
		}
		&-desc {
			font-size: 26rpx;
			line-height: 38rpx;
			color: #666666;
			lines: 1;
			text-overflow: ellipsis;
			overflow: hidden;
			/* #ifndef APP-NVUE */
			white-space: nowrap;
			/* #endif */
			width: 500rpx;
		}
	}
</style>
