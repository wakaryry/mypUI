<template>
	<view>
		<!-- #ifdef APP-NVUE -->
		<list ref='myp-raw-list' :style="mypContentHeightStyle+'width:750rpx;'">
			<myp-refresher-n ref="myp-refresher" scroller-ref="myp-raw-list" @refresh="toRefresh"></myp-refresher-n>
			<cell v-for="(item,idx) in items" :key="idx">
				<view class="raw-item">
					<text class="raw-item-text">{{item}}</text>
				</view>
			</cell>
			<myp-loader-n ref="myp-loader" :hasMore="hasMore" @loading="toLoad"></myp-loader-n>
		</list>
		<!-- #endif -->
	</view>
</template>

<script>
	import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js'
	
	const rawItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	
	export default {
		mixins: [contentBoxMixin],
		data() {
			return {
				items: rawItems,
				// #ifdef APP-NVUE
				hasMore: true,
				currentPage: 1
				// #endif
			}
		},
		methods: {
			// #ifdef APP-NVUE
			toRefresh() {
				const cp = 1
				setTimeout(()=>{
					this.items = rawItems
					this.currentPage = 1
					this.hasMore = true
					this.$refs['myp-refresher'].cancel()
				}, 300)
			},
			toLoad() {
				if (!this.hasMore) {
					console.log('没有更多辣')
					const platform = this.mypGetPlatform()
					if (platform === 'ios') {
						this.$refs['myp-loader'].cancel()
					} else {
						setTimeout(()=>{
							this.$refs['myp-loader'].cancel()
						}, 0)
					}
					return
				}
				const cp = this.currentPage + 1
				setTimeout(()=>{
					if (cp === 1) {
						this.items = rawItems
						this.currentPage = 1
						this.hasMore = true
						this.$refs['myp-loader'].cancel()
					} else {
						const newItems = []
						rawItems.forEach(val => {
							newItems.push(val+(cp-1)*10)
						})
						this.items = this.items.concat(newItems)
						this.currentPage = cp
						this.$refs['myp-loader'].cancel()
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

<style>
</style>
