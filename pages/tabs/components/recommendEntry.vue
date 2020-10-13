<template>
	<view class="re">
		<myp-title title1="推荐服务" title1Type="text" title1Size="l" title1Style="font-weight: 700;" boxStyle="padding-left: 24rpx;padding-right:24rpx;"></myp-title>
		<myp-grid-static :items="items" :columns="4" iconLabel="icon" textLabel="name" iconType="error" space="20rpx" iconStyle="font-size:46rpx;" itemHeight="180rpx" :hasLine="false" border="none" radius="none"></myp-grid-static>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{icon: 'book', name: '我的课程'},{icon: 'phone', name: '免流量服务'},{icon: 'love', name: '个性装扮'},{icon: 'users', name: '邀请赚钱', badge: {text: '', boxStyle: 'position:absolute;right:56rpx;top:36rpx;'}},{icon: 'search', name: '游戏中心'},{icon: 'deal', name: '我的钱包'},{icon: 'shop', name: '会员购中心'},{icon: 'circle-play', name: '直播中心'},{icon: 'comment-dots', name: '反馈论坛'},{icon: 'location', name: '充能领福利', badge: {text: '买1赠1', size: '0', boxStyle: 'position:absolute;right:0rpx;top:12rpx;padding-left:10rpx;padding-right:12rpx;border-radius:40rpx;'}}]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.re {
		
	}
</style>
