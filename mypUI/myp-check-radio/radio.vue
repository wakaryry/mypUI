<template>
	<view :class="flex === 'row' ? 'myp-row-radio' : 'myp-column-radio'" :style="boxStyle">
		<view v-for="(item, idx) in updatedItems" :key="idx" :class="['myp-radios-item', 'myp-height-'+height, 'myp-border-'+itemBorder, 'myp-radius-'+itemRadius]" :style="'margin-right:'+((flex==='column'&&idx !== updatedItems.length-1) ? itemSpace : '0')+';'+itemBoxStyle">
			<view style="flex: 1;">
				<myp-radio-item :titleType="titleType" :checkedTitleType="checkedTitleType" :disabledTitleType="disabledTitleType" :iconType="iconType" :checkedIconType="checkedIconType" :disabledIconType="disabledIconType" :titleSize="titleSize" :space="iconTitleSpace" :iconSize="iconSize" :boxStyle="itemStyle" :iconStyle="iconStyle" :checkedIconStyle="checkedIconStyle" :disabledIconStyle="disabledIconStyle" :titleStyle="titleStyle" :checkedTitleStyle="checkedTitleStyle" :disabledTitleStyle="disabledTitleStyle" :mode="mode" :direction="direction" :title="item[tl]" :value="item[vl]" :disabled="disabled || item[dl]" :checked="item['myp-checked']" :isBetween="isBetween" @radioClicked="toUpdateItemCheck(idx)"></myp-radio-item>
			</view>
		</view>
	</view>
</template>

<script>
	// TODO:
	// 后期会利用 provide/inject 实现，这样可以自定义每一个 item/option 的样式
	// 单选
	import mypRadioItem from '@/mypUI/myp-check-radio/item.vue'
	export default {
		components: {
			mypRadioItem
		},
		props: {
			// radio/radio-fill/circle-check/box-check/circle-fill-check/box-fill-check/check/custom
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
				type: [String, Number, Object],
				default: ''
			},
			// we do not calculate disabled via value, just set by user
			disabled: {
				type: Boolean,
				default: false
			},
			titleLabel: {
				type: String,
				default: ''
			},
			valueLabel: {
				type: String,
				default: ''
			},
			disabledLabel: {
				type: String,
				default: ''
			},
			boxStyle: {
				type: String,
				default: ''
			},
			itemBoxStyle: {
				type: String,
				default: ''
			},
			itemBorder: {
				type: String,
				default: 'none'
			},
			itemRadius: {
				type: String,
				default: 'none'
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
			updatedItems() {
				const upList = []
				const that = this
				let hasChecked = false
				let checkedIdx = -1
				// 只是为了value改变也会触发updatedItems重新计算
				if (this.value) {}
				this.items && this.items.forEach((item, i) => {
					// judge if checked
					if (!hasChecked) {
						if (that.value !== '') {
							const itemValue = that.valueLabel ? item[that.valueLabel] : item
							if (that.value === itemValue) {
								hasChecked = true
								checkedIdx = i
							}
						}
					}
					if (that.titleLabel) {
						upList.push({
							[that.titleLabel]: item[that.titleLabel],
							[that.valueLabel]: item[that.valueLabel],
							[that.disabledLabel]: item[that.disabledLabel],
							'myp-checked': checkedIdx === i
						})
					} else {
						upList.push({
							title: item,
							value: item,
							disabled: false,
							'myp-checked': checkedIdx === i
						})
					}
				})
				return upList
			},
			tl() {
				return this.titleLabel || 'title'
			},
			vl() {
				return this.valueLabel || 'value'
			},
			dl() {
				return this.disabledLabel || 'disabled'
			}
		},
		data() {
			return {
			}
		},
		methods: {
			toUpdateItemCheck(idx) {
				const item = this.items[idx]
				// just for v-model
				this.$emit("input", this.valueLabel ? item[this.valueLabel] : item)
				this.$emit("change", item)
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
