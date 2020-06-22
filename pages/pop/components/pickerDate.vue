<template>
	<myp-popup :show="show" pos="bottom" height="600" @overlayClicked="toCancel">
		<myp-picker-header @cancel="toCancel" @confirm="toConfirm"></myp-picker-header>
		<myp-picker-content :value="value" :current="current" mode="date" @inited="initedDate" @change="changedDate"></myp-picker-content>
	</myp-popup>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			value: {
				type: Array,
				default: ()=>{
					return [0,0,0,0,0,0,0]
				}
			},
			current: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				result: null
			}
		},
		methods: {
			toCancel() {
				this.$emit("cancel")
			},
			toConfirm() {
				if (!this.result) {
					return
				}
 				this.$emit("confirm", this.result)
			},
			initedDate(val) {
				console.log(val)
				this.result = JSON.parse(JSON.stringify(val||{}))
			},
			changedDate(val) {
				console.log(val)
				this.result = JSON.parse(JSON.stringify(val||{}))
			}
		}
	}
</script>

<style>
</style>
