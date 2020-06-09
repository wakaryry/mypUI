<template>
	<view>
		<!-- #ifdef APP-NVUE -->
		<list class="myp-bg-page" ref="myp-list" :bounce="true" isSwiperList="true" :style="mypContentHeightStyle+'width:750rpx;'" :loadmoreoffset="40" @loadmore="toGetAlbums">
			<cell v-if="items.length===0">
				<view style="width: 750rpx;height: 30rpx;background-color: #FFFFFF;"></view>
			</cell>
			<cell v-for="(item,idx) in items" :key="idx">
				<album-rich-cell :item="item" @user="toUser" @detail="toDetail" @thumb="toThumb" @comment="toComment" @moreComment="toMoreComment" @share="toShare"></album-rich-cell>
				<view style="height: 20rpx;"></view>
			</cell>
			<cell>
				<myp-loader :isLoading="isUpLoading" :hasMore="hasMore"></myp-loader>
			</cell>
		</list>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<scroll-view class="myp-bg-page" :scroll-y="scrollable" :style="mypContentHeightStyle+'width:750rpx;'" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd" @scroll="onScroll" @scrolltolower="toGetAlbums">
			<view v-if="items.length===0">
				<view style="width: 750rpx;height: 30rpx;background-color: #FFFFFF;"></view>
			</view>
			<view v-for="(item,idx) in items" :key="idx">
				<album-rich-cell :item="item" @user="toUser" @detail="toDetail" @thumb="toThumb" @comment="toComment" @moreComment="toMoreComment" @share="toShare"></album-rich-cell>
				<view style="height: 20rpx;"></view>
			</view>
			<myp-loader :isLoading="isUpLoading" :hasMore="hasMore"></myp-loader>
		</scroll-view>
		<!-- #endif -->
	</view>
</template>

<script>
	import albumRichCell from '../../components/albumRichCell.vue'
	
	import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js'
	import childMixin from './childMixin.js'
	
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
				this.inited = true
				let cp = 1
				if (val === 'refresh') {
					cp = 1
				} else {
					cp = this.currentPage + 1
				}
				if (cp > 1 && !this.hasMore) {
					this.isUpLoading = false
					return
				}
				if (cp === 1) {
					this.isDownLoading = true
				} else {
					this.isUpLoading = true
				}
				const mode = this.index === 0 ? 'all' : 'hot'
				getAlbumList({mode: mode, page: cp}).then(response => {
					if (cp === 1) {
						this.items = response.results || []
					} else {
						this.items = this.items.concat(response.results || [])
					}
					this.currentPage = cp
					this.hasMore = response.next || false
					if (cp === 1) {
						ref && sucH && sucH(ref)
						// #ifndef APP-NVUE
						uni.$emit("swiperScrollRefreshSuc")
						// #endif
						this.isDownLoading = false
					} else {
						this.isUpLoading = false
					}
				}).catch(err => {
					console.log(err)
					this.$emit("error", err)
					if (cp === 1) {
						ref && failH && failH(ref)
						// #ifndef APP-NVUE
						uni.$emit("swiperScrollRefreshErr")
						// #endif
						this.isDownLoading = false
					} else {
						this.isUpLoading = false
					}
				})
			}
		}
	}
</script>

<style>
</style>
