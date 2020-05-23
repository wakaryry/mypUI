<template>
	<h-scroll width="750rpx" height="600rpx" boxStyle="padding-top:40rpx;padding-bottom:34rpx;">
		<view class="is-token"></view>
		<view v-for="(item,idx) in items" :key="idx" :class="['is-item', idx===0&&'is-first', (idx===items.length-1)&&'is-last']">
			<v-care-card :image="item.avatar" :name="item.name" :cares="item.cares" :intro="item.intro" @care="toCare" @close="toClose"></v-care-card>
		</view>
		<view class="is-token"></view>
	</h-scroll>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
					avatar: 'https://cdn.img.wenhairu.com/images/2020/05/23/YOB0G.jpg',
					name: '风格化',
					cares: '28.9万粉丝',
					intro: 'scss主题配置'
				}, {
					avatar: 'https://cdn.img.wenhairu.com/images/2020/05/23/YOhGf.jpg',
					name: '统一',
					cares: '66.6万粉丝',
					intro: '一套代码适用全端'
				}, {
					avatar: 'https://cdn.img.wenhairu.com/images/2020/05/23/YTNeu.',
					name: '性能好',
					cares: '128.9万粉丝',
					intro: '针对优化，体验好'
				}, {
					avatar: 'https://cdn.img.wenhairu.com/images/2020/05/23/YT8SX.jpg',
					name: '效率高',
					cares: '328.9万粉丝',
					intro: '可进阶，越用越快'
				}, {
					avatar: 'https://cdn.img.wenhairu.com/images/2020/05/23/YTA2p.jpg',
					name: '规范',
					cares: '828.9万粉丝',
					intro: '学习的绝对帮手'
				}]
			}
		},
		methods: {
			toCare() {
				this.$emit("care")
			},
			toClose() {
				this.$emit("close")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	
	.is {
		&-item {
			border-left-width: 1px;
			border-left-color: $myp-border-color;
			border-top-width: 1px;
			border-top-color: $myp-border-color;
			border-bottom-width: 1px;
			border-bottom-color: $myp-border-color;
			border-right-width: 0;
			overflow: hidden;
		}
		&-first {
			border-top-left-radius: 12rpx;
			border-bottom-left-radius: 12rpx;
		}
		&-last {
			border-right-width: 1px;
			border-right-color: $myp-border-color;
			border-top-right-radius: 12rpx;
			border-bottom-right-radius: 12rpx;
		}
		&-token {
			width: 32rpx;
		}
	}
</style>
