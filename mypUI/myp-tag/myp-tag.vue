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
			text: {
				type: [Number, String],
				default: ""
			},
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
