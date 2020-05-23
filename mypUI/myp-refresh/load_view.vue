<template>
	<view class="myp-loading">
		<view v-if="hasMore&&isLoading" class="myp-loading-content">
			<image class="myp-loading-img" :src="LOADING_ICON" mode="aspectFill"></image>
			<text class="myp-loading-text">{{loadText}}</text>
		</view>
		<text v-if="!hasMore" class="myp-loading-text">{{loadText}}</text>
	</view>
</template>

<script>
	// 不同的加载体验
	// - 无限上提加载，无提示，无停顿：scroll/list中直接@loadmore/@scrolltolower；
	// - 无限上提加载，带有提示，无停顿：scroll/list中直接@loadmore/@scrolltolower，再加一个提示的内容或者cell；
	// - 使用loading组件，不需要@loadmore；
	// 实际上以上两种原理是一样的，同样是计算到底部的距离来触发加载更多，只不过app上面loading组件有上拉的效果；
	const LOADING_ICON = 'https://img.alicdn.com/tfs/TB1CWnby7yWBuNjy0FpXXassXXa-32-32.gif'
	export default {
		props: {
			maxTime: {
				type: Number,
				default: 0
			},
			mainText: {
				type: String,
				default: '继续加载更多'
			},
			loadingText: {
				type: String,
				default: '正在加载'
			},
			noMoreText: {
				type: String,
				default: '没有更多啦'
			},
			isLoading: {
				type: Boolean,
				default: false
			},
			hasMore: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				LOADING_ICON
			}
		},
		computed: {
			loadText() {
				if (!this.hasMore) {
					return this.noMoreText
				}
				return this.isLoading ? this.loadingText : this.mainText
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-loading {
		width: 750rpx;
		flex-direction: column;
		align-items: center;
		padding: 20rpx;
		height: 120rpx;
		&-content {
			flex-direction: column;
			align-items: center;
		}
		&-img {
			width: 40rpx;
			height: 40rpx;
		}
		&-text {
			font-size: 28rpx;
			color: #666666;
			line-height: 40rpx;
		}
	}
</style>
