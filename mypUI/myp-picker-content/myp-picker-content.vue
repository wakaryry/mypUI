<template>
	<view :class="['myp-picker-box', 'myp-bg-'+bgType]" :style="mrBoxStyle">
		<picker-view v-if="mode==='s3' || mode==='s2' || mode==='s1'" class="myp-picker-view" :indicator-style="mrIndicatorStyle" :value="pickVal" @change="bindChange">
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.p||[]" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item[pl]}}</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="mode==='s2' || mode==='s3'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.c||[]" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item[cl]}}</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="mode==='s3'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.a||[]" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item[al]}}</text>
				</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	import selectionMixin from './sMixin.js'
	import handlerMixin from './handlerMixin.js'
	
	export default {
		mixins: [selectionMixin, handlerMixin],
		props: {
			// ['s3', 's2', 's1']
			mode: {
				type: String,
				default: "s1"
			},
			// 值，不是索引
			value: {
				type: Array,
				default: ()=>{
					return [0,0,0,0,0,0,0]
				}
			},
			// 背景主题
			bgType: {
				type: String,
				default: 'inverse'
			},
			// 选择项文字颜色主题
			textType: {
				type: String,
				default: 'text'
			},
			// 选择项文字尺寸主题
			textSize: {
				type: String,
				default: 'base'
			},
			// 自定义的高度
			height: {
				type: String,
				default: '500rpx'
			},
			// 选择项自定义的高度
			itemHeight: {
				type: String,
				default: '100rpx'
			},
			// 外层样式
			boxStyle: {
				type: String,
				default: ''
			},
			// 选择项的外层样式
			itemStyle: {
				type: String,
				default: ''
			},
			// 选择项的文字样式
			textStyle: {
				type: String,
				default: ''
			},
			// indicator-style
			indicatorStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			mrBoxStyle() {
				return `height:${this.height};` + this.boxStyle
			},
			mrIndicatorStyle() {
				return `height:${this.itemHeight};` + this.indicatorStyle
			},
			mrItemStyle() {
				return `height:${this.itemHeight};` + this.itemStyle
			}
		},
		data() {
			return {
				items: {},
				// value of prop label
				checkArr: [],
				// value of prop value
				checkValue: [],
				pickVal: [],
				resultStr: '',
				now: new Date()
			}
		},
		watch: {
			mode() {
				this.initData()
			},
			// s1/s2/s3
			selections() {
				this.initData()
			}
		},
		created() {
			this.initData()
		},
		methods: {
			// ref method to init data
			init() {
				this.now = new Date() // refresh time
				this.initData()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-picker {
		&-box {
			overflow: hidden;
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: column;
		}
		&-view {
			flex: 1;
		}
		&-item {
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			justify-content: center;
			align-items: center;
			
			&-text {
				text-align: center;
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
	}
</style>
