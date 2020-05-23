<template>
	<view class="hs">
		<scroll-view :class="'myp-bg-'+bgType" :style="mrScrollStyle" :scroll-y="mypScrollable" :enable-back-to-top="true" @scroll="mypScroll" @touchstart="mypTouchstartEvent" @touchmove="mypTouchmoveEvent" @touchend="mypTouchendEvent" @touchcancel="mypTouchendEvent">
			<view :style="mypMrScrollContentStyle+'left:0px;'" ref="mypSc">
				<!-- content of scroll -->
				<slot></slot>
				<myp-loader v-if="mypUp.use" :isLoading="mypIsUpLoading" :hasMore="mypHasMore"></myp-loader>
				<view :style="{height: footerToken}"></view>
				<!-- refresh view / header view -->
				<view>
					<myp-refresher v-if="downMode==='bottom'&&mypDown.use" :refreshing="mypIsDownLoading" :couldUnLash="mypCouldUnLash" :rate="mypDownRate"></myp-refresher>
				</view>
				<view :style="mypMrRefreshStyle">
					<myp-refresher v-if="downMode==='top'&&mypDown.use" :refreshing="mypIsDownLoading" :couldUnLash="mypCouldUnLash" :rate="mypDownRate"></myp-refresher>
					<slot name="head"></slot>
				</view>
			</view>
		</scroll-view>
		<!-- content of hover-thing -->
		<view class="hs-hover" :style="mrHoverStyle+noWeexHoverAni">
			<slot name="hover"></slot>
		</view>
	</view>
</template>

<script>
	//
	// 可以待自动打开/关闭的头部内容的刷新/加载列表
	// 全部基于scroll-view
	// - 支持下拉刷新/上提加载
	// - 支持包含头部内容，以及头部内容的打开/关闭
	// - 支持悬停/悬浮内容
	// 
	
	// #ifdef APP-NVUE
	const animation = weex.requireModule('animation');
	// #endif
	
	import iPhoneXMixin from '../myp-mixin/iPhoneXMixin.js'
	import windowMixin from '../myp-mixin/windowMixin.js'
	import hoverScrollMixin from './scrollMixin.js'
	import {Utils} from '../utils/utils.js'
	
	export default {
		mixins: [iPhoneXMixin, windowMixin, hoverScrollMixin],
		props: {
			// 以下全用于计算高度
			hasStatus: {
				type: Boolean,
				default: true
			},
			tabHeight: {
				type: Number,
				default: 0 // px
			},
			navHeight: {
				type: Number,
				default: 44 // px
			},
			supportXBar: {
				type: Boolean,
				default: true
			},
			extra: {
				type: [Number, String],
				default: 0  // rpx or px, number is rpx
			},
			// 如果设置了height，则会直接使用height，忽略其它的计算
			height: {
				type: [Number, String],
				default: '0'
			},
			width: {
				type: String,
				default: '750rpx'
			},
			header: {
				type: Object,
				default: ()=>{
					return {
						use: false,  // 是否启用header
						offset: 80, // px. 临界点，打开该高度时允许自动打开或者关闭
						inRate: 0.8,
						outRate: 0.2
					}
				}
			},
			// header的高度
			headerHeight: {
				type: [Number, String],
				default: '0'
			},
			// app loadmore offset. px
			loadMoreOffset: {
				type: Number,
				default: 20
			},
			// 进入自动刷新数据. 默认不自动刷新数据
			autoUpdate: {
				type: Boolean,
				default: false
			},
			// 仅仅只是判断是否开启刷新，与header存在与否没有关系
			// 下拉刷新的方式有两种，一是 header顶部继续下拉， 二是 header下方可以拉出刷新组件。
			// 下方拉出时，只需要刷新组件上下移动就可以，其它不用动
			down: {
				type: Object,
				default: ()=>{
					return {
						use: true,
						offset: uni.upx2px(140),  // 下拉偏移量
						inRate: 0.8,
						outRate: 0.2
					}
				}
			},
			// top/bottom 下拉组件在header的位置关系
			downMode: {
				type: String,
				default: 'top'
			},
			up: {
				type: Object,
				default: ()=>{
					return {
						use: true,
						offset: 80
					}
				}
			},
			// if has a hover
			hasHover: {
				type: Boolean,
				default: false
			},
			hoverHeight: {
				type: [String, Number],
				default: '80rpx'
			},
			// hover最终应该出现的位置，距离顶部的距离
			hoverTop: {
				type: [Number, String],
				default: '0'
			},
			// hover在scroll中的位置,依此来显示和隐藏hover
			hoverScrollTop: {
				type: [Number, String],
				default: '0'
			},
			// content
			// 我们可以在scroll的底部额外增加一个高度的blank-view，方便某些pisition:absolute 等元素的处理，不至于遮住scroll的内容
			footerToken: {
				type: String,
				default: '0px'  // 占位的高度
			},
			boxStyle: {
				type: String,
				default: ''
			},
			// 设置scroll/list的背景色，我们一般不在boxStyle里面设置背景色
			bgType: {
				type: String,
				default: 'page'
			}
		},
		data() {
			return {
				noWeexHoverAni: ''
			}
		},
		computed: {
			mypMrScrollContentStyle() {
				let _style = `position: relative; width:${this.width};`
				// #ifdef APP-NVUE
				// 增加监听内容，否则可能建立监听失败
				const a = this.mypDownHeight
				const scRef = this.$refs.mypSc
				if (scRef) {
					const ty = this.mypMrDownHeight > 0 ? this.mypMrDownHeight : 0
					animation.transition(scRef, {
						styles: {
							transform: `translate(0px, ${ty}px)`
						},
						duration: this.mypIsDownReset ? 300 : 0
					})
				} else {
					// 只会运行一次，因为第一次进来ref不存在
					this.toInitHeaderPos()
				}
				// #endif
				// #ifndef APP-NVUE
				_style += this.mypIsDownReset ? 'transition-property: transform; transition-duration: 300ms;' : ''
				if (this.mypMrDownHeight > 0) {
					_style += `transform: translateY(${this.mypMrDownHeight}px);`
				} else {
					// 在app-nvue下必须添加，否则内容会往左偏移50%
					_style += `transform: translateY(0px);`
				}
				// #endif
				return _style
			},
			mypMrRefreshStyle() {
				// 必须设置宽度，否则在app-nvue下会变形
				return `position: absolute; transform: translateY(-100%); left: 0px; width:${this.width};`
			},
			// 计算属性,响应式的.而不是在created直接计算
			// scrollMixin中需要用到，所以命名为myp开头
			// 必须提供该值，一方面你需要设置scroll的高度，另一方面在scrollMixin的上提加载更多中需要用到
			mypScrollHeight() {
				if (this.heightPx !== 0) {
					return this.heightPx
				}
				const app = getApp({allowDefault: true})
				let _height = this.mypGetScreenHeight()
				if (_height === 0) {
					// try again
					_height = this.mypGetScreenHeight()
				}
				if (this.hasStatus) {
					_height = _height - this.mypGetStatusBarHeight()
				}
				if (_height === 0) {
					return 0
				}
				const xBarHeight = this.supportXBar ? this.mypXBarHeight : 0  // 34px
				return _height - this.navHeight - this.tabHeight - this.extraPx - xBarHeight
			},
			heightPx() {
				if (parseInt(this.height) === 0) {
					return 0
				}
				if (typeof this.height === 'number') {
					return uni.upx2px(this.height)
				}
				if (this.height.indexOf('rpx') >= 0) {
					return uni.upx2px(parseInt(this.height))
				}
				return parseInt(this.height)
			},
			mrScrollStyle() {
				return `width:${this.width};height:${this.mypScrollHeight}px;`+this.boxStyle
			},
			mrHoverStyle() {
				return `top:${this.hoverTopPx}px;`
			},
			extraPx() {
				if (typeof this.extra === 'number') {
					return uni.upx2px(this.extra)
				}
				if (this.extra.indexOf('rpx') >= 0) {
					return uni.upx2px(parseInt(this.extra))
				} else if (this.extra.indexOf('px') >= 0) {
					return parseInt(this.extra)
				} else {
					return uni.upx2px(parseInt(this.extra))
				}
			},
			headerHeightPx() {
				if (parseInt(this.headerHeight) === 0) {
					return this.header.offset
				}
				if (typeof this.headerHeight === 'number') {
					return uni.upx2px(this.headerHeight)
				}
				if (this.headerHeight.indexOf('rpx') >= 0) {
					return uni.upx2px(parseInt(this.headerHeight))
				} else if (this.headerHeight.indexOf('px') >= 0) {
					return parseInt(this.headerHeight)
				} else {
					return uni.upx2px(parseInt(this.headerHeight))
				}
			},
			hoverHeightPx() {
				if (typeof this.hoverHeight === 'number') {
					return uni.upx2px(this.hoverHeight)
				}
				if (this.hoverHeight.indexOf('rpx') >= 0) {
					return uni.upx2px(parseInt(this.hoverHeight))
				} else if (this.hoverHeight.indexOf('px') >= 0) {
					return parseInt(this.hoverHeight)
				} else {
					return uni.upx2px(parseInt(this.hoverHeight))
				}
			},
			hoverTopPx() {
				if (typeof this.hoverTop === 'number') {
					return uni.upx2px(this.hoverTop)
				}
				if (this.hoverTop.indexOf('rpx') >= 0) {
					return uni.upx2px(parseInt(this.hoverTop))
				} else if (this.hoverTop.indexOf('px') >= 0) {
					return parseInt(this.hoverTop)
				} else {
					return uni.upx2px(parseInt(this.hoverTop))
				}
			},
			hoverScrollTopPx() {
				if (typeof this.hoverScrollTop === 'number') {
					return uni.upx2px(this.hoverScrollTop)
				}
				if (this.hoverScrollTop.indexOf('rpx') >= 0) {
					return uni.upx2px(parseInt(this.hoverScrollTop))
				} else if (this.hoverScrollTop.indexOf('px') >= 0) {
					return parseInt(this.hoverScrollTop)
				} else {
					return uni.upx2px(parseInt(this.hoverScrollTop))
				}
			}
		},
		created() {
			// config the down/up
			const defaultDown = {
				use: true,
				offset: uni.upx2px(140),
				inRate: 0.8,
				outRate: 0.2
			}
			const defaultUp = {
				use: true,
				offset: 80
			}
			const defaultHeader = {
				use: false,
				offset: 80,
				inRate: 0.8,
				outRate: 0.2
			}
			if (parseInt(this.headerHeight) !== 0) {
				defaultHeader.offset = this.headerHeightPx
			}
			this.mypDown = Object.assign(defaultDown, this.down)
			this.mypUp = Object.assign(defaultUp, this.up)
			this.mypHeader = Object.assign(defaultHeader, this.header)
			if (this.header.use) {
				// 默认打开header，所以不允许滚动
				this.mypScrollable = false
			}
			// 因为emit this 会导致在mp端报错。并且感觉不建议emit this
			// this.$emit("inited", this)
			// 注意：如果我们直接emit，外部监听到inited的时候，还不能通过ref获取到实例
			// 您可以加个setTimeout(()=>{}, 0)来获取实例
			// 这里我们事先加了个延时
			// this.$emit("inited")
			setTimeout(()=>{
				this.$emit("inited")
			}, 0)
			if (this.autoUpdate) {
				const that = this
				setTimeout(() => {
					// to refresh data
					this.toInitContentList()
				}, 10)
			}
		},
		methods: {
			toInitHeaderPos() {
				// 必须加一个延时，否则取不到ref
				setTimeout(()=>{
					const aRef = this.$refs.mypSc
					const ty = this.mypMrDownHeight > 0 ? this.mypMrDownHeight : 0
					animation.transition(aRef, {
						styles: {
							transform: `translate(0px, ${ty}px)`
						},
						duration: this.mypIsDownReset ? 300 : 0
					})
				}, 0)
			},
			mypRefresh() {
				// console.log('refresh')
				this.mypPrePage = this.mypCurrentPage
				this.mypCurrentPage = 1
				this.toGetContentList('refresh')
			},
			mypLoad() {
				this.mypPrePage = this.mypCurrentPage
				this.mypCurrentPage += 1
				this.toGetContentList('load')
			},
			toInitContentList() {
				this.mypPrePage = 0
				this.mypCurrentPage = 1
				this.toGetContentList('refresh')
			},
			toGetContentList(type='refresh') {
				if (type === 'refresh') {
					//this.$emit('down', this)
					this.$emit('down')
				} else {
					//this.$emit('up', this)
					this.$emit('up')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hs {
		&-hover {
			position: fixed;
			left: 0;
			width: 750rpx;
			height: 0px;
			overflow: hidden;
		}
	}
</style>
