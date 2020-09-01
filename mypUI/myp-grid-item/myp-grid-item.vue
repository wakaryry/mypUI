<template>
	<view :class="['myp-item', flexDirection==='row' ? 'myp-item-row':'myp-item-column']" :hover-class="'myp-hover-'+hover" :style="boxStyle" bubble="true" @tap="clickedItem">
		<text v-if="textFirst" :class="['myp-color-'+textType, 'myp-size-'+textSize]" :style="mrTextStyle">{{text}}</text>
		<myp-icon v-if="isIcon" :name="icon" :type="iconType" :size="iconSize" :mode="iconMode" :iconStyle="iconStyle" :boxStyle="iconBoxStyle" @iconClicked="clickedItem"></myp-icon>
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
			isIcon: {
				type: Boolean,
				default: true
			},
			text: {
				type: [String, Number],
				default: ''
			},
			space: {
				type: String,
				default: '12rpx'
			},
			// top/right/bottom/left 分别表示icon排布的位置
			mode: {
				type: String,
				default: 'top'
			},
			textType: {
				type: String,
				default: 'text'
			},
			textSize: {
				type: String,
				default: 'base'
			},
			iconType: {
				type: String,
				default: 'text'
			},
			iconSize: {
				type: String,
				default: 'll'
			},
			iconMode: {
				type: String,
				default: 'aspectFill'
			},
			hover: {
				type: String,
				default: 'opacity'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			// 文字/图片/图标的样式设置
			iconStyle: {
				type: String,
				default: ''
			},
			iconBoxStyle: {
				type: String,
				default: ''
			},
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
		justify-content: center;
		align-items: center;
		position: relative;
		
		&-row {
			flex-direction: row;
			flex-wrap: nowrap;
		}
		&-column {
			flex-direction: column;
			flex-wrap: nowrap;
		}
	}
</style>
