<template>
	<view class="myp-time" :style="boxStyle">
		<view v-if="tplIndexOfDays !== -1" :class="['myp-time-box', 'myp-height-'+height, 'myp-bg-'+type, 'myp-border-'+border, 'myp-radius-'+radius]" :style="mrTimeBoxStyle">
			<text :class="['myp-color-'+(type&&type.length>0?'inverse':''), 'myp-size-'+size]" :style="timeTextStyle">{{countDownData.day}}</text>
		</view>
		<view v-if="tplIndexOfDays !== -1" class="myp-time-dot-box" :style="mrDotBoxStyle">
			<text :class="['myp-color-'+type, 'myp-size-'+size]" :style="dotTextStyle">{{getDot(tplIndexOfDays, tplIndexOfHours)}}</text>
		</view>
		
		<view v-if="tplIndexOfHours !== -1" :class="['myp-time-box', 'myp-height-'+height, 'myp-bg-'+type, 'myp-border-'+border, 'myp-radius-'+radius]" :style="mrTimeBoxStyle">
			<text :class="['myp-color-'+(type&&type.length>0?'inverse':''), 'myp-size-'+size]" :style="timeTextStyle">{{countDownData.hour}}</text>
		</view>
		<view v-if="tplIndexOfHours !== -1" class="myp-time-dot-box" :style="mrDotBoxStyle">
			<text :class="['myp-color-'+type, 'myp-size-'+size]" :style="dotTextStyle">{{getDot(tplIndexOfHours, tplIndexOfMinutes)}}</text>
		</view>
		
		<view v-if="tplIndexOfMinutes !== -1" :class="['myp-time-box', 'myp-height-'+height, 'myp-bg-'+type, 'myp-border-'+border, 'myp-radius-'+radius]" :style="mrTimeBoxStyle">
			<text :class="['myp-color-'+(type&&type.length>0?'inverse':''), 'myp-size-'+size]" :style="timeTextStyle">{{countDownData.minute}}</text>
		</view>
		<view v-if="tplIndexOfMinutes !== -1" class="myp-time-dot-box" :style="mrDotBoxStyle">
			<text :class="['myp-color-'+type, 'myp-size-'+size]" :style="dotTextStyle">{{getDot(tplIndexOfMinutes, tplIndexOfSeconds)}}</text>
		</view>
		
		<view v-if="tplIndexOfSeconds !== -1" :class="['myp-time-box', 'myp-height-'+height, 'myp-bg-'+type, 'myp-border-'+border, 'myp-radius-'+radius]" :style="mrTimeBoxStyle">
			<text :class="['myp-color-'+(type&&type.length>0?'inverse':''), 'myp-size-'+size]" :style="timeTextStyle">{{countDownData.second}}</text>
		</view>
		<view v-if="tplIndexOfSeconds !== -1" class="myp-time-dot-box" :style="mrDotBoxStyle">
			<text :class="['myp-color-'+type, 'myp-size-'+size]" :style="dotTextStyle">{{getDot(tplIndexOfSeconds, -1)}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 时间戳
			time: {
				type: Number,
				default: 1600000000000
			},
			// 倒计时的间隔,单位为"毫秒"
			interval: {
				type: Number,
				default: 1000
			},
			// template 模版
			tpl: {
				type: String,
				default: '{h}:{m}:{s}'
			},
			type: {
				type: String,
				default: ''
			},
			size: {
				type: String,
				default: 'l'
			},
			border: {
				type: String,
				default: 'none'
			},
			radius: {
				type: String,
				default: 's'
			},
			height: {
				type: String,
				default: 'base'
			},
			itemWidth: {
				type: String,
				default: '0'
			},
			dotWidth: {
				type: String,
				default: '60rpx'
			},
			// 最外层包裹 style
			boxStyle: {
				type: String,
				default: ''
			},
			// 数字盒子 style
			timeBoxStyle: {
				type: String,
				default: ''
			},
			// 盒子Style
			dotBoxStyle: {
				type: String,
				default: ''
			},
			// 数字文字 Style
			timeTextStyle: {
				type: String,
				default: ''
			},
			// 文字Style
			dotTextStyle: {
				type: String,
				default: ''
			}
		},
		data: () => ({
			NOW_DATE: new Date().getTime(),
			completed: false,
			tplIndexOfDays: -1,
			tplIndexOfHours: -1,
			tplIndexOfMinutes: -1,
			tplIndexOfSeconds: -1
		}),
		mounted() {
			setInterval(() => {
				this.NOW_DATE = new Date().getTime();
			}, this.interval);

			this.tplIndexOfDays = this.tpl.indexOf('d');
			this.tplIndexOfHours = this.tpl.indexOf('h');
			this.tplIndexOfMinutes = this.tpl.indexOf('m');
			this.tplIndexOfSeconds = this.tpl.indexOf('s');
		},
		computed: {
			countDownData() {
				const timeSpacing = this.time - this.NOW_DATE;

				// 倒计时结束了
				if (timeSpacing < 0) {
					if (this.completed === false) {
						this.$emit('completed');
					}
					this.setCompleted()
					return {
						day: '00',
						hour: '00',
						minute: '00',
						second: '00'
					}
				}

				let day = 0;
				let hour = 0;
				let minute = 0;
				let second = 0;

				if (this.tplIndexOfDays !== -1) {
					day = Math.floor(timeSpacing / (24 * 60 * 60 * 1000));
					hour = Math.floor(timeSpacing % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
				} else {
					day = 0;
					hour = Math.floor(timeSpacing / (60 * 60 * 1000));
				}

				if (this.tplIndexOfHours !== -1) {
					hour = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
					minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) % (60 * 60 * 1000) / (60 * 1000));
				} else {
					hour = 0;
					minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 1000));
				}

				if (this.tplIndexOfMinutes !== -1) {
					minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / (60 * 1000));
					second = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) % (60 * 1000) / 1000);
				} else {
					minute = 0;
					second = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / 1000);
				}

				return {
					day: day < 10 ? '0' + day : '' + day,
					hour: hour < 10 ? '0' + hour : '' + hour,
					minute: minute < 10 ? '0' + minute : '' + minute,
					second: second < 10 ? '0' + second : '' + second
				}
			},
			mrTimeBoxStyle() {
				const _width = parseInt(this.itemWidth)
				let _style = ''
				if (_width <= 0) {
					_style += `padding-left:24rpx;padding-right:24rpx;`
				} else {
					_style += `width:${this.itemWidth};`
				}
				return _style + this.timeBoxStyle
			},
			mrDotBoxStyle() {
				return `width:${this.dotWidth};` + this.dotBoxStyle
			}
		},

		methods: {
			getDot(prevTagIndex, nextTagIndex = -1) {
				if (nextTagIndex === -1) {
					return this.tpl.slice(prevTagIndex + 2)
				}
				return this.tpl.slice(prevTagIndex + 2, nextTagIndex - 1)
			},
			setCompleted() {
				this.completed = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-time {
		flex-direction: row;
		align-items: center;
		
		&-box {
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}
		&-dot-box {
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}
	}
</style>
