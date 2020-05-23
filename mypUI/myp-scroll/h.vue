<template>
	<scroll-view :scroll="false" :scroll-x="true" :scroll-with-animation="true" :show-scrollbar="false" :class="['myp-bg-'+bgType]" :style="mrScrollStyle">
		<view :style="mrContentStyle">
			<slot></slot>
		</view>
	</scroll-view>
</template>

<script>
	//
	// h is the horizontal/row scroll-view
	// 尺寸的约定，默认不带单位或者number都是rpx，其它根据单位而定
	// bug: 在Android-app，如果我们设置`:scroll-y="false"`会导致无法横向滚动
	//
	export default {
		props: {
			bgType: {
				type: String,
				default: ''
			},
			// center或者end的时候，请注意items的数量不要超过总尺寸
			justify: {
				type: String,
				default: 'flex-start'
			},
			// width of the scroll-view
			width: {
				type: [String, Number],
				default: '750rpx'
			},
			height: {
				type: [String, Number],
				default: '260px'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			contentStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			mrScrollStyle() {
				let _style = "width:" + this.widthPx + 'px;'
				_style += "height:" + this.heightPx + 'px;'
				// #ifdef APP-NVUE
				_style += `flex-direction:row;justify-content:${this.justify};`
				// #endif
				return _style + this.boxStyle
			},
			// mp/h5以及Android-app都需要包裹
			mrContentStyle() {
				let _style = `flex-direction:row;justify-content:${this.justify};flex-wrap:nowrap;`
				return _style + this.contentStyle
			},
			widthPx() {
				if (typeof this.width === 'number') {
					return uni.upx2px(this.width)
				}
				if (this.width.indexOf('rpx') >= 0) {
					return uni.upx2px(parseInt(this.width))
				} else if (this.width.indexOf('px') >= 0) {
					return parseInt(this.width)
				}
				return uni.upx2px(parseInt(this.width))
			},
			heightPx() {
				if (typeof this.height === 'number') {
					return uni.upx2px(this.height)
				}
				if (this.height.indexOf('rpx') >= 0) {
					return uni.upx2px(parseInt(this.height))
				} else if (this.height.indexOf('px') >= 0) {
					return parseInt(this.height)
				}
				return uni.upx2px(parseInt(this.height))
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../base.scss';
</style>
