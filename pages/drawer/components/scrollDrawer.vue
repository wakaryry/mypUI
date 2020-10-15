<template>
	<myp-drawer :hasOverlay="false" :auto="false" standout="screen-!status-!nav-!432rpx" extra="status-nav">
		<view style="flex: 1;">
			<view class="sd-header">
				<view class="sd-vip">
					<view class="sd-vip-row">
						<myp-icon name="vip" type="error"></myp-icon>
						<text class="sd-vip-text">更加舒畅的控制与动画</text>
					</view>
					<view class="sd-vip-row">
						<text class="sd-vip-desc">299元永久</text>
						<myp-icon name="right"></myp-icon>
					</view>
				</view>
				<view class="sd-top">
					<view class="sd-top-row">
						<myp-icon name="radio-button"></myp-icon>
						<text class="sd-top-text">VIP特权</text>
						<text class="sd-top-desc">(共{{items.length}}项)</text>
					</view>
					<myp-button bgType="error" icon="plus" text="开通VIP" iconType="inverse" textType="inverse" border="none" radius="ll" boxStyle="width:240rpx;height:72rpx;"></myp-button>
				</view>
			</view>
			<myp-list-simple bgType="inverse">
				<myp-list-cell v-for="(item,idx) in items" :key="idx">
					<h-vip-cell :item="item" :index="idx+1"></h-vip-cell>
				</myp-list-cell>
			</myp-list-simple>
		</view>
	</myp-drawer>
</template>

<script>
	import hVipCell from '@/components/hVipCell.vue'
	
	export default {
		components: {
			hVipCell
		},
		data() {
			return {
				items: [
					{title: '初始化优化', desc: '尽量避免出现闪一下的问题', tags: ['vip']},
					{title: '抽屉优化', desc: '动画控制更加细腻', tags: ['vip']},
					{title: 'popup优化', desc: '可以自适应高度', tags: ['vip']},
					{title: '实用模板与示范', desc: '大量VIP免费模板与示范', tags: ['vip']},
					{title: '优先', desc: '优先解决VIP会员问题', tags: ['vip']},
					{title: '特殊组件', desc: '提供VIP专供组件，比如swiper', tags: ['vip']},
					{title: '开箱即用', desc: '提供更多的业务自定义组件', tags: ['vip']},
					{title: 'bindingx', desc: 'bindingx特效与页面级联动', tags: ['vip']}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sd {
		&-header {
			width: 750rpx;
			height: 200rpx;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			background-color: #DDDDDD;
			position: relative;
		}
		&-vip {
			width: 750rpx;
			height: 100rpx;
			flex-direction: row;
			align-items: center;
			flex-wrap: nowrap;
			justify-content: space-between;
			padding-left: 32rpx;
			padding-right: 24rpx;
			
			&-row {
				flex-direction: row;
				align-items: center;
				flex-wrap: nowrap;
			}
			&-text {
				font-size: 32rpx;
				line-height: 45rpx;
				color: $myp-text-color;
				margin-left: 20rpx;
			}
			&-desc {
				font-size: 26rpx;
				line-height: 36rpx;
				color: $myp-text-color-second;
				margin-right: 8rpx;
			}
		}
		&-top {
			background-color: #FFFFFF;
			position: absolute;
			left: 0;
			bottom: 0;
			width: 750rpx;
			height: 100rpx;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			flex-direction: row;
			align-items: center;
			flex-wrap: nowrap;
			justify-content: space-between;
			padding-left: 32rpx;
			padding-right: 24rpx;
			
			&-row {
				flex-direction: row;
				align-items: center;
				flex-wrap: nowrap;
			}
			&-text {
				font-size: 32rpx;
				line-height: 45rpx;
				color: $myp-text-color;
				margin-left: 20rpx;
			}
			&-desc {
				font-size: 26rpx;
				line-height: 36rpx;
				color: $myp-text-color-third;
			}
		}
	}
</style>
