<template>
	<view :class="['myp-sl', 'myp-bg-'+bgType, 'myp-height-'+height, 'myp-border-'+border, 'myp-radius-'+radius]" :hover-class="'myp-hover-'+hover" :style="boxStyle" @tap="toSelect">
		<view v-if="icon&&icon.length>0" :style="{'margin-right': space}">
			<myp-icon :name="icon" :type="mrIconType" :size="iconSize" :iconStyle="iconStyle"></myp-icon>
		</view>
		<slot name="label">
			<text v-if="label&&label.length>0" :class="['myp-color-'+mrLabelType, 'myp-size-'+labelSize]" :style="mrLabelStyle">{{label||''}}</text>
		</slot>
		<text v-if="shouldShowPlace" :class="['myp-sl-value', 'myp-color-'+mrPlaceType, 'myp-size-'+placeSize]" :style="mrPlaceStyle">{{placeholder||''}}</text>
		<text v-else :class="['myp-sl-value', 'myp-color-'+mrValueType, 'myp-size-'+valueSize]" :style="mrValueStyle">{{value||''}}</text>
		<slot name="extra"></slot>
		<view v-if="indicator&&indicator.length>0" :style="{'margin-left': space}">
			<myp-icon :name="indicator" :type="mrIndicatorType" :size="indicatorSize" :iconStyle="indicatorStyle"></myp-icon>
		</view>
	</view>
</template>

<script>
	// 全部可以自定义颜色和尺寸，不再局限于背景色主题
	import mypIcon from '@/mypUI/myp-icon/index.vue'
	export default {
		components: {
			mypIcon
		},
		props: {
			icon: {
				type: String,
				default: ''
			},
			label: {
				type: String,
				default: ""
			},
			value: {
				type: String,
				default: ''
			},
			indicator: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: "l"
			},
			border: {
				type: String,
				default: 'none'
			},
			radius: {
				type: String,
				default: 'none'
			},
			placeholder: {
				type: String,
				default: "请选择"
			},
			valueAlign: {
				type: String,
				default: "right"
			},
			bgType: {
				type: String,
				default: ''
			},
			iconType: {
				type: String,
				default: ''
			},
			iconSize: {
				type: String,
				default: 'l'
			},
			valueType: {
				type: String,
				default: ''
			},
			valueSize: {
				type: String,
				default: ""
			},
			labelType: {
				type: String,
				default: ''
			},
			labelSize: {
				type: String,
				default: ''
			},
			placeType: {
				type: String,
				default: 'place'
			},
			placeSize: {
				type: String,
				default: ''
			},
			indicatorType: {
				type: String,
				default: 'third'
			},
			indicatorSize: {
				type: String,
				default: 'l'
			},
			space: {
				type: String,
				default: '12rpx'
			},
			hover: {
				type: String,
				default: 'bg'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			labelStyle: {
				type: String,
				default: ''
			},
			// 默认铺满
			valueStyle: {
				type: String,
				default: 'flex:1;'
			},
			placeStyle: {
				type: String,
				default: 'flex:1;'
			},
			indicatorStyle: {
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
			},
			mrIconType() {
				if (this.iconType && this.iconType.length > 0) {
					return this.iconType
				}
				return this.bgType&&this.bgType.length>0 ? 'inverse':''
			},
			mrLabelType() {
				if (this.labelType && this.labelType.length > 0) {
					return this.labelType
				}
				return this.bgType&&this.bgType.length>0 ? 'inverse':''
			},
			mrLabelStyle() {
				let _style = `margin-right:${this.space};`
				return _style + this.labelStyle
			},
			mrValueType() {
				if (this.valueType && this.valueType.length > 0) {
					return this.valueType
				}
				return this.bgType&&this.bgType.length>0 ? 'inverse':''
			},
			mrPlaceType() {
				if (this.placeType && this.placeType.length > 0) {
					return this.placeType
				}
				return this.bgType&&this.bgType.length>0 ? 'inverse':'place'
			},
			mrIndicatorType() {
				if (this.indicatorType&&this.indicatorType.length>0) {
					return this.indicatorType
				}
				return this.bgType&&this.bgType.length>0 ? 'inverse':''
			},
			mrPlaceStyle() {
				return `text-align:${this.valueAlign};` + this.placeStyle
			},
			mrValueStyle() {
				return `text-align:${this.valueAlign};` + this.valueStyle
			}
		},
		methods: {
			toSelect() {
				this.$emit("selected")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../base.scss';
	.myp-sl {
		flex-direction: row;
		align-items: center;
		
		&-value {
			//flex: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			/* #ifdef APP-NVUE */
			lines: 1;
			/* #endif */
			/* #ifndef APP-NVUE */
			white-space: nowrap;
			/* #endif */
		}
	}
</style>
