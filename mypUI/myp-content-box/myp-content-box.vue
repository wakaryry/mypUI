<template>
	<view :class="['myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius]" :style="'height:'+heightPx+'px;'+boxStyle">
		<slot></slot>
	</view>
</template>

<script>
	import {getHeight, getScreenHeight} from '../utils/system.js'
	
	export default {
		props: {
			bgType: {
				type: String,
				default: 'page'
			},
			border: {
				type: String,
				default: 'none'
			},
			radius: {
				type: String,
				default: 'none'
			},
			// 需要从屏幕高度减去的高度
			extra: {
				type: String,
				default: 'status-nav'
			},
			// 设置了height，会直接使用height，忽略其它的计算
			height: {
				type: String,
				default: '0'
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			heightPx() {
				const hPx = getHeight(this.height)
				if (hPx !== 0) {
					return hPx
				}
				const extraPx = getHeight(this.extra)
				const screenH = getScreenHeight()
				return screenH - extraPx
			}
		}
	}
</script>

<style>
</style>
