<template>
	<view class="myp-mask">
		<myp-overlay :show="show && hasOverlay" v-if="show" :hasAnimation="hasAnimation" :duration="duration" :canAutoClose="canAutoClose" :bg='overlayBg' @overlayClicking="mypOverlayBodyClicking" @overlayClicked="mypOverlayBodyClicked"></myp-overlay>
		<view ref="myp-mask" class="myp-mask-container" v-if="show" :hack="shouldShow" :style="mrContainerStyle + noWeexAni">
			<view :class="['myp-border-'+border, 'myp-radius-'+radius]" :style="mrContentStyle">
				<slot></slot>
			</view>
			<slot name="extra">
				<view v-if="closeIcon&&closeIcon.length>0" class="myp-mask-bottom" :style="{ width: width + 'rpx' }" @click="closeIconClicked">
					<myp-icon :name="closeIcon" :iconStyle="closeStyle"></myp-icon>
				</view>
			</slot>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = weex.requireModule('animation');
	// #endif
	import mypOverlay from '@/mypUI/myp-overlay/index.vue';
	import mypIcon from '@/mypUI/myp-icon/index.vue'

	export default {
		components: {
			mypOverlay,
			mypIcon
		},
		props: {
			height: {
				type: [String, Number],
				default: 800
			},
			width: {
				type: [String, Number],
				default: 702
			},
			top: {
				type: Number,
				default: 0
			},
			show: {
				type: Boolean,
				default: false
			},
			duration: {
				type: [String, Number],
				default: 300
			},
			hasOverlay: {
				type: Boolean,
				default: true
			},
			hasAnimation: {
				type: Boolean,
				default: true
			},
			canAutoClose: {
				type: Boolean,
				default: true
			},
			timingFunction: {
				type: Array,
				default: () => (['ease-in', 'ease-out'])
			},
			bg: {
				type: String,
				default: '#FFFFFF'
			},
			border: {
				type: String,
				default: ''
			},
			radius: {
				type: String,
				default: ''
			},
			overlayBg: {
				type: String,
				default: ''
			},
			closeIcon: {
				type: String,
				default: ''
			},
			closeStyle: {
				type: String,
				default: ''
			}
		},
		data: () => ({
			maskTop: 264,
			opened: false,
			noWeexAni: ''
		}),
		computed: {
			showClose() {
				if (this.closeIcon&&this.closeIcon.length>0) {
					return true
				}
				return false
			},
			mrContainerStyle() {
				const {
					width,
					height,
					showClose,
					hasAnimation,
					opened,
					top
				} = this;
				const newHeight = showClose ? height - 0 + 100 : height;
				let platinfo = {}
				try{
					platinfo = uni.getSystemInfoSync()
				}catch(e){
					//TODO handle the exception
				}
				const deviceHeight = platinfo.windowHeight
				const deviceWidth = platinfo.windowWidth
				const _deviceHeight = deviceHeight || 1334;
				const pageHeight = _deviceHeight / deviceWidth * 750;
				const style = {
					width: width + 'rpx',
					height: newHeight + 'rpx',
					left: (750 - width) / 2 + 'rpx',
					top: (top || (pageHeight - height) / 2) + 'rpx',
					opacity: hasAnimation && !opened ? 0 : 1
				}
				let _style = ""
				for (const i in style) {
					_style += i + ":" + style[i] + ';'
				}
				return _style
			},
			mrContentStyle() {
				const style = {
					width: this.width + 'rpx',
					height: this.height + 'rpx'
				}
				if (this.bg && this.bg.length > 0) {
					style['background-color'] = this.bg
				}
				let _style = ""
				for (const i in style) {
					_style += i + ":" + style[i] + ';'
				}
				return _style
			},
			shouldShow() {
				const {
					show,
					hasAnimation
				} = this;
				this.hackShow(hasAnimation, show)
				return show;
			}
		},
		methods: {
			hackShow(hasAni, toShow) {
				hasAni && setTimeout(() => {
					this.appearMask(toShow);
				}, 50);
			},
			closeIconClicked() {
				this.appearMask(false);
			},
			mypOverlayBodyClicking() {
				if (this.hasAnimation) {
					this.appearMask(false);
					this.$emit('overlayBodyClicking', {});
				}
			},
			mypOverlayBodyClicked() {
				if (!this.hasAnimation) {
					this.appearMask(false);
					this.$emit('overlayBodyClicked', {});
				}
			},
			needEmit(bool = false) {
				this.opened = bool;
				!bool && this.$emit('maskSetHidden', {});
			},
			appearMask(bool, duration = this.duration) {
				// #ifdef APP-NVUE
				this.weexAppearMask(bool, duration)
				// #endif
				// #ifndef APP-NVUE
				this.noWeexAppearMask(bool, duration)
				// #endif
			},
			weexAppearMask(bool, duration = this.duration) {
				const {
					hasAnimation,
					timingFunction
				} = this;
				const maskEl = this.$refs['myp-mask'];
				if (hasAnimation && maskEl) {
					animation.transition(maskEl, {
						styles: {
							opacity: bool ? 1 : 0
						},
						duration,
						timingFunction: timingFunction[bool ? 0 : 1],
						delay: 0
					}, () => {
						this.needEmit(bool);
					});
				} else {
					this.needEmit(bool);
				}
			},
			noWeexAppearMask(bool, duration = this.duration) {
				const {
					hasAnimation,
					timingFunction
				} = this;
				if (hasAnimation) {
					let _style = "transition-property:opacity;transition-duration:" + duration + ';'
					_style += "opacity:" + (bool ? 1 : 0) + ';'
					_style += "transition-timing-function:" + timingFunction[bool ? 0 : 1] + ';'
					this.noWeexAni = _style
					const that = this
					setTimeout(()=>{
						that.needEmit(bool)
					}, duration)
				} else {
					this.needEmit(bool);
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../base.scss';
	
	.myp-mask {
		position: fixed;
		width: 750rpx;
		/*兼容H5异常*/
		z-index: 99999;
		
		&-container {
			position: fixed;
			top: 300rpx;
			left: 60rpx;
			width: 702rpx;
			height: 800rpx;
		}
		
		&-bottom {
			width: 100rpx;
			height: 100rpx;
			background-color: transparent;
			justify-content: center;
			align-items: center;
		}
	}
</style>
