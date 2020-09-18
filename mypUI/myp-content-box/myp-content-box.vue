<template>
	<view :class="['myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius]" :style="'height:'+heightPx+'px;'+boxStyle">
		<slot></slot>
	</view>
</template>

<script>
	import {getPx, getHeight, getScreenHeight, getStatusBarHeight, getNavbarHeight, getXBarHeight} from '../utils/system.js'
	
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
			includeStatus: {
				type: Boolean,
				default: false
			},
			includeNav: {
				type: Boolean,
				default: false
			},
			includeXBar: {
				type: Boolean,
				default: true
			},
			tabHeight: {
				type: Number,
				default: 0 // px
			},
			// 补充高度
			extra: {
				type: String,
				default: '0'
			},
			// 非0时会直接使用height，忽略其它的计算
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
				let h = getHeight(this.height)
				if (h != 0) {
					return h
				}
				h = getScreenHeight()
				if (h === 0) {
					h = getScreenHeight()
				}
				if (!this.includeStatus) {
					h = h - getStatusBarHeight()
				}
				if (!this.includeNav) {
					h = h - getNavbarHeight()
				}
				if (!this.includeXBar) {
					h = h - getXBarHeight()
				}
				h = h - getHeight(this.extra)
				h = h - this.tabHeight
				return h
			}
		}
	}
</script>

<style>
</style>
