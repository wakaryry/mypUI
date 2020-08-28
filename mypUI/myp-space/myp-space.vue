<template>
	<view :class="['myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius, 'myp-space-'+size]" :style="boxStyle">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			size: {
				type: String,
				default: 'base'
			},
			bgType: {
				type: String,
				default: ''
			},
			border: {
				type: String,
				default: 'none'
			},
			radius: {
				type: String,
				default: 'none'
			},
			boxStyle: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style>
</style>
