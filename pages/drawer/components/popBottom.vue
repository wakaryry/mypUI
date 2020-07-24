<template>
	<myp-popup-always :show="show" pos="bottom" width="750rpx" height="x-1000rpx" @overlayClicked="toCancel">
		<bottom></bottom>
		<myp-x-bar bgType="inverse" boxStyle="width:750rpx;"></myp-x-bar>
	</myp-popup-always>
</template>

<script>
	import bottom from './bottom.vue'
	
	export default {
		components: {
			bottom
		},
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			toCancel() {
				this.$emit("cancel")
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
