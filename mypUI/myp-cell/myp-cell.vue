<template>
	<view :class="['myp-cell', 'myp-bg-'+bgType, 'myp-height-'+height, 'myp-radius-'+radius, 'myp-border-'+border]" :style="boxStyle" :hover-class="'myp-hover-'+hover" @tap.stop="toSelect">
		<view v-if="icon && icon.length > 0" :style="{'margin-right': space}">
			<myp-icon :name="icon" :type="mrIconType" :size="iconSize" :mode="iconMode" :iconStyle="iconStyle"></myp-icon>
		</view>
		<!-- custom title and value view -->
		<slot>
			<text v-if="title&&title.length>0" :class="['myp-color-'+mrTitleType, 'myp-size-'+titleSize]" :style="mrTitleStyle">{{title}}</text>
			<text :class="['myp-cell-value', 'myp-color-'+mrValueType, 'myp-size-'+valueSize]" :style="valueStyle">{{value}}</text>
		</slot>
		<!-- custom right extra view -->
		<slot name="extra"></slot>
		<view v-if="indicator&&indicator.length>0" :style="{'margin-left': space}">
			<myp-icon :name="indicator" :type="mrIndicatorType" :size="indicatorSize" :mode="indicatorMode" :iconStyle="indicatorStyle"></myp-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			icon: {
				type: String,
				default: ""
			},
			title: {
				type: String,
				default: ""
			},
			value: {
				type: String,
				default: ""
			},
			indicator: {
				type: String,
				default: "right"
			},
			bgType: {
				type: String,
				default: ''
			},
			titleType: {
				type: String,
				default: ''
			},
			valueType: {
				type: String,
				default: ''
			},
			iconType: {
				type: String,
				default: ''
			},
			indicatorType: {
				type: String,
				default: ''
			},
			titleSize: {
				type: String,
				default: ''
			},
			valueSize: {
				type: String,
				default: 's'
			},
			iconSize: {
				type: String,
				default: "l"
			},
			indicatorSize: {
				type: String,
				default: "l"
			},
			height: {
				type: String,
				default: 'l'
			},
			radius: {
				type: String,
				default: ''
			},
			border: {
				type: String,
				default: ''
			},
			hover: {
				type: String,
				default: 'bg'
			},
			space: {
				type: String,
				default: '12rpx'
			},
			iconStyle: {
				type: String,
				default: ''
			},
			indicatorStyle: {
				type: String,
				default: ''
			},
			iconMode: {
				type: String,
				default: 'aspectFill'
			},
			indicatorMode: {
				type: String,
				default: 'aspectFill'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			titleStyle: {
				type: String,
				default: ''
			},
			valueStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			mrIconType() {
				if (this.iconType && this.iconType.length > 0) {
					return this.iconType
				}
				return (this.bgType&&this.bgType.length>0)?'inverse':''
			},
			mrTitleType() {
				if (this.titleType&&this.titleType.length>0) {
					return this.titleType
				}
				return (this.bgType&&this.bgType.length>0)?'inverse':''
			},
			mrValueType() {
				if (this.valueType&&this.valueType.length>0) {
					return this.valueType
				}
				return (this.bgType&&this.bgType.length>0)?'inverse':'second'
			},
			mrIndicatorType() {
				if (this.indicatorType&&this.indicatorType.length>0) {
					return this.indicatorType
				}
				return (this.bgType&&this.bgType.length>0)?'inverse':'second'
			},
			mrTitleStyle() {
				const _style = `margin-right:${this.space};`
				return _style + this.titleStyle
			}
		},
		methods: {
			toSelect() {
				this.$emit("cellClicked")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-cell {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		
		&-value {
			flex: 1;
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
