<template>
	<scroll-view :scroll="false" :scroll-x="true" :scroll-left="leftPx" :scroll-with-animation="true" :show-scrollbar="false" :class="['myp-bg-'+bgType]" :style="mrScrollStyle">
		<view class="myp-flex-row myp-wrap-nowrap" :style="contentStyle">
			<slot></slot>
		</view>
	</scroll-view>
</template>

<script>
	import {getPx} from '../utils/system.js'
	
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
			 * 自定义宽度
			 */
			width: {
				type: String,
				default: '750rpx'
			},
			/**
			 * 自定义高度
			 */
			height: {
				type: String,
				default: '260px'
			},
			/**
			 * scroll-left
			 */
			left: {
				type: String,
				default: '0'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 内容样式。如果vue页面下无法滚动（内容有压缩），
			 * 请设置内容总宽度
			 */
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
				_style += `flex-direction:row;`
				// #endif
				return _style + this.boxStyle
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
