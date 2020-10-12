<template>
	<view :class="['myp-timeline', 'myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius]" :style="boxStyle">
		<slot name="left"></slot>
		<view class="myp-timeline-center" :style="centerStyle">
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
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		flex-wrap: nowrap;
		
		&-center {
			position: relative;
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: column;
			align-items: center;
		}
		&-line {
			flex: 1;
			width: 1px;
		}
	}
</style>
