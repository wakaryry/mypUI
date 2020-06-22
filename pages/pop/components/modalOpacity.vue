<template>
	<myp-popup :show="show" pos="center" width="600rpx" height="420rpx">
		<view class="mo">
			<text class="mo-title">确定删除</text>
			<text class="mo-desc">删除之后，将无法恢复，请谨慎操作。</text>
			<view class="mo-foot">
				<myp-button border="all" radius="ll" bgType="inverse" text="取消" height="base" textType="text" boxStyle="width:240rpx;" @buttonClicked="toCancel"></myp-button>
				<myp-button border="none" radius="ll" bgType="error" text="确认" height="base" boxStyle="width:240rpx;" @buttonClicked="toConfirm"></myp-button>
			</view>
		</view>
	</myp-popup>
</template>

<script>
	// modal实际上就是popup，实际上在手机端，modal五花八门，自己去实现具体内容吧
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
			toConfirm() {
				this.$emit("confirm")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	
	.mo {
		position: relative;
		flex-direction: column;
		align-items: center;
		width: 600rpx;
		height: 420rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
		
		&-title {
			font-size: 36rpx;
			color: $myp-text-color;
			font-weight: 600;
			line-height: 50rpx;
			margin-top: 32rpx;
		}
		&-desc {
			font-size: 32rpx;
			color: $myp-text-color-second;
			line-height: 44rpx;
			margin-top: 16rpx;
		}
		&-foot {
			position: absolute;
			left: 30rpx;
			width: 540rpx;
			bottom: 32rpx;
			flex-direction: row;
			justify-content: space-between;
		}
	}
</style>
