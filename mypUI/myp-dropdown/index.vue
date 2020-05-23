<template>
	<view class="myp-drop">
		<view ref="myp-drop-head" id="myp-drop-head" class="myp-drop-head">
			<slot name="head"></slot>
		</view>
		<view ref="myp-drop-body" class="myp-drop-body" :style="mrTopStyle+mrMaskStyle" @tap.stop.prevent="maskClicked">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	// drop-down 仅仅只是一个壳子
	// 必须配合body.vue来实现
	
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom');
	const animation = weex.requireModule('animation');
	// #endif
	
	export default {
		props: {
			// current tab/filter. default is -1, which means none-selected
			value: {
				type: Number,
				default: -1
			},
			duration: {
				type: Number,
				default: 300
			},
			timingFunction: {
				type: String,
				default: 'ease-out'
			},
			maskBg: {
				type: String,
				default: ''
			},
			autoClose: {
				type: Boolean,
				default: true
			}
		},
		provide() {
			return {
				mypDropdownRoot: this
			}
		},
		data() {
			return {
				top: 0,
				current: this.value,
				bodyVisible: true,
				opened: false
			}
		},
		// created 的顺序是先父组件，然后子组件
		created() {
			this.children = []
			this.finished = [] // closed
			if (this.current >= 0) {
				this.opened = true
			}
			setTimeout(()=>{
				this.initTop()
			}, 50)
		},
		mounted() {
			// 初始化打开/关闭状态
			const that = this
			setTimeout(()=>{
				if (that.current >=0) {
					that.open(that.current)
				} else {
					that.close()
				}
			}, 50)
		},
		computed: {
			mrTopStyle() {
				return `top:${this.top}px;`
			},
			mrMaskStyle() {
				let style = ''
				if (this.maskBg && this.maskBg.length > 1) {
					style += `background-color:${this.maskBg};`
				}
				// #ifndef APP-NVUE
				if (this.bodyVisible) {
					style += `top:${this.top}px; left: 0; bottom: 0; right: 0;`
				} else {
					// remove the mask from screen, we do not use v-if to control the visible
					style += 'top: -9000px; left: -7500rpx; right: 6750rpx; bottom: 6000rpx;'
				}
				// #endif
				return style
			}
		},
		watch: {
			bodyVisible(newV) {
				// #ifdef APP-NVUE
				this.toggleBodyVisible(newV)
				// #endif
			}
		},
		methods: {
			async initTop() {
				try{
					this.top = await this.getElBottom()
				}catch(e){
					//TODO handle the exception
					return
				}
			},
			open(i) {
				this.current = i
				this.finished = []
				const theItem = this.children[i]
				if (!theItem.isToken) {
					this.bodyVisible = true
				}
				// console.log(this.current)
				const that = this
				this.children.forEach(item => {
					if (i === item.index) {
						if (item.isToken) {
							that.opened = false
							item.close(true, ()=>{
								that.closeMask(item.index)
							})
						} else {
							that.opened = true
							item.open()
						}
					} else {
						item.close(true, ()=>{
							that.closeMask(item.index)
						})
					}
				})
			},
			close() {
				this.finished = []
				this.opened = false
				const that = this
				this.children.forEach(item => {
					item.close(true, ()=>{
						that.closeMask(item.index)
					})
				})
			},
			maskClicked(e) {
				this.$emit("maskClicked")
				if (this.autoClose) {
					this.close()
				}
				e.stopPropagation()
			},
			closeMask(i) {
				this.finished.push(i)
				// hide mask
				if (this.finished.length >= this.children.length) {
					this.bodyVisible = false
				}
			},
			// #ifdef APP-NVUE
			toggleBodyVisible(visible) {
				const bodyEl = this.$refs['myp-drop-body']
				animation.transition(bodyEl, {
					styles: {
						transform: visible ? 'translate(0%,0%)' : 'translate(-200%, -200%)'
					},
					duration: 0
				})
			},
			// #endif
			getElBottom() {
				return new Promise((res, rej) => {
					// #ifdef APP-NVUE
					const headEl = this.$refs['myp-drop-head']
					dom.getComponentRect(headEl, option => {
						if (option && option.result) {
							res(option.size.bottom)
						} else {
							rej({})
						}
					})
					// #endif
					// #ifndef APP-NVUE
					const query = uni.createSelectorQuery().in(this);
					query.select('#myp-drop-head').boundingClientRect(data => {
					  if (data) {
					  	res(data.bottom)
					  } else {
					  	rej({})
					  }
					}).exec();
					// #endif
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../base.scss';
	
	.myp-drop {
		&-head {
			
		}
		
		&-body {
			// fixed 在app默认在上层
			// 因为app中z-index无效，不能使用absolute
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: $myp-bg-color-mask;
			// 兼容mp/h5
			z-index: 100;
		}
	}
</style>
