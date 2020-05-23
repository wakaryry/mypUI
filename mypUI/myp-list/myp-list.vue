<template>
	<view>
		<!-- #ifdef APP-NVUE -->
		<list :class="'myp-bg-'+bgType" :style="mrScrollStyle" ref="myp-scroller" :loadmoreoffset="loadMoreOffset" @loadmore="mypLoad">
			<myp-refresher-n v-if="mypDown.use" ref="myp-refresher" scroller-ref="myp-scroller" @refresh="mypRefresh"></myp-refresher-n>
			<!-- content of list. must in cell element -->
			<slot></slot>
			<loader v-if="mypUp.use&&useLoader" ref="myp-loader" :hasMore="mypHasMore" @loading="mypLoad"></loader>
			<cell v-if="mypUp.use&&!useLoader">
				<myp-loader :isLoading="mypIsUpLoading" :hasMore="mypHasMore"></myp-loader>
			</cell>
			<cell>
				<view :style="{height: footerToken}"></view>
			</cell>
		</list>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<scroll-view :class="'myp-bg-'+bgType" :style="mrScrollStyle" :scroll-y="mypScrollable" :enable-back-to-top="true" @scroll="mypScroll" @touchstart="mypTouchstartEvent" @touchmove="mypTouchmoveEvent" @touchend="mypTouchendEvent" @touchcancel="mypTouchendEvent">
			<view :style="mypMrScrollContentStyle">
				<view v-if="mypDown.use" :style="mypMrRefreshStyle">
					<myp-refresher :refreshing="mypIsDownLoading" :couldUnLash="mypCouldUnLash" :rate="mypDownRate"></myp-refresher>
				</view>
				<!-- content of scroll -->
				<slot></slot>
				<myp-loader v-if="mypUp.use" :isLoading="mypIsUpLoading" :hasMore="mypHasMore"></myp-loader>
				<view :style="{height: footerToken}"></view>
			</view>
		</scroll-view>
		<!-- #endif -->
		<!-- 是否显示回到顶部按钮 -->
		<view></view>
		<!-- 额外的底部内容 -->
		<view></view>
	</view>
</template>

<script>
	// 
	// 只是用来刷新/加载的列表
	// it's the list/scroll could with refresh and loadmore, for app it's list, others is acroll
	// 
	
	import iPhoneXMixin from '../myp-mixin/iPhoneXMixin.js'
	import windowMixin from '../myp-mixin/windowMixin.js'
	import scrollMixin from '../myp-scroll/mixin.js'
	import {Utils} from '../utils/utils.js'
	
	export default {
		mixins: [iPhoneXMixin, windowMixin, scrollMixin],
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
			// 对于app-nvue，是否使用loader作为上提的加载组件
			// 默认我们使用list的loadMore方法，不用loader，loader是需要上提一段距离才能加载更多
			useLoader: {
				type: Boolean,
				default: false
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
			down: {
				type: Object,
				default: ()=>{
					return {
						use: true,
						offset: uni.upx2px(140),
						inRate: 0.8,
						outRate: 0.2
					}
				}
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
		computed: {
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
			this.mypDown = Object.assign(defaultDown, this.down)
			this.mypUp = Object.assign(defaultUp, this.up)
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
			mypRefresh() {
				// console.log('refresh')
				this.mypPrePage = this.mypCurrentPage
				this.mypCurrentPage = 1
				// #ifdef APP-NVUE
				if (this.down.use) {
					this.mypIsDownLoading = true
				}
				// #endif
				this.toGetContentList('refresh')
			},
			mypLoad() {
				// console.log('load-1')
				// 因为我们在list上加了loadmore，需要额外判断一下
				// #ifdef APP-NVUE
				if (!this.up.use) return;
				// 如果正在刷新，不进行加载更多
				if (this.mypIsDownLoading) return;
				if (this.mypIsUpLoading) return;
				if (!this.mypHasMore) return;
				// #endif
				this.mypPrePage = this.mypCurrentPage
				this.mypCurrentPage += 1
				// console.log('load-2')
				// #ifdef APP-NVUE
				if (this.up.use) {
					this.mypIsUpLoading = true
				}
				// #endif
				this.toGetContentList('load')
			},
			toInitContentList() {
				this.mypPrePage = 0
				this.mypCurrentPage = 1
				// #ifdef APP-NVUE
				if (this.down.use) {
					this.mypIsDownLoading = true
				}
				// #endif
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
</style>
