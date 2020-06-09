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
				<view v-if="idx===items.length-1" style="height: 132rpx;"></view>
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
				<view v-if="idx===items.length-1" style="height: 132rpx;"></view>
			</view>
		</scroll-view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import albumRichCell from './albumRichCell.vue'
	
	import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js'
	
	import {thumbAlbum, cancelThumbAlbum, getAlbumList} from '@/api/album.js'
	
	export default {
		components: {
			albumRichCell
		},
		props: {
			current: {
				type: Number,
				default: 0
			},
			index: {
				type: Number,
				default: 0
			},
			circleId: {
				type: Number,
				default: 0
			},
			parentId: {
			    type: String,
			    default: ''
			},
			scrollable: {
				type: Boolean,
				default: false
			}
		},
		mixins: [contentBoxMixin],
		data() {
			return {
				inited: false,
				currentPage: 0,
				hasMore: true,
				items: [],
				startPoint: null,
				lastPoint: null,
				fps: 40,
				moveTime: 0,
				moveTimeDiff: 0,
				downHeight: 0,
				scrollTopDeviation: 100,
				theScrollTop: 0
			}
		},
		computed: {
			...mapGetters(['hasLogedIn'])
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
			},
			hasLogedIn(newV) {
				if (this.inited) {
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
				if (!this.hasLogedIn) {
					this.$emit("login")
					return
				}
				const that = this
				if (val.thumbed) {
					// to cancel
					// this.mypShowLoading()
					cancelThumbAlbum({attr_id: val.attrId, poster_id: val.id}).then(()=>{
						for (const i in that.items) {
							const theI = that.items[i]
							if (theI.id*1 === val.id*1) {
								theI.thumbed = false
								theI.thumb_num = (theI.thumb_num || 1)*1 - 1
								break
							}
						}
					}).catch(err => {
						// this.mypHideLoading()
						// this.mypShowToast(err)
						this.$emit("error", err)
					})
				} else {
					// to thumb
					thumbAlbum({attr_id: val.attrId, poster_id: val.id}).then(()=>{
						for (const i in that.items) {
							const theI = that.items[i]
							if (theI.id*1 === val.id*1) {
								theI.thumbed = true
								theI.thumb_num = (theI.thumb_num || 0)*1 + 1
								break
							}
						}
					}).catch(err => {
						// this.mypHideLoading()
						// this.mypShowToast(err)
						this.$emit("error", err)
					})
				}
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
				let cp = 1
				if (val === 'refresh') {
					cp = 1
				} else {
					cp = this.currentPage + 1
				}
				if (cp > 1 && !this.hasMore) {
					return
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
				}).catch(err => {
					console.log(err)
					this.$emit("error", err)
				})
			},
			setScrollRef(height) {
			    if (this.$refs['myp-list'].setSpecialEffects) {
			        this.$refs['myp-list'].setSpecialEffects({
			            id: this.parentId,
			            headerHeight: height
			        })
			    }
			},
			onTouchStart(e) {
				if (!this.scrollable) return;
				this.startPoint = this.getPoint(e)
				this.startTop = this.theScrollTop || 0
				this.lastPoint = this.startPoint
				this.inTouchend = false
			},
			onTouchMove(e) {
				if (!this.scrollable) return;
				if (!this.startPoint) return;
				const t = new Date().getTime();
				if (this.moveTime && t - this.moveTime < this.moveTimeDiff) {
					return;
				} else {
					this.moveTime = t
					this.moveTimeDiff = 1000 / this.fps
				}
				const scrollTop = this.theScrollTop
				const currentPoint = this.getPoint(e)
				const moveY = currentPoint.y - this.startPoint.y
				// console.log(scrollTop)
				// 往下拉
				if (moveY > 0 && !this.inTouchend && (scrollTop <= 0 || (scrollTop <= this.scrollTopDeviation && scrollTop === this.startTop))) {
					const diff = currentPoint.y - this.lastPoint.y
					this.downHeight += diff
					// console.log('hello')
					this.$emit("move", this.downHeight)
				}
				this.lastPoint = currentPoint
			},
			onTouchEnd(e) {
				if (!this.scrollable) return;
				const dh = this.downHeight
				this.inTouchend = true
				this.downHeight = 0 // clear
				this.$emit("end", dh)
			},
			onScroll(e) {
				// console.log('child scroll')
				this.theScrollTop = e.detail.scrollTop
			},
			getPoint(e) {
				if (!e) {
					return {
						x: 0,
						y: 0
					}
				}
				if (e.touches && e.touches[0]) {
					return {
						x: e.touches[0].pageX,
						y: e.touches[0].pageY
					}
				} else if (e.changedTouches && e.changedTouches[0]) {
					return {
						x: e.changedTouches[0].pageX,
						y: e.changedTouches[0].pageY
					}
				} else {
					return {
						x: e.clientX,
						y: e.clientY
					}
				}
			}
		}
	}
</script>

<style>
</style>
