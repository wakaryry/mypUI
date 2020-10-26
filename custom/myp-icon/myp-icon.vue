<template>
	<view bubble="true" class="myp-icon-box" :style="boxStyle" :hover-class="'myp-hover-'+hover" @tap.stop="toClickIcon">
		<image v-if="isImageSrc" class="myp-image" :src="name" :mode="mode" :style="iconStyle"></image>
		<text v-else :class="['myp-iconfont', 'myp-color-'+type, 'myp-size-'+size]" :style="iconStyle">{{icons[name]}}</text>
		<slot></slot>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom');
	dom.addRule('fontFace', {
		'fontFamily': "mypiconfont",
		'src': "url('https://at.alicdn.com/t/font_1827032_nyt5dngyrvp.ttf')"
	})
	// #endif
	
	import icons from './icons.js'
	
	import {isSrc} from '@/mypUI/utils/utils.js'
	export default {
		props: {
			name: {
				type: String,
				default: 'right'
			},
			type: {
				type: String,
				default: ''
			},
			size: {
				type: String,
				default: 'l'
			},
			mode: {
				type: String,
				default: 'aspectFit'
			},
			hover: {
				type: String,
				default: 'none'
			},
			iconStyle: {
				type: String,
				default: ""
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				icons: icons
			}
		},
		computed: {
			isImageSrc() {
				const isUrlSrc = isSrc(this.name)
				if (isUrlSrc) {
					return true
				}
				const last_len = this.name.lastIndexOf(".");
				if (last_len > 0) {
					const len = this.name.length;
					const ext = this.name.substring(last_len,len)
					return ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp'].includes(ext.toLowerCase())
				}
				return false
			}
		},
		methods: {
			toClickIcon(e) {
				this.$emit("iconClicked")
				e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifndef APP-NVUE */
	@font-face {
	  font-family: 'mypiconfont';  /* project id 1827032 */
	  src: url('https://at.alicdn.com/t/font_1827032_nyt5dngyrvp.eot');
	  src: url('https://at.alicdn.com/t/font_1827032_nyt5dngyrvp.eot?#iefix') format('embedded-opentype'),
	  url('https://at.alicdn.com/t/font_1827032_nyt5dngyrvp.woff2') format('woff2'),
	  url('https://at.alicdn.com/t/font_1827032_nyt5dngyrvp.woff') format('woff'),
	  url('https://at.alicdn.com/t/font_1827032_nyt5dngyrvp.ttf') format('truetype'),
	  url('https://at.alicdn.com/t/font_1827032_nyt5dngyrvp.svg#mypiconfont') format('svg');
	}
	/* #endif */
	
	.myp-iconfont {
		font-family: mypiconfont;
		text-decoration: none;
		text-align: center;
	}
	.myp-icon-box {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		justify-content: center;
		align-items: center;
	}
	.myp-image {
		width: 32rpx;
		height: 32rpx;
	}
</style>
