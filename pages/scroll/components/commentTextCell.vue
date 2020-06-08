<template>
	<view bubble="true" class="ctc" :style="'width:'+width+';'" @tap.stop="toComment">
		<!-- #ifdef APP-NVUE -->
		<text ref="m-text" class="ctc-test" :style="'width:'+width+';'">{{totalText}}</text>
		<view class="ctc-one">
			<text class="ctc-name" @tap.stop="toUser">{{name}}</text>
			<text class="ctc-detail">{{oneLineText}}</text>
		</view>
		<text class="ctc-others">{{otherText}}</text>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<text class="ctc-name" @tap.stop="toUser">{{item&&item.author&&item.author.name}}：</text>
		<text class="ctc-detail">{{item&&item.content}}</text>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		props: {
			width: {
				type: String,
				default: '750rpx'
			},
			item: {
				type: Object,
				default: ()=>{
					return {}
				}
			},
			number: {
				type: Number,
				default: 20
			}
		},
		data() {
			return {
			}
		},
		computed: {
			// #ifdef APP-NVUE
			name() {
				// 限制名字12个字
				if (this.item && this.item.author) {
					const nm = this.item.author.name || ''
					return (nm.length > 12 ? (nm.substring(0, 10)+'...') : nm) + '：'
				}
				return ''
			},
			totalText() {
				const cn = (this.item && this.item.content) || ''
				return this.name + cn
			},
			oneLineText() {
				const num = this.number
				const nameLen = this.name.length
				if (this.item && this.item.content) {
					return this.item.content.substring(0, num - nameLen)
				}
				return ''
			},
			otherText() {
				const num = this.number
				const nameLen = this.name.length
				if (this.item && this.item.content) {
					return this.item.content.substring(num - nameLen, this.item.content.length)
				}
				return ''
			}
			// #endif
		},
		methods: {
			toUser(e) {
				e && e.stopPropagation && e.stopPropagation()
				this.$emit("user", {id: this.item.author.id})
			},
			toComment(e) {
				e && e.stopPropagation && e.stopPropagation()
				this.$emit("select", {id: this.item.id})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	.ctc {
		/* #ifndef APP-NVUE */
		// display: block;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		font-size: 28rpx;
		line-height: 40rpx;
		color: $myp-text-color-second;
		/* #endif */
		
		/* #ifdef APP-NVUE */
		&-test {
			height: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			lines: 1;
		}
		&-one {
			flex-direction: row;
			align-items: center;
		}
		&-others {
			overflow: hidden;
			text-overflow: ellipsis;
			lines: 2;
			font-size: 28rpx;
			line-height: 40rpx;
			color: $myp-text-color-second;
		}
		/* #endif */
		
		&-name {
			/* #ifndef APP-NVUE */
			display: inline;
			/* #endif */
			font-size: 28rpx;
			line-height: 40rpx;
			color: #2A2A2A;
		}
		&-detail {
			/* #ifndef APP-NVUE */
			display: inline;
			/* #endif */
			font-size: 28rpx;
			line-height: 40rpx;
			color: $myp-text-color-second;
		}
	}
</style>
