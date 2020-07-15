<template>
	<view class="myp-list" :style="boxStyle">
		<!-- #ifdef APP-NVUE -->
		<list :class="'myp-bg-'+bgType" scrollToBegin="false" :style="mrScrollStyle" ref="myp-scroller" @scroll="mypScroll">
			<myp-refresher-n ref="myp-refresher" scroller-ref="myp-scroller" @refresh="mypRefresh"></myp-refresher-n>
			<slot></slot>
			<cell>
				<view :style="{height: footToken}"></view>
			</cell>
			<cell>
				<view v-if="includeXBar&&overrideXBar" :style="mypXBarHeightStyle"></view>
			</cell>
			<cell>
				<view ref="myp-chat-bottom"></view>
			</cell>
		</list>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<scroll-view :class="'myp-bg-'+bgType" :style="mrScrollStyle" :scroll-y="mypScrollable" :scroll-top="mypScrollTop" :scroll-into-view="mypCurrentView" :scroll-with-animation="true" :enable-back-to-top="true" @scroll="mypScroll" @touchstart="mypTouchstartEvent" @touchmove="mypTouchmoveEvent" @touchend="mypTouchendEvent" @touchcancel="mypTouchendEvent">
			<view :style="mypMrScrollContentStyle">
				<view :style="mypMrRefreshStyle">
					<myp-refresher :refreshing="mypIsDownLoading" :couldUnLash="mypCouldUnLash" :rate="mypDownRate"></myp-refresher>
				</view>
				<!-- content of scroll -->
				<slot></slot>
				<view :style="{height: footToken}"></view>
				<view v-if="includeXBar&&overrideXBar" :style="mypXBarHeightStyle"></view>
				<view id="myp-chat-bottom"></view>
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
	// #ifdef APP-NVUE
	import scrollMixin from './weexMixin.js'
	const dom = uni.requireNativePlugin('dom')
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
						offset: uni.upx2px(140),
						inRate: 0.8,
						outRate: 0.2
					}
				}
			}
		},
		methods: {
			mypScrollToBottom() {
				// #ifdef APP-NVUE
				const ref = this.$refs['myp-chat-bottom']
				dom.scrollToElement(ref, {offset: 0, animated: true})
				// #endif
				// #ifndef APP-NVUE
				this.mypCurrentView = 'myp-chat-bottom'
				// #endif
			},
			mypScrollToElement(ref, options={offset: 0, animated: true}) {
				// #ifdef APP-NVUE
				dom.scrollToElement(ref, options)
				// #endif
				// #ifndef APP-NVUE
				this.mypCurrentView = null
				if (this.mypScrollTop === ref) {
					this.mypScrollTop = ref + 0.1
				} else {
					this.mypScrollTop = ref
				}
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-list {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		
		&-foot {
			position: absolute;
			left: 0;
			bottom: 0;
		}
	}
</style>
