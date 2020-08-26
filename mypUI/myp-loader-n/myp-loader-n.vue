<template>
	<loading class="myp-loading" @loading="onloading" :display="isLoading ? 'show' : 'hide'">
		<image v-if="hasMore&&isLoading" class="myp-loading-img" :src="loadingSrc" mode="aspectFill"></image>
		<text v-if="isLoading || !hasMore" class="myp-loading-text">{{loadText}}</text>
		<text v-if="!isLoading&&hasMore" class="myp-loading-text">{{mainText}}</text>
	</loading>
</template>

<script>
	// 
	// 注意：在iOS-app中，当scroll的内容不足一个scroll的高度（也就是scroll无法滚动的时候），无法触发下拉刷新和上提加载
	// list中无此问题
	// list中如果内容不足一个list的高度，则下拉刷新之后，会同时显示出来load，所以我们增加了几个v-if，仅仅只是在真正需要的时候显示load内容
	// 但是增加v-if的问题来了：上提的时候无法看到文字描述，只有开始加载的时候才有
	// 也许当uni解决了这个问题之后，我们就去掉v-if
	// loading组件需要上提触发，并不是滚动到底触发
	//
	export default {
		props: {
			maxTime: {
				type: Number,
				default: 0
			},
			mainText: {
				type: String,
				default: '继续上拉加载更多'
			},
			loadingText: {
				type: String,
				default: '正在加载'
			},
			noMoreText: {
				type: String,
				default: '没有更多啦'
			},
			hasMore: {
				type: Boolean,
				default: true
			},
			loadingSrc: {
				type: String,
				default: '/static/ui/loading-small.gif'
			},
			isRefreshing: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				isLoading: false
			}
		},
		computed: {
			loadText() {
				if (!this.hasMore) {
					return this.noMoreText
				}
				return this.isLoading ? this.loadingText : this.mainText
			}
		},
		methods: {
			// onLoading意味着触发了上提加载，正在请求数据
			onloading(e) {
				// console.log("正在加载")
				this.isLoading = true
				this.$emit("loading")
				if (!this.hasMore) return;
				// this.isLoading = true
				// this.$emit("loading")
				if (this.maxTime <= 0) return;
				this.loadTimeOut && clearTimeout(this.loadTimeOut)
				const that = this
				this.loadTimeOut = setTimeout(()=>{
					that.$emit("timeout")
					that.cancel()
				}, this.maxTime)
			},
			cancel() {
				this.isLoading = false
				this.loadTimeOut && clearTimeout(this.loadTimeOut)
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
