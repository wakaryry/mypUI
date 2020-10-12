<template>
	<view :class="['myp-bg-'+bgType]" :style="mrBoxStyle">
		<slot></slot>
	</view>
</template>

<script>
	import {getXBarHeight} from '../utils/system.js'
	
	export default {
		props: {
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			mrBoxStyle() {
				const h = getXBarHeight()
				return `height: ${h}px;` + this.boxStyle
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
