<template>
	<view>
		<cmd-nav-bar title="每日签到" backgroundColor="#ff595c" fontColor="#fff" :back="true"></cmd-nav-bar>
		<cmd-page-body type="top">
			<model-calendar 
			:sendYear="toYear" :sendMonth="toMonth"
			:dataSource="signData" :totalNum="sumCount"
			@clickChange="clickRegister">
			<!-- <model-calendar 
				:sendYear="toYear" :sendMonth="toMonth"
				:dataSource="signData" :totalNum="sumCount"
				 @dateChange="getData" @clickChange="clickRegister"> -->
			 </model-calendar>
			<view class='count'>
				<text>截至目前，已坚持打卡</text>
				<view class='daynumber'>
					<text class='number'>{{sumCount}}</text>
					<text class='day'>天</text>
				</view>
				<view>本月累积打卡<text class="monthSum">{{signData.length}}</text>天</view>
				<text>请再接再厉，继续努力!</text>
			</view>
		</cmd-page-body>
	</view>
</template>

<script>
	import modelCalendar from '@/components/Calendar.vue';
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				toYear: parseInt(new Date().getFullYear()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				sumCount: 0,
				signData: [],
			};
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		components: {
			modelCalendar,
			cmdNavBar,
			cmdPageBody,
			cmdTransition,
			cmdCelItem,
			cmdAvatar
		},
		onLoad: function (option) {
			this.mine = this.userInfo.user;
			this.getSignIn()
		},
		onShow() {
			
		},
		created() {
			//获取当前用户当前任务的签到状态  			
			//this.getData(this.toYear+"-"+this.toMonth);
		},
		methods: {
			clickRegister(day) {
				//console.log("在模版页签到了", day);
				this.$apiconfig.signIn_f({data:{userId:this.mine.id,userName:this.mine.userName}}).then(res=>{
					if(res.data.data.rows){
						this.signData.push(day)
						this.sumCount++
					}
				});				
				// this.getSignIn()
			},
			//当模板的时候可以直接引入，然后触发子组件事件到父界面去控制数据
			// //获取当前用户该任务的签到数组
			// getData(val) {
			// 	let y=val.split('-')[0];
			// 	let m=val.split('-')[1];
			// 	this.sumCount = 88; //res.SumCount		
			// 	if (y == this.toYear && m == this.toMonth) {
			// 		let num=["02","03","06","08","12","15"],newSign=[],today=new Date().getDate();
			// 		for(let i = 0; i < 6; i++){
			// 			if(parseInt(num[i]) > today){
			// 				break;
			// 			}
			// 			newSign.push(y+"-"+m+"-"+num[i])
			// 		}
			// 		this.signData = newSign;
			// 	} else {
			// 	 	this.signData = [];
			// 	}
			// },
			getSignIn(){
				this.$apiconfig.getSignIn_f({data:{userId:this.mine.id,userName:this.mine.userName}}).then(res=>{
					this.signData = res.data.data.rows.list
					this.sumCount = res.data.data.rows.listSize
				});
			}
		}
	}
</script>

<style lang='scss'>
	.count .daynumber {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.count .daynumber .day {
		margin-top: 50rpx;
	}

	.count {
		margin: 20rpx;
		padding: 30rpx;
		display: flex;
		text-align: center;
		border-radius: 10px;
		flex-direction: column;
		justify-content: center;
		background-color: #fff;
		align-items: center;
	}

	.count .number {
		color: #fff;
		font-size: 60rpx;
		background-color: #ff595c;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 20rpx;
	}

	.monthSum {
		color: red;
		font-size: 40rpx;
	}

	.count text {
		margin: 10rpx;
	}
</style>
