<template>
	<view>
		<!-- #ifdef APP-NVUE -->
		<list class="myp-bg-inverse" ref="myp-list" :bounce="true" isSwiperList="true" :style="mypContentHeightStyle+'width:750rpx;'">
			
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
