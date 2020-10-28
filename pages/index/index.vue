<template>
	<view>
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<!-- 头部 -->
			<cmd-nav-bar title="全民娱乐" backgroundColor="#ff595c" fontColor="#fff"></cmd-nav-bar>  
			<!-- 轮播图 -->
			 <cmd-page-body type="top">
				<view class="uni-margin-wrap padding-sm">
					<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item>
							<view class="swiper-item bg-red">
								<image src="/static/img/card/01.jpg"></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item bg-red">
								<image src="/static/img/card/02.jpg"></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item bg-red">
								<image src="/static/img/card/03.jpg"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<!-- 分类菜单 -->
				<view class="category-list">
					<view class="category" @click="createRoom">
						<view class="img"><image src="/static/img/tab/tab0.png"></image></view>
						<view class="text">创建房间</view>
					</view>
					<view class="category" @click="showJoinRoom">
						<view class="img"><image src="/static/img/tab/tab1.png"></image></view>
						<view class="text">加入房间</view>
					</view>
					<view class="category" @click="handlerLuck">
						<view class="img"><image src="/static/img/tab/tab2.png"></image></view>
						<view class="text">幸运转盘</view>
					</view>
					<view class="category" @click="handlerAttend">
						<view class="img"><image src="/static/img/tab/tab3.png"></image></view>
						<view class="text">每日签到</view>
					</view>
					<view class="category">
						<view class="img"><image src="/static/img/tab/tab4.png"></image></view>
						<view class="text">在线客服</view>
					</view>
				</view>
				<!-- 房间数据 -->
				<view class="room-list">
					<view class="room" v-for="(row,index) in roomList" :key="index">
						<!-- <view class="txt" @tap="handlerGameRules">
							<cmd-icon type="QA" size="30" color="#fff"></cmd-icon>
						</view> -->
						<view class="img" @tap="tochat(row)">
							<image :src="getRoomImg(row)"></image> 
						</view>
					</view>
					<view class="room">
						<view class="img" @tap="tochat(row)">
							<image src="/static/img/card/11.jpg"></image> 
						</view>
					</view>
					<view class="room">
						<view class="img" @tap="tochat(row)">
							<image src="/static/img/card/12.jpg"></image> 
						</view>
					</view>
					<view class="room">
						<view class="img" @tap="tochat(row)">
							<image src="/static/img/card/21.jpg"></image> 
						</view>
					</view>
					<view class="room">
						<view class="img" @tap="tochat(row)">
							<image src="/static/img/card/22.jpg"></image> 
						</view>
					</view>
				</view>
				
				<view class="cu-modal" :class="subModalName=='createRoom'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">创建房间</view>
							<view class="action" @tap="hideSubModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="cu-form-group margin-top">
							<view class="title">房间类型</view>
							<picker v-if="roomTypeList.length" @change="PickerChange" :range-key="'name'" :value="roomTypeIndex" :range="roomTypeList">
								<view class="picker" @click="hideSubModal">
									{{roomTypeIndex > -1? roomTypeList[roomTypeIndex].name : '请选择'}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group margin-top">
							<view class="title">场次</view>
							<picker v-if="roomSubTypeList.length" @change="PickerChangeSub" :range-key="'name'" :value="roomSubTypeIndex" :range="roomSubTypeList">
								<view class="picker" @click="hideSubModal">
									{{roomSubTypeIndex > -1? roomSubTypeList[roomSubTypeIndex].name : '请选择'}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group margin-top block">
							<view class="content">
								<view class="amount">
									<view class="num">
										<view class="text">
											房间密码
										</view>
										<view class="input">
											<input type="text" v-model="addRoom.passWord" />
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn line-red text-red" @tap="hideSubModal">取消</button>
								<button class="cu-btn bg-red margin-left" @tap="toCreateRoom">确定</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="subModalName=='joinRoom'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">加入房间</view>
							<view class="action" @tap="hideSubModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="cu-form-group margin-top block">
							<view class="content">
								<view class="amount">
									<view class="num">
										<view class="text">
											房间密码
										</view>
										<view class="input">
											<input type="text" v-model="joinRoom.passWord" />
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn line-red text-red" @tap="hideSubModal">取消</button>
								<button class="cu-btn bg-red margin-left" @tap="toJoinRoom">确定</button>
							</view>
						</view>
					</view>
				</view>
			</cmd-page-body>
			</scroll-view>
	</view>
</template>

<script>
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
	import {
	    mapState 
	} from 'vuex'; 
	export default {
		name:'index',
		components: {
		  cmdNavBar,
		  cmdPageBody,
		  cmdTransition,
		  cmdCelItem,
		  cmdAvatar,
		  cmdIcon
		},
		data() {
			return {
				modalName: null,
				roomList: [],
				roomTypeList:[],
				roomSubTypeList:[],
				subModalName:'',
				addRoom:{
					userId:'',
					userName:'',
					passWord:'',
					room:{
						roomType: 1,
						roomSubType: 1,
						roomAllowPeopleNum: 10,
					},
				},
				joinRoom:{
					userId:'',
					passWord:'',
				},
				roomTypeIndex: 0,
				roomSubTypeIndex: 0,
				mine:'',
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo','getMsg'])
		},
		watch:{
		  getMsg:function(val){
		   }
		},
		onLoad() {
			this.mine = this.userInfo.user
			this.getIndexBanner()
			this.getIndexRoom()
			this.getRoomType()
		},
		methods: {
			handlerAttend() {
				uni.navigateTo({
					url:"/pages/ImportCalendar/ImportCalendar"
				})
			},
			handlerLuck() {
				uni.navigateTo({
					url:"/pages/luck/luck"
				})
			},
			handlerGameRules() {
				uni.showToast({
					icon:'none',
					title:'测试'
				})
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			getIndexBanner(){
				this.$apiconfig.getIndexBanner_f({}).then(res=>{
					this.swiperList = res.data.data.rows
				});
			},
			getIndexRoom(){
				this.$apiconfig.getIndexRoom_f({}).then(res=>{
					this.roomList = res.data.data.rows
				});
			},
			getRoomType(){
				this.$apiconfig.getIndexRoomType_f({}).then(res=>{
					this.roomTypeList = res.data.data.rows.typeList
					this.roomSubTypeList = res.data.data.rows.subTypeList
				});
			},
			getRoomImg(val){
				var roomName = "/static/img/card/";
				for(var i = 0; i < this.roomTypeList.length; i++){
					if(val.roomType == this.roomTypeList[i].state){
						roomName += this.roomTypeList[i].state
					}
				}
				for(i = 0; i < this.roomSubTypeList.length; i++){
					if(val.roomSubType == this.roomSubTypeList[i].state){
						roomName += this.roomSubTypeList[i].state
					}
				}
				return roomName + ".jpg"
			},
			createRoom(){
				this.subModalName = "createRoom"
			},
			hideSubModal(){
				this.subModalName = ''
				this.roomTypeIndex = 0
				this.roomSubTypeIndex = 0
				this.addRoom.room.roomType = 1
				this.addRoom.room.roomSubType = 1
				this.addRoom.passWord = ''
				this.joinRoom.passWord = ''
			},
			PickerChange(e) {
				this.roomTypeIndex = e.detail.value
				this.addRoom.room.roomType = this.roomTypeList[this.roomTypeIndex].state
				this.subModalName = "createRoom"
			},
			PickerChangeSub(e) {
				this.roomSubTypeIndex = e.detail.value
				this.addRoom.room.roomSubType = this.roomSubTypeList[this.roomSubTypeIndex].state
				this.subModalName = "createRoom"
			},
			toCreateRoom(){
				this.addRoom.userId = this.mine.id
				this.addRoom.userName = this.mine.userName
				this.$apiconfig.createRoom_f({data:this.addRoom}).then(res=>{
					this.hideSubModal()
					if(0 != res.data.data.rows){
						// 跳转到房间
						uni.showToast({
							icon:"none",
							title:"创建成功房间",
						})
						uni.navigateTo({
							url:"../chat/chat?roomTypeName="+this.roomTypeList[this.addRoom.room.roomType - 1].name+"&roomType="+this.addRoom.room.roomType+"&roomSubType="+this.addRoom.room.roomSubType + "&roomId=" + res.data.data.rows
						})
					}
					this.addRoom=''
				});
			},
			tochat(row){
				uni.navigateTo({
					url:"/pages/chat/chat?roomTypeName="+this.roomTypeList[row.roomType-1].name+"&room=" + encodeURIComponent(JSON.stringify(row))
				})
			},
			showJoinRoom(){
				this.subModalName = "joinRoom"
			},
			toJoinRoom(){
				this.joinRoom.userId = this.mine.id
				this.joinRoom.userName = this.mine.userName
				this.$apiconfig.joinRoom_f({data:this.joinRoom}).then(res=>{
					this.hideSubModal()
					// if(!res.data.success){
					// 	uni.showToast({
					// 		icon:"none",
					// 		title:res.data.errorHint,
					// 	})
					// }
					if(res.data.data.rows){
						// 跳转到房间
						uni.navigateTo({
							// url:"/pages/chat/chat?chatto=1&roomTypeName=" + this.roomTypeList[res.data.data.rows.roomType - 1].name + "&roomType="+res.data.data.rows.roomType+"&roomSubType="+res.data.data.rows.roomSubType + "&roomId=" + res.data.data.rows.id
							url:"/pages/chat/chat?roomTypeName="+this.roomTypeList[res.data.data.rows.roomType - 1].name+"&room=" + encodeURIComponent(JSON.stringify(res.data.data.rows))
						})
						this.joinRoom.passWord = ''
						this.joinRoom.userId = ''
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.uni-margin-wrap {
		width:750rpx;
		margin-left: auto;
		margin-right: auto;
	}
	.swiper {
		height: 300rpx;
	}
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
	
	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}
	
	.uni-common-mt{
		margin-top:60rpx;
		position:relative;
	}
	
	.info {
		position: absolute;
		right:20rpx;
	}
	
	.uni-padding-wrap {
	    width:550rpx;
	    padding:0 100rpx;
	}
	.room-list {
		padding-left: 30upx;
		padding-right: 30upx;
		margin-top: -50upx;
		.room {
			margin-top: 30upx;
			.txt {
				position: relative;
				top: 80upx;
				right: 10upx;
				float: right;
				z-index: 10;
			}
			.img {
				height: 250rpx;
				image {
					box-shadow: 1upx 1upx 1upx 1upx #a3a3a3;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.category-list {
		width: 92%;
		margin: 0 4%;
		padding: 0 0 30upx 0;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.category {
			width: 15%;
			margin-top: 20upx;
			display: flex;
			flex-wrap: wrap;
			.img {
				width: 100%;
				display: flex;
				justify-content: center;
				image {
					width: 14vw;
					height: 14vw;
				}
			}
			.text {
				margin-top: 16upx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24upx;
				color: #3c3c3c;
			}
		}
	}
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}
	
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	
	.block{
		width: 94%;
		padding: 20upx 3%;
		.title{
			width: 100%;
			font-size: 34upx;
		}
		.content{
			.my{
				width: 100%;
				height: 120upx;
				display: flex;
				align-items: center;
				font-size: 30upx;
				border-bottom: solid 1upx #eee;
			}
			.amount{
				width: 100%;
				
				.list{
					display: flex;
					justify-content: space-between;
					padding: 20upx 0;
					.box{
						width: 30%;
						height: 120upx;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 10upx;
						box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.05);
						font-size: 36upx;
						background-color: #f1f1f1;
						color: 333;
						&.on{
							background-color: #f06c7a;
							color: #fff;
						}
					}
				}
				.num{
					margin-top: 10upx;
					display: -webkit-inline-box;
					justify-content: flex-end;
					align-items: center;
					.text{
						padding-right: 10upx;
						font-size: 30upx;
					}
					.input{
						width: 28.2vw;
						border-bottom: solid 2upx #999;
						justify-content: flex-end;
						align-items: center;
						input{
							margin: 0 20upx;
							height: 60upx;
							font-size: 30upx;
							// color: #f06c7a;
							justify-content: flex-end;
							align-items: center;
						}
					}
				}
			}
		}
	}
</style>
