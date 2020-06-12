<template>
	<view :class="[checked ? 'myp-bg-'+checkedType : 'myp-bg-'+bgType, disabled && 'myp-disabled']" :style="mrSwitchStyle" @click.stop.prevent="handleClick">
		<view :class="['myp-bg-'+animateType]" :style="mrAnimateStyle"></view>
		<view :class="['myp-bg-'+ballType]" :style="mrBallStyle"></view>
	</view>
</template>

<script>
	export default {
		props: {
			// it means checked
			value: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			bgType: {
				type: String,
				default: 'border'
			},
			// 控制checked时的背景色
			checkedType: {
				type: String,
				default: 'primary'
			},
			ballType: {
				type: String,
				default: ''
			},
			animateType: {
				type: String,
				default: ''
			},
			// 整体宽度
			width: {
				type: String,
				default: '102rpx'
			},
			// 因为这个需要用到这个高度来做计算，所以没有使用 scss-height style
			height: {
				type: String,
				default: '62rpx'
			},
			// 移动圆球的大小
			ballSize: {
				type: String,
				default: '58rpx'
			},
			// 移动圆球的背景色
			ballBg: {
				type: String,
				default: ''
			},
			// 可收缩背景的背景色
			animateBg: {
				type: String,
				default: ''
			},
			// 开关的背景，一般用于露出部分作为边框色彩
			bg: {
				type: String,
				default: ''
			},
			// 开关打开时的背景色
			checkedBg: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				// 可以自响应。即使没有绑定v-model或者value
				checked: this.value
			}
		},
		computed: {
			switchNormalStyle() {
				let _style = `width:${this.width};height:${this.height};position:relative;overflow:hidden;`
				_style += `border-radius:${this.height};`
				if (this.bg && this.bg.length > 0) {
					_style += `background-color:${this.bg};`
				}
				return _style
			},
			switchCheckedStyle() {
				let _style = ""
				if (this.checkedBg && this.checkedBg.length > 0) {
					_style += `background-color:${this.checkedBg};`
				}
				return _style
			},
			mrSwitchStyle() {
				let _style = this.switchNormalStyle
				if (this.checked) {
					_style += this.switchCheckedStyle
				}
				return _style
			},
			ballStyle() {
				let _style = `width:${this.ballSize};height:${this.ballSize};border-radius:${this.ballSize};`
				if (this.ballBg && this.ballBg.length > 0) {
					_style += `background-color:${this.ballBg};`
				}
				_style += `position:absolute;transition-property:left;transition-duration: 200ms;transition-timing-function:ease;box-shadow:4rpx 4rpx 8rpx rgba(0, 0, 0, 0.2);`
				_style += `left:${this.ballSpace}rpx;`
				return _style
			},
			ballCheckedStyle() {
				return `left:${this.ballCheckedSpace}rpx;`
			},
			mrBallStyle() {
				return this.checked ? (this.ballStyle + this.ballCheckedStyle) : this.ballStyle
			},
			ballSpace() {
				const sh = parseInt(this.height)
				const bh = parseInt(this.ballSize)
				return (sh - bh) * 0.5
			},
			ballCheckedSpace() {
				const sw = parseInt(this.width)
				const bw = parseInt(this.ballSize)
				return sw - bw - this.ballSpace
			},
			animateWidth() {
				const sw = parseInt(this.width)
				return sw - this.ballSpace * 2
			},
			animateStyle() {
				let _style = `position:absolute;transition-property:transform;transition-duration:200ms;transition-timing-function:ease;transform:scale(1);`
				_style += `width:${this.animateWidth}rpx;height:${this.ballSize};border-radius:${this.ballSize};`
				if (this.animateBg && this.animateBg.length > 0) {
					_style += `background-color:${this.animateBg};`
				}
				_style += `left:${this.ballSpace}rpx;top:${this.ballSpace}rpx;`
				return _style
			},
			mrAnimateStyle() {
				const aniCS = "transform:scale(0);"
				return this.checked ? (this.animateStyle + aniCS) : this.animateStyle
			}
		},
		methods: {
			handleClick(e) {
				if (!this.disabled) {
					this.checked = !this.checked
					this.$emit('input', this.checked)
					this.$emit('change', this.checked)
				}
				e.stopPropagation()
			}
		},
		watch: {
			value(newVal) {
				this.checked = newVal
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../base.scss';
</style>
