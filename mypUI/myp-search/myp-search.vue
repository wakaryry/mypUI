<template>
	<view :class="['myp-search', 'myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius]" :style="mrBoxStyle">
		<view v-if="position==='left'&&fixIcon" :class="['myp-height-'+height, 'myp-search-flex-row']">
			<view v-if="icon&&icon.length>0" :style="{'margin-right': iconTextSpace}">
				<myp-icon :name="icon" :type="mrFixedIconType" :size="iconSize" :iconStyle="iconStyle"></myp-icon>
			</view>
			<view class="myp-search-flex-full">
				<view v-if="showPlaceholder" :class="['myp-search-place']">
					<text :class="['myp-color-'+mrPlaceType, 'myp-size-'+placeSize]" :style="placeStyle">{{placeholder}}</text>
				</view>
				<view :class="['myp-search-input-box', 'myp-height-'+height]" :style="inputBoxStyle">
					<input :value="inputValue" :class="['myp-search-input', 'myp-color-'+mrValueType, 'myp-size-'+valueSize]" :style="inputStyle" @input="toInput" @confirm="toConfirm" />
				</view>
			</view>
		</view>
		<view v-else :class="['myp-height-'+height]">
			<view v-if="showPlaceholder" :class="['myp-search-place', 'myp-search-place-'+position]">
				<view v-if="icon&&icon.length>0" :style="{'margin-right': iconTextSpace}">
					<myp-icon :name="icon" :type="mrIconType" :size="iconSize" :iconStyle="iconStyle"></myp-icon>
				</view>
				<text :class="['myp-color-'+mrPlaceType, 'myp-size-'+placeSize]" :style="placeStyle">{{placeholder}}</text>
			</view>
			<view :class="['myp-search-input-box', 'myp-height-'+height]" :style="inputBoxStyle">
				<input :value="inputValue" :class="['myp-search-input', 'myp-search-input-'+position, 'myp-color-'+mrValueType, 'myp-size-'+valueSize]" :style="inputStyle" @input="toInput" @confirm="toConfirm" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			icon: {
				type: String,
				default: 'search'
			},
			placeholder: {
				type: String,
				default: "输入内容开始搜索"
			},
			// left/center
			position: {
				type: String,
				default: 'left'
			},
			// position left 时可以将icon固定在左侧
			fixIcon: {
				type: Boolean,
				default: false
			},
			// 只是占位，没有输入框
			isToken: {
				type: Boolean,
				default: false
			},
			space: {
				type: String,
				default: '32rpx'
			},
			iconTextSpace: {
				type: String,
				default: '12rpx'
			},
			bgType: {
				type: String,
				default: ''
			},
			valueType: {
				type: String,
				default: ''
			},
			iconType: {
				type: String,
				default: 'place'
			},
			placeType: {
				type: String,
				default: 'place'
			},
			height: {
				type: String,
				default: 'base'
			},
			border: {
				type: String,
				default: 'all'
			},
			radius: {
				type: String,
				default: 'll'
			},
			valueSize: {
				type: String,
				default: ''
			},
			iconSize: {
				type: String,
				default: 'l'
			},
			placeSize: {
				type: String,
				default: ''
			},
			boxStyle: {
				type: String,
				default: ''
			},
			iconStyle: {
				type: String,
				default: ''
			},
			placeStyle: {
				type: String,
				default: ''
			},
			inputBoxStyle: {
				type: String,
				default: ''
			},
			inputStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				inputValue: this.value
			}
		},
		computed: {
			mrValueType() {
				if (this.valueType && this.valueType.length > 0) {
					return this.valueType
				}
				return this.bgType && this.bgType.length > 0 ? 'inverse' : 'text'
			},
			mrPlaceType() {
				if (this.placeType && this.placeType.length > 0) {
					return this.placeType
				}
				return this.bgType && this.bgType.length > 0 ? 'inverse' : 'place'
			},
			mrIconType() {
				if (this.iconType && this.iconType.length > 0) {
					return this.iconType
				}
				return this.bgType && this.bgType.length > 0 ? 'inverse' : 'place'
			},
			mrFixedIconType() {
				if (this.showPlaceholder) {
					if (this.iconType && this.iconType.length > 0) {
						return this.iconType
					}
					return this.mrPlaceType
				}
				return this.mrValueType
			},
			showPlaceholder() {
				return !this.inputValue || this.inputValue.length === 0
			},
			mrBoxStyle() {
				let _style = `padding-left:${this.space};padding-right:${this.space};`
				return _style + this.boxStyle
			}
		},
		watch: {
			value(newV) {
				this.inputValue = newV
			}
		},
		methods: {
			toInput(e) {
				this.inputValue = e.detail.value
				this.$emit("input", e.detail.value)
			},
			toConfirm(e) {
				this.$emit("confirm", e.detail.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../base.scss';
	
	.myp-search {
		position: relative;
		
		&-flex-full {
			flex: 1;
		}
		
		&-flex-row {
			flex-direction: row;
			align-items: center;
		}
		
		&-place {
			flex-direction: row;
			align-items: center;
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
		
			&-left {
				justify-content: flex-start;
			}
			&-center {
				justify-content: center;
			}
		}
		
		&-input-box {
			flex-direction: row;
			flex: 1;
			align-items: center;
		}
		
		&-input {
			flex: 1;
			
			&-left {
				text-align: left;
			}
			
			&-center {
				text-align: center;
			}
		}
	}
</style>
