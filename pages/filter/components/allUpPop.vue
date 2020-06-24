<template>
	<myp-popup-always :show="show" pos="bottom">
		<myp-navbar :fixed="false" :lefts="leftIcon" @leftAction="toCancel"></myp-navbar>
		<myp-list-simple bgType="inverse">
			<myp-list-cell></myp-list-cell>
		</myp-list-simple>
	</myp-popup-always>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				leftIcon: [{icon: 'close'}]
			}
		},
		methods: {
			toCancel() {
				this.$emit("cancel")
			}
		}
	}
</script>

<style>
</style>
