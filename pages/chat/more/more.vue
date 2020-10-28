<template>
	<view>
		<cmd-nav-bar title="房间信息" backgroundColor="#ff595c" fontColor="#fff" :back="true"></cmd-nav-bar>
		<cmd-page-body type="top">
			<view>
				<cmd-cel-item title="房间名称" :addon="getRoomImg(roomInfo.roomType)"></cmd-cel-item>
				<cmd-cel-item title="房间介绍" :addon="roomInfo.roomInfo"></cmd-cel-item>
				<cmd-cel-item title="房间流水" :addon="roomInfo.moneyLimit"></cmd-cel-item>
				<cmd-cel-item title="房间成员" arrow @click="handerToMember"></cmd-cel-item>
				<cmd-cel-item title="红包记录" arrow @click="toRedPacketDetails"></cmd-cel-item>
				<cmd-cel-item title="游戏规则" arrow @click="openInfo"></cmd-cel-item>
				<!-- 游戏规则弹窗 -->
				<view class="cu-modal" :class="windowsState">
					<view class="cu-dialog">
						<view class="cu-form-group margin-top block">
							<view class="content">
								<view class="amount">
									<view class="num">
										<view class="text">
											游戏规则
										</view>
										<view class="input">
											<view class="article-meta">
												<text class="article-meta-text article-author">
													{{roomInfo.gameInfo}}
												</text>
											</view>
											<!-- <view class="article-content">
												<rich-text :nodes="roomInfo.gameInfo"></rich-text>
											</view> -->
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn line-red text-red" @tap="closeInfo">退出</button>
							</view>
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
    export default {
        name:'more',
        components: {
            cmdNavBar,
            cmdPageBody,
            cmdCelItem
        },
        data() {
            return {
                roomId:'',
				roomInfo:{
					name:'',
					inf:'',
					moneyLimit:''
				},
				windowsState:'hide',
				roomTypeList:'',
				roomSubTypeList:'',
            };
        },
        methods:{
			discard(){
				return;
			},
			// 关闭红包弹窗
			closeInfo(){
				this.windowsState = 'hide';
				setTimeout(()=>{
					this.windowsState = '';
				},200)
			},
			openInfo(){
				this.windowsState = 'show';
			},
            handerToMember(){
                uni.navigateTo({
                    url:'./member?roomId='+this.roomId
                })
            },
			toRedPacketDetails(){
			    uni.navigateTo({
			        url:'../redPacketDetails/redPacketDetails?roomId='+this.roomId
			    })
			},
            getRoomInfo(){
				let req = {
					roomId:this.roomId
				}
				this.$apiconfig.getRoomInfo_f({data:req}).then(res=>{
				    // if (!res.data.success){
				    //     uni.showToast({
				    //         icon:'none',
				    //         title:res.data.errorHint
				    //     })
				    //     return
				    // }
				    this.roomInfo = res.data.data
				});
            },
			getRoomType(){
				this.$apiconfig.getIndexRoomType_f({}).then(res=>{
					this.roomTypeList = res.data.data.rows.typeList
					this.roomSubTypeList = res.data.data.rows.subTypeList
				});
			},
			getRoomImg(val){
				var roomName;
				for(var i = 0; i < this.roomTypeList.length; i++){
					if(val == this.roomTypeList[i].state){
						roomName = this.roomTypeList[i].name
					}
				}
				return roomName
			},
        },
        onLoad(option) {
            this.roomId= option.roomId
			this.getRoomInfo()
			this.getRoomType()
        }
    }
</script>

<style lang="scss">
	.title-area {
		position: absolute;
		left: 30upx;
		right: 30upx;
		bottom: 30upx;
		z-index: 11;
	}
	
	.title-text {
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		lines: 2;
		color: #ffffff;
		overflow: hidden;
	}
	
	.article-meta {
		padding: 20upx 30upx;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	
	.article-meta-text {
		color: gray;
	}
	
	.article-text {
		font-size: 26upx;
		line-height: 50upx;
		margin: 0 20upx;
	}
	
	.article-author {
		font-size: 30upx;
	}
	
	.article-time {
		font-size: 30upx;
	}
	
	.article-content {
		font-size: 30upx;
		padding: 0 30upx;
		margin-bottom: 30upx;
		overflow: hidden;
	}
</style>
