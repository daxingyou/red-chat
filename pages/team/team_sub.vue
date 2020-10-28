<template>
	<view>
		<cmd-nav-bar title="下级详情" backgroundColor="#ff595c" fontColor="#fff" back="true"></cmd-nav-bar> 
		<cmd-page-body type="top">
			<view class="bg-white">
				<cmd-cell-item title="1级玩家" slot-left :addon="teamPojo.hierarchy1?teamPojo.hierarchy1:0">
				</cmd-cell-item>
				<cmd-cell-item title="2级玩家" slot-left :addon="teamPojo.hierarchy2?teamPojo.hierarchy2:0">
				</cmd-cell-item>
				<cmd-cell-item title="3级玩家" slot-left :addon="teamPojo.hierarchy3?teamPojo.hierarchy3:0">
				</cmd-cell-item>
				<cmd-cell-item title="4级玩家" slot-left :addon="teamPojo.hierarchy4?teamPojo.hierarchy4:0">
				</cmd-cell-item>
				<cmd-cell-item title="5级玩家" slot-left :addon="teamPojo.hierarchy5?teamPojo.hierarchy5:0">
				</cmd-cell-item>
			</view>
		</cmd-page-body>
	</view>
</template>

<script>
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import cmdCellItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
	import {
		mapState 
	} from 'vuex';
	export default {
		name:'team_sub',
		components: {
			cmdNavBar,
			cmdPageBody,
			cmdTransition,
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
				searchInfo:{
					id:'',
					userName:'',
				},
				teamPojo:'',
			};
		},
		onLoad() {
			this.getTeamGrade()
		},
		methods: {
			getTeamGrade(){
				this.searchInfo.id = this.mine.id
				this.searchInfo.userName = this.mine.userName
				this.$apiconfig.getTeamGrade_f({data:this.searchInfo}).then(res=>{
					this.teamPojo = res.data.data.rows
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
