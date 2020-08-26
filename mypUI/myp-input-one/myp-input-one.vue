<template>
	<view class="myp-one" :style="boxStyle">
		<view v-for="(item, index) in ranges" :key="index" class="myp-one-item" :style="mrItemStyle+(codeArr.length+1 === item?activeItemStyle:'')+(index!==ranges.length-1?('margin-right:'+space+';'):'')">
			<view v-if="mode === 'middle' && codeIndex <= item" :style="mrMiddleStyle"></view>
			<view v-if="mode === 'bottom'" :style="mrBottomStyle+(codeArr.length+1 === item?activeLineStyle:'')"></view>
			<view v-if="mode==='box' && codeArr.length+1 === item" class="myp-one-cursor" :style="mrCursorStyle"></view>
			<view v-if="secret && codeArr.length >= item" :style="mrDotStyle"></view>
			<text v-else class="myp-one-item-text" :style="'line-height:'+width+';'+valueStyle">{{ codeArr[index] ? codeArr[index] : ''}}</text>
		</view>
		<input type="number" :value="inputValue" :focus="focus" :maxlength="maxlength" class="myp-one-hide-input" :style="{height: width}" @input="getVal" />
	</view>
</template>

<script>
	// v-model or refs or nothing(just @finish)
	export default {
		props: {
			value: {
				type: String,
				default: ''
			},
			// 4/5/6
			maxlength: {
				type: Number,
				default: 4
			},
			secret: {
				type: Boolean,
				default: false
			},
			cursor: {
				type: Boolean,
				default: false
			},
			focus: {
				type: Boolean,
				default: false
			},
			// middle-middle line, bottom-bottom line, box-square box
			mode: {
				type: String,
				default: "middle"
			},
			// height/width相等，且不是scss中定义的系列。直接赋值
			width: {
				type: String,
				default: '100rpx'
			},
			space: {
				type: String,
				default: '12rpx'
			},
			dotStyle: {
				type: String,
				default: 'width:16rpx;height:16rpx;border-radius:16rpx;background-color:#000000;'
			},
			lineStyle: {
				type: String,
				default: 'width:80rpx;height:8rpx;border-radius:12rpx;background-color:#000000;'
			},
			activeLineStyle: {
				type: String,
				default: ''
			},
			cursorStyle: {
				type: String,
				default: 'width:1px;height:42rpx;background-color:#8F9CFF;'
			},
			valueStyle: {
				type: String,
				default: 'font-size:70rpx;font-weight:700;color:#000000;'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			itemStyle: {
				type: String,
				default: ''
			},
			activeItemStyle: {
				type: String,
				default: ''
			}
		},
		watch: {
			maxlength: {
				immediate: true,
				handler: function(newV) {
					let _ranges = []
					for (let i = 1; i <= newV; i++) {
						_ranges.push(i)
					}
					this.ranges = _ranges
				}
			},
			value: {
				immediate: true,
				handler: function(newV) {
					if (newV !== this.inputValue) {
						this.inputValue = newV
						this.toMakeAndCheck(newV)
					}
				}
			}
		},
		data() {
			return {
				inputValue: '',
				codeIndex: 1,
				codeArr: [],
				ranges: []
			}
		},
		computed: {
			widthUnit() {
				if (this.width.indexOf('rpx') >= 0 || this.width.indexOf('upx') >= 0) {
					return 'rpx'
				}
				return 'px'
			},
			mrItemStyle() {
				let _style = `width:${this.width};height:${this.width};`
				if (this.mode === 'box') {
					_style += `border-radius:0;border-width:1px;border-style:solid;border-color:#000000;`
				}
				return _style + this.itemStyle
			},
			mrCursorStyle() {
				const iw = parseInt(this.width)
				const _style = `left:${iw*0.5}${this.widthUnit};top:${iw*0.5}${this.widthUnit};`
				return _style + this.cursorStyle
			},
			mrMiddleStyle() {
				const iw = parseInt(this.width)
				let _style = `position:absolute;left:${iw*0.5}${this.widthUnit};top:${iw*0.5}${this.widthUnit};`
				_style += `transform:translate(-50%,-50%);`
				return _style + this.lineStyle
			},
			mrBottomStyle() {
				const iw = parseInt(this.width)
				let _style = `position:absolute;left:${iw*0.5}${this.widthUnit};bottom:0;`
				_style += `transform:translateX(-50%);`
				return _style + this.lineStyle
			},
			mrDotStyle() {
				const iw = parseInt(this.width)
				let _style = `position:absolute;left:${iw*0.5}${this.widthUnit};top:${iw*0.5}${this.widthUnit};`
				_style += `transform:translate(-50%,-50%);`
				return _style + this.dotStyle
			}
		},
		methods: {
			getVal(e) {
				const val = e.detail.value
				this.inputValue = val
				this.$emit('input', val)
				this.toMakeAndCheck(val)
			},
			toMakeAndCheck(val) {
				const arr = val.split('')
				this.codeIndex = arr.length + 1
				this.codeArr = arr
				if (this.codeIndex > Number(this.maxlength)) {
					this.$emit('finish', this.codeArr.join(''))
				}
			},
			// refs 时不再提供 v-model 支持
			// 支持使用refs来设置value
			// 没有提供数据保护与检测，自己在外面对数据进行检测保护
			set(val) {
				this.inputValue = val
				this.toMakeAndCheck(val)
			},
			// 支持使用refs来清空
			clear() {
				this.inputValue = ''
				this.codeArr = []
				this.codeIndex = 1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-one {
		flex-direction: row;
		justify-content: center;
		position: relative;
		
		&-cursor {
			position: absolute;
			transform: translate(-50%, -50%);
			/* #ifndef APP-NVUE */
			animation: shaking 1s infinite ease;
			/* #endif */
		}
		/* #ifndef APP-NVUE */
		@keyframes shaking {
			0% {
				opacity: 0.2;
			}
			50% {
				opacity: 0.5;
			}
			100% {
				opacity: 0.2;
			}
		}
		/* #endif */
		&-hide-input {
			position: absolute;
			top: 0;
			left: -750rpx;
			width: 1500rpx;
			text-align: left;
			opacity: 1;
			background-color: transparent;
		}
		&-item {
			position: relative;

			&-text {
				text-align: center;
			}
		}
	}
</style>
