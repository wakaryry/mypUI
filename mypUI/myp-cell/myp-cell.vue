<template>
	<view :class="['myp-cell', 'myp-bg-'+bgType, 'myp-height-'+height, 'myp-radius-'+radius, 'myp-border-'+border]" :style="boxStyle" :hover-class="'myp-hover-'+hover" bubble="true" @tap.stop="toSelect">
		<myp-icon v-if="icon&&icon.length > 0" :name="icon" :type="iconType" :size="iconSize" :mode="iconMode" :iconStyle="iconStyle" :boxStyle="'margin-right:'+space+';'+iconBoxStyle" @iconClicked="toSelect"></myp-icon>
		<slot>
			<text v-if="title&&title.length>0" :class="['myp-color-'+titleType, 'myp-size-'+titleSize]" :style="'margin-right:'+space+';'+titleStyle">{{title}}</text>
			<text :class="['myp-cell-value', 'myp-color-'+valueType, 'myp-size-'+valueSize]" :style="valueStyle">{{value}}</text>
		</slot>
		<!-- custom right extra view -->
		<slot name="extra"></slot>
		<myp-icon v-if="indicator&&indicator.length>0" :name="indicator" :type="indicatorType" :size="indicatorSize" :mode="indicatorMode" :iconStyle="indicatorStyle" :boxStyle="'margin-left:'+space+';'+indicatorBoxStyle" @iconClicked="toSelect"></myp-icon>
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
				default: ""
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
				default: 'second'
			},
			iconType: {
				type: String,
				default: ''
			},
			indicatorType: {
				type: String,
				default: 'second'
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
		methods: {
			toSelect(e) {
				this.$emit("cellClicked")
				e.stopPropagation && e.stopPropagation()
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
		padding-left: 32rpx;
		padding-right: 32rpx;
		
		&-value {
			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			text-align: right;
			/* #ifdef APP-NVUE */
			lines: 1;
			/* #endif */
			/* #ifndef APP-NVUE */
			white-space: nowrap;
			/* #endif */
		}
	}
</style>
