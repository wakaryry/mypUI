<template>
	<view :class="['myp-flex-column', 'myp-align-center', 'myp-justify-center', 'myp-position-relative', 'myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius]" :hover-class="'myp-hover-'+hover" :style="boxStyle" bubble="true" @tap="toSelect">
		<myp-icon v-if="isIcon&&icon" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="iconBoxStyle" @iconClicked="toSelect"></myp-icon>
		<text v-if="!isIcon&&icon" :class="['myp-color-'+iconType, 'myp-size-'+iconSize]" :style="iconStyle">{{icon}}</text>
		<text :class="['myp-color-'+textType, 'myp-size-'+textSize]" :style="'margin-top:'+space+';'+textStyle">{{text}}</text>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			/**
			 * 图标/图片/文字
			 */
			icon: {
				type: String,
				default: ''
			},
			/**
			 * 是否是图标
			 */
			isIcon: {
				type: Boolean,
				default: true
			},
			/**
			 * 文字
			 */
			text: {
				type: String,
				default: ''
			},
			/**
			 * 图标与文字的间距
			 */
			space: {
				type: String,
				default: '12rpx'
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: ''
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
			 * hover主题
			 */
			hover: {
				type: String,
				default: 'opacity'
			},
			/**
			 * 图标颜色主题
			 */
			iconType: {
				type: String,
				default: 'text'
			},
			/**
			 * 图标尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'll'
			},
			/**
			 * 图标样式
			 */
			iconStyle: {
				type: String,
				default: ''
			},
			/**
			 * 图标外层样式
			 */
			iconBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 文字颜色主题
			 */
			textType: {
				type: String,
				default: 'second'
			},
			/**
			 * 文字尺寸主题
			 */
			textSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 文字样式
			 */
			textStyle: {
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
		},
		methods: {
			toSelect() {
				this.$emit("itemClicked")
			}
		}
	}
</script>

<style lang="scss">
</style>
