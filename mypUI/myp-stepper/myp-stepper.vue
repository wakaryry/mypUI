<template>
	<view class="myp-stepper">
		<view :class="['myp-stepper-action', 'myp-bg-'+type, 'myp-radius-'+radius, 'myp-wh-'+height, (disabled||isLess)&&'myp-disabled']" aria-label="减数" :accessible="true" :style="mrMinusBoxStyle" @click="minusClicked">
			<myp-icon v-if="useIcon&&minIcon&&minIcon.length>0" :name="minIcon" :type="type&&type.length>0?'inverse':'second'" :size="actionSize" :iconStyle="mrMinusTextStyle"></myp-icon>
			<text v-else :class="['myp-size'+actionSize, 'myp-color-'+(type&&type.length>0?'inverse':'second')]" :style="mrMinusTextStyle">-</text>
		</view>
		<input :class="['myp-stepper-input', 'myp-hlh-'+height, 'myp-size-'+size, 'myp-color-']" type="number" :style="mrInputStyle" :disabled="disabled||readOnly" :value="value" @input="onInput" @blur="onBlur" />
		<view :class="['myp-stepper-action', 'myp-bg-'+type, 'myp-radius-'+radius, 'myp-wh-'+height, (disabled||isOver)&&'myp-disabled']" aria-label="加数" :accessible="true" :style="mrPlusBoxStyle" @click="plusClicked">
			<myp-icon v-if="useIcon&&maxIcon&&maxIcon.length>0" :name="maxIcon" :type="type&&type.length>0?'inverse':'second'" :size="actionSize" :iconStyle="mrPlusTextStyle"></myp-icon>
			<text v-else :class="['myp-size'+actionSize, 'myp-color-'+(type&&type.length>0?'inverse':'second')]" :style="mrPlusTextStyle">+</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			min: {
				type: [String, Number],
				default: 1
			},
			max: {
				type: [String, Number],
				default: 100
			},
			step: {
				type: [String, Number],
				default: 1
			},
			defaultValue: {
				type: [String, Number],
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			},
			readOnly: {
				type: Boolean,
				default: false
			},
			useIcon: {
				type: Boolean,
				default: true
			},
			minIcon: {
				type: String,
				default: 'line'
			},
			maxIcon: {
				type: String,
				default: 'plus'
			},
			type: {
				type: String,
				default: ''
			},
			radius: {
				type: String,
				default: 's'
			},
			size: {
				type: String,
				default: 'l'
			},
			actionSize: {
				type: String,
				default: 'll'
			},
			height: {
				type: String,
				default: ''
			},
			inputWidth: {
				type: String,
				default: '90rpx'
			},
			inputStyle: {
				type: String,
				default: ''
			},
			inputDisabledStyle: {
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
			minusTextStyle: {
				type: String,
				default: ''
			},
			minusTextDisabledStyle: {
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
			plusTextStyle: {
				type: String,
				default: ''
			},
			plusTextDisabledStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			mrInputStyle() {
				let _style = `width:${this.inputWidth};`
				_style += this.inputStyle
				if (this.disabled || this.readOnly) {
					// _style += "color:#CCCCCC;"
					_style += this.inputDisabledStyle
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
			mrMinusTextStyle() {
				let _style = this.minusTextStyle
				if (this.disabled || this.isLess) {
					// _style += "color:#CCCCCC;"
					_style += this.minusTextDisabledStyle
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
			mrPlusTextStyle() {
				let _style = this.plusTextStyle
				if (this.disabled || this.isOver) {
					// _style += "color:#CCCCCC;"
					_style += this.plusTextDisabledStyle
				}
				return _style
			}
		},
		data: () => ({
			value: 1,
			isLess: false,
			isOver: false
		}),
		watch: {
			defaultValue(newNum) {
				this.value = newNum;
			}
		},
		created() {
			this.value = parseInt(this.defaultValue, 10);
			if (this.disabled) {
				this.isLess = true;
				this.isOver = true;
			}
		},
		methods: {
			minusClicked() {
				if (this.disabled) {
					return;
				}
				const isMinOver = this.value <= this.min;
				const nowNum = this.value - parseInt(this.step, 10);
				if (isMinOver) {
					this.$emit('minOver', {
						value: this.value
					});
				} else {
					this.value = nowNum;
					this.resetDisabledStyle();
				}
				// 由于此处已经减step
				if (nowNum <= this.min) {
					this.value = parseInt(this.min, 10);
					this.isLess = true;
				}
				this.$emit('valueChanged', {
					value: this.value
				});
			},
			plusClicked() {
				if (this.disabled) {
					return;
				}
				const isMaxOver = this.value >= this.max;
				const nowNum = this.value + parseInt(this.step, 10);
				if (isMaxOver) {
					this.$emit('maxOver', {
						value: this.value
					});
				} else {
					this.value = nowNum;
					this.resetDisabledStyle();
				}
				// 由于此处已经加step
				if (nowNum >= this.max) {
					this.value = parseInt(this.max, 10);
					this.isOver = true;
				}
				this.$emit('valueChanged', {
					value: this.value
				});
			},
			onInput(e) {
				this.correctInputValue(e.detail.value);
			},
			onBlur(e) {
				this.correctInputValue(e.detail.value);
			},
			correctInputValue(v) {
				const lastValue = this.value;
				if (/^[1-9]\d{0,}$/.test(v) && parseInt(v, 10) >= this.min && parseInt(v, 10) <= this.max) {
					this.value = parseInt(v, 10);
				} else {
					this.value = '';
					setTimeout(() => {
						this.value = lastValue;
					}, 1);
				}
				this.$emit('valueChanged', {
					value: this.value
				});
			},
			resetDisabledStyle() {
				this.isLess = false;
				this.isOver = false;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.myp-stepper {
		flex-direction: row;
		
		&-action {
			align-items: center;
			justify-content: center;
		}
		
		&-input {
			border-width: 0;
			text-align: center;
		}
	}
</style>
