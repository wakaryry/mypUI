<template>
	<view>
		<myp-navbar :fixed="false" title="我的"></myp-navbar>
		<scroll-view class="m-page" :scroll-y="true" :style="mypContentHeightStyle"></scroll-view>
	</view>
</template>

<script>
import mypNavbar from '@/mypUI/myp-navbar/index.vue';

import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js';

export default {
	components: {
		mypNavbar
	},
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
@import '@/m.scss';
</style>
