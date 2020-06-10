<template>
	<view>
		<!-- #ifdef APP-NVUE -->
		<list class="myp-bg-page" ref="myp-list" :bounce="true" isSwiperList="true" :style="mypContentHeightStyle+'width:750rpx;'" :loadmoreoffset="60" @loadmore="toGetAlbums">
			<cell v-if="items.length===0">
				<view style="width: 750rpx;height: 30rpx;background-color: #FFFFFF;"></view>
			</cell>
			<cell v-for="(item,idx) in items" :key="idx">
				<album-rich-cell :item="item" @user="toUser" @detail="toDetail" @thumb="toThumb" @comment="toComment" @moreComment="toMoreComment" @share="toShare"></album-rich-cell>
				<view style="height: 20rpx;"></view>
			</cell>
			<cell>
				<myp-loader :isLoading="mypIsUpLoading" :hasMore="mypHasMore"></myp-loader>
			</cell>
		</list>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<scroll-view class="myp-bg-page" :scroll-y="scrollable" :style="mypContentHeightStyle+'width:750rpx;'" @touchstart="mypOnTouchStart" @touchmove="mypOnTouchMove" @touchend="mypOnTouchEnd" @touchcancel="mypOnTouchEnd" @scroll="mypOnScroll" @scrolltolower="toGetAlbums">
			<view v-if="items.length===0">
				<view style="width: 750rpx;height: 30rpx;background-color: #FFFFFF;"></view>
			</view>
			<view v-for="(item,idx) in items" :key="idx">
				<album-rich-cell :item="item" @user="toUser" @detail="toDetail" @thumb="toThumb" @comment="toComment" @moreComment="toMoreComment" @share="toShare"></album-rich-cell>
				<view style="height: 20rpx;"></view>
			</view>
			<myp-loader :isLoading="mypIsUpLoading" :hasMore="mypHasMore"></myp-loader>
		</scroll-view>
		<!-- #endif -->
	</view>
</template>

<script>
	import albumRichCell from './albumRichCell.vue'
	
	import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js'
	import childMixin from '../mixin/headerChild.js'
	
	import {thumbAlbum, cancelThumbAlbum, getAlbumList} from '@/api/album.js'
	
	export default {
		components: {
			albumRichCell
		},
		mixins: [contentBoxMixin, childMixin],
		data() {
			return {
				mypExtra: 100,
				items: []
			}
		},
		methods: {
			toRefresh(ref, sucH,  failH) {
				this.toGetAlbums('refresh', ref, sucH, failH)
			},
			toDetail(val) {
				this.$emit("detail", val)
			},
			toUser(val) {
				this.$emit("user", val)
			},
			toThumb(val) {
				
			},
			toComment(val) {
				this.$emit("comment", val)
			},
			toShare(val) {
				this.$emit("share", val)
			},
			toMoreComment(val) {
				this.$emit("moreComment", val)
			},
			toGetAlbums(val, ref, sucH, failH) {
				if (this.current !== this.index) return;
				this.mypInited = true
				let cp = 1
				if (val === 'refresh') {
					cp = 1
				} else {
					cp = this.mypCurrentPage + 1
				}
				if (cp > 1 && !this.mypHasMore) {
					this.mypIsUpLoading = false
					return
				}
				if (cp === 1) {
					this.mypIsDownLoading = true
				} else {
					this.mypIsUpLoading = true
				}
				const mode = this.index === 0 ? 'all' : 'hot'
				getAlbumList({mode: mode, page: cp}).then(response => {
					if (cp === 1) {
						this.items = response.results || []
					} else {
						this.items = this.items.concat(response.results || [])
					}
					this.mypCurrentPage = cp
					this.mypHasMore = response.next || false
					if (cp === 1) {
						ref && sucH && sucH(ref)
						// #ifndef APP-NVUE
						uni.$emit("swiperScrollRefreshSuc")
						// #endif
						this.mypIsDownLoading = false
					} else {
						this.mypIsUpLoading = false
					}
				}).catch(err => {
					console.log(err)
					this.$emit("error", err)
					if (cp === 1) {
						ref && failH && failH(ref)
						// #ifndef APP-NVUE
						uni.$emit("swiperScrollRefreshErr")
						// #endif
						this.mypIsDownLoading = false
					} else {
						this.mypIsUpLoading = false
					}
				})
			}
		}
	}
</script>

<style>
</style>
