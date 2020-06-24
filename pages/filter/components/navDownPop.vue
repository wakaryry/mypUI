<template>
	<myp-popup-always :show="show" pos="top" top="status-nav" height="300px" @overlayClicked="toClose">
		<view class="ndp">
			<myp-tag-group :limits="1" :leastOne="true" :items="items" :value="[current.id]" :column="3" titleLabel="title" valueLabel="id" tagSelectedBgType="primary" tagSelectedTextType="inverse" columnSpace="24rpx" rowSpace="24rpx" boxStyle="margin-top:24rpx;margin-left:32rpx;margin-right:32rpx;" @change="toSelect"></myp-tag-group>
		</view>
	</myp-popup-always>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			current: {
				type: Object,
				default: ()=>{
					return {}
				}
			}
		},
		data() {
			return {
				items: [
					{id: 0, title: '全部心情'}, {id: 1, title: '开心'}, {id: 2, title: '愤怒'}, {id: 3, title: '伤心'}, {id: 4, title: '沮丧'}, {id: 5, title: '狂喜'}, {id: 6, title: '暴躁'}, {id: 7, title: '心塞'}
				]
			}
		},
		methods: {
			toSelect(val) {
				if (val.length === 0) {
					this.$emit("select", this.items[0])
				} else {
					for (const i in this.items) {
						const theI = this.items[i]
						if (theI.id === val[0]) {
							this.$emit("select", theI)
							return
						}
					}
				}
			},
			toClose() {
				this.$emit("cancel")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ndp {
		height: 300px;
		width: 750rpx;
		background-color: #FFFFFF;
	}
</style>
