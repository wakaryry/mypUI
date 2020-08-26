<template>
	<view :class="['myp-picker-box', 'myp-bg-'+bgType]" :style="mrBoxStyle">
		<picker-view v-if="mode==='date' || mode==='yearMonth' || mode==='dateTime' || mode=='time'" class="myp-picker-view" :indicator-style="mrIndicatorStyle" :value="pickVal" @change="bindChange">
			<picker-view-column v-if="mode !== 'time'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.years" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item}}年</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="mode !== 'time'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.months" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item}}月</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="(mode==='date' || mode==='dateTime') && mode!=='time'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.days" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item}}日</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="mode==='dateTime' || mode==='time'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.hours" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item}}时</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="mode==='dateTime' || mode==='time'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.minutes" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item}}分</text>
				</view>
			</picker-view-column>
		</picker-view>
		<picker-view v-if="mode==='dateRange'||mode==='yearMonthRange'" class="myp-picker-view" :indicator-style="mrIndicatorStyle" :value="pickVal" @change="bindChange">
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.fYears" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item}}</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.fMonths" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item}}</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="mode==='dateRange'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.fDays" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item}}</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrRangeStyle">
					<text :class="['myp-picker-item-text', 'myp-color-'+rangeType, 'myp-size-'+rangeSize]" :style="rangeStyle">{{range}}</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.tYears" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item}}</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.tMonths" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item}}</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="mode==='dateRange'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.tDays" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item}}</text>
				</view>
			</picker-view-column>
		</picker-view>
		<picker-view v-if="mode==='timeRange'" class="myp-picker-view" :indicator-style="mrIndicatorStyle" :value="pickVal" @change="bindChange">
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.fHours" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item}}时</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.fMinutes" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item}}分</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrRangeStyle">
					<text :class="['myp-picker-item-text', 'myp-color-'+rangeType, 'myp-size-'+rangeSize]" :style="rangeStyle">{{range}}</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.tHours" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item}}时</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in items.tMinutes" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item}}分</text>
				</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	import handlerMixin from './handlerMixin.js'
	
	export default {
		mixins: [handlerMixin],
		props: {
			// ['date'/年月日, 'dateTime'/年月日时分, 'yearMonth'/年月, 'time'/时分, 'dateRange'/年月日, 'yearMonthRange'/年月, 'timeRange'/时分]
			mode: {
				type: String,
				default: "date"
			},
			// value, not index of column
			value: {
				type: Array,
				default: ()=>{
					return [0,0,0,0,0,0,0]
				}
			},
			useCurrent: {
				type: Boolean,
				default: false
			},
			// 表示年份year的开始或者小时hour的开始
			start: {
				type: String,
				default: "1970"
			},
			end: {
				type: String,
				default: new Date().getFullYear() + ''
			},
			// 仅仅只是用在带年份选择的mode上
			includeBefore: {
				type: Boolean,
				default: true
			},
			includeAfter: {
				type: Boolean,
				default: true
			},
			range: {
				type: String,
				default: '-'
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
			},
			rangeType: {
				type: String,
				default: 'text'
			},
			rangeSize: {
				type: String,
				default: 'base'
			},
			rangeBoxStyle: {
				type: String,
				default: ''
			},
			rangeStyle: {
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
			},
			mrRangeStyle() {
				return `height:${this.itemHeight};` + this.rangeBoxStyle
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
			show(newV) {
				if (newV) {
					if (!this.includeBefore || !this.includeAfter) {
						this.now = new Date() // refresh time
						this.initData()  // re-init
					}
				}
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
