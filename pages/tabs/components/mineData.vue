<template>
	<view class="md">
		<myp-item v-for="(item,idx) in items" :key="idx" :icon="item.icon" :text="item.name" textType="text" iconType="primary" iconStyle="font-size: 46rpx;" space="20rpx" style="flex: 1;" boxStyle="flex:1;height:180rpx;"></myp-item>
	</view>
</template>

<script>
	// 我们注意到上面代码中有个 style="flex: 1;" 主要是小程序自定义组件里面boxStyle中设置无效，需要在style上设置
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
