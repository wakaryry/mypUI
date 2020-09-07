<template>
	<view :class="flex === 'row' ? 'myp-row-radio' : 'myp-column-radio'" :style="boxStyle">
		<view v-for="(item, idx) in updatedItems" :key="idx" :class="['myp-radios-item', 'myp-height-'+height]" :style="'margin-right:'+((flex==='column'&&idx !== updatedItems.length-1) ? itemSpace : '0')+';'+itemBoxStyle" @tap.stop="toUpdateItemCheck(idx)">
			<view style="flex: 1;">
				<myp-check-item :textType="textType" :checkedTextType="checkedTextType" :disabledTextType="disabledTextType" :iconType="iconType" :checkedIconType="checkedIconType" :disabledIconType="disabledIconType" :textSize="textSize" :space="space" :iconSize="iconSize" :boxStyle="itemStyle" :iconStyle="iconStyle" :iconBoxStyle="iconBoxStyle" :checkedIconStyle="checkedIconStyle" :disabledIconStyle="disabledIconStyle" :textStyle="textStyle" :checkedTextStyle="checkedTextStyle" :disabledTextStyle="disabledTextStyle" :direction="direction" :icon="icon" :checkedIcon="checkedIcon" :text="item[tl]" :value="item[vl]" :disabled="disabled || item[dl]" :checked="item['myp-checked']" :isBetween="isBetween" @itemClicked="toUpdateItemCheck(idx)"></myp-check-item>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			icon: {
				type: String,
				default: ''
			},
			checkedIcon: {
				type: String,
				default: ''
			},
			direction: {
				type: String,
				default: 'left'
			},
			// row/column
			flex: {
				type: String,
				default: 'row'
			},
			// flex为row时，item是否spaceBetween
			isBetween: {
				type: Boolean,
				default: false
			},
			items: {
				type: Array,
				default: ()=>{return []}
			},
			value: {
				type: Array,
				default: ()=>{return []}
			},
			// 限制最多可选数量
			limits: {
				type: Number,
				default: 0
			},
			updatedTime: {
				type: [String, Number],
				default: ''
			},
			// we do not calculate disabled via value, just set by user
			disabled: {
				type: Boolean,
				default: false
			},
			// 我们可以直接使用textLabel获取text内容
			textLabel: {
				type: String,
				default: null
			},
			// 我们也可以利用格式化来决定text内容
			// 这样可以一次性输出几个key的内容
			// 比如 '{name} (ID:{id})'
			textFormat: {
				type: String,
				default: ''
			},
			valueLabel: {
				type: String,
				default: null
			},
			disabledLabel: {
				type: String,
				default: null
			},
			boxStyle: {
				type: String,
				default: ''
			},
			itemBoxStyle: {
				type: String,
				default: ''
			},
			itemSpace: {
				type: String,
				default: '16rpx'
			},
			textType: {
				type: String,
				default: ''
			},
			checkedTextType: {
				type: String,
				default: ''
			},
			disabledTextType: {
				type: String,
				default: 'disabled'
			},
			iconType: {
				type: String,
				default: ''
			},
			checkedIconType: {
				type: String,
				default: ''
			},
			disabledIconType: {
				type: String,
				default: 'disabled'
			},
			textSize: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: ''
			},
			space: {
				type: String,
				default: '12rpx'
			},
			textStyle: {
				type: String,
				default: ''
			},
			disabledTextStyle: {
				type: String,
				default: ''
			},
			checkedTextStyle: {
				type: String,
				default: ''
			},
			iconSize: {
				type: String,
				default: 'l'
			},
			iconStyle: {
				type: String,
				default: ''
			},
			iconBoxStyle: {
				type: String,
				default: ''
			},
			disabledIconStyle: {
				type: String,
				default: ''
			},
			checkedIconStyle: {
				type: String,
				default: ''
			},
			itemStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			tl() {
				return 'text'
			},
			vl() {
				return 'value'
			},
			dl() {
				return 'disabled'
			}
		},
		data() {
			return {
				updatedItems: []
			}
		},
		created() {
			// 处理初始数据
			this.toGenerateUpdatedItems()
		},
		watch: {
			// 我们不通过直接watch value/items 来对updatedItems进行更新
			// 通过updatedTime来进行强制更新/手动更新
			updatedTime() {
				this.toGenerateUpdatedItems()
			}
		},
		methods: {
			toUpdateItemCheck(idx) {
				const item = this.updatedItems[idx]
				const isToCheck = !item['myp-checked']
				if (this.limits > 0 && isToCheck) {
					// limits 为 1 的时候，允许直接选择另一项
					if (this.value && this.value.length >= this.limits && this.limits !== 1) {
						this.$emit("overed")
						return
					}
				}
				let _vals = []
				if (this.limits === 1) {
					if (isToCheck) {
						this.updatedItems.forEach(item => {
							item['myp-checked'] = false
						})
						item['myp-checked'] = isToCheck
						_vals.push(item[this.vl])
					} else {
						item['myp-checked'] = isToCheck
						_vals = []
					}
				} else {
					item['myp-checked'] = isToCheck
					this.updatedItems.forEach(item => {
						if (item['myp-checked']) {
							_vals.push(item[this.vl])
						}
					})
				}
				// just for v-model
				this.$emit("input", _vals)
				this.$emit("change", _vals)
			},
			toGenerateUpdatedItems() {
				const upList = []
				const that = this
				this.items && this.items.forEach((item, i) => {
					// judge if checked
					const itemValue = that.valueLabel ? item[that.valueLabel] : item
					let flag = false
					for (const i in (that.value || [])) {
						const _val = that.value[i]
						if (_val === itemValue) {
							flag = true
							break
						}
					}
					if (that.textFormat) {
						const text_str = that.textFormat.replace(/{\w+}/g, result => {
							const key = result.substring(1, result.length-1)
							const _str = item[key]
							return _str || ''
						})
						upList.push({
							[this.tl]: text_str,
							[this.vl]: item[that.valueLabel],
							[this.dl]: item[that.disabledLabel],
							'myp-checked': flag
						})
					} else {
						if (that.textLabel) {
							upList.push({
								[this.tl]: item[that.textLabel],
								[this.vl]: item[that.valueLabel],
								[this.dl]: item[that.disabledLabel],
								'myp-checked': flag
							})
						} else {
							upList.push({
								[this.tl]: item,
								[this.vl]: item,
								[this.dl]: false,
								'myp-checked': flag
							})
						}
					}
				})
				this.updatedItems = upList
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-row-radio {
		flex-direction: column;
		justify-content: center;
	}
	.myp-column-radio {
		flex-direction: row;
		align-items: center;
	}
	
	.myp-radios-item {
		flex-direction: row;
		align-items: center;
	}
</style>
