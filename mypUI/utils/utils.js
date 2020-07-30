function isSrc(url) {
	return url.indexOf('http') === 0 || url.indexOf('data:image') === 0 || url.indexOf('//') === 0;
}

const Utils = {
	_typeof(obj) {
		return Object.prototype.toString
			.call(obj)
			.slice(8, -1)
			.toLowerCase();
	},
	isPlainObject(obj) {
		return Utils._typeof(obj) === 'object';
	},
	isString(obj) {
		return typeof obj === 'string';
	},
	isNonEmptyArray(obj = []) {
		return obj && obj.length > 0 && Array.isArray(obj) && typeof obj !== 'undefined';
	},
	isObject(item) {
		return item && typeof item === 'object' && !Array.isArray(item);
	},
	isEmptyObject(obj) {
		return Object.keys(obj).length === 0 && obj.constructor === Object;
	},
	decodeIconFont(text) {
		// 正则匹配 图标和文字混排 eg: 我去上学校&#xe600;,天天不&#xe600;迟到
		const regExp = /&#x[a-z|0-9]{4,5};?/g;
		if (regExp.test(text)) {
			return text.replace(new RegExp(regExp, 'g'), function(iconText) {
				const replace = iconText.replace(/&#x/, '0x').replace(/;$/, '');
				return String.fromCharCode(replace);
			});
		} else {
			return text;
		}
	},
	mergeDeep(target, ...sources) {
		if (!sources.length) return target;
		const source = sources.shift();
		if (Utils.isObject(target) && Utils.isObject(source)) {
			for (const key in source) {
				if (Utils.isObject(source[key])) {
					if (!target[key]) {
						Object.assign(target, {
							[key]: {}
						});
					}
					Utils.mergeDeep(target[key], source[key]);
				} else {
					Object.assign(target, {
						[key]: source[key]
					});
				}
			}
		}
		return Utils.mergeDeep(target, ...sources);
	},
	// only works in app-weex env, do not use it in mp/h5 of uni-app
	appendProtocol(url) {
		if (/^\/\//.test(url)) {
			const {
				bundleUrl
			} = weex.config;
			return `http${/^https:/.test(bundleUrl) ? 's' : ''}:${url}`;
		}
		return url;
	},
	encodeURLParams(url) {
		const parsedUrl = new UrlParser(url, true);
		return parsedUrl.toString();
	},
	deepCopy(obj) {
		var newobj = {}
		for (arr in obj) {
			if (typeof obj[arr] === 'object' && obj[arr] !== null) {
				newobj[arr] = deepcopy(obj[arr])
			} else {
				newobj[arr] = obj[arr]
			}
		}
		return newobj
	},
	/**
	 * 版本号比较
	 * @memberOf Utils
	 * @param currVer {string}
	 * @param promoteVer {string}
	 * @returns {boolean}
	 * @example
	 *
	 * const { Utils } = require('@ali/wx-bridge');
	 * const { compareVersion } = Utils;
	 * console.log(compareVersion('0.1.100', '0.1.11')); // 'true'
	 */
	compareVersion(currVer = '0.0.0', promoteVer = '0.0.0') {
		if (currVer === promoteVer) return true;
		const currVerArr = currVer.split('.');
		const promoteVerArr = promoteVer.split('.');
		const len = Math.max(currVerArr.length, promoteVerArr.length);
		for (let i = 0; i < len; i++) {
			const proVal = ~~promoteVerArr[i];
			const curVal = ~~currVerArr[i];
			if (proVal < curVal) {
				return true;
			} else if (proVal > curVal) {
				return false;
			}
		}
		return false;
	},
	/**
	 * 分割数组
	 * @param arr 被分割数组
	 * @param size 分割数组的长度
	 * @returns {Array}
	 */
	arrayChunk(arr = [], size = 4) {
		let groups = [];
		if (arr && arr.length > 0) {
			groups = arr
				.map((e, i) => {
					return i % size === 0 ? arr.slice(i, i + size) : null;
				})
				.filter(e => {
					return e;
				});
		}
		return groups;
	},
	// 乱序array. 原地打乱。需要注意会覆盖传入的数组
	derangeArray(arr=[]) {
		for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
		return arr
	},
	/*
	 * 截断字符串
	 * @param str 传入字符串
	 * @param len 截断长度
	 * @param hasDot 末尾是否...
	 * @returns {String}
	 */
	truncateString(str, len, hasDot = true) {
		let newLength = 0;
		let newStr = '';
		let singleChar = '';
		const chineseRegex = /[^\x00-\xff]/g;
		const strLength = str.replace(chineseRegex, '**').length;
		for (let i = 0; i < strLength; i++) {
			singleChar = str.charAt(i).toString();
			if (singleChar.match(chineseRegex) !== null) {
				newLength += 2;
			} else {
				newLength++;
			}
			if (newLength > len) {
				break;
			}
			newStr += singleChar;
		}

		if (hasDot && strLength > len) {
			newStr += '...';
		}
		return newStr;
	},
	/*
	 * 转换 obj 为 url params参数
	 * @param obj 传入字符串
	 * @returns {String}
	 */
	objToParams(obj) {
		let str = '';
		for (const key in obj) {
			if (str !== '') {
				str += '&';
			}
			str += key + '=' + encodeURIComponent(obj[key]);
		}
		return str;
	},
	/*
	 * 转换 url params参数为obj
	 * @param str 传入url参数字符串
	 * @returns {Object}
	 */
	paramsToObj(str) {
		let obj = {};
		try {
			obj = JSON.parse(
				'{"' +
				decodeURI(str)
				.replace(/"/g, '\\"')
				.replace(/&/g, '","')
				.replace(/=/g, '":"') +
				'"}'
			);
		} catch (e) {
			console.log(e);
		}
		return obj;
	}
}

module.exports = {
	isSrc: isSrc,
	Utils
}
