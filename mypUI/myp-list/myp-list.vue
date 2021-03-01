<template>
	<!-- #ifndef APP-NVUE -->
	<scroll-view :scroll-into-view="mypCurrentView" :scroll-top="mypScrollTop" :scroll-with-animation="true" :class="['myp-bg-'+bgType, reverse&&'myp-list-reverse']" :style="mrBoxStyle" :scroll-y="mypScrollable" :show-scrollbar="showScrollbar" :enable-back-to-top="true" @scroll="mypScroll" @touchstart="mypTouchstartEvent" @touchmove="mypTouchmoveEvent" @touchend="mypTouchendEvent" @touchcancel="mypTouchendEvent">
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<list :class="['myp-full-flex', 'myp-bg-'+bgType, reverse&&'myp-list-reverse']" :style="mrBoxStyle" ref="myp-scroller" :show-scrollbar="showScrollbar" :loadmoreoffset="(mypUp.use&&!useLoading)?loadMoreOffset:0" @loadmore="mypMoreLoad" @scroll="mypScroll">
		<myp-refresher-n v-if="mypDown.use" ref="myp-refresher" scroller-ref="myp-scroller" :mainText="refreshMainText" :pullingText="pullingText" :refreshingText="refreshingText" :boxStyle="(reverse?'transform: rotateX(180deg);':'')+refreshStyle" @refresh="mypRefresh"></myp-refresher-n>
		<cell>
			<view ref="myp-list-top"></view>
		</cell>
		<slot></slot>
		<cell>
			<view ref="myp-list-bottom"></view>
		</cell>
		<!-- in android, we must put loading in the last, or it will not trigger loading next page. --> 
		<!-- it's the same in loadMore with loadMoreOffset -->
		<cell v-if="mypUp.use&&!useLoading">
			<myp-loader :isLoading="mypIsUpLoading" :hasMore="mypHasMore" :showNoMore="showNoMore" :mainText="loadMainText" :loadingText="loadingText" :noMoreText="noMoreText" :loadingSrc="loadingSrc" :boxStyle="(reverse?'transform: rotateX(180deg);':'')+loadingStyle"></myp-loader>
		</cell>
		<myp-loader-n v-if="mypUp.use&&useLoading" ref="myp-loader" :hasMore="mypHasMore" :showNoMore="showNoMore" :mainText="loadMainText" :loadingText="loadingText" :noMoreText="noMoreText" :loadingSrc="loadingSrc" :boxStyle="(reverse?'transform: rotateX(180deg);':'')+loadingStyle" @loading="mypLoad"></myp-loader-n>
	</list>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
		<view :style="mypMrScrollContentStyle">
			<view v-if="mypDown.use" :style="mypMrRefreshStyle">
				<myp-refresher :refreshing="mypIsDownLoading" :couldUnLash="mypCouldUnLash" :rate="mypDownRate" :mainText="refreshMainText" :pullingText="pullingText" :refreshingText="refreshingText" :boxStyle="(reverse?'transform: rotateX(180deg);':'')+refreshStyle"></myp-refresher>
			</view>
			<view id="myp-list-top" ref="myp-list-top"></view>
			<!-- content of scroll -->
			<slot></slot>
			<view id="myp-list-bottom" ref="myp-list-bottom"></view>
			<myp-loader v-if="mypUp.use" :isLoading="mypIsUpLoading" :hasMore="mypHasMore" :showNoMore="showNoMore" :mainText="loadMainText" :loadingText="loadingText" :noMoreText="noMoreText" :loadingSrc="loadingSrc" :boxStyle="(reverse?'transform: rotateX(180deg);':'')+loadingStyle"></myp-loader>
		</view>
	</scroll-view>
	<!-- #endif -->
</template>

<script>
	import styleMixin from './styleMixin.js'
	import refreshLoadCustom from './refreshLoadCustom.js'
	import scrollMixin from './mixin.js'
	import weexActions from './weexActions.js'
	import {getPlatform} from '../utils/system.js'
	
	export default {
		mixins: [styleMixin, refreshLoadCustom, scrollMixin, weexActions],
		props: {
			// #ifdef APP-NVUE
			/**
			 * 是否启用loading组件，而不是loadmoreoffset触发
			 */
			useLoading: {
				type: Boolean,
				default: false
			},
			/**
			 * 使用loadmoreoffset时的触发偏移量
			 */
			loadMoreOffset: {
				type: Number,
				default: 60
			},
			// #endif
			/**
			 * 是否自动加载第一页数据
			 */
			autoUpdate: {
				type: Boolean,
				default: false
			},
			/**
			 * 下拉刷新的配置
			 */
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
			/**
			 * 上提加载的配置
			 */
			up: {
				type: Object,
				default: ()=>{
					return {
						use: true,
						offset: 80
					}
				}
			}
		},
		created() {
			// config the down/up
			// #ifndef APP-NVUE
			this.mypDown = Object.assign({use: true,offset: uni.upx2px(140),inRate: 0.8,outRate: 0.2}, this.down||{use:false})
			this.mypUp = Object.assign({use: true,offset: 80}, this.up||{use:false})
			// #endif
			// #ifdef APP-NVUE
			this.mypDown = Object.assign(this.down||{use:false})
			this.mypUp = Object.assign(this.up||{use:false})
			this.platform = getPlatform()
			// #endif
			// emit this 会在mp端报错，且不建议
			// this.$emit("inited", this)
			// 注意：如果直接emit，外部监听到inited的时候，还不能通过ref获取到实例
			// this.$emit("inited")
			setTimeout(()=>{
				this.$emit("inited")
			}, 0)
			if (this.autoUpdate) {
				const that = this
				setTimeout(() => {
					// to refresh data
					this.mypInitContentList()
				}, 10)
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.myp-list {
		&-reverse {
			transform: rotateX(180deg);
		}
	}
</style>
