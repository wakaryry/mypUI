<template>
	<view :class="['myp-flex-row', 'myp-align-center', 'myp-wrap-nowrap', 'myp-bg-'+bgType, 'myp-height-'+height, 'myp-radius-'+radius, 'myp-border-'+border]" :style="boxStyle">
		<myp-icon v-if="icon&&icon.length>0" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="'margin-right:'+space+';'+iconBoxStyle"></myp-icon>
		<slot name="label">
			<text v-if="label&&label.length>0" :class="['myp-color-'+labelType, 'myp-size-'+labelSize]" :style="'margin-right:'+space+';'+labelStyle">{{label||''}}</text>
		</slot>
		<!-- #ifndef APP-NVUE -->
		<view :class="['myp-flex-one', 'myp-position-relative', 'myp-height-'+height]" :style="inputBoxHeightStyle">
			<view :class="['myp-flex-row', 'myp-align-center', 'myp-input-place', 'myp-input-place-'+valueAlign]">
				<text v-if="showPlaceholder" :class="['myp-size-'+placeSize, 'myp-color-'+placeType]" :style="placeStyle">{{placeholder||''}}</text>
			</view>
			<view class="myp-flex-row myp-align-center myp-input-input">
				<input :disabled="disabled" :focus="focus" :type="type" :adjust-position="adjust" :confirm-type="confirmType" :maxlength="maxlength" :value="inputValue||''" :password="password" :class="['myp-color-'+valueType, 'myp-size-'+valueSize]" :style="'text-align:'+valueAlign+';'+valueStyle" @input="handleInputedText" @confirm="handleConfirmText" @focus="toFocus" @blur="toBlur" @keyboardheightchange="toChangeKb" />
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<view class="myp-flex-one myp-position-relative">
			<view :class="['myp-flex-row', 'myp-align-center', 'myp-input-place', 'myp-input-place-'+valueAlign]">
				<text v-if="showPlaceholder" :class="['myp-size-'+placeSize, 'myp-color-'+placeType]" :style="placeStyle">{{placeholder||''}}</text>
			</view>
			<input :disabled="disabled" :focus="focus" :type="type" :adjust-position="adjust" :confirm-type="confirmType" :maxlength="maxlength" :value="inputValue||''" :password="password" :class="['myp-color-'+valueType, 'myp-size-'+valueSize]" :style="'text-align:'+valueAlign+';'+valueStyle" @input="handleInputedText" @confirm="handleConfirmText" @focus="toFocus" @blur="toBlur" @keyboardheightchange="toChangeKb" />
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
			/**
			 * 自定义格式，每一段的长度:[3, 4, 4]
			 */
			format: {
				type: Array,
				default: ()=>{return []}
			},
			/**
			 * 自定义格式的分割器
			 */
			separator: {
				type: String,
				default: " "
			},
			/**
			 * input的type
			 */
			type: {
				type: String,
				default: "text"
			},
			/**
			 * 最大输入
			 */
			maxlength: {
				type: Number,
				default: 140
			},
			/**
			 * 是否密码
			 */
			password: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否聚焦
			 */
			focus: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否禁用
			 */
			disabled: {
				type: Boolean,
				default: false
			},
			/**
			 * 左侧图标
			 */
			icon: {
				type: String,
				default: ''
			},
			/**
			 * 左侧label文字
			 */
			label: {
				type: String,
				default: ""
			},
			/**
			 * 值
			 */
			value: {
				type: String,
				default: ""
			},
			/**
			 * placeholder
			 */
			placeholder: {
				type: String,
				default: "请输入内容"
			},
			/**
			 * 右侧图标
			 */
			indicator: {
				type: String,
				default: ''
			},
			/**
			 * 文字排版
			 */
			valueAlign: {
				type: String,
				default: 'left'
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 高度主题
			 */
			height: {
				type: String,
				default: ''
			},
			/**
			 * 边框主题
			 */
			border: {
				type: String,
				default: 'bottom'
			},
			/**
			 * 圆角主题
			 */
			radius: {
				type: String,
				default: ''
			},
			/**
			 * 值颜色主题
			 */
			valueType: {
				type: String,
				default: ''
			},
			/**
			 * 值尺寸主题
			 */
			valueSize: {
				type: String,
				default: ''
			},
			/**
			 * 图标颜色主题
			 */
			iconType: {
				type: String,
				default: ''
			},
			/**
			 * 图标尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'l'
			},
			/**
			 * label颜色主题
			 */
			labelType: {
				type: String,
				default: ''
			},
			/**
			 * label尺寸主题
			 */
			labelSize: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标颜色主题
			 */
			indicatorType: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标尺寸主题
			 */
			indicatorSize: {
				type: String,
				default: 'l'
			},
			/**
			 * placeholder颜色主题
			 */
			placeType: {
				type: String,
				default: 'place'
			},
			/**
			 * placeholder尺寸主题
			 */
			placeSize: {
				type: String,
				default: ''
			},
			/**
			 * 键盘adjust-position弹出方式
			 */
			adjust: {
				type: Boolean,
				default: true
			},
			/**
			 * confirm-type
			 */
			confirmType: {
				type: String,
				default: 'done'
			},
			/**
			 * 图标样式
			 */
			iconStyle: {
				type: String,
				default: ''
			},
			/**
			 * 图标外层样式
			 */
			iconBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * label样式
			 */
			labelStyle: {
				type: String,
				default: ""
			},
			/**
			 * 值样式
			 */
			valueStyle: {
				type: String,
				default: 'flex:1;'
			},
			/**
			 * 右侧图标样式
			 */
			indicatorStyle: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标外层样式
			 */
			indicatorBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ""
			},
			/**
			 * 内部各元素之间的空隙
			 */
			space: {
				type: String,
				default: '12rpx'
			},
			/**
			 * placeholder的样式
			 */
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
		&-place {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			
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
		}
	}
</style>
