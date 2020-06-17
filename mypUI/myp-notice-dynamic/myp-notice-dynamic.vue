<template>
	<view ref="myp-notice" v-if="show" :hack="hackShow" :class="['myp-notice', 'myp-bg-'+mrBgType]" :style="mrBoxStyle + noWeexAnimation">
		<slot>
			<myp-icon :name="icon" :iconStyle="iconStyle" :type="iconType" :size="iconSize" :boxStyle="iconBoxStyle"></myp-icon>
			<text :class="['myp-size-'+textSize, 'myp-type-'+textType]" :style="textStyle">{{text}}</text>
		</slot>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = weex.requireModule('animation');
	// #endif
	import windowMixin from '../myp-mixin/windowMixin.js'
	
	export default {
		mixins: [windowMixin],
		data() {
			return {
				show: false,
				pos: 'top', // top/bottom/top-center/bottom-center
				offset: 'status-nav',  // status/nav/status-nav/status-nav-xxx/number/rpx/px/x-xxx
				type: '',
				bgType: '',
				bg: '',
				text: '',
				textType: 'inverse',
				textSize: 'base',
				textStyle: '',
				icon: '',
				iconType: '',
				iconSize: '',
				iconBoxStyle: '',
				iconStyle: '',
				height: '44px',
				boxStyle: '',
				duration: 2000,
				animation: 'ease-out',
				noWeexAnimation: ""
			}
		},
		computed: {
			offsetPx() {
				return this.mypGetHeight(this.offset)
			},
			heightPx() {
				return this.mypToPx(this.height)
			},
			hackShow() {
				this.handleHackShow()
				return this.show;
			},
			mrBgType() {
				if (this.bgType && this.bgType.length > 0) return this.bgType;
				return this.type
			},
			mrIcon() {
				if (this.icon && this.icon.length > 0) return this.icon;
				return this.type
			},
			mrBoxStyle() {
				let style = ''
				style += `height:${this.heightPx}px;`
				if (this.pos === 'top') {
					style += `top:${-this.heightPx}px;`
				} else {
					style += `bottom:${-this.heightPx}px;`
				}
				if (this.bg && this.bg.length > 0) {
					style += `background-color:${this.bg};`
				}
				return style + this.boxStyle;
			}
		},
		methods: {
			notify(info) {
				for (const i in info) {
					this[i] = info[i]
				}
				this.show = true
				if (!this.duration) return
				setTimeout(() => {
					this.hide()
				}, this.duration);
			},
			handleHackShow() {
				const that = this
				// since we used v-if, the element may not exist
				setTimeout(() => {
					that.appearPopup(that.show);
				}, 50);
			},
			hide() {
				this.appearPopup(false, 300);
			},
			appearPopup(bool, duration = 300) {
				// #ifdef APP-NVUE
				this.weexAppearPopup(bool, duration)
				// #endif
				// #ifndef APP-NVUE
				this.noWeexAppearPopup(bool, duration)
				// #endif
			},
			noWeexAppearPopup(bool, duration = 300) {
				// add css transition properties
				let _style = "transform:" + this.getTransform(!bool) + ';'
				_style += "transition: all " + duration + "ms " + this.animation + ';'
				this.noWeexAnimation = _style
				const that = this
				setTimeout(()=>{
					if (!bool) {
						that.show = false
						that.$emit("close")
					}
				}, duration)
			},
			weexAppearPopup(bool, duration = 300) {
				const popupEl = this.$refs['myp-notify'];
				if (!popupEl) {
					return;
				}
				animation.transition(popupEl, {
					styles: {
						transform: this.getTransform(!bool)
					},
					duration,
					delay: 0,
					timingFunction: this.animation
				}, () => {
					if (!bool) {
						this.show = false
						this.$emit('close');
					}
				})
			},
			getTransform(toClose) {
				let _size = 0
				if (!toClose) {
					_size = this.heightPx + this.offsetPx
				}
				return this.pos === 'top' ? `translateY(${_size}px)` : `translateY(${-_size}px)`
			}
		}
	};
</script>

<style lang="scss" scoped>
	.myp-notify {
		position: fixed;
		left: 0;
		right: 0;
		align-items: center;
		justify-content: center;
		flex-direction: row;
	}
</style>
