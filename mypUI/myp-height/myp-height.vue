<template>
	<view :class="['myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius]" :style="'height:'+heightPx+'px;'+boxStyle">
		<slot></slot>
	</view>
</template>

<script>
	import {getHeight} from '../utils/system.js'
	
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
		},
		computed: {
			heightPx() {
				return getHeight(this.height)
			}
		}
	}
</script>

<style>
</style>
