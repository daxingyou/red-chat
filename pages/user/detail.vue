<template>
	<view>
		<cmd-nav-bar title="个人明细" backgroundColor="#ff595c" fontColor="#fff" :back="true"></cmd-nav-bar>
		 <cmd-page-body type="top">
			<view>
				<view class="padding-sm">
					<view class="bg-grey2 padding radius text-center shadow-blur">
						<view class="text-lg">我的余额</view>
						<view class="margin-top-sm text-Abc">{{mine.availableMoney}}</view>
					</view>
				</view>
				<view>
					<cmd-cell-item title="充值记录" slot-left arrow @click="showDetail(1, 1, '充值')">
					</cmd-cell-item>
					<cmd-cell-item title="提现记录" slot-left arrow @click="showDetail(2, 1, '提现')">
					</cmd-cell-item>
					<cmd-cell-item title="转账记录" slot-left arrow @click="showDetail(3, 1, '转账')">
					</cmd-cell-item>
					<cmd-cell-item title="红包记录" slot-left arrow @click="showDetail(1, 2, '红包')">
					</cmd-cell-item>
					<cmd-cell-item title="斗牛记录" slot-left arrow @click="showDetail(2, 2, '斗牛')">
					</cmd-cell-item>
					<cmd-cell-item title="豹子记录" slot-left arrow @click="showDetail(3, 2, '豹子')">
					</cmd-cell-item>
					<!-- <cmd-cell-item title="禁抢记录" slot-left arrow @click="showDetail(4, 2, '禁抢')">
					</cmd-cell-item> -->
				</view>	
				<!-- <cmd-cell-item title="开放收益" slot-left arrow>
					<cmd-icon type="tuandui" size="24" color="#FF4040"></cmd-icon>
				</cmd-cell-item>
				<cmd-cell-item title="系统派奖" slot-left arrow>
					<cmd-icon type="mingxi" size="24" color="#FF4040"></cmd-icon>
				</cmd-cell-item>
				<view class="margintop"></view>
				<cmd-cell-item title="佣金明细" slot-left arrow>
					<cmd-icon type="kefu" size="24" color="#FF4040"></cmd-icon>
				</cmd-cell-item>
				<cmd-cell-item title="幸运转盘" slot-left addon="0" arrow>
					<cmd-icon type="shouji" size="24" color="#FF4040"></cmd-icon>
				</cmd-cell-item> -->
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
		name:'detail',
		components: {
			cmdNavBar,
			cmdPageBody,
			cmdTransition,
			cmdCellItem,
			cmdAvatar
		},
		data() {
			return {
				mine:''
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onShow() {
			this.mine = this.userInfo.user;
		},
		methods: {
			showDetail(typeId, subTypeId, typeName){
				uni.navigateTo({
					url:"sub_detail?typeId=" + typeId + "&subTypeId=" + subTypeId + "&typeName=" + typeName
				})
			}
		}
	}
</script>

<style>

</style>
