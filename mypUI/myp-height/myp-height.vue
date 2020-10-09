<template>
	<view :class="['myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius]" :style="'height:'+heightPx+'px;'+boxStyle">
		<slot></slot>
	</view>
</template>

<script>
	import {getHeight} from '../utils/system.js'
	
	export default {
		props: {
			// 自定义高度。允许status-nav-100rpx-12px写法
			height: {
				type: String,
				default: '0'
			},
			// 背景颜色主题
			bgType: {
				type: String,
				default: 'none'
			},
			// 边框主题
			border: {
				type: String,
				default: 'none'
			},
			// 圆角主题
			radius: {
				type: String,
				default: 'none'
			},
			// 外层样式
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
