<template>
	<view v-if="showing" :class="['myp-noticebar', 'myp-bg-'+bgType, 'myp-height-'+height, 'myp-border-'+border, 'myp-radius-'+radius]" :style="boxStyle" bubble="true" @tap.stop="noticeBarClicked">
		<myp-icon v-if="icon" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="'margin-right:'+space+';'+iconBoxStyle" @iconClicked="noticeBarClicked"></myp-icon>
		<text :class="['myp-noticebar-text', 'myp-size-'+textSize, 'myp-color-'+textType]" :style="textStyle">{{text}}</text>
		<myp-icon v-if="indicator" :name="indicator" :type="indicatorType" :size="indicatorSize" :iconStyle="indicatorStyle" :boxStyle="'margin-left:'+space+';'+indicatorBoxStyle" @iconClicked="indicatorClicked"></myp-icon>
	</view>
</template>

<script>
	export default {
		props: {
			icon: {
				type: String,
				default: null
			},
			text: {
				type: String,
				default: ''
			},
			indicator: {
				type: String,
				default: null
			},
			bgType: {
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
			textType: {
				type: String,
				default: ''
			},
			textSize: {
				type: String,
				default: 'base'
			},
			iconType: {
				type: String,
				default: ''
			},
			iconSize: {
				type: String,
				default: 'll'
			},
			iconStyle: {
				type: String,
				default: ''
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
			textStyle: {
				type: String,
				default: ''
			},
			boxStyle: {
				type: String,
				default: ''
			},
			iconBoxStyle: {
				type: String,
				default: ''
			},
			indicatorBoxStyle: {
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
