import Request from '@/mypUI/myp-request/index.js'
import {isAccessExpired, isRefreshExpired, updateAccess} from '@/common/token.js'

import {
	baseUrl, isMockServer
} from './env.js'

const config = {
	baseUrl: baseUrl,
	header: {"content-type": "application/x-www-form-urlencoded"}
}

const reqInterceptor = async (options) => {
	const authType = options.authType || 'Bearer'
	delete options.authType
	// if it allows token/non-token to return diff response
	// the default is we can not toggle
	const toggle = options.toggle || false
	delete options.toggle
	
	// we must copy the global header-config since the header is just override
	options.header = Object.assign({}, config.header, options.header||{})
	// here we add auth interceptor
	const app = getApp({allowDefault: true})
	const access = app.globalData.access
	const accessExpired = isAccessExpired()
	const refreshExpired = isRefreshExpired()
	if (authType === 'None') {
		if (options.header.Authorization) {
			delete options.header.Authorization
		}
		_requestLog(options, "None Auth Type")
		return options
	}
	// need auth, or it could be toggle. if have token, we must write token into header
	if (accessExpired) {
		if (refreshExpired) {
			delete options.header.Authorization
			if (!toggle) {
				uni.$emit("logedOut")
				_requestLog(options, "ac/rf都已经过期，且不能匿名访问，需要重新登录")
				// return object with mypReqToCancel:true key-value
				return {mypReqToCancel: true, text: '请求未通过验证,检查是否登录或者数据正确', type: 'warning'}
			}
		} else {
			try{
				const acc = await _toRefreshAccess()
				options.header.Authorization = authType + ' ' + access
			}catch(e){
				// TODO: handler error to refresh token
				delete options.header.Authorization
				if (!toggle) {
					uni.$emit("logedOut")
					_requestLog(options, "刷新ac失败，且不能匿名访问，需要重新登录")
					return {mypReqToCancel: true, text: '请求未通过验证,检查是否登录或者数据正确', type: 'warning'}
				}
			}
		}
	} else {
		options.header = Object.assign({}, options.header, {
			Authorization: authType + ' ' + access
		})
	}
	_requestLog(options, "成功通过")
	return options
}

const resInterceptor = (response, conf={}) => {
	if (response.mypFail) {
		return response.response
	}
	if (response.mypCancel) {
		return response.response
	}
	const statusCode = response.statusCode
	
	// response interceptor
	if (statusCode >= 200 && statusCode < 300) { //成功
		_responseLog(response, conf, "response 200-299")
		// if the returned data is string type, we need to parse it into Object
		if (typeof response.data === 'string') {
			const parsed = JSON.parse(response.data)
			response.data = parsed
		}
		// for mock data, we do not have {code: 200, msg: "xxx", data: {}} style, just {}
		if (process.env.NODE_ENV === 'development') {
			if (isMockServer) {
				if (response.data.errMsg) {
					return {
						mypReqToReject: true,
						text: response.data.errMsg,
						// we could change type according to code
						type: 'error'
					}
				}
				return response.data
			} else {
				// test api server
				if (response.data.code === 200) {
					return response.data.data || {}  // in case null
				}
				return {
					mypReqToReject: true,
					text: response.data.msg,
					// we could change type according to code
					type: 'warning'
				}
			}
		} else {
			// in prod, we use {code: 200, msg: "xxx", data: {}}
			if (response.data.code === 200) {
				return response.data.data || {}  // in case null
			}
			// if returned code is not 200, we will reject the response
			// in reject, we just return the msg
			return {
				mypReqToReject: true,
				text: response.data.msg,
				// we could change type according to code
				type: 'warning'
			}
		}
	} else if (statusCode === 500) {
		_responseLog(response, conf, "response 500")
		return {
			mypReqToReject: true,
			text: "服务异常，请稍后再试或反馈问题",
			// we could change type according to code
			type: 'error'
		}
	} else {
		_responseLog(response, conf, "response 300-499")
		// we do not do any hint to user with server errors
		return {
			mypReqToReject: true,
			text: "请求失败，请稍后再试或反馈问题",
			// we could change type according to code
			type: 'error'
		}
	}
}

// 一个实例请求器在很多请求中是通用的,它只会被初始化一次,每一次请求的时候,用的是同一个请求器,并不是每次都初始化
// 如果请求的类型不一致,处理方式不一样,建议您实例化多个请求器
// 或者我们可以再具体的请求里面对option进行配置,覆盖掉请求器的配置,覆盖只在当前请求有效
const req = new Request(config, reqInterceptor, resInterceptor)

// request log
function _requestLog(req, describe=null) {
	if (process.env.NODE_ENV === 'development') {
		console.log("地址：" + req.url)
		if (describe) {
			console.log("描述：" + describe)
		}
		console.log("详细：" + JSON.stringify(req))
	}
	//TODO into log server
}

// response log
function _responseLog(res, conf={}, describe=null) {
	let _statusCode = res.statusCode;
	if (process.env.NODE_ENV === 'development') {
		console.log("地址: " + conf.url)
		if (describe) {
			console.log("描述：" + describe)
		}
		console.log("结果: " + JSON.stringify(res))
	}
}

function _toRefreshAccess() {
	const app = getApp({allowDefault: true})
	const refresh = app.globalData.refresh
	return new Promise((resolve, reject)=>{
		uni.request({
			url: baseUrl + '/token/refresh/',
			method: 'POST',
			data: {
				refresh: refresh
			},
			success: res => {
				if (res.statusCode >= 200 && res.statusCode < 300) {
					if (process.env.NODE_ENV === 'development' && isMockServer) {
						updateAccess(res.data.access)
						resolve(res.data.access)
					} else {
						if (response.data.code === 200) {
							updateAccess(res.data.data.access)
							resolve(res.data.data.access)
						} else {
							updateAccessRefresh(null, null)
							reject("get error")
						}
					}
				} else {
					// TODO: handle error info
					// here we clear all token info, we need to login again
					updateAccessRefresh(null, null)
					reject("get error")
				}
			},
			fail: (e) => {
				reject('no_network')
			}
		})
	})
}

export default req
