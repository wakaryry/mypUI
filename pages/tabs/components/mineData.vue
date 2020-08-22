<template>
	<view class="md">
		<myp-item v-for="(item,idx) in items" :key="idx" :icon="item.icon" :text="item.name" textType="text" iconType="primary" iconStyle="font-size: 52rpx;" space="20rpx" boxStyle="flex:1;height:180rpx;"></myp-item>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [
					{icon: 'building', name: '离线缓存'},{icon: 'circle-play', name: '稍后再看'},{icon: 'star', name: '我的收藏'},{icon: 'refresh', name: '历史记录'},
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.md {
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		width: 750rpx;
		background-color: #FFFFFF;
	}
</style>
