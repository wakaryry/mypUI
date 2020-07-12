<template>
	<view>
		<view v-if="fixed&&isSeize" :style="{height: seizeHeight + 'px', width: '750rpx'}"></view>
		<view :class="['myp-bg-'+bgType, 'myp-nav-box', fixed&&'myp-nav-fixed']" :style="boxStyle" @tap.stop="toPrevent">
			<view v-if="includeStatus" :style="{width: '750rpx', height: statusHeight + 'px'}"></view>
			<view class="myp-nav-content" :style="mrNavStyle">
				<view :class="['myp-nav-lefts', leftBgType&&('myp-bg-'+leftBgType)]" :style="leftStyle">
					<slot name="left">
						<view v-if="lefts && lefts.length > 0" v-for="(left, idx) in lefts" :key="idx" :class="['myp-nav-lefts-item', left.bgType&&('myp-bg-'+left.bgType)]" :style="leftItemStyle+(left.style||'')" bubble="true" @tap="goLeft(idx)">
							<myp-icon v-if="left.icon" :name="left.icon" :type="left.iconType||itemIconType" :size="left.iconSize||itemIconSize" :iconStyle="itemIconStyle+(left.iconStyle||'')" @iconClicked="goLeft(idx)"></myp-icon>
							<text v-if="left.text" :class="['myp-color-'+(left.textType||itemTextType), 'myp-size-'+(left.textSize||itemTextSize)]" :style="itemTextStyle+(left.textStyle||'')">{{left.text}}</text>
						</view>
					</slot>
				</view>
				<view class="myp-nav-title" :style="centerStyle">
					<slot name="title">
						<text v-if="title" :class="['myp-nav-title-text', 'myp-color-'+titleType, 'myp-size-'+titleSize]" :style="titleStyle" @tap.stop="clickCenter">{{ title }}</text>
						<myp-icon v-if="icon" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" @iconClicked="clickCenter"></myp-icon>
					</slot>
				</view>
				<view :class="['myp-nav-rights', rightBgType&&('myp-bg-'+rightBgType)]" :style="rightStyle">
					<slot name="right">
						<view v-if="rights && rights.length > 0" v-for="(right, idx) in rights" :key="idx" :class="['myp-nav-rights-item', right.bgType&&('myp-bg-'+right.bgType)]" :style="rightItemStyle+(right.style||'')" bubble="true" @tap="goRight(idx)">
							<myp-icon v-if="right.icon" :name="right.icon" :type="right.iconType||itemIconType" :size="right.iconSize||itemIconSize" :iconStyle="itemIconSize+(right.iconStyle||'')" @iconClicked="goRight(idx)"></myp-icon>
							<text v-if="right.text" :class="['myp-color-'+(right.textType||itemTextType), 'myp-size-'+(right.textSize||itemTextSize)]" :style="itemTextStyle+(right.textStyle||'')">{{right.text}}</text>
						</view>
					</slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import windowMixin from '../myp-mixin/windowMixin.js'
	
	export default {
		mixins: [windowMixin],
		props: {
			lefts: {
				type: Array,
				default: ()=>{return []}
			},
			title: {
				type: String,
				default: null
			},
			icon: {
				type: String,
				default: null
			},
			rights: {
				type: Array,
				default: ()=>{return []}
			},
			bgType: {
				type: String,
				default: 'nav'
			},
			titleType: {
				type: String,
				default: 'nav-title'
			},
			titleSize: {
				type: String,
				default: 'nav-title'
			},
			titleStyle: {
				type: String,
				default: ''
			},
			iconType: {
				type: String,
				default: 'nav-title'
			},
			iconSize: {
				type: String,
				default: 'nav-title'
			},
			iconStyle: {
				type: String,
				default: ""
			},
			itemIconType: {
				type: String,
				default: 'nav-icon'
			},
			itemIconSize: {
				type: String,
				default: 'nav-icon'
			},
			itemIconStyle: {
				type: String,
				default: ""
			},
			itemTextType: {
				type: String,
				default: 'nav-item'
			},
			itemTextSize: {
				type: String,
				default: 'nav-item'
			},
			itemTextStyle: {
				type: String,
				default: ''
			},
			height: {
				type: Number,
				default: 44
			},
			includeStatus: {
				type: Boolean,
				default: true
			},
			isSeize: {
				type: Boolean,
				default: true
			},
			fixed: {
				type: Boolean,
				default: true
			},
			// 左侧样式修改，一般修改宽度
			leftStyle: {
				type: String,
				default: ''
			},
			leftBgType: {
				type: String,
				default: ''
			},
			leftItemStyle: {
				type: String,
				default: ''
			},
			// 右侧一般不修改
			rightStyle: {
				type: String,
				default: ''
			},
			rightBgType: {
				type: String,
				default: ''
			},
			rightItemStyle: {
				type: String,
				default: ''
			},
			// 中间一般也是修改宽度
			centerStyle: {
				type: String,
				default: ''
			},
			boxStyle: {
				type: String,
				default: ''
			},
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
					return this.mypGetStatusBarHeight()
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
		&-content {
			flex-direction: row;
			flex-wrap: nowrap;
			align-items: center;
		}
		&-lefts {
			padding-left: 30rpx;
			width: 200rpx;
			flex-direction: row;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: flex-start;
			
			&-item {
				flex-direction: row;
				align-items: center;
			}
		}
		&-title {
			width: 350rpx;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
			
			&-text {
				max-width: 350rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				/* #ifdef APP-NVUE */
				lines: 1;
				/* #endif */
				/* #ifndef APP-NVUE */
				white-space: nowrap;
				/* #endif */
			}
		}
		&-rights {
			padding-right: 30rpx;
			width: 200rpx;
			flex-direction: row;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: flex-end;
			
			&-item {
				flex-direction: row;
				align-items: center;
				flex-wrap: nowrap;
				justify-content: flex-end;
			}
		}
	}
</style>
