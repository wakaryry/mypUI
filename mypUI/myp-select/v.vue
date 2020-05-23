<template>
	<view class="myp-v" :hover-class="'myp-hover-'+hover" :style="mrBoxStyle" @tap="toSelect">
		<view :style="{'margin-bottom': space}">
			<text :class="['myp-size-'+titleSize, 'myp-color-'+titleType]" :style="titleStyle">{{title}}</text>
		</view>
		<view style="flex-direction: row; align-items: center;">
			<text v-if="couldShowValue" :class="[isBetween&&'myp-v-value-full', 'myp-size-'+valueSize, 'myp-color-'+valueType]" :style="valueStyle">{{ value }}</text>
			<text v-else :class="[isBetween&&'myp-v-value-full', 'myp-size-'+placeSize, 'myp-color-'+placeType]" :style="placeStyle">{{ placeholder }}</text>
			<myp-icon :name="indicator" :type="indicatorType" :size="indicatorSize" :iconStyle="indicatorStyle"></myp-icon>
		</view>
	</view>
</template>

<script>
	import mypIcon from '@/mypUI/myp-icon/index.vue'
	export default {
		components: {
			mypIcon
		},
		props: {
			title: {
				type: String,
				default: ""
			},
			value: {
				type: [String, Number],
				default: ""
			},
			placeholder: {
				type: String,
				default: "请选择"
			},
			indicator: {
				type: String,
				default: ''
			},
			isBetween: {
				type: Boolean,
				default: false
			},
			titleType: {
				type: String,
				default: 'second'
			},
			titleSize: {
				type: String,
				default: 's'
			},
			valueType: {
				type: String,
				default: ''
			},
			valueSize: {
				type: String,
				default: 'll'
			},
			height: {
				type: String,
				default: ''
			},
			hover: {
				type: String,
				default: 'opacity'
			},
			indicatorType: {
				type: String,
				default: ''
			},
			indicatorSize: {
				type: String,
				default: 'l'
			},
			placeType: {
				type: String,
				default: 'place'
			},
			placeSize: {
				type: String,
				default: 'base'
			},
			space: {
				type: String,
				default: "18rpx"
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
			indicatorStyle: {
				type: String,
				default: ''
			},
			placeStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			couldShowValue() {
				const v = this.value || ""
				const vv = v + ''
				return vv.length > 0
			},
			mrBoxStyle() {
				if (this.height && this.height.length > 0) {
					return `height:${this.height};` + this.boxStyle
				}
				return this.boxStyle
			}
		},
		methods: {
			toSelect() {
				this.$emit("select")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../base.scss';
	.myp-v {
		flex-direction: column;
		justify-content: center;
		&-value-full {
			flex: 1;
		}
	}
</style>
