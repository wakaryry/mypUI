<template>
	<view class="myp-full-height myp-flex-column">
		<myp-navbar :fixed="false" title="mypUI"></myp-navbar>
		<myp-list-simple bgType="page">
			<myp-list-cell>
				<view style="height: 24rpx;"></view>
			</myp-list-cell>
			<myp-list-cell>
				<intro-header @selected="toIntro"></intro-header>
			</myp-list-cell>
			<myp-list-cell>
				<view style="height: 24rpx;"></view>
			</myp-list-cell>
			<myp-list-cell v-for="(item, idx) in items" :key="idx">
				<component-list-item :item="item" @selected="toItem(item.type)"></component-list-item>
				<view style="height: 24rpx;"></view>
			</myp-list-cell>
			<myp-list-cell>
				<view style="height: 50px;"></view>
				<myp-xbar bgType="none"></myp-xbar>
			</myp-list-cell>
		</myp-list-simple>
	</view>
</template>

<script>
	import introHeader from './components/introHeader.vue'
	import componentListItem from './components/listItem.vue'
	
	export default {
		components: {
			introHeader,
			componentListItem
		},
		inject: ['tabRoot'],
		data() {
			return {
				items: [{
					icon: 'radio-button',
					name: '基础组件',
					type: 'base_index',
					title: '主题配置，细节到位',
					intro: '图标 按钮 输入框 单元格 格子 标签 ...',
					hint: '查看具体'
				}, {
					icon: 'bold-refresh',
					name: '下拉上提',
					type: 'scroll_index',
					title: 'scroll和list',
					intro: '分别对mp/h5/app端做了下拉与上提',
					hint: '试试感觉'
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
					icon: 'album',
					name: '弹层选择',
					type: 'filter_index',
					title: 'filter/down-up',
					intro: '选择filter/dropdown，等',
					hint: '马上感受'
				}, {
					icon: 'task',
					name: '抽屉/拖动',
					type: 'drawer_index',
					title: '抽屉/拖动',
					intro: '抽屉，拉出，拖动，回收，等',
					hint: '现在就看'
				}, {
					icon: 'topic',
					name: 'Picker',
					type: 'picker_index',
					title: '各种picker',
					intro: 'myp-popup封装的picker示范',
					hint: '体验一下'
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
					icon: 'radio',
					name: '其它',
					type: 'others_index',
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
