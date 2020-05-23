// 有时候我们需要额外处理是否是 IPhoneX

import {Utils} from '../utils/utils.js'

export default {
	props: {
		supportXBar: {
			type: Boolean,
			default: true
		},
		xBarBgType: {
			type: String,
			default: ''
		},
		xBarStyle: {
			type: String,
			default: ''
		}
	},
	computed: {
		mypIsIphoneX() {
			const isIPhoneX = this.mypGetIsIPhoneX()
			return isIPhoneX
		},
		// 仅仅只是一个值,跟是否支持xBar无关
		mypXBarHeight() {
			return this.mypIsIphoneX ? 34 : 0
		},
		// 绑定是否支持xbar
		mypRealXBarHeight() {
			return this.supportXBar ? this.mypXBarHeight : 0
		},
		mypMrXBarStyle() {
			let h = 0
			if (this.supportXBar) {
				h = this.mypXBarHeight
			}
			return `height: ${h}px;` + this.xBarStyle
		}
	},
	methods: {
		mypGetIsIPhoneX() {
			const app = getApp({allowDefault: true})
			if (app.globalData.isIPhoneX) {
				return app.globalData.isIPhoneX
				// we can not use the default as false, we use null for default
			} else if (app.globalData.isIPhoneX !== false) {
				const isIPX = Utils.env.isIPhoneX()
				app.globalData.isIPhoneX = isIPX
				return isIPX
			}
			return false
		}
	}
}
