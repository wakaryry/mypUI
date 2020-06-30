<template>
	<view :class="['vbc', 'myp-bg-'+bgType]" :style="boxStyle">
		<image :src="img" mode="aspectFill" class="vbc-bg"></image>
		<view :class="['vbc-mask', 'myp-bg-'+maskType]"></view>
		<view class="vbc-body">
			<view class="vbc-tag">
				<text class="vbc-tag-text">{{tag}}</text>
			</view>
			<view class="vbc-title">
				<myp-icon :name="icon"></myp-icon>
				<text class="vbc-title-text">{{title}}</text>
			</view>
			<view class="vbc-desc">
				<myp-icon :name="descIcon"></myp-icon>
				<text class="vbc-desc-text">{{desc}}</text>
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
			boxStyle: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vbc {
		width: 220rpx;
		height: 330rpx;
		border-radius: 12rpx;
		overflow: hidden;
		position: relative;
		
		&-bg {
			width: 220rpx;
			height: 330rpx;
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
		}
		&-tag {
			
		}
		&-title {
			
		}
		&-desc {
			
		}
	}
</style>
