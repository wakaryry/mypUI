export default {
	methods: {
		initData() {
			let data = {}
			const mode = this.mode
			let province, city, area
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
					data = {p: this.selections}
					break
			}
			this.items = data
			switch (mode) {
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
				    province = data.p[dVal[0]] || data.p[data.p.length - 1]
					this.checkArr = province[this.pl]
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
			let province, city, area
			let checkArr = this.checkArr
			const mode = this.mode
			switch (mode) {
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
					province = this.items.p[arr[0]] || this.items.p[this.items.p.length - 1]
					this.checkArr = province[this.pl]
					this.checkValue = province[this.pv]
					this.resultStr = province[this.pl]
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
