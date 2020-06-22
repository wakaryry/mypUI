<template>
	<view :class="['myp-picker-box', 'myp-bg-'+bgType]" :style="mrBoxStyle">
		<picker-view v-if="mode==='half' || mode==='date' || mode==='yearMonth' || mode==='dateTime' || mode=='time'" class="myp-picker-view" :indicator-style="mrIndicatorStyle" :value="pickVal" @change="bindChange">
			<picker-view-column v-if="mode !== 'time'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.years" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item}}年</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="mode !== 'time'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.months" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item}}月</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="(mode==='half' || mode==='date' || mode==='dateTime') && mode!=='time'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.days" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item}}日</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="mode==='half'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.areas" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item.label}}</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="mode==='dateTime' || mode==='time'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.hours" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item}}时</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="mode==='dateTime' || mode==='time'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.minutes" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item}}分</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="mode==='dateTime' || mode==='time'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.seconds" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item}}秒</text>
				</view>
			</picker-view-column>
		</picker-view>
		<picker-view v-if="mode==='range'" class="myp-picker-view" :indicator-style="mrIndicatorStyle" :value="pickVal" @change="bindChange">
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.fyears" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item}}</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.fmonths" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item}}</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.fdays" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item}}</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item">-</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.tyears" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item}}</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.tmonths" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item}}</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.tdays" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item}}</text>
				</view>
			</picker-view-column>
		</picker-view>
		<picker-view v-if="mode==='yearMonthRange'" class="myp-picker-view" :indicator-style="mrIndicatorStyle" :value="pickVal" @change="bindChange">
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.fyears" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item}}</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.fmonths" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item}}</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item">-</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.tyears" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item}}</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.tmonths" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item}}</text>
				</view>
			</picker-view-column>
		</picker-view>
		<!-- 根据数据，动态级数 -->
		<picker-view v-if="mode==='linkage'" class="myp-picker-view" :indicator-style="mrIndicatorStyle" :value="pickVal" @change="bindChange">
			<picker-view-column v-for="(col,colIndex) in data" :key="colIndex">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in col" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item.label}}</text>
				</view>
			</picker-view-column>
		</picker-view>
		<!-- s1/s2/s3:linkage. 动态数据/动态标签。支持1/2/3级 -->
		<picker-view v-if="mode==='s3' || mode==='s2' || mode==='s1'" class="myp-picker-view" :indicator-style="mrIndicatorStyle" :value="pickVal" @change="bindChange">
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.p" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item[pl]}}</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="mode==='s2' || mode==='s3'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.c" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item[cl]}}</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="mode==='s3'">
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.a" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item[al]}}</text>
				</view>
			</picker-view-column>
		</picker-view>
		<picker-view v-if="mode==='limit'" class="myp-picker-view" :indicator-style="mrIndicatorStyle" :value="pickVal" @change="bindChange">
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.date" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item.label}}</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.hours" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item.label}}时</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.minutes" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item.label}}分</text>
				</view>
			</picker-view-column>
		</picker-view>
		<picker-view v-if="mode==='limitHour'" class="myp-picker-view" :indicator-style="mrIndicatorStyle" :value="pickVal" @change="bindChange">
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.date" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item.label}}</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.areas" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item.label}}</text>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="myp-picker-item" :style="mrItemStyle" v-for="(item,index) in data.hours" :key="index">
					<text :class="['myp-picker-item-text', 'myp-color-'+type, 'myp-size-'+size]" :style="itemTextStyle">{{item.label}}时</text>
				</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	//处理方法来自于： 日期选择插件 https://ext.dcloud.net.cn/plugin?id=273
	import selectionMixin from './sMixin.js'
	import handlerMixin from './handlerMixin.js'
	
	function oneOf(value, validList) {
		for (let i = 0; i < validList.length; i++) {
			if (value === validList[i]) {
				return true;
			}
		}
		throw new Error('mode无效，请选择有效的mode!');
		return false;
	}
	
	export default {
		mixins: [selectionMixin, handlerMixin],
		props: {
			mode: {
				type: String,
				validator(mode) {
					let modeList = ['half', 'date', 'dateTime', 'yearMonth', 'time', 'linkage', 's3', 's2', 's1', 'limit', 'limitHour', 'range', 'yearMonthRange']; //过滤无效mode;
					return oneOf(mode, modeList);
				},
				default: "date"
			},
			startYear: {
				type: String,
				default: "1970"
			},
			endYear: {
				type: String,
				default: new Date().getFullYear() + ''
			},
			// it's value of all selected-items, not the index of the items. max length is 7
			value: {
				type: Array,
				default: ()=>{
					return [0,0,0,0,0,0,0]
				}
			},
			step: {
				type: Number,
				default: 1
			},
			current: {
				type: Boolean,
				default: false
			},
			//以下参数仅对mode==limit有效
			dayStep: {
				type: Number,
				default: 7
			},
			startHour: {
				type: Number,
				default: 8
			},
			endHour: {
				type: Number,
				default: 20
			},
			minuteStep: {
				type: Number,
				default: 10
			},
			afterStep: {
				type: Number,
				default: 30
			},
			disabledAfter: {
				type: Boolean,
				default: false
			},
			// styles
			bgType: {
				type: String,
				default: 'inverse'
			},
			type: {
				type: String,
				default: 'text'
			},
			size: {
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
			itemTextStyle: {
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
				data: {},
				// value of prop label
				checkArr: [],
				// value of prop value
				checkValue: [],
				pickVal: [],
				resultStr: ''
			}
		},
		watch: {
			mode() {
				this.initData()
			},
			// s1/s2/s3/linkage
			selections() {
				this.initData()
			}
		},
		created() {
			this.initData()
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '../base.scss';
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
