<template>
	<view ref="slider-wrap" class="myp-slider" :style="boxStyle" @tap.stop="toWrapClicked">
		<view class="myp-slider-container" :style="containerStyle">
			<!-- progress -->
			<view :class="['myp-slider-bg', 'myp-bg-'+bgType]" :style="progressStyle">
				<view :class="['myp-slider-progress', 'myp-bg-'+activeBgType]" :style="activeProgressStyle"></view>
			</view>
			<!-- tooltip -->
			<view class="myp-slider-tooltip" :style="tooltipStyle">
				<slot name="tooltip"></slot>
			</view>
		</view>
		<!-- labels -->
		<view class="myp-slider-labels">
			<slot name="label"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			/**
			 * 值/进度
			 */
			value: {
				type: Number,
				default: 0
			},
			/**
			 * 数据点位置
			 */
			items: {
				type: Array,
				default: ()=>{
					return null
				}
			},
			/**
			 * 标记内容
			 */
			labels: {
				type: Array,
				default: ()=>{
					return null
				}
			},
			/**
			 * 最小值
			 */
			min: {
				type: Number,
				default: 0
			},
			/**
			 * 最大值
			 */
			max: {
				type: Number,
				default: 10
			},
			/**
			 * 移动周期/速度
			 */
			duration: {
				type: Number,
				default: 500
			},
			bgType: {
				type: String,
				default: 'page'
			},
			activeBgType: {
				type: String,
				default: 'primary'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			containerStyle: {
				type: String,
				default: ''
			},
			progressStyle: {
				type: String,
				default: ''
			},
			activeProgressStyle: {
				type: String,
				default: ''
			},
			tooltipStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			toWrapClicked(e) {
				e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-slider {
		position: relative;
		
		&-container {
			position: relative;
		}
		&-bg {
			overflow: hidden;
		}
		&-progress {
		}
		&-tooltip {
			position: absolute;
		}
	}
</style>
