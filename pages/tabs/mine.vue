<template>
	<view>
		<myp-navbar :fixed="false" title="我的"></myp-navbar>
		<scroll-view class="myp-bg-page" :scroll-y="true" :style="mypContentHeightStyle"></scroll-view>
	</view>
</template>

<script>
import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js';

export default {
	mixins: [contentBoxMixin],
	data() {
		return {
			mypTabHeight: 50,
		}
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
@import '@/mypUI/mypui.scss';
</style>
