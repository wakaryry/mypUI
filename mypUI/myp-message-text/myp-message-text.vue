<template>
	<view class="myp-mct" :style="boxStyle">
		<image v-if="direction==='left'" :src="avatar" mode="aspectFill" class="myp-mct-avatar" :style="avatarStyle"></image>
		<view :class="['myp-mct-content', direction==='left'?'myp-mct-content-left':'myp-mct-content-right']" :style="mrContentStyle">
			<text v-if="nickname&&nickname.length>0" :class="['myp-mct-name', 'myp-color-'+nameType, 'myp-size-'+nameSize]" :style="mrNameStyle">{{nickname}}</text>
			<text :class="['myp-mct-text', 'myp-bg-'+bgType, 'myp-color-'+mrTextType, 'myp-size-'+textSize]" :style="mrTextStyle">{{text}}</text>
		</view>
		<image v-if="direction==='right'" :src="avatar" mode="aspectFill" class="myp-mct-avatar" :style="avatarStyle"></image>
	</view>
</template>

<script>
	export default {
		props: {
			avatar: {
				type: String,
				default: ''
			},
			nickname: {
				type: String,
				default: ''
			},
			text: {
				type: String,
				default: ''
			},
			// left/right
			direction: {
				type: String,
				default: 'left'
			},
			// we set a text width, since use flex:1 for text may have problems in app
			contentWidth: {
				type: String,
				default: '422rpx'
			},
			space: {
				type: String,
				default: '32rpx'
			},
			nameTextSpace: {
				type: String,
				default: '12rpx'
			},
			bgType: {
				type: String,
				default: 'inverse'
			},
			nameType: {
				type: String,
				default: 'second'
			},
			nameSize: {
				type: String,
				default: 's'
			},
			textType: {
				type: String,
				default: 'text'
			},
			textSize: {
				type: String,
				default: 'base'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			avatarStyle: {
				type: String,
				default: ''
			},
			nameStyle: {
				type: String,
				default: ''
			},
			textStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			mrContentStyle() {
				let _style = ''
				if (this.direction === 'left') {
					_style += `margin-left:${this.space};`
				} else {
					_style += `margin-right:${this.space};`
				}
				return _style
			},
			mrTextType() {
				if (this.textType && this.textType.length > 0) {
					return this.textType
				}
				return this.bgType && this.bgType.length > 0 ? 'inverse' : ''
			},
			mrTextStyle() {
				// weex中已经支持max-width，需要动态宽度且限制最大宽度的已经可以实现了
				let _style = `max-width:${this.contentWidth};`
				return _style += this.textStyle
			},
			mrNameStyle() {
				// weex中已经支持max-width，需要动态宽度且限制最大宽度的已经可以实现了
				let _style = `max-width:${this.contentWidth};`
				if (this.nameTextSpace && this.nameTextSpace.length>0) {
					_style += `margin-bottom:${this.nameTextSpace};`
				}
				return _style += this.nameStyle
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-mct {
		flex-direction: row;
		align-items: flex-start;
		
		&-avatar {
			width: 100rpx;
			height: 100rpx;
		}
		
		&-content {
			flex-direction: column;
			
			&-left {
				align-items: flex-start;
			}
			
			&-right {
				align-items: flex-end;
			}
		}
		
		&-name {
			overflow: hidden;
			text-overflow: ellipsis;
			/* #ifdef APP-NVUE */
			lines: 1;
			/* #endif */
			/* #ifndef APP-NVUE */
			white-space: nowrap;
			/* #endif */
		}
		
		&-text {
			padding: 20rpx;
			border-radius: 16rpx;
			/* #ifdef APP-NVUE */
			lines: 0;
			/* #endif */
		}
	}
</style>
