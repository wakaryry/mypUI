<template>
	<button bubble="true" :class="['myp-btn-raw', 'myp-flex-row', 'myp-justify-center', 'myp-align-center', 'myp-position-relative', 'myp-border-'+border, 'myp-bg-'+bgType, 'myp-height-'+height, 'myp-radius-'+radius, (disabled||loading)?'myp-disabled':'']" :style="boxStyle" :hover-class="(!disabled && !loading) ? ('myp-hover-'+hover): ''" :app-parameter="appParameter" :open-type="openType" :session-from="sessionFrom" :send-message-title="sendMessageTitle" :send-message-path="sendMessagePath" :send-message-img="sendMessageImg" @contact="toCantactCallback" @error="toErrorCallback" @getphonenumber="toPhoneCallback" @getuserinfo="toInfoCallback" @launchapp="toAppCallback" @opensetting="toSettingCallback">
		<slot>
			<myp-loading-indicator v-if="loading" :width="loadingWidth" :height="loadingHeight" :src="loadingSrc"></myp-loading-indicator>
			<myp-icon v-if="!loading && icon && icon.length > 0" :name="icon" :type="iconType" :size="iconSize" :boxStyle="iconBoxStyle" :iconStyle="iconStyle"></myp-icon>
			<text v-if="text&&text.length>0" :class="['myp-color-'+textType, 'myp-size-'+textSize]" :style="mrTextStyle">{{text}}</text>
			<myp-icon v-if="icon2 && icon2.length > 0" :name="icon2" :type="icon2Type" :size="icon2Size" :boxStyle="mrIcon2BoxStyle" :iconStyle="icon2Style"></myp-icon>
		</slot>
		<slot name="extra"></slot>
	</button>
</template>

<script>
	export default {
		props: {
			/**
			 * open-type
			 */
			openType: {
				type: String,
				default: ''
			},
			/**
			 * app-parameter
			 */
			appParameter: {
				type: String,
				default: ''
			},
			/**
			 * session-form
			 */
			sessionFrom: {
				type: String,
				default: ''
			},
			/**
			 * send-message-title
			 */
			sendMessageTitle: {
				type: String,
				default: ''
			},
			/**
			 * send-message-path
			 */
			sendMessagePath: {
				type: String,
				default: ''
			},
			/**
			 * send-message-img
			 */
			sendMessageImg: {
				type: String,
				default: ''
			},
			/**
			 * show-massage-card
			 */
			showMessageCard: {
				type: Boolean,
				default: false
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 文字内容
			 */
			text: {
				type: String,
				default: ''
			},
			/**
			 * 左侧图标
			 */
			icon: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标
			 */
			icon2: {
				type: String,
				default: ''
			},
			/**
			 * 是否为loading状态
			 */
			loading: {
				type: Boolean,
				default: false
			},
			/**
			 * loading状态时显示的图片
			 */
			loadingSrc: {
				type: String,
				default: '/static/ui/loading.gif'
			},
			/**
			 * 高度主题
			 */
			height: {
				type: String,
				default: 'l'
			},
			/**
			 * 点击时的hover效果: opacity/bg/bg-opacity
			 */
			hover: {
				type: String,
				default: 'opacity'
			},
			/**
			 * 圆角主题
			 */
			radius: {
				type: String,
				default: 'base'
			},
			/**
			 * 边框主题
			 */
			border: {
				type: String,
				default: ''
			},
			/**
			 * 是否为禁用状态。禁用时不可点击
			 */
			disabled: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否为高亮状态
			 */
			highlight: {
				type: Boolean,
				default: false
			},
			/**
			 * 文字与图标之间的间距
			 */
			space: {
				type: String,
				default: '12rpx'
			},
			/**
			 * 文字颜色主题
			 */
			textType: {
				type: String,
				default: 'text'
			},
			/**
			 * 文字尺寸主题
			 */
			textSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 左侧图标颜色主题
			 */
			iconType: {
				type: String,
				default: 'text'
			},
			/**
			 * 左侧图标尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'l'
			},
			/**
			 * 右侧图标颜色主题
			 */
			icon2Type: {
				type: String,
				default: 'text'
			},
			/**
			 * 右侧图标尺寸主题
			 */
			icon2Size: {
				type: String,
				default: 'l'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 文字样式
			 */
			textStyle: {
				type: String,
				default: ''
			},
			/**
			 * 左侧图标外层样式
			 */
			iconBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 左侧图标样式
			 */
			iconStyle: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标外层样式
			 */
			icon2BoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标样式
			 */
			icon2Style: {
				type: String,
				default: ''
			},
			/**
			 * loading图标的宽度
			 */
			loadingWidth: {
				type: String,
				default: '36rpx'
			},
			/**
			 * loading图标的高度
			 */
			loadingHeight: {
				type: String,
				default: '36rpx'
			}
		},
		computed: {
			mrTextStyle() {
				let _style = ''
				if (this.text && this.text.length > 0) {
					if (this.loading) {
						_style += `margin-left: ${this.space};`
					} else {
						if (this.icon && this.icon.length > 0) {
							_style += `margin-left: ${this.space};`
						}
					}
				}
				_style += this.textStyle
				return _style
			},
			mrIcon2BoxStyle() {
				let _style = ''
				_style += `margin-left: ${this.space};`
				return _style + this.icon2BoxStyle
			}
		},
		methods: {
			toCantactCallback(e) {
				this.$emit("contact", e)
			},
			toErrorCallback(e) {
				this.$emit("error", e)
			},
			toPhoneCallback(e) {
				this.$emit("phone", e)
			},
			toInfoCallback(e) {
				this.$emit("userinfo", e)
			},
			toAppCallback(e) {
				this.$emit("launch", e)
			},
			toSettingCallback(e) {
				this.$emit("setting", e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-btn-raw {
		/* #ifndef APP-NVUE */
		padding: 0;
		margin: 0;
		/* #endif */
		/* #ifdef APP-NVUE */
		padding-left: 0;
		padding-right: 0;
		padding-top: 0;
		padding-bottom: 0;
		margin-left: 0;
		margin-top: 0;
		margin-bottom: 0;
		margin-right: 0;
		/* #endif */
		
		/* #ifndef APP-NVUE */
		&:after {
			border: none;
		}
		/* #endif */
	}
</style>
