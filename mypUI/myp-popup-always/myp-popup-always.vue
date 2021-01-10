<template>
	<view>
		<view ref="myp-popo-overlay" :class="['myp-popo-over', 'myp-bg-'+overlay.bgType]" @touchmove.stop="toPrevent" @tap.stop="overlayClose" :style="mrOverlayStyle + overlayNoWeexAni">
			<slot name="overlay"></slot>
		</view>
		<view ref="myp-popo" @touchmove.stop="toPrevent" @tap.stop="toPrevent" :class="['myp-popo', 'myp-flex-column', 'myp-bg-'+bgType]" :style="boxStyle+mrPopStyle + noWeexAni">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	//
	// 一直存在，不通过v-if控制，直接控制是否在可见屏幕内
	// 支持standout
	//
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	// #endif
	
	import {getHeight, getPx, getScreenHeight} from '../utils/system.js'
	// TODO: add height animation: height-0->height
	export default {
		props: {
			/**
			 * 是否打开/展示
			 */
			show: {
				type: Boolean,
				default: false
			},
			/**
			 * 定位位置
			 */
			pos: {
				type: String,
				default: 'bottom'
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: 'none'
			},
			/**
			 * 动画周期
			 */
			duration: {
				type: Number,
				default: 300
			},
			/**
			 * 遮罩层设置
			 */
			overlay: {
				type: Object,
				default: () => ({
					timingFunction: ['ease-in', 'ease-out'],
					duration: 300,
					bg: '',
					bgType: 'mask'
				})
			},
			/**
			 * 自定义高度
			 */
			height: {
				type: String,
				default: '0'
			},
			/**
			 * 需要从屏幕高度额外减去的高度
			 */
			extra: {
				type: String,
				default: '0'
			},
			/**
			 * 提前显示在可见屏幕内的高度
			 */
			standout: {
				type: String,
				default: '0'
			},
			/**
			 * 内容与屏幕左侧的距离
			 */
			leftOffset: {
				type: String,
				default: '-1'
			},
			/**
			 * 内容与屏幕右侧的距离
			 */
			rightOffset: {
				type: String,
				default: '-1'
			},
			/**
			 * 内容与屏幕底部的距离
			 */
			bottomOffset: {
				type: String,
				default: '-1'
			},
			/**
			 * 内容与屏幕顶部的距离
			 */
			topOffset: {
				type: String,
				default: '-1'
			},
			/**
			 * 自定义宽度
			 */
			width: {
				type: String,
				default: '750rpx'
			},
			/**
			 * 动画函数
			 */
			animation: {
				type: Object,
				default: () => ({
					timingFunction: 'ease-out'
				})
			},
			/**
			 * 遮罩与屏幕左侧的距离
			 */
			left: {
				type: String,
				default: '0'
			},
			/**
			 * 遮罩与屏幕顶部的距离
			 */
			top: {
				type: String,
				default: '0'
			},
			/**
			 * 遮罩与屏幕右侧的距离
			 */
			right: {
				type: String,
				default: '0'
			},
			/**
			 * 遮罩与屏幕底部的距离
			 */
			bottom: {
				type: String,
				default: '0'
			},
			/**
			 * 内容外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				overlayShow: false,
				helpShow: false,
				overlayNoWeexAni: '',
				noWeexAni: '',
				isShow: false,
				screenWidth: uni.upx2px(750)
			}
		},
		watch: {
			show(newV) {
				this.toHackShow(newV)
			}
		},
		computed: {
			screenHeight() {
				return getScreenHeight()
			},
			overlayHeight() {
				return this.screenHeight - this.topPx - this.bottomPx
			},
			mrOverlayStyle() {
				let style = `left:${this.leftPx}px;top:${this.topPx}px;right:${this.rightPx}px;`
				return style
			},
			mrPopStyle() {
				let style = {
					width: `${this.widthPx}px`,
					height: `${this.heightPx}px`
				}
				// center/top-center/left-center/bottom-center/right-center/scale-center
				if (this.pos.endsWith('center')) {
					if (this.pos === 'center' || this.pos === 'scale-center') {
						// opacity
						style['left'] = (this.screenWidth - this.widthPx) * 0.5 + 'px'
						if (this.topOffsetPx < 0 && this.bottomOffsetPx < 0) {
							style['top'] = (this.screenHeight - this.heightPx) * 0.5 + 'px'
						} else {
							if (this.topOffsetPx >= 0) {
								style['top'] = (this.screenHeight - this.heightPx) * 0.5 + this.topOffsetPx + 'px'
							} else if (this.bottomOffsetPx >= 0) {
								style['top'] = (this.screenHeight - this.heightPx) * 0.5 - this.bottomOffsetPx + 'px'
							}
						}
						if (this.pos === 'center') {
							style['opacity'] = 0
							style['transform'] = 'scale(0,0)'
						}
						this.pos === 'scale-center' && (style['transform'] = 'scale(0,0)')
					} else if (this.pos === 'left-center' || this.pos === 'right-center') {
						if (this.topOffsetPx < 0 && this.bottomOffsetPx < 0) {
							style['top'] = (this.screenHeight - this.heightPx) * 0.5 + 'px'
						} else {
							if (this.topOffsetPx >= 0) {
								style['top'] = (this.screenHeight - this.heightPx) * 0.5 + this.topOffsetPx + 'px'
							} else if (this.bottomOffsetPx >= 0) {
								style['top'] = (this.screenHeight - this.heightPx) * 0.5 - this.bottomOffsetPx + 'px'
							}
						}
						this.pos === 'left-center' && (style['left'] = -this.widthPx + this.standoutPx + 'px')
						this.pos === 'right-center' && (style['right'] = -this.widthPx + this.standoutPx + 'px')
					} else if (this.pos === 'top-center' || this.pos === 'bottom-center') {
						style['left'] = (this.screenWidth - this.widthPx) * 0.5 + 'px'
						this.pos === 'top-center' && (style['top'] = -this.heightPx + this.standoutPx + 'px')
						this.pos === 'bottom-center' && (style['bottom'] = -this.heightPx + this.standoutPx + 'px')
					}
				}
				// top: left/right-width-height-top  bottom: left/right-width-height-bottom
				if (this.pos === 'top' || this.pos === 'bottom') {
					if (this.leftOffsetPx < 0 && this.rightOffsetPx < 0) {
						style['left'] = (this.screenWidth - this.leftPx - this.rightPx - this.widthPx) * 0.5 + 'px'
					} else {
						if (this.leftOffsetPx >= 0) {
							style['left'] = (this.leftPx + this.leftOffsetPx) + 'px'
						} else if (this.rightOffsetPx >= 0) {
							style['right'] = (this.rightPx + this.rightOffsetPx) + 'px'
						}
					}
					this.pos === 'top' && (style['top'] = -this.heightPx + this.standoutPx + 'px')
					this.pos === 'bottom' && (style['bottom'] = -this.heightPx + this.standoutPx + 'px')
				}
				if (this.pos === 'left' || this.pos === 'right') {
					if (this.topOffsetPx < 0 && this.bottomOffsetPx < 0) {
						style['top'] = (this.screenHeight - this.topPx - this.bottomPx - this.heightPx) * 0.5 + 'px'
					} else {
						if (this.topOffsetPx >= 0) {
							style['top'] = (this.topPx + this.topOffsetPx) + 'px'
						} else if (this.bottomOffsetPx >= 0) {
							style['bottom'] = (this.bottomPx + this.bottomOffsetPx) + 'px'
						}
					}
					this.pos === 'left' && (style['left'] = -this.widthPx + this.standoutPx + 'px')
					this.pos === 'right' && (style['right'] = -this.widthPx + this.standoutPx + 'px')
				}
				let _style = ""
				for (const i in style) {
					_style += i + ":" + style[i] + ';'
				}
				return _style
			},
			heightPx() {
				const h = getHeight(this.height)
				if (h > 1) {
					return h - this.extraPx
				}
				if (h <= 0) {
					return this.screenHeight - this.topPx - this.bottomPx - (this.topOffsetPx>=0?this.topOffsetPx:0) - (this.bottomOffsetPx>=0?this.bottomOffsetPx:0) - this.extraPx
				}
				return this.screenHeight * h - this.extraPx
			},
			extraPx() {
				return getHeight(this.extra)
			},
			widthPx() {
				const w = getPx(this.width)
				if (w <= 0) {
					return this.screenWidth - this.leftPx - this.rightPx - (this.leftOffsetPx>=0?this.leftOffsetPx:0) - (this.rightOffsetPx>=0?this.rightOffsetPx:0)
				}
				return w
			},
			standoutPx() {
				return getHeight(this.standout)
			},
			leftOffsetPx() {
				if (this.leftOffset === '-1') return -1;
				return getPx(this.leftOffset)
			},
			topOffsetPx() {
				if (this.topOffset === '-1') return -1;
				return getHeight(this.topOffset)
			},
			rightOffsetPx() {
				if (this.rightOffset === '-1') return -1;
				return getPx(this.rightOffset)
			},
			bottomOffsetPx() {
				if (this.bottomOffset === '-1') return -1;
				return getHeight(this.bottomOffset)
			},
			leftPx() {
				return getPx(this.left)
			},
			topPx() {
				return getHeight(this.top)
			},
			rightPx() {
				return getPx(this.right)
			},
			bottomPx() {
				return getHeight(this.bottom)
			}
		},
		methods: {
			toHackShow(bool) {
				this.appearPopup(bool)
			},
			overlayClose(e) {
				e.stopPropagation && e.stopPropagation()
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
				const popupEl = this.$refs['myp-popo'];
				if (!popupEl) {
					return;
				}
				const that = this
				let styles = {}
				if (this.pos === 'center') {
					styles = {opacity: bool ? 1 : 0}
					bool && (animation.transition(popupEl, {styles: {transform: 'scale(1,1)'},duration: 0,delay: 0}))
				} else {
					styles = {transform: this.getTransform(this.pos, !bool)}
				}
				animation.transition(popupEl, {
					styles: styles,
					duration,
					delay: 0,
					...this.animation
				}, () => {
					!bool && this.pos === 'center' && (animation.transition(popupEl, {styles: {transform: 'scale(0,0)'},duration: 0,delay: 0}))
				})
				// overlay
				const popupOverEl = this.$refs['myp-popo-overlay']
				if (!popupOverEl) return;
				bool && (animation.transition(popupOverEl, {styles: {height: `${this.overlayHeight}px`},duration: 0,delay: 0}))
				animation.transition(popupOverEl, {
					styles: {opacity: bool ? 1 : 0},
					duration: this.overlay.duration,
					delay: 0,
					timingFunction: bool ? this.overlay.timingFunction[0] : this.overlay.timingFunction[1]
				}, () => {
					!bool && (animation.transition(popupOverEl, {styles: {height: '0px'},duration: 0,delay: 0}))
				})
			},
			noWeexAppearPopup(bool, duration = this.duration) {
				this.isShow = bool
				let _style = "transition-duration:" + duration + 'ms;'
				_style += "transition-timing-function:" + this.animation.timingFunction + ';'
				if (this.pos === 'center') {
					_style += bool ? 'transform: scale(1,1);' : ''
					_style += 'transition-property:opacity;'
					_style += 'opacity:' + (bool ? 1 : 0) + ';'
				} else {
					_style += 'transition-property:transform;'
					_style += "transform:" + this.getTransform(this.pos, !bool) + ';'
				}
				this.noWeexAni = _style
				setTimeout(()=>{
					!bool && (this.noWeexAni='')
				}, duration)
				const that = this
				// overlay
				let _oStyle = "transition-duration:" + this.overlay.duration + 'ms;'
				bool && (_oStyle += `height:${this.overlayHeight}px;`)
				_oStyle += "transition-timing-function:" + (bool ? this.overlay.timingFunction[0] : this.overlay.timingFunction[1]) + ';'
				_oStyle += 'transition-property:opacity;'
				_oStyle += 'opacity:' + (bool ? 1 : 0) + ';'
				this.overlayNoWeexAni = _oStyle
				setTimeout(() => {
					!bool && (this.overlayNoWeexAni = '')
				}, this.overlay.duration)
			},
			getTransform(pos, toClose) {
				let _size = 0
				let _transform = ''
				switch (pos) {
					case 'top':
						if (!toClose) {
							_size = this.heightPx - this.standoutPx + this.topPx + (this.topOffsetPx >= 0 ? this.topOffsetPx : 0)
						}
						_transform = `translateY(${_size}px)`;
						break;
					case 'bottom':
						if (!toClose) {
							_size = this.heightPx - this.standoutPx + this.bottomPx + (this.bottomOffsetPx >= 0 ? this.bottomOffsetPx : 0)
						}
						_transform = `translateY(-${_size}px)`;
						break;
					case 'left':
						if (!toClose) {
							_size = this.widthPx - this.standoutPx + this.leftPx + (this.leftOffsetPx >= 0 ? this.leftOffsetPx : 0)
						}
						_transform = `translateX(${_size}px)`;
						break;
					case 'right':
						if (!toClose) {
							_size = this.widthPx - this.standoutPx + this.rightPx + (this.rightOffsetPx >= 0 ? this.rightOffsetPx : 0)
						}
						_transform = `translateX(-${_size}px)`;
						break;
					case 'scale-center':
						_transform = toClose ? 'scale(0,0)' : 'scale(1,1)'
						break
					case 'left-center':
						if (!toClose) {
							_size = (this.screenWidth + this.widthPx) * 0.5 - this.standoutPx
						}
						_transform = `translateX(${_size}px)`;
						break
					case 'right-center':
						if (!toClose) {
							_size = (this.screenWidth + this.widthPx) * 0.5 - this.standoutPx
						}
						_transform = `translateX(-${_size}px)`;
						break
					case 'top-center':
						if (!toClose) {
							if (this.topOffsetPx < 0 && this.bottomOffsetPx < 0) {
								_size = (this.screenHeight + this.heightPx) * 0.5 - this.standoutPx
							} else{
								 if (this.topOffsetPx >= 0) {
								    _size = (this.screenHeight + this.heightPx) * 0.5 + this.topOffsetPx - this.standoutPx
								} else if (this.bottomOffsetPx >= 0) {
								    _size = (this.screenHeight + this.heightPx) * 0.5 - this.bottomOffsetPx - this.standoutPx
								}
							}
						}
						_transform = `translateY(${_size}px)`;
						break
					case 'bottom-center':
						if (!toClose) {
							if (this.topOffsetPx < 0 && this.bottomOffsetPx < 0) {
								_size = (this.screenHeight + this.heightPx) * 0.5 - this.standoutPx
							} else{
								 if (this.topOffsetPx >= 0) {
								    _size = (this.screenHeight + this.heightPx) * 0.5 - this.topOffsetPx - this.standoutPx
								} else if (this.bottomOffsetPx >= 0) {
								    _size = (this.screenHeight + this.heightPx) * 0.5 + this.bottomOffsetPx - this.standoutPx
								}
							}
						}
						_transform = `translateY(-${_size}px)`;
						break
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
	.myp-popo {
		position: fixed;
		width: 750rpx;
		
		&-over {
			position: fixed;
			opacity: 0;
			height: 0px;
		}
	}
</style>
