import router from './index.js'
import {mapGetters} from 'vuex'

// it's a mixin
export default {
	// do not use navTo/tab/delta in others if to override
	data() {
		return {
			// 用于页面共享,定义了页面的业务/业务上下文
			fromAction: null,
			// 定义了toNavBack的方式
			// 一般是用在完成一定的操作之后定义如何返回,返回到哪,程序内动态返回.其它请使用指定的方法
			// back/root/switch
			navBack: "back",
			tab: null,
			delta: 1,
			leftIcons: [{icon:'left', style: 'width:44px;height:44px;'}],
			// used to remove left icons. only use off. on/off
			// relaunch到下一页的时候,下一页是没有leftIcon的,要么我们在页面上判断,要么我们自动判断.这里采用url传参自动判断
			leftIconSwitch: 'on'
		}
	},
	onLoad(option) {
		if (option.fromAction) {
			this.fromAction = option.fromAction
		}
		// nav/tab/delta in option
		this.navBack = option.nav || "back"
		if (option.tab) {
			this.tab = option.tab
		}
		if (option.delta) {
			this.delta = option.delta
		}
		if (option.left) {
			this.leftIconSwitch = option.left
			if (this.leftIconSwitch === 'off') {
				this.leftIcons = []
			}
		}
	},
	computed: {
		...mapGetters(['hasLogedIn'])
	},
	methods: {
		navLeftAction(i) {
			this.toNavBackOne()
		},
		// 动态nav to. 根据data里面的数据nav to,数据不同,进入不同的下一页
		toNavBack() {
			if (this.navBack === "back") {
				uni.navigateBack({
					delta: this.delta * 1
				})
			} else if (this.navBack === "switch") {
				if (this.tab === 'home') {
					this.relaunchToHome()
				} else if (this.tab === 'discovery') {
					this.relaunchToDiscovery()
				} else if (this.tab === 'mine') {
					this.relaunchToMine()
				} else {
					// auto
					this.relaunchToCurrentTab()
				}
			} else if (this.navBack === 'root') {
				this.toNavbackToRoot()
			}
		},
		// just to back one page
		toNavBackOne() {
			uni.navigateBack({
				delta: 1
			});
		},
		toNavbackToRoot() {
			// if used relaunch in the process, navToRoot will not action what u want
			const pages = getCurrentPages()
			if (pages.length > 1) {
				uni.navigateBack({
					delta: (pages.length - 1)
				});
			}
		},
		// 对于tab来说,只有真正需要relaunch的时候才relaunch,其它都是直接toRoot可以直达底层
		relaunchToHome() {
			uni.reLaunch({
				url: "/pages/tabs/index?target=home"
			})
		},
		relaunchToDiscovery() {
			uni.reLaunch({
				url: "/pages/tabs/index?target=discovery"
			})
		},
		relaunchToMine() {
			uni.reLaunch({
				url: "/pages/tabs/index?target=mine"
			})
		},
		relaunchToCurrentTab() {
			// 根据当前的tab,自动relaunch到tab
			const app = getApp()
			let currentTab = 0
			if (app) {
				currentTab = app.globalData.currentTab
			}
			if (currentTab === 0) {
				this.relaunchToHome()
			} else if (currentTab === 1) {
				this.relaunchToDiscovery()
			} else if (currentTab === 2) {
				this.relaunchToMine()
			} else {
				this.relaunchToHome()
			}
		},
		// do not use the option in data
		// 手动指定跳转到哪个页面,如何跳转
		// 还可以添加拦截等
		redirectTo(name, options={}) {
			router.redirectTo(name, options)
		},
		navigateTo(name, options={}, needLogin=false) {
			if (needLogin) {
				if (!this.hasLogedIn) {
					this.mypShowToast({
						type: 'warning',
						text: '您需要先登录',
						mode: 'big'
					})
					return
				}
			}
			router.navigateTo(name, options)
		},
		relaunch(name, options={}) {
			// 自动为relaunch加上关闭leftIcons
			// 如果有需要可以设置不关闭
			if (!options.left) {
				options['left'] = 'off'
			}
			router.relaunch(name, options)
		},
		switchTab(name, options={}) {
			router.switchTab(name, options)
		}
	}
}
