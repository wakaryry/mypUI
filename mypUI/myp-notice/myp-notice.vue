<template>
	<view v-if="showing" bubble="true" :class="['myp-noticebar', 'myp-bg-'+bgType, 'myp-height-'+height, 'myp-border-'+border, 'myp-radius-'+radius]" :style="boxStyle" @tap.stop="noticeBarClicked">
		<view v-if="icon" :style="{'margin-right': space}">
			<myp-icon :name="icon" :type="mrIconType" :size="iconSize" :iconStyle="iconStyle" @iconClicked="noticeBarClicked"></myp-icon>
		</view>
		<text :class="['myp-noticebar-text', 'myp-size-'+textSize, 'myp-color-'+mrTextType]" :style="textStyle">{{text}}</text>
		<view v-if="indicator" bubble="true" :style="{'margin-left': space}" @tap.stop="indicatorClicked">
			<myp-icon :name="indicator" :type="mrIndicatorType" :size="indicatorSize" :iconStyle="indicatorStyle" @iconClicked="indicatorClicked"></myp-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: ''
			},
			textSize: {
				type: String,
				default: 'base'
			},
			bgType: {
				type: String,
				default: ''
			},
			textType: {
				type: String,
				default: ''
			},
			iconType: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: 'base'
			},
			border: {
				type: String,
				default: 'none'
			},
			radius: {
				type: String,
				default: ''
			},
			icon: {
				type: String,
				default: null
			},
			iconSize: {
				type: String,
				default: 'll'
			},
			iconStyle: {
				type: String,
				default: ''
			},
			indicator: {
				type: String,
				default: null
			},
			indicatorType: {
				type: String,
				default: ''
			},
			indicatorSize: {
				type: String,
				default: 'll'
			},
			indicatorStyle: {
				type: String,
				default: ''
			},
			space: {
				type: String,
				default: '12rpx'
			},
			// color, lines, text-align...
			textStyle: {
				type: String,
				default: ''
			},
			boxStyle: {
				type: String,
				default: ''
			},
			closable: {
				type: Boolean,
				default: false
			}
		},
		data: () => ({
			showing: true
		}),
		computed: {
			mrTextType() {
				if (this.textType && this.textType.length > 0) {
					return this.textType
				}
				return this.bgType && this.bgType.length > 0 ? 'inverse' : 'text'
			},
			mrIconType() {
				if (this.iconType && this.iconType.length > 0) {
					return this.iconType
				}
				return this.bgType && this.bgType.length > 0 ? 'inverse' : 'text'
			},
			mrIndicatorType() {
				if (this.indicatorType && this.indicatorType.length > 0) {
					return this.indicatorType
				}
				return this.bgType && this.bgType.length > 0 ? 'inverse' : 'text'
			}
		},
		methods: {
			show() {
				this.showing = true
			},
			hide() {
				this.showing = false
			},
			noticeBarClicked(e) {
				e.stopPropagation && e.stopPropagation()
				this.$emit("noticeClicked")
			},
			indicatorClicked() {
				if (this.closable) {
					this.showing = false
				} else {
					this.$emit("indicatorClicked")
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.myp-noticebar {
		padding-left: 32rpx;
		padding-right: 32rpx;
		flex-direction: row;
		align-items: center;
		
		&-text {
			flex: 1;
			lines: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			/* #ifndef APP-NVUE */
			white-space: nowrap;
			/* #endif */
		}
	}
</style>
