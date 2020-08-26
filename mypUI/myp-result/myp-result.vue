<template>
	<view class="myp-result" :style="boxStyle">
		<view :style="{height: top}"></view>
		<slot name="icon">
			<myp-icon :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="iconBoxStyle"></myp-icon>
		</slot>
		<slot name="title">
			<text :class="['myp-color-'+titleType, 'myp-size-'+titleSize]" :style="titleStyle">{{title}}</text>
		</slot>
		<slot name="desc">
			<text :class="['myp-color-'+descType, 'myp-size-'+descSize]" :style="descStyle">{{desc}}</text>
		</slot>
		<slot name="extra"></slot>
	</view>
</template>

<script>
	export default {
		props: {
			top: {
				type: String,
				default: '260rpx'
			},
			icon: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			desc: {
				type: String,
				default: '暂时还没有数据'
			},
			titleType: {
				type: String,
				default: 'second'
			},
			titleSize: {
				type: String,
				default: 'll'
			},
			titleStyle: {
				type: String,
				default: ''
			},
			descType: {
				type: String,
				default: 'second'
			},
			descSize: {
				type: String,
				default: 'base'
			},
			descStyle: {
				type: String,
				default: ''
			},
			iconType: {
				type: String,
				default: 'second'
			},
			iconSize: {
				type: String,
				default: 'll'
			},
			iconStyle: {
				type: String,
				default: ''
			},
			iconBoxStyle: {
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
	.myp-result {
		flex-direction: column;
		align-items: center;
	}
</style>
