<template>
	<view>
		<cmd-nav-bar title="红包详情" backgroundColor="#ff595c" fontColor="#fff" :back="true"></cmd-nav-bar>
		 <cmd-page-body type="top">
		<view class="person-list">
			<view class="cu-list menu-avatar" v-for="(item,index) in runningWaterList" :key="index">
				<view class="cu-item">
					<view class="content" style="left: 20px;">
						<view class="text-grey">订单编号：{{item.num}}</view>
						<view class="cu-tag round bg-orange sm" v-if="item.subType">{{getSubTypeName(item.subType)}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								<text v-if="1 != item.status" class="cuIcon-infofill text-red  margin-right-xs"></text>
								订单时间：{{item.updateTime}} 
							</view> 
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{getStatusName(item.status)}}</view>
						<view class="cu-tag round bg-grey sm">￥{{item.money}}</view>
					</view>
				</view>
			</view>
			<text class="loading-text">
				{{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}
			</text>
		</view>
		 </cmd-page-body>
	</view>
</template>

<script>
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
	import {
		mapState 
	} from 'vuex'; 
	var _self,
	page = 1;
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
				mine:'',
				searchInfo:{
					roomId:'',
					userId:'',
					subType: 2,
					pageNum: 1,
					pageSize: 10,
				},
				runningWaterList:'',
				pagesCount: 0,
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		onLoad: function (option) {
			//option为object类型，会序列化上个页面传递的参数 
			this.searchInfo.roomId = option.roomId
			_self = this;
			this.mine = this.userInfo.user;
			this.getRunningWaterList();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getRunningWaterList();
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onShow() {
			//this.mine = this.userInfo.user;
		},
		onReachBottom: function() {
			if(this.runningWaterList.length == this.pagesCount) {//loadingType!=0;直接返回
				return false;
			}
			_self.loadingType = 1;
			uni.showNavigationBarLoading();//显示加载动画
			// 分页参数赋值
			this.searchInfo.pageNum = page
			this.$apiconfig.getRunningWaterList_f({data:this.searchInfo}).then(res=>{
				if(res.data.data.rows){
					if (_self.runningWaterList.length == res.data.data.rows.listSize) {//没有数据
						_self.loadingType = 2;
						uni.hideNavigationBarLoading();//关闭加载动画
						return false;
					}
					page++;//每触底一次 page +1
					for(var i = 0; i < res.data.data.rows.list.length; i++){
						_self.runningWaterList = _self.runningWaterList.concat(res.data.data.rows.list[i]);//将数据拼接在一起
					}
					_self.loadingType = 0;//将loadingType归0重置
					uni.hideNavigationBarLoading();//关闭加载动画
				}
			});
		},
		created() {
			// this.getRunningWaterList()
		},
		methods: {
			getRunningWaterList(){
				uni.showNavigationBarLoading();
				this.searchInfo.userId = this.mine.id
				this.$apiconfig.getRunningWaterList_f({data:this.searchInfo}).then(res=>{
					if(res.data.data.rows){
						this.runningWaterList = res.data.data.rows.list
						this.pagesCount = res.data.data.rows.listSize
						if(this.runningWaterList.length == this.pagesCount){
							uni.showToast({
								title: '已是最新',
								duration: 2000
							});
						}
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();//得到数据后停止下拉刷新
						
					}
					//this.searchInfo = ''
				});
			},
			getSubTypeName(val){
				if(1 == val){
					return "收入"
				}
				return "支出"
			},
			getStatusName(val){
				if(1 == val){
					return "成功"
				}
				return "失败"
			}
		}
	}
</script>

<style>
.loading-text{
	height: 80upx;
	line-height: 80upx;
	font-size: 30upx;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
</style>
