<template>
	<view :class="['myp-grid', 'myp-border-'+border, 'myp-radius-'+radius]" :style="boxStyle">
		<view v-for="(rows, idx) in rowArr" class="myp-grid-rows" :style="mrRowStyle" :key="idx">
			<view v-for="(item, index)  in rows" :class="['myp-grid-item', isGrid&&'myp-grid-grid', index !==0 && hasLine && 'myp-grid-item-left', idx !== 0 && hasLine && 'myp-grid-item-top']" :key="index" :style="mrItemStyle+((index===rows.length-1)?mrNoSpaceStyle:'')">
				<myp-grid-item v-if="item" :icon="item[iconLabel]" :text="item[textLabel]" :textType="textType" :textSize="textSize" :iconType="iconType" :iconSize="iconSize" :hover="hover" :isIcon="isIcon" :mode="mode" :iconMode="iconMode" :space="space" :boxStyle="itemBoxStyle" :iconStyle="iconStyle" :iconBoxStyle="iconBoxStyle" :textStyle="textStyle" @itemClicked="clickedItem(idx, index, item)"></myp-grid-item>
				<myp-badge v-if="item.badge" :size="item.badge.size||badgeConfig.size||'12rpx'" :bgType="item.badge.bgType||badgeConfig.bgType||'error'" :text="item.badge.text||''" :border="item.badge.border||badgeConfig.border||'none'" :textType="item.badge.textType||badgeConfig.textType||'inverse'" :textSize="item.badge.textSize||badgeConfig.textSize||'ss'" :textStyle="item.badge.textStyle||badgeConfig.textStyle||''" :boxStyle="item.badge.boxStyle||badgeConfig.boxStyle||''"></myp-badge>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			items: {
				type: Array,
				default: ()=>{return []}
			},
			flex: {
				type: String,
				default: 'grid'
			},
			// itemWidth只有当flex不是grid的时候起效
			itemWidth: {
				type: String,
				default: ''
			},
			// itemSpace只有当flex不是grid的时候有效
			itemSpace: {
				type: String,
				default: ''
			},
			mode: {
				type: String,
				default: 'top'
			},
			columns: {
				type: Number,
				default: 4
			},
			// 不是scss中的height。因为这个有可能很高，自定义的比较合适
			itemHeight: {
				type: String,
				default: ''
			},
			hasLine: {
				type: Boolean,
				default: true
			},
			space: {
				type: String,
				default: '12rpx'
			},
			textType: {
				type: String,
				default: ''
			},
			textSize: {
				type: String,
				default: ''
			},
			iconType: {
				type: String,
				default: ''
			},
			iconSize: {
				type: String,
				default: 'll'
			},
			border: {
				type: String,
				default: 'all'
			},
			radius: {
				type: String,
				default: 'base'
			},
			hover: {
				type: String,
				default: 'opacity'
			},
			iconLabel: {
				type: String,
				default: 'icon'
			},
			textLabel: {
				type: String,
				default: 'text'
			},
			isIcon: {
				type: Boolean,
				default: true
			},
			// icon为图片时的mode
			iconMode: {
				type: String,
				default: 'aspectFill'
			},
			badgeConfig: {
				type: Object,
				default: ()=>{
					return {}
				}
			},
			boxStyle: {
				type: String,
				default: ''
			},
			itemBoxStyle: {
				type: String,
				default: ''
			},
			iconStyle: {
				type: String,
				default: ''
			},
			iconBoxStyle: {
				type: String,
				default: ''
			},
			textStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			isGrid() {
				return this.flex === 'grid'
			},
			rowArr() {
			  const rowArr = []
			  let rowCount = 0
			  this.items.forEach((item, index) => {
			    rowCount = Math.floor(index / this.columns)
			    if (!rowArr[rowCount]) {
			      rowArr[rowCount] = []
			    }
			    rowArr[rowCount].push(item)
			  })
			  if (rowArr.length > 0) {
				  while (rowArr[rowCount].length !== this.columns) {
				    rowArr[rowCount].push(false)
				  }
			  }
			  return rowArr
			},
			mrRowStyle() {
				if (this.isGrid) {
					return ''
				}
				return `justify-content:${this.flex};`
			},
			mrItemStyle() {
				if (this.isGrid) {
					return this.itemHeight ? ("height:" + this.itemHeight + ';') : ''
				}
				let _style = this.itemHeight ? ("height:" + this.itemHeight + ';') : ''
				if (this.itemWidth && this.itemWidth.length > 0) {
					_style += `width:${this.itemWidth};`
				}
				if (this.itemSpace && this.itemSpace.length > 0) {
					_style += `margin-right:${this.itemSpace};`
				}
				return _style
			},
			mrNoSpaceStyle() {
				if (this.isGrid) {
					return ''
				}
				if (this.itemSpace && this.itemSpace.length > 0) {
					return 'margin-right:0;'
				}
				return ''
			}
		},
		methods: {
			clickedItem(row, column, item) {
				this.$emit("selected", {
					row: row,
					column: column,
					item: item
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../mypui.scss';
	
	.myp-grid {
		flex-direction: column;
		&-rows {
			flex-direction: row;
			flex-wrap: nowrap;
		}
		&-grid {
			flex: 1;
		}
		&-item {
			justify-content: center;
			align-items: center;
			position: relative;
			
			&-left {
				border-left-color: $myp-border-color;
				border-left-width: 1px;
				border-left-style: solid;
			}
			&-top {
				border-top-color: $myp-border-color;
				border-top-width: 1px;
				border-top-style: solid;
			}
		}
	}
</style>
