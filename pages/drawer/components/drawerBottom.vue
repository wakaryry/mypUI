<template>
	<myp-drawer ref="drawer-bottom" pos="bottom" standout="60px" width="750rpx" height="x-1000rpx" @overlayClicked="hide">
		<bottom></bottom>
		<myp-x-bar bgType="primary" boxStyle="width:750rpx;"></myp-x-bar>
	</myp-drawer>
</template>

<script>
	import bottom from './bottom.vue'
	
	export default {
		components: {
			bottom
		},
		methods: {
			hide(duration) {
				this.$refs['drawer-bottom'].hide(duration)
			},
			show(duration) {
				this.$refs['drawer-bottom'].show(duration)
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
