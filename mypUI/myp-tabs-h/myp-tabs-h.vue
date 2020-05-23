<template>
	<scroll-view ref="scroll" id="scroll" :scroll-x="true" :scroll-left="scrollLeft" :scroll-with-animation="true" :show-scrollbar="false" :class="['myp-bg-'+bgType, 'myp-tabs-scroll']" :style="mrScrollStyle">
		<view style="flex-direction: column;">
			<view :style="mrTabsStyle">
				<view v-for="(item, index) in items" :key="index" :ref="'item'+index" :id="'item'+index" class="myp-tab-item" :style="mrItemStyle + (index===value ? activeItemStyle:'')" @click="changeTab(index)">
					<text :class="['myp-color-'+(index===value?activeType:mrTitleType), 'myp-size-'+(index===value?activeSize:titleSize)]" :style="textStyle + (index===value ? activeTextStyle : '')">{{ titleLabel ? item[titleLabel] : item }}</text>
				</view>
			</view>
			<view v-if="hasIndicator" :class="['myp-tab-item-indicator']" :style="{height: indicatorHeight}">
				<view ref="myp-underline" :class="['myp-tab-item-underline', 'myp-bg-'+(indicatorType&&indicatorType.length>0?indicatorType:'text'), isTap?'myp-tab-item-animation':'']" :style="mrIndStyle"></view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	//
	// item/indicator有固定宽度和动态宽度两种
	// 
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom');
	const animation = weex.requireModule('animation')
	// #endif
	
	export default {
		props: {
			items: {
				type: Array,
				default: function() {
					return []
				}
			},
			// current index
			value: {
				type: Number,
				default: 0
			},
			// 因为scroll的过程中，current就会发生变化，我们需要用另外一个来记录
			last: {
				type: Number,
				default: 0
			},
			titleLabel: {
				type: String,
				default: null
			},
			// px. swiperScroll dx
			offset: {
				type: Number,
				default: 0
			},
			swiperWidth: {
				type: String,
				default: '750rpx'
			},
			isTap: {
				type: Boolean,
				default: false
			},
			// center或者end的时候，请注意items的数量不要超过总尺寸
			justify: {
				type: String,
				default: 'flex-start'
			},
			// width or height of the scroll-view
			scrollSize: {
				type: String,
				default: '750rpx'
			},
			titleSize: {
				type: String,
				default: ''
			},
			activeSize: {
				type: String,
				default: ''
			},
			bgType: {
				type: String,
				default: ''
			},
			titleType: {
				type: String,
				default: ''
			},
			activeType: {
				type: String,
				default: ''
			},
			// item height: rpx/px
			height: {
				type: String,
				default: '80rpx'
			},
			// 0的时候，自适应宽度
			width: {
				type: String,
				default: '120rpx'
			},
			space: {
				type: String,
				default: '16rpx'
			},
			hasIndicator: {
				type: Boolean,
				default: true
			},
			indicatorType: {
				type: String,
				default: ''
			},
			// 0的时候动态宽度，自适应宽度
			indicatorWidth: {
				type: String,
				default: '80rpx'
			},
			indicatorHeight: {
				type: String,
				default: '4rpx'
			},
			indicatorRadius: {
				type: String,
				default: '4rpx'
			},
			indicatorBottom: {
				type: String,
				default: '4rpx'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			textStyle: {
				type: String,
				default: ''
			},
			activeTextStyle: {
				type: String,
				default: ''
			},
			itemStyle: {
				type: String,
				default: ''
			},
			activeItemStyle: {
				type: String,
				default: ''
			},
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
			mrTitleType() {
				if (this.titleType && this.titleType.length > 0) {
					return this.titleType
				}
				return this.bgType && this.bgType.length > 0 ? 'inverse' : ''
			},
			mrIndStyle() {
				let _style = `border-radius:${this.indicatorRadius};`
				_style += `width:${this.dyIndicatorWidth}px;`
				_style += `left:${this.dyIndicatorLeft}px;`
				return _style + this.indicatorStyle
			},
			spacePx() {
				return uni.upx2px(parseInt(this.space||0))
			},
			scrollSizePx() {
				if (this.scrollSize.indexOf('rpx') > 0) {
					return uni.upx2px(parseInt(this.scrollSize||0))
				}
				return parseInt(this.scrollSize||0)
			},
			heightPx() {
				if (this.height.indexOf('rpx') > 0) {
					return uni.upx2px(parseInt(this.height||0))
				}
				return parseInt(this.height||0)
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
				const indW = parseInt(this.fixedIndWidth)
				return uni.upx2px(indW)
			},
			mrScrollStyle() {
				let _style = "flex-direction:row;"
				_style += "width:" + this.scrollSize + ';'
				return _style + this.boxStyle
			},
			mrTabsStyle() {
				let _style = `flex-direction:row;justify-content:${this.justify};flex-wrap:nowrap;`
				return _style
			},
			mrItemStyle() {
				let _style = `height:${this.height};`
				const w = parseInt(this.width)
				if (w > 0) {
					_style += `width:${this.width};margin-right:${this.space};margin-left:${this.space};`
				} else {
					_style += `margin-right:${this.space};margin-left:${this.space};`
				}
				_style += "justify-content:center;align-items:center;"
				return _style + this.itemStyle
			},
			swiperWidthPx() {
				if (this.swiperWidth.indexOf('rpx') > 0) {
					return uni.upx2px(parseInt(this.swiperWidth||0))
				}
				return parseInt(this.swiperWidth||0)
			}
		},
		mounted() {
			setTimeout(()=>{
				this.toCurrentIndex(this.value)
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
				// 不再支持v-model，因为我们需要在点击之后做额外的处理
				// this.$emit("input", index)
				this.$emit('change', index)
			},
			async toCurrentIndex(index) {
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
	    -webkit-appearance: none;
	    background: transparent;
	}
	/* #endif */
	
	.myp-tab-item {
		
		&-indicator {
			position: relative;
			background-color: transparent;
		}
		
		&-underline {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			width: 0;
			/* #ifdef APP-NVUE */
			transition-property: left, width;
			transition-duration: 0.2s;
			transition-timing-function: ease;
			/* #endif */
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
