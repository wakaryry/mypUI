<template>
	<view ref="myp-swiper">
		<view></view>
	</view>
</template>

<script>
	export default {
		props: {
			items: {
				type: Array,
				default: ()=>{
					return []
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
