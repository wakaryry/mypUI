<template>
	<view :class="['myp-bg-'+bgType]" :style="mrScrollStyle+boxStyle">
		<slot></slot>
	</view>
</template>

<script>
	import styleMixin from '../myp-list/styleMixin.js'
	
	export default {
		mixins: [styleMixin]
	}
</script>

<style>
</style>
