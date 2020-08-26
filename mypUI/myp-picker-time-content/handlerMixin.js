import dateMaker from "./date.js"

export default {
	methods: {
		initData() {
			let data = {}
			const mode = this.mode
			let year, month, day, hour, minute
			// index of value
			let dVal = []
			switch (mode) {
				case "dateRange":
				case "yearMonthRange":
				case "timeRange":
					data = dateMaker.range.init(mode, this.now, this.value, this.useCurrent, this.start, this.end, this.includeBefore, this.includeAfter)
					dVal = data.defaultArr
					break
				default:
					data = dateMaker.date.init(mode, this.now, this.value, this.useCurrent, this.start, this.end, this.includeBefore, this.includeAfter)
					dVal = data.defaultArr
					break
			}
			this.items = data
			switch (mode) {
				case "dateRange":
					let fYear = data.fYears[dVal[0]] || data.fYears[data.fYears.length - 1]
					let fMonth = data.fMonths[dVal[1]] || data.fMonths[data.fMonths.length - 1]
					let fDay = data.fDays[dVal[2]] || data.fDays[data.fDays.length - 1]
					let tYear = data.tYears[dVal[4]] || data.tYears[data.tYears.length - 1]
					let tMonth = data.tMonths[dVal[5]] || data.tMonths[data.tMonths.length - 1]
					let tDay = data.tDays[dVal[6]] || data.tDays[data.tDays.length - 1]
					this.checkArr = [fYear, fMonth, fDay, tYear, tMonth, tDay]
					this.resultStr = `${fYear+'-'+fMonth+'-'+fDay+'至'+tYear+'-'+tMonth+'-'+tDay}`
					break
				case "yearMonthRange":
					let _fYear = data.fYears[dVal[0]] || data.fYears[data.fYears.length - 1]
					let _fMonth = data.fMonths[dVal[1]] || data.fMonths[data.fMonths.length - 1]
					let _tYear = data.tYears[dVal[3]] || data.tYears[data.tYears.length - 1]
					let _tMonth = data.tMonths[dVal[4]] || data.tMonths[data.tMonths.length - 1]
					this.checkArr = [_fYear, _fMonth, _tYear, _tMonth]
					this.resultStr = `${_fYear+'-'+_fMonth+'至'+_tYear+'-'+_tMonth}`
					break
				case "timeRange":
					break
				case "date":
					year = data.years[dVal[0]] || data.years[data.years.length - 1]
					month = data.months[dVal[1]] || data.months[data.months.length - 1]
					day = data.days[dVal[2]] || data.days[data.days.length - 1]
					this.checkArr = [year, month, day]
					this.resultStr = `${year+'-'+month+'-'+day}`
					break
				case "yearMonth":
					year = data.years[dVal[0]] || data.years[data.years.length - 1]
					month = data.months[dVal[1]] || data.months[data.months.length - 1]
					this.checkArr = [year, month]
					this.resultStr = `${year+'-'+month}`
					break
				case "dateTime":
					year = data.years[dVal[0]] || data.years[data.years.length - 1]
					month = data.months[dVal[1]] || data.months[data.months.length - 1]
					day = data.days[dVal[2]] || data.days[data.days.length - 1]
					hour = data.hours[dVal[3]] || data.hours[data.hours.length - 1]
					minute = data.minutes[dVal[4]] || data.minutes[data.minutes.length - 1]
					this.resultStr = `${year+'-'+month+'-'+day+' '+hour+':'+minute}`
					this.checkArr = [year, month, day, hour, minute]
					break
				case "time":
					hour = data.hours[dVal[0]] || data.hours[data.hours.length - 1]
					minute = data.minutes[dVal[1]] || data.minutes[data.minutes.length - 1]
					this.checkArr = [hour, minute]
					this.resultStr = `${hour+':'+minute}`
					break
			}
			this.$emit("inited", {
				checkArr: this.checkArr,
				checkValue: this.checkValue,
				defaultVal: dVal,
				result: this.resultStr
			})
			// we must set default-data in nextTick, or mp will not show the current index
			this.$nextTick(()=>{
				this.pickVal = dVal
			})
		},
		bindChange(val) {
			let arr = Object.assign([], val.detail.value)
			let year = "",
				month = "",
				day = "",
				hour = "",
				minute = ""
			let checkArr = this.checkArr
			let days = []
			let months = []
			const mode = this.mode
			switch (mode) {
				case "date":
					year = this.items.years[arr[0]] || this.items.years[this.items.years.length - 1]
					if (year != checkArr[0]) {
						months = dateMaker.date.initMonths(this.now, year, this.items.years, this.includeBefore, this.includeAfter)
						this.items.months = months
						// #ifdef APP-NVUE
						if (arr[1] > (months.length-1)) {
							arr[1] = months.length - 1
						}
						// #endif
					}
					month = this.items.months[arr[1]] || this.items.months[this.items.months.length - 1]
					if (year != checkArr[0] || month != checkArr[1]) {
						days = dateMaker.date.initDays(this.now, year, month, this.items.years, this.items.months, this.includeBefore, this.includeAfter)
						this.items.days = days
						// #ifdef APP-NVUE
						if (arr[2] > (days.length - 1)) {
							arr[2] = days.length - 1
						}
						// #endif
					}
					day = this.items.days[arr[2]] || this.items.days[this.items.days.length - 1]
					this.checkArr = [year, month, day]
					this.resultStr = `${year+'-'+month+'-'+day}`
					break
				case "yearMonth":
					year = this.items.years[arr[0]] || this.items.years[this.items.years.length - 1]
					if (year != checkArr[0]) {
						months = dateMaker.date.initMonths(this.now, year, this.items.years, this.includeBefore, this.includeAfter)
						this.items.months = months
						// #ifdef APP-NVUE
						if (arr[1] > (months.length - 1)) {
							arr[1] = months.length - 1
						}
						// #endif
					}
					month = this.items.months[arr[1]] || this.items.months[this.items.months.length - 1]
					this.checkArr = [year, month]
					this.resultStr = `${year+'-'+month}`
					break
				case "dateTime":
					year = this.items.years[arr[0]] || this.items.years[this.items.years.length - 1]
					if (year !== checkArr[0]) {
						months = dateMaker.date.initMonths(this.now, year, this.items.years, this.includeBefore, this.includeAfter)
						this.items.months = months
						// #ifdef APP-NVUE
						if (arr[1] > (months.length - 1)) {
							arr[1] = months.length - 1
						}
						// #endif
					}
					month = this.items.months[arr[1]] || this.items.months[this.items.months.length - 1]
					if (year != checkArr[0] || month != checkArr[1]) {
						days = dateMaker.date.initDays(this.now, year, month, this.items.years, this.items.months, this.includeBefore, this.includeAfter)
						this.items.days = days
						// #ifdef APP-NVUE
						if (arr[2] > (days.length - 1)) {
							arr[2] = days.length - 1
						}
						// #endif
					}
					day = this.items.days[arr[2]] || this.items.days[this.items.days.length - 1]
					if (year != checkArr[0] || month != checkArr[1] || day != checkArr[2]) {
						const hms = dateMaker.date.initHoursMinutes(this.now, year, month, day, this.items.years, this.items.months, this.items.days, this.includeBefore, this.includeAfter)
						this.items.hours = hms.hours
						this.items.minutes = hms.minutes
						// #ifdef APP-NVUE
						if (arr[3] > (hms.hours.length - 1)) {
							arr[3] = hms.hours.length - 1
						}
						// #endif
					}
					hour = this.items.hours[arr[3]] || this.items.hours[this.items.hours.length - 1]
					minute = this.items.minutes[arr[4]] || this.items.minutes[this.items.minutes.length - 1]
					this.checkArr = [year, month, day, hour, minute]
					this.resultStr = `${year+'-'+month+'-'+day+' '+hour+':'+minute}`
					break
				case "time":
					hour = this.items.hours[arr[0]] || this.items.hours[this.items.hours.length - 1]
					if (hour !== checkArr[0]) {
						const mns = dateMaker.date.initMinutes(this.now, hour, this.items.hours, this.includeBefore, this.includeAfter)
						this.items.minutes = mns
						// #ifdef APP-NVUE
						if (arr[1] > (mns.length - 1)) {
							arr[1] = mns.length - 1
						}
						// #endif
					}
					minute = this.items.minutes[arr[1]] || this.items.minutes[this.items.minutes.length - 1]
					this.checkArr = [hour, minute]
					this.resultStr = `${hour+':'+minute}`
					break
				case "dateRange":
					let fYear = this.items.fYears[arr[0]] || this.items.fYears[this.items.fYears.length - 1]
					if (fYear != checkArr[0]) {
						const drms = dateMaker.date.initMonths(this.now, fYear, this.items.fYears, this.includeBefore, this.includeAfter)
						this.items.fMonths = drms
						// #ifdef APP-NVUE
						if (arr[1] > (drms.length - 1)) {
							arr[1] = drms.length - 1
						}
						// #endif
					}
					let fMonth = this.items.fMonths[arr[1]] || this.items.fMonths[this.items.fMonths.length - 1]
					if (fYear != checkArr[0] || fMonth != checkArr[1]) {
						const drds = dateMaker.date.initDays(this.now, fYear, fMonth, this.items.fYears, this.items.fMonths, this.includeBefore, this.includeAfter)
						this.items.fDays = drds
						// #ifdef APP-NVUE
						if (arr[2] > (drds.length - 1)) {
							arr[2] = drds.length - 1
						}
						// #endif
					}
					let fDay = this.items.fDays[arr[2]] || this.items.fDays[this.items.fDays.length - 1]
					
					let tYear = this.items.tYears[arr[4]] || this.items.tYears[this.items.tYears.length - 1]
					let tMonth = this.items.tMonths[arr[5]] || this.items.tMonths[this.items.tMonths.length - 1]
					let tDay = this.items.tDays[arr[6]] || this.items.tDays[this.items.tDays.length - 1]
					if (fYear != checkArr[0] || fMonth != checkArr[1] || fDay != checkArr[2]) {
						const abc = dateMaker.date.init('date', this.now, arr.slice(4), false, fYear, this.end, this.includeBefore, this.includeAfter)
						this.items.tYears = abc.years
						this.items.tMonths = abc.months
						this.items.tDays = abc.days
						arr[4] = abc.defaultArr[0]
						arr[5] = abc.defaultArr[1]
						arr[6] = abc.defaultArr[2]
						tYear = this.items.tYears[arr[4]] || this.items.tYears[this.items.tYears.length - 1]
						tMonth = this.items.tMonths[arr[5]] || this.items.tMonths[this.items.tMonths.length - 1]
						tDay = this.items.tDays[arr[6]] || this.items.tDays[this.items.tDays.length - 1]
					} else {
						if (tYear != checkArr[4]) {
							const drms = dateMaker.date.initMonths(this.now, tYear, this.items.tYears, this.includeBefore, this.includeAfter)
							this.items.tMonths = drms
							// #ifdef APP-NVUE
							if (arr[5] > (drms.length - 1)) {
								arr[5] = drms.length - 1
							}
							// #endif
						}
						tMonth = this.items.tMonths[arr[5]] || this.items.tMonths[this.items.tMonths.length - 1]
						if (tYear != checkArr[4] || tMonth != checkArr[5]) {
							const drds = dateMaker.date.initDays(this.now, tYear, tMonth, this.items.tYears, this.items.tMonths, this.includeBefore, this.includeAfter)
							this.items.tDays = drds
							// #ifdef APP-NVUE
							if (arr[6] > (drds.length - 1)) {
								arr[6] = drds.length - 1
							}
							// #endif
						}
						tDay = this.items.tDays[arr[6]] || this.items.tDays[this.items.tDays.length - 1]
					}
					this.checkArr = [fYear, fMonth, fDay, tYear, tMonth, tDay]
					this.resultStr = `${fYear+'-'+fMonth+'-'+fDay+'至'+tYear+'-'+tMonth+'-'+tDay}`
					break
				case "yearMonthRange":
					let _fYear = this.items.fYears[arr[0]] || this.items.fYears[this.items.fYears.length - 1]
					if (_fYear != checkArr[0]) {
						const drms = dateMaker.date.initMonths(this.now, _fYear, this.items.fYears, this.includeBefore, this.includeAfter)
						this.items.fMonths = drms
						// #ifdef APP-NVUE
						if (arr[1] > (drms.length - 1)) {
							arr[1] = drms.length - 1
						}
						// #endif
					}
					let _fMonth = this.items.fMonths[arr[1]] || this.items.fMonths[this.items.fMonths.length - 1]
					
					let _tYear = this.items.tYears[arr[3]] || this.items.tYears[this.items.tYears.length - 1]
					let _tMonth = this.items.tMonths[arr[4]] || this.items.tMonths[this.items.tMonths.length - 1]
					if (_fYear != checkArr[0] || _fMonth != checkArr[1]) {
						const abc = dateMaker.date.init('yearMonth', this.now, arr.slice(3), false, _fYear, this.end, this.includeBefore, this.includeAfter)
						this.items.tYears = abc.years
						this.items.tMonths = abc.months
						arr[3] = abc.defaultArr[0]
						arr[4] = abc.defaultArr[1]
						_tYear = this.items.tYears[arr[3]] || this.items.tYears[this.items.tYears.length - 1]
						_tMonth = this.items.tMonths[arr[4]] || this.items.tMonths[this.items.tMonths.length - 1]
					} else {
						if (_tYear != checkArr[3]) {
							const drms = dateMaker.date.initMonths(this.now, _tYear, this.items.tYears, this.includeBefore, this.includeAfter)
							this.items.tMonths = drms
							// #ifdef APP-NVUE
							if (arr[4] > (drms.length - 1)) {
								arr[4] = drms.length - 1
							}
							// #endif
						}
						_tMonth = this.items.tMonths[arr[4]] || this.items.tMonths[this.items.tMonths.length - 1]
					}
					this.checkArr = [_fYear, _fMonth, _tYear, _tMonth]
					this.resultStr = `${_fYear+'-'+_fMonth+'至'+_tYear+'-'+_tMonth}`
					break
				case 'timeRange':
					let fHour = this.items.fHours[arr[0]] || this.items.fHours[this.items.fHours.length - 1]
					if (fHour != checkArr[0]) {
						const trms = dateMaker.date.initMinutes(this.now, fHour, this.items.fHours, this.includeBefore, this.includeAfter)
						this.items.fMinutes = trms
						// #ifdef APP-NVUE
						if (arr[1] > (trms.length - 1)) {
							arr[1] = trms.length - 1
						}
						// #endif
					}
					let fMinute = this.items.fMinutes[arr[1]] || this.items.fMinutes[this.items.fMinutes.length - 1]
					
					let tHour = this.items.tHours[arr[3]] || this.items.tHours[this.items.tHours.length - 1]
					let tMinute = this.items.tMinutes[arr[4]] || this.items.tMinutes[this.items.tMinutes.length - 1]
					if (fHour != checkArr[0] || fMinute != checkArr[1]) {
						const abc = dateMaker.date.init('time', this.now, arr.slice(3), false, fHour, this.end, this.includeBefore, this.includeAfter)
						console.log(abc)
						this.items.tHours = abc.hours
						this.items.tMinutes = abc.minutes
						arr[3] = abc.defaultArr[0]
						arr[4] = abc.defaultArr[1]
						tHour = this.items.tHours[arr[3]] || this.items.tHours[this.items.tHours.length - 1]
						tMinute = this.items.tMinutes[arr[4]] || this.items.tMinutes[this.items.tMinutes.length - 1]
					} else {
						if (tHour != checkArr[3]) {
							const drms = dateMaker.date.initMinutes(this.now, tHour, this.items.tHours, this.includeBefore, this.includeAfter)
							this.items.tMinutes = drms
							// #ifdef APP-NVUE
							if (arr[4] > (drms.length - 1)) {
								arr[4] = drms.length - 1
							}
							// #endif
						}
						tMinute = this.items.tMinutes[arr[4]] || this.items.tMinutes[this.items.tMinutes.length - 1]
					}
					this.checkArr = [fHour, fMinute, tHour, tMinute]
					this.resultStr = `${fHour+'-'+fMinute+'至'+tHour+'-'+tMinute}`
					break
			}
			this.pickVal = arr
			this.$emit("change", {
				checkArr: this.checkArr,
				checkValue: this.checkValue,
				defaultVal: this.pickVal,
				result: this.resultStr
			})
			/*
			const that = this
			this.$nextTick(() => {
				that.pickVal = arr
			})*/
		}
	}
}
