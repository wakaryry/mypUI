<template>
	<view :class="['myp-item', flexDirection==='row' ? 'myp-item-row':'myp-item-column']" :hover-class="'myp-hover-'+hover" :style="boxStyle" bubble="true" @tap="clickedItem">
		<text v-if="textFirst" :class="['myp-color-'+textType, 'myp-size-'+textSize]" :style="mrTextStyle">{{text}}</text>
		<myp-icon v-if="isIcon" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="iconBoxStyle" @iconClicked="clickedItem"></myp-icon>
		<text v-if="!isIcon" :class="['myp-color-'+iconType, 'myp-size-'+iconSize]" :style="iconStyle">{{icon}}</text>
		<text v-if="!textFirst" :class="['myp-color-'+textType, 'myp-size-'+textSize]" :style="mrTextStyle">{{text}}</text>
		<slot name="extra"></slot>
	</view>
</template>

<script>
	export default {
		props: {
			// 文字/图标/图片
			icon: {
				type: [String, Number],
				default: ''
			},
			// icon是否是图标
			isIcon: {
				type: Boolean,
				default: true
			},
			// 文字内容
			text: {
				type: [String, Number],
				default: ''
			},
			// 图标与文字的间距
			space: {
				type: String,
				default: '12rpx'
			},
			// top/right/bottom/left 分别表示icon排布的位置
			mode: {
				type: String,
				default: 'top'
			},
			// 文字颜色主题
			textType: {
				type: String,
				default: 'text'
			},
			// 文字尺寸主题
			textSize: {
				type: String,
				default: 'base'
			},
			// 图标颜色主题
			iconType: {
				type: String,
				default: 'text'
			},
			// 图标尺寸主题
			iconSize: {
				type: String,
				default: 'll'
			},
			// hover主题
			hover: {
				type: String,
				default: 'opacity'
			},
			// 外层样式
			boxStyle: {
				type: String,
				default: ''
			},
			// 文字/图片/图标的样式
			iconStyle: {
				type: String,
				default: ''
			},
			// 图标的外层样式
			iconBoxStyle: {
				type: String,
				default: ''
			},
			// 文字样式
			textStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			flexDirection() {
				if (this.mode === 'left' || this.mode === 'right') {
					return 'row'
				}
				return 'column'
			},
			textFirst() {
				if (this.mode === 'left' || this.mode === 'top') {
					return false
				}
				return true
			},
			mrTextStyle() {
				const _space = "margin-" + this.mode + ':' + this.space + ';'
				return _space + this.textStyle
			}
		},
		methods: {
			clickedItem() {
				this.$emit("itemClicked")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-item {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		justify-content: center;
		align-items: center;
		position: relative;
		
		&-row {
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
			flex-wrap: nowrap;
		}
		&-column {
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: column;
			flex-wrap: nowrap;
		}
	}
</style>
