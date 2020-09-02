<template>
	<view class="ce">
		<myp-title title1="创作中心" title1Type="text" title1Size="l" title1Style="font-weight: 700;" boxStyle="padding-left: 24rpx;padding-right:24rpx;">
			<myp-button bgType="error" border="none" radius="ll" icon="upload" text="发布" iconType="inverse" textType="inverse" boxStyle="width:160rpx;height:60rpx;"></myp-button>
			<myp-badge slot="extra" boxStyle="position:absolute;right:24rpx;top:12rpx;"></myp-badge>
		</myp-title>
		<view class="ce-grid">
			<!-- 只是示范，告诉你app/H5端可以这样 -->
			<!-- #ifdef APP-NVUE || H5 -->
			<myp-item v-for="(item,idx) in items" :key="idx" :icon="item.icon" :text="item.name" textType="text" iconType="warning" iconStyle="font-size: 52rpx;" space="20rpx" boxStyle="flex:1;height:180rpx;">
				<myp-badge v-if="item.badge" :text="item.number" size="32rpx" boxStyle="position:absolute;right:46rpx;top:8rpx;"></myp-badge>
			</myp-item>
			<!-- #endif -->
			<!-- #ifndef APP-NVUE || H5 -->
			<myp-item v-for="(item,idx) in items" :key="idx" :icon="item.icon" :text="item.name" textType="text" iconType="warning" iconStyle="font-size: 52rpx;" space="20rpx" boxStyle="width:187rpx;height:180rpx;">
				<myp-badge v-if="item.badge" :text="item.number" size="32rpx" boxStyle="position:absolute;right:46rpx;top:8rpx;"></myp-badge>
			</myp-item>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [
					{icon: 'report', name: '创作首页'},{icon: 'edu', name: '创作学院'},{icon: 'subject', name: '创作日历'},{icon: 'task', name: '热门活动', badge: true, number: 1},
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ce {
		width: 750rpx;
		background-color: #FFFFFF;
		
		&-grid {
			flex-direction: row;
			align-items: center;
			flex-wrap: nowrap;
			width: 750rpx;
		}
	}
</style>
