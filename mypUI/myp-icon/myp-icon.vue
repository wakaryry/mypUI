<template>
	<view bubble="true" class="myp-icon-box" :style="boxStyle" :hover-class="'myp-hover-'+hover" @tap.stop="toClickIcon">
		<image v-if="isImageSrc" class="myp-image" :src="name" :mode="mode" :style="iconStyle"></image>
		<text v-else :class="['myp-iconfont', 'myp-color-'+type, 'myp-size-'+size]" :style="iconStyle">{{icons[name]}}</text>
	</view>
</template>

<script>
	import icons from '../icons.js'
	
	import {isSrc} from '../utils/utils.js'
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
	.myp-icon-box {
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
