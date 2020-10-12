<template>
	<view class="myp-result" :style="boxStyle">
		<view :style="{height: top}"></view>
		<slot name="icon">
			<myp-icon :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="iconBoxStyle"></myp-icon>
		</slot>
		<slot name="title">
			<text :class="['myp-color-'+titleType, 'myp-size-'+titleSize]" :style="titleStyle">{{title}}</text>
		</slot>
		<slot name="desc">
			<text :class="['myp-color-'+descType, 'myp-size-'+descSize]" :style="descStyle">{{desc}}</text>
		</slot>
		<slot name="extra"></slot>
	</view>
</template>

<script>
	export default {
		props: {
			/**
			 * 自定义距离顶部的距离
			 */
			top: {
				type: String,
				default: '260rpx'
			},
			/**
			 * 图标
			 */
			icon: {
				type: String,
				default: ''
			},
			/**
			 * 标题
			 */
			title: {
				type: String,
				default: ''
			},
			/**
			 * 描述
			 */
			desc: {
				type: String,
				default: '暂时还没有数据'
			},
			/**
			 * 标题颜色主题
			 */
			titleType: {
				type: String,
				default: 'second'
			},
			/**
			 * 标题尺寸主题
			 */
			titleSize: {
				type: String,
				default: 'll'
			},
			/**
			 * 标题样式
			 */
			titleStyle: {
				type: String,
				default: ''
			},
			/**
			 * 描述颜色主题
			 */
			descType: {
				type: String,
				default: 'second'
			},
			/**
			 * 描述尺寸主题
			 */
			descSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 描述样式
			 */
			descStyle: {
				type: String,
				default: ''
			},
			/**
			 * 图标颜色主题
			 */
			iconType: {
				type: String,
				default: 'second'
			},
			/**
			 * 图标尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'll'
			},
			/**
			 * 图标样式
			 */
			iconStyle: {
				type: String,
				default: ''
			},
			/**
			 * 图标外层样式
			 */
			iconBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-result {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: column;
		align-items: center;
	}
</style>
