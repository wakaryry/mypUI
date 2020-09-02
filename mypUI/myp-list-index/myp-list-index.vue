<template>
	<view class="myp-index" :style="boxStyle">
		<!-- #ifdef APP-NVUE -->
		<list :class="'myp-bg-'+bgType" :style="mrScrollStyle" @scroll="toScroll">
			<cell>
				<slot name="head"></slot>
			</cell>
			<cell v-for="(v, i) in formatList" :key="i" :ref="'myp-index-title-' + (v.id||v.title)">
				<text v-if="!onlyShowList" :class="['myp-index-title', v.type && v.type === 'group' && 'myp-index-title-group']" :style="(v.type && v.type === 'group')?groupTitleStyle:titleStyle">{{ v.title }}</text>
				<view v-if="v.type && v.type === 'group' && !onlyShowList" class="myp-index-group">
					<view v-for="(group, index) in v.data" :key="index" class="myp-index-group-list">
						<view v-for="(item, i) in group" :key="i" class="myp-index-group-item" hover-class="myp-hover-opacity" :style="groupItemStyle" bubble="true" @click="itemClicked(item)">
							<text class="myp-index-group-item-name" :style="groupItemTextStyle">{{ item.name }}</text>
							<text class="myp-index-group-item-desc" :style="groupItemDescStyle" v-if="item.desc">{{ item.desc }}</text>
						</view>
					</view>
				</view>
				<view v-if="v.type === 'list'">
					<view class="myp-index-item" v-for="(item, index) in v.data" :key="index" hover-class="myp-hover-opacity" :style="itemStyle" bubble="true" @click="itemClicked(item)">
						<text class="myp-index-item-name" :style="itemTextStyle">{{ item.name }}</text>
						<text class="myp-index-item-desc" :style="itemDescStyle">{{ item.desc }}</text>
					</view>
				</view>
			</cell>
			<cell>
				<view :style="{height: footToken}"></view>
			</cell>
			<cell>
				<view v-if="includeXBar&&overrideXBar" :style="mypXBarHeightStyle"></view>
			</cell>
		</list>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<scroll-view :scroll-y="true" :scroll-with-animation="true" :scroll-into-view="viewId" :class="'myp-bg-'+bgType" :style="mrScrollStyle" @scroll="toScroll">
			<slot name="head"></slot>
			<view v-for="(v, i) in formatList" :key="i" :id="'myp-index-title-' + (v.id||v.title)">
				<text v-if="!onlyShowList" :class="['myp-index-title', v.type && v.type === 'group' && 'myp-index-title-group']" :style="(v.type && v.type === 'group')?groupTitleStyle:titleStyle">{{ v.title }}</text>
				<view v-if="v.type && v.type === 'group' && !onlyShowList" class="myp-index-group">
					<view v-for="(group, index) in v.data" :key="index" class="myp-index-group-list">
						<view v-for="(item, i) in group" :key="i" class="myp-index-group-item" hover-class="myp-hover-opacity" :style="groupItemStyle" bubble="true" @click="itemClicked(item)">
							<text class="myp-index-group-item-name" :style="groupItemTextStyle">{{ item.name }}</text>
							<text class="myp-index-group-item-desc" :style="groupItemDescStyle" v-if="item.desc">{{ item.desc }}</text>
						</view>
					</view>
				</view>
				<block v-if="v.type === 'list'">
					<view class="myp-index-item" v-for="(item, index) in v.data" :key="index" hover-class="myp-hover-opacity" :style="itemStyle" bubble="true" @click="itemClicked(item)">
						<text class="myp-index-item-name" :style="itemTextStyle">{{ item.name }}</text>
						<text class="myp-index-item-desc" :style="itemDescStyle">{{ item.desc }}</text>
					</view>
				</block>
			</view>
			<view :style="{height: footToken}"></view>
			<view v-if="includeXBar&&overrideXBar" :style="mypXBarHeightStyle"></view>
		</scroll-view>
		<!-- #endif -->
		<!-- xBar -->
		<view v-if="includeXBar&&!overrideXBar" :class="['myp-bg-'+xBarBgType]" :style="mypXBarStyle"></view>
		<!-- foot -->
		<view class="myp-index-foot" :style="mrFootStyle">
			<slot name="foot"></slot>
		</view>
		<view class="myp-index-nav" v-if="showIndex && !onlyShowList" :style="indexBoxStyle" bubble="true" @tap="toPrevent">
			<text v-for="(item, index) in formatList" :key="index" :title="item.title" @tap.stop="go2Key(item.id||item.title, item.title)" class="myp-index-nav-key" :style="indexTextStyle">{{ item.title }}</text>
		</view>
		<view class="myp-index-pop" v-if="popKeyShow">
			<text class="myp-index-pop-text">{{ popKey }}</text>
		</view>
	</view>
</template>

<script>
// #ifdef APP-NVUE
const dom = weex.requireModule('dom');
// #endif
import styleMixin from '../myp-list/styleMixin.js'

import * as Format from './format.js';

export default {
	mixins: [styleMixin],
	props: {
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
		hotList: {
			type: Object,
			default: () => ({})
		},
		specialList: {
			type: Object,
			default: () => ({})
		},
		groupTitleStyle: {
			type: String,
			default: ''
		},
		titleStyle: {
			type: String,
			default: ''
		},
		groupItemStyle: {
			type: String,
			default: ''
		},
		groupItemTextStyle: {
			type: String,
			default: ''
		},
		groupItemDescStyle: {
			type: String,
			default: ''
		},
		itemStyle: {
			type: String,
			default: ''
		},
		itemTextStyle: {
			type: String,
			default: ''
		},
		itemDescStyle: {
			type: String,
			default: ''
		},
		indexBoxStyle: {
			type: String,
			default: ''
		},
		indexTextStyle: {
			type: String,
			default: ''
		},
		boxStyle: {
			type: String,
			default: ''
		}
	},
	computed: {
		formatList() {
			const { normalList, hotList, specialList } = this
			return Format.totalList(normalList, hotList, specialList)
		}
	},
	data: () => ({
		popKeyShow: false,
		popKey: '',
		viewId: null,
		timer: null
	}),
	methods: {
		toScroll(e) {
			// #ifndef APP-NVUE
			if (this.viewId) {
				this.viewId = null
			}
			// #endif
			this.$emit("scroll", e)
		},
		itemClicked(item) {
			this.$emit('itemClicked', item);
		},
		go2Key(key, title) {
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
			this.popKey = title;
			this.popKeyShow = true;
			this.timer && clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.popKeyShow = false;
			}, 600);
		},
		toPrevent(e) {
			e && e.stopPropagation && e.stopPropagation()
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../mypui.scss';

.myp-index {
	position: relative;
	
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
		
		&-group {
			border-bottom-width: 0;
			padding-bottom: 0;
			height: 60rpx;
			line-height: 60rpx;
		}
	}
	&-group {
		padding-bottom: 16rpx;
		padding-right: 70rpx;
		
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
	&-item {
		width: 750rpx;
		flex-direction: row;
		align-items: center;
		height: 92rpx;
		border-bottom-width: 1px;
		border-bottom-color: $myp-border-color;
		background-color: #ffffff;
		padding: 0 32rpx;
		
		&-name {
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
		top: 32rpx;
		bottom: 32rpx;
		right: 0;
		width: 70rpx;
		flex-direction: column;
		align-items: center;
		
		&-key {
			width: 70rpx;
			text-align: center;
			font-size: 24rpx;
			height: 36rpx;
			line-height: 36rpx;
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
	&-foot {
		position: absolute;
		left: 0;
		bottom: 0;
	}
}
</style>
