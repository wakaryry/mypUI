<template>
	<myp-popup :show="show" pos="bottom" height="x-180px" @overlayClicked="toCancel">
		<view class="aa">
			<text class="aa-title aa-item aa-split">选择性别</text>
			<text class="aa-item aa-split aa-text" @tap="toSelect(0)">男</text>
			<text class="aa-item aa-text" @tap="toSelect(1)">女</text>
		</view>
		<myp-xbar bgType="inverse" boxStyle="width:750rpx;"></myp-xbar>
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
			toSelect(i) {
				this.$emit("select", i)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	
	.aa {
		width: 750rpx;
		height: 180px;
		background-color: #FFFFFF;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		
		&-item {
			width: 750rpx;
			height: 60px;
			line-height: 60px;
			text-align: center;
		}
		&-split {
			border-bottom-width: 1px;
			border-bottom-color: $myp-border-color-light;
		}
		&-title {
			font-size: 18px;
			color: $myp-text-color;
			font-weight: 600;
		}
		&-text {
			font-size: 15px;
			color: $myp-text-color;
		}
	}
</style>
