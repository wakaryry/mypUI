<template>
	<view ref="myp-notify" v-if="show" :hack="isNeedShow" :class="['myp-notify', 'myp-bg-'+(type&&type.length>0?type:'text')]" :style="mrBoxStyle + noWeexAnimation">
		<text :class="['myp-size-'+size, 'myp-color-inverse']" :style="msgStyle">{{msg}}</text>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = weex.requireModule('animation');
	// #endif
	import {
		Utils
	} from "../utils/utils.js";
	export default {
		data() {
			return {
				barHeight: Utils.env.getPageSafeArea().top,
				show: false,
				msg: '',
				type: '',
				size: '',
				bg: '',
				height: 88,
				duration: 2000,
				msgStyle: "",
				animation: 'ease-out',
				noWeexAnimation: ""
			}
		},
		computed: {
			totalHeight() {
				const _height = uni.upx2px(this.height)
				return this.barHeight + _height
			},
			isNeedShow() {
				// it's just a hack
				this.hackShow()
				// this.appearPopup(this.show);
				return this.show;
			},
			mrBoxStyle() {
				const {
					bg,
					totalHeight,
					barHeight
				} = this;
				let style = "padding-top:" + barHeight + ';'
				style += `top:${-totalHeight}px;`
				style += `height:${totalHeight}px;`
				if (bg && bg.length > 0) {
					style += `background-color:${bg};`
				}
				return style;
			}
		},
		methods: {
			// call it to notify info
			// we could custom type/size/height/msg/bg/animation/duration/msgStyle in info
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
			hackShow() {
				const that = this
				// since we used v-if, the element may not exist
				setTimeout(() => {
					that.appearPopup(that.show);
				}, 50);
			},
			hide() {
				this.appearPopup(false, 0);
			},
			appearPopup(bool, duration = 300) {
				// #ifdef APP-NVUE
				this.weexAppearPopup(bool)
				// #endif
				// #ifndef APP-NVUE
				this.noWeexAppearPopup(bool)
				// #endif
			},
			noWeexAppearPopup(bool, duration = 300) {
				// add css transition properties
				let _style = "transform:" + this.getTransform(this.totalHeight, !bool) + ';'
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
						transform: this.getTransform(this.totalHeight, !bool)
					},
					duration,
					delay: 0,
					timingFunction: this.animation
				}, () => {
					if (!bool) {
						this.show = false
						this.$emit('close');
					}
				});
			},
			getTransform(height, bool) {
				let _size = height;
				bool && (_size = 0);
				return `translateY(${_size}px)`;
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
	}
</style>
