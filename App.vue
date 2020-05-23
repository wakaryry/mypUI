<script>
	export default {
		globalData: {
			currentTab: 0
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/*仅仅是为了兼容某些地方用到了flex:1,而父层高度不确定(比如禁用了父层scroll-view的情况) */
	/*发现禁用外层scroll之后，H5页面设置page设为100%，子元素若flex:1，该子元素铺满页面高度空间，会挤掉其它元素空间 */
	/*故而如果出现某个端兼容性问题，直接设置高度是最好的方案 */
	/*
	page {
		height: 100%;
	}
	*/
</style>
