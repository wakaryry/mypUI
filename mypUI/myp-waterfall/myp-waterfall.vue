<template>
	<view class="myp-list" :style="boxStyle">
		<!-- #ifdef APP-NVUE -->
		<waterfall :class="'myp-bg-'+bgType" :style="mrScrollStyle" ref="myp-scroller" :show-scrollbar="showScrollbar" :column-count="columnCount" :column-width="columnWidthPx" :column-gap="columnGapPx" :left-gap="leftGapPx" :right-gap="rightGapPx" :loadmoreoffset="(mypUp.use&&!useLoading)?loadMoreOffset:0" @loadmore="mypMoreLoad" @scroll="mypScroll">
			<myp-refresher-n v-if="mypDown.use" ref="myp-refresher" scroller-ref="myp-scroller" @refresh="mypRefresh"></myp-refresher-n>
			<header>
				<slot name="header"></slot>
			</header>
			<slot></slot>
			<myp-loader-n v-if="mypUp.use&&useLoading" ref="myp-loader" :hasMore="mypHasMore" @loading="mypLoad"></myp-loader-n>
		</waterfall>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<scroll-view :class="'myp-bg-'+bgType" :style="mrScrollStyle" :scroll-y="mypScrollable" :show-scrollbar="showScrollbar" :enable-back-to-top="true" @scroll="mypScroll" @touchstart="mypTouchstartEvent" @touchmove="mypTouchmoveEvent" @touchend="mypTouchendEvent" @touchcancel="mypTouchendEvent">
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
		<view class="myp-simple-foot" :style="mrFootStyle">
			<slot name="foot"></slot>
		</view>
	</view>
</template>

<script>
	import styleMixin from '../myp-list/styleMixin.js'
	import scrollMixin from '../myp-list/mixin.js'
	import weexActions from '../myp-list/weexActions.js'
	import waterfallMixin from './mixin.js'
	
	export default {
		mixins: [styleMixin, scrollMixin, weexActions, waterfallMixin],
		props: {
			// #ifdef APP-NVUE
			// 是否启用loading组件，而不是loadmoreofset触发
			useLoading: {
				type: Boolean,
				default: false
			},
			// 使用loadmoreofset时的触发偏移量
			loadMoreOffset: {
				type: Number,
				default: 60
			},
			// #endif
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
		created() {
			// config the down/up
			// #ifndef APP-NVUE
			this.mypDown = Object.assign({use: true,offset: uni.upx2px(140),inRate: 0.8,outRate: 0.2}, this.down)
			this.mypUp = Object.assign({use: true,offset: 80}, this.up)
			// #endif
			// #ifdef APP-NVUE
			this.mypDown = Object.assign(this.down)
			this.mypUp = Object.assign(this.up)
			this.platform = this.mypGetPlatform()
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
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: column;
		
		&-foot {
			position: absolute;
			left: 0;
			bottom: 0;
		}
	}
</style>
