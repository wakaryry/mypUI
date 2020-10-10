<template>
	<view :class="['myp-tag-box', 'myp-height-'+height, 'myp-bg-'+mrBgType, 'myp-border-'+mrBorder, 'myp-radius-'+radius, disabled && 'myp-disabled']" :style="mrBoxStyle" @tap.stop="toSelect">
		<slot>
			<text :class="['myp-size-'+textSize, 'myp-color-'+mrTextType]" :style="mrTextStyle">{{text}}</text>
		</slot>
		<slot name="extra"></slot>
	</view>
</template>

<script>
	export default {
		props: {
			// 文字内容
			text: {
				type: [Number, String],
				default: ""
			},
			// 唯一值
			value: {
				type: [String, Number],
				default: ''
			},
			// 是否选中/活跃
			selected: {
				type: Boolean,
				default: false
			},
			// 是否禁用
			disabled: {
				type: Boolean,
				default: false
			},
			// 背景主题
			bgType: {
				type: String,
				default: ''
			},
			// 选中时背景主题
			selectedBgType: {
				type: String,
				default: ''
			},
			// 文字颜色主题
			textType: {
				type: String,
				default: ''
			},
			// 选中时文字颜色主题
			selectedTextType: {
				type: String,
				default: ''
			},
			// 禁用时文字颜色主题
			disabledTextType: {
				type: String,
				default: 'disabled'
			},
			// 文字尺寸主题
			textSize: {
				type: String,
				default: ''
			},
			// 高度主题
			height: {
				type: String,
				default: ''
			},
			// 边框主题
			border: {
				type: String,
				default: 'all'
			},
			// 选中时边框主题
			selectedBorder: {
				type: String,
				default: 'all'
			},
			// 圆角主题
			radius: {
				type: String,
				default: 'base'
			},
			// 左右两侧的padding
			space: {
				type: String,
				default: '16rpx'
			},
			// 文字样式
			textStyle: {
				type: String,
				default: ''
			},
			// 选中时文字样式
			selectedTextStyle: {
				type: String,
				default: ''
			},
			// 禁用时文字样式
			disabledTextStyle: {
				type: String,
				default: ''
			},
			// 外层样式
			boxStyle: {
				type: String,
				default: ''
			},
			// 选中时文字样式
			selectedBoxStyle: {
				type: String,
				default: ''
			},
			// 禁用时文字样式
			disabledBoxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
			}
		},
		computed: {
			mrBorder() {
				if (this.selected) {
					return this.selectedBorder
				}
				return this.border
			},
			mrBgType() {
				if (this.selected) {
					return this.selectedBgType
				}
				return this.bgType
			},
			mrTextType() {
				if (this.selected) {
					if (this.disabled) {
						if (this.disabledTextType && this.disabledTextType.length > 0) {
							return this.disabledTextType
						}
						return this.selectedBgType && this.selectedBgType.length > 0 ? 'inverse' : ''
					}
					if (this.selectedTextType && this.selectedTextType.length > 0) {
						return this.selectedTextType
					}
					return this.selectedBgType && this.selectedBgType.length > 0 ? 'inverse' : ''
				}
				if (this.disabled) {
					if (this.disabledTextType && this.disabledTextType.length > 0) {
						return this.disabledTextType
					}
					return this.bgType && this.bgType.length > 0 ? 'inverse' : ''
				}
				if (this.textType && this.textType.length > 0) {
					return this.textType
				}
				return this.bgType && this.bgType.length > 0 ? 'inverse' : ''
			},
			mrBoxStyle() {
				let _style = `padding-left:${this.space};padding-right:${this.space};`
				_style += this.boxStyle
				if (this.selected) {
					_style += this.selectedBoxStyle
				}
				if (this.disabled) {
					_style += this.disabledBoxStyle
				}
				return _style
			},
			mrTextStyle() {
				let _style = this.textStyle
				if (this.selected) {
					_style += this.selectedTextStyle
				}
				if (this.disabled) {
					_style += this.disabledTextStyle
				}
				return _style
			}
		},
		methods: {
			toSelect(e) {
				if (!this.disabled) {
					this.$emit("tagClicked", {
						selected: this.selected,
						value: this.value
					})
				}
				e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-tag-box {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		justify-content: center;
		align-items: center;
	}
</style>
