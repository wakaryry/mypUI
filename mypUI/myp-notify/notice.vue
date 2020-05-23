<template>
	<view v-if="show" :class="['myp-noticebar', 'myp-bg-'+bgType, 'myp-height-'+height, 'myp-border-'+border, 'myp-radius-'+radius]" :style="boxStyle" @click="noticeBarClicked">
		<view v-if="icon" :style="{'margin-right': space}">
			<myp-icon :name="icon" :type="mrIconType" :size="iconSize" :iconStyle="iconStyle"></myp-icon>
		</view>
		<text :class="['myp-noticebar-text', 'myp-size-'+textSize, 'myp-color-'+mrTextType]" :style="textStyle">{{text}}</text>
		<view v-if="indicator" :style="{'margin-left': space}" @tap="indicatorClicked">
			<myp-icon :name="indicator" :type="mrIndicatorType" :size="indicatorSize" :iconStyle="indicatorStyle"></myp-icon>
		</view>
	</view>
</template>

<script>
	// 不会主动消失的提示条
	import mypIcon from '@/mypUI/myp-icon/index.vue'
	import {
		Utils
	} from '../utils/utils.js';

	export default {
		components: {
			mypIcon
		},
		props: {
			text: {
				type: String,
				default: ''
			},
			textSize: {
				type: String,
				default: ''
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
				default: 'base'
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
				default: 'base'
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
			show: true
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
			noticeBarClicked() {
				// 为了方便扩展，比如 navigator 类型，直接跳转到页面
			},
			indicatorClicked() {
				if (this.closable) {
					this.show = false
					this.$emit("close")
				} else {
					this.noticeBarClicked();
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../base.scss';
	
	.myp-noticebar {
		padding-left: 32rpx;
		padding-right: 32rpx;
		flex-direction: row;
		align-items: center;
		
		&-text {
			flex: 1;
			text-overflow: ellipsis;
		}
	}
</style>
