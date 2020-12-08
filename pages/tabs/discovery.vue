<template>
	<view>
		<myp-navbar :fixed="false" title="发现"></myp-navbar>
		<!-- #ifdef APP-NVUE -->
		<myp-waterfall ref="myp-list" :autoUpdate="true" :columnCount="2" columnGap="20rpx" leftGap="32rpx" rightGap="32rpx" @down="toLoadData" @up="toLoadData">
			<view slot="header" style="height: 200rpx; background-color: #007AFF;"></view>
			<myp-list-cell v-for="(item,idx) in items" :key="idx">
				<view :class="['water-item', 'water-item-'+(idx%4)]">
					<text class="myp-color-inverse myp-size-ll">{{item.id}}</text>
				</view>
			</myp-list-cell>
			<myp-list-header>
				<view style="height: 200rpx; background-color: #007AFF;"></view>
			</myp-list-header>
		</myp-waterfall>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<myp-waterfall ref="myp-list" :autoUpdate="true" extra="status-nav-x-50px" @down="toLoadData" @up="toLoadData">
			<view slot="header" style="height: 200rpx; background-color: #007AFF;"></view>
			<myp-waterfall-view ref="water" leftGap="32rpx" rightGap="32rpx" columnGap="20rpx" :calculator="calculateHeight">
				<template v-slot:left="{lefts}">
					<view v-for="(item,idx) in lefts" :key="idx" :class="['water-item', 'myp-bg-'+item.myp.bg]" :style="{height: item.mypH+'rpx'}">
						<text class="myp-color-inverse myp-size-ll">{{item.id}}</text>
					</view>
				</template>
				<template v-slot:right="{rights}">
					<view v-for="(item,idx) in rights" :key="idx" :class="['water-item', 'myp-bg-'+item.myp.bg]" :style="{height: item.mypH+'rpx'}">
						<text class="myp-color-inverse myp-size-ll">{{item.id}}</text>
					</view>
				</template>
			</myp-waterfall-view>
			<view style="height: 200rpx; background-color: #007AFF;"></view>
		</myp-waterfall>
		<!-- #endif -->
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
			calculateHeight(val) {
				const idx = val.id
				if (idx % 4 === 0) {
					return {
						h: 400 + 20,
						bg: 'primary'
					}
				}
				if (idx % 4 === 1) {
					return {
						h: 280 + 20,
						bg: 'error'
					}
				}
				if (idx % 4 === 2) {
					return {
						h: 340 + 20,
						bg: 'warning'
					}
				}
				if (idx % 4 === 3) {
					return {
						h: 320 + 20,
						bg: 'success'
					}
				}
			},
			toLoadData() {
				const that = this
				const ins = this.$refs['myp-list']
				const cp = ins.mypCurrentPage
				setTimeout(()=>{
					if (cp===1) {
						const arr = []
						rawItems.forEach(val => {
							arr.push({id: val})
						})
						that.items = arr
						// #ifndef APP-NVUE
						that.$refs['water'].clear()
						that.$refs['water'].set(arr)
						// #endif
					} else {
						const newItems = []
						rawItems.forEach(val => {
							newItems.push({id: val+(cp-1)*10})
						})
						this.items = this.items.concat(newItems)
						// #ifndef APP-NVUE
						this.$refs['water'].concat(newItems)
						// #endif
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
	
	
	.water {
		&-item {
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
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
