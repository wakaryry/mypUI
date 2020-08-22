<script>
	import systemMixin from '@/mypUI/myp-mixin/systemMixin.js'
	
	export default {
		globalData: {
			currentTab: 0
		},
		mixins: [systemMixin],
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS || H5
			this.mypInitSystemInfo()
			// #endif
			// #ifndef APP-PLUS || H5
			setTimeout(()=>{
				this.mypInitSystemInfo()
			}, 0)
			// #endif
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary'); //锁定屏幕
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
	/* #ifdef H5 */
	@import '@/mypUI/h5.scss';
	/* #endif */
</style>
