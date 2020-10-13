<template>
	<view :style="boxStyle">
		<view v-if="fixed&&isSeize" :style="{height: seizeHeight + 'px', width: '750rpx'}"></view>
		<view :class="['myp-bg-'+bgType, 'myp-border-'+border, 'myp-nav-box', fixed&&'myp-nav-fixed']" :style="statusNavStyle" @tap.stop="toPrevent">
			<view v-if="includeStatus" :style="{width: '750rpx', height: statusHeight + 'px'}"></view>
			<view class="myp-flex-row myp-wrap-nowrap myp-align-center" :style="mrNavStyle">
				<view :class="['myp-flex-row', 'myp-wrap-nowrap', 'myp-justify-start', 'myp-align-center', 'myp-nav-lefts', leftBgType&&('myp-bg-'+leftBgType)]" :style="leftStyle">
					<slot name="left">
						<view v-if="lefts && lefts.length > 0" v-for="(left, idx) in lefts" :key="idx" :class="['myp-flex-row', 'myp-align-center', left.bgType&&('myp-bg-'+left.bgType)]" :style="leftItemStyle+(left.style||'')" bubble="true" @tap="goLeft(idx)">
							<myp-icon v-if="left.icon" :name="left.icon" :type="left.iconType||itemIconType" :size="left.iconSize||itemIconSize" :iconStyle="itemIconStyle+(left.iconStyle||'')" @iconClicked="goLeft(idx)"></myp-icon>
							<text v-if="left.text" :class="['myp-color-'+(left.textType||itemTextType), 'myp-size-'+(left.textSize||itemTextSize)]" :style="itemTextStyle+(left.textStyle||'')">{{left.text}}</text>
						</view>
					</slot>
				</view>
				<view class="myp-flex-row myp-wrap-nowrap myp-align-center myp-justify-center myp-nav-title" :style="centerStyle">
					<slot name="title">
						<text v-if="title" :class="['myp-lines-one', 'myp-nav-title-text', 'myp-color-'+titleType, 'myp-size-'+titleSize]" :style="titleStyle" @tap.stop="clickCenter">{{ title }}</text>
						<myp-icon v-if="icon" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" @iconClicked="clickCenter"></myp-icon>
					</slot>
				</view>
				<view :class="['myp-flex-row', 'myp-align-center', 'myp-wrap-nowrap', 'myp-justify-end', 'myp-nav-rights', rightBgType&&('myp-bg-'+rightBgType)]" :style="rightStyle">
					<slot name="right">
						<view v-if="rights && rights.length > 0" v-for="(right, idx) in rights" :key="idx" :class="['myp-flex-row', 'myp-align-center', 'myp-wrap-nowrap', 'myp-justify-end', right.bgType&&('myp-bg-'+right.bgType)]" :style="rightItemStyle+(right.style||'')" bubble="true" @tap="goRight(idx)">
							<myp-icon v-if="right.icon" :name="right.icon" :type="right.iconType||itemIconType" :size="right.iconSize||itemIconSize" :iconStyle="itemIconStyle+(right.iconStyle||'')" @iconClicked="goRight(idx)"></myp-icon>
							<text v-if="right.text" :class="['myp-color-'+(right.textType||itemTextType), 'myp-size-'+(right.textSize||itemTextSize)]" :style="itemTextStyle+(right.textStyle||'')">{{right.text}}</text>
						</view>
					</slot>
				</view>
			</view>
			<slot name="extra"></slot>
		</view>
	</view>
</template>

<script>
	import {getStatusBarHeight} from '../utils/system.js'
	
	export default {
		props: {
			/**
			 * 左侧item集
			 */
			lefts: {
				type: Array,
				default: ()=>{return []}
			},
			/**
			 * 标题
			 */
			title: {
				type: String,
				default: null
			},
			/**
			 * 标题右侧图标
			 */
			icon: {
				type: String,
				default: null
			},
			/**
			 * 右侧item集
			 */
			rights: {
				type: Array,
				default: ()=>{return []}
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: 'nav'
			},
			/**
			 * 边框主题
			 */
			border: {
				type: String,
				default: 'none'
			},
			/**
			 * 标题颜色主题
			 */
			titleType: {
				type: String,
				default: 'nav-title'
			},
			/**
			 * 标题尺寸主题
			 */
			titleSize: {
				type: String,
				default: 'nav-title'
			},
			/**
			 * 标题样式
			 */
			titleStyle: {
				type: String,
				default: ''
			},
			/**
			 * 标题图标颜色主题
			 */
			iconType: {
				type: String,
				default: 'nav-title'
			},
			/**
			 * 标题图标尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'nav-title'
			},
			/**
			 * 标题图标样式
			 */
			iconStyle: {
				type: String,
				default: ""
			},
			/**
			 * item图标颜色主题
			 */
			itemIconType: {
				type: String,
				default: 'nav-icon'
			},
			/**
			 * item图标尺寸主题
			 */
			itemIconSize: {
				type: String,
				default: 'nav-icon'
			},
			/**
			 * item图标样式
			 */
			itemIconStyle: {
				type: String,
				default: ""
			},
			/**
			 * item文字颜色主题
			 */
			itemTextType: {
				type: String,
				default: 'nav-item'
			},
			/**
			 * item文字尺寸主题
			 */
			itemTextSize: {
				type: String,
				default: 'nav-item'
			},
			/**
			 * item文字样式
			 */
			itemTextStyle: {
				type: String,
				default: ''
			},
			/**
			 * 自定义px高度
			 */
			height: {
				type: Number,
				default: 44
			},
			/**
			 * 是否包含状态栏
			 */
			includeStatus: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否占位
			 */
			isSeize: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否fixed定位
			 */
			fixed: {
				type: Boolean,
				default: true
			},
			/**
			 * lefts整体样式
			 */
			leftStyle: {
				type: String,
				default: ''
			},
			/**
			 * lefts整体的背景主题
			 */
			leftBgType: {
				type: String,
				default: ''
			},
			/**
			 * lefts中item的样式
			 */
			leftItemStyle: {
				type: String,
				default: ''
			},
			/**
			 * rights整体样式
			 */
			rightStyle: {
				type: String,
				default: ''
			},
			/**
			 * rights整体背景主题
			 */
			rightBgType: {
				type: String,
				default: ''
			},
			/**
			 * rights中item的样式
			 */
			rightItemStyle: {
				type: String,
				default: ''
			},
			/**
			 * 中间title外层的样式
			 */
			centerStyle: {
				type: String,
				default: ''
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * status与nav的外层样式
			 */
			statusNavStyle: {
				type: String,
				default: ''
			},
			/**
			 * nav的外层样式
			 */
			navStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
			}
		},
		computed: {
			statusHeight() {
				if (this.includeStatus) {
					return getStatusBarHeight()
				}
				return 0
			},
			seizeHeight() {
				return this.statusHeight + this.height
			},
			mrNavStyle() {
				let _style = "height:" + this.height + 'px;'
				_style += this.navStyle
				return _style
			}
		},
		methods: {
			goLeft(i) {
				this.$emit("leftAction", i)
			},
			clickCenter(e) {
				e && e.stopPropagation && e.stopPropagation()
				this.$emit("centerAction")
			},
			goRight(i) {
				this.$emit("rightAction", i)
			},
			toPrevent(e) {
				e && e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-nav {
		&-box {
			width: 750rpx;
			left: 0;
			top: 0;
		}
		&-fixed {
			position: fixed;
		}
		&-lefts {
			padding-left: 30rpx;
			width: 200rpx;
		}
		&-title {
			width: 350rpx;
			
			&-text {
				max-width: 350rpx;
			}
		}
		&-rights {
			padding-right: 30rpx;
			width: 200rpx;
		}
	}
</style>
