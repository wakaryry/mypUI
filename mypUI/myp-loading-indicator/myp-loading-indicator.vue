<template>
	<image :src="src" :style="{width: width, height: height}" mode="aspectFit"></image>
</template>

<script>
	export default {
		props: {
			/**
			 * 提示gif图片
			 */
			src: {
				type: String,
				default: '/static/ui/loading.gif'
			},
			/**
			 * 自定义宽度
			 */
			width: {
				type: String,
				default: '36rpx'
			},
			/**
			 * 自定义高度
			 */
			height: {
				type: String,
				default: '36rpx'
			}
		}
	}
</script>

<style>
</style>
