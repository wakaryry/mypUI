// #ifndef APP-NVUE
import {getTouchPoint} from '../../utils/element.js'
// #endif

export default {
	props: {
		// #ifdef APP-NVUE
		parentId: {
		    type: String,
		    default: ''
		},
		// #endif
		// #ifndef APP-NVUE
		scrollable: {
			type: Boolean,
			default: false
		},
		// #endif
		current: {
			type: Number,
			default: 0
		},
		index: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			mypInited: false,
			// #ifndef APP-NVUE
			mypStartPoint: null,
			mypLastPoint: null,
			mypFps: 40,
			mypMoveTime: 0,
			mypMoveTimeDiff: 0,
			mypDownHeight: 0,
			mypScrollTopDeviation: 100,
			mypTheScrollTop: 0
			// #endif
		}
	},
	methods: {
		// #ifdef APP-NVUE
		setScrollRef(height) {
		    if (this.$refs['myp-list'].setSpecialEffects) {
		        this.$refs['myp-list'].setSpecialEffects({
		            id: this.parentId,
		            headerHeight: height
		        })
		    }
		},
		// #endif
		// #ifndef APP-NVUE
		mypOnTouchStart(e) {
			if (!this.scrollable) return;
			this.mypStartPoint = getTouchPoint(e)
			this.mypStartTop = this.mypTheScrollTop || 0
			this.mypLastPoint = this.mypStartPoint
			this.mypInTouchend = false
		},
		mypOnTouchMove(e) {
			if (!this.scrollable) return;
			if (!this.mypStartPoint) return;
			const t = new Date().getTime();
			if (this.mypMoveTime && t - this.mypMoveTime < this.mypMoveTimeDiff) {
				return;
			} else {
				this.mypMoveTime = t
				this.mypMoveTimeDiff = 1000 / this.mypFps
			}
			const scrollTop = this.mypTheScrollTop
			const currentPoint = getTouchPoint(e)
			const moveY = currentPoint.y - this.mypStartPoint.y
			// console.log(scrollTop)
			// 往下拉
			if (moveY > 0 && !this.mypInTouchend && (scrollTop <= 0 || (scrollTop <= this.mypScrollTopDeviation && scrollTop === this.mypStartTop))) {
				const diff = currentPoint.y - this.mypLastPoint.y
				this.mypDownHeight += diff
				// console.log('hello')
				this.$emit("move", this.mypDownHeight)
			}
			this.mypLastPoint = currentPoint
		},
		mypOnTouchEnd(e) {
			if (!this.scrollable) return;
			const dh = this.mypDownHeight
			this.mypInTouchend = true
			this.mypDownHeight = 0 // clear
			this.$emit("end", dh)
		},
		mypOnScroll(e) {
			// console.log('child scroll')
			this.mypTheScrollTop = e.detail.scrollTop
		}
		// #endif
	}
}
