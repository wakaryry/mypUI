<template>
	<myp-popup-always pos="bottom" :show="show" :height="600" @overlayClicked="toCancel">
		<view class="pp-header">
			<text class="pp-header-cancel" @tap="toCancel">取消</text>
			<text class="pp-header-title">选择城市</text>
			<text class="pp-header-confirm" @tap="toConfirm">确认</text>
		</view>
		<view class="pp-body">
			<picker-view class="pp-body-pick" indicator-style="height:100rpx;" @change="changeP">
				<picker-view-column>
					<view class="pp-body-item" v-for="(item, idx) in pcs" :key="idx">
						<text class="pp-body-item-text">{{item.name}}</text>
					</view>
				</picker-view-column>
			</picker-view>
			<picker-view class="pp-body-pick" indicator-style="height:100rpx;" @change="changeC">
				<picker-view-column>
					<view class="pp-body-item" v-for="(item, idx) in tempCities" :key="idx">
						<text class="pp-body-item-text">{{item.name}}</text>
					</view>
				</picker-view-column>
			</picker-view>
			<picker-view class="pp-body-pick" indicator-style="height:100rpx;" @change="changeA">
				<picker-view-column>
					<view class="pp-body-item" v-for="(item, idx) in tempAreas" :key="idx">
						<text class="pp-body-item-text">{{item.name}}</text>
					</view>
				</picker-view-column>
			</picker-view>
		</view>
	</myp-popup-always>
</template>

<script>
	// TODO: 完善数据
	import {mapGetters} from 'vuex'
	
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				tempCities: [],
				tempAreas: [],
				p_code: '',
				p_name: '',
				c_code: '',
				c_name: '',
				a_code: '',
				a_name: ''
			}
		},
		computed: {
			...mapGetters(['pcs', 'isLoadingPcs', 'areas'])
		},
		created() {
			const that = this
			if (this.pcs.length === 0) {
				if (!this.isLoadingPcs) {
					this.$store.dispatch("common/provinceCity").then(()=>{
						const p = that.pcs[0]
						that.p_name = p.name
						that.p_code = p.code
						that.tempCities = p.cities || []
						if (that.tempCities.length > 0) {
							const ct = that.tempCities[0]
							that.c_code = ct.code
							that.c_name = ct.name
							that.toLoadAreas(ct.code)
						}
					}).catch(()=>{})
				}
			} else {
				this.tempCities = this.pcs[0].cities || []
				if (this.tempCities.length > 0) {
					const ct = this.tempCities[0]
					this.toLoadAreas(ct.code)
				}
			}
		},
		methods: {
			changeP(val) {
				const picks = val.detail.value
				if (picks && picks.length > 0) {
					const pick = picks[0]
					const p = this.pcs[pick]
					this.p_code = p['code']
					this.p_name = p['name']
					// change cities and areas
					this.tempCities = p.cities || []
					if (this.tempCities.length > 0) {
						const ct = this.tempCities[0]
						this.c_code = ct.code
						this.c_name = ct.name
						this.toLoadAreas(ct.code)
					}
				}
			},
			changeC(val) {
				const picks = val.detail.value
				if (picks && picks.length > 0) {
					const pick = picks[0]
					const ct = this.tempCities[pick]
					this.c_code = ct.code
					this.c_name = ct.name
					this.toLoadAreas(ct.code)
				}
			},
			changeA(val) {
				const picks = val.detail.value
				if (picks && picks.length > 0) {
					const pick = picks[0]
					const a = this.tempAreas[pick]
					this.a_code = a.code
					this.a_name = a.name
				}
			},
			toLoadAreas(code) {
				const that = this
				if (this.areas[code] && this.areas[code].length > 0) {
					this.tempAreas = this.areas[code]
					const a = this.tempAreas[0]
					this.a_name = a.name
					this.a_code = a.code
				} else {
					this.$store.dispatch("common/commonCityAreas", {code: code}).then(response => {
						that.tempAreas = response || []
						if (that.tempAreas.length > 0) {
							const a = that.tempAreas[0]
							that.a_name = a.name
							that.a_code = a.code
						}
					}).catch(err => {
						that.$emit("error", err)
					})
				}
			},
			toConfirm() {
				this.$emit("confirm", {
					p: {
						code: this.p_code,
						name: this.p_name
					},
					c: {
						code: this.c_code,
						name: this.c_name
					},
					a: {
						code: this.a_code,
						name: this.a_name
					}
				})
			},
			toCancel() {
				this.$emit("cancel")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	
	.pp {
		&-header {
			height: 100rpx;
			width: 750rpx;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: 0 32rpx;
			border-top-left-radius: 24rpx;
			border-top-right-radius: 24rpx;
			background-color: #FFFFFF;
			&-cancel {
				color: $myp-text-color-third;
				font-size: 30rpx;
			}
			&-confirm {
				color: $myp-color-primary;
				font-size: 30rpx;
			}
			&-title {
				color: $myp-text-color;
				font-size: 30rpx;
			}
		}
		
		&-body {
			height: 500rpx;
			background-color: #FFFFFF;
			flex-direction: row;
			
			&-pick {
				flex: 1;
				height: 500rpx;
			}
			
			&-item {
				justify-content: center;
				align-items: center;
				height: 100rpx;
				
				&-text {
					color: $myp-text-color;
					font-size: 30rpx;
				}
			}
		}
	}
</style>
