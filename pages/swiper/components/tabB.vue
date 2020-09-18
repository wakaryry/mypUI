<template>
	<view>
		<myp-navbar :fixed="false">
			<view slot="title">
				<myp-tabs-h :value="mypCurrentTab" :items="tabs" :isTap="mypIsTap" :offset="mypDx" :last="mypLastTabIndex" textType="second" activeTextType="text" activeTextStyle="font-weight:700;" scrollSize="350rpx" width="100rpx" height="44px" @change="mypToTabTab"></myp-tabs-h>
			</view>
		</myp-navbar>
		<swiper :current="mypCurrentTab" style="width: 750rpx;flex: 1;" @change="mypOnSwiperChange" @animationfinish="mypOnSwiperAnimationFinish" @onAnimationEnd="mypOnSwiperAnimationFinish" @transition="mypOnSwiperScroll">
			<swiper-item v-for="(tab,idx) in tabs" :key="idx">
				<album-list :current='mypCurrentTab' :index="idx"></album-list>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import albumList from './albumList.vue'
	import tabsSwiperMixin from '@/mypUI/myp-tabs-h/tabsSwiperMixin.js'
	
	export default {
		components: {
			albumList
		},
		mixins: [tabsSwiperMixin],
		data() {
			return {
				tabs: ['科技','动漫','电影','八卦','新闻','时政','运动','搞笑','音乐','原创','FM','交友','直播']
			}
		}
	}
</script>

<style>
</style>
