<template>
	<view :class="['myp-foot', 'myp-bg-'+bgType, fixed&&'myp-foot-fixed']" :style="mrBoxStyle">
		<slot></slot>
	</view>
</template>

<script>
	import windowMixin from '../myp-mixin/windowMixin.js'
	
	export default {
		mixins: [windowMixin],
		props: {
			fixed: {
				type: Boolean,
				default: false
			},
			pos: {
				type: String,
				default: 'bottom'
			},
			offset: {
				type: String,
				default: '0px'
			},
			bgType: {
				type: String,
				default: 'none'
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			offsetPx() {
				return this.mypGetHeight(this.offset)
			},
			mrBoxStyle() {
				return this.boxStyle + (this.pos === 'top' ? `top:${this.offsetPx}px;` : `bottom:${this.offsetPx}px;`)
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
