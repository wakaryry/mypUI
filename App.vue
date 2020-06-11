<script>
	import systemMixin from '@/mypUI/myp-mixin/systemMixin.js'
	
	export default {
		globalData: {
			currentTab: 0
		},
		mixins: [systemMixin],
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-NVUE || H5
			this.mypInitSystemInfo()
			// #endif
			// #ifndef APP-NVUE || H5
			setTimeout(()=>{
				this.mypInitSystemInfo()
			}, 0)
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import '@/mypUI/base.scss';
	
</style>
