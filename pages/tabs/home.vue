<template>
	<view>
		<myp-navbar :fixed="false" title="查看组件列表" icon="right" @centerAction="toComponentsList"></myp-navbar>
		<!-- 仅仅只是演示区别，您可以直接不做区分，所有平台都写成属性最多的那个 -->
		<!-- #ifdef APP-NVUE -->
		<myp-list :down="null" :up="null" bgType="inverse">
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<myp-list :down="null" :up="null" bgType="inverse" extra="status-nav-x-50px">
		<!-- #endif -->
			<myp-list-cell>
				<view style="height: 24rpx;"></view>
			</myp-list-cell>
			<myp-list-cell>
				<myp-scroll-h left="660rpx" bgType="none" height="392rpx">
					<view style="width: 61rpx;"></view>
					<intro-header @selected="toIntro"></intro-header>
					<component-list-item v-for="(item, idx) in items" :key="idx" :item="item" boxStyle="margin-left:32rpx;" @selected="toItem(item.type)"></component-list-item>
					<view style="width: 32rpx;"></view>
				</myp-scroll-h>
				<view style="height: 16rpx;"></view>
			</myp-list-cell>
			<myp-list-cell>
				<myp-flex>
					<!-- 以下条件编译只是示范各端的差异：在MP端自定义组件需要再次设置style为flex:1. -->
					<!-- 当然你可以不区分，全部都设置style为flex:1 -->
					<!-- #ifndef APP-NVUE || H5 -->
					<myp-item v-for="(item,idx) in recommends" :key="idx" :icon="item.icon" :text="item.name" iconType="inverse" style="flex:1;" boxStyle="height:180rpx;flex:1;" iconBoxStyle="width:80rpx;height:80rpx;border-radius:80rpx;background-color:#FF9090;" @itemClicked="toPage(item)"></myp-item>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE || H5 -->
					<myp-item v-for="(item,idx) in recommends" :key="idx" :icon="item.icon" :text="item.name" iconType="inverse" boxStyle="height:180rpx;flex:1;" iconBoxStyle="width:80rpx;height:80rpx;border-radius:80rpx;background-color:#FF9090;" @itemClicked="toPage(item)"></myp-item>
					<!-- #endif -->
				</myp-flex>
			</myp-list-cell>
			<myp-list-cell>
				<view style="height: 16rpx;"></view>
				<myp-title title1="列表与盒子-快速构建页面" title1Size="ll" title1Style="font-weight: 700;" boxStyle="padding-left:32rpx;padding-right:32rpx;">
					<myp-button slot="extra" text="查看更多" textSize="s" textType="text" border="all" radius="ll" boxStyle="width:160rpx;height:56rpx;" @buttonClicked="toPage({page: 'scroll_index'})"></myp-button>
				</myp-title>
				<myp-scroll-h width="750rpx" height="300rpx">
					<view style="width: 32rpx;"></view>
					<view v-for="(item,idx) in boxes" :key="idx" style="margin-right: 20rpx;">
						<v-img-text-card :item="item" @detail="toPage"></v-img-text-card>
					</view>
				</myp-scroll-h>
			</myp-list-cell>
			<myp-list-cell>
				<myp-title title1="布局-组件化布局能力" title1Size="ll" title1Style="font-weight: 700;" boxStyle="padding-left:32rpx;padding-right:32rpx;">
					<myp-button slot="extra" icon="arrow-right" text="查看全部" textSize="s" textType="text" border="all" radius="ll" boxStyle="width:200rpx;height:56rpx;" @buttonClicked="toPage({page: 'flex_index'})"></myp-button>
				</myp-title>
				<view v-for="(item,idx) in flexs" :key="idx" style="margin-bottom: 24rpx;">
					<h-img-text :item="item" @detail="toPage"></h-img-text>
				</view>
			</myp-list-cell>
			<myp-list-cell>
				<view style="height: 42rpx;"></view>
				<view style="margin-left: 32rpx;">
					<today-card @detail="toPage({page: 'design_theme'})"></today-card>
				</view>
				<view style="height: 24rpx;"></view>
			</myp-list-cell>
			<myp-list-cell>
				<myp-title leftIcon1="user-check" leftIcon1Type="error" title1="导航-带你去想去的地方" title1Size="ll" title1Style="font-weight: 700;" title3="查看更多" rightIcon2="right" boxStyle="padding-left:32rpx;padding-right:32rpx;" @rightClicked="toPage({page: 'nav_index'})"></myp-title>
				<navs-scroll :items="navs" @care="toPage"></navs-scroll>
				<myp-divider></myp-divider>
			</myp-list-cell>
			<myp-list-cell>
				<view style="height: 20rpx;"></view>
				<myp-title title1="数据输入-输入/选择" title1Size="ll" title1Style="font-weight: 700;" boxStyle="padding-left:32rpx;padding-right:32rpx;">
					<myp-button slot="extra" text="发现更多" textSize="s" textType="text" border="all" radius="ll" boxStyle="width:160rpx;height:56rpx;" @buttonClicked="toPage({page: 'input_index'})"></myp-button>
				</myp-title>
				<myp-scroll-h height="300rpx">
					<view style="width: 32rpx;"></view>
					<series-card v-for="(item,idx) in inputs" :key="idx" :item="item" :boxStyle="idx===inputs.length-1?'':'margin-right:20rpx;'" @detail="toPage"></series-card>
					<view style="width: 32rpx;"></view>
				</myp-scroll-h>
			</myp-list-cell>
			<myp-list-cell>
				<view style="height: 20rpx;"></view>
				<myp-title title1="数据展示" title1Size="ll" title1Style="font-weight: 700;" boxStyle="padding-left:32rpx;padding-right:32rpx;">
					<myp-button slot="extra" text="查看更多" textSize="s" textType="text" border="all" radius="ll" boxStyle="width:160rpx;height:56rpx;" @buttonClicked="toPage({page: 'display_index'})"></myp-button>
				</myp-title>
				<myp-scroll-h height="360rpx">
					<view style="width: 32rpx;"></view>
					<circle-card v-for="(item,idx) in displays" :key="idx" :item="item" :boxStyle="idx===displays.length-1?'':'margin-right:20rpx;'" @detail="toPage"></circle-card>
					<view style="width: 32rpx;"></view>
				</myp-scroll-h>
			</myp-list-cell>
			<myp-list-cell>
				<view style="height: 20rpx;"></view>
				<myp-title title1="反馈互动-弹窗/提示/面板等" title1Size="ll" title1Style="font-weight: 700;" boxStyle="padding-left:32rpx;padding-right:32rpx;">
					<myp-button slot="extra" text="查看更多" textSize="s" textType="text" border="all" radius="ll" boxStyle="width:160rpx;height:56rpx;" @buttonClicked="toPage({page: 'interact_index'})"></myp-button>
				</myp-title>
				<myp-scroll-h height="400rpx">
					<view style="width: 32rpx;"></view>
					<v-long-card v-for="(item,idx) in interacts" :key="idx" :item="item" :boxStyle="idx===interacts.length-1?'':'margin-right:20rpx;'" @detail="toPage"></v-long-card>
					<view style="width: 32rpx;"></view>
				</myp-scroll-h>
			</myp-list-cell>
			<myp-list-cell>
				<view style="height: 20rpx;"></view>
				<myp-title title1="手势-刷新/加载等" title1Size="ll" title1Style="font-weight: 700;" rightIcon1="radio-button" rightIcon2="right" rightIcon1Type="third" rightIcon2Type="third" boxStyle="padding-left:32rpx;padding-right:32rpx;" @rightClicked="toPage({page: 'gesture_index'})"></myp-title>
				<myp-scroll-h height="280rpx">
					<view style="width: 32rpx;"></view>
					<view v-for="(item,idx) in gestures" :key="idx" style="flex-direction: row;">
						<v-bg-card :bgType="item.bgType" :maskType="item.maskType" :img="item.img" :tag="item.tag" :icon="item.icon" :title="item.title" :desc="item.desc" :descIcon="item.descIcon" :iconType="item.iconType" :titleType="item.titleType" :iconStyle="item.iconStyle" :descType="item.descType" @detail="toPage(item)"></v-bg-card>
						<view style="width: 16rpx;"></view>
					</view>
					<view style="width: 20rpx;"></view>
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
			<myp-list-cell v-if="!isVue">
				<myp-button bgType="error" text="进入Vue页面示范" textType="inverse" border="none" radius="ll" boxStyle="width:550rpx;height:76rpx;margin-left:100rpx;" @buttonClicked="toPage({page: 'vue_tabbar'})"></myp-button>
				<view style="height: 40rpx;"></view>
			</myp-list-cell>
		</myp-list>
	</view>
</template>

<script>
	import introHeader from './components/introHeader.vue'
	import componentListItem from './components/listItem.vue'
	import vImgTextCard from '@/components/vImgTextCard.vue'
	import hImgText from '@/components/hImgText.vue'
	import todayCard from '@/components/todayCard.vue'
	import navsScroll from './components/navsScroll.vue'
	import seriesCard from '@/components/seriesCard.vue'
	import circleCard from '@/components/circleCard.vue'
	import vLongCard from '@/components/vLongVard.vue'
	import vBgCard from '@/components/vBgCard.vue'
	
	import {recommends, bigCats, boxes, flexs, navs, inputs, displays, interacts, gestures} from './data.js'
	
	export default {
		components: {
			introHeader,
			componentListItem,
			vImgTextCard,
			hImgText,
			todayCard,
			navsScroll,
			seriesCard,
			circleCard,
			vLongCard,
			vBgCard
		},
		inject: ['tabRoot'],
		props: {
			isVue: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				recommends: recommends,
				items: bigCats,
				flexs: flexs,
				boxes: boxes,
				navs: navs,
				inputs: inputs,
				displays: displays,
				interacts: interacts,
				gestures: gestures
			}
		},
		methods: {
			toIntro() {
				this.tabRoot.navigateTo('about')
			},
			toItem(val) {
				this.tabRoot.navigateTo(val)
			},
			toComponentsList() {
				
			},
			toPage(val) {
				this.tabRoot.navigateTo(val.page)
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
				/* #ifndef APP-NVUE */
				display: flex;
				box-sizing: border-box;
				/* #endif */
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
		}
		&-apps {
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
			justify-content: space-between;
			padding-left: 32rpx;
			padding-right: 32rpx;
			width: 750rpx;
		}
	}
</style>
