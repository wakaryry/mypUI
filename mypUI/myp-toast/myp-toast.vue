<template>
	<view v-if="showing" :class="['myp-toast', itemNeedMask&&'myp-bg-'+maskType]" @click.stop="toPrevent" :style="maskStyle">
		<view v-if="mode==='big'" class="myp-toast-content" :style="mrContentStyle">
			<view :class="['myp-toast-content-box', 'myp-bg-'+(bgType&&bgType.length>0?bgType:'text')]" :style="contentStyle+itemContentStyle">
				<myp-icon v-if="icon&&icon.length>0" :name="icon" :type="mrIconType" :size="mrIconSize" :iconStyle="bigIconStyle+iconStyle+itemIconStyle"></myp-icon>
				<text v-if="text" :class="['myp-toast-content-text', 'myp-color-'+mrTextType, 'myp-size-'+mrTextSize]" :style="textStyle+itemTextStyle">{{text}}</text>
			</view>
		</view>
		<view v-else class="myp-toast-small" :style="mrContentStyle">
			<view :class="['myp-toast-small-box', 'myp-bg-'+(bgType&&bgType.length>0?bgType:'text')]" :style="contentStyle+itemContentStyle">
				<view v-if="icon&&icon.length>0" style="margin-right: 24rpx;">
					<myp-icon :name="icon" :type="mrIconType" :size="mrIconSize" :iconStyle="iconStyle+itemIconStyle"></myp-icon>
				</view>
				<text v-if="text" :class="['myp-toast-small-text', 'myp-color-'+mrTextType, 'myp-size-'+mrTextSize]" :style="textStyle+itemTextStyle">{{text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import windowMixin from '../myp-mixin/windowMixin.js';

	export default {
		mixins: [windowMixin],
		props: {
			interval: {
				type: [Number, String],
				default: 2000
			},
			needMask: {
				type: Boolean,
				default: false
			},
			maskType: {
				type: String,
				default: 'mask'
			},
			maskStyle: {
				type: String,
				default: ''
			},
			contentStyle: {
				type: String,
				default: ''
			},
			iconType: {
				type: String,
				default: 'inverse'
			},
			iconSize: {
				type: String,
				default: 'll'
			},
			iconStyle: {
				type: String,
				default: ''
			},
			bigIconStyle: {
				type: String,
				default: 'font-size:60rpx;'
			},
			textType: {
				type: String,
				default: 'inverse'
			},
			textSize: {
				type: String,
				default: 'base'
			},
			textStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				itemNeedMask: false,  // just a helper
				pos: 'center',   // top/center/bottom
				offset: '0',     // status/nav-status/status-nav/x/...
				mode: 'small',   // big/small. big is big icon, small is small icon
				type: null,
				bgType: null,
				icon: null,
				text: null,
				itemTextType: 'inverse',
				itemTextSize: 'base',
				itemIconType: 'inverse',
				itemIconSize: 'll',
				itemContentStyle: '',
				itemIconStyle: '',
				itemTextStyle: '',
				showing: false,
				tid: 0
			}
		},
		computed: {
			screenHeight() {
				return this.mypGetScreenHeight()
			},
			offsetPx() {
				return this.mypGetHeight(this.offset)
			},
			mrContentStyle() {
				let style = 'left:375rpx;'
				if (this.pos === 'center') {
					const h = this.screenHeight * 0.5 + this.offsetPx
					style += `top:${h}px;transform:translate(-50%, -50%);`
				} else if (this.pos === 'bottom') {
					style += `bottom:${this.offsetPx}px;transform:translateX(-50%);`
				} else {
					style += `top:${this.offsetPx}px;transform:translateX(-50%);`
				}
				console.log(this.offsetPx)
				return style
			},
			mrIconType() {
				if (this.itemIconType && this.itemIconType.length > 0) return this.itemIconType;
				return this.iconType
			},
			mrIconSize() {
				if (this.itemIconSize && this.itemIconSize.length > 0) return this.itemIconSize;
				return this.iconSize
			},
			mrTextType() {
				if (this.itemTextType && this.itemTextType.length > 0) return this.itemTextType;
				return this.textType
			},
			mrTextSize() {
				if (this.itemTextSize && this.itemTextSize.length > 0) return this.itemTextSize;
				return this.textSize
			}
		},
		methods: {
			showToast(info, cInterval=null, cFinish=null, errorOptions=null) {
				this.tid && clearTimeout(this.tid);
				if (this.showing) {
					this.showing = false
				}
				let _interval = this.interval
				let _finish = null
				let _info = {}
				// Error
				if (info && info.message) {
					let _msg = info.message
					if (info.fileName) {
						_msg += " " + info.fileName
					}
					if (info.lineNumber) {
						_msg += " " + info.lineNumber
					}
					_info['text'] = _msg
					if (!errorOptions || typeof errorOptions != 'object') {
						_info = {text: _msg, type: 'error', bgType: 'error', icon: 'error', 'pos': 'center', offset: '0'}
					} else {
						_info = Object.assign({}, {text: _msg}, errorOptions)
					}
				} else {
					_info = Object.assign({}, info||{})
				}
				if (_info.interval) {
					_interval = _info.interval
				} else if (_info.interval === 0) {
					_interval = 0
				}
				delete _info.interval
				if (_info.finish) {
					_finish = _info.finish
					delete _info.finish
				}
				if (typeof _info.needMask === 'boolean') {
					this.itemNeedMask = _info.needMask
					delete _info.needMask
				} else {
					this.itemNeedMask = this.needMask
				}
				if (_info.mode) {
					this.mode = _info.mode
					delete _info.mode
				} else {
					this.mode = 'small'
				}
				if (_info.contentStyle) {
					this.itemContentStyle = _info.contentStyle
					delete _info.contentStyle
				} else {
					// reset to clear the before-set
					this.itemContentStyle = ''
				}
				if (_info.iconStyle) {
					this.itemIconStyle = _info.iconStyle
					delete _info.iconStyle
				} else {
					this.itemIconStyle = ''
				}
				if (_info.iconType) {
					this.itemIconType = _info.iconType
					delete _info.iconType
				} else {
					this.itemIconType = ''
				}
				if (_info.iconSize) {
					this.itemIconSize = _info.iconSize
					delete _info.iconSize
				} else {
					this.itemIconSize = ''
				}
				if (_info.textStyle) {
					this.itemTextStyle = _info.textStyle
					delete _info.textStyle
				} else {
					this.itemTextStyle = ''
				}
				if (_info.textType) {
					this.itemTextType = _info.textType
					delete _info.textType
				} else {
					this.itemTextType = ''
				}
				if (_info.textSize) {
					this.itemTextSize = _info.textSize
					delete _info.textSize
				} else {
					this.itemTextSize = ''
				}
				// type/bgType/icon/text/pos/offset
				for (const i in _info) {
					this[i] = _info[i]
				}
				if (!this.type || this.type.length === 0) {
					this.type = "default"
				}
				if (!_info.bgType || _info.bgType.length === 0) {
					this.bgType = this.type
				}
				if (!_info.icon || _info.icon.length === 0) {
					this.icon = this.type
				}
				if (!_info.pos || _info.pos.length === 0) {
					this.pos = 'center'
				}
				if (typeof _info.offset === 'undefined' || (typeof _info.offset === 'string' && _info.offset.length === 0)) {
					this.offset = '0'
				}
				if (cInterval) {
					_interval = cInterval
				}
				if (cFinish) {
					_finish = cFinish
				}
				this.showing = true
				const that = this
				this.tid = setTimeout(() => {
					that.showing = false;
					_finish && _finish()
				}, _interval);
			},
			toPrevent(e) {
				e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../mypui.scss';
	
	.myp-toast {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		
		&-content {
			position: fixed;
			
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
			
			&-box {
				flex-direction: row;
				align-items: center;
				border-radius: 20rpx;
				width: 600rpx;
				padding: 32rpx;
			}
			
			&-text {
				flex: 1;
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
