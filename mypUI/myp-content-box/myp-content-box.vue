<template>
	<view :class="['myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius]" :style="'height:'+heightPx+'px;'+boxStyle">
		<slot></slot>
	</view>
</template>

<script>
	import {getHeight, getScreenHeight} from '../utils/system.js'
	
	export default {
		props: {
			// 背景主题
			bgType: {
				type: String,
				default: 'page'
			},
			// 边框主题
			border: {
				type: String,
				default: ''
			},
			// 圆角主题
			radius: {
				type: String,
				default: ''
			},
			// 需要从屏幕高度减去的高度
			extra: {
				type: String,
				default: 'status-nav'
			},
			// height非0时，会直接使用height，忽略extra
			height: {
				type: String,
				default: '0'
			},
			// 外层样式
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
