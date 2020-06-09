<template>
	<view :class="['myp-loading', showLoading && needMask && 'myp-loading-mask']" @click="maskClicked" :style="maskStyle">
		<view class="myp-loading-content" :style="{ top: topPosition + 'px'}" v-if="showLoading">
			<view class="myp-loading-content-box" :style="contentStyle">
				<image :src="src" mode="aspectFill" class="myp-loading-content-image" :style="imageStyle"></image>
				<text v-if="text" class="myp-loading-content-text" :style="textStyle">{{text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	// loading or toast with no animation
	import {Utils} from '../utils/utils.js';

	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			// when custom type
			src: {
				type: String,
				default: 'https://img.alicdn.com/tfs/TB1Ep_9NVXXXXb8XVXXXXXXXXXX-74-74.gif'
			},
			text: {
				type: String,
				default: ''
			},
			delay: {
				type: [Number, String],
				default: 0
			},
			// 如果不设置top，默认居中
			top: {
				type: String,
				default: null
			},
			needMask: {
				type: Boolean,
				default: false
			},
			maskStyle: {
				type: String,
				default: ''
			},
			contentStyle: {
				type: String,
				default: ''
			},
			imageStyle: {
				type: String,
				default: ''
			},
			textStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				showLoading: false,
				topPosition: 250,
				tid: 0
			}
		},
		watch: {
			show() {
				this.setShow();
			}
		},
		computed: {
		},
		created() {
			this.setShow();
			this.topPosition = (Utils.env.getWindowHeight() - 200) / 2
		},
		methods: {
			maskClicked() {
				this.needMask && (this.$emit('maskClicked', {}));
			},
			setShow() {
				const {
					delay,
					show,
					showLoading
				} = this;
				const stInterval = parseInt(delay);
				clearTimeout(this.tid);
				if (show) {
					if (showLoading) {
						return;
					}
					if (stInterval === 0) {
						this.showLoading = true;
					} else {
						const that = this
						this.tid = setTimeout(() => {
							that.showLoading = true;
						}, stInterval);
					}
				} else {
					this.showLoading = false;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../mypui.scss';
	
	.myp-loading {
		position: relative;
		
		&-mask {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: $myp-bg-color-mask;
		}
		
		&-content {
			position: fixed;
			left: 275rpx;
			
			&-box {
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-radius: 20rpx;
				background-color: $myp-bg-color-mask-dark;
				width: 200rpx;
				height: 200rpx;
			}
			
			&-image {
				width: 75rpx;
				height: 75rpx;
			}
			
			&-text {
				overflow: hidden;
				text-align: center;
				text-overflow: ellipsis;
				color: #FFFFFF;
				font-size: 24rpx;
				line-height: 30rpx;
				height: 30rpx;
				margin-top: 16rpx;
				width: 140rpx;
			}
		}
	}
</style>
