import { requestConfig } from './common.js'

export default class Request {
	constructor(config={}, reqInterceptor=null, resInterceptor=null, successHandler=null, failHandler=null, completeHandler=null) {
		// base
	    this.baseUrl = config.baseUrl
		if (config.header) {
			// we must parse deep-copy header, then it can not be influenced by the-before request
			this.header = Object.assign({}, config.header) // JSON.parse(JSON.stringify(config.header))
		} else {
			this.header = {"content-type": "application/json;charset=UTF-8"}
		}
		this.success = successHandler
		this.fail = failHandler
		this.complete = completeHandler
		// interceptors
		this.requestInterceptor = reqInterceptor
		this.responseInterceptor = resInterceptor
		if (config.cancelReject && (typeof config.cancelReject === 'object')) {
			this.cancelReject = Object.assign({}, config.cancelReject)
		} else {
			this.cancelReject = {text: '请求未通过验证,检查是否登录或者数据正确', type: 'warning'}
		}
	}
	// type: request/upload/download.
	// the success/fail/complete handler will not override the global, it will just call after global
	async request(options, successHandler=null, failHandler=null, completeHandler=null) {
		const task = options.task || false
		const type = options.type || "request"
		let config = null
		try{
			config = await requestConfig(this, options)
		}catch(e){
			return Promise.reject(e)
		}
		if (!config || typeof config != 'object') {
			return Promise.reject(this.cancelReject)
		}
		// mypReqToCancel with cancelReject
		if (config.mypReqToCancel) {
			if (config.cancelReject && (typeof config.cancelReject === 'object')) {
				return Promise.reject(config.cancelReject)
			}
			return Promise.reject(this.cancelReject)
		}
		if (config.cancelReject) {
			delete config.cancelReject
		}
		const that = this
		config["success"] = (response) => {
			let _res = response
			if (that.responseInterceptor) {
				_res = that.responseInterceptor(response, options)
			}
			if (_res && _res.mypReqToReject) {
				delete _res.mypReqToReject
				that.fail && that.fail(_res)
				failHandler && failHandler(_res)
				that.complete && that.complete(_res)
				completeHandler && completeHandler(_res)
				!task && Promise.reject(_res)
			} else {
				that.success && that.success(_res)
				successHandler && successHandler(_res)
				that.complete && that.complete(_res)
				completeHandler && completeHandler(_res)
				!task && Promise.resolve(_res)
			}
		}
		config["fail"] = (response) => {
			let _res = response
			if (that.responseInterceptor) {
				_res = that.responseInterceptor({mypFail: true, response: response}, options)
				delete _res.mypReqToReject
			}
			that.fail && that.fail(_res)
			failHandler && failHandler(_res)
			that.complete && that.complete(_res)
			completeHandler && completeHandler(_res)
			!task && Promise.reject(_res)
		}
		if (type === "request") {
			if (task) return uni.request(config);
			uni.request(config)
		} else if (type === "upload") {
			if (task) return uni.uploadFile(config);
			uni.uploadFile(config)
		} else {
			if (task) return uni.downloadFile(config);
			uni.downloadFile(config)
		}
	}
}
