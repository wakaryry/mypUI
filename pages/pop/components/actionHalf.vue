<template>
	<myp-popup :show="show" pos="bottom" width="600rpx" height="272px" bottomOffset="x" @overlayClicked="toCancel">
		<view class="ah">
			<myp-button text="政治" bgType="inverse" textType="text" border="none" radius="ll" boxStyle="width:600rpx;height:60px;" @buttonClicked="toSelect(0)"></myp-button>
			<view style="height: 8px;"></view>
			<myp-button text="色情" bgType="inverse" textType="text" border="none" radius="ll" boxStyle="width:600rpx;height:60px;" @buttonClicked="toSelect(1)"></myp-button>
			<view style="height: 8px;"></view>
			<myp-button text="赌博" bgType="inverse" textType="text" border="none" radius="ll" boxStyle="width:600rpx;height:60px;" @buttonClicked="toSelect(2)"></myp-button>
			<view style="height: 8px;"></view>
			<myp-button text="宗教" bgType="inverse" textType="text" border="none" radius="ll" boxStyle="width:600rpx;height:60px;" @buttonClicked="toSelect(3)"></myp-button>
			<view style="height: 8px;"></view>
		</view>
	</myp-popup>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			toCancel() {
				this.$emit("cancel")
			},
			toSelect(i) {
				this.$emit("select", i)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	
	.aa {
		width: 600rpx;
		height: 272px;
	}
</style>
