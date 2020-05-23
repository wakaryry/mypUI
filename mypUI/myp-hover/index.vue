<template>
	<view ref="myp-hover" class="myp-hover" :style="boxStyle+posStyle+noWeexAni" @tap.stop.prevent="toStop">
		<slot></slot>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin("animation")
	// #endif
	
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			direction: {
				type: String,
				default: 'b2t' // l2r:left-2-right,r2l:right-2-left,b2t:bottom-2-top,t2b:top-2-bottom
			},
			// attention: l2r只考虑left/top，r2l只考虑right/top，b2t只考虑bottom/left,t2b只考虑left/top
			top: {
				type: [Number, String],
				default: '0'
			},
			right: {
				type: [Number, String],
				default: '0'
			},
			bottom: {
				type: [Number, String],
				default: '0'
			},
			left: {
				type: [Number, String],
				default: '0'
			},
			height: {
				type: [Number, String],
				default: '0'
			},
			width: {
				type: [Number, String],
				default: '0'
			},
			animationType: {
				type: String,
				default: 'height'  // width/height/width height
			},
			timingFunction: {
				type: String,
				default: 'ease'
			},
			duration: {
				type: Number,
				default: 300
			},
			delay: {
				type: Number,
				default: 0
			},
			// 默认使用fixed position，您可以在这里更改
			boxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				noWeexAni: ''
			}
		},
		computed: {
			posStyle() {
				let style = ''
				if (this.direction === 'l2r') {
					style += `left:${this.leftPx}px;top:${this.topPx}px;`
				} else if (this.direction === 'r2l') {
					style += `right:${this.rightPx}px;top:${this.topPx}px;`
				} else if (this.direction === 't2b') {
					style += `left:${this.leftPx}px;top:${this.topPx}px;`
				} else if (this.direction === 'b2t') {
					style += `left:${this.leftPx}px;bottom:${this.bottomPx}px;`
				}
				const h = this.height  // watch
				const w = this.width  // watch
				if (this.animationType === 'width') {
					style += `height:${this.heightPx}px;`
				} else if (this.animationType === 'height') {
					style += `width:${this.widthPx}px;`
				}
				return style
			},
			heightPx() {
				if (typeof this.height === 'number') {
					return uni.upx2px(this.height)
				}
				if (this.height.indexOf('rpx') >= 0) {
					return uni.upx2px(parseInt(this.height))
				}
				if (this.height.indexOf('px') >= 0) {
					return parseInt(this.height)
				}
				return uni.upx2px(parseInt(this.height))
			},
			widthPx() {
				if (typeof this.width === 'number') {
					return uni.upx2px(this.width)
				}
				if (this.width.indexOf('rpx') >= 0) {
					return uni.upx2px(parseInt(this.width))
				}
				if (this.width.indexOf('px') >= 0) {
					return parseInt(this.width)
				}
				return uni.upx2px(parseInt(this.width))
			},
			leftPx() {
				if (typeof this.left === 'number') {
					return uni.upx2px(this.left)
				}
				if (this.left.indexOf('rpx') >= 0) {
					return uni.upx2px(parseInt(this.left))
				}
				if (this.left.indexOf('px') >= 0) {
					return parseInt(this.left)
				}
				return uni.upx2px(parseInt(this.left))
			},
			topPx() {
				if (typeof this.top === 'number') {
					return uni.upx2px(this.top)
				}
				if (this.top.indexOf('rpx') >= 0) {
					return uni.upx2px(parseInt(this.top))
				}
				if (this.top.indexOf('px') >= 0) {
					return parseInt(this.top)
				}
				return uni.upx2px(parseInt(this.top))
			},
			rightPx() {
				if (typeof this.right === 'number') {
					return uni.upx2px(this.right)
				}
				if (this.right.indexOf('rpx') >= 0) {
					return uni.upx2px(parseInt(this.right))
				}
				if (this.right.indexOf('px') >= 0) {
					return parseInt(this.right)
				}
				return uni.upx2px(parseInt(this.right))
			},
			bottomPx() {
				if (typeof this.bottom === 'number') {
					return uni.upx2px(this.bottom)
				}
				if (this.bottom.indexOf('rpx') >= 0) {
					return uni.upx2px(parseInt(this.bottom))
				}
				if (this.bottom.indexOf('px') >= 0) {
					return parseInt(this.bottom)
				}
				return uni.upx2px(parseInt(this.bottom))
			}
		},
		watch: {
			show(newV) {
				this.toToggleShow(newV)
			}
		},
		created() {
			// #ifdef APP-NVUE
			setTimeout(()=>{
				const aRef = this.$refs['myp-hover']
				const anis = {}
				if (this.animationType === 'width') {
					anis['width'] = '0px'
				} else if (this.animationType === 'height') {
					anis['height'] = '0px'
				} else {
					anis['width'] = '0px'
					anis['height'] = '0px'
				}
				animation.transition(aRef, {
					styles: anis
				})
			}, 0)
			// #endif
		},
		methods: {
			toToggleShow(toShow) {
				// #ifdef APP-NVUE
				this.weexToggleShow(toShow)
				// #endif
				// #ifndef APP-NVUE
				this.noWeexToggleShow(toShow)
				// #endif
			},
			// #ifdef APP-NVUE
			weexToggleShow(toShow) {
				const aRef = this.$refs['myp-hover']
				if (toShow) {
					const anis = {}
					if (this.animationType === 'width') {
						anis['width'] = this.widthPx + 'px'
					} else if (this.animationType === 'height') {
						anis['height'] = this.heightPx + 'px'
					} else {
						anis['width'] = this.widthPx + 'px'
						anis['height'] = this.heightPx + 'px'
					}
					animation.transition(aRef, {
						styles: anis,
						duration: this.duration,
						delay: this.delay,
						timingFunction: this.timingFunction
					})
				} else {
					const anis = {}
					if (this.animationType === 'width') {
						anis['width'] = '0px'
					} else if (this.animationType === 'height') {
						anis['height'] = '0px'
					} else {
						anis['width'] = '0px'
						anis['height'] = '0px'
					}
					animation.transition(aRef, {
						styles: anis,
						duration: this.duration,
						delay: this.delay,
						timingFunction: this.timingFunction
					})
				}
			},
			// #endif
			noWeexToggleShow(toShow) {
				let style = `transition-property:${this.animationType};transition-duration:${this.duration}ms;transition-delay:${this.delay};transition-timing-function:${this.timingFunction};`
				if (toShow) {
					style += `width:${this.widthPx}px;height:${this.heightPx}px;`
				} else {
					if (this.animationType === 'width') {
						style += 'width:0px;'
					} else if (this.animationType === 'height') {
						style += 'height:0px;'
					} else {
						style += 'width:0px;height:0px;'
					}
				}
				this.noWeexAni = style
			},
			toStop(e) {
				e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../base.scss';
	
	.myp {
		&-hover {
			position: fixed;
			/* #ifdef APP-NVUE */
			overflow: hidden;
			// width: 0;
			// height: 0;
			/* #endif */
			/* #ifndef APP-NVUE */
			overflow: hidden;
			width: 0;
			height: 0;
			/* #endif */
		}
	}
</style>
