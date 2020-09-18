<template>
	<view class="myp-full-flex myp-flex-column">
		<myp-navbar :fixed="false" title="mypUI"></myp-navbar>
		<myp-list-simple bgType="page">
			<myp-list-cell>
				<view style="height: 24rpx;"></view>
			</myp-list-cell>
			<myp-list-cell>
				<myp-scroll-h left="628rpx" bgType="none" height="392rpx">
					<intro-header @selected="toIntro"></intro-header>
					<component-list-item v-for="(item, idx) in items" :key="idx" :item="item" @selected="toItem(item.type)"></component-list-item>
					<view style="width: 32rpx;"></view>
				</myp-scroll-h>
				<view style="height: 24rpx;"></view>
			</myp-list-cell>
			<myp-list-cell>
				<myp-flex>
					<!-- 以下条件编译只是示范各端的差异：在MP端自定义组件需要再次设置style为flex:1. -->
					<!-- 当然你可以不区分，全部都设置style为flex:1 -->
					<!-- #ifndef APP-NVUE || H5 -->
					<myp-item v-for="(item,idx) in apps" :key="idx" :icon="item.icon" :text="item.name" iconType="inverse" style="flex:1;" boxStyle="height:180rpx;flex:1;" iconBoxStyle="width:80rpx;height:80rpx;border-radius:80rpx;background-color:#FF9090;"></myp-item>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE || H5 -->
					<myp-item v-for="(item,idx) in apps" :key="idx" :icon="item.icon" :text="item.name" iconType="inverse" boxStyle="height:180rpx;flex:1;" iconBoxStyle="width:80rpx;height:80rpx;border-radius:80rpx;background-color:#FF9090;"></myp-item>
					<!-- #endif -->
				</myp-flex>
			</myp-list-cell>
			<myp-list-cell>
				<myp-title title1="灵魂日志, 值得领略" title1Size="ll" title1Style="font-weight: 700;" boxStyle="padding-left:32rpx;padding-right:32rpx;">
					<myp-button slot="extra" text="查看更多" textSize="s" textType="text" border="all" radius="ll" boxStyle="width:160rpx;height:56rpx;"></myp-button>
				</myp-title>
				<myp-scroll-h width="750rpx" height="300rpx">
					<view style="width: 32rpx;"></view>
					<view v-for="idx in [1,2,3,4,5,6]" :key="idx" style="margin-right: 20rpx;">
						<v-img-text-card></v-img-text-card>
					</view>
				</myp-scroll-h>
			</myp-list-cell>
			<myp-list-cell>
				<view style="height: 20rpx;"></view>
				<myp-title title1="你可能喜欢wakary的日志" title1Size="ll" title1Style="font-weight: 700;" boxStyle="padding-left:32rpx;padding-right:32rpx;">
					<myp-button slot="extra" icon="arrow-right" text="查看全部" textSize="s" textType="text" border="all" radius="ll" boxStyle="width:200rpx;height:56rpx;"></myp-button>
				</myp-title>
				<view v-for="idx in [1,2,3,4]" :key="idx" style="margin-bottom: 20rpx;">
					<h-img-text></h-img-text>
				</view>
			</myp-list-cell>
			<myp-list-cell>
				<view style="height: 80rpx;"></view>
				<view style="margin-left: 32rpx;">
					<today-card></today-card>
				</view>
				<view style="height: 20rpx;"></view>
			</myp-list-cell>
			<myp-list-cell>
				<myp-title leftIcon1="user-check" leftIcon1Type="error" title1="你可能感兴趣的人" title1Size="ll" title1Style="font-weight: 700;" title3="查看更多" rightIcon2="right" boxStyle="padding-left:32rpx;padding-right:32rpx;"></myp-title>
				<users-scroll></users-scroll>
				<myp-divider></myp-divider>
			</myp-list-cell>
			<myp-list-cell>
				<view style="height: 20rpx;"></view>
				<myp-title title1="这些主题你可能喜欢" title1Size="ll" title1Style="font-weight: 700;" boxStyle="padding-left:32rpx;padding-right:32rpx;">
					<myp-button slot="extra" text="发现更多" textSize="s" textType="text" border="all" radius="ll" boxStyle="width:160rpx;height:56rpx;"></myp-button>
				</myp-title>
				<myp-scroll-h height="300rpx">
					<view style="width: 32rpx;"></view>
					<series-card v-for="idx in [1,2,3,4,5,6]" :key="idx" :boxStyle="idx===6?'':'margin-right:20rpx;'"></series-card>
					<view style="width: 32rpx;"></view>
				</myp-scroll-h>
			</myp-list-cell>
			<myp-list-cell>
				<view style="height: 20rpx;"></view>
				<myp-title title1="文章或者圈子卡片" title1Size="ll" title1Style="font-weight: 700;" boxStyle="padding-left:32rpx;padding-right:32rpx;">
					<myp-button slot="extra" text="查看更多" textSize="s" textType="text" border="all" radius="ll" boxStyle="width:160rpx;height:56rpx;"></myp-button>
				</myp-title>
				<myp-scroll-h height="360rpx">
					<view style="width: 32rpx;"></view>
					<circle-card v-for="idx in [1,2,3,4,5,6]" :key="idx" :boxStyle="idx===6?'':'margin-right:20rpx;'"></circle-card>
					<view style="width: 32rpx;"></view>
				</myp-scroll-h>
			</myp-list-cell>
			<myp-list-cell>
				<view style="height: 20rpx;"></view>
				<myp-title title1="竖向图片卡片" title1Size="ll" title1Style="font-weight: 700;" boxStyle="padding-left:32rpx;padding-right:32rpx;">
					<myp-button slot="extra" text="查看更多" textSize="s" textType="text" border="all" radius="ll" boxStyle="width:160rpx;height:56rpx;"></myp-button>
				</myp-title>
				<myp-scroll-h height="400rpx">
					<view style="width: 32rpx;"></view>
					<v-long-card v-for="idx in [1,2,3,4,5,6]" :key="idx" :boxStyle="idx===6?'':'margin-right:20rpx;'"></v-long-card>
					<view style="width: 32rpx;"></view>
				</myp-scroll-h>
			</myp-list-cell>
			<myp-list-cell>
				<view style="height: 60rpx;"></view>
				<view style="flex-direction: row; align-items: center; justify-content: center;">
					<myp-icon name="refresh" type="primary"></myp-icon>
					<text class="myp-color-primary myp-size-base">点击刷新</text>
					<text class="myp-color-text-third myp-size-base" style="margin-left: 8rpx;">换一批内容</text>
				</view>
				<view style="height: 40rpx;"></view>
			</myp-list-cell>
		</myp-list-simple>
	</view>
</template>

<script>
	import introHeader from './components/introHeader.vue'
	import componentListItem from './components/listItem.vue'
	import vImgTextCard from '@/components/vImgTextCard.vue'
	import hImgText from '@/components/hImgText.vue'
	import todayCard from '@/components/todayCard.vue'
	import usersScroll from '@/components/usersScroll.vue'
	import seriesCard from '@/components/seriesCard.vue'
	import circleCard from '@/components/circleCard.vue'
	import vLongCard from '@/components/vLongVard.vue'
	
	export default {
		components: {
			introHeader,
			componentListItem,
			vImgTextCard,
			hImgText,
			todayCard,
			usersScroll,
			seriesCard,
			circleCard,
			vLongCard
		},
		inject: ['tabRoot'],
		data() {
			return {
				apps: [{icon: 'solid-camera', name: '推荐'},{icon: 'solid-location', name: '附近'},{icon: 'solid-fire', name: '排行榜'},{icon: 'solid-calendar', name: '最近'},{icon: 'radio-button', name: '随机'}],
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
					name: 'Swiper',
					type: 'swiper_index',
					title: 'Swiper示范',
					intro: 'swiper列表，带头部的swiper列表',
					hint: '试下手感'
				}, {
					icon: 'headphone',
					name: 'ScrollScale',
					type: 'scroll_h_index',
					title: '滚动缩放，余弦放大，自动居中',
					intro: '横向滚动，滚动缩放，余弦放大，自动居中',
					hint: '现在就看'
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
	.h {
		&-swiper {
			width: 750rpx;
			height: 280rpx;
			
			&-item {
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
		}
		&-apps {
			flex-direction: row;
			justify-content: space-between;
			padding-left: 32rpx;
			padding-right: 32rpx;
			width: 750rpx;
		}
	}
</style>
