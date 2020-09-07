<template>
	<view class="myp-radio-box" :style="boxStyle" bubble="true" @tap.stop="toToggle">
		<myp-icon v-if="direction==='left'" :name="checked?checkedIcon:icon" :type="mrIconType" :size="iconSize" :mode="iconMode" :iconStyle="mrIconStyle" :boxStyle="'margin-right:'+space+';'+iconBoxStyle" @iconClicked="toToggle"></myp-icon>
		<view :style="textBoxStyle">
			<text :class="['myp-color-'+mrTextType, 'myp-size-'+textSize]" :style="mrTextStyle">{{text}}</text>
		</view>
		<myp-icon v-if="direction==='right'" :name="checked?checkedIcon:icon" :type="mrIconType" :size="iconSize" :mode="iconMode" :iconStyle="mrIconStyle" :boxStyle="'margin-left:'+space+';'+iconBoxStyle" @iconClicked="toToggle"></myp-icon>
	</view>
</template>

<script>
	export default {
		props: {
			icon: {
				type: String,
				default: ''
			},
			checkedIcon: {
				type: String,
				default: ''
			},
			text: {
				type: String,
				default: ''
			},
			value: {
				type: [String, Number, Object],
				require: true
			},
			isBetween: {
				type: Boolean,
				default: false
			},
			checked: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			textType: {
				type: String,
				default: ''
			},
			checkedTextType: {
				type: String,
				default: ''
			},
			disabledTextType: {
				type: String,
				default: 'disabled'
			},
			iconType: {
				type: String,
				default: ''
			},
			checkedIconType: {
				type: String,
				default: ''
			},
			disabledIconType: {
				type: String,
				default: 'disabled'
			},
			textSize: {
				type: String,
				default: ''
			},
			iconSize: {
				type: String,
				default: 'l'
			},
			space: {
				type: String,
				default: '12rpx'
			},
			// radio logo in left or right
			direction: {
				type: String,
				default: 'left'
			},
			textStyle: {
				type: String,
				default: ''
			},
			disabledTextStyle: {
				type: String,
				default: ''
			},
			checkedTextStyle: {
				type: String,
				default: ''
			},
			iconStyle: {
				type: String,
				default: ''
			},
			iconMode: {
				type: String,
				default: 'aspectFill'
			},
			disabledIconStyle: {
				type: String,
				default: ''
			},
			checkedIconStyle: {
				type: String,
				default: ''
			},
			boxStyle: {
				type: String,
				default: ''
			},
			iconBoxStyle: {
				type: String,
				default: ''
			}
		},
		methods: {
			toToggle(e) {
				e && e.stopPropagation && e.stopPropagation()
				if (this.disabled) {
					return
				}
				this.$emit("itemClicked", this.value)
			}
		},
		computed: {
			mrTextStyle() {
				let _style = this.textStyle
				if (this.checked) {
					_style += this.checkedTextStyle
				}
				if (this.disabled) {
					_style += this.disabledTextStyle
				}
				return _style
			},
			mrTextType() {
				if (this.disabled) {
					return this.disabledTextType
				}
				if (this.checked) {
					return this.checkedTextType
				}
				return this.textType
			},
			mrIconType() {
				if (this.disabled) {
					return this.disabledIconType
				}
				if (this.checked) {
					return this.checkedIconType
				}
				return this.iconType
			},
			mrIconStyle() {
				let _style = this.iconStyle
				if (this.checked) {
					_style += this.checkedIconStyle
				}
				if (this.disabled) {
					_style += this.disabledIconStyle
				}
				return _style
			},
			textBoxStyle() {
				if (this.isBetween) {
					return "flex:1;"
				}
				return ""
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-radio-box {
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
	}
</style>
