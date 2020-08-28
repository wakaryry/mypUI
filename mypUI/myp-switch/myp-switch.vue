<template>
	<view :class="[value?'myp-bg-'+onBgType:'myp-bg-'+bgType, disabled&&'myp-disabled']" :style="mrSwitchStyle" @click.stop="handleClick">
		<view :class="['myp-bg-'+animateBgType]" :style="mrAnimateStyle"></view>
		<view :class="['myp-bg-'+ballBgType]" :style="mrBallStyle"></view>
	</view>
</template>

<script>
	export default {
		props: {
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
			onBgType: {
				type: String,
				default: 'primary'
			},
			ballBgType: {
				type: String,
				default: ''
			},
			animateBgType: {
				type: String,
				default: ''
			},
			width: {
				type: String,
				default: '102rpx'
			},
			height: {
				type: String,
				default: '62rpx'
			},
			ballSize: {
				type: String,
				default: '58rpx'
			},
			ballBg: {
				type: String,
				default: ''
			},
			animateBg: {
				type: String,
				default: ''
			},
			bg: {
				type: String,
				default: ''
			},
			onBg: {
				type: String,
				default: ''
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
			switchOnStyle() {
				let _style = ""
				if (this.onBg && this.onBg.length > 0) {
					_style += `background-color:${this.onBg};`
				}
				return _style
			},
			mrSwitchStyle() {
				let _style = this.switchNormalStyle
				if (this.value) {
					_style += this.switchOnStyle
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
			ballOnStyle() {
				return `left:${this.ballOnSpace}rpx;`
			},
			mrBallStyle() {
				return this.value ? (this.ballStyle + this.ballOnStyle) : this.ballStyle
			},
			ballSpace() {
				const sh = parseInt(this.height)
				const bh = parseInt(this.ballSize)
				return (sh - bh) * 0.5
			},
			ballOnSpace() {
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
				return this.value ? (this.animateStyle + aniCS) : this.animateStyle
			}
		},
		methods: {
			handleClick(e) {
				if (!this.disabled) {
					this.$emit('input', !this.value)
					this.$emit('change', !this.value)
				}
				e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
