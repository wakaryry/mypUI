<template>
	<view class="myp-one">
		<view v-for="(item, index) in ranges" :key="index" :class="['myp-one-item', mode==='box'&&('myp-border-color-'+(type&&type.length>0?type:'text'))]" :style="mrItemStyle+(index!==ranges.length-1?('margin-right:'+space+';'):'')">
			<view v-if="mode === 'middle' && codeIndex <= item" :class="['myp-bg-'+(type&&type.length>0?type:'text')]" :style="mrMiddleStyle"></view>
			<view v-if="mode === 'bottom'" :class="['myp-bg-'+(type&&type.length>0?type:'text')]" :style="mrBottomStyle"></view>
			<view v-if="secret && codeArr.length >= item" :class="['myp-bg-'+(type&&type.length>0?type:'text')]" :style="mrDotStyle"></view>
			<text v-else :class="['myp-one-item-text', 'myp-color-'+type]" :style="mrTextStyle">{{ codeArr[index] ? codeArr[index] : ''}}</text>
		</view>
		<input type="number" :value="inputValue" :focus="autoFocus" :maxlength="maxlength" class="myp-one-hide-input" :style="{height: width}" @input="getVal" />
	</view>
</template>

<script>
	// v-model or refs or nothing(just @finish)
	export default {
		name: 'mypOneInput',
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
			autoFocus: {
				type: Boolean,
				default: false
			},
			// middle-middle line, bottom-bottom line, box-square box
			mode: {
				type: String,
				default: "middle"
			},
			type: {
				type: String,
				default: ''
			},
			// 这里不使用scss中定义的size系列。直接赋值
			size: {
				type: String,
				default: '70rpx'
			},
			weight: {
				type: [String, Number],
				default: '700'
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
			dotWidth: {
				type: String,
				default: '16rpx'
			},
			lineWidth: {
				type: String,
				default: '80rpx'
			},
			lineHeight: {
				type: String,
				default: '8rpx'
			},
			boxRadius: {
				type: String,
				default: '4rpx'
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
			mrItemStyle() {
				let _style = `width:${this.width};height:${this.width};`
				if (this.mode === 'box') {
					_style += `border-radius:${this.boxRadius};border-width:1px;border-style:solid;`
				}
				return _style
			},
			mrTextStyle() {
				let _style = `font-size:${this.size};line-height:${this.width};weight:${this.weight};`
				return _style
			},
			mrMiddleStyle() {
				const iw = parseInt(this.width)
				let _style = `position:absolute;left:${iw*0.5}rpx;top:${iw*0.5}rpx;height:${this.lineHeight};width:${this.lineWidth};`
				_style += `transform:translate(-50%,-50%);border-radius:${this.boxRadius};`
				return _style
			},
			mrBottomStyle() {
				const iw = parseInt(this.width)
				let _style = `position:absolute;left:${iw*0.5}rpx;bottom:0;height:${this.lineHeight};width:${this.lineWidth};border-radius:${this.boxRadius};`
				_style += `transform:translateX(-50%);`
				return _style
			},
			mrDotStyle() {
				const iw = parseInt(this.width)
				let _style = `position:absolute;left:${iw*0.5}rpx;top:${iw*0.5}rpx;height:${this.dotWidth};width:${this.dotWidth};border-radius:${this.dotWidth};`
				_style += `transform:translate(-50%,-50%);`
				return _style
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
