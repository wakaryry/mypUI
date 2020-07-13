<template>
	<view>
		<view v-if="position==='left'&&fixIcon" :class="['myp-search', 'myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius, 'myp-height-'+height, 'myp-search-fix']" :style="boxStyle">
			<view v-if="icon&&icon.length>0" :style="{'margin-right': iconTextSpace}">
				<myp-icon :name="icon" :type="showPlaceholder?placeIconType:iconType" :size="iconSize" :iconStyle="iconStyle"></myp-icon>
			</view>
			<view :class="['myp-search-fix-full', 'myp-height-'+height]" :style="fixBoxStyle">
				<view :class="['myp-search-place']" :style="placeBoxStyle">
					<text :class="['myp-search-place-text', 'myp-color-'+placeType, 'myp-size-'+placeSize]" :style="placeStyle">{{showPlaceholder?placeholder:''}}</text>
				</view>
				<view :class="['myp-search-input', 'myp-height-'+height]" :style="inputBoxStyle">
					<input :value="inputValue" :class="['myp-search-input-input', 'myp-color-'+valueType, 'myp-size-'+valueSize]" :style="inputStyle" @input="toInput" @confirm="toConfirm" />
				</view>
			</view>
			<slot name="extra"></slot>
		</view>
		<view v-else :class="['myp-search', 'myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius, 'myp-height-'+height]" :style="mrBoxStyle">
			<view :class="['myp-search-place', 'myp-search-place-'+position]" :style="mrPlaceBoxStyle">
				<view v-if="showPlaceholder&&icon&&icon.length>0" :style="{'margin-right': iconTextSpace}">
					<myp-icon :name="icon" :type="placeIconType" :size="iconSize" :iconStyle="iconStyle"></myp-icon>
				</view>
				<text :class="['myp-color-'+placeType, 'myp-size-'+placeSize]" :style="placeStyle">{{showPlaceholder?placeholder:''}}</text>
			</view>
			<view :class="['myp-search-input', 'myp-height-'+height]" :style="mrInputBoxStyle">
				<input :value="inputValue" :class="['myp-search-input-input', 'myp-search-input-'+position, 'myp-color-'+valueType, 'myp-size-'+valueSize]" :style="inputStyle" @input="toInput" @confirm="toConfirm" />
			</view>
			<slot name="extra"></slot>
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
				default: 'text'
			},
			placeIconType: {
				type: String,
				default: 'place'
			},
			iconType: {
				type: String,
				default: 'text'
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
			space: {
				type: String,
				default: '32rpx'
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
				default: 'padding-left:32rpx;padding-right:32rpx;'
			},
			fixBoxStyle: {
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
			},
			placeBoxStyle: {
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
			showPlaceholder() {
				return !this.inputValue || this.inputValue.length === 0
			},
			mrBoxStyle() {
				return `padding-left:${this.space};padding-right:${this.space};` + this.boxStyle
			},
			mrInputBoxStyle() {
				return `padding-left:${this.space};padding-right:${this.space};` + this.inputBoxStyle
			},
			mrPlaceBoxStyle() {
				return `padding-left:${this.space};padding-right:${this.space};` + this.placeBoxStyle
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
		
		&-fix {
			flex-direction: row;
			align-items: center;
			
			&-full {
				flex: 1;
				position: relative;
			}
		}
		&-place {
			flex-direction: row;
			align-items: center;
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			
			&-text {
				flex: 1;
			}
			&-left {
				justify-content: flex-start;
			}
			&-center {
				justify-content: center;
			}
		}
		&-input {
			position: absolute;
			flex-direction: row;
			align-items: center;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			
			&-input {
				flex: 1;
			}
			&-left {
				text-align: left;
			}
			
			&-center {
				text-align: center;
			}
		}
	}
</style>
