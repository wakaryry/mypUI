<template>
	<view class="vcc">
		<image class="vcc-avatar" :src="image" mode="aspectFill"></image>
		<text class="vcc-name">{{name}}</text>
		<text class="vcc-cares">{{cares}}</text>
		<text class="vcc-intro">{{intro}}</text>
		<myp-button bgType="error" icon="plus" text="关 注" iconSize="base" textSize="base" height="s" radius="ll" boxStyle="width:180rpx;" @buttonClicked="toCare"></myp-button>
		<view class="vcc-close">
			<myp-icon name="close" type="third" size="base" @iconClicked="toClose"></myp-icon>
		</view>
	</view>
</template>

<script>
	import mypIcon from '@/mypUI/myp-icon/index.vue'
	import mypButton from '@/mypUI/myp-button/index.vue'
	
	export default {
		props: {
			image: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: ''
			},
			cares: {
				type: String,
				default: ''
			},
			intro: {
				type: String,
				default: ''
			}
		},
		components: {
			mypIcon,
			mypButton
		},
		methods: {
			toCare() {
				this.$emit("care")
			},
			toClose() {
				this.$emit("close")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/m.scss';
	.vcc {
		background-color: #FFFFFF;
		width: 300rpx;
		height: 520rpx;
		padding: 24rpx;
		flex-direction: column;
		align-items: center;
		position: relative;
		
		&-avatar {
			width: 180rpx;
			height: 180rpx;
			border-radius: 90rpx;
		}
		
		&-name {
			color: $m-text-color;
			font-size: 32rpx;
			margin-top: 16rpx;
			margin-bottom: 16rpx;
		}
		
		&-cares {
			color: $m-text-color-third;
			font-size: 28rpx;
			margin-bottom: 16rpx;
		}
		
		&-intro {
			color: $m-text-color-second;
			font-size: 28rpx;
			margin-bottom: 40rpx;
		}
		
		&-close {
			position: absolute;
			right: 32rpx;
			top: 32rpx;
		}
	}
</style>
