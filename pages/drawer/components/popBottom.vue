<template>
	<myp-drawer ref="pop" pos="bottom" width="750rpx" height="x-1000rpx" @overlayClicked="hide">
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
			hide() {
				this.$refs['pop'].hide()
			},
			show() {
				this.$refs['pop'].show()
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
