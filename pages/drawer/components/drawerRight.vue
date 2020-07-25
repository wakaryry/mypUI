<template>
	<myp-drawer ref="drawer-right" pos="right" standout="32rpx" width="600rpx" @overlayClicked="hide">
		<view class="dr">
			<view style="width: 32rpx;"></view>
			<menu-view></menu-view>
		</view>
	</myp-drawer>
</template>

<script>
	import menuView from './menuView.vue'
	
	export default {
		components: {
			menuView
		},
		methods: {
			hide(duration) {
				this.$refs['drawer-right'].hide(duration)
			},
			show(duration) {
				this.$refs['drawer-right'].show(duration)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dr {
		flex-direction: row;
		flex-wrap: nowrap;
		width: 600rpx;
	}
</style>
