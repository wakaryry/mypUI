<template>
	<view v-if="showLoading" :class="['myp-loading', showLoading&&needMask&&'myp-bg-'+maskType, showLoading&&needMask&&'myp-loading-mask']" @tap.stop="maskClicked" :style="maskStyle">
		<view :class="['myp-flex-column', 'myp-align-center', 'myp-justify-center', 'myp-loading-content', 'myp-bg-'+bgType]" :style="mrContentStyle">
			<image :src="icon" mode="aspectFill" class="myp-loading-content-image" :style="iconStyle"></image>
			<text v-if="text" :class="['myp-lines-one', 'myp-loading-content-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{text}}</text>
		</view>
	</view>
</template>

<script>
	import {getHeight, getScreenHeight} from '../utils/system.js'

	export default {
		data() {
			return {
				showLoading: false,
				pos: 'center',
				offset: '0',
				needMask: false,
				maskType: '',
				maskStyle: '',
				bgType: '',
				icon: '',
				text: '',
				iconStyle: '',
				textType: '',
				textSize: '',
				textStyle: '',
				contentStyle: '',
				delay: 0,
				tid: 0
			}
		},
		computed: {
			screenHeight() {
				return getScreenHeight()
			},
			offsetPx() {
				return getHeight(this.offset)
			},
			mrContentStyle() {
				let style = ''
				if (this.pos === 'center') {
					style += 'transform:translate(-50%,-50%);'
					style += `top:${this.screenHeight*0.5+this.offsetPx}px;`
				} else if (this.pos === 'bottom') {
					style += 'transform:translateX(-50%);'
					style += `bottom:${this.offsetPx}px;`
				} else {
					style += 'transform:translateX(-50%);'
					style += `top:${this.offsetPx}px;`
				}
				return this.contentStyle + style
			}
		},
		methods: {
			show(options) {
				this.tid && clearTimeout(this.tid)
				const opts = Object.assign({}, options)
				this.pos = opts.pos || 'center'
				this.offset = opts.offset || '0px'
				this.needMask = (typeof opts.needMask === 'boolean') ? opts.needMask : false
				this.maskType = opts.maskType || 'mask'
				this.maskStyle = opts.maskStyle || ''
				this.bgType = opts.bgType || 'mask-dark'
				this.icon = opts.icon || '/static/ui/loading.gif'
				this.text = opts.text || ''
				this.textType = opts.textType || 'inverse'
				this.textSize = opts.textSize || 'ss'
				this.textStyle = opts.textStyle || ''
				this.iconStyle = opts.iconStyle || ''
				this.contentStyle = opts.contentStyle || ''
				this.delay = opts.delay || 0
				if (this.delay === 0) {
					this.showLoading = true
				} else {
					const that = this
					this.tid = setTimeout(() => {
						that.showLoading = true
					}, this.delay)
				}
			},
			hide() {
				this.showLoading = false
			},
			maskClicked(e) {
				e.stopPropagation && e.stopPropagation()
				this.needMask && (this.$emit('maskClicked', {}))
			}
		}
	}
</script>

<style lang="scss" scoped>
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
			left: 375rpx;
			border-radius: 20rpx;
			width: 200rpx;
			height: 200rpx;

			&-image {
				width: 75rpx;
				height: 75rpx;
			}
			&-text {
				text-align: center;
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
