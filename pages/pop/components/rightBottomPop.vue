<template>
	<myp-popup :show="show" pos="right" width="520rpx" topOffset="60px" bottomOffset="60px" bgType="inverse" boxStyle="flex-direction:column;align-items:center;padding-left:32rpx;padding-right:32rpx;padding-top:120rpx;" @overlayClicked="toCancel">
		<image class="lp-logo" src="/static/logo.png" mode="aspectFill"></image>
		<myp-button bgType="error" text="打赏" border="none" radius="ll" height="base" boxStyle="width:360rpx;" @buttonClicked="toPay"></myp-button>
		<view class="lp-items">
			<view class="lp-item" v-for="(item,idx) in items" :key="idx">
				<text class="lp-item-text" v-for="(char,index) in item" :key="index">{{char}}</text>
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
		data() {
			return {
				items: [['桃','花','潭','水','深','千','尺'], ['不','及','汪','伦','送','我','情']]
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
	@import '@/mypUI/mypui.scss';
	
	.lp {
		&-logo {
			width: 120rpx;
			height: 120rpx;
			border-radius: 60rpx;
			border-width: 2px;
			border-color: $myp-color-warning;
			margin-bottom: 32rpx;
		}
		&-items {
			margin-top: 64rpx;
			flex-direction: row;
			width: 180rpx;
			justify-content: space-between;
		}
		&-item {
			flex-direction: column;
			
			&-text {
				font-size: 52rpx;
				color: $myp-text-color;
				line-height: 72rpx;
				font-weight: 600;
			}
		}
	}
</style>
