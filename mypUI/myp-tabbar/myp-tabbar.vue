<template>
	<view class="myp-tab-page" :style="{top: topPx+'px'}">
		<view class="myp-tab-page-container" ref="tab-container" :style="mrTabContainerStyle+noWeexTransform">
			<slot></slot>
		</view>
		<slot name="tabs">
			<view v-if="tabStyle.image" class="myp-tabs-img" :style="mrTabsImageBoxStyle">
				<image :src="tabStyle.image" :style="tabStyle.imageStyle" mode="aspectFill"></image>
			</view>
			<view class="myp-tabs" :style="mrTabsBoxStyle">
				<view bubble="true" class="myp-tabs-item" v-for="(item, idx) in tabs" :key="idx" :ref="'myp-tab-'+idx" :style="mrItemStyle" @tap="setPage(idx)">
					<view v-if="!item.isHump" class="myp-tabs-item-icon" :style="'width:'+(item.iconBoxWidth||mrIconWidth)+';'">
						<myp-icon :name="currentPage===idx?(item.selectedIcon || item.icon):item.icon" :iconStyle="currentPage===idx?((tabStyle.selectedIconStyle||'')+(item.selectedIconStyle||'')):((tabStyle.iconStyle||'')+(item.iconStyle||''))" @iconClicked="setPage(idx)"></myp-icon>
						<view v-if="item.badge" class="myp-tabs-item-badge" :style="(tabStyle.badgeStyle||'')+(item.badgeStyle||'')">
							<text class="myp-tabs-item-badge-text" :style="(tabStyle.badgeTextStyle||'')+(item.badgeTextStyle||'')">{{item.badge}}</text>
						</view>
						<view v-if="item.dot && !item.badge" class="myp-tabs-item-dot" :style="(tabStyle.dotStyle||'')+(item.dotStyle||'')"></view>
					</view>
					<text v-if="!item.isHump" :class="['myp-tabs-item-text', currentPage===idx&&'myp-tabs-item-text-selected']" :style="currentPage===idx?((tabStyle.selectedTitleStyle||'')+(item.selectedTitleStyle||'')):((tabStyle.titleStyle||'')+(item.titleStyle||''))">{{currentPage===idx ? item.selectedTitle : item.title}}</text>
				</view>
			</view>
			<!-- hump -->
			<view bubble="true" v-if="hasHump" class="myp-tabs-item-hump" :style="mrHumpStyle||''" @tap="setPage(humpIndex)">
				<view class="myp-tabs-item-icon" :style="'width:'+(humpItem.iconBoxWidth||mrIconWidth)+';'">
					<myp-icon :name="currentPage===humpIndex?(humpItem.selectedIcon || humpItem.icon):humpItem.icon" :iconStyle="currentPage===humpIndex?((tabStyle.selectedIconStyle||'')+(humpItem.selectedIconStyle||'')):((tabStyle.iconStyle||'')+(humpItem.iconStyle||''))" @iconClicked="setPage(humpIndex)"></myp-icon>
					<view v-if="humpItem.badge" class="myp-tabs-item-badge" :style="(tabStyle.badgeStyle||'')+(humpItem.badgeStyle||'')">
						<text class="myp-tabs-item-badge-text" :style="(tabStyle.badgeTextStyle||'')+(humpItem.badgeTextStyle||'')">{{humpItem.badge}}</text>
					</view>
					<view v-if="humpItem.dot && !humpItem.badge" class="myp-tabs-item-dot" :style="(tabStyle.dotStyle||'')+(humpItem.dotStyle||'')"></view>
				</view>
				<text v-if="humpItem.title" :class="['myp-tabs-item-text', currentPage===humpIndex&&'myp-tabs-item-text-selected']" :style="currentPage===humpIndex?((tabStyle.selectedTitleStyle||'')+(humpItem.selectedTitleStyle||'')):((tabStyle.titleStyle||'')+(humpItem.titleStyle||''))">{{currentPage===humpIndex ? humpItem.selectedTitle : humpItem.title}}</text>
			</view>
		</slot>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = weex.requireModule('animation');
	// #endif
	
	import xBarMixin from '../myp-mixin/xBarMixin.js'
	import pxMixin from '../myp-mixin/pxMixin.js'

	export default {
		mixins: [xBarMixin, pxMixin],
		props: {
			// 可以为每一个tab单独设置
			// isHump 表示是否凸起, noPage 表示点击当前tab时不切换，依然停留在原tab内容, hump具备humpStyle,hump有humpBottom(就是距离底部的距离px)
			// icon,selectedIcon,title,selectedTitle,badge,dot,isHump,noPage,humpStyle,humpBottom
			// iconStyle,selectedIconStyle,titleStyle,selectedTitleStyle,badgeStyle,badgeTextStyle,dotStyle,iconBoxWidth
			tabs: {
				type: Array,
				default: () => ([])
			},
			// global tabs set
			tabStyle: {
				type: Object,
				default: ()=>{
					return {
						iconStyle: 'font-size: 20px;color: #333232;',
						selectedIconStyle: 'font-size: 20px;color: #01A9F0;',
						titleStyle: '',
						selectedTitleStyle: '',
						boxStyle: '',
						itemStyle: '',
						height: 50,  // px
						badgeStyle: '',
						badgeTextStyle: '',
						dotStyle: '',
						// we use it to help to position the badge or dot
						iconBoxWidth: '46px',
						image: null,
						imageStyle: '',
						imageBoxStyle: '',
					}
				}
			},
			// 高度计算时是否包含statusBar
			includeStatus: {
				type: Boolean,
				default: true
			},
			includeNav: {
				type: Boolean,
				default: true
			},
			duration: {
				type: [Number, String],
				default: 300
			},
			timingFunction: {
				type: String,
				default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
			},
			top: {
				type: [Number, String],
				default: 0
			}
		},
		data: () => ({
			currentPage: 0,
			noWeexTransform: '',
			defaultTabHeight: 50,  // px
			defaultIconBoxWidth: '46px'
		}),
		computed: {
			containerHeight() {
				let _height = this.mypGetScreenHeight()
				if (_height === 0) {
					// try again
					_height = this.mypGetScreenHeight()
				}
				if (_height === 0) {
					return 0
				}
				const xBarHeight = this.includeXBar ? this.mypGetXBarHeight() : 0
				return _height - this.tabHeightPx - xBarHeight - this.topPx
			},
			mrHumpStyle() {
				if (!this.humpItem) return '';
				let btm = this.humpItem.humpBottom || 12
				btm += this.mypGetXBarHeight()
				const style = this.humpItem.humpStyle || ''
				return style + `bottom:${btm}px;`
			},
			hasHump() {
				for (const i in this.tabs) {
					if (this.tabs[i].isHump) {
						return true
					}
				}
				return false
			},
			humpItem() {
				for (const i in this.tabs) {
					if (this.tabs[i].isHump) {
						return this.tabs[i]
					}
				}
				return null
			},
			humpIndex() {
				return parseInt((this.tabs.length - 1) * 0.5)
			},
			noPageIndex() {
				for (const i in this.tabs) {
					if (this.tabs[i].noPage) {
						return i*1
					}
				}
				return -1
			},
			topPx() {
				const st = this.includeStatus ? 0 : this.mypGetStatusBarHeight()
				const nh = this.includeNav ? 0 : this.mypGetNavHeight()
				return this.mypToPx(this.top) + st + nh
			},
			tabHeightPx() {
				if (this.tabStyle && this.tabStyle.height) {
					return this.tabStyle.height // uni.upx2px(this.tabStyle.height)
				}
				return this.defaultTabHeight // uni.upx2px(this.defaultTabHeight)
			},
			mrTabContainerStyle() {
				// 增加多屏下宽度的设置
				// 如果不根据屏数增加宽度，安卓下会不出现内容
				let _length = this.tabs.length || 1
				if (this.noPageIndex >= 0) {
					_length -= 1
				}
				const width = (_length || 1) * 750
				let _style = `width:${width}rpx;`
				return _style + `height:${this.containerHeight}px;`
			},
			mrItemStyle() {
				const _height = this.tabHeightPx
				return (this.tabStyle.itemStyle||'') + `height:${_height}px;`
			},
			mrIconWidth() {
				if (this.tabStyle && this.tabStyle.iconBoxWidth) {
					return this.tabStyle.iconBoxWidth
				}
				return this.defaultIconBoxWidth
			},
			mrTabsBoxStyle() {
				let _style = (this.tabStyle && this.tabStyle.boxStyle) || ''
				_style += `padding-bottom:${this.mypGetXBarHeight()}px;`
				return _style
			},
			mrTabsImageBoxStyle() {
				let _style = (this.tabStyle && this.tabStyle.imageBoxStyle) || ''
				_style += `padding-bottom:${this.mypGetXBarHeight()}px;`
				return _style
			}
		},
		methods: {
			next() {
				let page = this.currentPage;
				if (page < this.tabs.length - 1) {
					page++;
				}
				this.setPage(page);
			},
			prev() {
				let page = this.currentPage;
				if (page > 0) {
					page--;
				}
				this.setPage(page);
			},
			setPage(page, animated = true) {
				if (page === this.noPageIndex) {
					this.$emit('selected', {page})
					return
				}
				this.currentPage = page;
				this._animateTransformX(page, animated);
				this.$emit('selected', {
					page
				});
			},
			_animateTransformX(page, animated) {
				let fakePage = page
				if (this.noPageIndex >= 0) {
					if (page > this.noPageIndex) {
						fakePage -= 1
					}
				}
				const {
					duration,
					timingFunction
				} = this;
				const computedDur = animated ? duration : 0.00001;
				// #ifdef APP-NVUE
				const containerEl = this.$refs[`tab-container`];
				const _w = uni.upx2px(750)
				const dist = fakePage * _w;
				animation.transition(containerEl, {
					styles: {
						transform: `translateX(${-dist}px)`
					},
					duration: computedDur,
					timingFunction,
					delay: 0
				}, () => {});
				// #endif
				// #ifndef APP-NVUE
				const _tx = fakePage * 750 * -1
				this.noWeexTransform = `transition-property:transform;transition-duration:${computedDur}ms;transform:translateX(${_tx}rpx);transition-timing-function:${timingFunction};`
				// #endif
			}
		}
	};
</script>

<style lang="scss" scoped>
	.myp-tab-page {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		
		&-container {
			width: 750rpx;
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
		}
	}

	.myp-tabs {
		width: 750rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		background-color: #FFFFFF;
		
		&-img {
			position: fixed;
			width: 750rpx;
			left: 0;
		}
		
		&-item {
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			flex: 1;
			padding: 5px;
			
			&-hump {
				position: fixed;
				left: 375rpx;
				bottom: 0;
				transform: translateX(-50%);
				/* #ifndef APP-NVUE */
				display: flex;
				box-sizing: border-box;
				/* #endif */
				justify-content: center;
				align-items: center;
			}
			
			&-icon {
				position: relative;
				/* #ifndef APP-NVUE */
				display: flex;
				box-sizing: border-box;
				/* #endif */
				flex-direction: row;
				justify-content: center;
				align-items: center;
			}
			
			&-text {
				font-size: 13px;
				color: #333232;
				
				&-selected {
					color: #01A9F0;
				}
			}
			
			&-badge {
				position: absolute;
				right: 0;
				top: -2px;
				&-text {
					color: #FF0000;
					font-size: 12px;
				}
			}
			
			&-dot {
				position: absolute;
				right: 6px;
				top: 2px;
				width: 6px;
				height: 6px;
				border-radius: 6px;
				background-color: #FF0000;
			}
		}
	}
</style>
