import dateTimeMaker from "./dateData.js"

export default {
	methods: {
		getCurrent() {
			let aToday = new Date()
			let tYear = aToday.getFullYear().toString()
			let tMonth = this.formatNum(aToday.getMonth() + 1).toString()
			let tDay = this.formatNum(aToday.getDate()).toString()
			let tHours = this.formatNum(aToday.getHours()).toString()
			let tMinutes = this.formatNum(aToday.getMinutes()).toString()
			let tSeconds = this.formatNum(aToday.getSeconds()).toString()
			if (this.current) {
				return [tYear, tMonth, tDay, tHours, (Math.floor(tMinutes / this.step) * this.step).toString(), tSeconds]
			} else {
				return this.value
			}
		},
		formatNum(num) {
			return num < 10 ? ('0' + num) : (num + '')
		},
		initData() {
			let data = {}
			const mode = this.mode
			// for date/time/...; s1/s2/s3
			let year, month, day, hour, minute, second, province, city, area
			// for limit/limitHour
			let col1, col2, col3
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
				case "limit":
					data = dateTimeMaker.limit.init(this.dayStep, this.startHour, this.endHour, this.minuteStep, this.afterStep)
					dVal = (data.defaultVal && this.current) ? data.defaultVal : this.value
					break
				case "limitHour":
					data = dateTimeMaker.limitHour.init(this.dayStep)
					dVal = (data.defaultVal && this.current) ? data.defaultVal : this.value
					break
				case "range":
				case "yearMonthRange":
					data = dateTimeMaker.range.init(this.startYear, this.endYear, this.getCurrent(), this.current)
					dVal = (data.defaultVal && this.current) ? data.defaultVal : this.value
					break
				default:
					data = dateTimeMaker.date.init(this.startYear, this.endYear, this.mode, this.step, this.getCurrent(), this.current, this.disabledAfter)
					dVal = (data.defaultVal && this.current) ? data.defaultVal : this.value
					break
			}
			this.data = data
			switch (mode) {
				case "limitHour":
					col1 = data.date[dVal[0]] || data.date[data.date.length - 1]
					col2 = data.areas[dVal[2]] || data.areas[data.areas.length - 1]
					col3 = data.hours[dVal[1]] || data.hours[data.hours.length - 1]
					this.checkArr = [col1, col2, col3]
					this.resultStr = `${col1.value+' '+col2.label+' '+col3.label+'时'}`
					break
				case "limit":
					col1 = data.date[dVal[0]] || data.date[data.date.length - 1]
					col2 = data.hours[dVal[1]] || data.hours[data.hours.length - 1]
					col3 = data.minutes[dVal[2]] || data.minutes[data.minutes.length - 1]
					this.checkArr = [col1, col2, col3]
					this.resultStr = `${col1.value+' '+col2.value+':'+col3.value+":"+"00"}`
					break
				case "range":
					let fYear = data.fyears[dVal[0]] || data.fyears[data.fyears.length - 1]
					let fmonth = data.fmonths[dVal[1]] || data.fmonths[data.fmonths.length - 1]
					let fday = data.fdays[dVal[2]] || data.fdays[data.fdays.length - 1]
					let tYear = data.tyears[dVal[4]] || data.tyears[data.tyears.length - 1]
					let tmonth = data.tmonths[dVal[5]] || data.tmonths[data.tmonths.length - 1]
					let tday = data.tdays[dVal[6]] || data.tdays[data.tdays.length - 1]
					this.checkArr = [fYear, fmonth, fday, tYear, tmonth, tday]
					this.resultStr = `${fYear+'-'+fmonth+'-'+fday+'至'+tYear+'-'+tmonth+'-'+tday}`
					break
				case "yearMonthRange":
					let _fYear = data.fyears[dVal[0]] || data.fyears[data.fyears.length - 1]
					let _fmonth = data.fmonths[dVal[1]] || data.fmonths[data.fmonths.length - 1]
					let _tYear = data.tyears[dVal[3]] || data.tyears[data.tyears.length - 1]
					let _tmonth = data.tmonths[dVal[4]] || data.tmonths[data.tmonths.length - 1]
					this.checkArr = [_fYear, _fmonth, _tYear, _tmonth]
					this.resultStr = `${_fYear+'-'+_fmonth+'至'+_tYear+'-'+_tmonth}`
					break
				case "half":
					year = data.years[dVal[0]] || data.years[data.years.length - 1]
					month = data.months[dVal[1]] || data.months[data.months.length - 1]
					day = data.days[dVal[2]] || data.days[data.days.length - 1]
					area = data.areas[dVal[3]] || data.areas[data.areas.length - 1]
					this.checkArr = [year, month, day, area]
					this.resultStr = `${year+'-'+month+'-'+day+' '+area.label}`
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
					second = data.seconds[dVal[5]] || data.seconds[data.seconds.length - 1]
					this.resultStr = `${year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second}`
					this.checkArr = [year, month, day, hour, minute]
					break
				case "time":
					hour = data.hours[dVal[0]] || data.hours[data.hours.length - 1]
					minute = data.minutes[dVal[1]] || data.minutes[data.minutes.length - 1]
					second = data.seconds[dVal[2]] || data.seconds[data.seconds.length - 1]
					this.checkArr = [hour, minute, second]
					this.resultStr = `${hour+':'+minute+':'+second}`
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
			let arr = val.detail.value
			let year = "",
				month = "",
				day = "",
				hour = "",
				minute = "",
				second = "",
				note = [],
				province, city, area
			let checkArr = this.checkArr
			let days = []
			let months = []
			let mode = this.mode
			let col1, col2, col3, d, a, h, m
			switch (mode) {
				case "limitHour":
					col1 = this.data.date[arr[0]]
					col2 = this.data.areas[arr[1]]
					col3 = this.data.hours[arr[2]]
					if (col1.value != checkArr[0].value) {
						arr[1] = 0
						arr[2] = 0
						let areas = dateTimeMaker.limitHour.initAreas(col1)
						this.data.areas = areas
						let hours = dateTimeMaker.limitHour.initHours(col1, this.data.areas[arr[1]])
						this.data.hours = hours
					};
					if (col2.value != checkArr[1].value) {
						arr[2] = 0
						let hours = dateTimeMaker.limitHour.initHours(col1, this.data.areas[arr[1]])
						this.data.hours = hours
					}
					d = this.data.date[arr[0]] || this.data.date[this.data.date.length - 1]
					a = this.data.areas[arr[1]] || this.data.areas[this.data.areas.length - 1]
					h = this.data.hours[arr[2]] || this.data.hours[this.data.hours.length - 1]
					this.checkArr = [d, a, h]
					this.resultStr = `${d.value+' '+a.label+' '+h.label+"时"}`
					break
				case "limit":
					col1 = this.data.date[arr[0]]
					col2 = this.data.hours[arr[1]]
					if (col1.value != checkArr[0].value) {
						let hours = dateTimeMaker.limit.initHours(this.startHour, this.endHour, this.minuteStep, this.afterStep, col1.value)
						let minutes = dateTimeMaker.limit.initMinutes(this.startHour, this.endHour, this.minuteStep, this.afterStep,
							col1.value, col2.value)
						this.data.hours = hours
						this.data.minutes = minutes
					}
					if (col2.value != checkArr[1].value) {
						let minutes = dateTimeMaker.limit.initMinutes(this.startHour, this.endHour, this.minuteStep, this.afterStep,
							col1.value, col2.value)
						this.data.minutes = minutes
					}
					d = this.data.date[arr[0]] || this.data.date[this.data.date.length - 1]
					h = this.data.hours[arr[1]] || this.data.hours[this.data.hours.length - 1]
					m = this.data.minutes[arr[2]] || this.data.minutes[this.data.minutes.length - 1]
					this.checkArr = [d, h, m]
					this.resultStr = `${d.value+' '+h.value+':'+m.value+":"+"00"}`
					break
				case "range":
					let fyear = this.data.fyears[arr[0]] || this.data.fyears[this.data.fyears.length - 1]
					let fmonth = this.data.fmonths[arr[1]] || this.data.fmonths[this.data.fmonths.length - 1]
					let fday = this.data.fdays[arr[2]] || this.data.fdays[this.data.fdays.length - 1]
					let tyear = this.data.tyears[arr[4]] || this.data.tyears[this.data.tyears.length - 1]
					let tmonth = this.data.tmonths[arr[5]] || this.data.tmonths[this.data.tmonths.length - 1]
					let tday = this.data.tdays[arr[6]] || this.data.tdays[this.data.tdays.length - 1]
					if (fyear != checkArr[0]) {
						days = dateTimeMaker.range.initDays(fyear, fmonth)
						this.data.fdays = days
					}
					if (fmonth != checkArr[1]) {
						days = dateTimeMaker.range.initDays(fyear, fmonth)
						this.data.fdays = days
					}
					if (tyear != checkArr[3]) {
						days = dateTimeMaker.range.initDays(tyear, tmonth)
						this.data.tdays = days
					}
					if (tmonth != checkArr[4]) {
						days = dateTimeMaker.range.initDays(tyear, tmonth)
						this.data.tdays = days
					}
					this.checkArr = [fyear, fmonth, fday, tyear, tmonth, tday]
					this.resultStr = `${fyear+'-'+fmonth+'-'+fday+'至'+tyear+'-'+tmonth+'-'+tday}`
					break
				case "yearMonthRange":
					let _fyear = this.data.fyears[arr[0]] || this.data.fyears[this.data.fyears.length - 1]
					let _fmonth = this.data.fmonths[arr[1]] || this.data.fmonths[this.data.fmonths.length - 1]
					let _tyear = this.data.tyears[arr[3]] || this.data.tyears[this.data.tyears.length - 1]
					let _tmonth = this.data.tmonths[arr[4]] || this.data.tmonths[this.data.tmonths.length - 1]
					this.checkArr = [_fyear, _fmonth, _tyear, _tmonth]
					this.resultStr = `${_fyear+'-'+_fmonth+'至'+_tyear+'-'+_tmonth}`
					break
				case "half":
					year = this.data.years[arr[0]] || this.data.years[this.data.years.length - 1]
					month = this.data.months[arr[1]] || this.data.months[this.data.months.length - 1]
					day = this.data.days[arr[2]] || this.data.days[this.data.days.length - 1]
					area = this.data.areas[arr[3]] || this.data.areas[this.data.areas.length - 1]
					if (year != checkArr[0]) {
						days = dateTimeMaker.date.initDays(year, month, this.disabledAfter)
						months = dateTimeMaker.date.initMonths(year, this.disabledAfter)
						this.data.days = days
						this.data.months = months
					}
					if (month != checkArr[1]) {
						days = dateTimeMaker.date.initDays(year, month, this.disabledAfter)
						this.data.days = days
					}
					this.checkArr = [year, month, day, area]
					this.resultStr = `${year+'-'+month+'-'+day+area.label}`
					break
				case "date":
					year = this.data.years[arr[0]] || this.data.years[this.data.years.length - 1]
					month = this.data.months[arr[1]] || this.data.months[this.data.months.length - 1]
					day = this.data.days[arr[2]] || this.data.days[this.data.days.length - 1]
					if (year != checkArr[0]) {
						days = dateTimeMaker.date.initDays(year, month, this.disabledAfter)
						months = dateTimeMaker.date.initMonths(year, this.disabledAfter)
						this.data.days = days
						this.data.months = months
					}
					if (month != checkArr[1]) {
						days = dateTimeMaker.date.initDays(year, month, this.disabledAfter)
						this.data.days = days
					}
					this.checkArr = [year, month, day]
					this.resultStr = `${year+'-'+month+'-'+day}`
					break
				case "yearMonth":
					year = this.data.years[arr[0]] || this.data.years[this.data.years.length - 1]
					month = this.data.months[arr[1]] || this.data.months[this.data.months.length - 1]
					if (year != checkArr[0]) {
						months = dateTimeMaker.date.initMonths(year, this.disabledAfter)
						this.data.months = months
					}
					this.checkArr = [year, month]
					this.resultStr = `${year+'-'+month}`
					break
				case "dateTime":
					year = this.data.years[arr[0]] || this.data.years[this.data.years.length - 1]
					month = this.data.months[arr[1]] || this.data.months[this.data.months.length - 1]
					day = this.data.days[arr[2]] || this.data.days[this.data.days.length - 1]
					hour = this.data.hours[arr[3]] || this.data.hours[this.data.hours.length - 1]
					minute = this.data.minutes[arr[4]] || this.data.minutes[this.data.minutes.length - 1]
					second = this.data.seconds[arr[5]] || this.data.seconds[this.data.seconds.length - 1]
					if (year != checkArr[0]) {
						days = dateTimeMaker.date.initDays(year, month)
						this.data.days = days
					}
					if (month != checkArr[1]) {
						days = dateTimeMaker.date.initDays(year, month)
						this.data.days = days
					}
					this.checkArr = [year, month, day, hour, minute, second]
					this.resultStr = `${year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second}`
					break
				case "time":
					hour = this.data.hours[arr[0]] || this.data.hours[this.data.hours.length - 1]
					minute = this.data.minutes[arr[1]] || this.data.minutes[this.data.minutes.length - 1]
					second = this.data.seconds[arr[2]] || this.data.seconds[this.data.seconds.length - 1]
					this.checkArr = [hour, minute, second]
					this.resultStr = `${hour+':'+minute+':'+second}`
					break
				case "s3":
					province = this.data.p[arr[0]][this.pl]
					city = this.data.c[arr[1]][this.cl]
					area = this.data.a[arr[2]][this.al]
					if (province != checkArr[0]) {
						this.data.c = this.data.p[arr[0]][this.cTag]
						this.data.a = this.data.c[arr[1]][this.aTag]
						arr[1] = 0
						arr[2] = 0
						city = this.data.c[arr[1]][this.cl]
						area = this.data.a[arr[2]][this.al]
					}
					if (city != checkArr[1]) {
						this.data.a = this.data.c[arr[1]][this.aTag]
						arr[2] = 0
						area = this.data.a[arr[2]][this.al]
					}
					this.checkArr = [province, city, area]
					this.checkValue = [this.data.p[arr[0]][this.pv], this.data.c[arr[1]][this.cv], this.data.a[arr[2]][this.av]]
					this.resultStr = province + city + area
					break
				case "s2":
					province = this.data.p[arr[0]][this.pl]
					city = this.data.c[arr[1]][this.cl]
					if (province != checkArr[0]) {
						this.data.c = this.data.p[arr[0]][this.cTag]
						arr[1] = 0
						city = this.data.c[arr[1]][this.cl]
					}
					this.checkArr = [province, city]
					this.checkValue = [this.data.p[arr[0]][this.pv], this.data.c[arr[1]][this.cv]]
					this.resultStr = province + city
					break
				case "s1":
					this.checkArr = this.data[arr[0]] || this.data[this.data.length - 1]
					this.resultStr = this.data[arr[0]][this.pl] || this.data[this.data.length - 1][this.pl]
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
