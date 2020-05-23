<template>
	<view @tap="toSelect">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			// 可以提供item，从而可以给你返回具体内容
			// 并且可以初始化选中/不选中
			item: {
				type: [Number, String, Object],
				default: ()=>{
					return {}
				}
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		inject: ['mypCheck'],
		data() {
			return {
				index: 0,
				selected: false
			}
		},
		computed: {
			vl() {
				if (typeof this.item !== 'object') {
					return ''
				}
				return this.mypCheck.valueLabel
			},
			// 返回的值
			backValue() {
				if (typeof this.item !== 'object') {
					return this.item
				}
				if (this.vl && this.vl.length > 0) {
					return this.item[this.vl]
				}
				// 如果没有valueLabel，默认传index
				return this.index
			}
		},
		// 先父组件created，然后是子组件created，而且created是同步有序执行的，组件先后与created先后一致
		created() {
			// 因为我们的子组件是动态数据，新的数据子组件会created，但是以前created的组件，在this.mypCheck.children中依然存在
			// 所以不能这样来处理动态的数据
			/*
			if (this.mypCheck && this.mypCheck.children) {
				this.index = this.mypCheck.children.length
				this.mypCheck.children.push(this)
			}
			*/
		},
		methods: {
			toSelect() {
				if (this.mypCheck.disabled || this.disabled) {
					return
				}
				this.mypCheck.toSelect(this.index)
			}
		}
	}
</script>

<style>
</style>
