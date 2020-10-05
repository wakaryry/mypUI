<template>
	<view :class="['myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius, 'myp-flex-'+direction, 'myp-justify-'+justify, 'myp-align-'+align, 'myp-wrap-'+wrap]" :style="boxStyle">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			// 布局方向主题
			direction: {
				type: String,
				default: 'row'
			},
			// 换行主题
			wrap: {
				type: String,
				default: 'nowrap'
			},
			// justify主题
			justify: {
				type: String,
				default: 'start'
			},
			// align主题
			align: {
				type: String,
				default: 'center'
			},
			// 背景颜色主题
			bgType: {
				type: String,
				default: ''
			},
			// 边框主题
			border: {
				type: String,
				default: 'none'
			},
			// 圆角主题
			radius: {
				type: String,
				default: 'none'
			},
			// 外层样式
			boxStyle: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style>
</style>
