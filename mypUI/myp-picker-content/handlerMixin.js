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
					data = dateMaker.range.init(mode, this.value, this.useCurrent, this.startY, this.endY, this.startM, this.endM, this.startD, this.endD, this.startHH, this.endHH, this.startMM, this.endMM)
					dVal = data.defaultArr
					break
				default:
					data = dateMaker.date.init(mode, this.value, this.useCurrent, this.startY, this.endY, this.startM, this.endM, this.startD, this.endD, this.startHH, this.endHH, this.startMM, this.endMM)
					dVal = data.defaultArr
					break
			}
			this.items = data
			switch (mode) {
				case "dateRange":
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
			let arr = val.detail.value
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
					month = this.items.months[arr[1]] || this.items.months[this.items.months.length - 1]
					if (year != checkArr[0]) {
						days = dateMaker.date.initDays(year, month, this.startD, this.endD)
						this.items.days = days
					}
					if (month != checkArr[1]) {
						days = dateMaker.date.initDays(year, month, this.startD, this.endD)
						this.items.days = days
					}
					day = this.items.days[arr[2]] || this.items.days[this.items.days.length - 1]
					this.checkArr = [year, month, day]
					this.resultStr = `${year+'-'+month+'-'+day}`
					break
				case "yearMonth":
					year = this.items.years[arr[0]] || this.items.years[this.items.years.length - 1]
					month = this.items.months[arr[1]] || this.items.months[this.items.months.length - 1]
					this.checkArr = [year, month]
					this.resultStr = `${year+'-'+month}`
					break
				case "dateTime":
					year = this.items.years[arr[0]] || this.items.years[this.items.years.length - 1]
					month = this.items.months[arr[1]] || this.items.months[this.items.months.length - 1]
					day = this.items.days[arr[2]] || this.items.days[this.items.days.length - 1]
					hour = this.items.hours[arr[3]] || this.items.hours[this.items.hours.length - 1]
					minute = this.items.minutes[arr[4]] || this.items.minutes[this.items.minutes.length - 1]
					if (year != checkArr[0]) {
						days = dateMaker.date.initDays(year, month, this.startD, this.endD)
						this.items.days = days
					}
					if (month != checkArr[1]) {
						days = dateMaker.date.initDays(year, month, this.startD, this.endD)
						this.items.days = days
					}
					this.checkArr = [year, month, day, hour, minute]
					this.resultStr = `${year+'-'+month+'-'+day+' '+hour+':'+minute}`
					break
				case "time":
					hour = this.items.hours[arr[0]] || this.items.hours[this.items.hours.length - 1]
					minute = this.items.minutes[arr[1]] || this.items.minutes[this.items.minutes.length - 1]
					this.checkArr = [hour, minute]
					this.resultStr = `${hour+':'+minute}`
					break
				case "dateRange":
					let fyear = this.items.fyears[arr[0]] || this.items.fyears[this.items.fyears.length - 1]
					let fmonth = this.items.fmonths[arr[1]] || this.items.fmonths[this.items.fmonths.length - 1]
					let fday = this.items.fdays[arr[2]] || this.items.fdays[this.items.fdays.length - 1]
					let tyear = this.items.tyears[arr[4]] || this.items.tyears[this.items.tyears.length - 1]
					let tmonth = this.items.tmonths[arr[5]] || this.items.tmonths[this.items.tmonths.length - 1]
					let tday = this.items.tdays[arr[6]] || this.items.tdays[this.items.tdays.length - 1]
					if (fyear != checkArr[0]) {
						days = dateMaker.range.initDays(fyear, fmonth)
						this.items.fdays = days
					}
					if (fmonth != checkArr[1]) {
						days = dateMaker.range.initDays(fyear, fmonth)
						this.items.fdays = days
					}
					if (tyear != checkArr[3]) {
						days = dateMaker.range.initDays(tyear, tmonth)
						this.items.tdays = days
					}
					if (tmonth != checkArr[4]) {
						days = dateMaker.range.initDays(tyear, tmonth)
						this.items.tdays = days
					}
					this.checkArr = [fyear, fmonth, fday, tyear, tmonth, tday]
					this.resultStr = `${fyear+'-'+fmonth+'-'+fday+'至'+tyear+'-'+tmonth+'-'+tday}`
					break
				case "yearMonthRange":
					let _fyear = this.items.fyears[arr[0]] || this.items.fyears[this.items.fyears.length - 1]
					let _fmonth = this.items.fmonths[arr[1]] || this.items.fmonths[this.items.fmonths.length - 1]
					let _tyear = this.items.tyears[arr[3]] || this.items.tyears[this.items.tyears.length - 1]
					let _tmonth = this.items.tmonths[arr[4]] || this.items.tmonths[this.items.tmonths.length - 1]
					this.checkArr = [_fyear, _fmonth, _tyear, _tmonth]
					this.resultStr = `${_fyear+'-'+_fmonth+'至'+_tyear+'-'+_tmonth}`
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
