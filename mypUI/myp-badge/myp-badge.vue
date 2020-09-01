<template>
	<view :class="['myp-justfy-center', 'myp-align-center', 'myp-bg-'+bgType, 'myp-border-'+border]" :style="mrBoxStyle">
		<text :class="['myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{text}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			size: {
				type: String,
				default: '12rpx'
			},
			bgType: {
				type: String,
				default: 'error'
			},
			text: {
				type: [String, Number],
				default: ''
			},
			border: {
				type: String,
				default: 'none'
			},
			textType: {
				type: String,
				default: 'inverse'
			},
			textSize: {
				type: String,
				default: 'ss'
			},
			textStyle: {
				type: String,
				default: ''
			},
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
