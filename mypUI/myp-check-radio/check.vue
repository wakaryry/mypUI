<template>
	<view :class="flex === 'row' ? 'myp-row-radio' : 'myp-column-radio'" :style="boxStyle">
		<view v-for="(item, idx) in updatedItems" :key="idx" :class="['myp-radios-item', 'myp-height-'+height]" :style="'margin-right:'+((flex==='column'&&idx !== updatedItems.length-1) ? itemSpace : '0')+';'+itemBoxStyle">
			<view style="flex: 1;">
				<myp-radio-item :titleType="titleType" :checkedTitleType="checkedTitleType" :disabledTitleType="disabledTitleType" :iconType="iconType" :checkedIconType="checkedIconType" :disabledIconType="disabledIconType" :titleSize="titleSize" :space="iconTitleSpace" :iconSize="iconSize" :boxStyle="itemStyle" :iconStyle="iconStyle" :checkedIconStyle="checkedIconStyle" :disabledIconStyle="disabledIconStyle" :titleStyle="titleStyle" :checkedTitleStyle="checkedTitleStyle" :disabledTitleStyle="disabledTitleStyle" :mode="mode" :direction="direction" :title="item[tl]" :value="item[vl]" :disabled="disabled || item[dl]" :checked="item['myp-checked']" :isBetween="isBetween" @radioClicked="toUpdateItemCheck(idx)"></myp-radio-item>
			</view>
		</view>
	</view>
</template>

<script>
	// 
	// 因为uni中小程序对 vm.$slots 不支持，我们使用该替代方案。
	// 主要是不想每一次都写一次单/多选的判断代码
	//
	// 单选/多选
	// 我们应该考虑数据更新最小
	// 可以考虑，value作为初始化数据，可以使用v-model绑定，但是不会watch value的变化，数据的变化在内部直接完成，不通过value来计算
	// 如果需要watch value的变化以及items的变化，可以使用新的 prop 来通知，比如 updatedTime。通过watch updatedTime 来告知强制更新
	import mypRadioItem from '@/mypUI/myp-check-radio/item.vue'
	
	export default {
		components: {
			mypRadioItem
		},
		props: {
			// radio/radio-fill/circle-check/box-check/circle-fill-check/box-fill-check/check
			mode: {
				type: String,
				default: 'radio'
			},
			// radio logo in left or right
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
			// 我们可以直接使用titleLabel获取title内容
			titleLabel: {
				type: String,
				default: null
			},
			// 我们也可以利用格式化来决定title内容
			// 这样可以一次性输出几个key的内容
			// 比如 '{name} (ID:{id})'
			// 我们将解析该字符串，然后插入举腿数据
			titleFormat: {
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
			titleType: {
				type: String,
				default: ''
			},
			checkedTitleType: {
				type: String,
				default: ''
			},
			disabledTitleType: {
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
			titleSize: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: ''
			},
			iconTitleSpace: {
				type: String,
				default: '12rpx'
			},
			titleStyle: {
				type: String,
				default: ''
			},
			disabledTitleStyle: {
				type: String,
				default: ''
			},
			checkedTitleStyle: {
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
				return 'title'
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
				const _vals = []
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
					if (that.titleFormat) {
						const title_str = that.titleFormat.replace(/{\w+}/g, result => {
							const key = result.substring(1, result.length-1)
							const _str = item[key]
							return _str || ''
						})
						upList.push({
							[this.tl]: title_str,
							[this.vl]: item[that.valueLabel],
							[this.dl]: item[that.disabledLabel],
							'myp-checked': flag
						})
					} else {
						if (that.titleLabel) {
							upList.push({
								[this.tl]: item[that.titleLabel],
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
	@import '../base.scss';
	
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
