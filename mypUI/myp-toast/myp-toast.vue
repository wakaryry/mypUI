<template>
	<view :class="['myp-toast', showing && needMask && 'myp-toast-mask']" @click="()=>{}" :style="maskStyle">
		<view class="myp-toast-content" :style="{ top: topPosition + 'px'}" v-if="showing&&mode==='big'">
			<view :class="['myp-toast-content-box', 'myp-bg-'+(bgType&&bgType.length>0?bgType:'text')]" :style="contentStyle+itemContentStyle">
				<myp-icon v-if="icon&&icon.length>0" :name="icon" type="inverse" :iconStyle="bigIconStyle+iconStyle+itemIconStyle"></myp-icon>
				<text v-if="text" :class="['myp-toast-content-text', 'myp-color-inverse']" :style="textStyle+itemTextStyle">{{text}}</text>
			</view>
		</view>
		<view class="myp-toast-small" :style="{ top: topPosition + 'px'}" v-if="showing&&mode==='small'">
			<view :class="['myp-toast-small-box', 'myp-bg-'+(bgType&&bgType.length>0?bgType:'text')]" :style="contentStyle+itemContentStyle">
				<view v-if="icon&&icon.length>0" style="margin-right: 24rpx;">
					<myp-icon :name="icon" type="inverse" size="ll" :iconStyle="iconStyle+itemIconStyle"></myp-icon>
				</view>
				<text v-if="text" :class="['myp-toast-small-text', 'myp-color-inverse']" :style="textStyle+itemTextStyle">{{text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	// loading or toast
	import {Utils} from '../utils/utils.js';

	export default {
		props: {
			interval: {
				type: [Number, String],
				default: 2000
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
			iconStyle: {
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
				// 我们需要每一次都重置影响样式的state，不然上一次的设置会影响下一次的设置
				mode: 'small',   // big/small. big is big icon, small is small icon
				type: null,
				bgType: null,
				icon: null,
				text: null,
				itemContentStyle: '',
				itemIconStyle: '',
				itemTextStyle: '',
				showing: false,
				topPosition: 250,
				tid: 0,
				// default for big icon style
				bigIconStyle: 'font-size:60rpx;'
			}
		},
		created() {
			this.topPosition = (Utils.env.getWindowHeight() - 200) / 2
		},
		methods: {
			// type不仅代表类型，在不提供icon的情况下，也代表icon的名字，type同时也决定了内容的背景色
			// 有个时候，我们不希望修改type来实现背景色的更改，也不想用itemContentStyle
			// 我们单独增加了一个bgType配置，可以忽视type随意更改背景色
			// mode/type/bgType/icon/text/interval/finish/itemContentStyle/itemIconStyle/itemTextStyle
			// 既可以在info中设置interval和finish，也通过cInterval/cFinish
			showToast(info, cInterval=null, cFinish=null) {
				this.tid && clearTimeout(this.tid);
				if (this.showing) {
					this.showing = false
				}
				if (info.mode) {
					this.mode = info.mode
					delete info.mode
				} else {
					// default into small type
					this.mode = 'small'
				}
				if (info.contentStyle) {
					this.itemContentStyle = info.contentStyle
					delete info.contentStyle
				} else {
					// reset to clear the before-set
					this.itemContentStyle = ''
				}
				if (info.iconStyle) {
					this.itemIconStyle = info.iconStyle
					delete info.iconStyle
				} else {
					this.itemIconStyle = ''
				}
				if (info.textStyle) {
					this.itemTextStyle = info.textStyle
					delete info.textStyle
				} else {
					this.itemTextStyle = ''
				}
				let _interval = this.interval
				if (info.interval) {
					_interval = info.interval
				} else if (info.interval === 0) {
					_interval = 0
				}
				delete info.interval
				if (cInterval) {
					_interval = cInterval
				}
				let _finish = null
				if (info.finish) {
					_finish = info.finish
					delete info.finish
				}
				if (cFinish) {
					_finish = cFinish
				}
				// Error
				if (info && info.message) {
					// handle with error style
					let _msg = info.message
					if (info.fileName) {
						_msg += " " + info.fileName
					}
					if (info.lineNumber) {
						_msg += " " + info.lineNumber
					}
					this.text = _msg
					this.type = 'error'
					this.bgType = 'error'
					this.icon = 'error'
				} else {
					// type/bgType/icon/text
					for (const i in info) {
						this[i] = info[i]
					}
					if (!this.type || this.type.length === 0) {
						this.type = "default"
					}
					if (!this.bgType || this.bgType.length === 0) {
						this.bgType = this.type
					}
					if (!info.icon || info.icon.length === 0) {
						this.icon = this.type
					}
				}
				this.showing = true
				const that = this
				this.tid = setTimeout(() => {
					that.showing = false;
					_finish && _finish()
				}, _interval);
			},
			maskClicked() {
				this.needMask && (this.$emit('maskClicked', {}));
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../mypui.scss';
	
	.myp-toast {
		position: relative;
		
		&-mask {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: $myp-bg-color-mask;
		}
		
		&-content {
			position: fixed;
			left: 250rpx;
			
			&-box {
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-radius: 20rpx;
				width: 250rpx;
				height: 250rpx;
			}
			
			&-text {
				overflow: hidden;
				text-align: center;
				text-overflow: ellipsis;
				color: #FFFFFF;
				font-size: 32rpx;
				line-height: 42rpx;
				margin-top: 20rpx;
				width: 200rpx;
				/* #ifdef APP-NVUE */
				lines: 2;
				/* #endif */
				/* #ifndef APP-NVUE */
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				/* #endif */
			}
		}
		
		&-small {
			position: fixed;
			left: 75rpx;
			
			&-box {
				flex-direction: row;
				align-items: center;
				border-radius: 20rpx;
				width: 600rpx;
				padding: 32rpx;
			}
			
			&-text {
				flex: 1;
				color: #FFFFFF;
				font-size: 32rpx;
				line-height: 42rpx;
				/* #ifdef APP-NVUE */
				lines: 2;
				/* #endif */
				overflow: hidden;
				text-overflow: ellipsis;
				/* #ifndef APP-NVUE */
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				/* #endif */
			}
		}
	}
</style>
