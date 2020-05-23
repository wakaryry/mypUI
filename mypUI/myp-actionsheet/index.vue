<template>
	<myp-popup :show="show" :height="popHeight" @overlayClicked="toCloseActionsByMask">
		<view class="myp-action" :style="boxStyle">
			<view class="myp-action-items" :style="itemsBoxStyle">
				<myp-button v-for="(item, idx) in items" :key="idx" :icon="iconLabel ? item[iconLabel] : ''" :text="textLabel ? item[textLabel] : item" :boxStyle="itemStyle" :textStyle="itemTextStyle" :iconStyle="itemIconStyle" @buttonClicked="toClickItem(idx)"></myp-button>
				<myp-button v-if="cancel && !cancelSpace" :text="cancel" :boxStyle="cancelStyle" :textStyle="cancelTextStyle" :iconStyle="cancelIconStyle" @buttonClicked="toCancel"></myp-button>
			</view>
			<view v-if="cancel && cancelSpace" :style="{height: cancelSpace}"></view>
			<view v-if="cancel && cancelSpace" class="myp-action-cancel" :style="cancelBoxStyle">
				<myp-button :text="cancel" :boxStyle="cancelStyle" :textStyle="cancelTextStyle" :iconStyle="cancelIconStyle" @buttonClicked="toCancel"></myp-button>
			</view>
		</view>
	</myp-popup>
</template>

<script>
	// 只是示范action sheet，其它样式自己参考实现
	import mypButton from '@/mypUI/myp-button/index.vue'
	import mypPopup from '@/mypUI/myp-popup/index.vue'
	export default {
		components: {
			mypButton,
			mypPopup
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			items: {
				type: Array,
				default: ()=>{return []}
			},
			height: {
				type: Number,
				default: 0
			},
			maskClosable: {
				type: Boolean,
				default: true
			},
			iconLabel: {
				type: String,
				default: ''
			},
			textLabel: {
				type: String,
				default: ''
			},
			// 如果设置cancel为null，则不显示calcel
			cancel: {
				type: String,
				default: '取消'
			},
			// 如果space为null，则cancel和其他选项一起
			cancelSpace: {
				type: String,
				default: '32rpx'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			itemsBoxStyle: {
				type: String,
				default: ''
			},
			cancelBoxStyle: {
				type: String,
				default: ''
			},
			itemStyle: {
				type: String,
				default: 'border-radius:0;border-width:0;background-color:#FFFFFF;'
			},
			itemTextStyle: {
				type: String,
				default: 'color:#333333;font-size:32rpx;'
			},
			itemIconStyle: {
				type: String,
				default: 'color:#333333;font-size:32rpx;'
			},
			cancelStyle: {
				type: String,
				default: 'border-radius:0;border-width:0;'
			},
			cancelTextStyle: {
				type: String,
				default: ''
			},
			cancelIconStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			popHeight() {
				if (this.height) {
					return this.height
				}
				let _height = this.items.length * 106
				if (this.cancel) {
					console.log(this.cancel)
					_height += 106
				}
				if (this.cancelSpace) {
					console.log(this.cancelSpace)
					_height += parseInt(this.cancelSpace)
				}
				return _height
			}
		},
		methods: {
			toCloseActionsByMask() {
				if (this.maskClosable) {
					this.$emit("actionMaskClicked")
				}
			},
			toClickItem(idx) {
				this.$emit("actionItemClicked", idx)
			},
			toCancel() {
				this.$emit("cancel")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-action {
		flex-direction: column;
		align-items: center;
		width: 750rpx;
		background-color: transparent;
		
		&-items {
			border-radius: 32rpx;
			overflow: hidden;
			width: 670rpx;
		}
		
		&-cancel {
			border-radius: 32rpx;
			overflow: hidden;
			width: 670rpx;
		}
	}
</style>
