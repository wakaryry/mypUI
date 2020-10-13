<template>
	<view class="myp-flex-row myp-align-center myp-wrap-nowrap" :style="boxStyle">
		<view :class="['myp-stepper-action', 'myp-flex-row', 'myp-align-center', 'myp-justify-center', 'myp-bg-'+minusBgType, 'myp-radius-'+radius, (disabled||isLess)&&'myp-disabled']" :hover-class="'myp-hover-'+hover" :style="mrMinusBoxStyle" bubble="true" @click="minusClicked">
			<myp-icon :name="minus" :type="minusType" :iconStyle="mrMinusStyle" @iconClicked="minusClicked"></myp-icon>
		</view>
		<input :class="['myp-stepper-input', 'myp-size-'+valueSize, 'myp-color-'+valueType]" type="number" :style="mrValueStyle" :disabled="disabled||readOnly" :value="value" @input="onInput" @blur="onBlur" />
		<view :class="['myp-stepper-action', 'myp-flex-row', 'myp-align-center', 'myp-justify-center', 'myp-bg-'+plusBgType, 'myp-radius-'+radius, (disabled||isOver)&&'myp-disabled']" :hover-class="'myp-hover-'+hover" :style="mrPlusBoxStyle" bubble="true" @click="plusClicked">
			<myp-icon :name="plus" :type="plusType" :iconStyle="mrPlusStyle" @iconClicked="plusClicked"></myp-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			/**
			 * 最小值
			 */
			min: {
				type: Number,
				default: 1
			},
			/**
			 * 最大值
			 */
			max: {
				type: Number,
				default: 100
			},
			/**
			 * 步进长度/步长
			 */
			step: {
				type: Number,
				default: 1
			},
			/**
			 * 值
			 */
			value: {
				type: Number,
				default: 1
			},
			/**
			 * 是否禁用
			 */
			disabled: {
				type: Boolean,
				default: false
			},
			/**
			 * 输入框是否只读
			 */
			readOnly: {
				type: Boolean,
				default: true
			},
			/**
			 * 左侧减少的图标
			 */
			minus: {
				type: String,
				default: 'line'
			},
			/**
			 * 右侧增加的图标
			 */
			plus: {
				type: String,
				default: 'plus'
			},
			/**
			 * 加减按钮的圆角主题
			 */
			radius: {
				type: String,
				default: 's'
			},
			/**
			 * 左侧减按钮的背景主题
			 */
			minusBgType: {
				type: String,
				default: ''
			},
			/**
			 * 右侧加按钮的背景主题
			 */
			plusBgType: {
				type: String,
				default: ''
			},
			/**
			 * 加减按钮的hover主题
			 */
			hover: {
				type: String,
				default: 'opacity'
			},
			/**
			 * 中间值的颜色主题
			 */
			valueType: {
				type: String,
				default: 'text'
			},
			/**
			 * 中间值的尺寸主题
			 */
			valueSize: {
				type: String,
				default: 'l'
			},
			/**
			 * 值的样式
			 */
			valueStyle: {
				type: String,
				default: ''
			},
			/**
			 * 禁用时值的样式
			 */
			valueDisabledStyle: {
				type: String,
				default: ''
			},
			/**
			 * 减少图标的颜色主题
			 */
			minusType: {
				type: String,
				default: 'text'
			},
			/**
			 * 减少图标的样式
			 */
			minusStyle: {
				type: String,
				default: ''
			},
			/**
			 * 禁用时减少图标的样式
			 */
			minusDisabledStyle: {
				type: String,
				default: ''
			},
			/**
			 * 减少图标的外层样式
			 */
			minusBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 禁用时减少图标的外层样式
			 */
			minusBoxDisabledStyle: {
				type: String,
				default: ''
			},
			/**
			 * 增加图标的颜色主题
			 */
			plusType: {
				type: String,
				default: 'text'
			},
			/**
			 * 增加图标的样式
			 */
			plusStyle: {
				type: String,
				default: ''
			},
			/**
			 * 禁用时增加图标的样式
			 */
			plusDisabledStyle: {
				type: String,
				default: ''
			},
			/**
			 * 增加图标的外层样式
			 */
			plusBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 禁用时增加图标的外层样式
			 */
			plusBoxDisabledStyle: {
				type: String,
				default: ''
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			mrValueStyle() {
				let _style = this.valueStyle
				if (this.disabled || this.readOnly) {
					_style += this.valueDisabledStyle
				}
				return _style
			},
			mrMinusBoxStyle() {
				let _style = this.minusBoxStyle
				if (this.disabled || this.isLess) {
					_style += this.minusBoxDisabledStyle
				}
				return _style
			},
			mrMinusStyle() {
				let _style = this.minusStyle
				if (this.disabled || this.isLess) {
					_style += this.minusDisabledStyle
				}
				return _style
			},
			mrPlusBoxStyle() {
				let _style = this.plusBoxStyle
				if (this.disabled || this.isOver) {
					_style += this.plusBoxDisabledStyle
				}
				return _style
			},
			mrPlusStyle() {
				let _style = this.plusStyle
				if (this.disabled || this.isOver) {
					_style += this.plusDisabledStyle
				}
				return _style
			}
		},
		data: () => ({
			isLess: false,
			isOver: false
		}),
		created() {
			if (this.disabled) {
				this.isLess = true
				this.isOver = true
			}
		},
		watch: {
			value(newV) {
				if (newV <= this.min) {
					this.isLess = true
				} else if (newV >= this.max) {
					this.isOver = true
				} else {
					this.isLess = false
					this.isOver = false
				}
			}
		},
		methods: {
			minusClicked() {
				if (this.disabled) {
					return
				}
				const isMinOver = this.value <= this.min
				if (isMinOver) {
					this.$emit("less", this.value)
				} else {
					let nowNum = this.value - this.step
					if (nowNum <= this.min) {
						nowNum = this.min
					}
					this.$emit("input", nowNum)
					this.$emit("change", nowNum)
				}
			},
			plusClicked() {
				if (this.disabled) {
					return;
				}
				const isMaxOver = this.value >= this.max
				if (isMaxOver) {
					this.$emit("over", this.value)
				} else {
					let nowNum = this.value + this.step
					if (nowNum >= this.max) {
						nowNum = this.max
					}
					this.$emit("input", nowNum)
					this.$emit("change", nowNum)
				}
			},
			onInput(e) {
				this.correctInputValue(e.detail.value);
			},
			onBlur(e) {
				this.correctInputValue(e.detail.value);
			},
			correctInputValue(v) {
				const lastValue = this.value
				if (/^[1-9]\d{0,}$/.test(v)) {
					this.$emit("input", lastValue)
					this.$emit("change", lastValue)
					return
				}
				const vInt = parseInt(v, 10)
				if (vInt >= this.min && vInt <= this.max) {
					this.$emit("input", vInt)
					this.$emit("change", vInt)
				} else if (vInt < this.min) {
					this.$emit("input", this.min)
					this.$emit("change", this.min)
				} else {
					this.$emit("input", this.max)
					this.$emit("change", this.max)
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.myp-stepper {
		&-action {
			width: 60rpx;
			height: 60rpx;
		}
		&-input {
			border-width: 0;
			text-align: center;
			width: 90rpx;
			height: 60rpx;
		}
	}
</style>
