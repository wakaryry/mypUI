<template>
	<myp-scroll-h width="750rpx" height="600rpx" boxStyle="padding-top:40rpx;padding-bottom:34rpx;">
		<view class="is-token"></view>
		<view v-for="(item,idx) in items" :key="idx" :class="['is-item', idx===0&&'is-first', (idx===items.length-1)&&'is-last']">
			<v-care-card :image="item.avatar" :name="item.name" :cares="item.cares" :intro="item.intro" @care="toCare(item)" @close="toClose"></v-care-card>
		</view>
		<view class="is-token"></view>
	</myp-scroll-h>
</template>

<script>
	import vCareCard from '@/components/vCareCard.vue'
	
	export default {
		props: {
			items: {
				type: Array,
				default: ()=>{
					return []
				}
			}
		},
		components: {
			vCareCard
		},
		data() {
			return {
			}
		},
		methods: {
			toCare(val) {
				this.$emit("care", val)
			},
			toClose() {
				this.$emit("close")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	
	.is {
		&-item {
			border-left-width: 1px;
			border-left-color: $myp-border-color;
			border-top-width: 1px;
			border-top-color: $myp-border-color;
			border-bottom-width: 1px;
			border-bottom-color: $myp-border-color;
			border-right-width: 0;
			overflow: hidden;
		}
		&-first {
			border-top-left-radius: 12rpx;
			border-bottom-left-radius: 12rpx;
		}
		&-last {
			border-right-width: 1px;
			border-right-color: $myp-border-color;
			border-top-right-radius: 12rpx;
			border-bottom-right-radius: 12rpx;
		}
		&-token {
			width: 32rpx;
		}
	}
</style>
