<template>
	<view>
		<cmd-nav-bar title="提现" backgroundColor="#ff595c" fontColor="#fff" :back="true" icon-two="checkmore" @iconTwo="handleMore"></cmd-nav-bar>
		 <cmd-page-body type="top">
		<view class="person-list">
			 <cmd-transition name="fade-up">
			<view class="padding-sm">
				<view class="bg-grey2 padding radius text-center shadow-blur">
					<view class="text-lg">我的余额</view>
					<view class="margin-top-sm text-Abc">{{mine.availableMoney}}</view>
				</view>
			</view>
			</cmd-transition>
			<!-- <cmd-cell-item title="请选择银行卡" slot-left arrow>
				<cmd-icon type="tongzhi" size="24" color="#FF4040"></cmd-icon>
			</cmd-cell-item> -->
			<view class="cu-form-group margin-top" v-if="bankInfoList.length">
				<view class="title">请选择银行卡</view>
				<picker @change="PickerChange" :range-key="'creditCardNum'" :value="bankIndex" :range="bankInfoList">
					<view class="picker" @click="showSelectBank">
						{{bankIndex > -1? bankInfoList[bankIndex].creditCardNum : '请选择'}}
					</view>
				</picker>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-red lg" @click="createBank">添加提现渠道</button>
			</view>
			<view class="cu-form-group margin-top block">
				<view class="content">
					<view class="amount">
						<view class="num">
							<view class="text">
								提现金额
							</view>
							<view class="input">
								<input type="text" v-model="drawings.money" />
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-form-group margin-top block">
				<view class="content">
					<view class="amount">
						<view class="num">
							<view class="text">
								交易密码
							</view>
							<view class="input">
								<input type="password" v-model="drawings.dealPassWord" />
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-red lg" @click="toDrawings">提现</button>
			</view>
			<view class="cu-modal" :class="subModalName=='createBank'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">添加银行卡</view>
						<view class="action" @tap="hideSubModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">银行卡类型</view>
						<picker @change="PickerChangeAdd" :range-key="'name'" :value="bankTypeIndex" :range="bankTypeList">
							<view class="picker" @click="hideSubModal">
								{{bankTypeIndex > -1? bankTypeList[bankTypeIndex].name : '请选择'}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group margin-top block">
						<view class="content">
							<view class="amount">
								<view class="num">
									<view class="text">
										银行卡号
									</view>
									<view class="input">
										<input type="text" v-model="addBank.creditCardNum" />
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="cu-form-group margin-top block">
						<view class="content">
							<view class="amount">
								<view class="num">
									<view class="text">
										开户行&nbsp;&nbsp;
									</view>
									<view class="input">
										<input type="text" v-model="addBank.openingBank" />
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="cu-form-group margin-top block">
						<view class="content">
							<view class="amount">
								<view class="num">
									<view class="text">
										姓名&nbsp;&nbsp;&nbsp;&nbsp;
									</view>
									<view class="input">
										<input type="text" v-model="addBank.accountHolder" />
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-red text-red" @tap="hideSubModal">取消</button>
							<button class="cu-btn bg-red margin-left" @tap="toAddBank">确定</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		</cmd-page-body>
		
	</view>
</template>

<script>
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
	import {formValidate} from "../../util/util.js"
	import {
		mapState 
	} from 'vuex'; 
	export default {
		components: {
			cmdNavBar,
			cmdPageBody,
			cmdTransition,
			cmdCelItem,
			cmdAvatar
		},
		data() {
			return {
				subModalName:'',
				bankIndex: -1,
				bankTypeIndex: -1,
				mine:'',
				bankInfoList: '',
				bankTypeList: '',
				searchInfo:{
					id:'',
				},
				addBank:{
					userId:'',
					creditCardNum:'',
					accountHolder:'',
					openingBank:'',
					bankType:'',
				},
				drawings:{
					userId:'',
					userName:'',
					dealPassWord:'',
					toUserName:'',
					money:'',
				},
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		created() {
			this.getBankInfo()
			this.getBankTypeList()
		},
		onShow() {
			this.mine = this.userInfo.user;
		},
		methods: {
			handleMore () {
				uni.navigateTo({
					url:"sub_detail?typeId=" + 2 + "&subTypeId=" + 1 + "&typeName=提现"
				})
			},
			createBank(){
				this.subModalName = "createBank"
			},
			showSelectBank(){
				this.bankIndex = 0
			},
			hideSubModal(){
				this.subModalName = ""
				this.bankTypeIndex = 0
			},
			PickerChange(e) {
				this.bankIndex = e.detail.value
				this.drawings.toUserName = this.bankInfoList[this.bankIndex].id
			},
			PickerChangeAdd(e) {
				this.bankTypeIndex = e.detail.value
				this.addBank.bankType = this.bankTypeList[this.bankTypeIndex].state
				this.subModalName = "createBank"
			},
			getBankInfo(){
				this.searchInfo.id = this.mine.id
				this.$apiconfig.getBankInfo_f({data:this.searchInfo}).then(res=>{
					this.bankInfoList = res.data.data.rows
				});
			},
			getBankTypeList(){
				this.$apiconfig.getBankType_f({}).then(res=>{
					this.bankTypeList = res.data.data.rows
				});
			},
			toAddBank(){
				if(-1 == this.bankTypeIndex || !formValidate(this.addBank.creditCardNum,'require') || !formValidate(this.drawings.accountHolder,'require')
				|| !formValidate(this.addBank.openingBank,'require')){
					uni.showModal({
						showCancel:false,
						title:"",
						content:"请将表格填写完整",
					})
					return
				}
				this.addBank.userId = this.mine.id
				this.$apiconfig.addBankInfo_f({data:this.addBank}).then(res=>{
					if(res.data.data.rows){
						uni.showToast({
							icon:"none",
							title:"成功",
						})
					}
					this.hideSubModal()
					this.getBankInfo()
					this.addBank = ''
				});
			},
			toDrawings(){
				if(-1 == this.bankIndex || !formValidate(this.drawings.dealPassWord,'require') || !formValidate(this.drawings.money,'require')){
					uni.showModal({
						showCancel:false,
						title:"",
						content:"请将表格填写完整",
					})
					return
				}
				if(this.mine.availableMoney < this.drawings.money){
					uni.showModal({
						showCancel:false,
						title:"",
						content:"金额不足，无法提现",
					})
					return
				}
				this.drawings.userId = this.mine.id
				this.drawings.userName = this.mine.userName
				this.$apiconfig.drawings_f({data:this.drawings}).then(res=>{
					if(res.data.data.rows){
						uni.showToast({
							icon:"none",
							title:"成功",
						})
					}
					this.hideSubModal()
					this.drawings = ''
				});
			},
		}
	}
</script>

<style lang="scss">
	.room-list {
		.room {
			.img {
				height: 250upx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.category-list {
		width: 92%;
		margin: 0 4%;
		padding: 0 0 30upx 0;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.category {
			width: 15%;
			margin-top: 50upx;
			display: flex;
			flex-wrap: wrap;
			.img {
				width: 100%;
				display: flex;
				justify-content: center;
				image {
					width: 14vw;
					height: 14vw;
				}
			}
			.text {
				margin-top: 16upx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24upx;
				color: #3c3c3c;
			}
		}
	}
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}
	
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>