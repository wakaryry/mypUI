<template>
	<view>
		<view ref="myp-popo-overlay" :class="['myp-popo-over', 'myp-bg-'+overlay.bgType]" @tap.stop="overlayClose" :style="mrOverlayStyle + overlayNoWeexAni">
			<slot name="overlay"></slot>
		</view>
		<view ref="myp-popo" @tap.stop="toPrevent" :class="['myp-popo', 'myp-bg-'+bgType]" :style="boxStyle+mrPopStyle + noWeexAni">
			<view ref="myp-standout" bubble="true" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchcancel="onTouchCancel" @touchend="onTouchEnd">
				<!-- 名为standout，但是不一定露出的全是standout，也不一定要求standout一定全部露出 -->
				<!-- 露出多少实际还是受standout这个props控制 -->
				<slot name="standout"></slot>
			</view>
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
	const animation = weex.requireModule('animation');
	const bindingX = uni.requireNativePlugin('bindingx');
	// #endif
	// #ifndef APP-NVUE
	import touchMixin from '../myp-mixin/touchMixin.js'
	// #endif
	
	import windowMixin from '../myp-mixin/windowMixin.js'
	// TODO: add height animation: height-0->height
	export default {
		// #ifdef APP-NVUE
		mixins: [windowMixin],
		// #endif
		// #ifndef APP-NVUE
		mixins: [windowMixin, touchMixin],
		// #endif
		props: {
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
					timingFunction: ['ease-in', 'ease-out'],
					duration: 300,
					bg: '',
					bgType: 'mask'
				})
			},
			height: {
				type: [Number, String],
				default: 0
			},
			standout: {
				type: [Number, String],
				default: '0'
			},
			// 打开后与边框的距离. 可以通过其它方式实现，比如内容高度增加，然后背景色透明
			leftOffset: {
				type: [Number, String],
				default: -1
			},
			rightOffset: {
				type: [Number, String],
				default: -1
			},
			bottomOffset: {
				type: [Number, String],
				default: -1
			},
			topOffset: {
				type: [Number, String],
				default: -1
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
				type: String,
				default: '0'
			},
			top: {
				type: String,
				default: '0'
			},
			right: {
				type: String,
				default: '0'
			},
			bottom: {
				type: String,
				default: '0'
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				overlayNoWeexAni: '',
				noWeexAni: '',
				isShow: false
			}
		},
		computed: {
			screenWidth() {
				return uni.upx2px(750)
			},
			screenHeight() {
				return this.mypGetScreenHeight()
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
				const h = this.mypGetHeight(this.height)
				if (h > 1) {
					return h
				}
				if (h <= 0) {
					return this.screenHeight - this.topPx - this.bottomPx - (this.topOffsetPx>=0?this.topOffsetPx:0) - (this.bottomOffsetPx>=0?this.bottomOffsetPx:0)
				}
				return this.screenHeight * h
			},
			widthPx() {
				const w = this.mypToPx(this.width)
				if (w <= 0) {
					return this.screenWidth - this.leftPx - this.rightPx - (this.leftOffsetPx>=0?this.leftOffsetPx:0) - (this.rightOffsetPx>=0?this.rightOffsetPx:0)
				}
				return w
			},
			standoutPx() {
				return this.mypGetHeight(this.standout)
			},
			leftOffsetPx() {
				if (this.leftOffset === -1) return -1;
				return this.mypToPx(this.leftOffset)
			},
			topOffsetPx() {
				if (this.topOffset === -1) return -1;
				return this.mypGetHeight(this.topOffset)
			},
			rightOffsetPx() {
				if (this.rightOffset === -1) return -1;
				return this.mypToPx(this.rightOffset)
			},
			bottomOffsetPx() {
				if (this.bottomOffset === -1) return -1;
				return this.mypGetHeight(this.bottomOffset)
			},
			leftPx() {
				return this.mypToPx(this.left)
			},
			topPx() {
				return this.mypGetHeight(this.top)
			},
			rightPx() {
				return this.mypToPx(this.right)
			},
			bottomPx() {
				return this.mypGetHeight(this.bottom)
			}
		},
		methods: {
			// ref method to open
			show(duration) {
				if (typeof duration === 'undefined') {
					this.toHackShow(true, this.duration)
				} else {
					this.toHackShow(true, duration)
				}
			},
			// ref method to close
			hide(duration) {
				if (typeof duration === 'undefined') {
					this.toHackShow(false, this.duration)
				} else {
					this.toHackShow(false, duration)
				}
			},
			onTouchStart(e) {
				// #ifdef APP-NVUE
				if (!this.isShow) {
					this.openWithDrag()
				} else {
					this.closeWithDrag()
				}
				// #endif
				// #ifndef APP-NVUE
				this.startPoint = this.mypGetPoint(e)
				// #endif
			},
			onTouchMove(e) {
				const nowPoint = this.mypGetPoint(e)
				const offsetY = nowPoint.y - this.startPoint.y
				if (offsetY >= 0) {
					
				} else {
					this.noWeexAni = `transition-property: transform; transform: translateY(${offsetY}px);transition-duration: 0;`
				}
			},
			onTouchEnd(e) {
				const nowPoint = this.mypGetPoint(e)
				const offsetY = nowPoint.y - this.startPoint.y
				if (offsetY >= 0) {
					this.noWeexAni = ""
				} else {
					this.noWeexAni = ""
					this.toHackShow(true)
				}
			},
			onTouchCancel(e) {
				
			},
			openWithDrag() {
				const that = this
				const maxSize = this.getTransformSize(this.pos, false)
				const standEl = this.$refs['myp-standout'].ref
				const popoEl = this.$refs['myp-popo'].ref
				let exp = ''
				if (this.pos === 'bottom') {
					exp = `(y >= 0) ? 0 : ((y > (-${maxSize})) ? (y+0) : (-${maxSize}))`
				}
				const result = bindingX.bind({
					eventType: 'pan',
					anchor: standEl,
					props: [{
						element: popoEl,
						property: 'transform.translateY',
						expression: exp
					}]
				}, (res) => {
					if (res.state === 'end' && !that.isShow) {
					    let offset = -1 * res.deltaY;
					    if (offset < maxSize / 2 && offset > 0) {
					        this.toHackShow(false)
					    } else if (offset >= maxSize / 2) {
					        this.toHackShow(true)
					    }
					    if (result) {
					        bindingX.unbind({
					            token: result.token,
					            eventType: 'pan'
					        })
					    }
					}
				})
			},
			closeWithDrag() {
				
			},
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
			getTransformSize(pos, toClose) {
				let _size = 0
				let _transform = ''
				switch (pos) {
					case 'top':
						if (!toClose) {
							_size = this.heightPx - this.standoutPx + this.topPx + (this.topOffsetPx >= 0 ? this.topOffsetPx : 0)
						}
						break;
					case 'bottom':
						if (!toClose) {
							_size = this.heightPx - this.standoutPx + this.bottomPx + (this.bottomOffsetPx >= 0 ? this.bottomOffsetPx : 0)
						}
						break;
					case 'left':
						if (!toClose) {
							_size = this.widthPx - this.standoutPx + this.leftPx + (this.leftOffsetPx >= 0 ? this.leftOffsetPx : 0)
						}
						break;
					case 'right':
						if (!toClose) {
							_size = this.widthPx - this.standoutPx + this.rightPx + (this.rightOffsetPx >= 0 ? this.rightOffsetPx : 0)
						}
						break;
					case 'left-center':
						if (!toClose) {
							_size = (this.screenWidth + this.widthPx) * 0.5 - this.standoutPx
						}
						break
					case 'right-center':
						if (!toClose) {
							_size = (this.screenWidth + this.widthPx) * 0.5 - this.standoutPx
						}
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
						break
				}
				return _size
			},
			getTransform(pos, toClose) {
				if (pos === 'scale-center') {
					return toClose ? 'scale(0,0)' : 'scale(1,1)'
				}
				let _size = this.getTransformSize(pos, toClose)
				let _transform = ''
				switch (pos) {
					case 'top':
						_transform = `translateY(${_size}px)`
						break
					case 'bottom':
						_transform = `translateY(-${_size}px)`
						break
					case 'left':
						_transform = `translateX(${_size}px)`
						break
					case 'right':
						_transform = `translateX(-${_size}px)`
						break
					case 'left-center':
						_transform = `translateX(${_size}px)`
						break
					case 'right-center':
						_transform = `translateX(-${_size}px)`
						break
					case 'top-center':
						_transform = `translateY(${_size}px)`
						break
					case 'bottom-center':
						_transform = `translateY(-${_size}px)`
						break
				}
				return _transform
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
