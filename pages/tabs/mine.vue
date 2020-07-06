<template>
	<view>
		<myp-navbar :fixed="false" title="我的"></myp-navbar>
		<myp-list-simple bgType="page" :includeXBar="false">
			<myp-list-cell>
				<myp-swiper></myp-swiper>
			</myp-list-cell>
		</myp-list-simple>
	</view>
</template>

<script>

export default {
	data() {
		return {
		}
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
@import '@/mypUI/mypui.scss';
</style>
