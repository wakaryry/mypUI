<template>
	<view>
		<myp-navbar :fixed="false" title="发现"></myp-navbar>
		<myp-waterfall ref="myp-list" :autoUpdate="true" :columnCount="2" columnGap="20rpx" leftGap="32rpx" rightGap="32rpx" extra="status-nav-x-50px" @down="toLoadData" @up="toLoadData">
			<view slot="header" style="height: 200rpx; background-color: #007AFF;"></view>
			<myp-list-cell v-for="(item,idx) in items" :key="idx">
				<view :class="['water-item', 'water-item-'+(idx%4)]">
					<text class="myp-color-inverse myp-size-ll">{{item}}</text>
				</view>
			</myp-list-cell>
			<myp-list-header>
				<view style="height: 200rpx; background-color: #007AFF;"></view>
			</myp-list-header>
		</myp-waterfall>
	</view>
</template>

<script>
	const rawItems = [1,2,3,4,5,6,7,8,9,10]
	
	export default {
		data() {
			return {
				items: []
			}
		},
		methods: {
			toLoadData() {
				const that = this
				const ins = this.$refs['myp-list']
				const cp = ins.mypCurrentPage
				setTimeout(()=>{
					if (cp===1) {
						that.items = rawItems
					} else {
						const newItems = []
						rawItems.forEach(val => {
							newItems.push(val+(cp-1)*10)
						})
						this.items = this.items.concat(newItems)
					}
					if (cp >= 4) {
						ins.mypEndSuccess(false)
					} else {
						ins.mypEndSuccess(true)
					}
				}, 300)
			}
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
