<template>
	<myp-popup :show="show" pos="top" top="status-nav" height="400px">
		<view class="ndp"></view>
	</myp-popup>
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
			
		}
	}
</script>

<style lang="scss" scoped>
	.ndp {
		height: 400px;
		width: 750rpx;
		background-color: #FFFFFF;
	}
</style>
