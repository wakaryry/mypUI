<template>
	<view bubble="true" :class="['myp-button', 'myp-border-'+border, 'myp-bg-'+bgType, 'myp-height-'+height, 'myp-radius-'+radius, (disabled||loading)?'myp-disabled':'']" :style="mrBtnStyle" :hover-class="(!disabled && !loading) ? ('myp-hover-'+hover): ''" @click.stop="clickedButton">
		<slot>
			<view v-if="loading" :style="{width: loadingWidth, height: loadingHeight}">
				<myp-loading-indicator :width="loadingWidth" :height="loadingHeight" :src="loadingSrc"></myp-loading-indicator>
			</view>
			<view v-if="!loading && icon && icon.length > 0">
				<myp-icon :name="icon" :type="mrIconType" :mode="iconMode" :size="iconSize" :boxStyle="iconBoxStyle" :iconStyle="mrIconStyle" @iconClicked="clickedButton"></myp-icon>
			</view>
			<text v-if="text&&text.length>0" :class="['myp-color-'+mrTextType, 'myp-size-'+textSize]" :style="mrTextStyle">{{text}}</text>
		</slot>
	</view>
</template>

<script>
	export default {
		props: {
			bgType: {
				type: String,
				default: ''
			},
			text: {
				type: String,
				default: '确定'
			},
			icon: {
				type: String,
				default: ''
			},
			loading: {
				type: Boolean,
				default: false
			},
			loadingSrc: {
				type: String,
				default: '../myp-loading-indicator/loading.gif'
			},
			height: {
				type: String,
				default: 'l'
			},
			// hover: opacity/bg/bg-opacity
			hover: {
				type: String,
				default: 'opacity'
			},
			radius: {
				type: String,
				default: 'base'
			},
			border: {
				type: String,
				default: 'all'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			highlight: {
				type: Boolean,
				default: false
			},
			space: {
				type: String,
				default: '12rpx'
			},
			textType: {
				type: String,
				default: ''
			},
			textSize: {
				type: String,
				default: ''
			},
			iconMode: {
				type: String,
				default: 'aspectFill'
			},
			iconType: {
				type: String,
				default: ''
			},
			iconSize: {
				type: String,
				default: 'l'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			disabledStyle: {
				type: String,
				default: ''
			},
			highlightStyle: {
				type: String,
				default: ''
			},
			textStyle: {
				type: String,
				default: ''
			},
			disabledTextStyle: {
				type: String,
				default: ''
			},
			highlightTextStyle: {
				type: String,
				default: ''
			},
			iconBoxStyle: {
				type: String,
				default: ''
			},
			iconStyle: {
				type: String,
				default: ''
			},
			disabledIconStyle: {
				type: String,
				default: ''
			},
			highlightIconStyle: {
				type: String,
				default: ''
			},
			loadingWidth: {
				type: String,
				default: '36rpx'
			},
			loadingHeight: {
				type: String,
				default: '36rpx'
			}
		},
		computed: {
			mrIconType() {
				if (this.iconType&&this.iconType.length>0) {
					return this.iconType
				}
				return this.bgType&&this.bgType.length>0 ? 'inverse' : ''
			},
			mrTextType() {
				if (this.textType&&this.textType.length>0) {
					return this.textType
				}
				return this.bgType&&this.bgType.length>0 ? 'inverse' : ''
			},
			mrBtnStyle() {
				let _style = this.boxStyle
				if (this.loading || this.disabled) {
					_style += this.disabledStyle
				} else if (this.highlight) {
					_style += this.highlightStyle
				}
				return _style
			},
			mrTextStyle() {
				let _style = ''
				if (this.text && this.text.length > 0) {
					if (this.loading) {
						_style += `margin-left: ${this.space};`
					} else {
						if (this.icon && this.icon.length > 0) {
							_style += `margin-left: ${this.space};`
						}
					}
				}
				_style += this.textStyle
				if (this.loading || this.disabled) {
					_style += this.disabledTextStyle
				} else if (this.highlight) {
					_style += this.highlightTextStyle
				}
				return _style
			},
			mrIconStyle() {
				let _style = this.iconStyle
				if (this.loading || this.disabled) {
					_style += this.disabledIconStyle
				} else if (this.highlight) {
					_style += this.highlightIconStyle
				}
				return _style
			}
		},
		methods: {
			clickedButton(e) {
				if (!this.disabled && !this.loading) {
					this.$emit('buttonClicked')
				}
				e && e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-button {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>
