<template>
	<view>
		<myp-navbar :fixed="false" title="发现"></myp-navbar>
		<!-- #ifdef APP-NVUE -->
		<waterfall :column-count="2" :column-gap="cGap" :left-gap="lGap" :right-gap="lGap" :loadmoreoffset="60" @loadmore="toLoadData">
			<header>
				<view style="height: 200rpx; background-color: #007AFF;"></view>
			</header>
			<cell v-for="(item,idx) in items" :key="idx">
				<view :class="['water-item', 'water-item-'+(idx%4)]">
					<text class="myp-color-inverse myp-size-ll">{{item}}</text>
				</view>
			</cell>
			<header>
				<view style="height: 200rpx; background-color: #007AFF;"></view>
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
				hasNext: true
			}
		},
		methods: {
			toLoadData() {
				if (!this.hasNext) return;
				const that = this
				const cp = this.cp
				setTimeout(()=>{
					that.cp += 1
					if (cp===1) {
						that.items = rawItems
					} else {
						const newItems = []
						rawItems.forEach(val => {
							newItems.push(val+(cp-1)*10)
						})
						this.items = this.items.concat(newItems)
						if (cp >= 4) {
							this.hasNext = false
						}
					}
				}, 300)
			}
		},
		created() {
			this.toLoadData()
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
