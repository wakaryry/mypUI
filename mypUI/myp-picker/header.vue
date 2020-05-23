<template>
	<view class="p-header">
		<text class="p-header-cancel" @click="toCancel">取消</text>
		<text class="p-header-confirm" @click="toConfirm">确认</text>
	</view>
</template>

<script>
	export default {
		methods: {
			toCancel() {
				this.$emit("cancel")
			},
			toConfirm() {
				this.$emit("confirm")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../base.scss';
	.p {
		&-header {
			height: 100rpx;
			width: 750rpx;
			background-color: #FFFFFF;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			overflow: hidden;
			padding: 0 32rpx;
			border-top-left-radius: 16rpx;
			border-top-right-radius: 16rpx;
			border-bottom-color: $myp-border-color;
			border-bottom-width: 1px;
			&-cancel {
				color: $myp-text-color-third;
				font-size: 30rpx;
			}
			&-confirm {
				color: $myp-color-primary;
				font-size: 30rpx;
			}
		}
	}
</style>
