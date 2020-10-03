<template>
	<view :class="['myp-justify-center', 'myp-align-center', 'myp-bg-'+bgType, 'myp-border-'+border]" :style="mrBoxStyle">
		<text :class="['myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{text}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			// 圆点样式的直径大小，不是圆点时需要设置为0
			size: {
				type: String,
				default: '12rpx'
			},
			// 背景主题
			bgType: {
				type: String,
				default: 'error'
			},
			// 文字内容
			text: {
				type: [String, Number],
				default: ''
			},
			// 边框主题
			border: {
				type: String,
				default: 'none'
			},
			// 文字颜色主题
			textType: {
				type: String,
				default: 'inverse'
			},
			// 文字尺寸主题
			textSize: {
				type: String,
				default: 'ss'
			},
			// 文字样式
			textStyle: {
				type: String,
				default: ''
			},
			// 外层样式
			boxStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			mrBoxStyle() {
				if (!this.size || this.size.length === 0 || parseInt(this.size)===0) {
					return this.boxStyle
				}
				return `width:${this.size};height:${this.size};border-radius:${this.size};` + this.boxStyle
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
