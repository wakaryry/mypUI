<template>
	<view class="myp-ct" :style="boxStyle">
		<text :class="['myp-color-'+type, 'myp-size-'+size, 'myp-height-'+height]" :style="timeStyle">{{time}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			time: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: 'third'
			},
			size: {
				type: String,
				default: 'ss'
			},
			height: {
				type: String,
				default: 's'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			timeStyle: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-ct {
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>
