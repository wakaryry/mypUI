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
			const dom = weex.requireModule('dom');
			dom.addRule('fontFace', {
				'fontFamily': "mypiconfont",
				'src': "url('https://at.alicdn.com/t/font_1994281_a83sr011dzg.ttf')"
			})
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
	@import '@/mypUI/icon.css';
	@import '@/mypUI/base.scss';
</style>
