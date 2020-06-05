<template>
	<view class="myp-loading">
		<view v-if="hasMore&&isLoading" class="myp-loading-content">
			<image class="myp-loading-img" :src="loadingSrc" mode="aspectFill"></image>
			<text class="myp-loading-text">{{loadText}}</text>
		</view>
		<text v-if="!hasMore" class="myp-loading-text">{{loadText}}</text>
	</view>
</template>

<script>
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
			loadingSrc: {
				type: String,
				default: '/static/ui/loading-small.gif'
			},
			hasMore: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
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
