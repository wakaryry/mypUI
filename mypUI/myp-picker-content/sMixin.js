export default {
	props: {
		// for s1/s2/s3
		selections: {
			type: Array,
			default: () => {
				return []
			}
		},
		// for s1/s2/s3 to get right prop value
		labelProps: {
			type: Object,
			default: () => {
				return {
					s1: {
						label: 'name',
						value: 'id'
					},
					s2: {
						label: 'name',
						value: 'id',
						// the tag is for to get s2 selections in s1
						tag: "c"
					},
					s3: {
						label: 'name',
						value: 'id',
						// the tag is for to get get s3 in selections in s2
						tag: "a"
					}
				}
			}
		}
	},
	computed: {
		pl() {
			return this.labelProps.s1 && this.labelProps.s1.label
		},
		cl() {
			return this.labelProps.s2 && this.labelProps.s2.label
		},
		al() {
			return this.labelProps.s3 && this.labelProps.s3.label
		},
		pv() {
			return this.labelProps.s1 && this.labelProps.s1.value
		},
		cv() {
			return this.labelProps.s2 && this.labelProps.s2.value
		},
		av() {
			return this.labelProps.s3 && this.labelProps.s3.value
		},
		cTag() {
			return this.labelProps.s2 && this.labelProps.s2.tag
		},
		aTag() {
			return this.labelProps.s3 && this.labelProps.s3.tag
		}
	},
	methods: {
		getSelectionsIndex(val) {
			// to get index of the defaultValue in selections for s1/s1/s3 mode
			if (this.mode === 's3') {
				let p = val[0]
				let c = val[1]
				let a = val[2]
				const ps = this.selections
				let cs = []
				let ass = []
				let pf = false
				let cf = false
				let af = false
				for (const i in ps) {
					const _p = ps[i]
					if (_p[this.pv] === p) {
						pf = true
						p = i
						cs = _p[this.cTag]
						break
					}
				}
				if (!pf) {
					return [0,0,0]
				}
				for (const i in cs) {
					const _c = cs[i]
					if (_c[this.cv] === c) {
						cf = true
						c = i
						ass = _c[this.aTag]
						break
					}
				}
				if (!cf) {
					return [p, 0, 0]
				}
				for (const i in ass) {
					const _a = ass[i]
					if (_a[this.av] === a) {
						af = true
						a = i
						break
					}
				}
				if (!af) {
					return [p,c,0]
				}
				return [p, c, a]
			} else if (this.mode === 's2') {
				let p = val[0]
				let c = val[1]
				const ps = this.selections
				let cs = []
				let pf = false
				let cf = false
				for (const i in ps) {
					const _p = ps[i]
					if (_p[this.pv] === p) {
						pf = true
						p = i
						cs = _p[this.cTag]
						break
					}
				}
				if (!pf) {
					return [0,0]
				}
				for (const i in cs) {
					const _c = cs[i]
					if (_c[this.cv] === c) {
						cf = true
						c = i
						break
					}
				}
				if (!cf) {
					return [p,0]
				}
				return [p, c]
			} else {
				let p = val[0]
				const ps = this.selections
				let pf = false
				for (const i in ps) {
					const _p = ps[i]
					if (_p[this.pv] === p) {
						pf = true
						p = i
						break
					}
				}
				if (!pf) {
					return [0]
				}
				return [p]
			}
		}
	}
}
