<template>
	<myp-popup :show='show' pos="top" :width="660" :height="860" :offset="260" @overlayClicked="toClose">
		<myp-list-simple bgType="inverse" width="660rpx" height="860rpx" scrollStyle="border-radius:24rpx;">
			<myp-list-cell>
				<view style="height: 32rpx;"></view>
			</myp-list-cell>
			<myp-list-cell v-for="(item, idx) in items" :key="idx">
				<view class="pm-margin">
					<h-intro-card :item="item" @select="toPage(item.page)"></h-intro-card>
					<view style="height: 32rpx;"></view>
				</view>
			</myp-list-cell>
		</myp-list-simple>
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
	.pm {
		&-margin {
			margin: 0 32rpx;
		}
	}
</style>
