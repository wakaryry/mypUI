<template>
	<view v-if="showLoading" :class="['myp-loading', showLoading&&itemNeedMask&&'myp-bg-'+itemMaskType, showLoading&&itemNeedMask&&'myp-loading-mask']" @tap.stop="maskClicked" :style="itemMaskStyle">
		<view :class="['myp-loading-content', 'myp-bg-'+itemBgType]" :style="mrContentStyle">
			<image :src="itemIcon" mode="aspectFill" class="myp-loading-content-image" :style="itemIconStyle"></image>
			<text v-if="itemText" :class="['myp-loading-content-text', 'myp-color-'+itemTextType, 'myp-size-'+itemTextSize]" :style="itemTextStyle">{{itemText}}</text>
		</view>
	</view>
</template>

<script>
	import windowMixin from '../myp-mixin/windowMixin.js'

	export default {
		mixins: [windowMixin],
		props: {
			pos: {
				type: String,
				default: 'center'
			},
			offset: {
				type: String,
				default: '0'
			},
			icon: {
				type: String,
				default: '/static/ui/loading.gif'
			},
			text: {
				type: String,
				default: ''
			},
			delay: {
				type: Number,
				default: 0
			},
			bgType: {
				type: String,
				default: 'mask-dark'
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
			iconStyle: {
				type: String,
				default: ''
			},
			textType: {
				type: String,
				default: 'inverse'
			},
			textSize: {
				type: String,
				default: 'ss'
			},
			textStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				showLoading: false,
				itemPos: 'center',
				itemOffset: '0',
				itemNeedMask: false,
				itemMaskType: '',
				itemMaskStyle: '',
				itemBgType: '',
				itemIcon: '',
				itemText: '',
				itemIconStyle: '',
				itemTextType: '',
				itemTextSize: '',
				itemTextStyle: '',
				itemContentStyle: '',
				itemDelay: 0,
				tid: 0
			}
		},
		computed: {
			screenHeight() {
				return this.mypGetScreenHeight()
			},
			offsetPx() {
				return this.mypGetHeight(this.itemOffset)
			},
			mrContentStyle() {
				let style = ''
				if (this.itemPos === 'center') {
					style += 'transform:translate(-50%,-50%);'
					style += `top:${this.screenHeight*0.5+this.offsetPx}px;`
				} else if (this.itemPos === 'bottom') {
					style += 'transform:translateX(-50%);'
					style += `bottom:${this.offsetPx}px;`
				} else {
					style += 'transform:translateX(-50%);'
					style += `top:${this.offsetPx}px;`
				}
				return this.itemContentStyle + style
			}
		},
		methods: {
			show(options) {
				this.tid && clearTimeout(this.tid)
				const opts = Object.assign({}, options)
				this.itemPos = opts.pos || this.pos
				this.itemOffset = opts.offset || this.offset
				this.itemNeedMask = (typeof opts.needMask === 'boolean') ? opts.needMask : this.needMask
				this.itemMaskType = opts.maskType || this.maskType
				this.itemMaskStyle = opts.maskStyle || this.maskStyle
				this.itemBgType = opts.bgType || this.bgType
				this.itemIcon = opts.icon || this.icon
				this.itemText = opts.text || this.text
				this.itemTextType = opts.textType || this.textType
				this.itemTextSize = opts.textSize || this.textSize
				this.itemTextStyle = opts.textStyle || this.textStyle
				this.itemIconStyle = opts.iconStyle || this.iconStyle
				this.itemContentStyle = opts.contentStyle || this.contentStyle
				this.itemDelay = opts.delay || this.delay
				if (this.itemDelay === 0) {
					this.showLoading = true
				} else {
					const that = this
					this.tid = setTimeout(() => {
						that.showLoading = true
					}, this.itemDelay)
				}
			},
			hide() {
				this.showLoading = false
			},
			maskClicked(e) {
				e.stopPropagation && e.stopPropagation()
				this.itemNeedMask && (this.$emit('maskClicked', {}))
			}
		}
	}
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
		}
		
		&-content {
			position: fixed;
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			left: 375rpx;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-radius: 20rpx;
			width: 200rpx;
			height: 200rpx;

			&-image {
				width: 75rpx;
				height: 75rpx;
			}
			&-text {
				overflow: hidden;
				text-align: center;
				text-overflow: ellipsis;
				lines: 1;
				/* #ifndef APP-NVUE */
				white-space: nowrap;
				/* #endif */
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
