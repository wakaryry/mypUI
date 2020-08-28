<template>
	<view :class="['myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius]" :style="boxStyle">
		<view v-if="column === 0" class="myp-tag-group" :style="dyBoxStyle">
			<view v-for="(item, idx) in updatedItems" :key="idx" :style="{'margin-right': idx !== updatedItems.length-1 ? columnSpace : '0', 'margin-bottom': rowSpace}">
				<myp-tag :text="item[tl]" :value="item[vl]" :disabled="disabled || item[dl]" :selected="item['myp-checked']" :bgType="tagBgType" :selectedBgType="tagSelectedBgType" :textType="tagTextType" :selectedTextType="tagSelectedTextType" :height="tagHeight" :textSize="tagTextSize" :border="tagBorder" :selectedBorder="tagSelectedBorder" :radius="tagRadius" :space="tagSpace" :textStyle="textStyle" :selectedTextStyle="selectedTextStyle" :disabledTextStyle="disabledTextStyle" :boxStyle="tagStyle" :selectedBoxStyle="selectedTagStyle" :disabledBoxStyle="disabledTagStyle" @tagClicked="toUpdateItemCheck(idx)"></myp-tag>
			</view>
		</view>
		<view v-if="column !== 0">
			<view v-for="(rows, index) in chunkedItems" :key="index" class="myp-item-row" :style="{'margin-bottom': index !== chunkedItems.length-1 ? rowSpace : '0'}">
				<view v-for="(item, idx) in rows" :key="idx" class="myp-item-flex" :style="{'margin-right': idx !== rows.length-1 ? columnSpace : '0'}">
					<myp-tag v-if="item" :text="item[tl]" :value="item[vl]" :disabled="disabled || item[dl]" :selected="item['myp-checked']" :bgType="tagBgType" :selectedBgType="tagSelectedBgType" :textType="tagTextType" :selectedTextType="tagSelectedTextType" :height="tagHeight" :textSize="tagTextSize" :border="tagBorder" :selectedBorder="tagSelectedBorder" :radius="tagRadius" :space="tagSpace" :textStyle="textStyle" :selectedTextStyle="selectedTextStyle" :disabledTextStyle="disabledTextStyle" :boxStyle="tagStyle" :selectedBoxStyle="selectedTagStyle" :disabledBoxStyle="disabledTagStyle" @tagClicked="toUpdateItemCheck(index * column + idx)"></myp-tag>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {arrayChunk} from '../utils/utils.js'
	export default {
		props: {
			items: {
				type: Array,
				default: ()=>{return []}
			},
			value: {
				type: Array,
				default: ()=>{return []}
			},
			// 0 means no limit
			limits: {
				type: Number,
				default: 0
			},
			// limits为1时是否允许取消当前选择
			leastOne: {
				type: Boolean,
				default: false
			},
			// 0表示动态宽度，其余就是等宽
			column: {
				type: Number,
				default: 0
			},
			rowSpace: {
				type: String,
				default: '16rpx'
			},
			columnSpace: {
				type: String,
				default: '16rpx'
			},
			updatedTime: {
				type: [String, Number],
				default: ''
			},
			disabled: {
				type: Boolean,
				default: false
			},
			textLabel: {
				type: String,
				default: null
			},
			valueLabel: {
				type: String,
				default: null
			},
			disabledLabel: {
				type: String,
				default: null
			},
			bgType: {
				type: String,
				default: ''
			},
			border: {
				type: String,
				default: 'none'
			},
			radius: {
				type: String,
				default: 'none'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			// dyBoxStyle可以设置items的排布规则
			dyBoxStyle: {
				type: String,
				default: ''
			},
			// below is tags' props
			tagBgType: {
				type: String,
				default: ''
			},
			tagSelectedBgType: {
				type: String,
				default: ''
			},
			tagTextType: {
				type: String,
				default: ''
			},
			tagSelectedTextType: {
				type: String,
				default: ''
			},
			tagTextSize: {
				type: String,
				default: ''
			},
			tagHeight: {
				type: String,
				default: ''
			},
			tagBorder: {
				type: String,
				default: 'all'
			},
			tagSelectedBorder: {
				type: String,
				default: 'all'
			},
			tagRadius: {
				type: String,
				default: 'base'
			},
			tagSpace: {
				type: String,
				default: '16rpx'
			},
			textStyle: {
				type: String,
				default: ''
			},
			selectedTextStyle: {
				type: String,
				default: ''
			},
			disabledTextStyle: {
				type: String,
				default: ''
			},
			// width/height等可以在这里设置
			tagStyle: {
				type: String,
				default: ''
			},
			selectedTagStyle: {
				type: String,
				default: ''
			},
			disabledTagStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			tl() {
				return this.textLabel || 'title'
			},
			vl() {
				return this.valueLabel || 'value'
			},
			dl() {
				return this.disabledLabel || 'disabled'
			},
			chunkedItems() {
				if (this.column === 0) {
					return this.updatedItems
				}
				const _length = this.updatedItems.length
				const _array = arrayChunk(this.updatedItems, this.column)
				const mod = _length % this.column
				if (mod !== 0) {
					const _size = Math.ceil(_length / this.column)
					const lastIndex = _size - 1
					for (let i = 0; i < (this.column - mod); i++) {
						_array[lastIndex].push(null)
					}
				}
				return _array
			}
		},
		data() {
			return {
				updatedItems: []
			}
		},
		created() {
			this.toGenerateUpdatedItems()
		},
		watch: {
			updatedTime() {
				this.toGenerateUpdatedItems()
			}
		},
		methods: {
			toUpdateItemCheck(idx) {
				const item = this.updatedItems[idx]
				const isToCheck = !item['myp-checked']
				// > 1 的多选，多选时不让选择
				if (this.limits > 1 && isToCheck) {
					// 这一行代码限制了我们必须绑定v-model，或者必须在外面更新value。否则limits会不起作用
					// 当然，我们可以通过直接从 updatedItems上面来获取已经选择的数目，避免用户没有更新value
					if (this.value && this.value.length >= this.limits) {
						this.$emit("overed")
						return
					}
				}
				// 单选时，选择另外一个，直接取消上一个的选择
				if (this.limits === 1 && isToCheck && this.value.length === 1) {
					this.updatedItems.forEach(item => {
						item['myp-checked'] = false
					})
				}
				if (this.limits === 1 && this.leastOne) {
					item['myp-checked'] = true
				} else {
					item['myp-checked'] = isToCheck
				}
				const _vals = []
				this.updatedItems.forEach(item => {
					if (item['myp-checked']) {
						_vals.push(item[this.vl])
					}
				})
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
					if (that.textLabel) {
						upList.push({
							[that.textLabel]: item[that.textLabel],
							[that.valueLabel]: item[that.valueLabel],
							[that.disabledLabel]: item[that.disabledLabel],
							'myp-checked': flag
						})
					} else {
						upList.push({
							title: item,
							value: item,
							disabled: false,
							'myp-checked': flag
						})
					}
				})
				this.updatedItems = upList
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-tag-group {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
	}
	.myp-item-row {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		flex-wrap: nowrap;
	}
	.myp-item-flex {
		flex: 1;
	}
</style>
