<template>
	<scroll-view :scroll="false" :scroll-x="true" :scroll-left="leftPx" :scroll-with-animation="true" :show-scrollbar="false" :class="['myp-bg-'+bgType]" :style="mrScrollStyle">
		<view :style="mrContentStyle">
			<slot></slot>
		</view>
	</scroll-view>
</template>

<script>
	import {getPx} from '../utils/system.js'
	
	export default {
		props: {
			bgType: {
				type: String,
				default: ''
			},
			justify: {
				type: String,
				default: 'flex-start'
			},
			width: {
				type: String,
				default: '750rpx'
			},
			height: {
				type: String,
				default: '260px'
			},
			left: {
				type: String,
				default: '0'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			contentStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			leftPx() {
				return getPx(this.left)
			},
			mrScrollStyle() {
				let _style = "width:" + this.width + ';'
				_style += "height:" + this.height + ';'
				// #ifdef APP-NVUE
				_style += `flex-direction:row;justify-content:${this.justify};`
				// #endif
				return _style + this.boxStyle
			},
			mrContentStyle() {
				let _style = `flex-direction:row;justify-content:${this.justify};flex-wrap:nowrap;`
				if (this.justify != 'flex-start') {
					_style += "width:" + this.width + ';'
				}
				return _style + this.contentStyle
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
