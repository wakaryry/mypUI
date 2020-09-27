<template>
	<!-- #ifdef APP-NVUE -->
	<list class="myp-bg-inverse" ref="myp-list" :bounce="true" isSwiperList="true" style="width:750rpx;flex:1;">
		
	</list>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
	<scroll-view class="myp-bg-inverse" :scroll-y="scrollable" :style="mypContentHeightStyle+'width:750rpx;'" @touchstart="mypOnTouchStart" @touchmove="mypOnTouchMove" @touchend="mypOnTouchEnd" @touchcancel="mypOnTouchEnd" @scroll="mypOnScroll">
		
	</scroll-view>
	<!-- #endif -->
</template>

<script>
	// #ifndef APP-NVUE
	import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js'
	// #endif
	
	import childMixin from '@/mypUI/myp-list/header/pureHeaderChild.js'
	
	export default {
		// #ifdef APP-NVUE
		mixins: [childMixin],
		// #endif
		// #ifndef APP-NVUE
		mixins: [contentBoxMixin, childMixin],
		// #endif
		data() {
			return {
				mypExtra: 'status-nav-x-180rpx'
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
