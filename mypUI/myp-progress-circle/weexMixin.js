// #ifdef APP-NVUE
const animation = weex.requireModule('animation');
// #endif

export default {
	methods: {
		// #ifdef APP-NVUE
		twoWayZeroProgress(pr, lastPr, duration) {
			const rightEl = this.$refs['myp-right']
			const leftEl = this.$refs['myp-left']
			
			let delay = 0
			if (this.aniToZero) {
				const lastDur = this.getBackDuration(lastPr, this.duration)
				delay = lastDur.left > lastDur.right ? lastDur.left : lastDur.right
			}
			// back to zero
			animation.transition(leftEl, {
				styles: {
					transform: 'rotate(225deg)'
				},
				duration: delay,
				delay: 0
			})
			animation.transition(rightEl, {
				styles: {
					transform: 'rotate(45deg)'
				},
				duration: delay,
				delay: 0
			}, ()=>{
				// forward
				const newDur = this.getDuration(pr, duration)
				const dur = newDur.left > newDur.right ? newDur.left : newDur.right
				const newDeg = this.getDeg(pr)
				animation.transition(leftEl, {
					styles: {
						transform: `rotate(${newDeg.left}deg)`
					},
					duration: dur
				})
				animation.transition(rightEl, {
					styles: {
						transform: `rotate(${newDeg.right}deg)`
					},
					duration: dur
				})
			})
		},
		twoWayProgress(pr, lastPr, duration) {
			const rightEl = this.$refs['myp-right']
			const leftEl = this.$refs['myp-left']
			// continue
			let dur = duration
			const newDeg = this.getDeg(pr)
			if (!duration) {
				const newDur = this.getDuration(pr, duration)
				const lastDur = this.getBackDuration(lastPr, this.duration)
				dur = Math.max(Math.abs(newDur.left - lastDur.left), Math.abs(newDur.right - lastDur.right))
			}
			animation.transition(leftEl, {
				styles: {
					transform: `rotate(${newDeg.left}deg)`
				},
				duration: dur
			})
			animation.transition(rightEl, {
				styles: {
					transform: `rotate(${newDeg.right}deg)`
				},
				duration: dur
			})
		},
		oneWayZeroProgress(pr, lastPr, duration) {
			const rightEl = this.$refs['myp-right']
			const leftEl = this.$refs['myp-left']
			const that = this
			// back to zero
			let leftDelay = 0
			let rightDelay = 0
			if (this.aniToZero) {
				const lastDur = this.getBackDuration(lastPr, this.duration)
				leftDelay = lastDur.left
				rightDelay = lastDur.right
			}
			animation.transition(leftEl, {
				styles: {
					transform: 'rotate(225deg)'
				},
				duration: leftDelay
			}, ()=>{
				animation.transition(rightEl, {
					styles: {
						transform: 'rotate(45deg)'
					},
					duration: rightDelay
				}, ()=>{
					// forward
					const newDur = that.getDuration(pr, duration)
					const newDeg = that.getDeg(pr)
					animation.transition(rightEl, {
						styles: {
							transform: `rotate(${newDeg.right}deg)`
						},
						duration: newDur.right
					}, ()=>{
						animation.transition(leftEl, {
							styles: {
								transform: `rotate(${newDeg.left}deg)`
							},
							duration: newDur.left
						})
					})
				})
			})
		},
		oneWayProgress(pr, lastPr, duration) {
			const rightEl = this.$refs['myp-right']
			const leftEl = this.$refs['myp-left']
			const that = this
			const newDur = this.getDuration(pr, duration)
			const newDeg = this.getDeg(pr)
			if (duration) {
				if (pr >= lastPr) {
					animation.transition(rightEl, {
						styles: {
							transform: `rotate(${newDeg.right}deg)`
						},
						duration: newDur.right
					}, ()=>{
						animation.transition(leftEl, {
							styles: {
								transform: `rotate(${newDeg.left}deg)`
							},
							duration: newDur.left
						})
					})
				} else {
					animation.transition(leftEl, {
						styles: {
							transform: `rotate(${newDeg.left}deg)`
						},
						duration: newDur.left
					}, ()=>{
						animation.transition(rightEl, {
							styles: {
								transform: `rotate(${newDeg.right}deg)`
							},
							duration: newDur.right
						})
					})
				}
			} else {
				const lastDur = this.getBackDuration(lastPr, this.duration)
				if (pr >= lastPr) {
					animation.transition(rightEl, {
						styles: {
							transform: `rotate(${newDeg.right}deg)`
						},
						duration: newDur.right - lastDur.right
					}, ()=>{
						animation.transition(leftEl, {
							styles: {
								transform: `rotate(${newDeg.left}deg)`
							},
							duration: newDur.left - lastDur.left
						})
					})
				} else {
					animation.transition(leftEl, {
						styles: {
							transform: `rotate(${newDeg.left}deg)`
						},
						duration: lastDur.left - newDur.left
					}, ()=>{
						animation.transition(rightEl, {
							styles: {
								transform: `rotate(${newDeg.right}deg)`
							},
							duration: lastDur.right - newDur.right
						})
					})
				}
			}
		}
		// #endif
	}
}
