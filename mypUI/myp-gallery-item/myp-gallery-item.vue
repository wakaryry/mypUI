<template>
	<view class="myp-banner-item" :style="mrItemStyle+mrFirstMargin+mrLastMargin" @tap="clicked">
		<view ref="myp-banner-item" class="myp-banner-item-body" :style="mrItemStyle">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		inject: ['mypBannerRoot'],
		data() {
			return {
				index: 0,
				isFirst: false,
				isLast: false
			}
		},
		created() {
			if (this.mypBannerRoot.children) {
				this.index = this.mypBannerRoot.children.length
				this.mypBannerRoot.children.push(this)
			}
		},
		computed: {
			mrItemStyle() {
				if (!this.mypBannerRoot) {
					return ''
				}
				return this.mypBannerRoot.mrItemStyle
			},
			mrFirstMargin() {
				if (!this.mypBannerRoot) {
					return ''
				}
				return this.isFirst ? this.mypBannerRoot.firstMargin : ''
			},
			mrLastMargin() {
				if (!this.mypBannerRoot) {
					return ''
				}
				return this.isLast ? this.mypBannerRoot.lastMargin : ''
			}
		},
		methods: {
			clicked() {
				this.mypBannerRoot.$emit('selected', this.index)
			},
			initLayout() {
				if (this.index === 0) {
					this.isFirst = true
				}
				if (this.index === this.mypBannerRoot.children.length - 1) {
					this.isLast = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-banner {
		&-item {
			overflow: hidden;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			
			&-body {
				overflow: hidden;
			}
		}
	}
</style>
