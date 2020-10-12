<template>
	<!-- #ifndef APP-NVUE -->
	<scroll-view :class="['myp-bg-'+bgType]" :style="mrBoxStyle" :scroll-y="mypScrollable" :show-scrollbar="showScrollbar" :enable-back-to-top="true" @scroll="mypScroll" @touchstart="mypTouchstartEvent" @touchmove="mypTouchmoveEvent" @touchend="mypTouchendEvent" @touchcancel="mypTouchendEvent">
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<list :class="['myp-full-flex', 'myp-bg-'+bgType]" :style="mrBoxStyle" ref="myp-scroller" :show-scrollbar="showScrollbar" :loadmoreoffset="(mypUp.use&&!useLoading)?loadMoreOffset:0" @loadmore="mypMoreLoad" @scroll="mypScroll">
		<myp-refresher-n v-if="mypDown.use" ref="myp-refresher" scroller-ref="myp-scroller" @refresh="mypRefresh"></myp-refresher-n>
		<slot></slot>
		<!-- in android, we must put loading in the last, or it will not trigger loading next page. --> 
		<!-- it's the same in loadMore with loadMoreOffset -->
		<cell v-if="mypUp.use&&!useLoading">
			<myp-loader :isLoading="mypIsUpLoading" :hasMore="mypHasMore"></myp-loader>
		</cell>
		<myp-loader-n v-if="mypUp.use&&useLoading" ref="myp-loader" :hasMore="mypHasMore" @loading="mypLoad"></myp-loader-n>
	</list>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
		<view :style="mypMrScrollContentStyle">
			<view v-if="mypDown.use" :style="mypMrRefreshStyle">
				<myp-refresher :refreshing="mypIsDownLoading" :couldUnLash="mypCouldUnLash" :rate="mypDownRate"></myp-refresher>
			</view>
			<!-- content of scroll -->
			<slot></slot>
			<myp-loader v-if="mypUp.use" :isLoading="mypIsUpLoading" :hasMore="mypHasMore"></myp-loader>
		</view>
	</scroll-view>
	<!-- #endif -->
</template>

<script>
	import styleMixin from './styleMixin.js'
	import scrollMixin from './mixin.js'
	import weexActions from './weexActions.js'
	import {getPlatform} from '../utils/system.js'
	
	export default {
		mixins: [styleMixin, scrollMixin, weexActions],
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
			this.mypDown = Object.assign({use: true,offset: uni.upx2px(140),inRate: 0.8,outRate: 0.2}, this.down)
			this.mypUp = Object.assign({use: true,offset: 80}, this.up)
			// #endif
			// #ifdef APP-NVUE
			this.mypDown = Object.assign(this.down)
			this.mypUp = Object.assign(this.up)
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

<style>
</style>
