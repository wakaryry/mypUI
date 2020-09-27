<template>
	<myp-list ref="myp-list" :extra="extra" @down="toLoadData" @up="toLoadData">
		<myp-list-cell v-for="(item,idx) in items" :key="idx">
			<album-rich-cell :item="item" @user="toUser" @detail="toDetail" @thumb="toThumb" @comment="toComment" @moreComment="toMoreComment" @share="toShare"></album-rich-cell>
			<view style="height: 20rpx;"></view>
		</myp-list-cell>
	</myp-list>
</template>

<script>
	import albumRichCell from '../../scroll/components/albumRichCell.vue'
	
	import {getAlbumList} from '@/api/album.js'
	
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
			extra: {
				type: String,
				default: '0'
			}
		},
		data() {
			return {
				inited: false,
				items: []
			}
		},
		created() {
			if (this.current === this.index) {
				this.inited = true
				setTimeout(()=>{
					const ins = this.$refs['myp-list']
					ins && ins.mypRefresh()
				}, 0)
			}
		},
		watch: {
			current(newV) {
				if (newV === this.index && !this.inited) {
					this.inited = true
					const ins = this.$refs['myp-list']
					ins && ins.mypRefresh()
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
			toLoadData() {
				const ins = this.$refs['myp-list']
				const cp = ins.mypCurrentPage
				getAlbumList({mode: '', page: cp}).then(response => {
					if (cp === 1) {
						this.items = response.results || []
					} else {
						this.items = this.items.concat(response.results || [])
					}
					ins.mypEndSuccess(response.next)
				}).catch(err => {
					this.$emit("error", err)
					ins.mypEndError()
				})
			}
		}
	}
</script>

<style>
</style>
