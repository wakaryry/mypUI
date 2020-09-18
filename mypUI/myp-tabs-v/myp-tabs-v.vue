<template>
	<scroll-view ref="scroll" id="scroll" :scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="true" :show-scrollbar="false" :class="['myp-bg-'+bgType, 'myp-tabs-scroll']" :style="mrScrollStyle">
		<view class="myp-tabs" :style="mrTabsStyle">
			<view v-for="(item, index) in items" :key="index" :ref="'item'+index" :id="'item'+index" class="myp-tab-item" :style="mrItemStyle + (index===value ? activeItemStyle:'')" @click="changeTab(index)">
				<text :class="['myp-color-'+(index===value?activeTextType:textType), 'myp-size-'+(index===value?activeTextSize:textSize)]" :style="textStyle + (index===value ? activeTextStyle : '')">{{ textLabel ? item[textLabel] : item }}</text>
			</view>
			<view v-if="hasIndicator" :class="['myp-tab-item-indicator', 'myp-bg-'+(indicatorType&&indicatorType.length>0?indicatorType:'text')]" :style="mrIndStyle"></view>
		</view>
	</scroll-view>
</template>

<script>
	//
	// item有固定高度和动态高度两种
	// 
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom');
	const animation = uni.requireNativePlugin('animation')
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
			textLabel: {
				type: String,
				default: null
			},
			// height of scroll
			scrollSize: {
				type: String,
				default: '750rpx'
			},
			// center或者end的时候，请注意items的数量不要超过总尺寸
			justify: {
				type: String,
				default: 'flex-start'
			},
			textSize: {
				type: String,
				default: ''
			},
			activeTextSize: {
				type: String,
				default: ''
			},
			bgType: {
				type: String,
				default: ''
			},
			textType: {
				type: String,
				default: ''
			},
			activeTextType: {
				type: String,
				default: ''
			},
			// item height: rpx/px
			// 0的时候，自适应高度
			height: {
				type: String,
				default: '80rpx'
			},
			width: {
				type: String,
				default: '120rpx'
			},
			hasIndicator: {
				type: Boolean,
				default: true
			},
			indicatorType: {
				type: String,
				default: ''
			},
			indicatorWidth: {
				type: String,
				default: '4rpx'
			},
			// 0的时候动态高度，自适应高度
			indicatorHeight: {
				type: String,
				default: '40rpx'
			},
			indicatorRadius: {
				type: String,
				default: '4rpx'
			},
			indicatorLeft: {
				type: String,
				default: '6rpx'
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
				// px. 动态宽度的item，获取其宽度，为了更好的设置indicator
				dyIndicatorHeight: 0,
				dyIndicatorTop: 0,
				// 缓存宽度信息，为了减少计算
				dyItems: {},
				scrollTop: 0,
				firstTop: 0
			}
		},
		computed: {
			mrIndStyle() {
				let _style = `width:${this.indicatorWidth};border-radius:${this.indicatorRadius};`
				_style += `top:${this.dyIndicatorTop}px;`
				_style += `height:${this.dyIndicatorHeight}px;`
				_style += `left:${this.indicatorLeft};`
				return _style + this.indicatorStyle
			},
			scrollSizePx() {
				if (this.scrollSize.indexOf('rpx') > 0) {
					return uni.upx2px(parseInt(this.scrollSize||0))
				}
				return parseInt(this.scrollSize||0)
			},
			fixedInd() {
				const indH = parseInt(this.indicatorHeight)
				if (indH > 0) {
					return true
				}
				return false
			},
			fixedIndHeight() {
				const indH = parseInt(this.indicatorHeight)
				if (indH > 0) {
					return this.indicatorHeight
				}
				return '0'
			},
			fixedIndHeightPx() {
				const indH = parseInt(this.fixedIndHeight)
				return uni.upx2px(indH)
			},
			mrScrollStyle() {
				let _style = ""
				_style += "height:" + this.scrollSize + ';'
				_style += "width:" + this.width + ';'
				// #ifdef APP-NVUE
				_style += `flex-direction:column;justify-content:${this.justify};`
				// #endif
				return _style + this.boxStyle
			},
			mrTabsStyle() {
				let _style = `flex-direction:column;justify-content:${this.justify};`
				// 只有在column排布的时候center或者end才需要设置高度，而且这个时候注意，内容不要超过实际高度
				if (this.justify === 'center' || this.justify === 'flex-end' || this.justify === 'space-between') {
					_style += "height:" + this.scrollSize + ';'
				}
				return _style
			},
			mrItemStyle() {
				let _style = `width:${this.width};`
				const h = parseInt(this.height)
				if (h > 0) {
					_style += `height:${this.height};`
				}
				return _style + this.itemStyle
			}
		},
		mounted() {
			setTimeout(()=>{
				this.toCurrentIndex(this.value)
				this.toCacheItemsSize()
			}, 60)
		},
		watch: {
			value(newV) {
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
			}
		},
		methods: {
			changeTab(index, animated = true) {
				this.$emit('change', index)
			},
			async toCurrentIndex(index) {
				let nowHeight = 0
				let _top = 0
				let indHeight = 0
				let indTop = 0
				let scrollT = 0
				const cachedScroll = this.dyItems['scroll']
				if (cachedScroll) {
					scrollT = cachedScroll.top
				} else {
					try{
						const res = await this.getElSize(-100)
						scrollT = res.top
						this.dyItems['scroll'] = {top: scrollT}
					}catch(e){
						//TODO handle the exception
					}
				}
				const cached = this.dyItems['item'+index]
				if (cached) {
					_top = cached.top
					nowHeight = cached.height
					indHeight = cached.ind
					indTop = cached.indTop
				} else {
					try{
						const result = await this.getElSize(index)
						_top = result.top - scrollT
						nowHeight = result.height
						if (this.fixedInd) {
							indHeight = this.fixedIndHeightPx
						} else {
							indHeight = nowHeight
						}
						indTop = _top + (nowHeight - indHeight) * 0.5
						// into cache
						this.dyItems['item'+index] = {height: nowHeight, top: _top, ind: indHeight, indTop: indTop}
					}catch(e){
						//TODO handle the exception
					}
				}
				const _height = _top + nowHeight
				// 移动indicator
				this.dyIndicatorHeight = indHeight
				this.dyIndicatorTop = indTop
				// 居中
				const scrollHeight = this.scrollSizePx
				const offset = _height - nowHeight / 2 - scrollHeight / 2
				if (offset > 0) {
					// #ifdef APP-NVUE
					const refName = "item" + index
					const el = this.$refs[refName][0]
					dom.scrollToElement(el, {
						offset: -0.5 * scrollHeight + nowHeight * 0.5,
						animated: true
					})
					// #endif
					// #ifndef APP-NVUE
					this.scrollTop = offset
					// #endif
				} else {
					if (this.scrollTop === 0) {
						this.scrollTop = 0.1
					} else {
						this.scrollTop = 0;
					}
				}
			},
			async toCacheItemsSize() {
				let scrollT = 0
				try{
					const cachedS = this.dyItems['scroll']
					if (cachedS) {
						scrollT = cachedS.top
					} else {
						const res = await this.getElSize(-100)
						scrollT = res.top
						this.dyItems['scroll'] = {top: scrollT}
					}
				}catch(e){
					//TODO handle the exception
				}
				for (const i in this.items) {
					const cached = this.dyItems['item'+i]
					if (cached) continue;
					try{
						const result = await this.getElSize(i)
						let indHeight = result.height
						if (this.fixedInd) {
							indHeight = this.fixedIndHeightPx
						}
						const top = result.top - scrollT
						this.dyItems['item'+i] = {height:result.height, top: top, ind: indHeight, indTop: top+(result.height-indHeight)*0.5}
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
	
	.myp-tabs {
		position: relative;
	}
	
	.myp-tab-item {
		flex-direction: row;
		align-items: center;
		
		&-indicator {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 0;
			height: 0;
			overflow: hidden;
			transition-property: height, top;
			transition-duration: 200ms;
			transition-timing-function: ease;
		}
	}
</style>
