<template>
	<view>
		<myp-navbar :fixed="false" title="发现"></myp-navbar>
		<!-- #ifdef APP-NVUE -->
		<waterfall ref="myp-scroller" :column-count="2" :column-gap="cGap" :left-gap="lGap" :right-gap="lGap" :loadmoreoffset="60" @loadmore="toLoadData">
			<myp-refresher-n ref="myp-refresher" scroller-ref="myp-scroller" @refresh="mypRefresh"></myp-refresher-n>
			<header>
				<view style="height: 200rpx; background-color: #007AFF;"></view>
			</header>
			<cell v-for="(item,idx) in items" :key="idx">
				<view :class="['water-item', 'water-item-'+(idx%4)]">
					<text class="myp-color-inverse myp-size-ll">{{item}}</text>
				</view>
			</cell>
			<header></header>
			<header>
				<view style="height: 200rpx; background-color: #007AFF;"></view>
			</header>
			<header></header>
			<header v-if="true">
				<myp-loader :isLoading="isUpLoading" :hasMore="hasNext"></myp-loader>
			</header>
			<myp-loader-n v-if="false" ref="myp-loader"></myp-loader-n>
		</waterfall>
		<!-- #endif -->
	</view>
</template>

<script>
	const rawItems = [1,2,3,4,5,6,7,8,9,10]
	
	export default {
		data() {
			return {
				cGap: uni.upx2px(20),
				lGap: uni.upx2px(32),
				items: [],
				cp: 1,
				hasNext: true,
				isUpLoading: false
			}
		},
		methods: {
			mypRefresh() {
				this.cp = 1
				this.hasNext = true
				this.toLoadData()
			},
			toLoadData() {
				if (!this.hasNext) return;
				if (this.cp === 1) {
					this.isUpLoading = false
				} else {
					this.isUpLoading = true
				}
				const that = this
				const cp = this.cp
				setTimeout(()=>{
					that.cp += 1
					if (cp===1) {
						that.items = rawItems
						this.$refs['myp-refresher'] && this.$refs['myp-refresher'].cancel()
						this.$refs['myp-scroller'].resetLoadmore()
					} else {
						const newItems = []
						rawItems.forEach(val => {
							newItems.push(val+(cp-1)*10)
						})
						this.items = this.items.concat(newItems)
						this.isUpLoading = false
						if (cp >= 4) {
							this.hasNext = false
						}
					}
				}, 300)
			}
		},
		created() {
			// #ifdef APP-NVUE
			this.toLoadData()
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	
	.water {
		&-item {
			justify-content: center;
			align-items: center;
			margin-bottom: 20rpx;
			
			&-0 {
				background-color: $myp-color-primary;
				height: 400rpx;
			}
			&-1 {
				background-color: $myp-color-warning;
				height: 280rpx;
			}
			&-2 {
				background-color: $myp-color-error;
				height: 340rpx;
			}
			&-3 {
				background-color: $myp-color-success;
				height: 320rpx;
			}
		}
	}
</style>
