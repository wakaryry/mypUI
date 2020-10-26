<template>
	<view>
		<myp-navbar :fixed="false" title="我的"></myp-navbar>
		<mine-header></mine-header>
		<mine-statistic></mine-statistic>
		<mine-vip-card></mine-vip-card>
		<myp-list :down="null" :up="null" bgType="inverse" extra="status-nav-x-50px-436rpx">
			<myp-list-cell>
				<mine-data></mine-data>
			</myp-list-cell>
			<myp-list-cell>
				<creative-entry></creative-entry>
			</myp-list-cell>
			<myp-list-cell>
				<recommend-entry></recommend-entry>
			</myp-list-cell>
			<myp-list-cell>
				<more-entry></more-entry>
			</myp-list-cell>
		</myp-list>
	</view>
</template>

<script>
import mineHeader from './components/mineHeader.vue'
import mineStatistic from './components/mineStatistic.vue'
import mineVipCard from './components/mineVipCard.vue'
import mineData from './components/mineData.vue'
import creativeEntry from './components/creativeEntry.vue'
import recommendEntry from './components/recommendEntry.vue'
import moreEntry from './components/moreEntry.vue'

export default {
	components: {
		mineHeader,
		mineStatistic,
		mineVipCard,
		mineData,
		creativeEntry,
		recommendEntry,
		moreEntry
	},
	data() {
		return {
			
		}
	},
	methods: {}
}
</script>

<style lang="scss" scoped>

</style>
