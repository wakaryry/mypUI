<template>
	<scroll-view ref="scroll" id="scroll" :scroll-x="true" :scroll-left="scrollLeft" :scroll-with-animation="true" :show-scrollbar="false" :class="['myp-bg-'+bgType, 'myp-border-'+border, 'myp-tabs-scroll']" :style="mrScrollStyle">
		<view style="flex-direction: column;position: relative;">
			<view v-if="hasIndicator" ref="myp-underline" :class="['myp-tab-item-underline', 'myp-bg-'+indicatorType, isTap?'myp-tab-item-animation':'']" :style="mrIndStyle">
				<slot name="indicator"></slot>
			</view>
			<view :style="mrTabsStyle">
				<view v-for="(item, index) in items" :key="index" :ref="'item'+index" :id="'item'+index" class="myp-tab-item" :style="mrItemStyle + (index===value ? activeItemStyle:'')" @click="changeTab(index)">
					<text :class="['myp-color-'+(index===value?activeTextType:textType), 'myp-size-'+(index===value?activeTextSize:textSize)]" :style="textStyle + (index===value ? activeTextStyle : '')">{{ textLabel ? item[textLabel] : item }}</text>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	//
	// item/indicator有固定宽度和动态宽度两种
	// 
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom');
	const animation = uni.requireNativePlugin('animation')
	// #endif
	import {getPx} from '../utils/system.js'
	
	export default {
		props: {
			/**
			 * tabs内容
			 */
			items: {
				type: Array,
				default: function() {
					return []
				}
			},
			/**
			 * 当前index
			 */
			value: {
				type: Number,
				default: 0
			},
			/**
			 * 联动时需要。因为scroll的过程中，current就会发生变化，我们需要用另外一个来记录
			 */
			last: {
				type: Number,
				default: 0
			},
			/**
			 * 文字内容的字段
			 */
			textLabel: {
				type: String,
				default: null
			},
			/**
			 * 联动时swiper的偏移量。px. swiperScroll dx
			 */
			offset: {
				type: Number,
				default: 0
			},
			/**
			 * swiper的宽度。联动时需要
			 */
			swiperWidth: {
				type: String,
				default: '750rpx'
			},
			/**
			 * 是否是点击tab。不联动时一直设置为true
			 */
			isTap: {
				type: Boolean,
				default: false
			},
			/**
			 * center或者end的时候，请注意items的数量不要超过总尺寸
			 */
			justify: {
				type: String,
				default: 'flex-start'
			},
			/**
			 * scroll的自定义宽度
			 */
			scrollSize: {
				type: String,
				default: '750rpx'
			},
			/**
			 * 文字的尺寸主题
			 */
			textSize: {
				type: String,
				default: ''
			},
			/**
			 * 当前项文字的尺寸主题
			 */
			activeTextSize: {
				type: String,
				default: ''
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 文字颜色主题
			 */
			textType: {
				type: String,
				default: ''
			},
			/**
			 * 当前项的文字颜色主题
			 */
			activeTextType: {
				type: String,
				default: ''
			},
			/**
			 * 自定义高度
			 */
			height: {
				type: String,
				default: '80rpx'
			},
			/**
			 * tab项的宽度。0的时候，自适应宽度
			 */
			width: {
				type: String,
				default: '120rpx'
			},
			/**
			 * 各个tab之间的间隙
			 */
			space: {
				type: String,
				default: '0px'
			},
			/**
			 * 边框主题
			 */
			border: {
				type: String,
				default: 'none'
			},
			/**
			 * 是否有底下指示器
			 */
			hasIndicator: {
				type: Boolean,
				default: true
			},
			/**
			 * 指示器的背景主题
			 */
			indicatorType: {
				type: String,
				default: 'primary'
			},
			/**
			 * 指示器的自定义宽度。0的时候动态宽度，自适应宽度
			 */
			indicatorWidth: {
				type: String,
				default: '80rpx'
			},
			/**
			 * 指示器的自定义高度
			 */
			indicatorHeight: {
				type: String,
				default: '4rpx'
			},
			/**
			 * 指示器的自定义圆角
			 */
			indicatorRadius: {
				type: String,
				default: '4rpx'
			},
			/**
			 * 外层样式，也是scroll的样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * tabs的内容样式
			 */
			tabsStyle: {
				type: String,
				default: ''
			},
			/**
			 * 文字样式
			 */
			textStyle: {
				type: String,
				default: ''
			},
			/**
			 * 当前项的文字样式
			 */
			activeTextStyle: {
				type: String,
				default: ''
			},
			/**
			 * tab项的样式
			 */
			itemStyle: {
				type: String,
				default: ''
			},
			/**
			 * 当前项的tab样式
			 */
			activeItemStyle: {
				type: String,
				default: ''
			},
			/**
			 * 指示器的样式
			 */
			indicatorStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				// px.为了更好的设置indicator
				dyIndicatorWidth: 0,
				dyIndicatorLeft: 0,
				// 缓存宽度信息，为了减少计算
				dyItems: {},
				scrollLeft: 0
			}
		},
		computed: {
			mrIndStyle() {
				let _style = `border-radius:${this.indicatorRadius};`
				_style += `height:${this.indicatorHeight};`
				// #ifndef APP-NVUE
				_style += `width:${this.dyIndicatorWidth}px;`
				_style += `left:${this.dyIndicatorLeft}px;`
				// #endif
				return _style + this.indicatorStyle
			},
			spacePx() {
				return getPx(this.space)
			},
			scrollSizePx() {
				return getPx(this.scrollSize)
			},
			widthPx() {
				return getPx(this.width)
			},
			heightPx() {
				return getPx(this.height)
			},
			fixedInd() {
				const indW = parseInt(this.indicatorWidth)
				if (indW > 0) {
					return true
				}
				const iw = parseInt(this.width)
				if (iw > 0) {
					return true
				}
				return false
			},
			fixedIndWidth() {
				const indW = parseInt(this.indicatorWidth)
				if (indW > 0) {
					return this.indicatorWidth
				}
				const iw = parseInt(this.width)
				if (iw > 0) {
					return this.width
				}
				return '0'
			},
			fixedIndWidthPx() {
				return getPx(this.fixedIndWidth)
			},
			mrScrollStyle() {
				let _style = "flex-direction:row;"
				// #ifndef APP-NVUE
				_style += 'display:flex;box-sizing:border-box;'
				// #endif
				_style += "width:" + this.scrollSizePx + 'px;'
				return _style + this.boxStyle
			},
			mrTabsStyle() {
				let _style = `flex-direction:row;justify-content:${this.justify};flex-wrap:nowrap;`
				// #ifndef APP-NVUE
				_style += 'display:flex;box-sizing:border-box;'
				// #endif
				if (this.justify != 'flex-start') {
					_style += "width:" + this.scrollSizePx + 'px;'
				}
				return _style + this.tabsStyle
			},
			mrItemStyle() {
				let _style = `height:${this.heightPx}px;`
				const w = parseInt(this.width)
				if (w > 0) {
					_style += `width:${this.widthPx}px;margin-right:${this.spacePx}px;margin-left:${this.spacePx}px;`
				} else {
					_style += `margin-right:${this.spacePx}px;margin-left:${this.spacePx}px;`
				}
				_style += "justify-content:center;align-items:center;"
				// #ifndef APP-NVUE
				_style += 'display:flex;box-sizing:border-box;flex-direction:column;'
				// #endif
				return _style + this.itemStyle
			},
			swiperWidthPx() {
				return getPx(this.swiperWidth)
			}
		},
		mounted() {
			setTimeout(()=>{
				this.toCurrentIndex(this.value, true)
				// 这样的话要求mounted之后，所有item的宽度不会变化
				// 所以适用于固定宽度的，或者动态宽度，但是元素生成之后宽度不变的
				this.toCacheItemsSize()
			}, 60)
		},
		watch: {
			value(newV) {
				// this.toCurrentIndex(newV)
				setTimeout(()=>{
					this.toCurrentIndex(newV)
				}, 0)
			},
			items() {
				// 清缓存
				this.dyItems = {}
				setTimeout(()=>{
					this.toCurrentIndex(this.value)
					this.toCacheItemsSize()
				}, 60)
			},
			offset(newV) {
				this.toHandleSwiperScroll(newV)
			}
		},
		methods: {
			changeTab(index) {
				this.$emit('change', index)
			},
			async toCurrentIndex(index, isInit=false) {
				let nowWidth = 0
				let _left = 0
				let indWidth = 0
				let indLeft = 0
				let scrollL = 0
				// first to get scroll position
				const cachedScroll = this.dyItems['scroll']
				if (cachedScroll) {
					scrollL = cachedScroll.left
				} else {
					try{
						const res = await this.getElSize(-100)
						scrollL = res.left
						this.dyItems['scroll'] = {left: scrollL}
					}catch(e){
						//TODO handle the exception
					}
				}
				const cached = this.dyItems['item'+index]
				if (cached) {
					_left = cached.left
					nowWidth = cached.width
					indWidth = cached.ind
					indLeft = cached.indLeft
				} else {
					try{
						const result = await this.getElSize(index)
						_left = result.left - scrollL
						nowWidth = result.width
						if (this.fixedInd) {
							indWidth = this.fixedIndWidthPx
						} else {
							indWidth = nowWidth
						}
						indLeft = _left + (nowWidth - indWidth) * 0.5
						// into cache
						this.dyItems['item'+index] = {width: nowWidth, left: _left, ind: indWidth, indLeft: indLeft}
					}catch(e){
						//TODO handle the exception
					}
				}
				const _width = _left + nowWidth + this.spacePx
				// 移动indicator
				this.dyIndicatorWidth = indWidth
				this.dyIndicatorLeft = indLeft
				// #ifdef APP-NVUE
				const indEl = this.$refs['myp-underline']
				if (isInit) {
					// ios下刚打开时发现总是靠最左侧。去掉duration就好了
					animation.transition(indEl, {
						styles: {
							width: `${this.dyIndicatorWidth}px`,
							transform: `translateX(${this.dyIndicatorLeft}px)`
						},
						duration: 0
					})
				} else {
					animation.transition(indEl, {
						styles: {
							width: `${this.dyIndicatorWidth}px`,
							transform: `translateX(${this.dyIndicatorLeft}px)`
						},
						duration: 200
					})
				}
				// #endif
				// 居中当前item
				const scrollWidth = this.scrollSizePx
				const offset = _width - (nowWidth / 2 + this.spacePx) - scrollWidth / 2
				if (offset > 0) {
					// app端scrollTo会导致右边已经不足以居中的时候也居中，需要额外判断右边剩下的长度
					// 我们这里采用dom.scrollToElement. dom.scrollToElement是滑动到最左侧
					// #ifdef APP-NVUE
					const refName = "item" + index
					const el = this.$refs[refName][0]
					dom.scrollToElement(el, {
						offset: -0.5 * scrollWidth + nowWidth * 0.5,
						animated: true
					})
					// #endif
					// #ifndef APP-NVUE
					this.scrollLeft = offset;
					// #endif
				} else {
					if (this.scrollLeft === 0) {
						this.scrollLeft = 0.1
					} else {
						this.scrollLeft = 0;
					}
				}
			},
			async toHandleSwiperScroll(dx) {
				// 在mp-wx里面scroll的过程中，实际上也会引起current的变化，所以不能通过this.value来获取当前的tab
				// const nowIndex = this.value
				const nowIndex = this.last
				let nextIndex = nowIndex
				// 至少 1px 才做判断
				if (dx > -1 && dx < 1) return;
				if (dx > 0) {
					nextIndex += 1
				} else if (dx < 0) {
					nextIndex -= 1
				}
				const pg = Math.abs(this.swiperWidthPx / dx)
				if (nextIndex>=this.items.length || nextIndex < 0 || nowIndex === nextIndex) {
					return
				}
				const theItem = this.dyItems['item'+nowIndex]
				const nextItem = this.dyItems['item'+nextIndex]
				
				this.dyIndicatorLeft = theItem.indLeft + (nextItem.indLeft - theItem.indLeft) / pg
				this.dyIndicatorWidth = theItem.ind + (nextItem.ind - theItem.ind) / pg
				
				// #ifdef APP-NVUE
				const indEl = this.$refs['myp-underline']
				animation.transition(indEl, {
					styles: {
						width: `${this.dyIndicatorWidth}px`,
						transform: `translateX(${this.dyIndicatorLeft}px)`
					}
				})
				// #endif
			},
			async toCacheItemsSize() {
				let scrollL = 0
				try{
					const cachedS = this.dyItems['scroll']
					if (cachedS) {
						scrollL = cachedS.left
					} else {
						const res = await this.getElSize(-100)
						scrollL = res.left
						this.dyItems['scroll'] = {left: scrollL}
					}
				}catch(e){
					//TODO handle the exception
				}
				for (const i in this.items) {
					const cached = this.dyItems['item'+i]
					if (cached) continue;
					try{
						const result = await this.getElSize(i)
						let indWidth = result.width
						if (this.fixedInd) {
							indWidth = this.fixedIndWidthPx
						}
						this.dyItems['item'+i] = {width:result.width, left: result.left-scrollL, ind: indWidth, indLeft: result.left-scrollL+(result.width-indWidth)*0.5}
					}catch(e){
						//TODO handle the exception
					}
				}
			},
			getElSize(index) {
				return new Promise((res, rej) => {
					// #ifndef APP-NVUE
					let idName = '#item' + index
					if (index===-100) {
						idName = "#scroll"
					}
					const el = uni.createSelectorQuery().in(this).select(idName)
					el.fields({
						size: true,
						rect: true
					}, (data) => {
						if (data) {
							res(data);
						} else {
							rej({})
						}
					}).exec();
					// #endif
					// #ifdef APP-NVUE
					let refName = "item" + index
					let _el = null
					if(index===-100) {
						_el = this.$refs["scroll"]
					} else {
						_el = this.$refs[refName][0]
					}
					dom.getComponentRect(_el, (data) => {
						if (data.result) {
							res(data.size)
						} else {
							rej({})
						}
					})
					// #endif
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	/* #ifndef APP-NVUE */
	.myp-tabs-scroll ::-webkit-scrollbar {
	    display: none;
	    width: 0 !important;
	    height: 0 !important;
		color: transparent;
	    -webkit-appearance: none;
	    background: transparent;
	}
	/* #endif */
	
	.myp-tab-item {
		&-underline {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 0;
		}
		&-animation {
			/* #ifndef APP-NVUE */
			transition-property: left, width;
			transition-duration: 0.2s;
			transition-timing-function: ease;
			/* #endif */
		}
		&-noani {
			transition-duration: 0s;
		}
	}
</style>
