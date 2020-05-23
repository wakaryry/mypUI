<template>
	<myp-mask :width="width" :height="height" aria-hidden="true" maskBgColor="transparent" overlayOpacity="0.8" :show="show" :opacity='opacity' :showClose="false" @maskSetHidden="maskOverlayClick">
		<swiper v-if="show" :autoplay="false" :current="currentItem" :interval="interval" :style="{ height: height  + 'rpx'}" @change="changeItem">
			<swiper-item v-for="(v, index) in imageList" :key="index">
				<view :style="{ height: height  + 'rpx'}">
					<image :src="v.src" :style="{ height: height + 'rpx', width: width  + 'rpx'}" mode="aspectFit"></image>
				</view>
			</swiper-item>
			<view class="indicator">
				<myp-indicators :current="currentItem" :number="imageList.length"></myp-indicators>
			</view>
		</swiper>
	</myp-mask>
</template>

<script>
	import mypMask from '@/mypUI/myp-popup/mask.vue'
	import mypIndicators from '@/mypUI/myp-indicator/list.vue'
	export default {
		components: {
			mypMask,
			mypIndicators
		},
		props: {
			width: {
				type: [Number, String],
				default: 750
			},
			height: {
				type: [Number, String],
				default: 750
			},
			show: {
				type: Boolean,
				default: false
			},
			imageList: {
				type: Array,
				default: ()=>{return []}
			},
			current: {
				type: Number,
				default: 0
			},
			interval: {
				type: Number,
				default: 3000
			},
			opacity: {
				type: [Number, String],
				default: 0.6
			},
		},
		data() {
			return {
				currentItem: 0
			}
		},
		created() {
			this.currentItem = this.current
		},
		watch: {
			current(val) {
				this.currentItem = val
			}
		},
		methods: {
			changeItem(e) {
				this.currentItem = e.detail.current
				this.$emit("change", {})
			},
			maskOverlayClick() {
				this.$emit('overlayClicked', {});
			}
		}
	};
</script>

<style scoped>
	.indicator {
		position: absolute;
	}
</style>
