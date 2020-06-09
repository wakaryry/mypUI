<template>
	<view>
		<myp-navbar :fixed="false" title="mypUI"></myp-navbar>
		<scroll-view class="myp-bg-page" :scroll-y="true" :style="mypContentHeightStyle">
			<view style="height: 24rpx;"></view>
			<intro-header @selected="toIntro"></intro-header>
			<view style="height: 24rpx;"></view>
			<view v-for="(item, idx) in items" :key="idx">
				<component-list-item :item="item" @selected="toItem(item.type)"></component-list-item>
				<view style="height: 24rpx;"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import introHeader from './components/introHeader.vue'
	import componentListItem from './components/listItem.vue'
	
	import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js'
	
	export default {
		components: {
			introHeader,
			componentListItem
		},
		mixins: [contentBoxMixin],
		inject: ['tabRoot'],
		data() {
			return {
				mypTabHeight: 50,
				items: [{
					icon: 'radio-button',
					name: '基础组件',
					type: 'base_index',
					title: '主题配置，细节到位',
					intro: '图标 按钮 输入框 单元格 格子 标签 ...',
					hint: '查看具体'
				}, {
					icon: 'warning',
					name: '弹层互动',
					type: 'pop_index',
					title: '性能好，动画支持',
					intro: '弹窗 Modal 遮罩 Loading Toast ActionSheet...',
					hint: '前往体验'
				}, {
					icon: 'solid-circle-right',
					name: '导航栏',
					type: 'navbar_index',
					title: '完全自定义',
					intro: '默认与随心所欲之间，没有限制',
					hint: '查看样板'
				}, {
					icon: 'solid-plus',
					name: 'Tabbar',
					type: 'tabbar_index',
					title: '非swiper实现',
					intro: '支持各种细节微调，图片/icon/text/badge/dot',
					hint: '马上体验'
				}, {
					icon: 'rows',
					name: 'Banner/Swiper',
					type: 'swiper_index',
					title: 'Banner和Swiper',
					intro: '还有针对app端的余弦放大缩小特效',
					hint: '试下手感'
				}, {
					icon: 'bold-refresh',
					name: '下拉上提',
					type: 'scroll_index',
					title: 'scroll和list',
					intro: '分别对mp/h5/app端做了下拉与上提',
					hint: '试试感觉'
				}, {
					icon: 'radio',
					name: '其它',
					type: '',
					title: '组件或页面',
					intro: '常用的一些UI设计，以及页面',
					hint: '去瞄一下'
				}]
			}
		},
		methods: {
			toIntro() {
				this.tabRoot.navigateTo('about')
			},
			toItem(val) {
				this.tabRoot.navigateTo(val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
</style>
