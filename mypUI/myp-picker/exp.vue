<template>
	<myp-popup :show="show" pos="bottom" :height="600" @overlayClicked="toCancel">
		<picker-header @cancel="toCancel" @confirm="toConfirm"></picker-header>
		<picker-content :mode="mode" :value="value" :startYear="startYear" :endYear="endYear" :startHour="startHour" :endHour="endHour" :step="step" :current="current" :dayStep="dayStep" :minuteStep="minuteStep" :afterStep="afterStep" :disabledAfter="disabledAfter" @change="changePicked"></picker-content>
	</myp-popup>
</template>

<script>
	// since the picker may just used in one or two pages,
	// it's just an example to show u how to make a picker popup.
	// u could make what u want
	import mypPopup from '../myp-popup/index.vue'
	import pickerContent from './content.vue'
	import pickerHeader from './header.vue'
	
	export default {
		components: {
			mypPopup,
			pickerContent,
			pickerHeader
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			// date/yearMonth/...time-about
			mode: {
				type: String,
				default: 'date'
			},
			startYear: {
				type: String,
				default: "1970"
			},
			endYear: {
				type: String,
				default: new Date().getFullYear() + ''
			},
			// it's value of all selected-items, not the index of the items. max length is 7
			value: {
				type: Array,
				default: ()=>{
					return [0,0,0,0,0,0,0]
				}
			},
			step: {
				type: Number,
				default: 1
			},
			current: {
				type: Boolean,
				default: false
			},
			//以下参数仅对mode==limit有效
			dayStep: {
				type: Number,
				default: 7
			},
			startHour: {
				type: Number,
				default: 8
			},
			endHour: {
				type: Number,
				default: 20
			},
			minuteStep: {
				type: Number,
				default: 10
			},
			afterStep: {
				type: Number,
				default: 30
			},
			disabledAfter: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				result: null
			}
		},
		methods: {
			changePicked(val) {
				this.result = JSON.parse(JSON.stringify(val||{}))
			},
			toCancel() {
				this.$emit("cancel")
			},
			toConfirm() {
				// u need to validate picker val by self
				this.$emit("confirm", this.result)
			}
		}
	}
</script>

<style>
</style>
