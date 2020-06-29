<template>
	<view>
		<scroll-view class="myp-bg-page th" :scroll-y="true" :style="mypContentHeightStyle">
			<view style="height: 32rpx;"></view>
			<view :class="['th-content', item.uid===1?'th-content-left':'th-content-right']" v-for="(item, idx) in items" :key="idx">
				<myp-message-time v-if="idx===0 || idx ===5" :time="idx===0?'10:46':'11:05'" boxStyle="width:686rpx;"></myp-message-time>
				<myp-message-text :direction="item.uid===1?'left':'right'" :avatar="item.avatar" :text="item.text" :bgType="item.uid===1?'':'error'" :textType="item.uid===1?'':'inverse'"></myp-message-text>
				<view style="height: 32rpx;"></view>
			</view>
			<view style="height: 32rpx;"></view>
		</scroll-view>
	</view>
</template>

<script>
	
	import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js'
	
	export default {
		mixins: [contentBoxMixin],
		data() {
			return {
				mypTabHeight: 50,
				mypIncludeXBar: false,
				items: [{
					uid: 1,
					nickname: '章鱼哥哥很爱你直到天荒地老章鱼哥哥很爱你直到天荒地老',
					avatar: '/static/octopus.png',
					text: '这个tabbar，有什么特点？要怎么用'
				}, {
					uid: 2,
					nickname: '雪梨妹妹也爱你直到地老天荒雪梨妹妹也爱你直到地老天荒',
					avatar: '/static/bear.jpg',
					text: '这个。哦。特点就是，我们没有使用swiper来实现tabbar，没有左右滑动的切换'
				}, {
					uid: 2,
					nickname: '雪梨妹妹',
					avatar: '/static/bear.jpg',
					text: '还有就是可配置程度高，非常灵活，细节都可以配置'
				}, {
					uid: 2,
					nickname: '雪梨妹妹',
					avatar: '/static/bear.jpg',
					text: '实在不行的话，你直接复制粘贴一份，然后把tabs的样式全部硬实现一次，也花不了多少时间，毕竟这个东西一个app几乎只用到一次'
				}, {
					uid: 1,
					nickname: '章鱼哥哥',
					avatar: '/static/octopus.png',
					text: '好的！😊'
				}, {
					uid: 2,
					nickname: '雪梨妹妹',
					avatar: '/static/bear.jpg',
					text: 'OK'
				}, {
					uid: 2,
					nickname: '雪梨妹妹',
					avatar: '/static/bear.jpg',
					text: '另外一个不是hump的例子可以看我们的首页tabbar。这个是hump的。具体的配置看文档。写的很详细的。'
				}, {
					uid: 1,
					nickname: '章鱼哥哥',
					avatar: '/static/octopus.png',
					text: '好的！😊 我看到了。我可以自己随意复制一份，然后随意改成自己想要的样子。太好了。'
				}]
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	.th {
		width: 750rpx;
		
		&-content {
			padding-left: 32rpx;
			padding-right: 32rpx;
			flex-direction: column;
			
			&-left {
				align-items: flex-start;
			}
			
			&-right {
				align-items: flex-end;
			}
		}
	}
</style>
