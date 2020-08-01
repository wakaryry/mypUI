<template>
	<view :class="['myp-bg-'+bgType]" :style="mrBoxStyle">
		<slot></slot>
	</view>
</template>

<script>
	import windowMixin from '../myp-mixin/windowMixin.js'
	
	export default {
		props: {
			height: {
				type: String,
				default: '0'
			},
			bgType: {
				type: String,
				default: 'none'
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		mixins: [windowMixin],
		computed: {
			heightPx() {
				return this.mypGetHeight(this.height)
			},
			mrBoxStyle() {
				return `height:${this.heightPx}px;` + this.boxStyle
			}
		}
	}
</script>

<style>
</style>
