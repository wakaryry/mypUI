<template>
	<view ref="myp-dropdown-body" class="myp-drop-body" id="myp-dropdown-body" :style="boxStyle+noWeexAni" @tap.stop.prevent="toPrevent">
		<slot></slot>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom');
	const animation = weex.requireModule('animation');
	// #endif
	
	// 因为body里面的数据很有可能是动态变化的
	// 这个时候高度计算的时机很难把握，因为关闭时高度算出来总是0，而数据的变化可能是随时的
	// 所以我们不再进行高度计算，统一由用户自己配置高度，从外部计算高度
	export default {
		inject: ['mypDropdownRoot'],
		props: {
			// means no need to open and close
			isToken: {
				type: Boolean,
				default: false
			},
			boxStyle: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: '0px'
			}
		},
		data() {
			return {
				index: 0,
				noWeexAni: ''
			}
		},
		// 需要注意，如果我们在它的父组件或者它本身使用了v-if，在app/h5平台会if-true的时候再次created...
		// 要么我们控制children，及时清空children，要么我们不使用v-if，改用translate来控制试图的可见性
		created() {
			if (this.mypDropdownRoot.children) {
				this.index = this.mypDropdownRoot.children.length
				this.mypDropdownRoot.children.push(this)
			}
		},
		computed: {
			// px number
			mrHeight() {
				if (this.height.indexOf('rpx') >= 0) {
					return uni.upx2px(parseInt(this.height))
				}
				return parseInt(this.height)
			}
		},
		methods: {
			toPrevent(e) {
				e.stopPropagation()
			},
			async open(animated=true) {
				// #ifdef APP-NVUE
				const bodyEl = this.$refs['myp-dropdown-body']
				animation.transition(bodyEl, {
					styles: {
						height: `${this.mrHeight}px`
					},
					duration: animated ? this.mypDropdownRoot.duration : 0,
					timingFunction: this.mypDropdownRoot.timingFunction,
					delay: 0
				}, ()=>{
					
				})
				// #endif
				// #ifndef APP-NVUE
				let style = ''
				if (animated) {
					style += `transition-property: height; transition-duration: ${this.mypDropdownRoot.duration}ms; transition-timing-function: ${this.mypDropdownRoot.timingFunction};`
				}
				style += `height:${this.mrHeight}px;`
				this.noWeexAni = style
				// #endif
			},
			close(animated=true, finish=null) {
				const that = this
				// #ifdef APP-NVUE
				const bodyEl = this.$refs['myp-dropdown-body']
				animation.transition(bodyEl, {
					styles: {
						height: '0'
					},
					duration: animated ? this.mypDropdownRoot.duration : 0,
					timingFunction: this.mypDropdownRoot.timingFunction,
					delay: 0
				}, ()=>{
					finish && finish()
				})
				// #endif
				// #ifndef APP-NVUE
				let style = ''
				if (animated) {
					style += `transition-property: height; transition-duration: ${this.mypDropdownRoot.duration}ms; transition-timing-function: ${this.mypDropdownRoot.timingFunction};`
				}
				style += 'height:0;'
				this.noWeexAni = style
				const dura = animated ? this.mypDropdownRoot.duration + 10 : 10
				setTimeout(()=>{
					finish && finish()
				}, dura)
				// #endif
			},
			getElHeight() {
				return new Promise((res, rej) => {
					// #ifdef APP-NVUE
					const bodyEl = this.$refs['myp-dropdown-body']
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
					query.select('#myp-dropdown-body').boundingClientRect(data => {
					  res(data.height)
					}).exec();
					// #endif
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-drop {
		&-body {
			overflow: hidden;
			/* #ifdef APP-NVUE */
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			/* #endif */
		}
	}
</style>
