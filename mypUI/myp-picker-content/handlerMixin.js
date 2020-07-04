import dateMaker from "./date.js"

export default {
	methods: {
		initData() {
			let data = {}
			const mode = this.mode
			let year, month, day, hour, minute, province, city, area
			// index of value
			let dVal = []
			if (mode === 's1' || mode === 's2' || mode === 's3') {
				if (!this.selections || this.selections.length === 0) {
					return
				}
			}
			switch (mode) {
				case "s3":
					dVal = this.getSelectionsIndex(this.value)
					const cs = this.selections[dVal[0]][this.cTag]
					const ass = cs[dVal[1]][this.aTag]
					data = {
						p: this.selections,
						c: cs,
						a: ass
					}
					break
				case "s2":
					dVal = this.getSelectionsIndex(this.value)
					data = {
						p: this.selections,
						c: this.selections[dVal[0]][this.cTag]
					}
					break
				case "s1":
					dVal = this.getSelectionsIndex(this.value)
					data = this.selections
					break
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
				case "s3":
					province = data.p[dVal[0]]
					city = data.c[dVal[1]]
					area = data.a[dVal[2]]
					this.checkArr = [province[this.pl], city[this.cl], area[this.al]]
					this.checkValue = [province[this.pv], city[this.cv], area[this.av]]
					this.resultStr = province[this.pl] + city[this.cl] + area[this.al]
					break
				case "s2":
					province = data.p[dVal[0]]
					city = data.c[dVal[1]]
					this.checkArr = [province[this.pl], city[this.cl]]
					this.checkValue = [province[this.pv], city[this.cv]]
					this.resultStr = province[this.pl] + city[this.cl]
					break
				case "s1":
				    province = data[dVal[0]] || data[data.length - 1]
					this.checkArr = province
					this.checkValue = province[this.pv]
					this.resultStr = province[this.pl]
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
			console.log(arr)
			let year = "",
				month = "",
				day = "",
				hour = "",
				minute = "",
				province, city, area
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
					let fMonth = this.items.fMonths[arr[1]] || this.items.fMonths[this.items.fMonths.length - 1]
					let fDay = this.items.fDays[arr[2]] || this.items.fDays[this.items.fDays.length - 1]
					let tYear = this.items.tYears[arr[4]] || this.items.tYears[this.items.tYears.length - 1]
					let tMonth = this.items.tMonths[arr[5]] || this.items.tMonths[this.items.tMonths.length - 1]
					let tDay = this.items.tDays[arr[6]] || this.items.tDays[this.items.tDays.length - 1]
					if (fYear != checkArr[0]) {
						days = dateMaker.range.initDays(fYear, fMonth)
						this.items.fDays = days
					}
					if (fMonth != checkArr[1]) {
						days = dateMaker.range.initDays(fYear, fMonth)
						this.items.fDays = days
					}
					if (tYear != checkArr[3]) {
						days = dateMaker.range.initDays(tYear, tMonth)
						this.items.tDays = days
					}
					if (tMonth != checkArr[4]) {
						days = dateMaker.range.initDays(tYear, tMonth)
						this.items.tDays = days
					}
					this.checkArr = [fYear, fMonth, fDay, tYear, tMonth, tDay]
					this.resultStr = `${fYear+'-'+fMonth+'-'+fDay+'至'+tYear+'-'+tMonth+'-'+tDay}`
					break
				case "yearMonthRange":
					let _fYear = this.items.fYears[arr[0]] || this.items.fYears[this.items.fYears.length - 1]
					let _fMonth = this.items.fMonths[arr[1]] || this.items.fMonths[this.items.fMonths.length - 1]
					let _tYear = this.items.tYears[arr[3]] || this.items.tYears[this.items.tYears.length - 1]
					let _tMonth = this.items.tMonths[arr[4]] || this.items.tMonths[this.items.tMonths.length - 1]
					this.checkArr = [_fYear, _fMonth, _tYear, _tMonth]
					this.resultStr = `${_fYear+'-'+_fMonth+'至'+_tYear+'-'+_tMonth}`
					break
				case 'timeRange':
					break
				case "s3":
					province = this.items.p[arr[0]][this.pl]
					city = this.items.c[arr[1]][this.cl]
					area = this.items.a[arr[2]][this.al]
					if (province != checkArr[0]) {
						this.items.c = this.items.p[arr[0]][this.cTag]
						this.items.a = this.items.c[arr[1]][this.aTag]
						arr[1] = 0
						arr[2] = 0
						city = this.items.c[arr[1]][this.cl]
						area = this.items.a[arr[2]][this.al]
					}
					if (city != checkArr[1]) {
						this.items.a = this.items.c[arr[1]][this.aTag]
						arr[2] = 0
						area = this.items.a[arr[2]][this.al]
					}
					this.checkArr = [province, city, area]
					this.checkValue = [this.items.p[arr[0]][this.pv], this.items.c[arr[1]][this.cv], this.items.a[arr[2]][this.av]]
					this.resultStr = province + city + area
					break
				case "s2":
					province = this.items.p[arr[0]][this.pl]
					city = this.items.c[arr[1]][this.cl]
					if (province != checkArr[0]) {
						this.items.c = this.items.p[arr[0]][this.cTag]
						arr[1] = 0
						city = this.items.c[arr[1]][this.cl]
					}
					this.checkArr = [province, city]
					this.checkValue = [this.items.p[arr[0]][this.pv], this.items.c[arr[1]][this.cv]]
					this.resultStr = province + city
					break
				case "s1":
					this.checkArr = this.items[arr[0]] || this.items[this.items.length - 1]
					this.resultStr = this.items[arr[0]][this.pl] || this.items[this.items.length - 1][this.pl]
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
