<template>
	<view>
		<!-- #ifdef APP-NVUE -->
		<list class="myp-bg-page" ref="myp-list" :bounce="true" isSwiperList="true" :style="mypContentHeightStyle+'width:750rpx;'">
			<cell v-if="items.length===0">
				<view style="width: 750rpx;height: 30rpx;background-color: #FFFFFF;"></view>
			</cell>
			<cell v-for="(item,idx) in items" :key="idx">
				<album-rich-cell :item="item" @user="toUser" @detail="toDetail" @thumb="toThumb" @comment="toComment" @moreComment="toMoreComment" @share="toShare"></album-rich-cell>
				<view style="height: 20rpx;"></view>
			</cell>
		</list>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<scroll-view class="myp-bg-page" :scroll-y="scrollable" :style="mypContentHeightStyle+'width:750rpx;'" @touchstart="mypOnTouchStart" @touchmove="mypOnTouchMove" @touchend="mypOnTouchEnd" @touchcancel="mypOnTouchEnd" @scroll="mypOnScroll">
			<view v-if="items.length===0">
				<view style="width: 750rpx;height: 30rpx;background-color: #FFFFFF;"></view>
			</view>
			<view v-for="(item,idx) in items" :key="idx">
				<album-rich-cell :item="item" @user="toUser" @detail="toDetail" @thumb="toThumb" @comment="toComment" @moreComment="toMoreComment" @share="toShare"></album-rich-cell>
				<view style="height: 20rpx;"></view>
			</view>
		</scroll-view>
		<!-- #endif -->
	</view>
</template>

<script>
	import albumRichCell from './albumRichCell.vue'
	
	import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js'
	import childMixin from '../mixin/pureHeaderChild.js'
	
	import {thumbAlbum, cancelThumbAlbum, getAlbumList} from '@/api/album.js'
	
	export default {
		components: {
			albumRichCell
		},
		mixins: [contentBoxMixin, childMixin],
		data() {
			return {
				mypIncludeXBar: false,
				mypExtra: 100,
				inited: false,
				items: []
			}
		},
		created() {
			const that = this
			if (this.index === 0 && this.current === 0 && !this.inited) {
				setTimeout(()=>{
					that.inited = true
					that.toGetAlbums('refresh')
				}, 30)
			}
		},
		watch: {
			current(newV) {
				if (newV === this.index && !this.inited) {
					this.inited = true
					this.toGetAlbums('refresh')
				}
			}
		},
		methods: {
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
			toGetAlbums(val) {
				this.inited = true
				const mode = this.index === 0 ? 'all' : 'hot'
				getAlbumList({mode: mode, page: 1}).then(response => {
					this.items = response.results || []
				}).catch(err => {
					this.$emit("error", err)
				})
			}
		}
	}
</script>

<style>
</style>
