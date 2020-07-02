const formatNum = (num) => {
	return num*1 < 10 ? ('0' + num*1) : (num + '')
}

const generateNumArr = (start, end, step=1) => {
	const arr = []
	if (start*1 > end*1) {
		for (let i = start*1; i >= end*1; i = i - step*1) {
			arr.push(formatNum(i))
		}
	} else {
		for (let i = start*1; i <= end*1; i+=step*1) {
			arr.push(formatNum(i))
		}
	}
	return arr
}

const generateDaysArr = (year, month, start=1, end=0, step=1) => {
	const arr = []
	// month不能减1，因为日期0，表示是上一个月的最后一天
	const days = new Date(year*1, month*1, 0).getDate()
	for (let i = start*1; i <= days; i+=step*1) {
		arr.push(formatNum(i))
	}
	return arr
}

const getDefaultValue = (mode, value, useCurrent) => {
	if (value && typeof value === 'object' && value.length > 0) {
		return value
	}
	if (useCurrent) {
		const now = new Date()
		switch (mode) {
			case 'dateTime':
				return [now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours(), now.getMinutes()]
				break
			case 'date':
				return [now.getFullYear(), now.getMonth()+1, now.getDate()]
				break
			case 'yearMonth':
				return [now.getFullYear(), now.getMonth()+1]
				break
			case 'time':
				return [now.getHours(), now.getMinutes()]
				break
		}
	}
	return []
}

const findYearMonthIndex = (years, months, value) => {
	const y = formatNum(value[0])
	const yIdx = years.indexOf(y)
	if (yIdx<0) return false;
	if (value.length === 1) return [yIdx, 0];
	const m = formatNum(value[1])
	const mIdx = months.indexOf(m)
	if (mIdx<0) return false;
	return [yIdx, mIdx]
}

const findDateIndex = (years, months, days, value, startD=1) => {
	const arr = findYearMonthIndex(years, months, value)
	if (!arr) return {index:false, days: days};
	let ds = days
	if (ds.length === 0) {
		ds = generateDaysArr(years[arr[0]], months[arr[1]], startD)
	}
	// find day index
	if (value.length <= 2) {
		arr.push(0)
		return {index: arr, days: ds}
	}
	const d = formatNum(value[2])
	const dIdx = ds.indexOf(d)
	if (dIdx<0) return {index:false, days: ds};
	arr.push(dIdx)
	return {
		index: arr,
		days: ds
	}
}

const findTimeIndex = (hours, minutes, value) => {
	const h = formatNum(value[0])
	const hIdx = hours.indexOf(h)
	if (hIdx<0) return false;
	if (value.length === 1) return [hIdx, 0]
	const m = formatNum(value[1])
	const mIdx = minutes.indexOf(m)
	if (mIdx<0) return false;
	return [hIdx, mIdx]
}

const findDateTimeIndex = (years, months, days, hours, minutes, value, startD=1) => {
	const arr = findDateIndex(years, months, days, value, startD)
	const arr1 = arr.index
	if (!arr1) {
		return {index: false, days: arr.days}
	}
	if (value.length <= 3) {
		return {index: arr1.concat([0, 0]), days: arr.days}
	}
	const a = value.slice(3, value.length-1)
	const arr2 = findTimeIndex(a)
	if (!arr2) return {index: false, days: arr.days};
	return {
		index: arr1.concat(arr2),
		days: arr.days
	}
}

const dataMaker = {
	date: {
		// 不对数据进行校验，请保证自己数据的正确性
		// date/yearMonth/dateTime/time
		init(mode='date', value, useCurrent, startY, endY, startM, endM, startD, endD, startHH, endHH, startMM, endMM) {
			let years = []
			let months = []
			let days = []
			let hours = []
			let minutes = []
			let defaultArr = []  // value into index
			switch (mode) {
				case 'date':
				case 'dateTime':
				case 'yearMonth':
					years = generateNumArr(startY, endY)
					months = generateNumArr(startM, endM)
					if (endD*1 > 0) {
						days = generateNumArr(startD, endD)
					}
					if (mode === 'dateTime') {
						hours = generateNumArr(startHH, endHH)
						minutes = generateNumArr(startMM, endMM)
					}
					break
				case 'time':
					hours = generateNumArr(startHH, endHH)
					minutes = generateNumArr(startMM, endMM)
					break
			}
			const _value = getDefaultValue(mode, value, useCurrent)
			// find the default index
			let flag = false
			if (_value && _value.length > 0) {
				switch (mode) {
					case 'date':
						const a = findDateIndex(years, months, days, _value, startD)
						flag = a.index
						if (days.length === 0) {
							days = a.days
						}
						break
					case 'dateTime':
						const b = findDateTimeIndex(years, months, days, hours, minutes, _value, startD)
						flag = b.index
						if (days.length === 0) {
							days = b.days
						}
						break
					case 'yearMonth':
						flag = findYearMonthIndex(years, months, _value)
						break
					case 'time':
						flag = findTimeIndex(hours, minutes, _value)
						break
				}
			}
			if (flag) {
				defaultArr = flag
				flag = true
			}
			// default value不存在或者找不到存在的index
			if (!flag) {
				// 默认使用第一行
				switch (mode) {
					case 'date':
						days = generateDaysArr(years[0], months[0], startD)
						defaultArr = [0,0,0]
						break
					case 'dateTime':
						days = generateDaysArr(years[0], months[0], startD)
						defaultArr = [0,0,0,0,0]
						break
					case 'yearMonth':
						defaultArr = [0,0]
						break
					case 'time':
						defaultArr = [0,0]
						break
				}
			}
			switch (mode) {
				case 'date':
					return {
						years,
						months,
						days,
						defaultArr
					}
					break
				case 'dateTime':
					return {
						years,
						months,
						days,
						hours,
						minutes,
						defaultArr
					}
					break
				case 'yearMonth':
					return {
						years,
						months,
						defaultArr
					}
					break
				case 'time':
					return {
						hours,
						minutes,
						defaultArr
					}
					break
			}
		},
		initDays(year, month, start=1, end=0, step=1) {
			return generateDaysArr(year, month, start, end, step)
		}
	},
	range: {
		init(mode='dateRange', value, useCurrent, startY, endY, startM, endM, startD, endD, startHH, endHH, startMM, endMM) {
			
		}
	}
}

export default dataMaker
