<template>
	<view class="ch-head">
		<view class="ch-head-numbers">
			<v-text-text-item v-for="(item,idx) in numbers" :key="idx" :top="item.num" :bottom="item.name" topTextStyle="font-size:40rpx;line-height:56rpx;font-weight:600;color:#FFFFFF;" space="5rpx" bottomTextStyle="font-size:30rpx;line-height:42rpx;color:#FFFFFF;" boxStyle="height:150rpx;" @select="toSelectNumber(item)"></v-text-text-item>
		</view>
	</view>
</template>

<script>
	import vTextTextItem from './vTextTextItem.vue'
	import vIconTextItem from './vIconTextItem.vue'
	
	export default {
		components: {
			vTextTextItem,
			vIconTextItem
		},
		props: {
			numbers: {
				type: Array,
				default: ()=>{
					return []
				}
			}
		},
		methods: {
			toSelectAp(val) {
				this.$emit("page", Object.assign({}, val))
			},
			toSelectNumber(val) {
				this.$emit("page", Object.assign({}, val))
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	.ch {
		&-head {
			background-color: $myp-color-primary;
			width: 750rpx;
			height: 168rpx;
			position: relative;
			
			&-numbers {
				width: 750rpx;
				height: 150rpx;
				padding-left: 72rpx;
				padding-right: 72rpx;
				align-items: center;
				flex-direction: row;
				justify-content: space-between;
			}
		}
	}
</style>
