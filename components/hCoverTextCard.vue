<template>
	<view :class="['hctc', 'myp-bg-'+bgType]" :style="boxStyle">
		<view class="hctc-cover" :style="imgBoxStyle">
			<image :src="img" mode="aspectFill" class="hctc-cover-img" :style="imgStyle"></image>
			<view class="hctc-cover-icon" :style="imgIconStyle">
				<myp-icon :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="iconBoxStyle"></myp-icon>
			</view>
		</view>
		<view class="hctc-body">
			<text :class="['hctc-title', 'myp-color-'+titleType, 'myp-size-'+titleSize]" :style="titleStyle">{{title}}</text>
			<text :class="['myp-color-'+descType, 'myp-size-'+descSize]" :style="descStyle">{{desc}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			bgType: {
				type: String,
				default: ''
			},
			img: {
				type: String,
				default: ''
			},
			icon: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			desc: {
				type: String,
				default: ''
			},
			iconType: {
				type: String,
				default: 'inverse'
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
			titleStyle: {
				type: String,
				default: ''
			},
			descType: {
				type: String,
				default: 'third'
			},
			descSize: {
				type: String,
				default: 'ss'
			},
			descStyle: {
				type: String,
				default: ''
			},
			imgStyle: {
				type: String,
				default: ''
			},
			imgBoxStyle: {
				type: String,
				default: ''
			},
			imgIconStyle: {
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
	.hctc {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		align-items: center;
		
		&-cover {
			width: 120rpx;
			height: 120rpx;
			border-radius: 12rpx;
			position: relative;
			margin-right: 16rpx;
			
			&-img {
				width: 120rpx;
				height: 120rpx;
				border-radius: 12rpx;
			}
			&-icon {
				position: absolute;
			}
		}
		&-body {
			flex: 1;
		}
		&-title {
			overflow: hidden;
			text-overflow: ellipsis;
			/* #ifdef APP-NVUE */
			lines: 2;
			/* #endif */
			/* #ifndef APP-NVUE */
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			/* #endif */
		}
	}
</style>
