<template>
  <view>
    <view class="person-head">
      <cmd-avatar :src="mine.avatar" @click="gotouserinfo" size="lg" :make="{'background-color': '#fff'}">
      </cmd-avatar>
      <view class="person-head-box" >
		<!-- <view class="person-head-username">UID:{{mine.id}}</view> -->
        <view class="person-head-nickname">{{mine.userName}}</view>
		<view class="person-head-nickname">{{mine.nickName}}</view>
      </view>
	  <view class="person-head-box-r" >
	    <view class="person-head-nickname"><span class="bg-grey cu-btn round">有效余额:{{mine.availableMoney}}</span></view>
	    <view class="person-head-username"><span class="bg-grey cu-btn round">冻结金额:{{mine.blockedMoney}}</span></view>
	  </view>
    </view>
	<view class="person-account">
		<view class="bg-white">
			<view class="grid margin-bottom text-center">
				<view class="padding margin-left" @click="rechargeMoney">
					<cmd-icon type="phonebill" size="50" color="#ff595c"></cmd-icon>
					<text>充值</text>
				</view>
				<view class="padding" @click="toDrawings">
					<cmd-icon type="payment" size="50" color="#ff595c"></cmd-icon>
					<text>提现</text>
				</view>
				<view class="padding" @click="transferAccounts">
					<cmd-icon type="guarantee" size="50" color="#ff595c"></cmd-icon>
					<text>转账</text>
				</view>
			</view>
		</view>
	</view>
    <view class="person-list">
		<view class="margintop"></view>
		<cmd-cell-item v-if="1 == mine.isMonthCard" title="成为会员" slot-left @click="showPayment">
			<cmd-icon type="nickname" size="30" color="#948a8a"></cmd-icon>
		</cmd-cell-item>
		<cmd-cell-item v-else title="会员过期时间" slot-left :addon="mine.expirationTime">
			<cmd-icon type="instruction" size="30" color="#948a8a"></cmd-icon>
		</cmd-cell-item>
		<cmd-cell-item title="个人流水" slot-left :addon="mine.expendMoney">
			<cmd-icon type="evitarepayment" size="30" color="#948a8a"></cmd-icon>
		</cmd-cell-item>
		<cmd-cell-item title="个人明细" slot-left arrow @click="showDetail">
			<cmd-icon type="instruction" size="30" color="#948a8a"></cmd-icon>
		</cmd-cell-item>
		<cmd-cell-item title="我的邀请码" slot-left :addon="mine.promotionCode">
			<cmd-icon type="vision" size="30" color="#948a8a"></cmd-icon>
		</cmd-cell-item>
		<cmd-cell-item title="我的推广" slot-left arrow @click="generalize">
			<cmd-icon type="turnvoice" size="30" color="#948a8a"></cmd-icon>
		</cmd-cell-item>
		<cmd-cell-item title="团队管理" slot-left arrow @click="showTeam">
			<cmd-icon type="groupctrl" size="30" color="#948a8a"></cmd-icon>
		</cmd-cell-item>
		<view class="margintop"></view>
		<cmd-cell-item title="平台介绍" slot-left arrow @click="showIntroduce">
			<cmd-icon type="problem" size="30" color="#948a8a"></cmd-icon>
		</cmd-cell-item>
		<!-- <cmd-cell-item title="在线客服" slot-left arrow>
			<cmd-icon type="kefu" size="24" color="#FF4040"></cmd-icon>
		</cmd-cell-item> -->
		<cmd-cell-item title="绑定手机" slot-left :addon="mine.mobile">
			<cmd-icon type="phone" size="30" color="#948a8a"></cmd-icon>
		</cmd-cell-item>
		<!-- <cmd-cell-item title="消息通知" slot-left arrow>
			<cmd-icon type="tongzhi" size="24" color="#FF4040"></cmd-icon>
		</cmd-cell-item> -->
		<cmd-cell-item title="设置" @click="gotouserinfo" slot-left arrow>
			<cmd-icon type="setting" size="30" color="#948a8a"></cmd-icon>
		</cmd-cell-item>
		<view class="margintop"></view>
    </view>
  </view>
  </template>

<script>
  import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
  import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
  import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
  import cmdCellItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
import {
	mapState 
} from 'vuex';  
export default {
    components: {
		cmdAvatar,
		cmdCellItem,
		cmdIcon,
		cmdNavBar
    },
    data() {
		return {
			mine:{
				userImg:'/static/img/im/face/face.jpg',
				promotionCode:'',
				expendMoney:'',
				userName:'',
				uid:''
			}
		};
    },
	computed: {
		...mapState(['hasLogin','userInfo'])
	},
	onShow() {
		this.mine = this.userInfo.user;
	},
    methods: {
		showPayment(){
			uni.navigateTo({
				url:"../user/payment"
			})
		},
		generalize(){
			uni.reLaunch({
				url:'../invitation/invitation'	
			})
		},
		toDrawings(){
			uni.navigateTo({
				url:"../user/drawings"
			})
		},
		showTeam(){
			uni.navigateTo({
				url:"../team/team"
			})
		},
		rechargeMoney(){
			uni.navigateTo({
				url:"../user/rechargemoney"
			})
		},
		showDetail(){
			uni.navigateTo({
				url:"../user/detail"
			})
		},
		transferAccounts(){
			uni.navigateTo({
				url:"../user/transfer_accounts"
			})
		},
		showIntroduce(){
			uni.navigateTo({
				url:"../user/introduce"
			})
		},
		gotouserinfo(){
			uni.navigateTo({
				url:"../user/userinfo"
			})
		}	
    }
  }
</script>

<style lang="scss">
	.person-account {
		height: 200upx;
		.img {
			height: 70upx;
			width: 70upx;
		}
	}
	.margintop {
		height: 20upx;
		background-color: #e7e7e7;
	}
	page{
		background-color: #fff;
	}
  .person-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 150px;
    padding-left: 20px;
    background: linear-gradient(to right, #ff595c, #ff7c7e);
  }

  .person-head-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 10px;
  }

  .person-head-box-r {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 100px;
  }
  
  .person-head-nickname {
    font-size: 18px;
    font-weight: 500;
    color: #fff;
  }

  .person-head-username {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
	margin-top: 10upx;
  }

  .person-list {
	  background-color: #fff;
    line-height: 0;
  }
</style>
