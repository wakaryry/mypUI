<template>
	<view class="ms">
		<myp-item icon="0" :isIcon="false" text="动态" boxStyle="width:160rpx; height: 100rpx;"></myp-item>
		<view class="ms-split"></view>
		<myp-item icon="0" :isIcon="false" text="关注" boxStyle="width:160rpx; height: 100rpx;"></myp-item>
		<view class="ms-split"></view>
		<myp-item icon="0" :isIcon="false" text="粉丝" boxStyle="width:160rpx; height: 100rpx;"></myp-item>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	
	.ms {
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 750rpx;
		height: 140rpx;
		background-color: #FFFFFF;
		
		&-split {
			width: 1px;
			height: 66rpx;
			background-color: $myp-border-color-light;
			margin-left: 50rpx;
			margin-right: 50rpx;
		}
	}
</style>
