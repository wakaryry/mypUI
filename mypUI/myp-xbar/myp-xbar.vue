<template>
	<view :class="['myp-bg-'+bgType]" :style="mrBoxStyle">
		<slot></slot>
	</view>
</template>

<script>
	import {getXBarHeight} from '../utils/system.js'
	
	export default {
		props: {
			bgType: {
				type: String,
				default: ''
			},
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
