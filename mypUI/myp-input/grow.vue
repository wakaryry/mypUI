<template>
	<view :class="['myp-message', 'myp-bg-'+bgType]" :style="mrBoxStyle">
		<view class="myp-message-left">
			<slot name="left">
				<view v-for="(item, idx) in lefts" :key="idx">
					<text>{{item}}</text>
				</view>
			</slot>
		</view>
		<textarea ref="myp-grow" :maxlength="maxlength" :value="inputValue" :class="['myp-message-input', 'myp-bg-'+inputBgType, 'myp-radius-'+inputRadius, 'myp-color-'+inputType, 'myp-size-'+inputSize]" @input="handleInput" @linechange="handleLineChange" :style="mrInputStyle"></textarea>
		<view class="myp-message-right">
			<slot name="right">
				<view v-for="(item, idx) in rights" :key="idx">
					<text>{{item}}</text>
				</view>
			</slot>
		</view>
		<!-- #ifdef APP-NVUE -->
		<view class="myp-message-hidden">
			<text ref="myp-grow-hidden" :class="['myp-color-'+inputType, 'myp-size-'+inputSize]" :style="mrHiddenStyle">{{inputValue}}</text>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	// 仿微信聊天输入框，可以自由grow以及限定高度的输入框
	
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom');
	// const animation = weex.requireModule('animation');
	// #endif
	
	export default {
		props: {
			maxLines: {
				type: Number,
				default: 5
			},
			// rpx. 在app端不生效
			lineHeight: {
				type: Number,
				default: 46
			},
			// rpx 0/2/3/4 length
			inputPadding: {
				type: Array,
				default: () => {
					// top/right/bottom/left, top-bottom/left-right, top/bottom/left-right top-bottom-left-right
					return [8, 8, 8, 8]
				}
			},
			value: {
				type: [String, Number],
				default: ''
			},
			lefts: {
				type: Array,
				default: ()=>{
					return []
				}
			},
			rights: {
				type: Array,
				default: ()=>{
					return []
				}
			},
			maxlength: {
				type: Number,
				default: 140
			},
			// vertical-align: flex-start/center/flex-end
			align: {
				type: String,
				default: 'flex-end'
			},
			bgType: {
				type: String,
				default: 'inverse'
			},
			inputBgType: {
				type: String,
				default: 'bg'
			},
			inputRadius: {
				type: String,
				default: 'll'
			},
			inputType: {
				type: String,
				default: ''
			},
			inputSize: {
				type: String,
				default: ''
			},
			boxStyle: {
				type: String,
				default: ''
			},
			// 不要在这里设置line-height 设置也会无效
			// 且设置之后会对app端高度计算有影响，因为app暂时不支持line-height
			inputStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				inputValue: '',
				inputHeight: 0,
				growEl: null,
				growWidth: uni.upx2px(560),
				hiddenEl: null
			}
		},
		created() {
			this.inputHeight = this.minHeightPx
		},
		computed: {
			// top/right/bottom/left
			mrInputPadding() {
				if (!this.inputPadding || this.inputPadding.length === 0) {
					return [0, 0, 0, 0]
				}
				if (this.inputPadding.length === 1) {
					const i = this.inputPadding[0]
					return [i, i, i, i]
				}
				if (this.inputPadding.length === 2) {
					const i = this.inputPadding[0]
					const j = this.inputPadding[1]
					return [i, j, i, j]
				}
				if (this.inputPadding.length === 3) {
					return [this.inputPadding[0], this.inputPadding[1], this.inputPadding[2], this.inputPadding[1]]
				}
				return this.inputPadding
			},
			lineHeightPx() {
				return uni.upx2px(this.lineHeight)
			},
			minHeight() {
				return this.lineHeight + this.mrInputPadding[0] + this.mrInputPadding[2]
			},
			minHeightPx() {
				return uni.upx2px(this.minHeight)
			},
			maxHeight() {
				if (this.maxLines > 1) {
					return this.minHeight + (this.maxLines - 1) * this.lineHeight
				}
				return this.minHeight
			},
			maxHeightPx() {
				return uni.upx2px(this.maxHeight)
			},
			mrInputStyle() {
				let _style = this.inputStyle || ''
				// !important: 必须设置 line-height：否则无法获得e.detail.lineCount
				// 不过app端暂时不支持line-height设置
				_style += `line-height:${this.lineHeight}rpx;`
				_style += `padding-top:${this.mrInputPadding[0]}rpx;padding-right:${this.mrInputPadding[1]}rpx;padding-bottom:${this.mrInputPadding[2]}rpx;padding-left:${this.mrInputPadding[3]}rpx;`
				return _style + `height:${this.inputHeight}px;`
			},
			mrHiddenStyle() {
				let _style = this.inputStyle || ''
				// app端暂时不支持line-height设置
				// _style += `line-height:${this.lineHeight}rpx;`
				_style += `padding-top:${this.mrInputPadding[0]}rpx;padding-right:${this.mrInputPadding[1]}rpx;padding-bottom:${this.mrInputPadding[2]}rpx;padding-left:${this.mrInputPadding[3]}rpx;`
				_style += `width:${this.growWidth}px;`
				return _style + `lines:${this.maxLines};`
			},
			mrBoxStyle() {
				let _style = this.boxStyle
				if (this.align && this.align.length > 0) {
					_style += `align-items:${this.align};`
				}
				return _style
			}
		},
		watch: {
			// 允许外部设置value
			value: {
				immediate: true,
				handler(newV) {
					if (newV !== this.inputValue) {
						this.inputValue = newV
					}
				}
			}
		},
		created() {
			// #ifdef APP-NVUE
			setTimeout(()=>{
				this.toCalculateInputHeight()
			}, 0)
			// #endif
		},
		methods: {
			handleInput(e) {
				//console.log('inputing')
				this.inputValue = e.detail.value
				this.$emit("input", this.inputValue)
				// #ifdef APP-NVUE
				const that = this
				// 确保渲染
				this.$forceUpdate()
				this.toCalculateInputHeight()
				// this.toCalculateInputHeight()
				// #endif
			},
			handleLineChange(e) {
				// only works in mp/h5
				let line = e.detail.lineCount
				if (line >= this.maxLines) {
					line = this.maxLines
				}
				if (line > 1) {
					this.inputHeight = this.minHeightPx + this.lineHeightPx * (line - 1)
				} else {
					this.inputHeight = this.minHeightPx
				}
			},
			// #ifdef APP-NVUE
			toCalculateInputHeight() {
				// to update hidden width
				this.updateHiddenWidth()
				const that = this
				if (!this.hiddenEl) {
					this.hiddenEl = this.$refs['myp-grow-hidden']
				}
				// 确保拿到真实的尺寸
				setTimeout(()=>{
					dom.getComponentRect(that.hiddenEl, (res) => {
						that.toChangeHeight(res.size.height)
					})
				}, 0)
			},
			toChangeHeight(hgt) {
				if (!this.inputValue || (this.inputValue+'').length === 0) {
					this.inputHeight = this.minHeightPx
					return
				}
				if (hgt >= this.maxHeightPx) {
					this.inputHeight = this.maxHeightPx
				} else if (hgt <= this.minHeightPx) {
					this.inputHeight = this.minHeightPx
				} else {
					// we could also correct the height into just padding + lines-height
					this.inputHeight = hgt
				}
			},
			updateHiddenWidth() {
				if (!this.growEl) {
					this.growEl = this.$refs['myp-grow']
				}
				const that = this
				setTimeout(()=>{
					dom.getComponentRect(that.growEl, (res) => {
						that.growWidth = res.size.width
					})
				}, 0)
			}
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	@import '../base.scss';
	.myp-message {
		flex-direction: row;
		&-left {
			flex-direction: row;
			flex-wrap: nowrap;
		}
		&-input {
			flex: 1;
		}
		&-right {
			flex-direction: row;
			flex-wrap: nowrap;
		}
		&-hidden {
			position: fixed;
			top: -3000rpx;
			left: -1500rpx;
		}
	}
</style>
