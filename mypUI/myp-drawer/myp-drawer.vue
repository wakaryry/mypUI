<template>
	<view>
		<view ref="myp-popo-overlay" :class="['myp-popo-over', 'myp-bg-'+overlay.bgType]" @tap.stop="overlayClose" :style="mrOverlayStyle + overlayNoWeexAni">
			<slot name="overlay"></slot>
		</view>
		<view ref="myp-popo" bubble="true" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchcancel="onTouchCancel" @touchend="onTouchEnd" @tap.stop="toPrevent" :class="['myp-flex-column', 'myp-popo', 'myp-bg-'+bgType]" :style="boxStyle+mrPopStyle + noWeexAni">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	const bindingX = uni.requireNativePlugin('bindingx');
	// #endif
	// #ifndef APP-NVUE
	import {getTouchPoint} from '../utils/element.js'
	// #endif
	import {getHeight, getPx, getScreenHeight, getPlatform} from '../utils/system.js'
	
	let iosHack = null
	
	export default {
		props: {
			/**
			 * 出现位置
			 */
			pos: {
				type: String,
				default: 'bottom'
			},
			/**
			 * 内容背景主题
			 */
			bgType: {
				type: String,
				default: 'none'
			},
			/**
			 * 打开/关闭的动画周期
			 */
			duration: {
				type: Number,
				default: 300
			},
			/**
			 * 遮罩层的整体设置
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
			 * 内容高度.0为自适应.1为全屏高度
			 */
			height: {
				type: String,
				default: '0'
			},
			/**
			 * 从height高度减去的高度
			 */
			extra: {
				type: String,
				default: '0'
			},
			/**
			 * 内容露出的高度
			 */
			standout: {
				type: String,
				default: '0'
			},
			/**
			 * 内容左侧偏移量，-1表示居中
			 */
			leftOffset: {
				type: String,
				default: '-1'
			},
			/**
			 * 内容右侧偏移量，-1表示居中
			 */
			rightOffset: {
				type: String,
				default: '-1'
			},
			/**
			 * 内容底部偏移量，-1表示居中
			 */
			bottomOffset: {
				type: String,
				default: '-1'
			},
			/**
			 * 内容顶部偏移量，-1表示居中
			 */
			topOffset: {
				type: String,
				default: '-1'
			},
			/**
			 * 内容的宽度
			 */
			width: {
				type: String,
				default: '750rpx'
			},
			/**
			 * 打开/关闭动画
			 */
			animation: {
				type: Object,
				default: () => ({
					timingFunction: 'ease-in-out'
				})
			},
			/**
			 * 遮罩左侧偏移量
			 */
			left: {
				type: String,
				default: '0'
			},
			/**
			 * 遮罩顶部偏移量
			 */
			top: {
				type: String,
				default: '0'
			},
			/**
			 * 遮罩右侧偏移量
			 */
			right: {
				type: String,
				default: '0'
			},
			/**
			 * 遮罩底部偏移量
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
				overlayNoWeexAni: '',
				noWeexAni: '',
				isShow: false,
				screenWidth: uni.upx2px(750)
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
				// top-center/left-center/bottom-center/right-center
				if (this.pos.endsWith('center')) {
					if (this.pos === 'left-center' || this.pos === 'right-center') {
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
				this.startPoint = getTouchPoint(e)
				// #endif
			},
			onTouchMove(e) {
				if (!this.startPoint) return;
				const nowPoint = getTouchPoint(e)
				const maxSize = this.getTransformSize(this.pos, false)
				const offsetY = nowPoint.y - this.startPoint.y
				const offsetX = nowPoint.x - this.startPoint.x
				if (!this.isShow) {
					if (this.pos === 'top') {
						if (offsetY > 0) {
							const y = (offsetY >= maxSize) ? maxSize : offsetY
							this.noWeexAni = `transition-property: transform; transform: translateY(${y}px);transition-duration: 0;`
						} else {
						}
					} else if (this.pos === 'bottom') {
						if (offsetY >= 0) {
							
						} else {
							const y = (-offsetY >= maxSize) ? (-1*maxSize) : offsetY
							this.noWeexAni = `transition-property: transform; transform: translateY(${y}px);transition-duration: 0;`
						}
					} else if (this.pos === 'left') {
						if (offsetX > 0) {
							const x = (offsetX >= maxSize) ? maxSize : offsetX
							this.noWeexAni = `transition-property: transform; transform: translateX(${x}px);transition-duration: 0;`
						} else {
							
						}
					} else if (this.pos === 'right') {
						if (offsetX < 0) {
							const x = (-offsetX >= maxSize) ? (-1*maxSize) : offsetX
							this.noWeexAni = `transition-property: transform; transform: translateX(${x}px);transition-duration: 0;`
						} else {
							
						}
					}
				} else {
					
				}
			},
			onTouchEnd(e) {
				if (!this.startPoint) return;
				const nowPoint = getTouchPoint(e)
				const maxSize = this.getTransformSize(this.pos, false)
				const offsetY = nowPoint.y - this.startPoint.y
				const offsetYAbs = Math.abs(offsetY)
				const offsetX = nowPoint.x - this.startPoint.x
				const offsetXAbs = Math.abs(offsetX)
				if (!this.isShow) {
					this.noWeexAni = ""
					if (this.pos === 'bottom' || this.pos === 'top') {
						if (offsetYAbs >= 0.5*maxSize) {
							if (this.pos === 'top' && offsetY > 0) {
								this.toHackShow(true)
								return
							}
							if (this.pos === 'bottom' && offsetY < 0) {
								this.toHackShow(true)
								return
							}
						}
						this.toHackShow(false)
					} else if (this.pos === 'left' || this.pos === 'right') {
						if (offsetXAbs >= 0.5*maxSize) {
							if (this.pos === 'left' && offsetX > 0) {
								this.toHackShow(true)
								return
							}
							if (this.pos === 'right' && offsetX < 0) {
								this.toHackShow(true)
								return
							}
						}
						this.toHackShow(false)
					}
				} else {
					
				}
			},
			onTouchCancel(e) {
				// 直接关闭
				this.toHackShow(false)
			},
			openWithDrag() {
				const that = this
				const maxSize = this.getTransformSize(this.pos, false)
				const standEl = this.$refs['myp-popo'].ref
				const popoEl = this.$refs['myp-popo'].ref
				let exp = ''
				if (this.pos === 'bottom') {
					exp = `(y >= 0) ? 0 : ((y > (-${maxSize})) ? (y+0) : (-${maxSize}))`
				} else if (this.pos === 'top') {
					exp = `(y > 0) ? ((y > ${maxSize}) ? ${maxSize} : (y+0)) : 0`
				} else if (this.pos === 'left') {
					exp = `(x > 0) ? ((x > ${maxSize}) ? ${maxSize} : (x+0)) : 0`
				} else if (this.pos === 'right') {
					exp = `(x >= 0) ? 0 : ((x > (-${maxSize})) ? (x+0) : (-${maxSize}))`
				}
				const result = bindingX.bind({
					eventType: 'pan',
					anchor: standEl,
					props: [{
						element: popoEl,
						property: this.pos === 'top' || this.pos === 'bottom' ? 'transform.translateY' : 'transform.translateX',
						expression: exp
					}]
				}, (res) => {
					if (res.state === 'end' && !that.isShow) {
						if (this.pos === 'top' || this.pos === 'bottom') {
							let offset = res.deltaY
							let offsetAbs = Math.abs(res.deltaY)
							if (offsetAbs < maxSize / 2) {
							    this.toHackShow(false)
							} else if (offsetAbs >= maxSize / 2) {
							    this.toHackShow(true)
							}
						} else if (this.pos === 'left' || this.pos === 'right') {
							let offset = res.deltaX
							let offsetAbs = Math.abs(res.deltaX)
							if (offsetAbs < maxSize / 2) {
							    this.toHackShow(false)
							} else if (offsetAbs >= maxSize / 2) {
							    this.toHackShow(true)
							}
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
		},
		created() {
			// #ifdef APP-NVUE
			if (getPlatform() === 'ios') {
				setTimeout(()=>{
					iosHack = bindingX.bind({
						eventType: 'pan',
						anchor: this.$refs['myp-popo'].ref,
						props: [
							{
								element: this.$refs['myp-popo'].ref,
								property: 'transform.translateY',
								expression: 'y+0'
							}
						]
					})
				}, 10)
			}
			// #endif
		},
		beforeDestroy() {
			if (iosHack) {
				// #ifdef APP-NVUE
				bindingX.unbind({
				    token: iosHack.token,
				    eventType: 'pan'
				})
				// #endif
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
