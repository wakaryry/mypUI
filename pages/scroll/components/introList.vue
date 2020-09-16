<template>
	<view>
		<!-- #ifdef APP-NVUE -->
		<list class="myp-bg-inverse" ref="myp-list" :bounce="true" isSwiperList="true" :style="mypContentHeightStyle+'width:750rpx;'">
			<cell>
				<myp-title title1="我喜欢的" title1Style="font-weight: 600;" rightIcon1="radio-button" rightIcon2="right" rightIcon1Type="third" rightIcon2Type="third" boxStyle="padding-left:32rpx;padding-right:32rpx;"></myp-title>
				<myp-scroll-h height="280rpx">
					<view style="width: 32rpx;"></view>
					<view v-for="(item,idx) in loves" :key="idx" style="flex-direction: row;">
						<v-bg-card :bgType="item.bgType" :maskType="item.maskType" :img="item.img" :tag="item.tag" :icon="item.icon" :title="item.title" :desc="item.desc" :descIcon="item.descIcon" :iconType="item.iconType" :titleType="item.titleType" :iconStyle="item.iconStyle" :descType="item.descType"></v-bg-card>
						<view style="width: 12rpx;"></view>
					</view>
					<view style="width: 20rpx;"></view>
				</myp-scroll-h>
			</cell>
			<cell>
				<myp-title title1="最近观看" title1Style="font-weight: 600;" title3="更多" title3Type="third" rightIcon2="right" rightIcon2Type="third" boxStyle="padding-left:32rpx;padding-right:32rpx;"></myp-title>
			</cell>
			<cell>
				<view class="il-items">
					<h-cover-card v-for="(item,idx) in histories" :key="idx" :img="item.img" :title="item.title" :desc="item.desc" :icon="item.icon" :boxStyle="item.boxStyle+(idx%2===0?'margin-right:24rpx;':'')" :titleStyle="item.titleStyle" :descStyle="item.descStyle" imgIconStyle="left:60rpx;top:60rpx;transform:translate(-50%,-50%);" iconBoxStyle="width:50rpx;height:50rpx;border-radius:30rpx;background-color:rgba(255,255,255,0.8);" iconType="error"></h-cover-card>
				</view>
			</cell>
			<cell>
				<myp-title title1="其它推荐" title1Style="font-weight: 600;" title3="更多" title3Type="third" rightIcon2="right" rightIcon2Type="third" boxStyle="padding-left:32rpx;padding-right:32rpx;"></myp-title>
			</cell>
			<cell>
				<view class="il-items">
					<h-cover-card v-for="(item,idx) in hots" :key="idx" :img="item.img" :title="item.title" :desc="item.desc" :boxStyle="item.boxStyle+(idx%2===0?'margin-right:24rpx;':'')" :titleStyle="item.titleStyle" :descStyle="item.descStyle"></h-cover-card>
				</view>
			</cell>
		</list>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<scroll-view class="myp-bg-inverse" :scroll-y="scrollable" :style="mypContentHeightStyle+'width:750rpx;'" @touchstart="mypOnTouchStart" @touchmove="mypOnTouchMove" @touchend="mypOnTouchEnd" @touchcancel="mypOnTouchEnd" @scroll="mypOnScroll">
			<myp-title title1="我喜欢的" title1Style="font-weight: 600;" rightIcon1="radio-button" rightIcon2="right" rightIcon1Type="third" rightIcon2Type="third" boxStyle="padding-left:32rpx;padding-right:32rpx;"></myp-title>
			<myp-scroll-h height="280rpx">
				<view style="width: 32rpx;"></view>
				<view v-for="(item,idx) in loves" :key="idx" style="flex-direction: row;">
					<v-bg-card :bgType="item.bgType" :maskType="item.maskType" :img="item.img" :tag="item.tag" :icon="item.icon" :title="item.title" :desc="item.desc" :descIcon="item.descIcon" :iconType="item.iconType" :titleType="item.titleType" :iconStyle="item.iconStyle" :descType="item.descType"></v-bg-card>
					<view style="width: 12rpx;"></view>
				</view>
				<view style="width: 20rpx;"></view>
			</myp-scroll-h>
			<myp-title title1="最近观看" title1Style="font-weight: 600;" title3="更多" title3Type="third" rightIcon2="right" rightIcon2Type="third" boxStyle="padding-left:32rpx;padding-right:32rpx;"></myp-title>
			<view class="il-items">
				<h-cover-card v-for="(item,idx) in histories" :key="idx" :img="item.img" :title="item.title" :desc="item.desc" :icon="item.icon" :boxStyle="item.boxStyle+(idx%2===0?'margin-right:24rpx;':'')" :titleStyle="item.titleStyle" :descStyle="item.descStyle" imgIconStyle="left:60rpx;top:60rpx;transform:translate(-50%,-50%);" iconBoxStyle="width:50rpx;height:50rpx;border-radius:30rpx;background-color:rgba(255,255,255,0.8);" iconType="error"></h-cover-card>
			</view>
			<myp-title title1="其它推荐" title1Style="font-weight: 600;" title3="更多" title3Type="third" rightIcon2="right" rightIcon2Type="third" boxStyle="padding-left:32rpx;padding-right:32rpx;"></myp-title>
			<view class="il-items">
				<h-cover-card v-for="(item,idx) in hots" :key="idx" :img="item.img" :title="item.title" :desc="item.desc" :boxStyle="item.boxStyle+(idx%2===0?'margin-right:24rpx;':'')" :titleStyle="item.titleStyle" :descStyle="item.descStyle"></h-cover-card>
			</view>
		</scroll-view>
		<!-- #endif -->
	</view>
</template>

<script>
	import vBgCard from '@/components/card/vBgCard.vue'
	import hCoverCard from '@/components/card/hCoverTextCard.vue'
	
	import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js'
	import childMixin from '@/mypUI/myp-list/header/pureHeaderChild.js'
	
	export default {
		components: {
			vBgCard,
			hCoverCard
		},
		mixins: [contentBoxMixin, childMixin],
		data() {
			return {
				mypIncludeXBar: false,
				mypExtra: 180,
				loves: [
					{img: 'https://mypui.asnowsoft.cn/imgs/c3.jpg', maskType: 'mask', title: '私人FM', icon: 'solid-calendar', tag: '', desc: '听点新鲜的', descIcon: '', bgType: '', titleType: 'inverse', descType: 'inverse', iconType: 'inverse', iconStyle: 'font-size:54rpx;'},
					{img: 'https://cdn.img.wenhairu.com/images/2020/05/23/YO0sR.jpg', maskType: 'mask', title: '古典专区', icon: 'solid-plus', tag: '', desc: '听不完的古典', descIcon: '', bgType: '', titleType: 'inverse', descType: 'inverse', iconType: 'inverse', iconStyle: 'font-size:54rpx;'},
					{img: '', maskType: 'none', title: '亲子频道', icon: 'solid-camera', tag: '推荐', desc: '一键专业育儿', descIcon: '', bgType: 'dark', titleType: 'text', descType: 'third', iconType: 'text', iconStyle: 'font-size:54rpx;'},
					{img: '', maskType: 'none', title: '爵士电台', icon: 'solid-play', tag: '推荐', desc: '缺乏锻炼的爱情', descIcon: '', bgType: 'dark', titleType: 'text', descType: 'third', iconType: 'text', iconStyle: 'font-size:54rpx;'},
					{img: '', maskType: 'none', title: '摇滚天王', icon: 'solid-lock', tag: '推荐', desc: '生活不能停止', descIcon: '', bgType: 'dark', titleType: 'text', descType: 'third', iconType: 'text', iconStyle: 'font-size:54rpx;'},
					{img: '', maskType: 'none', title: '放松愉悦', icon: 'solid-shop-car', tag: '推荐', desc: '感受静谧大自然', descIcon: '', bgType: 'dark', titleType: 'text', descType: 'third', iconType: 'text', iconStyle: 'font-size:54rpx;'}
				],
				histories: [
					{title: '在最美的春天里遇见你', desc: '13.6W人看过', img: 'https://mypui.asnowsoft.cn/imgs/c3.jpg', icon: 'triangle-right', boxStyle: 'width: 330rpx;margin-bottom:24rpx;', titleStyle: 'line-height:38rpx;', descStyle: 'line-height:34rpx;margin-top:12rpx;'},
					{title: '在最热烈的夏天爱上你', desc: '2.7W人看过', img: 'https://mypui.asnowsoft.cn/imgs/c3.jpg', icon: 'triangle-right', boxStyle: 'width: 330rpx;margin-bottom:24rpx;', titleStyle: 'line-height:38rpx;', descStyle: 'line-height:34rpx;margin-top:12rpx;'},
					{title: '在最冷的冬天温暖你。金坷垃，呵护肥料，值得拥有', desc: '58.9W人看过', img: 'https://mypui.asnowsoft.cn/imgs/c3.jpg', icon: 'triangle-right', boxStyle: 'width: 330rpx;', titleStyle: 'line-height:38rpx;', descStyle: 'line-height:34rpx;margin-top:12rpx;'}
				],
				hots: [
					{title: '一个人一座城', desc: '13.6W人看过', img: 'https://mypui.asnowsoft.cn/imgs/c3.jpg', boxStyle: 'width: 330rpx;margin-bottom:24rpx;', titleStyle: 'line-height:38rpx;', descStyle: 'line-height:34rpx;margin-top:12rpx;'},
					{title: '是兄弟就来砍我，今晚八点，不见不散', desc: '', img: 'https://mypui.asnowsoft.cn/imgs/c3.jpg', boxStyle: 'width: 330rpx;margin-bottom:24rpx;', titleStyle: 'line-height:38rpx;', descStyle: 'line-height:34rpx;'},
					{title: '在最好的年华里闯出一片天地', desc: '58.9W人看过', img: 'https://mypui.asnowsoft.cn/imgs/c3.jpg', boxStyle: 'width: 330rpx;margin-bottom:24rpx;', titleStyle: 'line-height:38rpx;', descStyle: 'line-height:34rpx;margin-top:12rpx;'},
					{title: '一个人一座城', desc: '13.6W人看过', img: 'https://mypui.asnowsoft.cn/imgs/c3.jpg', boxStyle: 'width: 330rpx;margin-bottom:24rpx;', titleStyle: 'line-height:38rpx;', descStyle: 'line-height:34rpx;margin-top:12rpx;'},
					{title: '是兄弟就来砍我，今晚八点，不见不散', desc: '', img: 'https://mypui.asnowsoft.cn/imgs/c3.jpg', boxStyle: 'width: 330rpx;margin-bottom:24rpx;', titleStyle: 'line-height:38rpx;', descStyle: 'line-height:34rpx;'},
					{title: '在最好的年华里闯出一片天地', desc: '58.9W人看过', img: 'https://mypui.asnowsoft.cn/imgs/c3.jpg', boxStyle: 'width: 330rpx;margin-bottom:24rpx;', titleStyle: 'line-height:38rpx;', descStyle: 'line-height:34rpx;margin-top:12rpx;'},
					{title: '一个人一座城', desc: '13.6W人看过', img: 'https://mypui.asnowsoft.cn/imgs/c3.jpg', boxStyle: 'width: 330rpx;margin-bottom:24rpx;', titleStyle: 'line-height:38rpx;', descStyle: 'line-height:34rpx;margin-top:12rpx;'},
					{title: '是兄弟就来砍我，今晚八点，不见不散', desc: '', img: 'https://mypui.asnowsoft.cn/imgs/c3.jpg', boxStyle: 'width: 330rpx;margin-bottom:24rpx;', titleStyle: 'line-height:38rpx;', descStyle: 'line-height:34rpx;'},
					{title: '在最好的年华里闯出一片天地', desc: '58.9W人看过', img: 'https://mypui.asnowsoft.cn/imgs/c3.jpg', boxStyle: 'width: 330rpx;', titleStyle: 'line-height:38rpx;', descStyle: 'line-height:34rpx;margin-top:12rpx;'}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.il {
		&-items {
			flex-direction: row;
			flex-wrap: wrap;
			margin-left: 32rpx;
		}
	}
</style>
