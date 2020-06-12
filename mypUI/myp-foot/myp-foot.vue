<template>
	<view :class="['myp-foot', fixed&&'myp-foot-fixed']" :style="mrBoxStyle">
		<slot></slot>
	</view>
</template>

<script>
	import windowMixin from '../myp-mixin/windowMixin.js'
	import pxMixin from '../myp-mixin/pxMixin.js'
	
	export default {
		mixins: [windowMixin, pxMixin],
		props: {
			fixed: {
				type: Boolean,
				default: false
			},
			bottom: {
				type: String,
				default: '0px'
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			// 附加到bottom上面，防止事件阻塞
			mrBoxStyle() {
				let bt = this.bottom
				bt = this.mypToPx(this.bottom)
				const xh = this.mypGetXBarHeight()
				bt = bt + xh
				return this.boxStyle + 'bottom:' + bt + 'px;'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-foot {
		position: absolute;
		
		&-fixed {
			position: fixed;
		}
	}
</style>
