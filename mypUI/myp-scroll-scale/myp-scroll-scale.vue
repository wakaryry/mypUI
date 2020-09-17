<template>
	<scroll-view ref="myp-scroll-banner" class="myp-banner" :scroll-with-animation="true" :scroll-left="toLeft" :scroll-x="true" :show-scrollbar="false" :pagingEnabled="pagingEnabled" @scrollend="ended" :style="mrBoxStyle">
		<slot></slot>
	</scroll-view>
</template>

<script>
	// 
	// 可切换的swiper/banner/...
	// 仅用于app-nvue，其它请直接用swiper
	// 主要是为了实现无限滚动(不循环)，采用scroll，因为无法设置paging的宽度，不适合开启pagingEnabled
	// 事实上，pagingEnabled的可以不用scroll来做，我们也实现了一份不用scroll的banner
	// 
	// 常见用法：滚动，停止后自动居中；设置左右偏移量，中心点不一定在中间，停止后自动停靠在所谓的中心点；设置左右偏移量以及各个item之间的间距；
	// 对应：居中放大的；最左侧距离与items间距不想等的；
	// 
	
	const bindingX = uni.requireNativePlugin('bindingx');
	
	export default {
		provide() {
			return {
				mypBannerRoot: this
			}
		},
		props: {
			// rpx-scroll的宽度
			width: {
				type: Number,
				default: 750
			},
			// rpx-scroll的高度
			height: {
				type: Number,
				default: 360
			},
			// item的宽度
			widthScale: {
				type: Number,
				default: 0.7
			},
			// item的高度
			heightScale: {
				type: Number,
				default: 0.8
			},
			// 是否允许分页
			// 注意这个paging无法设置每一次滚动的宽度（默认每一次都是scroll的宽度）
			pagingEnabled: {
				type: Boolean,
				default: false
			},
			// 滚动时每一个item的scale影响因子
			// 必须大于0，建议设置成0.5左右，根据需要自己修正，
			// 影响最大移动距离，默认是0.5.也就是scale在√2/2-1-√2/2之间
			// 值越大，scale越靠近1，区间越小；
			// TODO: 低于0.5的时候item的初始化大小没有变
			scaleFactor: {
				type: Number,
				default: 0.5
			},
			// 允许为每一个item设置背景色/背景图片
			// 控制其opacity
			bgs: {
				type: Array,
				default: ()=>{
					return []
				}
			},
			// 是否开启space，不开启就是默认的居中放大模式
			// 开启之后将使用以下的各个space,item的width不会scale,始终设为1
			usingSpace: {
				type: Boolean,
				default: false
			},
			// rpx
			firstSpace: {
				type: Number,
				default: 0
			},
			// rpx
			lastSpace: {
				type: Number,
				default: 0
			},
			boxStyle: {
				type: String,
				default: ''
			},
			itemStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				current: 0,
				toLeft: 0
			}
		},
		computed: {
			mrBoxStyle() {
				return this.boxStyle + `width:${this.width}rpx;height:${this.height}rpx;`
			},
			widthPx() {
				return uni.upx2px(this.width)
			},
			// 最大移动距离，计算范围是移动出屏幕前的距离
			// 实际上 maxApart 决定了scale的范围
			// 因为每一个item距离屏幕中线的距离是有限的
			maxApart() {
				return (this.width + this.itemWidth) * (this.scaleFactor > 0 ? this.scaleFactor : 0.5)
			},
			maxApartPx() {
				return uni.upx2px(this.maxApart)
			},
			itemWidth() {
				return this.width * this.widthScale
			},
			itemWidthPx() {
				return uni.upx2px(this.itemWidth)
			},
			itemHeight() {
				return this.height * this.heightScale
			},
			itemHeightPx() {
				return uni.upx2px(this.itemHeight)
			},
			firstMargin() {
				// 为第一个元素增加margin
				const w = this.width * (1- this.widthScale) * 0.5
				return `margin-left:${w}rpx;`
			},
			lastMargin() {
				// 为最后一个元素增加margin
				const w = this.width * (1- this.widthScale) * 0.5
				return `margin-right:${w}rpx;`
			},
			mrItemStyle() {
				return this.itemStyle + `width:${this.itemWidth}rpx;height:${this.itemHeight}rpx;`
			}
		},
		created() {
			this.children = []
		},
		mounted() {
			// 初始化排版，mounted时子组件已经准备完毕
			this.length = this.children.length
			this.initLayout()
			const that = this
			setTimeout(()=>{
				that.bindScroll()
			}, 50)
			setTimeout(()=>{
				// 初始化排版
				that.toLeft = 1
			}, 60)
		},
		methods: {
			ended(e) {
				const scrollX = e.detail.contentOffset.x
				this.toCenterItem(scrollX)
			},
			initLayout() {
				for (const i in this.children) {
					const _child = this.children[i]
					_child.initLayout()
				}
			},
			// we must bind it in parent
			// 不然，一个个绑定的时候后面的会覆盖掉前面的
			bindScroll() {
				const _props = []
				for (const i in this.children) {
					const _child = this.children[i]
					_props.push({
						element: _child.$refs['myp-banner-item'].ref,
						property: 'transform.scale', //动画属性
						expression: `abs((${this.width * 0.5 + _child.index * this.itemWidth} - (x + ${this.width * 0.5})) / ${this.maxApart}) > 1 ? (${this.widthScale},${this.heightScale}) : abs(cos(abs((${this.width * 0.5 + _child.index * this.itemWidth} - (x + ${this.width * 0.5})) / ${this.maxApart})*(3.14/4)))`
					})
				}
				const bind = bindingX.bind({
				    eventType:'scroll',
				    anchor: this.$refs['myp-scroll-banner'].ref,
				    props: _props
				}, (state)=>{
				    // console.log(state)
				})
				this.bindToken = bind.token
			},
			toCenterItem(scrollX) {
				const number = Math.round(scrollX / this.itemWidthPx)
				const oldLeft = this.toLeft
				const newLeft = number * this.itemWidthPx
				// 很小时允许不滚动，防止抖动
				if (Math.abs(newLeft - scrollX) <= 2) {
					return
				}
				if (oldLeft !== newLeft) {
					this.toLeft = newLeft
					return
				}
				// 相等的时候设置不会引起滚动,需要特殊处理
				if (oldLeft === newLeft) {
					this.toLeft = 0;
					this.toLeft = newLeft + 1;
					// Tag:
					// 中间不断滑动又停止又滑动，快速动作时会引起死循环，一直在end
					// 突然停住的时候会死循环
					// solve the bug via a timeout
					setTimeout(()=>{
						this.toLeft = newLeft
					})
				}
			}
		},
		beforeDestroy() {
			if (this.bindToken !== 0) {
				bindingX.unbind({
						eventType: 'scroll',
						token: this.bindToken
					});
				this.bindToken = 0;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-banner {
		flex-direction: row;
		align-items: center;
	}
</style>
