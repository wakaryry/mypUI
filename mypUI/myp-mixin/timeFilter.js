import {parseTime, formatTime} from '../utils/date.js'

export default {
	filters: {
		mypTimeParse: parseTime,
		mypTimeAgo: formatTime
	}
}
