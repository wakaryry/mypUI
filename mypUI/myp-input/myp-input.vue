<template>
	<view :class="['myp-input', 'myp-bg-'+bgType, 'myp-height-'+height, 'myp-radius-'+radius, 'myp-border-'+border]" :style="boxStyle">
		<view v-if="icon&&icon.length>0" :style="{'margin-right': space}">
			<myp-icon :name="icon" :type="mrIconType" :size="iconSize" :iconStyle="iconStyle"></myp-icon>
		</view>
		<slot name="label">
			<text v-if="label&&label.length>0" :class="['myp-color-'+mrLabelType, 'myp-size-'+labelSize]" :style="mrLabelStyle">{{label||''}}</text>
		</slot>
		<view class="myp-input-box">
			<view :class="['myp-input-place', 'myp-input-place-'+valueAlign]">
				<text v-if="showPlaceholder" :class="['myp-size-'+placeSize, 'myp-color-'+mrPlaceType]">{{placeholder||''}}</text>
			</view>
			<input :type="mode" :maxlength="maxlength" :value="inputValue||''" :password="isSecret" :class="['myp-color-'+mrInputType, 'myp-size-'+inputSize]" :style="mrInputStyle" @input="inputedText" @confirm="confirmText" />
		</view>
		<slot name="extra"></slot>
		<view v-if="action&&action.length>0" bubble="true" @tap="rightTapped" :style="{'margin-left': space}">
			<myp-icon :name="action" :type="actionType" :size="actionSize" :iconStyle="actionStyle" @iconClicked="rightTapped"></myp-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 格式，每一段的长度:[3, 4, 4]
			format: {
				type: Array,
				default: ()=>{return []}
			},
			separator: {
				type: String,
				default: " "
			},
			// it's input's type
			mode: {
				type: String,
				default: "text"
			},
			maxlength: {
				type: Number,
				default: 140
			},
			isSecret: {
				type: Boolean,
				default: false
			},
			icon: {
				type: String,
				default: ''
			},
			label: {
				type: String,
				default: ""
			},
			value: {
				type: String,
				default: ""
			},
			placeholder: {
				type: String,
				default: "请输入内容"
			},
			action: {
				type: String,
				default: ''
			},
			// 因为placeholder没有使用input自己的，我们需要利用valueAlign来为placeholder排版
			valueAlign: {
				type: String,
				default: 'left'
			},
			bgType: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: ''
			},
			border: {
				type: String,
				default: 'bottom'
			},
			radius: {
				type: String,
				default: ''
			},
			inputType: {
				type: String,
				default: ''
			},
			inputSize: {
				type: String,
				default: ''
			},
			iconType: {
				type: String,
				default: ''
			},
			iconSize: {
				type: String,
				default: 'l'
			},
			labelType: {
				type: String,
				default: ''
			},
			labelSize: {
				type: String,
				default: ''
			},
			actionType: {
				type: String,
				default: ''
			},
			actionSize: {
				type: String,
				default: 'l'
			},
			placeType: {
				type: String,
				default: ''
			},
			placeSize: {
				type: String,
				default: ''
			},
			iconStyle: {
				type: String,
				default: ''
			},
			labelStyle: {
				type: String,
				default: ""
			},
			inputStyle: {
				type: String,
				default: ''
			},
			actionStyle: {
				type: String,
				default: ''
			},
			boxStyle: {
				type: String,
				default: ""
			},
			// 内部元素之间的空隙
			space: {
				type: String,
				default: '12rpx'
			}
		},
		data() {
			return {
				// 防止在h5端直接显示null为字符串
				inputValue: this.value||'',
				formatRawValue: this.value||''
			}
		},
		created() {
			if (this.formatable) {
				this.inputValue = this.toFormatText(this.value)
			}
		},
		watch: {
			value(newV) {
				if (this.formatable) {
					if (this.formatRawValue !== newV) {
						this.formatRawValue = newV
						this.inputValue = this.toFormatText(newV)
					}
				} else {
					// change when not the same
					if (this.inputValue !== newV) {
						this.inputValue = newV
					}
				}
			}
		},
		computed: {
			formatable() {
				return this.separator && this.separator.length > 0 && this.format && this.format.length > 0
			},
			showPlaceholder() {
				if (!this.inputValue) {
					return true
				}
				const inStr = this.inputValue + ''
				if (inStr && inStr.length > 0) {
					return false
				}
				return true
			},
			mrIconType() {
				if (this.iconType && this.iconType.length > 0) {
					return this.iconType
				}
				return this.bgType && this.bgType.length > 0 ? 'inverse' : ''
			},
			mrLabelType() {
				if (this.labelType && this.labelType.length > 0) {
					return this.labelType
				}
				return this.bgType && this.bgType.length > 0 ? 'inverse' : ''
			},
			mrPlaceType() {
				if (this.placeType && this.placeType.length > 0) {
					return this.placeType
				}
				return this.bgType && this.bgType.length > 0 ? 'inverse' : 'place'
			},
			mrInputType() {
				if (this.inputType && this.inputType.length > 0) {
					return this.inputType
				}
				return this.bgType && this.bgType.length > 0 ? 'inverse' : ''
			},
			mrActionType() {
				if (this.actionType && this.actionType.length > 0) {
					return this.actionType
				}
				return this.bgType && this.bgType.length > 0 ? 'inverse' : ''
			},
			mrLabelStyle() {
				let _style = `margin-right:${this.space};`
				return _style + this.labelStyle
			},
			mrInputStyle() {
				let _style = `text-align:${this.valueAlign};`
				return _style + this.inputStyle
			}
		},
		methods: {
			inputedText(e) {
				const _val = e.detail.value || ''
				if (this.formatable) {
					this.inputValue = this.toFormatText(_val)
					this.formatRawValue = this.inputValue.split(this.separator).join("")
					this.$emit("input", this.formatRawValue)
					this.$emit("formated", this.inputValue)
				} else {
					this.inputValue = e.detail.value
					this.$emit("input", e.detail.value)
				}
			},
			confirmText(e) {
				this.$emit("confirm", e.detail.value)
			},
			rightTapped() {
				this.$emit('rightAction')
			},
			// 这个格式化 使得我们不能输入 separator
			toFormatText(val) {
				let _val = val
				if (this.formatable) {
					const oldVal = val.split(this.separator).join("")
					const valLength = oldVal.length
					const formatLength = this.format.length
					let position = 0
					const valArr = []
					for (const i in this.format) {
						const length = this.format[i]
						if (valLength > position + length) {
							valArr.push(oldVal.substr(position, length))
							position += length
						} else {
							valArr.push(oldVal.substr(position))
							break
						}
					}
					_val = valArr.join(this.separator)
					if (_val.length > this.maxlength) {
						_val = oldVal
					}
				}
				return _val
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-input {
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		&-box {
			flex: 1;
			position: relative;
		}
		&-place {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			flex-direction: row;
			align-items: center;
			&-left {
				justify-content: flex-start;
			}
			&-center {
				justify-content: center;
			}
			&-right {
				justify-content: flex-end;
			}
		}
	}
</style>
