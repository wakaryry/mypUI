<template>
	<!-- #ifdef APP-NVUE -->
	<cell>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
	<view>
	<!-- #endif -->
		<slot></slot>
	<!-- #ifdef APP-NVUE -->
	</cell>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
	</view>
	<!-- #endif -->
</template>

<script>
	export default {
	}
</script>

<style lang="scss" scoped>
</style>
