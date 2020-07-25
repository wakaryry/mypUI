<template>
	<myp-drawer ref="stand" pos="bottom" standout="60px" width="750rpx" height="x-1000rpx" @overlayClicked="hide">
		<bottom></bottom>
		<myp-x-bar bgType="inverse" boxStyle="width:750rpx;"></myp-x-bar>
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
				this.$refs['stand'].hide()
			},
			show() {
				this.$refs['stand'].show()
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
