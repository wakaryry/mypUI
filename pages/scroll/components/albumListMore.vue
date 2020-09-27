<template>
	<!-- #ifdef APP-NVUE -->
	<list class="myp-bg-page" ref="myp-list" :bounce="true" isSwiperList="true" style="width:750rpx;flex:1;" :loadmoreoffset="60" @loadmore="toGetAlbums">
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
		<view v-for="(item,idx) in items" :key="idx">
			<album-rich-cell :item="item" @user="toUser" @detail="toDetail" @thumb="toThumb" @comment="toComment" @moreComment="toMoreComment" @share="toShare"></album-rich-cell>
			<view style="height: 20rpx;"></view>
		</view>
		<myp-loader :isLoading="mypIsUpLoading" :hasMore="mypHasMore"></myp-loader>
	</scroll-view>
	<!-- #endif -->
</template>

<script>
	import albumRichCell from './albumRichCell.vue'
	
	// #ifndef APP-NVUE
	import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js'
	// #endif
	
	import childMixin from '@/mypUI/myp-list/header/headerChild.js'
	
	import {thumbAlbum, cancelThumbAlbum, getAlbumList} from '@/api/album.js'
	
	export default {
		components: {
			albumRichCell
		},
		// #ifdef APP-NVUE
		mixins: [childMixin],
		// #endif
		// #ifndef APP-NVUE
		mixins: [contentBoxMixin, childMixin],
		// #endif
		data() {
			return {
				// #ifndef APP-NVUE
				mypExtra: 'status-nav-x-180rpx',
				// #endif
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
				const cp = this.mypStart(val)
				if (!cp) return;
				const mode = this.index === 0 ? 'all' : 'hot'
				getAlbumList({mode: mode, page: cp}).then(response => {
					if (cp === 1) {
						this.items = response.results || []
					} else {
						this.items = this.items.concat(response.results || [])
					}
					this.mypEndSuccess(cp, response.next, ref, sucH)
				}).catch(err => {
					this.$emit("error", err)
					this.mypEndError(cp, ref, failH)
				})
			}
		}
	}
</script>

<style>
</style>
