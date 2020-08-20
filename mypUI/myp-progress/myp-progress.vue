<template>
	<view :class="['myp-bg-'+bgType]" :style="boxStyle+'width:'+width+';'">
		<view :class="['myp-bg-'+progressBgType]" :style="progressStyle+runStyle"></view>
	</view>
</template>

<script>
	export default {
		props: {
			progress: {
				type: Number,
				default: 0
			},
			width: {
				type: String,
				default: '600rpx'
			},
			bgType: {
				type: String,
				default: 'light'
			},
			progressBgType: {
				type: String,
				default: 'primary'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			progressStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			runStyle() {
				if (this.progress === 0) {
					return 'width: 0;'
				}
				if (this.progress >= 1) {
					return `width:${this.width};`
				}
				if (this.width.indexOf('rpx') >= 0 || this.width.indexOf('upx') >= 0) {
					const w = parseInt(this.width) * this.progress
					return `width:${w}rpx;`
				}
				const w = parseInt(this.width) * this.progress
				return `width:${w}px;`
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
