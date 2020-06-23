<template>
	<view>
		<view v-if="fixed&&isSeize" :style="{height: seizeHeight + 'px', width: '750rpx'}"></view>
		<view :class="['myp-bg-'+bgType, 'myp-nav-box', fixed&&'myp-nav-fixed']" :style="boxStyle">
			<view v-if="haveStatus" :style="{width: '750rpx', height: statusHeight + 'px'}"></view>
			<view class="myp-nav-content" :style="mrNavStyle">
				<view class="myp-nav-lefts" :style="leftStyle">
					<slot name="left">
						<block v-if="lefts && lefts.length > 0">
							<view v-for="(left, idx) in lefts" :key="idx" bubble="true" @tap="goLeft(idx)">
								<myp-icon v-if="left.icon" :name="left.icon" :iconStyle="mrActionIconStyle" @iconClicked="goLeft(idx)"></myp-icon>
								<text v-if="left.text" :style="actionTextStyle">{{left.text}}</text>
							</view>
						</block>
					</slot>
				</view>
				<view class="myp-nav-title" :style="centerStyle">
					<slot name="title">
						<text v-if="title" class="myp-nav-title-text" :style="titleStyle" @tap="clickCenter">{{ title }}</text>
						<myp-icon v-if="icon" :name="icon" :iconStyle="mrIconStyle" @iconClicked="clickCenter"></myp-icon>
					</slot>
				</view>
				<!-- 考虑到小程序的胶囊按钮,我们使用左右各30%来占位 -->
				<view class="myp-nav-rights" :style="rightStyle">
					<slot name="right">
						<block v-if="rights && rights.length > 0">
							<view v-for="(right, idx) in rights" :key="idx" bubble="true" @tap="goRight(idx)">
								<myp-icon v-if="right.icon" :name="right.icon" :iconStyle="mrActionIconStyle" @iconClicked="goRight(idx)"></myp-icon>
								<text v-if="right.text" :style="actionTextStyle">{{right.text}}</text>
							</view>
						</block>
					</slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
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
				default: ''
			},
			iconStyle: {
				type: String,
				default: ""
			},
			actionIconStyle: {
				type: String,
				default: ""
			},
			actionTextStyle: {
				type: String,
				default: ''
			},
			height: {
				type: Number,
				default: 44
			},
			haveStatus: {
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
			// 右侧一般不修改
			rightStyle: {
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
			},
			titleStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				statusHeight: 0,
				seizeHeight: 0
			}
		},
		computed: {
			mrActionIconStyle() {
				return 'color:#4C4C4C;font-size:16px;' + this.iconStyle
			},
			mrIconStyle() {
				return 'color:#4C4C4C;font-size:16px;' + this.iconStyle
			},
			mrNavStyle() {
				let _style = "height:" + this.height + 'px;'
				_style += this.navStyle
				return _style
			}
		},
		created() {
			if (!this.haveStatus) {
				return
			}
			const res = uni.getSystemInfoSync()
			if (this.haveStatus) {
				this.statusHeight = res.statusBarHeight
			} else {
				this.statusHeight = 0
			}
			this.seizeHeight = this.statusHeight + this.height
		},
		methods: {
			goLeft(i) {
				this.$emit("leftAction", i)
			},
			clickCenter() {
				this.$emit("centerAction")
			},
			goRight(i) {
				this.$emit("rightAction", i)
			}
		}
	}
</script>

<style scoped>
	.myp-nav-box {
		width: 750rpx;
		left: 0;
		top: 0;
	}
	.myp-nav-fixed {
		position: fixed;
	}
	.myp-nav-content {
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
	}
	.myp-nav-lefts {
		padding-left: 30rpx;
		width: 200rpx;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: flex-start;
	}
	.myp-nav-title {
		width: 350rpx;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
	}
	.myp-nav-rights {
		padding-right: 30rpx;
		width: 200rpx;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: flex-end;
	}
	.myp-nav-title-text {
		font-size: 16px;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		/* #ifdef APP-NVUE */
		lines: 1;
		/* #endif */
		/* #ifndef APP-NVUE */
		white-space: nowrap;
		/* #endif */
	}
</style>
