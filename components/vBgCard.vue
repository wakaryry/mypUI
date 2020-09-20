<template>
	<view :class="['vbc', 'myp-bg-'+bgType]" :style="boxStyle">
		<image :src="img" mode="aspectFill" class="vbc-bg" :style="imgStyle"></image>
		<view :class="['vbc-mask', 'myp-bg-'+maskType]"></view>
		<view class="vbc-body">
			<view :style="tagBoxStyle">
				<text :class="['myp-color-'+tagType, 'myp-size-'+tagSize]" :style="tagStyle">{{tag}}</text>
			</view>
			<view class="vbc-title" :style="titleBoxStyle">
				<myp-icon :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="iconBoxStyle"></myp-icon>
				<text :class="['myp-color-'+titleType, 'myp-size-'+titleSize]" :style="titleStyle">{{title}}</text>
			</view>
			<view class="vbc-desc" :style="descBoxStyle">
				<myp-icon :name="descIcon" :type="descIconType" :size="descIconSize" :iconStyle="descIconStyle" :boxStyle="descIconBoxStyle"></myp-icon>
				<text :class="['myp-color-'+descType, 'myp-size-'+descSize]" :style="descStyle">{{desc}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			img: {
				type: String,
				default: ''
			},
			bgType: {
				type: String,
				default: 'dark'
			},
			maskType: {
				type: String,
				default: 'mask'
			},
			tag: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			icon: {
				type: String,
				default: ''
			},
			desc: {
				type: String,
				default: ''
			},
			descIcon: {
				type: String,
				default: ''
			},
			tagType: {
				type: String,
				default: 'third'
			},
			tagSize: {
				type: String,
				default: 'ss'
			},
			iconType: {
				type: String,
				default: 'text'
			},
			iconSize: {
				type: String,
				default: 'll'
			},
			iconStyle: {
				type: String,
				default: ''
			},
			iconBoxStyle: {
				type: String,
				default: ''
			},
			titleType: {
				type: String,
				default: 'text'
			},
			titleSize: {
				type: String,
				default: 's'
			},
			descType: {
				type: String,
				default: 'third'
			},
			descSize: {
				type: String,
				default: 'ss'
			},
			descIconType: {
				type: String,
				default: 'third'
			},
			descIconSize: {
				type: String,
				default: 's'
			},
			descIconStyle: {
				type: String,
				default: ''
			},
			descIconBoxStyle: {
				type: String,
				default: ''
			},
			boxStyle: {
				type: String,
				default: ''
			},
			imgStyle: {
				type: String,
				default: ''
			},
			tagBoxStyle: {
				type: String,
				default: 'margin-top:20rpx;'
			},
			tagStyle: {
				type: String,
				default: ''
			},
			titleBoxStyle: {
				type: String,
				default: 'margin-bottom:32rpx;'
			},
			titleStyle: {
				type: String,
				default: 'margin-top:16rpx;'
			},
			descBoxStyle: {
				type: String,
				default: 'margin-bottom:20rpx;'
			},
			descStyle: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	
	.vbc {
		width: 220rpx;
		height: 280rpx;
		border-radius: 12rpx;
		overflow: hidden;
		position: relative;
		
		&-bg {
			width: 220rpx;
			height: 280rpx;
			border-radius: 12rpx;
		}
		&-mask {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			border-radius: 12rpx;
		}
		&-body {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
		}
		&-title {
			flex-direction: column;
			align-items: center;
		}
		&-desc {
			flex-direction: row;
			align-items: center;
		}
	}
</style>
