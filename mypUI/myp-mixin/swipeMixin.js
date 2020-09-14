import {getTouchPoint} from '../utils/element.js'

export default {
	data() {
		return {
			mypSwipeMinTime: 60, // ms
			mypSwipeMinOffset: 30, // px
			mypSwipeStartPoint: null,
			mypSwipeStartTime: 0
		}
	},
	methods: {
		mypSwipeTouchStart(e) {
			this.mypSwipeStartTime = Date.now()
			this.mypSwipeStartPoint = getTouchPoint(e)
		},
		mypSwipeTouchEnd(e) {
			const end = getTouchPoint(e)
			const endX = end.x
			const endY = end.y
			const time = Date.now() - this.mypSwipeStartTime
			
			if (time >=this.mypSwipeMinTime) {
				const xOffset = endX - this.mypSwipeStartPoint.x
				const yOffset = endY - this.mypSwipeStartPoint.y
				let xDirection = ''  // x方向
				let yDirection = ''  // y方向
				let xyDirection = ''  // 取间距最大的那个
				if (Math.abs(xOffset) >= this.mypSwipeMinOffset) {
					if (xOffset < 0) {
						xDirection = 'left'
					} else {
						xDirection = 'right'
					}
				}
				if (Math.abs(yOffset) >= this.mypSwipeMinOffset) {
					if (yOffset < 0) {
						yDirection = 'up'
					} else {
						yDirection = 'down'
					}
				}
				if (Math.abs(xOffset) >= Math.abs(yOffset)) {
					xyDirection = xDirection
				} else {
					xyDirection = yDirection
				}
				return {
					x: xDirection,
					y: yDirection,
					xy: xyDirection,
					time: time
				}
			} else {
				return {
					x: '',
					y: '',
					xy: '',
					time: time
				}
			}
		},
		mypSwipeTouchCancel(e) {
			this.mypSwipeStartTime = 0
			this.mypSwipeStartPoint = null
		}
	}
}
