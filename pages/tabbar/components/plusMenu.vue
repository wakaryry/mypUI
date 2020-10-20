<template>
	<myp-popup :show='show' pos="top-center" width="660rpx" height="860rpx" @overlayClicked="toClose">
		<myp-list :down="null" :up="null" bgType="inverse" boxStyle="border-radius:24rpx;">
			<myp-list-cell>
				<view style="height: 32rpx;"></view>
			</myp-list-cell>
			<myp-list-cell v-for="(item, idx) in items" :key="idx">
				<view class="pm-margin">
					<h-intro-card :item="item" @select="toPage(item.page)"></h-intro-card>
					<view style="height: 32rpx;"></view>
				</view>
			</myp-list-cell>
		</myp-list>
	</myp-popup>
</template>

<script>
	import hIntroCard from '@/components/hIntroCard.vue'
	
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
