<template>
	<view :class="['myp-flex-row', 'myp-wrap-nowrap', 'myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius]" :style="boxStyle">
		<slot name="left"></slot>
		<view class="myp-timeline-center myp-flex-column myp-align-center" :style="centerStyle">
			<view :class="['myp-timeline-line', 'myp-bg-'+lineBgType]" :style="lineStyle"></view>
			<slot name="badge"></slot>
		</view>
		<slot name="right"></slot>
	</view>
</template>

<script>
	export default {
		props: {
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: 'none'
			},
			/**
			 * 边框主题
			 */
			border: {
				type: String,
				default: 'none'
			},
			/**
			 * 圆角主题
			 */
			radius: {
				type: String,
				default: 'none'
			},
			/**
			 * 中间线外层样式
			 */
			centerStyle: {
				type: String,
				default: ''
			},
			/**
			 * 中间线背景主题
			 */
			lineBgType: {
				type: String,
				default: 'border'
			},
			/**
			 * 中间线样式
			 */
			lineStyle: {
				type: String,
				default: ''
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-timeline {
		&-center {
			position: relative;
		}
		&-line {
			flex: 1;
			width: 1px;
		}
	}
</style>
