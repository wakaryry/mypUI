<template>
	<view>
		<view>
			<myp-overlay :show="overlayShow" :bg="overlay.bg" :duration="overlay.duration" :hasAnimation="overlay.hasAnimation" :timingFunction="overlay.timingFunction" :canAutoClose="false" @overlayClicked="mypOverlayClicked"></myp-overlay>
		</view>
		<view ref="myp-popup" v-if="helpShow" @click.stop="toPrevent" :class="['myp-popup', 'myp-bg-'+bgType, 'myp-popup-'+pos]" :style="mrPopStyle + noWeexAni">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = weex.requireModule('animation');
	// #endif
	
	import pxMixin from '../myp-mixin/pxMixin.js'
	import xBarMixin from '../myp-mixin/xBarMixin.js'

	export default {
		mixins: [pxMixin, xBarMixin],
		props: {
			show: {
				type: Boolean,
				default: false
			},
			pos: {
				type: String,
				default: 'bottom'
			},
			bgType: {
				type: String,
				default: 'none'
			},
			duration: {
				type: Number,
				default: 300
			},
			// in mp, we do not support v-bind="overlay". we need to list it
			overlay: {
				type: Object,
				default: () => ({
					hasAnimation: true,
					timingFunction: ['ease-in', 'ease-out'],
					duration: 300,
					bg: ''
				})
			},
			// 不包括xbar的高度，xBar的高度自动适配，不在这个高度之内
			height: {
				type: [Number, String],
				default: 0
			},
			// 对外露出的高度/宽度
			standOut: {
				type: [Number, String],
				default: 0
			},
			// 打开后与边框的距离. 可以通过其它方式实现，比如内容高度增加，然后背景色透明
			offset: {
				type: [Number, String],
				default: 0
			},
			width: {
				type: [Number, String],
				default: 750
			},
			animation: {
				type: Object,
				default: () => ({
					timingFunction: 'ease-in-out'
				})
			},
			left: {
				type: [Number, String],
				default: '0'
			},
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
			}
		},
		data() {
			return {
				// we need to add a v-if in overlay, 
				// or it will show upper on the popup content 
				overlayShow: false,
				helpShow: false,
				noWeexAni: '',
				isShow: false
			}
		},
		watch: {
			show(newV) {
				this.toHackShow(newV)
			}
		},
		computed: {
			mrPopStyle() {
				const {
					pos,
					width,
					height,
					standOut
				} = this;
				const stand = parseInt(standOut, 10);
				let windowHeight = 500
				if (pos === 'center') {
					try {
					    const res = uni.getSystemInfoSync();
					    windowHeight =  Number(res.screenHeight) + Number(res.statusBarHeight) + 40 
					} catch (e) {
					}
				}
				let style = {
					width: `${width}rpx`
				}
				if (parseInt(height) !== 0) {
					style['height'] = `${height}rpx`
				}
				pos === 'center' && (style = {
					...style,
					left: `${375 - Number(width)/ 2 }rpx`,
					height: `${height}rpx`,
					top: `${windowHeight/ 2 }rpx`
				});
				pos === 'top' && (style = {
					...style,
					left: `${375 - Number(width)/ 2 }rpx`,
					height: `${height}rpx`,
					top: `${-height + stand}rpx`
				});
				pos === 'bottom' && (style = {
					...style,
					left: `${375 - Number(width)/ 2 }rpx`,
					height: `${height}rpx`,
					bottom: `${-height + stand}rpx`
				});
				pos === 'left' && (style = {
					...style,
					left: `${-width + stand}rpx`,
					top: `${windowHeight/ 2 }rpx`
				});
				pos === 'right' && (style = {
					...style,
					right: `${-width + stand}rpx`,
					top: `${windowHeight/ 2 }rpx`
				});
				let _style = ""
				for (const i in style) {
					_style += i + ":" + style[i] + ';'
				}
				return _style
			},
			heightPx() {
				const a = this.height
				return this.mypToPx(this.height)
			},
			widthPx() {
				const a = this.width
				return this.mypToPx(this.width)
			},
			standOutPx() {
				const a = this.standOut
				return this.mypToPx(this.standOut)
			},
			offsetPx() {
				const a = this.offset
				return this.mypToPx(this.offset)
			}
		},
		methods: {
			toHackShow(bool) {
				if (bool) {
					// 先渲染元素
					this.overlayShow = true
					// 必须确保overlay先于popup-content渲染，将popup-content移入下一个loop
					setTimeout(()=>{
						this.helpShow = true
					}, 0)
					// app端不能同一个loop同步执行，否则overlay始终在最上层
					// this.helpShow = true
					// 为了能够获取到元素，且实现动画
					setTimeout(() => {
						this.appearPopup(bool);
					}, 50);
				} else {
					// 关闭动画需要执行动画之后再关闭v-if
					this.overlayShow = false
					this.appearPopup(bool)
				}
			},
			showPopup() {
				// ref method
			},
			hidePopup() {
				// ref method
				this.appearPopup(false);
				this.$refs.overlay.appearOverlay(false);
			},
			// since we can not auto close the overlay in popup, the event is just overlayClicked.
			// and we do not close the popup auto, so we could use it as a modal
			mypOverlayClicked() {
				this.isShow && (this.$emit('overlayClicked', {}));
			},
			appearPopup(bool, duration = this.duration) {
				// #ifdef APP-NVUE
				this.weexAppearPopup(bool, duration)
				// #endif
				// #ifndef APP-NVUE
				this.noWeexAppearPopup(bool, duration)
				// #endif
			},
			weexAppearPopup(bool, duration = this.duration) {
				this.isShow = bool;
				const popupEl = this.$refs['myp-popup'];
				if (!popupEl) {
					return;
				}
				const that = this
				animation.transition(popupEl, {
					styles: {
						transform: this.getTransform(this.pos, this.width, this.height, this.standOut, this.offset, !bool)
					},
					duration,
					delay: 0,
					...this.animation
				}, () => {
					if (!bool) {
						that.helpShow = false;
					}
				});
			},
			noWeexAppearPopup(bool, duration = this.duration) {
				this.isShow = bool
				let _style = "transition-property:transform;transition-duration:" + duration + 'ms;'
				_style += "transition-timing-function:" + this.animation.timingFunction + ';'
				_style += "transform:" + this.getTransform(this.pos, this.width, this.height, this.standOut, this.offset, !bool) + ';'
				this.noWeexAni = _style
				const that = this
				setTimeout(()=>{
					if (!bool) {
						that.helpShow = false;
					}
				}, duration)
			},
			getTransform(pos, width, height, stand, offset, bool) {
				let _size = pos === 'top' || pos === 'bottom' ? height : width;
				// 需要减去 standout，然后还要加上 offset
				_size = _size - parseInt(stand) + parseInt(offset)
				bool && (_size = 0);
				let _transform;
				// attention: it's must be px
				switch (pos) {
					case 'top':
						_transform = `translateY(${uni.upx2px(_size)}px)`;
						break;
					case 'bottom':
						_transform = `translateY(-${uni.upx2px(_size)}px)`;
						break;
					case 'left':
						_transform = `translateX(${uni.upx2px(_size)}px)`;
						break;
					case 'right':
						_transform = `translateX(-${uni.upx2px(_size)}px)`;
						break;
				}
				return _transform;
			},
			toPrevent(e) {
				e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-popup {
		position: fixed;
		width: 750rpx;
		
		&-top {
			left: 0;
			right: 0;
		}
		
		&-bottom {
			left: 0;
			right: 0;
		}
		
		&-left {
			bottom: 0;
			top: 0;
		}
		
		&-right {
			bottom: 0;
			top: 0;
		}
	}
</style>
