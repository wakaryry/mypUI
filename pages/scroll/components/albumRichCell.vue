<template>
	<view bubble="true" class="pc" @tap.stop="toHideMore">
		<view class="pc-head">
			<view bubble="true" class="pc-avatar" @tap="toUser">
				<image :src="item.author.avatar" class="pc-avatar-avatar" mode="aspectFill"></image>
			</view>
			<view class="pc-head-body">
				<view class="pc-name">
					<view class="pc-name-box">
						<text class="pc-name-text" @tap="toUser">{{item.author.name}}</text>
						<text class="pc-name-desc"></text>
					</view>
					<view v-if="hasMore">
						<myp-icon name="three-dot" @iconClicked="toMore"></myp-icon>
					</view>
				</view>
				<view class="pc-time">
					<text class="pc-time-text">{{timeText}}</text>
					<view v-if="showCircle&&(item.topic&&item.topic.id||0)*1 > 0" class="pc-circle">
						<text class="pc-circle-label">来自</text>
						<text class="pc-circle-text" @tap="toCircle">{{item.topic.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<text class="pc-content" @tap="toReadAll">{{item.content}}</text>
		<view v-if="images.length > 0" class="pc-images">
			<view v-if="images.length === 1" class="pc-images-item-one">
				<image :src="images[0].url" mode="aspectFill" class="pc-images-img-one" @tap="toImagesPreview(images[0].url)"></image>
			</view>
			<view v-else v-for="(img,idx) in images" :key="idx" :class="['pc-images-item', images.length<=4&&'pc-images-item-no-bottom', ((idx+1)%4)===0&&'pc-images-item-no', idx>3&&'pc-images-item-no-bottom']">
				<image :src="img.url" mode="aspectFill" class="pc-images-img" @tap="toImagesPreview(img.url)"></image>
			</view>
		</view>
		<view v-if="item.location&&item.location.length>0" class="pc-location">
			<myp-icon name="solid-location" size="s" iconStyle="color:#027AFF;"></myp-icon>
			<text class="pc-location-text">{{item.location}}</text>
		</view>
		<view class="pc-foot">
			<view class="pc-acs">
				<view class="pc-acs-box" bubble="true" @tap="toThumb">
					<myp-icon name="thumb" :type="item.thumbed?'primary':'text'" size="l" @iconClicked="toThumb"></myp-icon>
					<text class="pc-acs-text">{{thumbNumText}}</text>
				</view>
				<view class="pc-acs-box" bubble="true" @tap="toComment">
					<myp-icon name="comment" size="l" @iconClicked="toComment"></myp-icon>
					<text class="pc-acs-text">{{commentNumText}}</text>
				</view>
				<view class="pc-acs-box" bubble="true" @tap="toShare">
					<myp-icon name="share" size="l" @iconClicked="toShare"></myp-icon>
				</view>
			</view>
		</view>
		<view v-if="item.comments && item.comments.length > 0" class="pc-comments">
			<view class="pc-comments-item" v-for="(cm, idx) in item.comments" :key="idx">
				<comment-text-cell :item="cm" width="618rpx" :number="22" @user="toCommentUser" @select="toSelectComment"></comment-text-cell>
			</view>
			<text class="pc-comments-more" v-if="item.comment_num*1 > 5" @tap="toAllComments">全部{{item.comment_num}}条评论</text>
		</view>
		<view :class="['pc-more', (opened*1===item.id*1)&&'pc-more-active']" @tap="toPrevent">
			<view class="pc-more-item pc-more-bottom" bubble="true" @tap="toHide">
				<text class="pc-more-text">隐藏贴子</text>
			</view>
			<view class="pc-more-item pc-more-bottom" bubble="true" @tap="toDelete">
				<text class="pc-more-text">删除贴子</text>
			</view>
		</view>
	</view>
</template>

<script>
	import commentTextCell from './commentTextCell.vue'
	import {formatTime} from '@/mypUI/utils/date.js'
	
	export default {
		components: {
			commentTextCell
		},
		props: {
			item: {
				type: Object,
				default: ()=>{
					return {}
				}
			},
			hasMore: {
				type: Boolean,
				default: false
			},
			showCircle: {
				type: Boolean,
				default: true
			},
			opened: {
				type: [Number, String],
				default: 0
			}
		},
		computed: {
			images() {
				if (this.item && this.item.imgs && this.item.imgs.length > 0) {
					return this.item.imgs.sort((a,b) => {
						return a.index*1 - b.index*1
					})
				}
				return []
			},
			thumbNumText() {
				const a = (this.item.thumb_num || 0)*1
				return this.numToText(a, '点赞')
			},
			commentNumText() {
				const a = (this.item.comment_num || 0)*1
				return this.numToText(a, '评论')
			},
			timeText() {
				return formatTime(this.item.time, '{y}-{m}-{d} {h}:{i}')
			}
		},
		data() {
			return {
			}
		},
		methods: {
			toHideMore(e) {
				e && e.stopPropagation && e.stopPropagation()
				this.$emit("more", {id: 0})
			},
			toCircle(e) {
				// e && e.stopPropagation && e.stopPropagation()
				this.$emit("circle", {id: this.item.circle_id, name: this.item.circle_name})
			},
			toCommentUser(val) {
				this.$emit("user", {id: val.id})
			},
			toSelectComment(val) {
				this.$emit("comment", {id: this.item.id || 0, attrId: this.item.attr_id, pid: val.id})
			},
			toAllComments(e) {
				// e && e.stopPropagation && e.stopPropagation()
				this.$emit("moreComment", {id: this.item.id || 0, attrId: this.item.attr_id})
			},
			toUser(e) {
				// e && e.stopPropagation && e.stopPropagation()
				this.$emit("user", {id: this.item.user_id})
			},
			toReadAll(e) {
				// e && e.stopPropagation && e.stopPropagation()
				this.$emit("detail", {id: this.item.id || 0, attrId: this.item.attr_id})
			},
			toThumb(e) {
				// e && e.stopPropagation && e.stopPropagation()
				this.$emit("thumb", {id: this.item.id || 0, thumbed: this.item.thumbed, attrId: this.item.attr_id})
			},
			toComment(e) {
				// e && e.stopPropagation && e.stopPropagation()
				this.$emit("comment", {id: this.item.id || 0, attrId: this.item.attr_id})
			},
			toShare(e) {
				// e && e.stopPropagation && e.stopPropagation()
				this.$emit("share", {id: this.item.id || 0, attrId: this.item.attr_id})
			},
			toHide() {
				this.$emit("hide", {id: this.item.id || 0, attrId: this.item.attr_id})
				this.$emit("more", {id: 0})
			},
			toDelete() {
				this.$emit("delete", {id: this.item.id || 0, attrId: this.item.attr_id})
				this.$emit("more", {id: 0})
			},
			toMore() {
				this.$emit("more", {id: this.item.id || 0})
			},
			numToText(val, token) {
				if (val <= 0) return token;
				if (val >= 1000 && val < 10000) {
					return (val / 1000).toFixed(1) + 'K'
				} else if (val >= 10000) {
					return (val / 10000).toFixed(1) + '万'
				}
				return val
			},
			toImagesPreview(val) {
				this.$emit("more", {id: 0})
				const imgs = []
				this.images.forEach(i => {
					imgs.push(i.url)
				})
				uni.previewImage({
					current: val,
					urls: imgs
				})
			},
			toPrevent(e) {
				e && e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.pc {
		background-color: #FFFFFF;
		padding-left: 36rpx;
		padding-right: 36rpx;
		padding-top: 30rpx;
		padding-bottom: 32rpx;
		width: 750rpx;
		position: relative;
		
		&-head {
			flex-direction: row;
			flex-wrap: nowrap;
			align-items: center;
			
			&-body {
				margin-left: 18rpx;
				flex: 1;
			}
		}
		&-avatar {
			width: 80rpx;
			height: 80rpx;
			overflow: hidden;
			
			&-avatar {
				width: 80rpx;
				height: 80rpx;
				border-radius: 40rpx;
			}
		}
		&-name {
			flex-direction: row;
			align-items: center;
			
			&-box {
				flex: 1;
				flex-direction: row;
				align-items: center;
			}
			
			&-text {
				font-size: 30rpx;
				line-height: 34rpx;
				color: $myp-text-color;
			}
			&-desc {
				font-size: 28rpx;
				line-height: 34rpx;
				color: $myp-text-color-third;
				margin-left: 12rpx;
			}
		}
		&-time {
			margin-top: 6rpx;
			flex-direction: row;
			align-items: center;
			
			&-text {
				font-size: 26rpx;
				color: $myp-text-color-third;
				line-height: 34rpx;
			}
		}
		&-circle {
			flex-direction: row;
			align-items: center;
			
			&-label {
				margin-left: 10rpx;
				margin-right: 8rpx;
				font-size: 26rpx;
				color: $myp-text-color-third;
				line-height: 34rpx;
			}
			&-text {
				font-size: 26rpx;
				color: #184F8C;
				line-height: 34rpx;
			}
		}
		&-care {
			margin-left: 16rpx;
		}
		&-content {
			margin-top: 20rpx;
			font-size: 32rpx;
			line-height: 44rpx;
			color: $myp-text-color;
			width: 678rpx;
			/* #ifdef APP-NVUE */
			lines: 9;
			overflow: hidden;
			text-overflow: ellipsis;
			/* #endif */
			/* #ifndef APP-NVUE */
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 9;
			overflow: hidden;
			/* #endif */
		}
		&-images {
			flex-direction: row;
			flex-wrap: wrap;
			margin-top: 16rpx;
			
			&-item {
				width: 140rpx;
				height: 140rpx;
				overflow: hidden;
				margin-bottom: 16rpx;
				margin-right: 16rpx;
				
				&-one {
					width: 230rpx;
					height: 300rpx;
					overflow: hidden;
				}
				
				&-no {
					margin-right: 0;
					
					&-bottom {
						margin-bottom: 0;
					}
				}
			}
			&-img {
				border-radius: 16rpx;
				width: 140rpx;
				height: 140rpx;
				
				&-one {
					border-radius: 16rpx;
					width: 230rpx;
					height: 300rpx;
				}
			}
		}
		&-location {
			margin-top: 20rpx;
			flex-direction: row;
			align-items: center;
			
			&-text {
				margin-left: 8rpx;
				font-size: 26rpx;
				line-height: 34rpx;
				color: #184F8C;
			}
		}
		&-foot {
			margin-top: 30rpx;
			flex-direction: row;
			align-items: center;
			flex-wrap: nowrap;
			justify-content: flex-end;
		}
		&-acs {
			flex-direction: row;
			align-items: center;
			
			&-box {
				flex-direction: row;
				align-items: center;
				margin-left: 24rpx;
			}
			&-text {
				font-size: 30rpx;
				line-height: 42rpx;
				color: $myp-text-color-second;
				margin-left: 10rpx;
			}
		}
		&-comments {
			background-color: #FAFAFA;
			border-width: 1px;
			border-color: $myp-border-color-light;
			border-style: solid;
			width: 678rpx;
			padding-top: 16rpx;
			padding-bottom: 24rpx;
			padding-left: 30rpx;
			padding-right: 30rpx;
			margin-top: 18rpx;
			border-radius: 12rpx;
			
			&-item {
				margin-bottom: 8rpx;
			}
			&-more {
				margin-top: 4rpx;
				font-size: 28rpx;
				line-height: 40rpx;
				color: $myp-text-color-second;
			}
		}
		&-more {
			position: absolute;
			top: 93rpx;
			right: 12rpx;
			width: 298rpx;
			height: 0;
			transition-property: width, height;
			transition-duration: 300ms;
			padding-left: 22rpx;
			padding-right: 22rpx;
			background-color: #2F2F2F;
			border-radius: 22rpx;
			overflow: hidden;
			/* #ifndef APP-NVUE */
			z-index: 999;
			/* #endif */
			
			&-active {
				width: 298rpx;
				height: 412rpx;
			}
			&-item {
				flex-direction: row;
				justify-content: center;
				align-items: center;
				height: 103rpx;
			}
			&-text {
				font-size: 32rpx;
				color: #FFFFFF;
			}
			&-bottom {
				border-bottom-width: 1px;
				border-bottom-style: solid;
				border-bottom-color: #232323;
			}
		}
	}
</style>
