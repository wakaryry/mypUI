<template>
	<myp-popup :show="show" pos="top" width="750rpx" height="660rpx" @overlayClicked="toCancel">
		<view class="tp">
			<image class="tp-logo" src="/static/logo.png" mode="aspectFill"></image>
			<text class="tp-title">mypUI</text>
			<text class="tp-sign">傲来雾,花果香,定海一棒万妖朝。东海外,水帘中,齐天比高仙折腰。素衣着,泪情诗,待你未归人潮逝。初相识,唇上血,千古第一为红颜。</text>
			<view class="tp-pay">
				<myp-button bgType="primary" text="打赏" textType="inverse" border="none" radius="ll" boxStyle="width:420rpx;" @buttonClicked="toPay"></myp-button>
			</view>
		</view>
	</myp-popup>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			toCancel() {
				this.$emit("cancel")
			},
			toPay() {
				this.$emit("pay")
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	
	.tp {
		width: 750rpx;
		height: 660rpx;
		background-color: #FFFFFF;
		flex-direction: column;
		align-items: center;
		padding-left: 75rpx;
		padding-right: 75rpx;
		padding-top: 120rpx;
		border-bottom-left-radius: 32rpx;
		border-bottom-right-radius: 32rpx;
		position: relative;
		
		&-logo {
			width: 120rpx;
			height: 120rpx;
			border-radius: 60rpx;
			border-width: 4px;
			border-color: $myp-color-warning;
			border-style: solid;
		}
		&-title {
			font-size: 40rpx;
			line-height: 56rpx;
			color: $myp-text-color;
			font-weight: 600;
			margin-top: 32rpx;
		}
		&-sign {
			margin-top: 24rpx;
			font-size: 30rpx;
			line-height: 42rpx;
			color: $myp-text-color;
		}
		&-pay {
			position: absolute;
			left: 0;
			bottom: 32rpx;
			width: 750rpx;
			flex-direction: row;
			justify-content: center;
		}
	}
</style>
