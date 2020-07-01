<template>
	<view>
		<!-- #ifdef APP-NVUE -->
		<list class="myp-index" :style="{height: heightPx + 'px'}">
			<cell>
				<slot name="head"></slot>
			</cell>
			<cell v-for="(v, i) in formatList" :key="i" :ref="'myp-index-title-' + v.title">
				<text :class="['myp-index-title', v.type && v.type === 'group' && 'myp-group-title']" v-if="!onlyShowList">{{ v.title }}</text>
				<view v-if="v.type && v.type === 'group' && !onlyShowList" class="myp-group">
					<view v-for="(group, index) in v.data" :key="index" class="myp-group-list">
						<view v-for="(item, i) in group" :key="i" @click="itemClicked(item)" class="myp-group-item">
							<image v-if="item.isLocation" class="location-icon" src="https://gw.alicdn.com/tfs/TB1JUiUPFXXXXXUXXXXXXXXXXXX-32-32.png"></image>
							<view>
								<text class="myp-group-item-name">{{ item.name }}</text>
								<text class="myp-group-item-desc" v-if="item.desc">{{ item.desc }}</text>
							</view>
						</view>
					</view>
				</view>
				<view v-if="v.type === 'list'">
					<view class="myp-index-item" v-for="(item, index) in v.data" :key="index" hover-class="myp-hover-opacity" @click="itemClicked(item)">
						<text class="myp-index-item-title">{{ item.name }}</text>
						<text class="myp-index-item-desc">{{ item.desc }}</text>
					</view>
				</view>
			</cell>
		</list>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<scroll-view :scroll-y="true" :scroll-with-animation="true" :scroll-into-view="viewId" class="myp-index" :style="{height: heightPx + 'px'}">
			<slot name="head"></slot>
			<view v-for="(v, i) in formatList" :key="i" :id="'myp-index-title-' + v.title">
				<text :class="['myp-index-title', v.type && v.type === 'group' && 'myp-group-title']" v-if="!onlyShowList">{{ v.title }}</text>
				<view v-if="v.type && v.type === 'group' && !onlyShowList" class="myp-group">
					<view v-for="(group, index) in v.data" :key="index" class="myp-group-list">
						<view v-for="(item, i) in group" :key="i" @click="itemClicked(item)" class="myp-group-item">
							<image v-if="item.isLocation" class="location-icon" src="https://gw.alicdn.com/tfs/TB1JUiUPFXXXXXUXXXXXXXXXXXX-32-32.png"></image>
							<view>
								<text class="myp-group-item-name">{{ item.name }}</text>
								<text class="myp-group-item-desc" v-if="item.desc">{{ item.desc }}</text>
							</view>
						</view>
					</view>
				</view>
				<view v-if="v.type === 'list'">
					<view class="myp-index-item" v-for="(item, index) in v.data" :key="index" hover-class="myp-hover-opacity" @click="itemClicked(item)">
						<text class="myp-index-item-title">{{ item.name }}</text>
						<text class="myp-index-item-desc">{{ item.desc }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- #endif -->
		<view class="myp-index-nav" v-if="showIndex && !onlyShowList" :style="indexBoxStyle">
			<text v-for="(item, index) in formatList" :key="index" :title="item.title" @click="go2Key(item.title)" class="myp-index-nav-key">
				{{ item.title }}
			</text>
		</view>
		<view class="myp-index-pop" v-if="popKeyShow">
			<text class="myp-index-pop-text">{{ popKey }}</text>
		</view>
	</view>
</template>

<script>
// indexlist比较简单，weex是dom.scrollToElement, uni直接scroll-into-view即可
// 只提供简单的示范，不提供适配

// #ifdef APP-NVUE
const dom = weex.requireModule('dom');
// #endif

import * as Format from './format';

export default {
	props: {
		// 默认 number是 px
		height: {
			type: [Number, String],
			default: 0
		},
		normalList: {
			type: Array,
			default: () => []
		},
		onlyShowList: {
			type: Boolean,
			default: false
		},
		showIndex: {
			type: Boolean,
			default: true
		},
		needAnimation: {
			type: Boolean,
			default: true
		},
		hotListConfig: {
			type: Object,
			default: () => ({})
		},
		// 城市选择子组件 特殊情况支持
		cityLocationConfig: {
			type: Object,
			default: () => ({})
		},
		indexBoxStyle: {
			type: String,
			default: ''
		}
	},
	computed: {
		formatList() {
			const { normalList, hotListConfig, cityLocationConfig } = this;
			return Format.totalList(normalList, hotListConfig, cityLocationConfig);
		},
		heightPx() {
			if (typeof this.height === 'number') {
				return this.height
			}
			if (this.height.indexOf('rpx') >= 0) {
				return uni.upx2px(parseInt(this.height))
			}
			return parseInt(this.height)
		}
	},
	data: () => ({
		popKeyShow: false,
		popKey: '',
		viewId: null,
		timer: null
	}),
	methods: {
		itemClicked(item) {
			this.$emit('selected', item);
		},
		go2Key(key) {
			// #ifdef APP-NVUE
			const keyEl = this.$refs['myp-index-title-' + key][0];
			keyEl &&
				dom.scrollToElement(keyEl, {
					offset: 0,
					animated: this.needAnimation
				});
			// #endif
			// #ifndef APP-NVUE
			const qId = 'myp-index-title-' + key
			this.viewId = qId
			// #endif
			this.popKey = key;
			this.popKeyShow = true;
			this.timer && clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.popKeyShow = false;
			}, 600);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../base.scss';

.myp-index {
	width: 750rpx;
	
	&-title {
		border-bottom-width: 1px;
		border-bottom-color: $myp-border-color;
		background-color: $myp-bg-color-page;
		font-size: 24rpx;
		color: $myp-text-color-second;
		height: 48rpx;
		line-height: 48rpx;
		padding-left: 32rpx;
		width: 750rpx;
	}
	
	&-item {
		width: 750rpx;
		flex-direction: row;
		align-items: center;
		height: 92rpx;
		border-bottom-width: 1px;
		border-bottom-color: $myp-border-color;
		background-color: #ffffff;
		padding: 0 32rpx;
		
		&-title {
			font-size: 32rpx;
			color: $myp-text-color;
		}
		
		&-desc {
			font-size: 24rpx;
			color: $myp-text-color-third;
			margin-left: 24rpx;
		}
	}
	
	&-nav {
		position: absolute;
		top: 0;
		right: 0;
		margin-bottom: 32rpx;
		margin-top: 32rpx;
		width: 70rpx;
		
		&-key {
			text-align: center;
			font-size: 24rpx;
			height: 36rpx;
			color: $myp-text-color-second;
		}
	}
	
	&-pop {
		position: fixed;
		top: 550rpx;
		left: 316rpx;
		width: 120rpx;
		height: 120rpx;
		text-align: center;
		justify-content: center;
		background-color: $myp-bg-color-mask-dark;
		border-radius: 60rpx;
		padding: 35rpx 0;
		color: #ffffff;
		
		&-text {
			font-size: 40rpx;
			text-align: center;
			color: #ffffff;
		}
	}
}

.myp-group {
	padding-bottom: 18rpx;
	padding-right: 70rpx;
	background-color: $myp-bg-color-page;
	
	&-title {
		border-bottom-width: 0;
		padding-bottom: 0;
		height: 60rpx;
		padding-top: 24rpx;
	}
	
	&-list {
		flex-direction: row;
		margin-left: 18rpx;
		margin-top: 18rpx;
	}
	
	&-item {
		width: 146rpx;
		height: 64rpx;
		border-width: 1px;
		border-color: $myp-border-color;
		border-radius: 12rpx;
		margin-right: 18rpx;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;
		
		&-name {
			font-size: 24rpx;
			line-height: 26rpx;
			color: $myp-text-color;
		}
		
		&-desc {
			margin-top: 2rpx;
			color: $myp-text-color-third;
			font-size: 20rpx;
			text-align: center;
		}
	}
}

.location-icon {
	width: 32rpx;
	height: 32rpx;
	margin-right: 8rpx;
}
</style>
