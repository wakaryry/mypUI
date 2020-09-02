export default {
	methods: {
		// #ifndef APP-NVUE
		twoWayZeroProgress(pr, lastPr, duration) {
			let delay = 0
			if (this.aniToZero) {
				const lastDur = this.getBackDuration(lastPr, this.duration)
				delay = lastDur.left > lastDur.right ? lastDur.left : lastDur.right
			}
			const that = this
			this.noWeexRightAni = `transition-duration: ${delay}ms; transform: rotate(45deg);`
			this.noWeexLeftAni = `transition-duration: ${delay}ms; transform: rotate(225deg);`
			setTimeout(()=>{
				if (pr > 0.5) {
					that.noWeexLeftOpacity = 'opacity: 1;'
					that.noWeexRightOpacity = 'opacity:1;'
				} else {
					that.noWeexLeftOpacity = 'opacity:0;'
					if (pr <= 0) {
						that.noWeexRightOpacity = 'opacity:0;'
					} else {
						that.noWeexRightOpacity = 'opacity:1;'
					}
				}
				const newDur = that.getDuration(pr, duration)
				const dur = newDur.left > newDur.right ? newDur.left : newDur.right
				const newDeg = that.getDeg(pr)
				that.noWeexRightAni = `transition-duration: ${dur}ms; transform: rotate(${newDeg.right}deg);`
				that.noWeexLeftAni = `transition-duration: ${dur}ms; transform: rotate(${newDeg.left}deg);`
			}, delay)
		},
		twoWayProgress(pr, lastPr, duration) {
			// continue
			let dur = duration
			const newDeg = this.getDeg(pr)
			if (!duration) {
				const newDur = this.getDuration(pr, duration)
				const lastDur = this.getBackDuration(lastPr, this.duration)
				dur = Math.max(Math.abs(newDur.left - lastDur.left), Math.abs(newDur.right - lastDur.right))
			}
			if (lastPr > 0.5) {
				
			} else {
				if (pr > 0.5) {
					this.noWeexLeftOpacity = 'opacity:1;'
				}
				if (pr > 0) {
					this.noWeexRightOpacity = 'opacity:1;'
				}
			}
			this.noWeexRightAni = `transition-duration: ${dur}ms; transform: rotate(${newDeg.right}deg);`
			this.noWeexLeftAni = `transition-duration: ${dur}ms; transform: rotate(${newDeg.left}deg);`
			const that = this
			setTimeout(()=>{
				if (pr <= 0.5) {
					this.noWeexLeftOpacity = 'opacity:0;'
				}
				if (pr <= 0) {
					this.noWeexRightOpacity = 'opacity:0;'
				}
			}, dur)
		},
		oneWayZeroProgress(pr, lastPr, duration) {
			const that = this
			// back to zero
			let leftDelay = 0
			let rightDelay = 0
			if (this.aniToZero) {
				const lastDur = this.getBackDuration(lastPr, this.duration)
				leftDelay = lastDur.left
				rightDelay = lastDur.right
			}
			const newDur = this.getDuration(pr, duration)
			const newDeg = this.getDeg(pr)
			
			this.noWeexLeftAni = `transition-duration: ${leftDelay}ms; transform: rotate(225deg);`
			
			setTimeout(()=>{
				that.noWeexLeftOpacity = 'opacity:0;'
				that.noWeexRightAni = `transition-duration: ${rightDelay}ms; transform: rotate(45deg);`
			}, leftDelay)
			
			setTimeout(()=>{
				if (pr <= 0) {
					that.noWeexRightOpacity = 'opacity:0;'
				} else {
					that.noWeexRightOpacity = 'opacity:1;'
				}
				that.noWeexRightAni = `transition-duration: ${newDur.right}ms; transform: rotate(${newDeg.right}deg);`
			}, leftDelay+rightDelay)
			
			setTimeout(()=>{
				if (pr > 0.5) {
					that.noWeexLeftOpacity = 'opacity:1;'
				} else {
					that.noWeexLeftOpacity = 'opacity:0;'
				}
				that.noWeexLeftAni = `transition-duration: ${newDur.left}ms; transform: rotate(${newDeg.left}deg);`
			}, leftDelay+rightDelay+newDur.right)
		},
		oneWayProgress(pr, lastPr, duration) {
			const that = this
			const newDur = this.getDuration(pr, duration)
			const newDeg = this.getDeg(pr)
			if (pr > 0) {
				this.noWeexRightOpacity = 'opacity:1;'
			}
			if (duration) {
				if (pr >= lastPr) {
					this.noWeexRightAni = `transition-duration: ${newDur.right}ms; transform: rotate(${newDeg.right}deg);`
					setTimeout(()=>{
						if (pr <= 0) {
							that.noWeexRightOpacity = 'opacity:0;'
						}
						if (pr > 0.5 && lastPr <= 0.5) {
							that.noWeexLeftOpacity = 'opacity:1;'
						}
						that.noWeexLeftAni = `transition-duration: ${newDur.left}ms; transform: rotate(${newDeg.left}deg);`
					}, newDur.right)
				} else {
					this.noWeexLeftAni = `transition-duration: ${newDur.left}ms; transform: rotate(${newDeg.left}deg);`
					setTimeout(()=>{
						if (pr < 0.5) {
							that.noWeexLeftOpacity = 'opacity:0;'
						}
						that.noWeexRightAni = `transition-duration: ${newDur.right}ms; transform: rotate(${newDeg.right}deg);`
					}, newDur.left)
					setTimeout(()=>{
						if (pr <= 0) {
							that.noWeexRightOpacity = 'opacity:0;'
						}
					}, newDur.left + newDur.right)
				}
			} else {
				const lastDur = this.getBackDuration(lastPr, this.duration)
				if (pr >= lastPr) {
					this.noWeexRightAni = `transition-duration: ${newDur.right - lastDur.right}ms; transform: rotate(${newDeg.right}deg);`
					setTimeout(()=>{
						if (pr <= 0) {
							that.noWeexRightOpacity = 'opacity:0;'
						}
						if (pr > 0.5 && lastPr <= 0.5) {
							that.noWeexLeftOpacity = 'opacity:1;'
						}
						that.noWeexLeftAni = `transition-duration: ${newDur.left - lastDur.left}ms; transform: rotate(${newDeg.left}deg);`
					}, newDur.right - lastDur.right)
				} else {
					this.noWeexLeftAni = `transition-duration: ${lastDur.left - newDur.left}ms; transform: rotate(${newDeg.left}deg);`
					setTimeout(()=>{
						if (pr < 0.5) {
							that.noWeexLeftOpacity = 'opacity:0;'
						}
						that.noWeexRightAni = `transition-duration: ${lastDur.right - newDur.right}ms; transform: rotate(${newDeg.right}deg);`
					}, lastDur.left - newDur.left)
					setTimeout(()=>{
						if (pr <= 0) {
							that.noWeexRightOpacity = 'opacity:0;'
						}
					}, lastDur.left - newDur.left + lastDur.right - newDur.right)
				}
			}
		}
		// #endif
	}
}
