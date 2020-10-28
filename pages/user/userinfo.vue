<template>
  <view>
   <cmd-nav-bar title="设置" backgroundColor="#ff595c" fontColor="#fff" :back="true"></cmd-nav-bar> 
    <cmd-page-body type="top">
        <view>
		  <cmd-cel-item title="音效" :showSwitch="true"></cmd-cel-item>
          <cmd-cel-item title="修改登录密码" arrow @click="updatePassWord"></cmd-cel-item>
          <cmd-cel-item :title="mine.dealPassWord?'修改交易密码':'设置交易密码'" arrow @click="updateDealPassWord"></cmd-cel-item>
          <cmd-cel-item title="绑定上级" arrow @click="bandSuperior" v-if="!mine.fatherId"></cmd-cel-item>
          <cmd-cel-item title="当前版本" addon="v1.1.1"></cmd-cel-item>
          <button class="btn-logout" @click="tologout">退出登录</button>
        </view>
	  <view class="cu-modal" :class="subModalName=='bandSuperior'?'show':''">
	  	<view class="cu-dialog">
	  		<view class="cu-bar bg-white justify-end">
	  			<view class="content">绑定上级</view>
	  			<view class="action" @tap="hideSubModal">
	  				<text class="cuIcon-close text-red"></text>
	  			</view>
	  		</view>
	  		<view class="cu-form-group">
	  			<view class="title">推广码</view>
	  			<view class="input">
	  				<input placeholder="" name="bandInfo.promotionCode"></input>
	  			</view>
	  		</view>
	  		<view class="cu-bar bg-white justify-end">
	  			<view class="action">
	  				<button class="cu-btn line-green text-green" @tap="hideSubModal">取消</button>
	  				<button class="cu-btn bg-red margin-left" @tap="toBand">确定</button>
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
  import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
  import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
  import { mapState } from 'vuex'
  import { mapMutations } from 'vuex'
  export default {
	name:'userInfo',
    components: {
		cmdNavBar,
		cmdPageBody,
		cmdCelItem,
		cmdAvatar
    },
    data() {
		return {
		    mine: {},
			subModalName:'',
			bandInfo:{
				userName:'',
				promotionCode:''
			}
		};
    },
	onShow() {
		this.mine = this.userInfo.user;
	},
	onHide() {
	},
	computed:{
		...mapState(['hasLogin','userInfo']),
	},
	methods:{
		...mapMutations(['logout']),
				tologout(e){
					let that = this;
					uni.showModal({
					    title: '警告',
					    content: '你确定退出登录吗',
					    success: function (res) {
					        if (res.confirm) {
					           that.logout()
							   uni.reLaunch({
							   	url:"../login"
							   })
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				},
				hideSubModal(){
					this.subModalName = ''
				},
				bandSuperior(){
					this.subModalName = "bandSuperior"
				},
				toBand(){
					this.bandInfo.userName = this.mine.userName
					this.$apiconfig.bandSuperior_f({data:this.bandInfo}).then(res=>{
						if(res.data.data.rows){
							uni.showToast({
								icon:"none",
								title:"成功",
							})
						}
						this.hideSubModal()
						this.bandInfo = ''
					});
				},
				gotodetail(e){
					uni.navigateTo({
						url:"/pages/user/update"
					})
				},
				updatePassWord(){
					uni.navigateTo({
						url:"/pages/user/update_password"
					})
				},
				updateDealPassWord(){
					uni.navigateTo({
						url:"/pages/user/update_dealpassword"
					})
				}
	}
  }
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}
  .btn-logout {
    margin-top: 100upx;
    width: 80%;
    border-radius: 50upx;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(to right, #ff595c, #ff7c7e);
  }

  .btn-logout-hover {
    background: linear-gradient(to right, #ff595c, #ff7c7e);
  }
  
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	
	.input{
		width: auto;
		/* width: 28.2vw; */
		border-bottom: solid 2upx #999;
		justify-content: flex-end;
		align-items: center;
		input{
			/* margin: 0 20upx; */
			height: 60upx;
			font-size: 30upx;
			// color: #f06c7a;
			justify-content: flex-end;
			align-items: center;
		}
	}
</style>
