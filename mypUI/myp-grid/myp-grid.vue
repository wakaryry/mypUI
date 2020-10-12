<template>
	<view :class="['myp-grid', 'myp-border-'+border, 'myp-radius-'+radius]" :style="boxStyle">
		<view v-for="(rows, idx) in rowArr" class="myp-grid-rows" :style="mrRowStyle" :key="idx">
			<view v-for="(item, index)  in rows" :class="['myp-grid-item', isGrid&&'myp-grid-grid', index !==0 && hasLine && 'myp-grid-item-left', idx !== 0 && hasLine && 'myp-grid-item-top']" :key="index" :style="mrItemStyle+((index===rows.length-1)?mrNoSpaceStyle:'')">
				<myp-grid-item v-if="item" :icon="item[iconLabel]" :text="item[textLabel]" :textType="textType" :textSize="textSize" :iconType="iconType" :iconSize="iconSize" :hover="hover" :isIcon="isIcon" :mode="mode" :space="space" :boxStyle="itemBoxStyle" :iconStyle="iconStyle" :iconBoxStyle="iconBoxStyle" :textStyle="textStyle" @itemClicked="clickedItem(idx, index, item)"></myp-grid-item>
				<myp-badge v-if="item.badge" :size="item.badge.size||badgeConfig.size||'12rpx'" :bgType="item.badge.bgType||badgeConfig.bgType||'error'" :text="item.badge.text||''" :border="item.badge.border||badgeConfig.border||'none'" :textType="item.badge.textType||badgeConfig.textType||'inverse'" :textSize="item.badge.textSize||badgeConfig.textSize||'ss'" :textStyle="item.badge.textStyle||badgeConfig.textStyle||''" :boxStyle="item.badge.boxStyle||badgeConfig.boxStyle||''"></myp-badge>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			/**
			 * 数据源
			 */
			items: {
				type: Array,
				default: ()=>{return []}
			},
			/**
			 * 布局方式，除开grid值外，还可以选择justify-content的值
			 */
			flex: {
				type: String,
				default: 'grid'
			},
			/**
			 * item的宽度，只有当flex不是grid的时候起效
			 */
			itemWidth: {
				type: String,
				default: ''
			},
			/**
			 * item之间的间隙，只有当flex不是grid的时候有效
			 */
			itemSpace: {
				type: String,
				default: ''
			},
			/**
			 * grid-item的布局方式
			 */
			mode: {
				type: String,
				default: 'top'
			},
			/**
			 * 每一行的数量
			 */
			columns: {
				type: Number,
				default: 4
			},
			/**
			 * 自定义的高度
			 */
			itemHeight: {
				type: String,
				default: ''
			},
			/**
			 * 是否带有分割线
			 */
			hasLine: {
				type: Boolean,
				default: true
			},
			/**
			 * grid-item的space
			 */
			space: {
				type: String,
				default: '12rpx'
			},
			/**
			 * item的文字颜色主题
			 */
			textType: {
				type: String,
				default: ''
			},
			/**
			 * item的文字尺寸主题
			 */
			textSize: {
				type: String,
				default: ''
			},
			/**
			 * item的图标颜色主题
			 */
			iconType: {
				type: String,
				default: ''
			},
			/**
			 * item的图标尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'll'
			},
			/**
			 * 边框主题
			 */
			border: {
				type: String,
				default: 'all'
			},
			/**
			 * 圆角主题
			 */
			radius: {
				type: String,
				default: 'base'
			},
			/**
			 * hover主题
			 */
			hover: {
				type: String,
				default: 'opacity'
			},
			/**
			 * item的icon字段
			 */
			iconLabel: {
				type: String,
				default: 'icon'
			},
			/**
			 * item的text字段
			 */
			textLabel: {
				type: String,
				default: 'text'
			},
			/**
			 * item的icon是否是图标
			 */
			isIcon: {
				type: Boolean,
				default: true
			},
			/**
			 * badge样式的全局配置
			 */
			badgeConfig: {
				type: Object,
				default: ()=>{
					return {}
				}
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * item的外层样式
			 */
			itemBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 图标样式
			 */
			iconStyle: {
				type: String,
				default: ''
			},
			/**
			 * 图标的外层样式
			 */
			iconBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 文字样式
			 */
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
				this.$emit("itemClicked", {
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
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: column;
		
		&-rows {
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
			flex-wrap: nowrap;
		}
		&-grid {
			flex: 1;
		}
		&-item {
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
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
