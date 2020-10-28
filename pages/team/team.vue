<template>
	<view>
		<cmd-nav-bar title="团队管理" backgroundColor="#ff595c" fontColor="#fff" back="true"></cmd-nav-bar> 
		<cmd-page-body type="top">
			<view>
				<cmd-cel-item title="团队总览" @click="showTeams" arrow></cmd-cel-item>
				<cmd-cel-item title="佣金明细" @click="teamCommission" arrow></cmd-cel-item>
				<cmd-cel-item title="下级详情" @click="showSubTeam" arrow></cmd-cel-item>	
			</view>
		</cmd-page-body>
	</view>
</template>
<script>
	 import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	 import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	 import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	export default {
		name:'team',
		components: {
		  cmdNavBar,
		  cmdPageBody,
           cmdCelItem
		},
		data() {
			return {				
			};
		},
		onLoad() {
		},
		methods:{
			showTeams(){
				uni.navigateTo({
					url:"team_s"
				})
			},
			showSubTeam(){
				uni.navigateTo({
					url:"team_sub"
				})
			},
			teamCommission(){
				uni.navigateTo({
					url:"team_commission"
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
