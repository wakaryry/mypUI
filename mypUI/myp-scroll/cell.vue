<template>
	<!-- #ifdef APP-NVUE -->
	<cell :class="['myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius]" :style="boxStyle">
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
	<view :class="['myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius]" :style="boxStyle" :hover-class="'myp-hover-'+hover">
	<!-- #endif -->
		<slot></slot>
	<!-- #ifdef APP-NVUE -->
	</cell>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
	</view>
	<!-- #endif -->
</template>

<script>
	//
	// list cell
	//
	export default {
		props: {
			bgType: {
				type: String,
				default: 'none'
			},
			border: {
				type: String,
				default: 'none'
			},
			radius: {
				type: String,
				default: 'none'
			},
			// 仅仅只是app-nvue无效，请直接在内容上设置
			hover: {
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

<style lang="scss" scoped>
	@import '../base.scss';
</style>
