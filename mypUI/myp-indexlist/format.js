import {
	Utils
} from '../utils/utils.js';

/**
 * 根据26个字母取每一项首字母对数据进行排序,处理数据变换
 * @return {[array]}
 */
export function totalList(source, hotListConfig, cityLocationConfig) {
	const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const res = [];
	LETTERS.split('').forEach(letter => {
		const _data = source.filter(item => {
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

	// 处理特殊定位数据
	const cityLocation = getSpecialData(cityLocationConfig);
	cityLocation && res.unshift(cityLocation);

	return res;
}

export function getSpecialData(data) {
	if (data && data.type && data.list && data.list.length > 0) {
		const {
			type,
			title,
			list
		} = data;
		return {
			title,
			type,
			data: type === 'group' ? Utils.arrayChunk(list) : list
		};
	} else {
		return null;
	}
}
