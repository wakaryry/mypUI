<template>
	<view class="myp-indicators" :style="boxStyle">
		<block v-for="(item, idx) in numbers" :key="idx">
			<view :class="mrClass + ' ' + (current === idx ? 'myp-indicator-active' : '')" :style="itemStyle + (current === idx ? itemSelectedStyle : '')"></view>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			// dot, line, number
			type: {
				type: String,
				default: 'dot'
			},
			number: {
				type: Number,
				default: 1
			},
			current: {
				type: Number,
				default: 0
			},
			boxStyle: {
				type: String,
				default: ''
			},
			itemStyle: {
				type: String,
				default: ''
			},
			itemSelectedStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			numbers() {
				const hi = []
				for (let i = 0; i < this.number; i++) {
					hi.push(i)
				}
				return hi
			},
			mrClass() {
				let _class = "myp-indicator-dot"
				switch (this.type){
					case 'line':
						_class = "myp-indicator-line"
						break;
					case 'number':
						break
					default:
						break;
				}
				return _class
			}
		}
	}
</script>

<style scoped>
	.myp-indicators {
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.myp-indicator-dot {
		width: 20rpx;
		height: 20rpx;
		border-radius: 10rpx;
		background-color: #333333;
	}
	.myp-indicator-line {
		width: 60rpx;
		height: 12rpx;
		border-radius: 6rpx;
		background-color: #333333;
	}
	.myp-indicator-active {
		background-color: #00C777;
	}
</style>
