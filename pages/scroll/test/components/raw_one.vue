<template>
	<view>
		<!-- #ifdef APP-NVUE -->
		<list :style="mypContentHeightStyle+'width:750rpx;'">
			<refresh class="wrap-refresh" :display="display" @refresh="toRefresh">
				<loading-indicator class="wrap-indicator"></loading-indicator>
			</refresh>
			<cell v-for="(item,idx) in items" :key="idx">
				<view class="wrap-item">
					<text class="wrap-item-text">{{item}}</text>
				</view>
			</cell>
			<loading class="wrap-loading" :display="displayLoading" @loading="toLoad">
				<loading-indicator class="wrap-indicator"></loading-indicator>
			</loading>
		</list>
		<!-- #endif -->
	</view>
</template>

<script>
	import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js'
	const rawItems = [1]
	
	export default {
		mixins: [contentBoxMixin],
		data() {
			return {
				// #ifdef APP-NVUE
				items: rawItems,
				display: 'hide',
				displayLoading: 'hide',
				hasMore: true,
				currentPage: 1
				// #endif
			}
		},
		methods: {
			// #ifdef APP-NVUE
			toRefresh() {
				if (this.displayLoading === 'show') {
					this.display = 'hide'
					return
				}
				this.display = 'show'
				const platform = this.mypGetPlatform()
				if (platform === 'ios') {
					// 不起作用
					this.displayLoading = 'hide'
				}
				const cp = 1
				setTimeout(()=>{
					this.items = rawItems
					this.currentPage = 1
					this.display = 'hide'
					if (platform === 'ios') {
						// 不起作用
						this.displayLoading = 'hide'
					}
					this.hasMore = true
				}, 300)
			},
			toLoad() {
				if (this.display === 'show') {
					this.displayLoading = 'hide'
					return
				}
				if (this.displayLoading === 'show') {
					return
				}
				if (!this.hasMore) {
					console.log('没有更多辣')
					const platform = this.mypGetPlatform()
					if (platform === 'ios') {
						// ios下必须直接关闭，不然可以一直往上拖动，底部出现大量空白
						this.displayLoading = 'hide'
					} else {
						// 安卓下不能直接关闭，需要先打开，然后延时关闭。不打开也不能关闭。打开不延时关闭也不能关闭
						this.displayLoading = 'show'
						setTimeout(()=>{
							this.displayLoading = 'hide'
						}, 0)
					}
					return
				}
				this.displayLoading = 'show'
				const cp = this.currentPage + 1
				setTimeout(()=>{
					if (cp === 1) {
						this.items = rawItems
						this.currentPage = 1
						this.displayLoading = 'hide'
						this.hasMore = true
					} else {
						const newItems = []
						rawItems.forEach(val => {
							newItems.push(val+(cp-1)*1)
						})
						this.items = this.items.concat(newItems)
						this.currentPage = cp
						this.displayLoading = 'hide'
						if (cp >= 10) {
							this.hasMore = false
						} else {
							this.hasMore = true
						}
					}
				}, 300)
			}
			// #endif
		}
	}
</script>

<style lang="scss">
	@import '@/mypUI/mypui.scss';
	
	.wrap {
		&-item {
			width: 750rpx;
			background-color: $myp-color-primary;
			height: 240rpx;
			justify-content: center;
			align-items: center;
			margin-bottom: 20rpx;
			
			&-text {
				font-size: 46rpx;
				color: #FFFFFF;
			}
		}
		&-refresh {
			width: 750rpx;
			height: 80rpx;
			justify-content: center;
			align-items: center;
		}
		&-loading {
			width: 750rpx;
			height: 80rpx;
			justify-content: center;
			align-items: center;
		}
		&-indicator {
			height: 60rpx;
			width: 60rpx;
			color: #666666;
		}
	}
</style>
