<template>
	<view :class="['myp-tag-box', 'myp-height-'+height, 'myp-bg-'+mrBgType, 'myp-border-'+mrBorder, 'myp-border-color-'+mrBorderType, 'myp-radius-'+radius, disabled && 'myp-disabled']" :style="mrBoxStyle" @tap="toSelect">
		<slot>
			<text :class="['myp-size-'+textSize, 'myp-color-'+mrTextType]" :style="mrTextStyle">{{text}}</text>
		</slot>
	</view>
</template>

<script>
	// 默认是动态宽度的，在flex-direction为row的时候
	// 事实上这只是一个壳子，您可以任意添加内容
	export default {
		props: {
			text: {
				type: [Number, String],
				default: ""
			},
			// 独一无二
			value: {
				type: [String, Number],
				default: ''
			},
			// i.e active
			selected: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			bgType: {
				type: String,
				default: ''
			},
			selectedBgType: {
				type: String,
				default: ''
			},
			textType: {
				type: String,
				default: ''
			},
			selectedTextType: {
				type: String,
				default: ''
			},
			disabledTextType: {
				type: String,
				default: 'disabled'
			},
			textSize: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: ''
			},
			border: {
				type: String,
				default: 'all'
			},
			selectedBorder: {
				type: String,
				default: 'all'
			},
			borderType: {
				type: String,
				default: 'border'
			},
			selectedBorderType: {
				type: String,
				default: 'border'
			},
			radius: {
				type: String,
				default: 'base'
			},
			space: {
				type: String,
				default: '16rpx'
			},
			textStyle: {
				type: String,
				default: ''
			},
			selectedTextStyle: {
				type: String,
				default: ''
			},
			disabledTextStyle: {
				type: String,
				default: ''
			},
			// width/height等可以在这里设置
			boxStyle: {
				type: String,
				default: ''
			},
			selectedBoxStyle: {
				type: String,
				default: ''
			},
			disabledBoxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				// 如果一个组件的状态应该依赖外部来改变，而不能自身响应改变的时候，我们不需要提供内部响应的状态。
				// 这种情况下，如果外部不绑定状态，用户操作是无响应的。
				// 这类组件，适用于 单选/多选 类组件。而不是 能够直接自己更改状态的 toggle
			}
		},
		computed: {
			mrBorder() {
				if (this.selected) {
					return this.selectedBorder
				}
				return this.border
			},
			mrBorderType() {
				if (this.selected) {
					return this.selectedBorderType
				}
				return this.borderType
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
			toSelect() {
				if (!this.disabled) {
					this.$emit("tagClicked", {
						selected: this.selected,
						value: this.value
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../base.scss';
	
	.myp-tag-box {
		justify-content: center;
		align-items: center;
	}
</style>
 