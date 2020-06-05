<template>
	<view :style="boxStyle">
		<!-- #ifdef APP-NVUE -->
		<list :class="'myp-bg-'+bgType" :style="mrScrollStyle" ref="myp-scroller" :loadmoreoffset="loadMoreOffset" @loadmore="mypLoad">
			<myp-refresher-n v-if="mypDown.use" ref="myp-refresher" scroller-ref="myp-scroller" @refresh="mypRefresh"></myp-refresher-n>
			<slot></slot>
			<cell v-if="mypUp.use">
				<myp-loader :isLoading="mypIsUpLoading" :hasMore="mypHasMore"></myp-loader>
			</cell>
			<cell>
				<view :style="{height: footToken}"></view>
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
				<view :style="{height: footToken}"></view>
			</view>
		</scroll-view>
		<!-- #endif -->
	</view>
</template>

<script>
	// loading with loadMore/loadMoreOffset for list
	import styleMixin from '../myp-list/styleMixin.js'
	// #ifdef APP-NVUE
	import scrollMixin from '../myp-list/weexMixin.js'
	// #endif
	// #ifndef APP-NVUE
	import scrollMixin from '../myp-list/mixin.js'
	// #endif
	
	export default {
		mixins: [styleMixin, scrollMixin],
		props: {
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
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
</style>
