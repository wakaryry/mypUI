<template>
	<view>
		<view v-if="position==='left'&&fixIcon" :class="['myp-search', 'myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius, 'myp-height-'+height, 'myp-flex-row', 'myp-align-center']" :style="boxStyle">
			<myp-icon v-if="icon&&icon.length>0" :name="icon" :type="showPlaceholder?placeIconType:iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="'margin-right:'+iconTextSpace+';'"></myp-icon>
			<view :class="['myp-search-fix-full', 'myp-height-'+height]" :style="mrFixBoxStyle">
				<view :class="['myp-search-place', 'myp-flex-row', 'myp-align-center']" :style="placeBoxStyle">
					<text :class="['myp-search-place-text', 'myp-color-'+placeType, 'myp-size-'+placeSize]" :style="placeStyle">{{showPlaceholder?placeholder:''}}</text>
				</view>
				<view :class="['myp-search-input', 'myp-flex-row', 'myp-align-center']" :style="valueBoxStyle">
					<input :disabled="disabled" :value="inputValue" :focus="focus" :adjust-position="adjust" :confirm-type="confirmType" :class="['myp-search-input-input', 'myp-color-'+valueType, 'myp-size-'+valueSize]" :style="valueStyle" @input="toInput" @confirm="toConfirm" @focus="toFocus" @blur="toBlur" @keyboardheightchange="toChangeKb" />
				</view>
			</view>
			<slot name="extra"></slot>
		</view>
		<view v-else :class="['myp-search', 'myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius, 'myp-height-'+height]" :style="mrBoxStyle">
			<view :class="['myp-search-place', 'myp-flex-row', 'myp-align-center', 'myp-search-place-'+position]" :style="mrPlaceBoxStyle">
				<view v-if="showPlaceholder&&icon&&icon.length>0" :style="{'margin-right': iconTextSpace}">
					<myp-icon :name="icon" :type="placeIconType" :size="iconSize" :iconStyle="iconStyle"></myp-icon>
				</view>
				<text :class="['myp-color-'+placeType, 'myp-size-'+placeSize]" :style="placeStyle">{{showPlaceholder?placeholder:''}}</text>
			</view>
			<view :class="['myp-search-input', 'myp-flex-row', 'myp-align-center']" :style="mrValueBoxStyle">
				<input :disabled="disabled" :value="inputValue" :focus="focus" :adjust-position="adjust" :confirm-type="confirmType" :class="['myp-search-input-input', 'myp-search-input-'+position, 'myp-color-'+valueType, 'myp-size-'+valueSize]" :style="valueStyle" @input="toInput" @confirm="toConfirm" @focus="toFocus" @blur="toBlur" @keyboardheightchange="toChangeKb" />
			</view>
			<slot name="extra"></slot>
		</view>
	</view>
</template>

<script>
	import {cssToJs} from '../utils/utils.js'
	
	export default {
		props: {
			/**
			 * 值
			 */
			value: {
				type: [String, Number],
				default: ''
			},
			/**
			 * 图标
			 */
			icon: {
				type: String,
				default: 'search'
			},
			/**
			 * placeholder
			 */
			placeholder: {
				type: String,
				default: "输入内容开始搜索"
			},
			/**
			 * 内容位置：left/center
			 */
			position: {
				type: String,
				default: 'left'
			},
			/**
			 * 是否focus
			 */
			focus: {
				type: Boolean,
				default: false
			},
			/**
			 * 键盘弹出方式：adjust-position
			 */
			adjust: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否禁用
			 */
			disabled: {
				type: Boolean,
				default: false
			},
			/**
			 * confirm-type
			 */
			confirmType: {
				type: String,
				default: 'search'
			},
			/**
			 * 是否固定图标。position为left时可以将icon固定在左侧
			 */
			fixIcon: {
				type: Boolean,
				default: false
			},
			/**
			 * 图标与文字的间距
			 */
			iconTextSpace: {
				type: String,
				default: '12rpx'
			},
			/**
			 * 背景色主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 内容颜色主题
			 */
			valueType: {
				type: String,
				default: 'text'
			},
			/**
			 * placeholder显示时图标的颜色主题
			 */
			placeIconType: {
				type: String,
				default: 'place'
			},
			/**
			 * 图标的颜色主题
			 */
			iconType: {
				type: String,
				default: 'text'
			},
			/**
			 * placeholder的颜色主题
			 */
			placeType: {
				type: String,
				default: 'place'
			},
			/**
			 * 高度主题
			 */
			height: {
				type: String,
				default: 'base'
			},
			/**
			 * 边框主题
			 */
			border: {
				type: String,
				default: 'all'
			},
			/**
			 * 圆角主题
			 */
			radius: {
				type: String,
				default: 'll'
			},
			/**
			 * 左右padding
			 */
			space: {
				type: String,
				default: '32rpx'
			},
			/**
			 * 内容的尺寸主题
			 */
			valueSize: {
				type: String,
				default: ''
			},
			/**
			 * 图标的尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'l'
			},
			/**
			 * placeholder的尺寸主题
			 */
			placeSize: {
				type: String,
				default: ''
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: 'padding-left:32rpx;padding-right:32rpx;'
			},
			/**
			 * 图标样式
			 */
			iconStyle: {
				type: String,
				default: ''
			},
			/**
			 * placeholder的样式
			 */
			placeStyle: {
				type: String,
				default: ''
			},
			/**
			 * 内容的外层样式
			 */
			valueBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 内容的样式
			 */
			valueStyle: {
				type: String,
				default: ''
			},
			/**
			 * placeholder的外层样式
			 */
			placeBoxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				inputValue: this.value
			}
		},
		computed: {
			showPlaceholder() {
				return !this.inputValue || this.inputValue.length === 0
			},
			mrBoxStyle() {
				return `padding-left:${this.space};padding-right:${this.space};` + this.boxStyle
			},
			mrValueBoxStyle() {
				return `padding-left:${this.space};padding-right:${this.space};` + this.valueBoxStyle
			},
			mrPlaceBoxStyle() {
				return `padding-left:${this.space};padding-right:${this.space};` + this.placeBoxStyle
			},
			mrFixBoxStyle() {
				if (this.fixIcon) {
					if (this.boxStyle && this.boxStyle.length >= 10) {
						const cssJs = cssToJs(this.boxStyle)
						if (cssJs.height) {
							return `height:${cssJs.height};`
						}
					}
				}
				return ''
			}
		},
		watch: {
			value(newV) {
				this.inputValue = newV
			}
		},
		methods: {
			toInput(e) {
				this.inputValue = e.detail.value
				this.$emit("input", e.detail.value)
			},
			toConfirm(e) {
				this.$emit("confirm", e.detail.value)
			},
			toFocus(e) {
				this.$emit("focus", e)
			},
			toBlur(e) {
				this.$emit("blur", e)
			},
			toChangeKb(e) {
				this.$emit("keyboardHeightChange", e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-search {
		position: relative;
		
		&-fix {
			&-full {
				flex: 1;
				position: relative;
			}
		}
		&-place {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			
			&-text {
				flex: 1;
			}
			&-left {
				justify-content: flex-start;
			}
			&-center {
				justify-content: center;
			}
		}
		&-input {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			
			&-input {
				flex: 1;
			}
			&-left {
				text-align: left;
			}
			&-center {
				text-align: center;
			}
		}
	}
</style>
