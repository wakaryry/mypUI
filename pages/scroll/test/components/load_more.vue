<template>
	<view>
		<!-- #ifdef APP-NVUE -->
		<list :style="mypContentHeightStyle+'width:750rpx;'" :loadmoreoffset="20" @loadmore="toLoad">
			<refresh class="raw-refresh" :display="display" @refresh="toRefresh">
				<loading-indicator class="raw-indicator"></loading-indicator>
			</refresh>
			<cell v-for="(item,idx) in items" :key="idx">
				<view class="raw-item">
					<text class="raw-item-text">{{item}}</text>
				</view>
			</cell>
			<cell>
				<myp-loader :isLoading="displayLoading==='show'" :hasMore="hasMore"></myp-loader>
			</cell>
		</list>
		<!-- #endif -->
	</view>
</template>

<script>
	import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js'
	
	const rawItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	import {getPlatform} from '@/mypUI/utils/system.js'
	
	export default {
		mixins: [contentBoxMixin],
		data() {
			return {
				items: rawItems,
				// #ifdef APP-NVUE
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
				const cp = 1
				setTimeout(()=>{
					this.items = rawItems
					this.currentPage = 1
					this.display = 'hide'
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
					const platform = getPlatform()
					if (platform === 'ios') {
						// ios下必须直接关闭，不然可以一直往上拖动，底部出现大量空白，而且不会自动回弹消除空白
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
							newItems.push(val+(cp-1)*10)
						})
						this.items = this.items.concat(newItems)
						this.currentPage = cp
						this.displayLoading = 'hide'
						if (cp >= 4) {
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

<style lang="scss" scoped>
	
	
	.raw {
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
