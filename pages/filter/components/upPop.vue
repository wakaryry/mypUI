<template>
	<myp-popup-always :show="show" pos="bottom" bottom="x-64px" height="300px" @overlayClicked="toCancel">
		<view class="up">
			<myp-tag-group :limits="3" :items="items" :value="current" :column="3" titleLabel="title" valueLabel="id" tagSelectedBgType="primary" tagSelectedTextType="inverse" columnSpace="24rpx" rowSpace="24rpx" boxStyle="margin-top:24rpx;margin-left:32rpx;margin-right:32rpx;" @change="toSelect"></myp-tag-group>
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
				type: Array,
				default: ()=>{
					return []
				}
			}
		},
		data() {
			return {
				items: [
					{id: 1, title: '羽毛球'}, {id: 2, title: '篮球'}, {id: 3, title: '乒乓球'}, {id: 4, title: '足球'}, {id: 5, title: '棒球'}, {id: 6, title: '高尔夫'}, {id: 7, title: '保龄球'}
				]
			}
		},
		methods: {
			toCancel() {
				this.$emit("cancel")
			},
			toSelect(val) {
				this.$emit("select", val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.up {
		background-color: #FFFFFF;
		width: 750rpx;
		height: 300px;
	}
</style>
