<template>
	<view>
		<!-- 头部 -->
		<cmd-nav-bar title="转账" backgroundColor="#ff595c" fontColor="#fff" :back="true" icon-two="checkmore" @iconTwo="handleMore"></cmd-nav-bar>  
		<cmd-page-body type="top">
		<view class="block">
			<view class="content">
				<view class="my">
					我的账户余额：{{mine.availableMoney}} 元
				</view>
			</view>
		</view>
		<view class="block">
			<view class="content">
				<view class="amount">
					<view class="num">
						<view class="text">
							转账账号
						</view>
						<view class="input">
							<input type="text" v-model="senddata.toUserName" />
						</view>
					</view>
				</view>
				<view class="amount">
					<view class="num">
						<view class="text">
							转账金额
						</view>
						<view class="input">
							<input type="number" v-model="senddata.money" />
						</view>
					</view>
				</view>
				<view class="amount">
					<view class="num">
						<view class="text">
							交易密码
						</view>
						<view class="input">
							<input type="password" v-model="senddata.dealPassWord" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pay">
			<view class="btn" @tap="doDeposit">确认</view>
		</view>
		</cmd-page-body>
	</view>
</template>

<script>
	import {
		mapState 
	} from 'vuex';  
	import {formValidate} from "../../util/util.js"
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
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
				mine:'',
				senddata:{
					userId:'',
					userName:'',
					dealPassWord:'',
					toUserName:'',
					money:'',
				}
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onShow() {
			this.mine = this.userInfo.user;
		},
		methods:{
			handleMore () {
				uni.navigateTo({
					url:"sub_detail?typeId=" + 3 + "&subTypeId=" + 1 + "&typeName=充值"
				})
			},
			select(amount){
				this.inputAmount = amount;
			},
			doDeposit(){
				if(!formValidate(this.senddata.toUserName,'require') || !formValidate(this.senddata.dealPassWord,'require') || !formValidate(this.senddata.money,'require')){
					uni.showModal({
						showCancel:false,
						title:"",
						content:"请将表格填写完整",
					})
					return
				}
				if (parseFloat(this.senddata.money).toString() == "NaN") {
					uni.showToast({title:'请输入正确金额',icon:'none'});
					return ;
				}
				if(this.senddata.money<=0){
					uni.showToast({title:'请输入大于0的金额',icon:'none'});
					return ;
				}
				if(parseFloat(this.senddata.money).toFixed(2)!=parseFloat(this.money)){
					uni.showToast({title:'最多只能输入两位小数哦~',icon:'none'});
					return ;
				}
				// 后台转账操作
				this.senddata.userId = this.mine.id
				this.senddata.userName = this.mine.userName
				this.$apiconfig.regist_f({data:this.senddata}).then(res=>{
					if(res.data.data.rows){
						uni.showToast({
							icon:"none",
							title:"成功",
						})
					}
					if(res.data.data.rows){
						setTimeout(function(){
							/*uni.navigateBack({
								delta:1
							})*/
							uni.reLaunch({
								url:"login"
							})
						},1500)
					}
				});
				setTimeout(()=>{
					uni.hideLoading();
					uni.showToast({
						title:'支付成功'
					});
					setTimeout(()=>{
						uni.redirectTo({
							url:'../../pay/success/success?amount='+this.inputAmount
						});
					},300);
				},700)
			}
		},
		onLoad() {
			
		},
	}
</script>

<style lang="scss">
	.block{
		width: 94%;
		padding: 20upx 3%;
		.title{
			width: 100%;
			font-size: 34upx;
		}
		.content{
			.my{
				width: 100%;
				height: 120upx;
				display: flex;
				align-items: center;
				font-size: 30upx;
				border-bottom: solid 1upx #eee;
			}
			.amount{
				width: 100%;
				
				.list{
					display: flex;
					justify-content: space-between;
					padding: 20upx 0;
					.box{
						width: 30%;
						height: 120upx;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 10upx;
						box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.05);
						font-size: 36upx;
						background-color: #f1f1f1;
						color: 333;
						&.on{
							background-color: #f06c7a;
							color: #fff;
						}
					}
				}
				.num{
					margin-top: 10upx;
					display: -webkit-inline-box;
					justify-content: flex-end;
					align-items: center;
					.text{
						padding-right: 10upx;
						font-size: 30upx;
					}
					.input{
						width: 28.2vw;
						border-bottom: solid 2upx #999;
						justify-content: flex-end;
						align-items: center;
						input{
							margin: 0 20upx;
							height: 60upx;
							font-size: 30upx;
							color: #f06c7a;
							justify-content: flex-end;
							align-items: center;
						}
					}
				}
			}
			.pay-list{
				width: 100%;
				border-bottom: solid 1upx #eee;
				.row{
					width: 100%;
					height: 120upx;
					display: flex;
					align-items: center;
					.left{
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						align-items: center;
						image{
							width: 80upx;
							height: 80upx;
						}
					}
					.center{
						width: 100%;
						font-size: 30upx;
					}
					.right{
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						justify-content: flex-end;
					}
				}
			}
		}
	}
	.pay{
		margin-top: 20upx;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		.btn{
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			background-color: #f06c7a;
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.2);
		}
		.tis{
			margin-top: 10upx;
			width: 100%;
			font-size: 24upx;
			display: flex;
			justify-content: center;
			align-items: baseline;
			color: #999;
			.terms{
				color: #5a9ef7;
			}
		}
	}
</style>
