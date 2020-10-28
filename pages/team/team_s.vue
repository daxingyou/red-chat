<template>
	<view>
		<cmd-nav-bar title="团队总览" backgroundColor="#ff595c" fontColor="#fff" back="true"></cmd-nav-bar> 
		<cmd-page-body type="top">
			<view>
				<cmd-cell-item title="团队人数" :addon="teamPojo.teamSum"></cmd-cell-item>
				<cmd-cell-item title="直属人数" :addon="teamPojo.directlyUnderSum"></cmd-cell-item>
				<cmd-cell-item title="团队总充值" :addon="teamPojo.rechargeMoney"></cmd-cell-item>
				<cmd-cell-item title="团队总提现" :addon="teamPojo.deductMoney"></cmd-cell-item>
				<cmd-cell-item title="团队总余额" :addon="teamPojo.availableMoney"></cmd-cell-item>
				<cmd-cell-item title="收益总金额" :addon="teamPojo.profitMoney"></cmd-cell-item>
				<cmd-cell-item title="今日收益" :addon="teamPojo.todayProfitMoney"></cmd-cell-item>
			</view>
		 </cmd-page-body>
	</view>
</template>

<script>
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue";
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue";
	import cmdCellItem from "@/components/cmd-cell-item/cmd-cell-item.vue";
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue";
	import {
		mapState 
	} from 'vuex'; 
	export default {
		name:'team_s',
		components: {
			cmdNavBar,
			cmdPageBody,
			cmdCellItem,
			cmdAvatar
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onShow() {
			this.mine = this.userInfo.user;
		},
		data() {
			return {
				mine:'',
				teamList:'',
				searchInfo:{
					id:'',
					userName:'',
				},
				teamPojo:'',
			};
		},
		created() {
			this.getTeamInfo()
		},
		methods: {
			getTeamInfo(){
				this.searchInfo.id = this.mine.id
				this.searchInfo.userName = this.mine.userName
				this.$apiconfig.getTeamInfo_f({data:this.searchInfo}).then(res=>{
					this.teamPojo = res.data.data.rows
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
