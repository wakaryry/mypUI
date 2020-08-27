<template>
	<view class="myp-stepper" :style="boxStyle">
		<view :class="['myp-stepper-action', 'myp-bg-'+minusBgType, 'myp-radius-'+radius, (disabled||isLess)&&'myp-disabled']" :hover-class="'myp-hover-'+hover" :style="mrMinusBoxStyle" bubble="true" @click="minusClicked">
			<myp-icon :name="minus" :type="minusType" :iconStyle="mrMinusStyle" @iconClicked="minusClicked"></myp-icon>
		</view>
		<input :class="['myp-stepper-input', 'myp-size-'+valueSize, 'myp-color-'+valueType]" type="number" :style="mrValueStyle" :disabled="disabled||readOnly" :value="value" @input="onInput" @blur="onBlur" />
		<view :class="['myp-stepper-action', 'myp-bg-'+plusBgType, 'myp-radius-'+radius, (disabled||isOver)&&'myp-disabled']" :hover-class="'myp-hover-'+hover" :style="mrPlusBoxStyle" bubble="true" @click="plusClicked">
			<myp-icon :name="plus" :type="plusType" :iconStyle="mrPlusStyle" @iconClicked="plusClicked"></myp-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			min: {
				type: Number,
				default: 1
			},
			max: {
				type: Number,
				default: 100
			},
			step: {
				type: Number,
				default: 1
			},
			value: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			},
			readOnly: {
				type: Boolean,
				default: true
			},
			minus: {
				type: String,
				default: 'line'
			},
			plus: {
				type: String,
				default: 'plus'
			},
			radius: {
				type: String,
				default: 's'
			},
			minusBgType: {
				type: String,
				default: ''
			},
			plusBgType: {
				type: String,
				default: ''
			},
			hover: {
				type: String,
				default: 'opacity'
			},
			valueType: {
				type: String,
				default: 'text'
			},
			valueSize: {
				type: String,
				default: 'l'
			},
			valueStyle: {
				type: String,
				default: ''
			},
			valueDisabledStyle: {
				type: String,
				default: ''
			},
			minusType: {
				type: String,
				default: 'text'
			},
			minusStyle: {
				type: String,
				default: ''
			},
			minusDisabledStyle: {
				type: String,
				default: ''
			},
			minusBoxStyle: {
				type: String,
				default: ''
			},
			minusBoxDisabledStyle: {
				type: String,
				default: ''
			},
			plusType: {
				type: String,
				default: 'text'
			},
			plusStyle: {
				type: String,
				default: ''
			},
			plusDisabledStyle: {
				type: String,
				default: ''
			},
			plusBoxStyle: {
				type: String,
				default: ''
			},
			plusBoxDisabledStyle: {
				type: String,
				default: ''
			},
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
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		align-items: center;
		
		&-action {
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
			align-items: center;
			justify-content: center;
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
