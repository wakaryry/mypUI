<template>
	<view class="bqv">
		<view class="bqv-item" bubble="true" @tap="toGrade">
			<text :class="['bqv-item-text', (grade.id!==0||selectedQuery===1)&&'bqv-item-current']">{{grade.id===0?'年级':grade.name}}</text>
			<myp-icon :name="selectedQuery===1?'up':'down'" :type="(grade.id!==0||selectedQuery===1) ? 'primary' : 'text'" @iconClicked="toGrade"></myp-icon>
		</view>
		<view class="bqv-item bqv-margin" bubble="true" @tap="toPublisher">
			<text :class="['bqv-item-text', (publisher.id!==0||selectedQuery===2)&&'bqv-item-current']">{{publisher.id===0?'版本':publisher}}</text>
			<myp-icon :name="selectedQuery===2?'up':'down'" :type="(publisher.id!==0||selectedQuery===2) ? 'primary' : 'text'" @iconClicked="toPublisher"></myp-icon>
		</view>
		<view class="bqv-item bqv-margin" bubble="true" @tap="toSubject">
			<text :class="['bqv-item-text', (subject.id!==0||selectedQuery===3)&&'bqv-item-current']">{{subject.id===0?'科目':subject.name}}</text>
			<myp-icon :name="selectedQuery===3?'up':'down'" :type="(subject.id!==0||selectedQuery===3) ? 'primary' : 'text'" @iconClicked="toSubject"></myp-icon>
		</view>
		<view v-if="clearVisible" class="bqv-clear" bubble="true" @tap="toClear">
			<text class="bqv-clear-text">清除</text>
			<myp-icon name="solid-close" type="inverse" @iconClicked="toClear"></myp-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			grade: {
				type: Object,
				default: ()=>{
					return {
						id: 0,
						name: ''
					}
				}
			},
			publisher: {
				type: String,
				default: ''
			},
			subject: {
				type: Object,
				default: ()=>{
					return {
						id: 0,
						name: ''
					}
				}
			},
			selectedQuery: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
			}
		},
		computed: {
			clearVisible() {
				if (this.grade && this.grade.id*1 !== 0) {
					return true
				}
				if (this.publisher && this.publisher.length > 0) {
					return true
				}
				if (this.subject && this.subject.id*1 !== 0) {
					return true
				}
				return false
			}
		},
		methods: {
			toClear() {
				this.$emit("clear")
			},
			toGrade() {
				this.$emit("grade")
			},
			toPublisher() {
				this.$emit("publisher")
			},
			toSubject() {
				this.$emit("subject")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	
	.bqv {
		width: 750rpx;
		height: 100rpx;
		border-top-width: 1px;
		border-top-color: $myp-border-color-light;
		flex-direction: row;
		align-items: center;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		
		&-item {
			flex-direction: row;
			align-items: center;
			
			&-text {
				margin-right: 6rpx;
				font-size: 32rpx;
				color: $myp-text-color;
			}
			
			&-current {
				color: $myp-color-primary;
			}
		}
		
		&-margin {
			margin-left: 32rpx;
		}
		
		&-clear {
			margin-left: 46rpx;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			background-color: $myp-color-error;
			border-radius: 30rpx;
			height: 58rpx;
			width: 160rpx;
			
			&-text {
				margin-right: 6rpx;
				font-size: 32rpx;
				color: #FFFFFF;
			}
		}
	}
</style>
