<template>
	<image :src="src" :style="{width: width, height: height}" mode="aspectFit"></image>
</template>

<script>
	// 如果您发现image无法居中，请设置外层元素的宽高
	export default {
		props: {
			src: {
				type: String,
				default: '/static/ui/loading.gif'
			},
			width: {
				type: String,
				default: '36rpx'
			},
			height: {
				type: String,
				default: '36rpx'
			}
		}
	}
</script>

<style>
</style>
