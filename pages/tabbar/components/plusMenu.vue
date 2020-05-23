<template>
	<myp-popup :show='show' pos="top" :width="660" :height="860" :offset="260" @overlayClicked="toClose">
		<scroll-view class="m-page-inverse" :scroll-y="true" :style="{width: '660rpx', height: '860rpx', 'border-radius': '32rpx'}">
			<view style="height: 32rpx;"></view>
			<view class="pm-margin" v-for="(item, idx) in items" :key="idx">
				<h-intro-card :item="item" @select="toPage(item.page)"></h-intro-card>
				<view style="height: 32rpx;"></view>
			</view>
		</scroll-view>
	</myp-popup>
</template>

<script>
	import hIntroCard from '@/components/card/hIntroCard.vue'
	
	import dataMixin from '../../base/mixin/indexData.js'
	
	export default {
		components: {
			hIntroCard
		},
		mixins: [dataMixin],
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			toClose() {
				this.$emit("cancel")
			},
			toPage(name) {
				this.$emit("page", name)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	
	.pm {
		&-margin {
			margin: 0 32rpx;
		}
	}
</style>
