<template>
	<view :class="['myp-seg', 'myp-border-'+border, 'myp-border-color-'+(type&&type.length>0?type:'text'), 'myp-radius-'+radius]" :style="boxStyle">
		<view v-for="(item, idx) in items" :class="['myp-seg-item', 'myp-height-'+height, 'myp-bg-'+(idx===current?(type&&type.length>0?type:'text'):''), 'myp-border-color-'+(type&&type.length>0?type:'text'), idx===0 && 'myp-seg-item-noborder']" :key="idx" :style="mrItemStyle + (idx===current ? mrItemCurrentStyle : '')" @tap="toClickItem(idx)">
			<text :class="['myp-size-'+size, 'myp-color-'+(idx===current?'inverse':'')]" :style="textStyle + (idx===current ? activeTextStyle : '')">{{titleLabel ? item[titleLabel] : item}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// current index
			value: {
				type: Number,
				default: 0
			},
			items: {
				type: Array,
				default: ()=>{return []}
			},
			type: {
				type: String,
				default: ''
			},
			size: {
				type: String,
				default: ''
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
				default: 'l'
			},
			titleLabel: {
				type: String,
				default: null
			},
			// 分割线的颜色
			splitColor: {
				type: String,
				default: ""
			},
			// 每一段的背景色
			bg: {
				type: String,
				default: ""
			},
			// 被选中的背景色
			activeBg: {
				type: String,
				default: ""
			},
			// 文字样式
			textStyle: {
				type: String,
				default: ''
			},
			// 选中时文字样式
			activeTextStyle: {
				type: String,
				default: ''
			},
			// 整个分段器的样式，背景色不在这里设置，可以设置外部的border的样式
			boxStyle: {
				type: String,
				default: ''
			},
			// custom height
			itemStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			mrItemStyle() {
				let _style = ''
				if (this.bg && this.bg.length > 0) {
					_style += `background-color:${this.bg};`
				}
				if (this.splitColor && this.splitColor.length > 0) {
					_style += `border-left-color:${this.splitColor};`
				}
				return _style + this.itemStyle
			},
			mrItemCurrentStyle() {
				if (this.activeBg && this.activeBg.length > 0) {
					return `background-color:${this.activeBg};`
				}
				return ''
			}
		},
		data() {
			return {
				// 我们需要提供一个current，因为如果用户并不使用v-model，而且value值也不随着点击事件而改变，
				// 也就是说如果用户不提供value或者不更新value，用户的点击会无法触发样式的变化，因为value没有变。
				// 所以内部提供一个current来响应
				current: this.value
			}
		},
		watch: {
			value(newV) {
				this.current = newV
			}
		},
		methods: {
			toClickItem(idx) {
				this.current = idx
				this.$emit("input", idx)
				this.$emit("change", idx)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.myp-seg {
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		
		&-item {
			flex: 1;
			justify-content: center;
			align-items: center;
			border-left-style: solid;
			border-left-width: 1px;
			
			&-noborder {
				// border-left-width: 0;
				border-left-color: transparent;
			}
		}
	}
</style>
