<template>
	<view class="myp-simple" :style="boxStyle">
		<!-- #ifdef APP-NVUE -->
		<list :class="'myp-bg-'+bgType" :style="mrScrollStyle" :show-scrollbar="showScrollbar" @scroll="toScroll">
			<slot></slot>
			<cell>
				<view :style="{height: footToken}"></view>
			</cell>
			<cell>
				<view v-if="includeXBar&&overrideXBar" :style="mypXBarHeightStyle"></view>
			</cell>
		</list>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<scroll-view :scroll-y="true" :class="'myp-bg-'+bgType" :style="mrScrollStyle" :show-scrollbar="showScrollbar" @scroll="toScroll">
			<slot></slot>
			<view :style="{height: footToken}"></view>
			<view v-if="includeXBar&&overrideXBar" :style="mypXBarHeightStyle"></view>
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
	
	export default {
		mixins: [styleMixin],
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
		
		&-foot {
			position: absolute;
			left: 0;
			bottom: 0;
		}
	}
</style>
