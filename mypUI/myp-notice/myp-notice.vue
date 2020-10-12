<template>
	<view v-if="showing" :class="['myp-noticebar', 'myp-bg-'+bgType, 'myp-height-'+height, 'myp-border-'+border, 'myp-radius-'+radius]" :style="boxStyle" bubble="true" @tap.stop="noticeBarClicked">
		<myp-icon v-if="icon" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="'margin-right:'+space+';'+iconBoxStyle" @iconClicked="noticeBarClicked"></myp-icon>
		<text :class="['myp-noticebar-text', 'myp-size-'+textSize, 'myp-color-'+textType]" :style="textStyle">{{text}}</text>
		<myp-icon v-if="indicator" :name="indicator" :type="indicatorType" :size="indicatorSize" :iconStyle="indicatorStyle" :boxStyle="'margin-left:'+space+';'+indicatorBoxStyle" @iconClicked="indicatorClicked"></myp-icon>
	</view>
</template>

<script>
	export default {
		props: {
			/**
			 * 左侧图标
			 */
			icon: {
				type: String,
				default: null
			},
			/**
			 * 文字内容
			 */
			text: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标
			 */
			indicator: {
				type: String,
				default: null
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 高度主题
			 */
			height: {
				type: String,
				default: 'base'
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
				default: ''
			},
			/**
			 * 文字颜色主题
			 */
			textType: {
				type: String,
				default: ''
			},
			/**
			 * 文字尺寸主题
			 */
			textSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 图标主题
			 */
			iconType: {
				type: String,
				default: ''
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
			 * 右侧图标颜色主题
			 */
			indicatorType: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标尺寸主题
			 */
			indicatorSize: {
				type: String,
				default: 'll'
			},
			/**
			 * 右侧图标样式
			 */
			indicatorStyle: {
				type: String,
				default: ''
			},
			/**
			 * 间距
			 */
			space: {
				type: String,
				default: '12rpx'
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
			},
			/**
			 * 图标外层样式
			 */
			iconBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标外层样式
			 */
			indicatorBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 是否可以关闭
			 */
			closable: {
				type: Boolean,
				default: false
			}
		},
		data: () => ({
			showing: true
		}),
		methods: {
			show() {
				this.showing = true
			},
			hide() {
				this.showing = false
			},
			noticeBarClicked(e) {
				e.stopPropagation && e.stopPropagation()
				this.$emit("noticeClicked")
			},
			indicatorClicked() {
				if (this.closable) {
					this.showing = false
				} else {
					this.$emit("indicatorClicked")
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.myp-noticebar {
		padding-left: 32rpx;
		padding-right: 32rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		align-items: center;
		
		&-text {
			flex: 1;
			lines: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			/* #ifndef APP-NVUE */
			white-space: nowrap;
			/* #endif */
		}
	}
</style>
