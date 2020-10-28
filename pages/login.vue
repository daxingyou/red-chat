<template>
	<view style="display: flex;width: 100%; height: 100%; flex-direction: column; align-content: space-around;">
		<view class="boxcenter main_area">
			<view class="boxcenter main_content">
				<view class="logo" >
				   <text>全民娱乐</text>
				</view>
				<view class="boxcenter loginarea">
					<view  class="inputitem boxcenter inputtext" style="align-content: center;">
						<image src="../static/louser.png" class="theicon"></image>
						<view class="">
							<input type="text" value="" maxlength="11" @input="inputusername" placeholder="输入登录用户名" />
						</view>
					</view>
					<view  class="inputitem boxcenter inputtext">
						<image src="../static/pwd.png" class="theicon"></image>
						<view class="">
							<input type="text" password="true" maxlength="11" value="" @input="inputpassword" placeholder="输入登录密码" />
						</view>
					</view>
					<view  class="inputitem inputitem1 mainfont" data-target="Modal" @tap="sendRequest2">登录</view>
				</view>
				<view class="reginfo mainfont boxcenter" >
					<view class="" @tap="toregist">注册</view>
				</view>
			</view>
		</view>
		<view class="boxcenter appnotice">
			<view>Copyright © 全民娱乐公司</view>
		</view>		
	</view>
</template>


<script>
	import {
	    mapMutations  
	} from 'vuex';
	export default {
		data() {
			return {
				notice:"",
				logo:"",
				logininfo:{
					apitype: 1,
					userName: "",
					passWord: ""
				},
				
			}
		},
		onLoad(){
		  this.logo="";
		},
		onShow() {
			let myapp=getApp();
		},
		methods: {
			...mapMutations(['login']),
			inputpassword(e){
				this.logininfo.passWord=e.target.value;
			},
			inputusername(e){
				this.logininfo.userName=e.target.value;
			},
			toregist(){
				uni.navigateTo({
					url:"regist"
				})
			},
			tohome(){
				uni.showModal({
					title:"",
					content:"我也不知道干什么",
				})
			},
		//方式二  then/catch
        sendRequest2 (e) {
		var that = this;
		if(that.logininfo.userName==""||that.logininfo.passWord==""){
			uni.showModal({
				title:'',
				content:"你是不是忘了什么",
				showCancel:false
			})
			return;
		}
		let params = {
			userName: that.logininfo.userName,
			passWord: that.logininfo.passWord
		} 
		this.$apiconfig.login_f({data:params}).then(res=>{
			if(res.data.data.rows){
				///获取用户相关的组群，好友，及个人信息
				that.login(res.data.data.rows);				
				uni.reLaunch({
					url:'index/index'	
				})
				///设置接口访问token
				that.$request.setConfig({
					header: {
						'Authentication': res.data.data.rows.token,
						'content-type': 'application/json'
					}
				})
			}else{
				uni.showModal({
					title: "",
					content: res.data + "，请稍后再试",
					showCancel: false
				})
			}
		})
	  }
	 },
	}
	
</script>

<style>
/*每个页面公共css */
page {
	  height: 100%;
	  width: 100%;
	  background-color: #ebebeb;
	  font-size: 24upx;
	}
	.maincolor{
		color: #FFFFFF;
	}	
	.boxcenter{
			display: flex;
			justify-content: center; 
	}
	.logo p{
		text-align: center;
		margin-top: 60upx;
		
	}
	.logo text {
		font-size: 60upx;
		color: #fff;
		text-align: center;
		margin: 0 auto;
		display: block;
	}
	.logo>rich-text>div>p>img{
		height: 5upx;
	}
   .uniinput {
		height: 50upx;
		padding: 15upx 25upx;
		line-height:50upx;
		font-size:28upx;
		background:#FFF;
		flex: 1;
	}
	.mainfont{
		color: #FFFFFF;
		font-size: 34upx;
	}
	.blodfont{
		font-weight: bold;
	}
	.mainbg{
		background: linear-gradient(to right,#0f63a4  0%,#1a5194 100%);
	}
	.choosemainbg{
		font-size: 28upx;
	   background: linear-gradient(to right, #0f63a4  0%, rgb(18, 56, 102) 100%);
	}		
.main_area{
	height:100%;
    width: 100%;
	display: flex;
   background: linear-gradient( to right, #ff595c 0%, #ff7c7e 100%);

}

.appnotice{
	height: 6%;
	font-size: 13px;
	align-items: center;
	background-color: #fff;
	color: #000;
}
.loginarea{
	height: 500upx;
	width: 100%;
	flex-direction: column;
	align-items: stretch;
	margin-top: 160upx;
}
.inputitem{
	width: 100%;
	height: 90upx;
    margin-top: 20upx;
    border-radius:200upx;
	background-color: #FFFFFF;
}
.inputtext{
	align-items: center;
	
}
.inputitem input{

		line-height: 90upx;
		margin-left: 20upx;
		font-size: 28upx;
}
.inputitem1{
	border:3upx solid #fff;
	background-color:transparent;
	height: 90upx;
	line-height: 90upx;
text-align: center;
color: #fff;
}
.bottom_area{
   margin-top: 1%;
 align-items: center;
    height: 7%;
	background-color: #FFFFFF;


}
.bottom_area view{
	margin-left: 5upx;
	width: 120upx;
 
	padding: 10upx  ;
	text-align: center;
    border-radius: 10upx;
	color: #fff;
	 background-color: #888;
}
.reginfo view{
	width: 50%;
	text-align: center;
	height: 120upx;
	line-height: 120upx;
margin-top: 100upx;
}
.main_content{
	width: 80%;
	height: 100%;
	flex-direction: column;
  
    margin: 0 auto;
}

.logo{

  height:100upx;
  margin-top: -80upx;
 
}
.theicon{
	width: 50upx;
	height: 50upx;
	margin-left: -80upx;
}

</style>
