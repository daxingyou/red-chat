<template>
	<view>
		<!-- 头部 -->
		<cmd-nav-bar title="充值会员" backgroundColor="#ff595c" fontColor="#fff" :back="true"></cmd-nav-bar>  
		<cmd-page-body type="top">
		<view class="person-list">
			<view class="padding-sm">
				<view class="bg-grey2 padding radius text-center shadow-blur">
					<view class="text-lg">我的余额</view>
					<view class="margin-top-sm text-Abc">{{mine.availableMoney}}</view>
				</view>
			</view>
		</view>
		<view class="block">
			<view class="title">
				支付金额
			</view>
			<view class="content">
				<view class="amount">
					<view class="list">
						<view class="box">
							50元
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="block">
			<view class="title">
				选择支付方式
			</view>
			<view class="content">
				<view class="pay-list">
					<view class="row" @tap="paytype='alipay'">
							<view class="left">
								<image src="/static/img/alipay.png"></image>
							</view>
							<view class="center">
								支付宝支付
							</view>
							<view class="right">
								<radio :checked="paytype=='alipay'" color="#f06c7a" />
							</view>
					</view>
					<view class="row" @tap="paytype='wxpay'">
							<view class="left">
								<image src="/static/img/wxpay.png"></image>
							</view>
							<view class="center">
								微信支付
							</view>
							<view class="right">
								<radio :checked="paytype=='wxpay'" color="#f06c7a" />
							</view>
					</view>
					<view class="row" @tap="paytype='balance'">
							<view class="left">
								<image src="/static/img/alipay.png"></image>
							</view>
							<view class="center">
								余额支付
							</view>
							<view class="right">
								<radio :checked="paytype=='balance'" color="#f06c7a" />
							</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pay">
			<view class="btn" @tap="doDeposit">立即充值</view>
			<view class="tis">
				点击立即充值，即代表您同意<view class="terms">
					《条款协议》
				</view>
			</view>
		</view>
		 </cmd-page-body>
		
	</view>
</template>

<script>
	import {
		mapState 
	} from 'vuex';  
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
				paytype:'alipay',//支付类型，
				mine:'',
				rechargeInfo:{
					userId:'',
					rechargeMoney: '',
					paytype:'',
					type: 6,
				},
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onShow() {
			this.mine = this.userInfo.user;
		},
		methods:{
			doDeposit(){
				//模板模拟支付，实际应用请调起微信/支付宝
				uni.showLoading({
					title:'支付中...'
				});
				this.rechargeInfo.userId = this.mine.id
				this.rechargeInfo.rechargeMoney = 50
				if(this.paytype == 'alipay'){
					this.rechargeInfo.paytype = 1
				}else if(this.paytype == 'wxpay'){
					this.rechargeInfo.paytype = 2
				}else{
					this.rechargeInfo.paytype = 3
				}
				this.$apiconfig.createOrder_f({data:this.rechargeInfo}).then(res=>{
					if(res.data.data.rows){
						if(this.paytype == 'alipay'){
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: {
									"dealId": res.data.data.rows.alipay.dealId,
									"appKey": res.data.data.rows.alipay.appKey,
									"totalAmount": res.data.data.rows.alipay.totalAmount,
									"tpOrderId": res.data.data.rows.alipay.tpOrderId,
									"dealTitle": res.data.data.rows.alipay.dealTitle,
									"rsaSign": res.data.data.rows.alipay.rsaSign,
									"bizInfo": res.data.data.rows.alipay.bizInfo
								}, //订单数据
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						}else if(this.paytype == 'wxpay'){
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: String(Date.now()),
								nonceStr: res.data.data.rows.nonceStr,
								package: res.data.data.rows.package,
								signType: 'MD5',
								paySign: res.data.data.rows.paySign,
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						}else{
							if(1 == res.data.data.rows.isTrue){
								uni.showToast({
									title: "充值成功",
								})
							}
						}
					}
					this.hideSubModal()
					this.rechargeInfo = ''
				});
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
					display: flex;
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
