<template>
	<view class="myp-position-relative" :style="mrBoxStyle">
		<view ref="myp-container" :style="mrContainerStyle+noWeexAni">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	// #endif
	
	import {getPx, getXBarHeight, getHeight, getStatusBarHeight, getNavbarHeight} from '../utils/system.js'
	
	export default {
		props: {
			/**
			 * 内容宽度
			 */
			width: {
				type: String,
				default: '750rpx'
			},
			/**
			 * 当前位置索引
			 */
			current: {
				type: Number,
				default: 0
			},
			number: {
				type: Number,
				default: 2
			},
			animated: {
				type: Boolean,
				default: true
			},
			duration: {
				type: Number,
				default: 300
			},
			timeFunction: {
				type: String,
				default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			containerStyle: {
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
			widthPx() {
				return getPx(this.width)
			},
			mrBoxStyle() {
				return this.boxStyle + `width: ${this.widthPx}px;`
			},
			mrContainerStyle() {
				return this.containerStyle+`width: ${this.widthPx * this.number}px;flex-direction: row;flex-wrap:nowrap;`
			}
		},
		methods: {
			toCurrentIndex(i) {
				const {
					duration,
					timingFunction
				} = this;
				const computedDur = this.animated ? duration : 0.00001;
				const dist = this.current * this.widthPx;
				// #ifdef APP-NVUE
				const containerEl = this.$refs[`myp-container`];
				animation.transition(containerEl, {
					styles: {
						transform: `translateX(${-dist}px)`
					},
					duration: computedDur,
					timingFunction,
					delay: 0
				}, () => {});
				// #endif
				// #ifndef APP-NVUE
				this.noWeexAni = `transition-property:transform;transition-duration:${computedDur}ms;transform:translateX(${-dist}px);transition-timing-function:${timingFunction};`
				// #endif
			}
		},
		mounted() {
			// #ifndef APP-NVUE
			this.toCurrentIndex(this.current)
			// #endif
			// #ifdef APP-NVUE
			const that = this
			setTimeout(()=>{
				that.toCurrentIndex(that.current)
			}, 0)
			// #endif
		},
		watch: {
			current(newV) {
				this.toCurrentIndex(newV)
			}
		}
	}
</script>

<style>
</style>
