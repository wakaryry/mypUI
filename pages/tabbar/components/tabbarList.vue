<template>
	<view>
		<!-- #ifdef APP-NVUE -->
		<list class="myp-bg-inverse" ref="myp-list" :bounce="true" isSwiperList="true" :style="mypContentHeightStyle+'width:750rpx;'">
			<cell>
				<view class="ti-title">
					<text class="ti-title-text">Tabbar</text>
				</view>
			</cell>
			<cell>
				<view class="ti-desc">
					<text class="ti-desc-text">快速实现各种tabbar</text>
				</view>
			</cell>
			<cell>
				<view class="ti-intro">
					<text class="ti-intro-text">为了实现各种效果，尤其是动画效果，定制Tabbar是必不可少的。而且定制的Tabbar更加灵活于设计与控制，以及交互</text>
				</view>
			</cell>
			<cell>
				<view class="ti-items">
					<view class="ti-items-one" @tap="toTabbar('hump')">
						<text class="ti-items-text">Hump</text>
					</view>
					<view class="ti-items-v">
						<view class="ti-items-two" @tap="toTabbar('normal')">
							<text class="ti-items-text">Normal</text>
						</view>
						<view class="ti-items-three" @tap="toTabbar('no_text')">
							<text class="ti-items-text">Icon</text>
						</view>
					</view>
				</view>
			</cell>
			<cell>
				<view class="ti-items-h">
					<view class="ti-items-four" @tap="toTabbar('hump_text')">
						<text class="ti-items-text">Hump Text</text>
					</view>
					<view class="ti-items-five" @tap="toTabbar('hump_border')">
						<text class="ti-items-text">Hump Border</text>
					</view>
				</view>
			</cell>
			<cell>
				<view class="ti-more">
					<text class="ti-more-text">更多动画，敬请期待</text>
				</view>
			</cell>
			<cell>
				<myp-xbar></myp-xbar>
			</cell>
		</list>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<scroll-view class="myp-bg-inverse" :scroll-y="scrollable" :style="mypContentHeightStyle+'width:750rpx;'" @touchstart="mypOnTouchStart" @touchmove="mypOnTouchMove" @touchend="mypOnTouchEnd" @touchcancel="mypOnTouchEnd" @scroll="mypOnScroll">
			<view class="ti-title">
				<text class="ti-title-text">Tabbar</text>
			</view>
			<view class="ti-desc">
				<text class="ti-desc-text">快速实现各种tabbar</text>
			</view>
			<view class="ti-intro">
				<text class="ti-intro-text">为了实现各种效果，尤其是动画效果，定制Tabbar是必不可少的。而且定制的Tabbar更加灵活于设计与控制，以及交互</text>
			</view>
			<view class="ti-items">
				<view class="ti-items-one" @tap="toTabbar('hump')">
					<text class="ti-items-text">Hump</text>
				</view>
				<view class="ti-items-v">
					<view class="ti-items-two" @tap="toTabbar('normal')">
						<text class="ti-items-text">Normal</text>
					</view>
					<view class="ti-items-three" @tap="toTabbar('no_text')">
						<text class="ti-items-text">Icon</text>
					</view>
				</view>
			</view>
			<view class="ti-items-h">
				<view class="ti-items-four" @tap="toTabbar('hump_text')">
					<text class="ti-items-text">Hump Text</text>
				</view>
				<view class="ti-items-five" @tap="toTabbar('hump_border')">
					<text class="ti-items-text">Hump Border</text>
				</view>
			</view>
			<view class="ti-more">
				<text class="ti-more-text">更多动画，敬请期待</text>
			</view>
			<myp-xbar></myp-xbar>
		</scroll-view>
		<!-- #endif -->
	</view>
</template>

<script>
	import childMixin from '@/mypUI/myp-list/header/pureHeaderChild.js'
	import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js'
	
	export default {
		mixins: [childMixin, contentBoxMixin],
		data() {
			return {
				mypExtra: 'status-nav-90rpx'
			}
		},
		methods: {
			toTabbar(val) {
				this.$emit("page", {name: "tabbar_" + val})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	
	.ti {
		&-title {
			margin-left: 30rpx;
			margin-right: 30rpx;
			
			&-text {
				font-size: 42rpx;
				line-height: 50rpx;
				color: $myp-text-color;
				font-weight: 600;
			}
		}
		&-desc {
			margin-left: 30rpx;
			margin-right: 30rpx;
			
			&-text {
				font-size: 30rpx;
				line-height: 42rpx;
				color: $myp-text-color;
				font-weight: 500;
			}
		}
		&-intro {
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-top: 45rpx;
			
			&-text {
				font-size: 30rpx;
				line-height: 42rpx;
				color: $myp-text-color;
			}
		}
		&-items {
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-top: 45rpx;
			flex-direction: row;
			
			&-h {
				flex-direction: row;
				margin-left: 30rpx;
				margin-right: 30rpx;
				margin-top: 24rpx;
			}
			&-v {
				flex: 1;
				flex-direction: column;
				height: 666rpx;
			}
			&-one {
				flex: 1;
				margin-right: 24rpx;
				height: 666rpx;
				background-color: $myp-color-primary;
				border-radius: 24rpx;
				justify-content: center;
				align-items: center;
			}
			&-two {
				flex: 1;
				margin-bottom: 24rpx;
				border-radius: 24rpx;
				background-color: $myp-color-error;
				justify-content: center;
				align-items: center;
			}
			&-three {
				flex: 1;
				border-radius: 24rpx;
				background-color: $myp-color-warning;
				justify-content: center;
				align-items: center;
			}
			&-four {
				flex: 1;
				margin-right: 24rpx;
				background-color: $myp-color-error;
				border-radius: 24rpx;
				height: 321rpx;
				justify-content: center;
				align-items: center;
			}
			&-five {
				flex: 1;
				background-color: $myp-color-success;
				border-radius: 24rpx;
				height: 321rpx;
				justify-content: center;
				align-items: center;
			}
			&-text {
				color: #FFFFFF;
				font-size: 36rpx;
				font-weight: 600;
			}
		}
		&-more {
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-top: 24rpx;
			margin-bottom: 24rpx;
			border-radius: 24rpx;
			height: 321rpx;
			justify-content: center;
			align-items: center;
			background-color: $myp-color-primary;
			
			&-text {
				color: #FFFFFF;
				font-size: 36rpx;
				font-weight: 600;
			}
		}
	}
</style>
