<template>
	<view class="myp-list" :style="boxStyle">
		<!-- #ifdef APP-NVUE -->
		<list :class="'myp-bg-'+bgType" :style="mrScrollStyle" ref="myp-scroller" :loadmoreoffset="(mypUp.use&&!useLoading)?loadMoreOffset:0" @loadmore="mypMoreLoad" @scroll="mypScroll">
			<myp-refresher-n v-if="mypDown.use" ref="myp-refresher" scroller-ref="myp-scroller" @refresh="mypRefresh"></myp-refresher-n>
			<slot></slot>
			<cell>
				<view :style="{height: footToken}"></view>
			</cell>
			<cell>
				<view v-if="includeXBar&&overrideXBar" :style="mypXBarHeightStyle"></view>
			</cell>
			<!-- in android, we must put loading in the last, or it will not trigger loading next page. --> 
			<!-- it's the same in loadMore with loadMoreOffset -->
			<!-- or we could put the foot-token after loading -->
			<cell v-if="mypUp.use&&!useLoading">
				<myp-loader :isLoading="mypIsUpLoading" :hasMore="mypHasMore"></myp-loader>
			</cell>
			<myp-loader-n v-if="mypUp.use&&useLoading" ref="myp-loader" :hasMore="mypHasMore" @loading="mypLoad"></myp-loader-n>
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
				<view v-if="includeXBar&&overrideXBar" :style="mypXBarHeightStyle"></view>
			</view>
		</scroll-view>
		<!-- #endif -->
		<!-- xBar -->
		<view v-if="includeXBar&&!overrideXBar" :class="['myp-bg-'+xBarBgType]" :style="mypXBarStyle"></view>
		<!-- foot -->
		<view v-if="hasFoot" class="myp-simple-foot" :style="footStyle">
			<slot name="foot"></slot>
			<view v-if="includeXBar" :style="mypXBarHeightStyle"></view>
		</view>
	</view>
</template>

<script>
	// loading with no loadMore for list
	import styleMixin from './styleMixin.js'
	// #ifdef APP-NVUE
	import scrollMixin from './weexMixin.js'
	// #endif
	// #ifndef APP-NVUE
	import scrollMixin from './mixin.js'
	// #endif
	
	export default {
		mixins: [styleMixin, scrollMixin],
		props: {
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
	.myp-list {
		position: relative;
		
		&-foot {
			position: absolute;
			left: 0;
			bottom: 0;
		}
	}
</style>
