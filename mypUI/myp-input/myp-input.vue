<template>
	<view :class="['myp-input', 'myp-bg-'+bgType, 'myp-height-'+height, 'myp-radius-'+radius, 'myp-border-'+border]" :style="boxStyle">
		<myp-icon v-if="icon&&icon.length>0" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="'margin-right:'+space+';'+iconBoxStyle"></myp-icon>
		<slot name="label">
			<text v-if="label&&label.length>0" :class="['myp-color-'+labelType, 'myp-size-'+labelSize]" :style="'margin-right:'+space+';'+labelStyle">{{label||''}}</text>
		</slot>
		<!-- #ifndef APP-NVUE -->
		<view :class="['myp-input-box', 'myp-height-'+height]" :style="inputBoxHeightStyle">
			<view :class="['myp-input-place', 'myp-input-place-'+valueAlign]">
				<text v-if="showPlaceholder" :class="['myp-size-'+placeSize, 'myp-color-'+placeType]" :style="placeStyle">{{placeholder||''}}</text>
			</view>
			<view class="myp-input-input">
				<input :type="type" :adjust-position="adjust" :confirm-type="confirmType" :maxlength="maxlength" :value="inputValue||''" :password="password" :class="['myp-color-'+valueType, 'myp-size-'+valueSize]" :style="'text-align:'+valueAlign+';'+valueStyle" @input="handleInputedText" @confirm="handleConfirmText" @focus="toFocus" @blur="toBlur" @keyboardheightchange="toChangeKb" />
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<view class="myp-input-box">
			<view :class="['myp-input-place', 'myp-input-place-'+valueAlign]">
				<text v-if="showPlaceholder" :class="['myp-size-'+placeSize, 'myp-color-'+placeType]" :style="placeStyle">{{placeholder||''}}</text>
			</view>
			<input :type="type" :adjust-position="adjust" :confirm-type="confirmType" :maxlength="maxlength" :value="inputValue||''" :password="password" :class="['myp-color-'+valueType, 'myp-size-'+valueSize]" :style="'text-align:'+valueAlign+';'+valueStyle" @input="handleInputedText" @confirm="handleConfirmText" @focus="toFocus" @blur="toBlur" @keyboardheightchange="toChangeKb" />
		</view>
		<!-- #endif -->
		<slot name="extra"></slot>
		<myp-icon v-if="indicator&&indicator.length>0" :name="indicator" :type="indicatorType" :size="indicatorSize" :iconStyle="indicatorStyle" :boxStyle="'margin-left:'+space+';'+indicatorBoxStyle" @iconClicked="rightTapped"></myp-icon>
	</view>
</template>

<script>
	import {cssToJs} from '../utils/utils.js'
	
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
			type: {
				type: String,
				default: "text"
			},
			maxlength: {
				type: Number,
				default: 140
			},
			password: {
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
			indicator: {
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
			valueType: {
				type: String,
				default: ''
			},
			valueSize: {
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
			indicatorType: {
				type: String,
				default: ''
			},
			indicatorSize: {
				type: String,
				default: 'l'
			},
			placeType: {
				type: String,
				default: 'place'
			},
			placeSize: {
				type: String,
				default: ''
			},
			adjust: {
				type: Boolean,
				default: true
			},
			confirmType: {
				type: String,
				default: 'done'
			},
			iconStyle: {
				type: String,
				default: ''
			},
			iconBoxStyle: {
				type: String,
				default: ''
			},
			labelStyle: {
				type: String,
				default: ""
			},
			valueStyle: {
				type: String,
				default: 'flex:1;'
			},
			indicatorStyle: {
				type: String,
				default: ''
			},
			indicatorBoxStyle: {
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
			},
			placeStyle: {
				type: String,
				default: ''
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
			// #ifndef APP-NVUE
			inputBoxHeightStyle() {
				if (this.boxStyle && this.boxStyle.length >= 10) {
					const cssJs = cssToJs(this.boxStyle)
					if (cssJs.height) {
						return `height:${cssJs.height};`
					}
				}
				return ''
			},
			// #endif
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
			}
		},
		methods: {
			toFocus(e) {
				this.$emit("focus", e)
			},
			toBlur(e) {
				this.$emit("blur", e)
			},
			toChangeKb(e) {
				this.$emit("keyboardHeightChange", e)
			},
			handleInputedText(e) {
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
			handleConfirmText(e) {
				this.$emit("confirm", e.detail.value)
			},
			rightTapped() {
				this.$emit('indicatorClicked')
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
		&-input {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			flex-direction: row;
			align-items: center;
		}
	}
</style>
