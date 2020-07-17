<template>
	<view class="myp-radio-box" :style="boxStyle" bubble="true" @tap="toToggle">
		<view v-if="direction==='left'" :style="{'margin-right': space}">
			<slot name="radio">
				<myp-icon :name="mrIcon" :type="mrIconType" :size="iconSize" :mode="iconMode" :iconStyle="mrIconStyle" @iconClicked="toToggle"></myp-icon>
			</slot>
		</view>
		<slot>
			<view :style="titleBoxStyle">
				<text :class="['myp-color-'+mrTitleType, 'myp-size-'+titleSize]" :style="mrTitleStyle">{{title}}</text>
			</view>
		</slot>
		<view v-if="direction==='right'" :style="{'margin-left': space}">
			<slot name="radio">
				<myp-icon :name="mrIcon" :type="mrIconType" :size="iconSize" :mode="iconMode" :iconStyle="mrIconStyle" @iconCLicked="toToggle"></myp-icon>
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// radio/radio-fill/circle-check/box-check/circle-fill-check/box-fill-check/check/custom
			mode: {
				type: String,
				default: 'radio'
			},
			iconMode: {
				type: String,
				default: 'aspectFill'
			},
			// when mode is custom
			icon: {
				type: String,
				default: ''
			},
			checkedIcon: {
				type: String,
				default: ''
			},
			title: {
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
			// 我们对外开放了很多的props，对于某些props，你可以直接使用，你也可以只使用一个就能达成目的，看您个人喜好
			titleType: {
				type: String,
				default: ''
			},
			checkedTitleType: {
				type: String,
				default: ''
			},
			disabledTitleType: {
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
			titleSize: {
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
			titleStyle: {
				type: String,
				default: ''
			},
			disabledTitleStyle: {
				type: String,
				default: ''
			},
			checkedTitleStyle: {
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
			checkedIconStyle: {
				type: String,
				default: ''
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		methods: {
			toToggle() {
				if (this.disabled) {
					return
				}
				this.$emit("radioClicked", this.value)
			}
		},
		computed: {
			mrTitleStyle() {
				let _style = this.titleStyle
				if (this.checked) {
					_style += this.checkedTitleStyle
				}
				if (this.disabled) {
					_style += this.disabledTitleStyle
				}
				return _style
			},
			mrTitleType() {
				if (this.disabled) {
					return this.disabledTitleType
				}
				if (this.checked) {
					return this.checkedTitleType
				}
				return this.titleType
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
			mrIcon() {
				let _icon = "circle"
				switch (this.mode){
					case 'radio':
						if (this.checked) {
							_icon = "radio"
						} else {
							_icon = "circle"
						}
						break;
					case 'radio-fill':
						if (this.checked) {
							_icon = "solid-radio"
						} else {
							_icon = "circle"
						}
						break;
					case 'circle-check':
						if (this.checked) {
							_icon = "circle-check"
						} else {
							_icon = "circle"
						}
						break;
					case 'box-check':
						if (this.checked) {
							_icon = "box-check"
						} else {
							_icon = "box"
						}
						break;
					case 'circle-fill-check':
						if (this.checked) {
							_icon = "solid-circle-check"
						} else {
							_icon = "circle"
						}
						break;
					case 'box-fill-check':
						if (this.checked) {
							_icon = "solid-box-check"
						} else {
							_icon = "box"
						}
						break;
					case 'check':
						if (this.checked) {
							_icon = "check"
						} else {
							_icon = ""
						}
						break;
					case 'custom':
						if (this.checked) {
							_icon = this.checkedIcon
						} else {
							_icon = this.icon
						}
					default:
						if (this.checked) {
							_icon = "radio"
						} else {
							_icon = "circle"
						}
						break;
				}
				return _icon
			},
			titleBoxStyle() {
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
