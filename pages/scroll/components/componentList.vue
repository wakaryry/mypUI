<template>
	<view>
		<!-- #ifdef APP-NVUE -->
		<list class="myp-bg-inverse" ref="myp-list" :bounce="true" isSwiperList="true" :style="mypContentHeightStyle+'width:750rpx;'">
			<cell v-for="(item, idx) in items" :key="idx">
				<view class="cl-margin">
					<h-intro-card :item="item" @select="toPage(item.page)"></h-intro-card>
					<view style="height: 32rpx;"></view>
				</view>
			</cell>
		</list>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<scroll-view class="myp-bg-inverse" :scroll-y="scrollable" :style="mypContentHeightStyle+'width:750rpx;'" @touchstart="mypOnTouchStart" @touchmove="mypOnTouchMove" @touchend="mypOnTouchEnd" @touchcancel="mypOnTouchEnd" @scroll="mypOnScroll">
			<view class="cl-margin" v-for="(item, idx) in items" :key="idx">
				<h-intro-card :item="item" @select="toPage(item.page)"></h-intro-card>
				<view style="height: 32rpx;"></view>
			</view>
		</scroll-view>
		<!-- #endif -->
	</view>
</template>

<script>
	import hIntroCard from '@/components/card/hIntroCard.vue'
	
	import dataMixin from '@/pages/base/mixin/indexData.js'
	
	import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js'
	import childMixin from '@/mypUI/myp-list/header/pureHeaderChild.js'
	
	export default {
		components: {
			hIntroCard
		},
		mixins: [contentBoxMixin, childMixin, dataMixin],
		data() {
			return {
				mypIncludeXBar: false,
				mypExtra: 180
			}
		},
		methods: {
			toPage(val) {
				this.$emit("page", val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cl {
		&-margin {
			margin: 0 32rpx;
		}
	}
</style>
