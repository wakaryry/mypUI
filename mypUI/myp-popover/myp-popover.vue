<template>
	<view class="myp-popover">
		<view class="myp-popover-cover" ref="myp-cover" v-if="show" @click="hideAction" :style="mrCoverStyle + noWeexCoverAni"></view>
		<view ref="myp-popover" class="myp-popover-popover" v-if="show && buttons.length" :style="contentStyle + noWeexPopAni">
			<view class="myp-popover-arrow" :style="arrowStyle"></view>
			<view class="myp-popover-inner">
				<view :class="['myp-popover-item',i === buttons.length-1 ? 'myp-popover-item-noborder' : '']" v-for="(item,i) in buttons" :key="i" @click="mypButtonClicked(i,item.key)">
					<view style="margin-right: 16rpx;">
						<myp-icon v-if="item.icon" :name="item.icon" :size="item.iconSize" :iconStyle="item.iconStyle||''"></myp-icon>
					</view>
					<text class="myp-popover-item-text" :style="textStyle">{{item.text}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// TODO:增加主题配置;增加横向显示buttons
	
	// #ifdef APP-NVUE
	const animation = weex.requireModule('animation');
	// #endif
	export default {
		props: {
			buttons: {
				type: Array,
				default: () => {
					[]
				}
			},
			// popover position. px
			position: {
				type: Object,
				default: () => ({
					x: 0,  // x>0是从左开始，x<0是从右开始
					y: 0   // y>0是距离顶部，y<0是距离底部
				})
			},
			// arrow position. px
			arrowPosition: {
				type: Object,
				default: () => ({
					pos: 'top',   // arrow in which side
					x: 0,  // when pos is top/bottom, distance to left/right. x>=0 is to left; x<0 is to right
					y: 0   // when pos is left/right, distance to top/bottom. y>=0 is to top; y<0 is to bottom
				})
			},
			coverBg: {
				type: String,
				default: ''
			},
			hasAnimation: {
				type: Boolean,
				default: true
			},
			textStyle: {
				type: String,
				default: ''
			}
		},
		data: () => ({
			show: false,
			showIn: false,
			animationLock: false,
			noWeexPopAni: '',
			noWeexCoverAni: '',
			// 默认的一些属性，这样就可以x/y设置为0也不会影响三角形在最边侧而不好看.也影响三角形的大小
			// TODO: 对外开放
			// px
			leastTranslate: 22,
			leastPadding: 15,
			arrowHeight: 6  // 三角形的大小，其实是对外露出的高度. 越小露出越多. px
		}),
		computed: {
			mrCoverStyle() {
				if (this.coverBg && this.coverBg.length>0) {
					const cv = this.coverBg
					const op = this.hasAnimation || !this.showIn ? '0' : '1'
					return `background-color:${cv};opacity:${op};`
				}
				return ''
			},
			transformOrigin() {
				const {
					x = 0, y = 0, pos = 'top'
				} = this.arrowPosition;
				let _origins = [];
				switch (pos) {
					case 'top':
					case 'bottom':
						_origins = [x < 0 ? 'right' : 'left', pos];
						break;
					case 'left':
					case 'right':
						_origins = [pos, y < 0 ? 'bottom' : 'top'];
						break;
				}
				return _origins.join(' ');
			},
			contentTransform() {
				const {
					pos = 'top'
				} = this.arrowPosition;
				let {
					x = 0, y = 0
				} = this.arrowPosition;
				const _translates = ['scale(0)'];
				if (x >= 0 && x < this.leastTranslate) {
					x = this.leastTranslate;
				} else if (x < 0 && x > -this.leastTranslate) {
					x = -this.leastTranslate;
				}
				if (y >= 0 && y < this.leastTranslate) {
					y = this.leastTranslate;
				} else if (y < 0 && y > -this.leastTranslate) {
					y = -this.leastTranslate;
				}
				const _padding = this.leastPadding
				switch (pos) {
					case 'top':
					case 'bottom':
						_translates[1] = `translateX(${x < 0 ? (x - _padding) : (x + _padding)}px)`;
						break;
					case 'left':
					case 'right':
						_translates[1] = `translateY(${y < 0 ? (y - _padding) : (y + _padding)}px)`
						break;
				}
				return _translates.join(' ');
			},
			contentStyle() {
				const {
					x = 0, y = 0
				} = this.position;
				let _style = ""
				_style += x < 0 ? `right:${-x}px;` : `left:${x}px;`
				_style += y < 0 ? `bottom:${-y}px;` : `top:${y}px;`
				_style += "opacity:" + (this.hasAnimation || !this.showIn ? '0' : '1') + ';'
				_style += "transform:" + (this.hasAnimation || !this.showIn ? this.contentTransform : 'scale(1)') + ';'
				_style += "transform-origin:" + this.transformOrigin + ";"
				return _style
			},
			arrowStyle() {
				let {
					x = 0, y = 0
				} = this.arrowPosition;
				const {
					pos = 'top'
				} = this.arrowPosition;
				const style = {};
				const _arrowHeight = this.arrowHeight + 'px'
				switch (pos) {
					case 'top':
						style.top = _arrowHeight;
					case 'bottom': //eslint-disable-line
						!style.top && (style.bottom = _arrowHeight);
						style.transform = 'scaleX(0.8) rotate(45deg)';
						if (x >= 0 && x < this.leastTranslate) {
							x = this.leastTranslate;
						} else if (x < 0 && x > -this.leastTranslate) {
							x = -this.leastTranslate;
						}
						x < 0 ? (style.right = `${-x}px`) : (style.left = `${x}px`);
						break;
					case 'left':
						style.left = _arrowHeight;
					case 'right': //eslint-disable-line
						!style.left && (style.right = _arrowHeight);
						style.transform = 'scaleY(0.8) rotate(45deg)';
						if (y >= 0 && y < this.leastTranslate) {
							y = this.leastTranslate;
						} else if (y < 0 && y > -this.leastTranslate) {
							y = -this.leastTranslate;
						}
						y < 0 ? (style.bottom = `${-y}px`) : (style.top = `${y}px`);
						break;
					default:
						break;
				}
				let _style = ""
				for (const i in style) {
					_style += i + ':' + style[i] + ';'
				}
				return _style
			}
		},
		methods: {
			popup() {
				if (this.animationLock) {
					return;
				}
				this.show = true;
				// hack to show, 因为v-if控制的，需要设置一个timeout
				if (this.hasAnimation) {
					setTimeout(() => this.animationShow(), 40)
				} else {
					setTimeout(() => (this.showIn = true), 40);
				}
			},
			animationShow() {
				// #ifdef APP-NVUE
				const popoverEl = this.$refs['myp-popover'];
				const coverEl = this.$refs['myp-cover'];
				if (!coverEl || !popoverEl) {
					return;
				}
				// #endif
				this.setAnimationLock();
				let a1End = false;
				let a2End = false;
				// #ifdef APP-NVUE
				animation.transition(popoverEl, {
					styles: {
						opacity: 1,
						transform: 'scale(1)',
						transformOrigin: this.transformOrigin
					},
					delay: 0,
					duration: 250,
					timingFunction: 'ease-out'
				}, (e) => {
					a1End = true;
					if (a1End && a2End) {
						this.animationLock = false
					}
				});
				animation.transition(coverEl, {
					styles: {
						opacity: 1
					},
					delay: 0,
					duration: 250,
					timingFunction: 'ease-in'
				}, (e) => {
					a2End = true;
					if (a1End && a2End) {
						this.animationLock = false
					}
				});
				// #endif
				// #ifndef APP-NVUE
				let _popStyle = ""
				_popStyle += "opacity: 1;transform: scale(1);transform-origin:" + this.transformOrigin + ';'
				_popStyle += "transition-property:transform;transition-timing-function:ease-out;transition-duration:250ms;"
				this.noWeexPopAni = _popStyle
				const that = this
				setTimeout(()=>{
					a1End = true;
					if (a1End && a2End) {
						that.animationLock = false
					}
				}, 260)
				let _coverStyle = ""
				_coverStyle += "opacity:1;transition-property:opacity;transition-timing-function:ease-in;transition-duration:250ms;"
				this.noWeexCoverAni = _coverStyle
				setTimeout(()=>{
					a2End = true;
					if (a1End && a2End) {
						that.animationLock = false
					}
				}, 280)
				// 注意，以上两个并不能保证真的解锁
				// #endif
			},
			mypButtonClicked(index, key) {
				if (this.animationLock) {
					return;
				}
				this.$emit('itemClicked', {
					key,
					index
				});
				this.hideAction();
			},
			/**
			 * 隐藏操作
			 */
			hideAction() {
				if (this.animationLock) {
					return;
				}
				if (this.hasAnimation) {
					this.setAnimationLock()
					// #ifdef APP-NVUE
					const popoverEl = this.$refs['myp-popover'];
					const coverEl = this.$refs['myp-cover'];
					if (!popoverEl || !coverEl) {
						return;
					}
					// #endif
					let a1End = false;
					let a2End = false;
					// #ifdef APP-NVUE
					animation.transition(popoverEl, {
						styles: {
							opacity: 0,
							transform: this.contentTransform,
							transformOrigin: this.transformOrigin
						},
						duration: 250
					}, () => {
						a1End = true;
						if (a1End && a2End) {
							this.show = false;
							this.showIn = false;
							this.animationLock = false
						}
					});
					animation.transition(coverEl, {
						styles: {
							opacity: 0
						},
						duration: 250
					}, () => {
						a2End = true;
						if (a1End && a2End) {
							this.show = false;
							this.showIn = false;
							this.animationLock = false
						}
					});
					// #endif
					// #ifndef APP-NVUE
					// this.noWeexPopAni += 'opacity:0;scale(0);'
					let _popStyle = ""
					_popStyle += "opacity: 0;transform: scale(0);transform-origin:" + this.transformOrigin + ';'
					_popStyle += "transition-property:opacity,transform;transition-timing-function:ease-out;transition-duration:250ms;"
					this.noWeexPopAni = _popStyle
					const that = this
					setTimeout(()=>{
						a1End = true;
						if (a1End && a2End) {
							that.show = false;
							that.showIn = false;
							that.animationLock = false
						}
					}, 260)
					// this.noWeexCoverAni += 'opacity:0;'
					let _coverStyle = ""
					_coverStyle += "opacity:0;transition-property:opacity;transition-timing-function:ease-in;transition-duration:250ms;"
					this.noWeexCoverAni = _coverStyle
					setTimeout(()=>{
						a2End = true;
						if (a1End && a2End) {
							that.show = false;
							that.showIn = false;
							that.animationLock = false
						}
					}, 280)
					// #endif
				} else {
					this.show = false;
					this.showIn = false;
				}
			},
			/**
			 * 设置动画锁
			 */
			setAnimationLock() {
				this.animationLock = true;
			}

		}
	};
</script>

<style lang="scss" scoped>
	@import '../mypui.scss';
	
	.myp-popover {
		&-cover {
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			background-color: $myp-bg-color-mask;
		}
		&-popover {
			position: fixed;
			padding: 15rpx;
		}
		&-arrow {
			position: absolute;
			border-radius: 4rpx;
			width: 30rpx;
			height: 30rpx;
			background-color: #ffffff;
		}
		&-inner {
			border-radius: 10rpx;
			background-color: #ffffff;
		}
		&-item {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-left: 20rpx;
			margin-right: 20rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
			border-bottom-width: 1px;
			border-bottom-color: #dddddd;
			
			&-noborder {
				border-bottom-width: 0;
			}
			
			&-text {
				flex: 1;
				height: 80rpx;
				font-size: 30rpx;
				line-height: 80rpx;
			}
		}
	}
</style>
