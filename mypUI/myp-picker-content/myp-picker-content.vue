<template>
	<view :class="['myp-picker-box', 'myp-flex-column', 'myp-bg-'+bgType]" :style="mrBoxStyle">
		<picker-view v-if="mode==='s3' || mode==='s2' || mode==='s1'" class="myp-flex-one" :indicator-style="mrIndicatorStyle" :value="pickVal" @change="bindChange">
			<picker-view-column>
				<view class="myp-flex-column myp-align-center myp-justify-center" :style="mrItemStyle" v-for="(item,index) in items.p||[]" :key="index">
					<text :class="['myp-picker-item-text', 'myp-lines-one', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item[pl]}}</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="mode==='s2' || mode==='s3'">
				<view class="myp-flex-column myp-align-center myp-justify-center" :style="mrItemStyle" v-for="(item,index) in items.c||[]" :key="index">
					<text :class="['myp-picker-item-text', 'myp-lines-one', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item[cl]}}</text>
				</view>
			</picker-view-column>
			<picker-view-column v-if="mode==='s3'">
				<view class="myp-flex-column myp-align-center myp-justify-center" :style="mrItemStyle" v-for="(item,index) in items.a||[]" :key="index">
					<text :class="['myp-picker-item-text', 'myp-lines-one', 'myp-color-'+textType, 'myp-size-'+textSize]" :style="textStyle">{{item[al]}}</text>
				</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	export default {
		props: {
			/**
			 * ['s3', 's2', 's1']
			 */
			mode: {
				type: String,
				default: "s1"
			},
			/**
			 * 值，不是索引
			 */
			value: {
				type: Array,
				default: ()=>{
					return [0,0,0,0,0,0,0]
				}
			},
			/**
			 * 用户手动初始化数据
			 */
			updateTime: {
				type: Number,
				default: 0
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: 'inverse'
			},
			/**
			 * 选择项文字颜色主题
			 */
			textType: {
				type: String,
				default: 'text'
			},
			/**
			 * 选择项文字尺寸主题
			 */
			textSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 自定义的高度
			 */
			height: {
				type: String,
				default: '500rpx'
			},
			/**
			 * 选择项自定义的高度
			 */
			itemHeight: {
				type: String,
				default: '100rpx'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 选择项的外层样式
			 */
			itemStyle: {
				type: String,
				default: ''
			},
			/**
			 * 选择项的文字样式
			 */
			textStyle: {
				type: String,
				default: ''
			},
			/**
			 * indicator-style
			 */
			indicatorStyle: {
				type: String,
				default: ''
			},
			/**
			 * 选择的内容
			 */
			selections: {
				type: Array,
				default: () => {
					return []
				}
			},
			/**
			 * 对应选择内容的字段
			 */
			labelProps: {
				type: Object,
				default: () => {
					return {
						s1: {
							label: 'name',
							value: 'id'
						},
						s2: {
							label: 'name',
							value: 'id',
							// the tag is for to get s2 selections in s1
							tag: "c"
						},
						s3: {
							label: 'name',
							value: 'id',
							// the tag is for to get get s3 in selections in s2
							tag: "a"
						}
					}
				}
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
			pl() {
				return this.labelProps.s1 && this.labelProps.s1.label
			},
			cl() {
				return this.labelProps.s2 && this.labelProps.s2.label
			},
			al() {
				return this.labelProps.s3 && this.labelProps.s3.label
			},
			pv() {
				return this.labelProps.s1 && this.labelProps.s1.value
			},
			cv() {
				return this.labelProps.s2 && this.labelProps.s2.value
			},
			av() {
				return this.labelProps.s3 && this.labelProps.s3.value
			},
			cTag() {
				return this.labelProps.s2 && this.labelProps.s2.tag
			},
			aTag() {
				return this.labelProps.s3 && this.labelProps.s3.tag
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
			},
			updateTime() {
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
			},
			initData() {
				let data = {}
				const mode = this.mode
				let province, city, area
				// index of value
				let dVal = []
				if (mode === 's1' || mode === 's2' || mode === 's3') {
					if (!this.selections || this.selections.length === 0) {
						return
					}
				}
				switch (mode) {
					case "s3":
						dVal = this.getSelectionsIndex(this.value)
						const cs = this.selections[dVal[0]][this.cTag]
						const ass = cs[dVal[1]][this.aTag]
						data = {
							p: this.selections,
							c: cs,
							a: ass
						}
						break
					case "s2":
						dVal = this.getSelectionsIndex(this.value)
						data = {
							p: this.selections,
							c: this.selections[dVal[0]][this.cTag]
						}
						break
					case "s1":
						dVal = this.getSelectionsIndex(this.value)
						data = {p: this.selections}
						break
				}
				this.items = data
				switch (mode) {
					case "s3":
						province = data.p[dVal[0]]
						city = data.c[dVal[1]]
						area = data.a[dVal[2]]
						this.checkArr = [province[this.pl], city[this.cl], area[this.al]]
						this.checkValue = [province[this.pv], city[this.cv], area[this.av]]
						this.resultStr = province[this.pl] + city[this.cl] + area[this.al]
						break
					case "s2":
						province = data.p[dVal[0]]
						city = data.c[dVal[1]]
						this.checkArr = [province[this.pl], city[this.cl]]
						this.checkValue = [province[this.pv], city[this.cv]]
						this.resultStr = province[this.pl] + city[this.cl]
						break
					case "s1":
					    province = data.p[dVal[0]] || data.p[data.p.length - 1]
						this.checkArr = province[this.pl]
						this.checkValue = province[this.pv]
						this.resultStr = province[this.pl]
						break
				}
				this.$emit("inited", {
					checkArr: this.checkArr,
					checkValue: this.checkValue,
					defaultVal: dVal,
					result: this.resultStr
				})
				// we must set default-data in nextTick, or mp will not show the current index
				this.$nextTick(()=>{
					this.pickVal = dVal
				})
			},
			bindChange(val) {
				let arr = Object.assign([], val.detail.value)
				let province, city, area
				let checkArr = this.checkArr
				const mode = this.mode
				switch (mode) {
					case "s3":
						province = this.items.p[arr[0]][this.pl]
						city = this.items.c[arr[1]][this.cl]
						area = this.items.a[arr[2]][this.al]
						if (province != checkArr[0]) {
							this.items.c = this.items.p[arr[0]][this.cTag]
							this.items.a = this.items.c[arr[1]][this.aTag]
							arr[1] = 0
							arr[2] = 0
							city = this.items.c[arr[1]][this.cl]
							area = this.items.a[arr[2]][this.al]
						}
						if (city != checkArr[1]) {
							this.items.a = this.items.c[arr[1]][this.aTag]
							arr[2] = 0
							area = this.items.a[arr[2]][this.al]
						}
						this.checkArr = [province, city, area]
						this.checkValue = [this.items.p[arr[0]][this.pv], this.items.c[arr[1]][this.cv], this.items.a[arr[2]][this.av]]
						this.resultStr = province + city + area
						break
					case "s2":
						province = this.items.p[arr[0]][this.pl]
						city = this.items.c[arr[1]][this.cl]
						if (province != checkArr[0]) {
							this.items.c = this.items.p[arr[0]][this.cTag]
							arr[1] = 0
							city = this.items.c[arr[1]][this.cl]
						}
						this.checkArr = [province, city]
						this.checkValue = [this.items.p[arr[0]][this.pv], this.items.c[arr[1]][this.cv]]
						this.resultStr = province + city
						break
					case "s1":
						province = this.items.p[arr[0]] || this.items.p[this.items.p.length - 1]
						this.checkArr = province[this.pl]
						this.checkValue = province[this.pv]
						this.resultStr = province[this.pl]
						break
				}
				this.pickVal = arr
				this.$emit("change", {
					checkArr: this.checkArr,
					checkValue: this.checkValue,
					defaultVal: this.pickVal,
					result: this.resultStr
				})
				/*
				const that = this
				this.$nextTick(() => {
					that.pickVal = arr
				})*/
			},
			getSelectionsIndex(val) {
				// to get index of the defaultValue in selections for s1/s1/s3 mode
				if (this.mode === 's3') {
					let p = val[0]
					let c = val[1]
					let a = val[2]
					const ps = this.selections
					let cs = []
					let ass = []
					let pf = false
					let cf = false
					let af = false
					for (const i in ps) {
						const _p = ps[i]
						if (_p[this.pv] === p) {
							pf = true
							p = i
							cs = _p[this.cTag]
							break
						}
					}
					if (!pf) {
						return [0,0,0]
					}
					for (const i in cs) {
						const _c = cs[i]
						if (_c[this.cv] === c) {
							cf = true
							c = i
							ass = _c[this.aTag]
							break
						}
					}
					if (!cf) {
						return [p, 0, 0]
					}
					for (const i in ass) {
						const _a = ass[i]
						if (_a[this.av] === a) {
							af = true
							a = i
							break
						}
					}
					if (!af) {
						return [p,c,0]
					}
					return [p, c, a]
				} else if (this.mode === 's2') {
					let p = val[0]
					let c = val[1]
					const ps = this.selections
					let cs = []
					let pf = false
					let cf = false
					for (const i in ps) {
						const _p = ps[i]
						if (_p[this.pv] === p) {
							pf = true
							p = i
							cs = _p[this.cTag]
							break
						}
					}
					if (!pf) {
						return [0,0]
					}
					for (const i in cs) {
						const _c = cs[i]
						if (_c[this.cv] === c) {
							cf = true
							c = i
							break
						}
					}
					if (!cf) {
						return [p,0]
					}
					return [p, c]
				} else {
					let p = val[0]
					const ps = this.selections
					let pf = false
					for (const i in ps) {
						const _p = ps[i]
						if (_p[this.pv] === p) {
							pf = true
							p = i
							break
						}
					}
					if (!pf) {
						return [0]
					}
					return [p]
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-picker {
		&-box {
			overflow: hidden;
		}
		&-item {
			&-text {
				text-align: center;
			}
		}
	}
</style>
