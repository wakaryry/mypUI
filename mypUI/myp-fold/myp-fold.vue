<template>
	<view id="myp-fold" ref="myp-fold" :class="['myp-border-'+border, 'myp-radius-'+radius]" :style="boxStyle">
		<view :style="headStyle" @tap="toToggleBody">
			<slot name="head"></slot>
		</view>
		<view class="myp-fold-body" id="myp-fold-body" ref="myp-fold-body" :style="bodyStyle+noWeexAni">
			<slot name="body"></slot>
		</view>
	</view>
</template>

<script>
	// animation的transtion中 needLayout (boolean)：动画执行是否影响布局，默认值是false
	// 考虑到低端机器的兼容（打开会卡），使用false，配合style来处理占位问题
	// 
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom');
	const animation = weex.requireModule('animation');
	// #endif
	
	export default {
		props: {
			// 初始状态,是否打开
			isOpen: {
				type: Boolean,
				default: false
			},
			duration: {
				type: Number,
				default: 300
			},
			timingFunction: {
				type: String,
				default: 'ease-in'
			},
			border: {
				type: String,
				default: 'all'
			},
			radius: {
				type: String,
				default: 'base'
			},
			updateTime: {
				type: Number,
				default: 0
			},
			boxStyle: {
				type: String,
				default: ''
			},
			headStyle: {
				type: String,
				default: ''
			},
			bodyStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				opened: this.isOpen,
				// 是否正在打开/收起
				isAnimating: false,
				totalHeight: null,
				bodyHeight: null,
				noWeexAni: ''
			}
		},
		created() {
			// init
			setTimeout(() => {
				this.initOpenState()
			}, 50)
		},
		watch: {
			async updateTime(newV) {
				this.totalHeight = await this.getElHeight('myp-fold')
				this.bodyHeight = await this.getElHeight('myp-fold-body')
			}
		},
		methods: {
			async initOpenState() {
				if (this.totalHeight === null) {
					try{
						this.totalHeight = await this.getElHeight('myp-fold')
					}catch(e){
						//TODO handle the exception
						return
					}
				}
				if (this.bodyHeight === null) {
					try{
						this.bodyHeight = await this.getElHeight('myp-fold-body')
					}catch(e){
						//TODO handle the exception
						return
					}
				}
				// #ifdef APP-NVUE
				const foldEl = this.$refs['myp-fold']
				const bodyEl = this.$refs['myp-fold-body']
				const that = this
				animation.transition(bodyEl, {
					styles: {
						height: this.opened ? this.bodyHeight+'px' : '0px'
					},
					duration: 10,
					delay: 0,
					timingFunction: this.timingFunction
				}, ()=>{
					that.noWeexAni = 'height:0;'
				})
				animation.transition(foldEl, {
					styles: {
						height: this.opened ? this.totalHeight+'px' : (this.totalHeight - this.bodyHeight)+'px'
					},
					duration: 10,
					delay: 0,
					timingFunction: this.timingFunction
				})
				// #endif
				// #ifndef APP-NVUE
				let _style = `transition-property:height;transition-duration:10ms;transition-timing-function:${this.timingFunction};`
				if (this.opened) {
					_style += `height:${this.bodyHeight}px;`
				} else {
					_style += `height:0;`
				}
				this.noWeexAni = _style
				// #endif
			},
			toToggleBody() {
				if (this.isAnimating) {
					return
				}
				this.isAnimating = true
				this.opened = !this.opened
				this.$emit('opening')
				// #ifdef APP-NVUE
				this.weexToggleBody(this.opened)
				// #endif
				// #ifndef APP-NVUE
				this.noWeexToggleBody(this.opened)
				// #endif
			},
			// #ifdef APP-NVUE
			async weexToggleBody(opened) {
				const foldEl = this.$refs['myp-fold']
				const bodyEl = this.$refs['myp-fold-body']
				const that = this
				that.noWeexAni = opened ? `height:${that.bodyHeight}px;` : ''
				animation.transition(bodyEl, {
					styles: {
						height: opened ? this.bodyHeight+'px' : '0px'
					},
					duration: this.duration,
					delay: 0,
					timingFunction: this.timingFunction
				}, () => {
					that.isAnimating = false
					that.$emit("toggle", opened)
					that.noWeexAni = opened ? `height:${that.bodyHeight}px;` : `height:0;`
				})
				animation.transition(foldEl, {
					styles: {
						height: opened ? this.totalHeight+'px' : (this.totalHeight - this.bodyHeight)+'px'
					},
					duration: this.duration,
					delay: 0,
					timingFunction: this.timingFunction
				})
			},
			// #endif
			async noWeexToggleBody(opened) {
				let _style = `transition-property:height;transition-duration:${this.duration}ms;transition-timing-function:${this.timingFunction};`
				if (opened) {
					_style += `height:${this.bodyHeight}px;`
				} else {
					_style += `height:0;`
				}
				this.noWeexAni = _style
				const that = this
				setTimeout(()=>{
					that.isAnimating = false
					that.$emit("toggle", opened)
				}, this.duration)
			},
			getElHeight(name) {
				return new Promise((res, rej) => {
					// #ifdef APP-NVUE
					const bodyEl = this.$refs[name]
					dom.getComponentRect(bodyEl, option => {
						if (option && option.result) {
							res(option.size.height)
						} else {
							rej({})
						}
					})
					// #endif
					// #ifndef APP-NVUE
					const query = uni.createSelectorQuery().in(this);
					query.select('#'+name).boundingClientRect(data => {
					  res(data.height)
					}).exec();
					// #endif
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-fold-body {
		overflow: hidden;
	}
</style>
