<template>
	<myp-popup-always :show="show" pos="top" top="status-nav-40px" leftOffset="32rpx" :overlay="overlay" width="200rpx" height="240px" @overlayClicked="toClose">
		<view class="dp">
			<text v-for="(item,idx) in items" :key="idx" :class="['dp-item', current.id===item.id&&'dp-item-current']" @tap="toSelect(item)">{{item.title}}</text>
		</view>
	</myp-popup-always>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			current: {
				type: Object,
				default: ()=>{
					return {}
				}
			}
		},
		data() {
			return {
				overlay: {
					timingFunction: ['ease-in', 'ease-out'],
					duration: 300,
					bg: '',
					bgType: 'none'
				},
				items: [
					{id: 1, title: '阿里云'}, {id: 2, title: '腾讯云'}, {id: 3, title: '马云云'}, {id: 4, title: '百度云'}, {id: 5, title: '小米云'}
				]
			}
		},
		methods: {
			toSelect(val) {
				this.$emit("select", val)
			},
			toClose() {
				this.$emit("cancel")
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	
	.dp {
		height: 240px;
		width: 200rpx;
		background-color: #FFFFFF;
		flex-direction: column;
		align-items: center;
		
		&-item {
			height: 40px;
			width: 200rpx;
			border-bottom-width: 1px;
			border-bottom-color: $myp-border-color-light;
			text-align: center;
			line-height: 40px;
			font-size: 14px;
			color: $myp-text-color;
			
			&-current {
				color: $myp-color-primary;
			}
		}
	}
</style>
