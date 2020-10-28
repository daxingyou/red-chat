<template>
	<view>
	<cmd-nav-bar :title="mine.dealPassWord?'修改交易密码':'设置交易密码'" backgroundColor="#ff595c" fontColor="#fff" back="true"></cmd-nav-bar>
		<cmd-page-body type="top">
		<view class="content">
			<section>
				<view v-if="mine.dealPassWord" class="modifybank-text">
					<view><span>旧密码</span></view>
					<view class="" style="flex-grow: 1;">
						<input type="password" style="width: 100%; " v-model="senddata.oldPassWord" placeholder="请输入你的旧密码"/>
					</view>
				</view>
				<view class="modifybank-text">
					<view><span>新密码</span></view>
					<view class="" style="flex-grow: 1;">
						<input type="password" style="width: 100%; " v-model="senddata.passWord" placeholder="请输入6位以上包含数字、字母的密码"/>
					</view>
				</view>
				<view class="modifybank-text">
					<view><span>确认新密码</span></view>
					<view class="">
						<input type="password" style="width: 100%; " v-model="senddata.rePassWord" placeholder="请确认你的新密码"/>
					</view>
				</view>
				<button type="warn" class="round" style="margin-bottom: 0upx;" @tap="save">确定</button>
			</section>
		</view>
		</cmd-page-body>
	</view>
</template>

<script>
	import {formValidate} from "../../util/util.js";
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
	import { mapState } from 'vuex'
	import { mapMutations } from 'vuex'
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
				senddata:{
					userId:'',
					userName:'',
					oldPassWord: '',
					passWord: '',
					rePassWord: '',
				},
				mine:'',
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onShow() {
			this.mine = this.userInfo.user;
		},
		methods: {
			save(e){
				if((this.mine.dealPassWord && !formValidate(this.senddata.oldPassWord,'require')) || !formValidate(this.senddata.passWord,'require')
					|| !formValidate(this.senddata.rePassWord,'require')){
					uni.showModal({
						showCancel:false,
						title:"",
						content:"请将表格填写完整",
					})
					return
				}
				if(!formValidate(this.senddata.passWord,'password')){
					uni.showModal({
						showCancel:false,
						title:"",
						content:"请输入6位以上包含数字、字母的密码",
					})
					return
				}
				if(this.senddata.passWord !== this.senddata.rePassWord){
					uni.showModal({
						showCancel:false,
						title:"",
						content:"两次密码不一致",
					})
					return
				}       
				this.senddata.userId = this.mine.id
				this.senddata.userName = this.mine.userName
				this.$apiconfig.updateDealPassWord_f({data:this.senddata}).then(res=>{
					if(res.data.data.rows){
						this.senddata = ''
						uni.showToast({
							icon:"none",
							title:"成功",
						})
					}
					/* uni.navigateTo({
						url:"usercenter"
					}) */
					/* uni.reLaunch({
						url:'usercenter'	
					}) */
				}); 
			},
		}
	}
</script>

<style scoped lang="less">
	.router-view{
		background:#F1F1F1; 
	}
	section{
		.modifybank-text{
			background:#fff;
			position:relative;
			display:flex;
			justify-content:flex-start;
			width: 100%;
			padding:26upx 20upx;
			border-bottom: 1upx solid #dcdcdc;
			i{
				color:#999;
				position:absolute;
				left:92%;
				top:15upx;
				font-size:40upx;
			}
			select{
				 width: 65%;
				 height: 100%;
				 margin-right: 20upx;
				 line-height: 60upx;
				 color: #222;
				 font-size: 28upx;
				 border:none;
				 color:black;
				 background:#fff;
			}
			input{
				width: 65%;
				height: 100%;
				margin-right: 20upx;
				line-height: 60upx;
				color: #222;
				font-size:28upx;
				background:#fff;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				background:none;
			}
		}
		button{
			width:90%;
			margin:40upx auto;
		}
		button:after{
			border: none;
		}
		.item-lable{
			line-height:80upx;
			padding-left: 30upx;
			padding-right: 30upx;
			color: #999;
			font-size: 28upx;
		}
		.item_bock {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height:94upx;
			width: 300upx;
			padding:0upx 24upx 0upx 38upx;
			border-bottom: 1upx solid #f7f7f7;
			background: #fff;
		}  
			
		.modifybank-text>view:nth-child(1){
			width: 150upx;
			font-size: 26upx;
		}
	}	
</style>
