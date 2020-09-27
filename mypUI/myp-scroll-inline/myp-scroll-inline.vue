<template>
	<scroll-view :scroll="false" :scroll-x="true" :scroll-left="leftPx" :scroll-with-animation="true" :show-scrollbar="false" :class="['myp-bg-'+bgType]" :style="mrScrollStyle">
		<!-- the child must use display: inline-block -->
		<slot></slot>
	</scroll-view>
</template>

<script>
	import {getPx} from '../utils/system.js'
	
	export default {
		props: {
			bgType: {
				type: String,
				default: ''
			},
			width: {
				type: String,
				default: '750rpx'
			},
			height: {
				type: String,
				default: '260px'
			},
			left: {
				type: String,
				default: '0'
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			leftPx() {
				return getPx(this.left)
			},
			mrScrollStyle() {
				let _style = "width:" + this.width + ';'
				_style += "height:" + this.height + ';'
				return _style + 'white-space: nowrap;' + this.boxStyle
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
