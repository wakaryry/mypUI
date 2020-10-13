<template>
	<view :class="['myp-flex-row', 'myp-align-center', 'myp-wrap-nowrap', 'myp-bg-'+bgType, 'myp-height-'+height, 'myp-border-'+border, 'myp-radius-'+radius]" :hover-class="'myp-hover-'+hover" :style="boxStyle" @tap.stop="toSelect">
		<myp-icon v-if="icon&&icon.length>0" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="'margin-right:'+space+';'+iconBoxStyle" @iconClicked="toSelect"></myp-icon>
		<slot name="label">
			<text v-if="label&&label.length>0" :class="['myp-color-'+labelType, 'myp-size-'+labelSize]" :style="'margin-right:'+space+';'+labelStyle">{{label}}</text>
		</slot>
		<text v-if="shouldShowPlace" :class="['myp-lines-one', 'myp-color-'+placeType, 'myp-size-'+placeSize]" :style="'text-align:'+valueAlign+';'+placeStyle">{{placeholder}}</text>
		<text v-else :class="['myp-lines-one', 'myp-color-'+valueType, 'myp-size-'+valueSize]" :style="'text-align:'+valueAlign+';'+valueStyle">{{value}}</text>
		<slot name="extra"></slot>
		<myp-icon v-if="indicator&&indicator.length>0" :name="indicator" :type="indicatorType" :size="indicatorSize" :iconStyle="indicatorStyle" :boxStyle="'margin-left:'+space+';'+indicatorBoxStyle" @iconClicked="toSelect"></myp-icon>
	</view>
</template>

<script>
	export default {
		props: {
			/**
			 * 左侧图标
			 */
			icon: {
				type: String,
				default: ''
			},
			/**
			 * 标签
			 */
			label: {
				type: String,
				default: ""
			},
			/**
			 * 值
			 */
			value: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标
			 */
			indicator: {
				type: String,
				default: ''
			},
			/**
			 * 高度主题
			 */
			height: {
				type: String,
				default: "l"
			},
			/**
			 * 边框主题
			 */
			border: {
				type: String,
				default: 'none'
			},
			/**
			 * 圆角主题
			 */
			radius: {
				type: String,
				default: 'none'
			},
			/**
			 * placeholder
			 */
			placeholder: {
				type: String,
				default: "请选择"
			},
			/**
			 * 内容排版方式
			 */
			valueAlign: {
				type: String,
				default: "right"
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 左侧图标颜色主题
			 */
			iconType: {
				type: String,
				default: ''
			},
			/**
			 * 左侧图标尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'l'
			},
			/**
			 * 内容颜色主题
			 */
			valueType: {
				type: String,
				default: ''
			},
			/**
			 * 内容尺寸主题
			 */
			valueSize: {
				type: String,
				default: ""
			},
			/**
			 * 标签颜色主题
			 */
			labelType: {
				type: String,
				default: ''
			},
			/**
			 * 标签尺寸主题
			 */
			labelSize: {
				type: String,
				default: ''
			},
			/**
			 * 占位颜色主题
			 */
			placeType: {
				type: String,
				default: 'place'
			},
			/**
			 * 占位尺寸主题
			 */
			placeSize: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标颜色主题
			 */
			indicatorType: {
				type: String,
				default: 'third'
			},
			/**
			 * 右侧图标尺寸主题
			 */
			indicatorSize: {
				type: String,
				default: 'l'
			},
			/**
			 * 各元素间距
			 */
			space: {
				type: String,
				default: '12rpx'
			},
			/**
			 * hover主题
			 */
			hover: {
				type: String,
				default: 'bg'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 标签样式
			 */
			labelStyle: {
				type: String,
				default: ''
			},
			/**
			 * 内容样式。默认铺满
			 */
			valueStyle: {
				type: String,
				default: 'flex:1;'
			},
			/**
			 * 占位内容样式
			 */
			placeStyle: {
				type: String,
				default: 'flex:1;'
			},
			/**
			 * 右侧图标样式
			 */
			indicatorStyle: {
				type: String,
				default: ''
			},
			/**
			 * 左侧图标外层样式
			 */
			iconBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标外层样式
			 */
			indicatorBoxStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			shouldShowPlace() {
				if (!this.value || (this.value+'').trim().length === 0) {
					return true
				}
				return false
			}
		},
		methods: {
			toSelect(e) {
				e.stopPropagation && e.stopPropagation()
				this.$emit("selectClicked")
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
