<template>
	<view class="myp-simple" :style="boxStyle">
		<!-- #ifdef APP-NVUE -->
		<list :class="'myp-bg-'+bgType" :style="boxStyle" :show-scrollbar="showScrollbar" @scroll="toScroll">
			<slot></slot>
		</list>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<scroll-view :scroll-y="true" :class="'myp-bg-'+bgType" :style="boxStyle" :show-scrollbar="showScrollbar" @scroll="toScroll">
			<slot></slot>
		</scroll-view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		methods: {
			toScroll(e) {
				this.$emit("scroll", e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-simple {
		position: relative;
	}
</style>
