<template>
	<myp-popup :show="show" pos="left" width="520rpx" bgType="inverse" boxStyle="flex-direction:column;align-items:center;padding-left:32rpx;padding-right:32rpx;padding-top:120rpx;" @overlayClicked="toCancel">
		<image class="lp-logo" src="/static/logo.png" mode="aspectFill"></image>
		<myp-button bgType="error" text="打赏" border="none" radius="ll" height="base" boxStyle="width:360rpx;" @buttonClicked="toPay"></myp-button>
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
	}
</style>
