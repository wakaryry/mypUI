<template>
	<view :class="['myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius, 'myp-wing-'+size]" :style="boxStyle">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			// 间距的尺寸主题
			size: {
				type: String,
				default: 'base'
			},
			// 背景主题
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
