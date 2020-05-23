// 执行请求拦截,未发送请求之前重新构造请求参数/数据
// 内容应该孤立存在,修改不会互相影响
export async function requestConfig(ins, options) {
	// 每一个请求的数据应该孤立/隔离
	// 具体请求覆盖掉请求器的配置,而不是修改请求器的配置
	// JSON.parse(JSON.stringify(options.header || ins.header))
	// 注意: 这个地方header默认采用了整体取代的方式,options设置了header,ins中的header会整个丢弃
	const header = Object.assign({}, (options.header || ins.header))
	const baseUrl = options.baseUrl || ins.baseUrl
	// config
	let config = {
		url: baseUrl + options.url,
		header: header
	}
	let _cg = null
	if (ins.requestInterceptor) {
		// do the request interceptor and get the new config. 
		// 为了保证数据隔离/孤立,互不影响,采用深拷贝
		try{
			const _options = JSON.parse(JSON.stringify(Object.assign({}, (options||{}), config)))
			// _cg is tha same object of _options
			_cg = await ins.requestInterceptor(_options)
		}catch(e){
			//TODO handle the exception
			return false
		}
		// if the config is false or null, just return, no need to request
		if (!_cg || typeof _cg !== 'object') {
			return false
		}
		// no need to reqeust
		if (_cg.mypReqToCancel) {
			return _cg
		}
		// we could also change the url and header in interceptors
		config.url = _cg.url
		config.header = _cg.header
		// we could also config the fail reject info in options
		if (_cg.failReject && (typeof _cg.failReject === 'object')) {
			config.failReject = _cg.failReject
		}
	}
	const type = options.type || "request"
	// config detail, we do not use options directly => remove unneeded props
	if (type === "request") {
		config["data"] = _cg.data || {}
		config["method"] = _cg.method || "GET"
		config["dataType"] = _cg.dataType || "json"
		config["responseType"] = _cg.responseType || "text"
	} else if (type === "upload") {
		config['filePath'] = _cg.filePath
		config['name'] = _cg.name
		config["method"] = _cg.method || "POST"
		config['formData'] = _cg.formData || {}
		// fileType for alipay
		config["fileType"] = _cg.fileType || "image"
		// reinforce the Content-Type. 
		// TODO: needed to reinforce?
		// config.header['Content-Type'] = 'multipart/form-data;charset=UTF-8'
		delete config.header['Content-Type']
	} // download need nothing else to config
	// console.log(config)
	return config
}

function _isPromise(obj) {
	return obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}
