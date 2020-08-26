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
			// value, not index of column
			value: {
				type: Array,
				default: ()=>{
					return [0,0,0,0,0,0,0]
				}
			},
			// styles
			bgType: {
				type: String,
				default: 'inverse'
			},
			textType: {
				type: String,
				default: 'text'
			},
			textSize: {
				type: String,
				default: 'base'
			},
			height: {
				type: String,
				default: '500rpx'
			},
			itemHeight: {
				type: String,
				default: '100rpx'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			itemStyle: {
				type: String,
				default: ''
			},
			textStyle: {
				type: String,
				default: ''
			},
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
			flex-direction: column;
		}
		&-view {
			flex: 1;
		}
		&-item {
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
