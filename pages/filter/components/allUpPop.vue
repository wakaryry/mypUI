<template>
	<myp-popup-always :show="show" pos="bottom">
		<myp-navbar :fixed="false" :lefts="leftIcon" title="院校筛选" @leftAction="toCancel"></myp-navbar>
		<view :hack="toHack"></view>
		<myp-list :down="null" :up="null" bgType="inverse">
			<myp-list-cell>
				<view style="height: 8rpx;"></view>
			</myp-list-cell>
			<myp-list-cell v-for="(filter, idx) in filters" :key="idx">
				<view style="padding-left: 24rpx;padding-right: 24rpx;">
					<myp-title :title1="filter.name" title1Size="ll" boxStyle="height:90rpx;"></myp-title>
					<view class="ap-tags">
						<view class="ap-tags-item" v-for="(tag, index) in filter.list" :key="index" :style="{'margin-right': (index%3===2)?'0':'21rpx'}">
							<myp-tag :selected="tag['active']" border="none" selectedBorder="all-primary" :text="tag.name" textSize="l" bgType="page" textType="text" :boxStyle="tagStyle" :selectedBgType="index===0?'inverse':'primary'" :selectedTextType="index===0?'text':'inverse'" @tagClicked="toToggleTag(tag, filter.type)"></myp-tag>
						</view>
					</view>
				</view>
			</myp-list-cell>
		</myp-list>
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
				actives: {},
				filters: [],
				leftIcon: [{icon: 'close'}],
				items: [
					{"name":"院校类型","type":"universityType","list":[{"name":"综合","id":"1"},{"name":"工科","id":"2"},{"name":"师范","id":"3"},{"name":"农业","id":"4"},{"name":"医药","id":"5"},{"name":"财经","id":"6"},{"name":"政法","id":"7"},{"name":"林业","id":"8"},{"name":"民族","id":"9"},{"name":"语言","id":"10"},{"name":"军事","id":"11"},{"name":"体育","id":"12"},{"name":"艺术","id":"13"},{"name":"党政","id":"14"}]},{"name":"院校特点","type":"uniType","list":[{"name":"211","id":"1"},{"name":"985","id":"2"},{"name":"双一流","id":"3"}]},{"name":"办学类型","type":"runningType","list":[{"name":"大学","id":"1"},{"name":"学院","id":"2"},{"name":"高职专科","id":"3"},{"name":"独立学院","id":"4"},{"name":"其他","id":"5"}]},{"name":"公办/民办","type":"conductStatus","list":[{"name":"公办","id":"1"},{"name":"民办","id":"2"}]}
				]
			}
		},
		computed: {
			toHack() {
				if (this.items && this.items.length) {
					this.toConcatFilters()
					return this.items.length
				}
				return 0
			},
			tagStyle() {
				return `width: 220rpx;height:78rpx;`
			}
		},
		methods: {
			toClear() {
				// clear all other tags' selection, just select all-tag
				for (const i in this.filters) {
					const _f = this.filters[i]
					for (const j in _f.list) {
						const li = _f.list[j]
						if (li.id > 0 && li.active) {
							li.active = false
						} else if (li.id <= 0) {
							li.active = true
						}
					}
				}
			},
			toConfirm() {
				// to get selections
				const selections = {}
				for (const i in this.filters) {
					const _f = this.filters[i]
					for (const j in _f.list) {
						const li = _f.list[j]
						if (li.id > 0 && li.active) {
							if (selections[_f.type]) {
								selections[_f.type].list.push(Object.assign({}, li))
							} else {
								selections[_f.type] = {
									name: _f.name,
									list: [Object.assign({}, li)]
								}
							}
						}
					}
				}
				uni.$emit("universityFilter", selections)
				this.toNavBackOne()
			},
			toToggleTag(tag, type) {
				if (tag.id > 0) {
					// remove all-tag's select
					for (const i in this.filters) {
						const _f = this.filters[i]
						if (_f.type === type) {
							const li = _f.list[0]
							li.active = false
							break
						}
					}
				} else {
					// remove other tags' select
					for (const i in this.filters) {
						const _f = this.filters[i]
						if (_f.type === type) {
							for (const j in _f.list) {
								const li = _f.list[j]
								if (li.id > 0 && li.active) {
									li.active = false
								}
							}
							break
						}
					}
				}
				tag['active'] = tag.active ? false : true
				if (!tag.active) {
					// check if at least one in selected
					let flag = false
					for (const i in this.filters) {
						const _f = this.filters[i]
						if (_f.type === type) {
							for (const j in _f.list) {
								const li = _f.list[j]
								if (li.active) {
									flag = true
								}
							}
							break
						}
					}
					// if nothing selected
					if (!flag) {
						// then select the all-tag
						for (const i in this.filters) {
							const _f = this.filters[i]
							if (_f.type === type) {
								const li = _f.list[0]
								li.active = true
								break
							}
						}
					}
				}
			},
			toConcatFilters() {
				const _filters = JSON.parse(JSON.stringify(this.items))
				// cancat all
				const all = {
					id: -1,
					name: "全部",
					// default active
					active: true
				}
				const _arr = []
				const that = this
				_filters.forEach(item=>{
					const hi = Object.assign({}, all)
					// init default from actives prop
					item.list.forEach(_it=>{
						// default all false
						if (_it.id > 0) {
							_it['active'] = false
						}
						const act = that.actives[item.type]
						if (act) {
							for (const j in act.list) {
								const act_li = act.list[j]
								if (act_li.id === _it.id) {
									_it["active"] = true
									hi.active = false
									break
								}
							}
						}
					})
					item.list = [hi].concat(item.list)
					_arr.push(item)
				})
				this.filters = _arr
			},
			toCancel() {
				this.$emit("cancel")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ap {
		&-tags {
			flex-direction: row;
			flex-wrap: wrap;
			
			&-item {
				margin-bottom: 20rpx;
			}
		}
	}
</style>
