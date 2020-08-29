<template>
	<view :class="['myp-sl', 'myp-bg-'+bgType, 'myp-height-'+height, 'myp-border-'+border, 'myp-radius-'+radius]" :hover-class="'myp-hover-'+hover" :style="boxStyle" @tap.stop="toSelect">
		<myp-icon v-if="icon&&icon.length>0" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="'margin-right:'+space+';'+iconBoxStyle" @iconClicked="toSelect"></myp-icon>
		<slot name="label">
			<text v-if="label&&label.length>0" :class="['myp-color-'+labelType, 'myp-size-'+labelSize]" :style="'margin-right:'+space+';'+labelStyle">{{label}}</text>
		</slot>
		<text v-if="shouldShowPlace" :class="['myp-sl-value', 'myp-color-'+placeType, 'myp-size-'+placeSize]" :style="'text-align:'+valueAlign+';'+placeStyle">{{placeholder}}</text>
		<text v-else :class="['myp-sl-value', 'myp-color-'+valueType, 'myp-size-'+valueSize]" :style="'text-align:'+valueAlign+';'+valueStyle">{{value}}</text>
		<slot name="extra"></slot>
		<myp-icon v-if="indicator&&indicator.length>0" :name="indicator" :type="indicatorType" :size="indicatorSize" :iconStyle="indicatorStyle" :boxStyle="'margin-left:'+space+';'+indicatorBoxStyle" @iconClicked="toSelect"></myp-icon>
	</view>
</template>

<script>
	export default {
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
			},
			iconBoxStyle: {
				type: String,
				default: ''
			},
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
