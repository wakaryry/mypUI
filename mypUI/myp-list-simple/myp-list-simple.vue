<template>
	<!-- #ifndef APP-NVUE -->
	<scroll-view :scroll-y="true" :class="['myp-full-flex', 'myp-bg-'+bgType, 'myp-position-'+position]" :style="mrBoxStyle" :show-scrollbar="showScrollbar" @scroll="toScroll">
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<list :class="['myp-full-flex', 'myp-bg-'+bgType, 'myp-position-'+position]" :style="mrBoxStyle" :show-scrollbar="showScrollbar" @scroll="toScroll">
		<slot></slot>
	</list>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
		<slot></slot>
	</scroll-view>
	<!-- #endif -->
</template>

<script>
	import styleMixin from '../myp-list/styleMixin.js'
	
	export default {
		mixins: [styleMixin],
		methods: {
			toScroll(e) {
				this.$emit("scroll", e)
			}
		}
	}
</script>

<style>
</style>
