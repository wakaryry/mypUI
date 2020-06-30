<template>
	<view>
		<!-- #ifdef APP-NVUE -->
		<list class="myp-bg-inverse" ref="myp-list" :bounce="true" isSwiperList="true" :style="mypContentHeightStyle+'width:750rpx;'">
			<cell>
				<myp-title title1="我喜欢的" title1Style="font-weight: 600;" rightIcon1="radio-button" rightIcon2="right" rightIcon1Type="third" rightIcon2Type="third" boxStyle="padding-left:32rpx;padding-right:32rpx;"></myp-title>
				<myp-scroll-h height="300rpx"></myp-scroll-h>
			</cell>
			<cell>
				<myp-title title1="最近观看" title1Style="font-weight: 600;" title3="更多" title3Type="third" rightIcon2="right" rightIcon2Type="third" boxStyle="padding-left:32rpx;padding-right:32rpx;"></myp-title>
				<myp-scroll-h height="300rpx"></myp-scroll-h>
			</cell>
			<cell>
				<myp-title title1="其它推荐" title1Style="font-weight: 600;" title3="更多" title3Type="third" rightIcon2="right" rightIcon2Type="third" boxStyle="padding-left:32rpx;padding-right:32rpx;"></myp-title>
			</cell>
		</list>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<scroll-view class="myp-bg-inverse" :scroll-y="scrollable" :style="mypContentHeightStyle+'width:750rpx;'" @touchstart="mypOnTouchStart" @touchmove="mypOnTouchMove" @touchend="mypOnTouchEnd" @touchcancel="mypOnTouchEnd" @scroll="mypOnScroll">
			
		</scroll-view>
		<!-- #endif -->
	</view>
</template>

<script>
	import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js'
	import childMixin from '@/mypUI/myp-list/header/pureHeaderChild.js'
	
	export default {
		mixins: [contentBoxMixin, childMixin],
		data() {
			return {
				mypIncludeXBar: false,
				mypExtra: 180
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
