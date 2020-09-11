<template>
	<view :class="[fixed?'myp-position-fixed':'myp-position-absolute', 'myp-bg-'+bgType]" :style="mrBoxStyle">
		<slot></slot>
	</view>
</template>

<script>
	import {getHeight} from '../utils/system.js'
	
	export default {
		props: {
			fixed: {
				type: Boolean,
				default: false
			},
			pos: {
				type: String,
				default: 'bottom'
			},
			offset: {
				type: String,
				default: '0px'
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
		computed: {
			offsetPx() {
				return getHeight(this.offset)
			},
			mrBoxStyle() {
				return (this.pos === 'top' ? `top:${this.offsetPx}px;` : `bottom:${this.offsetPx}px;`) + this.boxStyle
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-foot {
		position: absolute;
		
		&-fixed {
			position: fixed;
		}
	}
</style>
