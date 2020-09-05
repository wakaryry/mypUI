<template>
	<view bubble="true" :class="['myp-button', 'myp-border-'+border, 'myp-bg-'+bgType, 'myp-height-'+height, 'myp-radius-'+radius, (disabled||loading)?'myp-disabled':'']" :style="boxStyle" :hover-class="(!disabled && !loading) ? ('myp-hover-'+hover): ''" @click.stop="clickedButton">
		<slot>
			<myp-loading-indicator v-if="loading" :width="loadingWidth" :height="loadingHeight" :src="loadingSrc"></myp-loading-indicator>
			<myp-icon v-if="!loading && icon && icon.length > 0" :name="icon" :type="iconType" :mode="iconMode" :size="iconSize" :boxStyle="iconBoxStyle" :iconStyle="iconStyle" @iconClicked="clickedButton"></myp-icon>
			<text v-if="text&&text.length>0" :class="['myp-color-'+textType, 'myp-size-'+textSize]" :style="mrTextStyle">{{text}}</text>
			<myp-icon v-if="icon2 && icon2.length > 0" :name="icon2" :type="icon2Type" :mode="icon2Mode" :size="icon2Size" :boxStyle="mrIcon2BoxStyle" :iconStyle="icon2Style" @iconClicked="clickedButton"></myp-icon>
		</slot>
		<slot name="extra"></slot>
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
				default: ''
			},
			icon: {
				type: String,
				default: ''
			},
			icon2: {
				type: String,
				default: ''
			},
			loading: {
				type: Boolean,
				default: false
			},
			loadingSrc: {
				type: String,
				default: '/static/ui/loading.gif'
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
			icon2Mode: {
				type: String,
				default: 'aspectFill'
			},
			icon2Type: {
				type: String,
				default: ''
			},
			icon2Size: {
				type: String,
				default: 'l'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			textStyle: {
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
			icon2BoxStyle: {
				type: String,
				default: ''
			},
			icon2Style: {
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
				return _style
			},
			mrIcon2BoxStyle() {
				let _style = ''
				_style += `margin-left: ${this.space};`
				return _style + this.icon2BoxStyle
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
		position: relative;
	}
</style>
