export default {
	methods: {
		// the name is id/ref
		// 实际上app-nvue也支持query selector
		mypGetElSize(name) {
			return new Promise((res, rej) => {
				// #ifndef APP-NVUE
				const el = uni.createSelectorQuery().in(this).select('#' + name);
				el.fields({
					size: true,
					rect: true
				}, (data) => {
					if (data) {
						res(data);
					} else {
						rej({})
					}
				}).exec();
				// #endif
				// #ifdef APP-NVUE
				let _el = this.$refs[name][0]
				if (!_el) {
					_el = this.$refs[name]
				}
				dom.getComponentRect(_el, (data) => {
					if (data.result) {
						res(data.size)
					} else {
						rej({})
					}
				})
				// #endif
			})
		}
	}
}

