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
			this.noWeexRightAni = `transition-duration: ${dur}ms; transform: rotate(${newDeg.right}deg);`
			this.noWeexLeftAni = `transition-duration: ${dur}ms; transform: rotate(${newDeg.left}deg);`
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
				that.noWeexRightAni = `transition-duration: ${rightDelay}ms; transform: rotate(45deg);`
			}, leftDelay)
			
			setTimeout(()=>{
				that.noWeexRightAni = `transition-duration: ${newDur.right}ms; transform: rotate(${newDeg.right}deg);`
			}, leftDelay+rightDelay)
			
			setTimeout(()=>{
				that.noWeexLeftAni = `transition-duration: ${newDur.left}ms; transform: rotate(${newDeg.left}deg);`
			}, leftDelay+rightDelay+newDur.right)
		},
		oneWayProgress(pr, lastPr, duration) {
			const that = this
			const newDur = this.getDuration(pr, duration)
			const newDeg = this.getDeg(pr)
			if (duration) {
				if (pr >= lastPr) {
					this.noWeexRightAni = `transition-duration: ${newDur.right}ms; transform: rotate(${newDeg.right}deg);`
					setTimeout(()=>{
						that.noWeexLeftAni = `transition-duration: ${newDur.left}ms; transform: rotate(${newDeg.left}deg);`
					}, newDur.right)
				} else {
					this.noWeexLeftAni = `transition-duration: ${newDur.left}ms; transform: rotate(${newDeg.left}deg);`
					setTimeout(()=>{
						that.noWeexRightAni = `transition-duration: ${newDur.right}ms; transform: rotate(${newDeg.right}deg);`
					}, newDur.left)
				}
			} else {
				const lastDur = this.getBackDuration(lastPr, this.duration)
				if (pr >= lastPr) {
					this.noWeexRightAni = `transition-duration: ${newDur.right - lastDur.right}ms; transform: rotate(${newDeg.right}deg);`
					setTimeout(()=>{
						that.noWeexLeftAni = `transition-duration: ${newDur.left - lastDur.left}ms; transform: rotate(${newDeg.left}deg);`
					}, newDur.right - lastDur.right)
				} else {
					this.noWeexLeftAni = `transition-duration: ${lastDur.left - newDur.left}ms; transform: rotate(${newDeg.left}deg);`
					setTimeout(()=>{
						that.noWeexRightAni = `transition-duration: ${lastDur.right - newDur.right}ms; transform: rotate(${newDeg.right}deg);`
					}, lastDur.left - newDur.left)
				}
			}
		}
		// #endif
	}
}
