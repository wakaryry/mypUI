import {
	Utils
} from '../utils/utils.js';

/**
 * 根据26个字母取每一项首字母对数据进行排序,处理数据变换
 * @return {[array]}
 */
export function totalList(normalList, hotListConfig, specialListConfig, indexs) {
	let letters = indexs || ''
	if (letters.length === 0) {
		letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	}
	const res = []
	letters.split('').forEach(letter => {
		const _data = normalList.filter(item => {
			if (item.pinyin) {
				return item.pinyin.slice(0, 1).toLowerCase() === letter.toLowerCase();
			} else if (item.py) {
				return item.py.slice(0, 1).toLowerCase() === letter.toLowerCase();
			} else {
				return false;
			}
		});
		if (_data.length) {
			res.push({
				title: letter,
				data: _data,
				type: 'list'
			});
		}
	});

	// 处理热门数据
	const hotList = getSpecialData(hotListConfig);
	hotList && res.unshift(hotList);

	// 处理特殊数据
	const specialList = getSpecialData(specialListConfig);
	specialList && res.unshift(specialList);

	return res;
}

export function getSpecialData(data) {
	if (data && data.type && data.list && data.list.length > 0) {
		const {
			type,
			title,
			list
		} = data;
		// we add an id, since title will be chinese which is not supported in mp
		return {
			title,
			id: data.id ? data.id : null,
			type,
			data: type === 'group' ? Utils.arrayChunk(list) : list
		};
	} else {
		return null;
	}
}
