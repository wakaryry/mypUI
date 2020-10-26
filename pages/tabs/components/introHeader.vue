<template>
	<view class="hv-box">
		<view class="hv-body">
			<text class="hv-body-title">性能、体验、效率、规范</text>
			<text class="hv-body-desc">是UI，更是您规范、学习、进阶的好帮手</text>
			<myp-button border="bottom" text="查看更多" height="base" radius="none" boxStyle="width:500rpx;" @buttonClicked="tapped"></myp-button>
		</view>
		<view class="hv-logo">
			<image class="hv-logo-image" src="/static/mypui.png" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			tapped() {
				this.$emit('selected')
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	
	.hv {
		&-box {
			position: relative;
			width: 628rpx;
		}
		&-body {
			margin-top: 68rpx;
			background-color: #FFFFFF;
			border-radius: 32rpx;
			height: 300rpx;
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: column;
			align-items: center;
			border-width: $myp-border-width;
			border-color: rgba($color: $myp-color-error, $alpha: 0.2);
			border-style: solid;
			
			&-title {
				margin-top: 92rpx;
				font-size: 32rpx;
				font-weight: 600;
				color: $myp-text-color;
			}
			&-desc {
				font-size: 26rpx;
				line-height: 62rpx;
				color: $myp-text-color-third;
			}
		}
		&-logo {
			position: absolute;
			left: 0;
			top: 0;
			width: 628rpx;
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
			justify-content: center;
			&-image {
				width: 363rpx;
				height: 136rpx;
			}
		}
	}
</style>
