import {parseTime, formatTime} from '../utils/date.js'

// since we can not use Vue.filter in nvue, we mix filters in every page
export default {
	filters: {
		mypTimeParse: parseTime,
		mypTimeAgo: formatTime
	}
}
