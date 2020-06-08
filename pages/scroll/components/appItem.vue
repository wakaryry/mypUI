<template>
	<view bubble="true" class="ai" :style="boxStyle" @tap="toSelectItem">
		<image v-if="isFill" class="ai-icon-fill" :src="item.logo" mode="aspectFit" :style="iconStyle"></image>
		<view v-else class="ai-icon">
			<image class="ai-icon-icon" :src="item.logo" mode="aspectFit"></image>
		</view>
		<text class="ai-text" :style="textStyle+'margin-top:'+space+';'">{{item.name}}</text>
		<view v-if="item.num&&item.num*1>0" class="ai-badge">
			<text class="ai-badge-text">{{item.num}}</text>
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
			space: {
				type: String,
				default: '9rpx'
			},
			isFill: {
				type: Boolean,
				default: true
			},
			boxStyle: {
				type: String,
				default: ''
			},
			iconStyle: {
				type: String,
				default: ''
			},
			textStyle: {
				type: String,
				default: ''
			}
		},
		methods: {
			toSelectItem() {
				this.$emit("select", this.item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	.ai {
		position: relative;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 216rpx;
		
		&-icon {
			width: 100rpx;
			height: 100rpx;
			border-radius: 60rpx;
			overflow: hidden;
			border-width: 1px;
			border-style: solid;
			border-color: $myp-border-color-light;
			background-color: $myp-bg-color-light;
			align-items: center;
			justify-content: center;
			
			&-fill {
				width: 100rpx;
				height: 100rpx;
				border-radius: 60rpx;
				overflow: hidden;
				border-width: 1px;
				border-style: solid;
				border-color: $myp-border-color-light;
				background-color: $myp-bg-color-light;
			}
			&-icon {
				width: 56rpx;
				height: 56rpx;
			}
		}
		&-text {
			font-size: 28rpx;
			line-height: 40rpx;
			color: $myp-text-color-third;
		}
		&-badge {
			width: 52rpx;
			height: 32rpx;
			background-color: $myp-color-error;
			position: absolute;
			top: 2rpx;
			right: 32rpx;
			justify-content: center;
			align-items: center;
			border-top-left-radius: 30rpx;
			border-top-right-radius: 30rpx;
			border-bottom-right-radius: 30rpx;
			
			&-text {
				font-size: 20rpx;
				color: #FFFFFF;
			}
		}
	}
</style>
