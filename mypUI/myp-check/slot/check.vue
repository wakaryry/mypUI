<template>
	<view :class="['myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius]" :style="boxStyle">
		<slot></slot>
	</view>
</template>

<script>
	// 
	// 可以随意设置样式，这里只是提供一个壳子
	// 如果您需要设置任何的选中/disabled等的样子，请直接在option里面添加样式（建议直接拷贝一份之后修改）
	// 我们不再添加任何的默认样式
	//
	// 注意：该组件因为 vm.$slots 在 小程序端uni没有实现支持，小程序端无法使用
	// 
	export default {
		props: {
			// 初始值/绑定值
			value: {
				type: Array,
				default: ()=>{
					return []
				}
			},
			// 限制最多可选数量. 0表示不限制
			limits: {
				type: Number,
				default: 0
			},
			// 手动重新生成数据
			updatedTime: {
				type: Number,
				default: 0
			},
			// 传递回来的值，item是Object时默认传index(顺序),item不是Object时直接返回item
			valueLabel: {
				type: String,
				default: ''
			},
			// 全局禁用
			disabled: {
				type: Boolean,
				default: false
			},
			bgType: {
				type: String,
				default: ''
			},
			border: {
				type: String,
				default: 'none'
			},
			radius: {
				type: String,
				default: 'none'
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		provide() {
			return {
				mypCheck: this
			}
		},
		data() {
			return {
				selected: []
			}
		},
		// 先父组件created，然后是子组件created，而且子组件created是有顺序的，同步created
		created() {
			// 不再使用this.children，
			// 因为子组件是动态的数据，新的子组件created的时候会一直往children里面push，但是以前的并没有被清空
			// 所以利用children来作为当前的子组件是不正确的，最终会导致数据重复
			// 我们改用最直接的this.$slots.default来获取子组件
			// this.children = []
		},
		mounted() {
			// 初始化选择状态
			setTimeout(()=>{
				this.toGenerateSelection()
			}, 0)
		},
		watch: {
			updatedTime() {
				setTimeout(()=>{
					this.toGenerateSelection()
				}, 0)
			}
		},
		methods: {
			toSelect(i) {
				const items = this.$slots.default
				const theItem = items[i].componentInstance
				const isToCheck = !theItem.selected
				// 检测是否超出选择
				if (this.limits > 0 && isToCheck) {
					// limits为1的时候允许直接跳转（从这个变成选择另一个）
					if (this.selected.length >= this.limits && this.limits !== 1) {
						this.$emit("overed")
						return
					}
				}
				const _vals = []
				// limits为1的时候，直接切换状态或者清空选中
				if (this.limits === 1) {
					if (isToCheck) {
						items.forEach(item => {
							// unselect all
							item.componentInstance.selected = false
						})
						theItem.selected = isToCheck
						_vals.push(theItem.backValue)
					} else {
						theItem.selected = isToCheck
						_vals = []
					}
				} else {
					theItem.selected = isToCheck
					items.forEach(item => {
						if (item.componentInstance.selected) {
							_vals.push(item.componentInstance.backValue)
						}
					})
				}
				// console.log(_vals)
				this.selected = _vals
				this.$emit('input', _vals)
				this.$emit('change', _vals)
			},
			toGenerateSelection() {
				const items = this.$slots.default
				if (!items || items === 'undefined') {
					this.selected = []
					return
				}
				if (!this.value || this.value.length === 0) {
					items.forEach((item, index) => {
						item.componentInstance.index = index
						item.componentInstance.selected = false
					})
					this.selected = []
					return
				}
				// 遍历所有数据
				const that = this
				const _sel = []
				items.forEach((_item, index) => {
					const item = _item.componentInstance
					item.index = index
					let flag = false
					for (const i in that.value) {
						const theV = that.value[i]
						if (item.backValue === theV) {
							item.selected = true
							_sel.push(theV)
							flag = true
							break
						}
					}
					if (!flag) {
						item.selected = false
					}
				})
				this.selected = _sel
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../base.scss';
</style>
