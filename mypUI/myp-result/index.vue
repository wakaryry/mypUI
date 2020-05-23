<template>
	<view class="myp-result" :style="boxStyle">
		<view :style="{height: top}"></view>
		<image :src="icon" mode="aspectFill" :style="iconStyle"></image>
		<view :style="{height: space}"></view>
		<text :class="['myp-color-'+descType, 'myp-size-'+descSize]" :style="descStyle"></text>
	</view>
</template>

<script>
	export default {
		props: {
			top: {
				type: String,
				default: '260rpx'
			},
			space: {
				type: String,
				default: '50rpx'
			},
			icon: {
				type: String,
				default: ''
			},
			desc: {
				type: String,
				default: '暂时还没有数据'
			},
			descType: {
				type: String,
				default: 'second'
			},
			descSize: {
				type: String,
				default: 'base'
			},
			iconStyle: {
				type: String,
				default: ''
			},
			descStyle: {
				type: String,
				default: ''
			},
			boxStyle: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/base.scss';
	
	.myp-result {
		flex-direction: column;
		align-items: center;
	}
</style>
