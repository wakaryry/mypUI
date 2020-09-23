<script>
	import {initSystemInfo} from '@/mypUI/utils/system.js'
	
	export default {
		globalData: {
			currentTab: 0
		},
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS || H5
			initSystemInfo()
			// #endif
			// #ifndef APP-PLUS || H5
			setTimeout(()=>{
				initSystemInfo()
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
	/* #ifdef MP */
	@import '@/mypUI/mp.scss';
	/* #endif */
	/* #ifdef H5 */
	@import '@/mypUI/h5.scss';
	/* #endif */
</style>
