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
			centerStyle: {
				type: String,
				default: ''
			},
			lineBgType: {
				type: String,
				default: 'border'
			},
			lineStyle: {
				type: String,
				default: ''
			},
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
