import { requestConfig } from './common.js'

// attention: the success/fail/complete handler here for global or custom config in request is just for uni.request's success/fail/complete.
// it's not meaning the status of 200-300. status 400 from server is also success in uni.request
export default class Request {
	constructor(config={}, reqInterceptor=null, resInterceptor=null, successHandler=null, failHandler=null, completeHandler=null) {
		// base
	    this.baseUrl = config.baseUrl
		if (config.header) {
			// we must parse deep-copy header, then it can not be influenced by the-before request
			this.header = Object.assign({}, config.header) // JSON.parse(JSON.stringify(config.header))
		} else {
			this.header = {"Content-Type": "application/json;charset=UTF-8"}
		}
		// this.header = config.header || {"Content-Type": "application/json;charset=UTF-8"},
		// global callback for success/fail/complete. They are also response interceptors.
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
		if (config.failReject && (typeof config.failReject === 'object')) {
			this.failReject = Object.assign({}, config.failReject)
		} else {
			// when null fail reject, it will reject the error info of fail
			this.failReject = null
		}
	}
	// type: request/upload/download.
	// the success/fail/complete handler will not override the global, it will just call after global
	async request(options, successHandler=null, failHandler=null, completeHandler=null) {
		const task = options.task || false
		const type = options.type || "request"
		// delete options.task
		let config = null
		try{
			// 执行请求拦截器,重新构造请求数据/参数(不包括响应拦截器/处理器)
			config = await requestConfig(this, options)
		}catch(e){
			// we reject the error info
			return Promise.reject(e)
		}
		// u could return false
		if (!config || typeof config != 'object') {
			// if we just return, not with Promise.reject, it will be resolved, and the param is null
			return Promise.reject(this.cancelReject)
		}
		// u could return a mypReqToCancel with cancelReject
		if (config.mypReqToCancel) {
			if (config.cancelReject && (typeof config.cancelReject === 'object')) {
				return Promise.reject(config.cancelReject)
			}
			return Promise.reject(this.cancelReject)
		}
		if (config.cancelReject) {
			delete config.cancelReject
		}
		// console.log(config)
		const that = this
		if (task) {
			config["success"] = (response) => {
				if (that.responseInterceptor) {
					that.responseInterceptor(response, config)
				}
				that.success && that.success(response)
				successHandler && successHandler(response)
			}
			config["fail"] = (response) => {
				that.fail && that.fail(response)
				failHandler && failHandler(response)
			}
			config["complete"] = (response) => {
				that.complete && that.complete(response)
				completeHandler && completeHandler(response)
			}
			if (type === "request") {
				return uni.request(config)
			} else if (type === "upload") {
				return uni.uploadFile(config)
			} else {
				return uni.downloadFile(config)
			}
			return
		}
		return new Promise((resolve, reject)=>{
			config["success"] = (response) => {
				let _res = null
				if (that.responseInterceptor) {
					_res = that.responseInterceptor(response, config)
				}
				that.success && that.success(response)
				successHandler && successHandler(response)
				// we use a tag to reject
				// we allow return null response
				if (_res && _res.mypReqToReject) {
					delete _res.mypReqToReject
					reject(_res)
				} else {
					resolve(_res)
				}
			}
			config["fail"] = (response) => {
				that.fail && that.fail(response)
				failHandler && failHandler(response)
				// need to handle fail reject
				if (config.failReject && (typeof config.failReject === 'object')) {
					reject(config.failReject)
				} else {
					if (that.failReject) {
						reject(that.failReject)
					} else {
						// reject the error
						reject(response)
					}
				}
			}
			config["complete"] = (response) => {
				that.complete && that.complete(response)
				completeHandler && completeHandler(response)
			}
			// console.log(config)
			if (type === "request") {
				uni.request(config)
			} else if (type === "upload") {
				uni.uploadFile(config)
			} else {
				uni.downloadFile(config)
			}
		})
	}
}
