<template>
	<view>
		<cmd-nav-bar :title="room.roomTypeName" backgroundColor="#ff595c" fontColor="#fff" icon-one="back" @iconOne="handleBack" icon-two="checkmore" @iconTwo="handleMore"></cmd-nav-bar>
		<view class="content" @touchstart="hideDrawer">
			<!-- 只有豹子才会出现上庄操作 -->
			<view v-if="room.roomType == 3" style="margin-top: 112upx">
				<view v-if="room.roomType == 3" class="padding-sm">
					<view class="bg-grey2 padding radius text-center shadow-blur" style="z-index:99999">
						<view class="text-lg">当前庄家</view>
						<view class="margin-top-sm text-abc">{{room.nickName?room.nickName:'无'}}</view>
						<button class="btn-up" v-if="room.userId && room.userId !=mine.id" disabled>已有庄家</button>
						<button class="btn-up" @tap="onTheVillage" v-else>{{room.userId==mine.id?'下庄':'上庄'}}</button>
					</view>
				</view>
			</view>
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50">
				<!-- 加载历史数据waitingUI -->
				<view class="loading" style="opacity: 0;">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view>
				<view class="row" v-for="(row,index) in msgList" :key="index" :id="'msg'+row.msg.id">
					<!-- 系统消息 -->
					<block v-if="row.type=='system'" >
						<view class="system">
							<!-- 文字消息 -->
							<view v-if="row.msg.type=='text'" class="text">
								{{row.msg.content.text}}
							</view>
							<!-- 领取红包消息 -->
							<view v-if="row.msg.type=='redEnvelope'" class="red-envelope">
								<image src="/static/img/hongbao@2x.png"></image>
								{{row.msg.content.text}}
							</view>
						</view>
					</block>
					<!-- 用户消息 -->
					<block v-if="row.type=='user'">
						<!-- 自己发出的消息 -->
						<view class="my" v-if="row.msg.userinfo.uid==mine.id">
							<!-- 左-消息 -->
							<view class="left">
								<!-- 红包 -->
								<view v-if="row.msg.type=='redEnvelope'" class="bubble red-envelope" @tap="openRedEnvelope(row.msg,index)">
									<image src="/static/img/red-envelope.png" v-if="!row.msg.content.isRobed"></image>
									<image src="/static/img/hongbao@2x.png" v-else></image>
									<view class="tis">
										<!-- 点击开红包 -->
									</view>
									<view class="blessing">
										{{row.msg.content.blessing}}
									</view>
								</view>
							</view>
							<!-- 右-头像 -->
							<view class="right">
								<image :src="row.msg.userinfo.face"></image>
							</view>
						</view>
						<!-- 别人发出的消息 -->
						<view class="other" v-if="row.msg.userinfo.uid!=mine.id">
							<!-- 左-头像 -->
							<view class="left">
								<image :src="row.msg.userinfo.face"></image>
							</view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<view class="username">
									<view class="name">{{row.msg.userinfo.nickName}}</view> <view class="time">{{row.msg.time}}</view>
								</view>
								<!-- 红包 -->
								<view v-if="row.msg.type=='redEnvelope'" class="bubble red-envelope" @tap="openRedEnvelope(row.msg,index)">
									<image src="/static/img/red-envelope.png" v-if="!row.msg.content.isRobed"></image>
									<image src="/static/img/hongbao@2x.png" v-else></image>
									<view class="tis">
										<!-- 点击开红包 -->
									</view>
									<view class="blessing">
										{{row.msg.content.blessing}}
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<emotion @addEmoji="addEmoji" :class="{hidden:hideEmoji}" ></emotion>
			<!-- 更多功能 相册-拍照-红包 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="handRedEnvelopes">
						<view class="icon hongbao"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'hongbao'" @tap="switchVoice"></view>
			</view>
			<view class="textbox">
				<view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']" @tap="handRedEnvelopes">{{voiceTis}}</view>
				<view class="text-mode"  :class="isVoice?'hidden':''">
					<view class="box">
						<textarea disabled auto-height="true" v-model="textMsg" @focus="textareaFocus"/>
					</view>
					<view class="em">
						<view class="icon biaoqing"></view>
					</view>
				</view>
			</view>
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<view class="send" :class="isVoice?'hidden':''" disabled>
				<view class="btn">发送</view>
			</view>
		</view>
		<!-- 上庄 -->
		<view class="cu-modal" :class="subModalName=='onTheVillageModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-form-group margin-top block">
					<view class="content">
						<view class="amount">
							<view class="num">
								<view class="text">
									上庄押金
								</view>
								<view class="input">
									<input type="text" v-model="onTheVillageInfo.onTheVillageMoney"/>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-red text-red" @tap="hideSubModal">取消</button>
						<button class="cu-btn bg-red margin-left" @tap="toOnTheVillage">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 发红包 -->
		<view class="cu-modal" :class="modalEnv">
			<view class="cu-dialog">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text> 红包
					</view>
					<view class="action">
						<text class="cuIcon-close" @click="modalEnv=''"></text>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">个数</view>
					<input placeholder="0" v-model="sendRedEnvelopeData.number" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">金额</view>
					<input placeholder="0.00" v-model="sendRedEnvelopeData.money" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">描述</view>
					<input placeholder="恭喜发财" v-model="sendRedEnvelopeData.blessing" name="input"></input>
				</view>
				<view class="cu-bar bg-white margin-top">
					<view class="action">
						雷点
					</view>
					<view class="action">
					</view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-6 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in 10" :key="index">
							<button class="cu-btn round" :class="item==selectDot?'bg-red':''" @click="selectDotFunc(item)">{{item}}</button>
						</view>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title"></view>
					<button class="bg-red cu-btn shadow round" @click="hand">发送</button>
				</view>
			</view>
		</view>
		<!-- 押金 -->
		<view class="cu-modal" :class="subModalName=='cashPledgeModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-form-group margin-top block">
					<view class="content">
						<view class="amount">
							<view class="num">
								<view class="text">
									押金
								</view>
								<view class="input">
									<input type="text" v-model="cashPledge"/>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-red text-red" @tap="hideSubModal">取消</button>
						<button class="cu-btn bg-red margin-left" @tap="toOpenRedEnvelope">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 红包弹窗 -->
		<view class="windows" :class="windowsState">
			<view class="mask" @touchmove.stop.prevent="discard" @tap="closeRedEnvelope"></view>
			<view class="layer" @touchmove.stop.prevent="discard" style="z-index: 99999999;">
				<view class="open-redenvelope">
					<view class="top">
						<view class="close-btn">
							<view class="icon close" @tap="closeRedEnvelope"></view>
						</view>
						<image :src="redenvelopeData.face"></image>
					</view>
					<view class="from">来自{{redenvelopeData.nickName}}</view>
					<view class="blessing">{{redenvelopeData.blessing}}</view>
					<view class="money">{{redenvelopeData.money}}</view>
					<view class="showDetails" @tap="toDetails(redenvelopeData)">
						查看领取详情 <view class="icon to"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import emotion from '@/components/emotion/index.vue'
	import emojiData from "../../static/emoji/emojiData.js"
	import { mapState } from 'vuex'
	export default {
		name:'Chat',
		components: {
			emotion,
			cmdNavBar
		},
		data() {
			return {
				modalEnv:'',
				textMsg:'',
				isHistoryLoading:false,
				scrollAnimation:false,
				scrollTop:0,
				scrollToView:'',
				msgList:[],//信息列表
				msgImgList:[],
				willStop:false,
				isVoice:true,
				voiceTis:'发红包',
				recordTis:"手指上滑 取消发送",
				recording:false,
				initPoint:{identifier:0,Y:0},
				recordTimer:null,
				recordLength:0,
				// 抽屉参数
				popupLayerClass:'',
				// more参数
				hideMore:true,
				//表情定义
				hideEmoji:true,
				emojiList:[{}],
				emojiPath:'',
				windowsState:'',
				index: 0,
				indexDot: 0,
				selectDot:0,
				sendRedEnvelopeData:{
					number:6,
					money:10,
					blessing:'恭喜发财',
					dot:1,
				},
				redenvelopeData:{
					rid:-1,	//红包ID
					from:'',
					face:'',
					blessing:'',
					money:0,
					userName:'',
				},
				//房间
				room:{
					roomType: '',
					roomTypeName:'',
					roomSubType: '',
					roomId:'',
					isAuth:'',
					userId:'',
					userName:'',
					nickName:'',
					onTheVillageMoney:'',
				},
				//个人信息
				mine:{
					id:0,
					userName:'',
					face:'',
					nickName:'',
				},
				subModalName:'',
				redPacketMsg:'',
				redPacketIndex:-1,
				cashPledge:'',
				ifOnShow:false,
				onTheVillageInfo:{
					type:'',
					roomId:'',
					userId:'',
					userName:'',
					onTheVillageMoney:'',
				},
				pageNum:1,
				pageSize:10,
				listSize:0,
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo','getMsg']),
		},
		// 监听事件
		watch:{
			getMsg:function(val){
				if (val.msg.roomId==this.room.roomId){
					this.screenMsg(val);
				}
			},
		},
		onUnload(){
		},
		mounted() {
			this.$socket.open()
		},
		destroyed() {
			this.$socket.close()
		},
		onLoad(option) {
			const strToObj = JSON.parse(option.room)
			this.mine = this.userInfo.user
			this.emojiList = emojiData.imgArr[1].emojiList;
			this.room.roomTypeName = option.roomTypeName
			this.room.roomType = strToObj.roomType
			this.room.roomSubType = strToObj.roomSubType
			this.room.roomId = strToObj.id
			this.room.isAuth = strToObj.isAuth
			this.myuid = this.mine.id
			/* this.getMsgList()
			if(3 == this.room.roomType){
				this.getOnTheVillage()	
			} */
		},
		onHide(){
		},
		onShow(){
			this.scrollTop = 9999999;
		},
		methods:{
			selectDotFunc(index){
				this.selectDot=index
			},
			hand(){
				if((!this.sendRedEnvelopeData.money)||this.sendRedEnvelopeData.money<=0){
					return uni.showToast({title:"金额不能为空",icon:'none'});
				}
				if(this.sendRedEnvelopeData.number!=Math.abs(parseInt(this.sendRedEnvelopeData.number))){
					return uni.showToast({title:"数量填写大于0的整数",icon:'none'});
				}
				this.sendRedEnvelopeData.blessing = 1 == this.room.roomType? this.room.roomTypeName + ' 雷点 ' + this.sendRedEnvelopeData.dot: this.room.roomTypeName
				uni.showLoading({title:'提交中'});
				let req = {
					msgType:0,
					userId: this.mine.id,
					roomId:this.room.roomId,
					roomType:this.room.roomType,
					roomSubType:this.room.roomSubType,
					money:this.sendRedEnvelopeData.money,
					number:this.sendRedEnvelopeData.number,
					description:this.sendRedEnvelopeData.blessing,
					dot:this.sendRedEnvelopeData.dot
				}
				this.$socket.send2room(req, res =>{
					console.log(res)
					uni.hideLoading();
				})
				//保存数据
				/* this.$apiconfig.sendMessage_f({data:req}).then(res=>{
					if(res.data.success){
						// 广播
						let nowDate = new Date();
						let msg = {type:"user",msg:{id:res.data.data.id,roomId:this.room.roomId,type:"redEnvelope",time:nowDate,userinfo:{uid:this.mine.id,username:this.mine.userName,nickname:this.mine.nickName,face:this.mine.avatar},content:{blessing:this.redEnvelopeData.blessing,rid:res.data.data.id,isReceived:false,dot:this.redEnvelopeData.dot}}}
						this.$mysocket.ws.send({
							data: JSON.stringify(msg)
						}); 
					}
					uni.hideLoading();
					uni.navigateBack();
				}) */
			},
			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus(){
				if(this.popupLayerClass=='showLayer' && this.hideMore == false){
					this.hideDrawer();
				}
			},
			// 选择表情
			chooseEmoji(){
				this.hideMore = true;
				if(this.hideEmoji){
					this.hideEmoji = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			// 切换语音/文字输入
			switchVoice(){
				this.hideDrawer();
				this.isVoice = this.isVoice?false:true;
			},
			onTheVillage(){
				this.onTheVillageInfo.roomId = this.room.roomId
				this.onTheVillageInfo.userId = this.mine.id
				this.onTheVillageInfo.userName = this.mine.userName
				if(this.room.userId==this.mine.id){
					this.toOnTheVillage()
					return
				}
				this.subModalName = 'onTheVillageModal'
			},
			toOnTheVillage(){
				this.onTheVillageInfo.type = this.room.userId==this.mine.id?'2':'1'
				this.onTheVillageInfo.roomType = this.room.roomType
				this.onTheVillageInfo.roomSubType = this.room.roomSubType
				this.$apiconfig.onTheVillage_f({data:this.onTheVillageInfo}).then(res=>{
					// if(!res.data.success){
					// 	uni.showToast({
					// 		icon: 'none',
					// 	    title: res.data.errorHint,
					// 	});
					// }
					var nowDate = new Date();
					let msg = {type:"village",msg:{roomId:this.room.roomId,villageInfoType:this.onTheVillageInfo.type,userinfo:{userId:this.onTheVillageInfo.userId,userName:this.onTheVillageInfo.userName,onTheVillageMoney:this.onTheVillageInfo.onTheVillageMoney}}}
					this.$mysocket.ws.send({
						data: JSON.stringify(msg)
					}); 
					this.onTheVillageInfo.roomId = ''
					this.onTheVillageInfo.userId = ''
					this.onTheVillageInfo.onTheVillageMoney = ''
					this.subModalName = ''
					this.room.userId = ''
					this.room.userName = ''
				});
			},
			getOnTheVillage(){
				this.$apiconfig.getOnTheVillage_f({data:this.room}).then(res=>{
					if(res.data.data.rows){
						this.room.userId = res.data.data.rows.userId
						this.room.userName = res.data.data.rows.userName
						this.room.nickName = res.data.data.rows.nickName
						this.room.onTheVillageMoney = res.data.data.rows.onTheVillageMoney
					}else{
						this.room.userId = ''
						this.room.userName = ''
						this.room.nickName = ''
						this.room.onTheVillageMoney = ''
					}
				});
			},
			handleBack(){
				let quitRoom = {
					roomId:this.room.roomId,
					userId:this.mine.id
				}
				// 退出房间
				this.$apiconfig.quitRoom_f({data:quitRoom}).then(res=>{
				});
				// 返回
				uni.navigateBack()
			},
			handleMore () {
				uni.navigateTo({
					url:'/pages/chat/more/more?roomId='	+ this.room.roomId
				})
			},
			// 接受消息(筛选处理)
			screenMsg(msg){
				//从长连接处转发给这个方法，进行筛选处理
				if(msg.type=='system'){
					// 系统消息
					switch (msg.msg.type){
						case 'text':
							this.addSystemTextMsg(msg);
							break;
						case 'redEnvelope':
							this.addSystemRedEnvelopeMsg(msg);
							break;
					}
				}else if(msg.type=='user'){
					// 用户消息
					switch (msg.msg.type){
						case 'redEnvelope':
							this.addRedEnvelopeMsg(msg);
							break;
					}
					//非自己的消息震动
					if(msg.msg.userinfo.uid!=this.mine.id){
						uni.vibrateLong();
					}
				}else if(msg.type=='village'){
					if(this.room.roomId == msg.msg.roomId){
						if(1== msg.msg.villageInfoType){
							this.room.userId = msg.msg.userinfo.userId
							this.room.userName = msg.msg.userinfo.userName
							this.room.onTheVillageMoney = msg.msg.userinfo.onTheVillageMoney
						}else{
							this.room.userId = ''
							this.room.userName = ''
							this.room.onTheVillageMoney = ''
						}
					}
				}
				if(msg.type !='village'){
					this.$nextTick(function() {
						// 滚动到底
						this.scrollToView = 'msg'+msg.msg.id
					});
				}
			},
			
			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e){
				if(this.isHistoryLoading){
					return ;
				}
				this.pageNum++;
				if(this.pageNum > Math.ceil(this.listSize/this.pageSize)){
					return
				}
				this.isHistoryLoading = true;//参数作为进入请求标识，防止重复请求
				this.scrollAnimation = false;//关闭滑动动画
				let Viewid = this.msgList[0].msg.id;//记住第一个信息ID
				//本地模拟请求历史记录效果
				let list = [];
				this.$apiconfig.getrecentmsg_f({data:{roomId:this.room.roomId,userId:this.mine.id,pageNum:this.pageNum,pageSize:this.pageSize}}).then(res=>{
					list = res.data.data.rows;
					this.listSize = res.data.data.total
					// 获取消息中的图片,并处理显示尺寸
					if(list.length>0){
						for(let i=0;i<list.length;i++){
							if(list[i].type=='user'&&list[i].msg.type=="img"){
								list[i].msg.content = this.setPicSize(list[i].msg.content);
								this.msgImgList.unshift(list[i].msg.content.url);
							}
							list[i].msg.id = Math.floor(Math.random()*1000+1);
							this.msgList.unshift(list[i]);
						}
						//这段代码很重要，不然每次加载历史数据都会跳到顶部
						this.$nextTick(function() {
							this.scrollToView = 'msg'+Viewid;//跳转上次的第一行信息位置
							this.$nextTick(function() {
								this.scrollAnimation = true;//恢复滚动动画
							});
						});
					}
					this.isHistoryLoading = false;
				})
			},
			// 加载初始页面消息
			getMsgList(){
				let that = this;
				// 消息列表 
				//最好读取和某个人的聊天缓存，所以信息我们都存缓存
				let list = [];	
				this.$apiconfig.getrecentmsg_f({data:{roomId:this.room.roomId,userId:this.mine.id,pageNum:this.pageNum,pageSize:this.pageSize}}).then(res=>{
					list = res.data.data.rows;
					this.listSize = res.data.data.total
					// 获取消息中的图片,并处理显示尺寸
					if(list.length>0){
						for(let i = 0; i < list.length; i++){
							if(list[i].type=='user' && list[i].msg.type=="img"){
								list[i].msg.content = this.setPicSize(list[i].msg.content);
								this.msgImgList.push(list[i].msg.content.url);
							}
						}
					}
					this.msgList = list;
					// 滚动到底部
					this.$nextTick(function() {
						//进入页面滚动到底部
						this.scrollTop = 9999;
						this.$nextTick(function() {
							this.scrollAnimation = true;
						});
					});
				})
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content){
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350);//350是定义消息图片最大宽度
				let maxH = uni.upx2px(350);//350是定义消息图片最大高度
				if(content.w>maxW||content.h>maxH){
					let scale = content.w/content.h;
					content.w = scale>1?maxW:maxH*scale;
					content.h = scale>1?maxW/scale:maxH;
				}
				return content;
			},
			//更多功能(点击+弹出)
			showMore(){
				this.scrollTop = 9999999;
				this.hideEmoji = true;
				if(this.hideMore){
					this.hideMore = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer(){
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer(){
				this.popupLayerClass = '';
				setTimeout(()=>{
					this.hideMore = true;
					this.hideEmoji = true;
				},150);
			},
			//发红包
			handRedEnvelopes(){
				this.modalEnv = 'show'
				/* uni.navigateTo({
					url:'hand/hand?roomType=' + this.room.roomType + "&roomTypeName=" + this.room.roomTypeName + "&roomSubType=" + this.room.roomSubType + "&roomId=" + this.room.roomId
				}); */
				this.hideDrawer();
			},
			addRedEnvelopeMsg(msg){
				this.msgList.push(msg);
			},
			// 添加系统文字消息到列表
			addSystemTextMsg(msg){
				this.msgList.push(msg);
			},
			// 添加系统红包消息到列表
			addSystemRedEnvelopeMsg(msg){
				this.msgList.push(msg);
			},
			openRedEnvelope(msg,index){
				this.redPacketMsg = msg
				this.redPacketIndex = index
				if(msg.content.isRobed || 1 == this.room.roomType){
					this.toOpenRedEnvelope()
					return
				}
				this.subModalName = 'cashPledgeModal'
			},
			hideSubModal(){
				this.subModalName = ''
				this.cashPledge = ''
			},
			// 打开红包
			toOpenRedEnvelope(){
				this.subModalName = ''
				var msg = this.redPacketMsg
				var index = this.redPacketIndex
				let rid = msg.content.rid;
				uni.showLoading({
					title:'加载中...'
				});
				let req = {
					msgId:msg.id,
					userId: this.mine.id,
					roomType:this.room.roomType,
					roomSubType:this.room.roomSubType,
					dot: msg.content.dot,
					cashPledge: this.cashPledge,
					roomId: this.room.roomId
				}
				this.$apiconfig.robRedEnvelope_f({data:req}).then(res=>{
					if (res.data.success){
						this.redenvelopeData = res.data.data
						this.redenvelopeData.userName = msg.userinfo.username
						if (this.redenvelopeData.money=='已领完'){
						} else {
							if(!msg.content.isRobed){
								this.sendSystemMsg({text:"你领取了"+(msg.userinfo.uid==this.mine.id?"自己":msg.userinfo.username)+"的红包"},'redEnvelope');
								this.msgList[index].msg.content.isRobed = true;
							}
						}
					} else {
						uni.showToast({
							icon:'none',
							title:res.data.errorHint
						})
					}
					uni.hideLoading();
					this.windowsState = 'show';
				})
			},
			// 关闭红包弹窗
			closeRedEnvelope(){
				this.windowsState = 'hide';
				setTimeout(()=>{
					this.windowsState = '';
				},200)
			},
			//发送系统消息
			sendSystemMsg(content,type){
				let lastid = this.msgList[this.msgList.length-1].msg.id;
				lastid++;
				let row = {type:"system",msg:{id:lastid,type:type,content:content}};
				this.screenMsg(row)
			},
			//领取详情
			toDetails(val){
				uni.navigateTo({
					url:'details/details?rid='+val.rid+"&userId=" + this.mine.id
				})
			},
			discard(){
				return;
			}
		}
	}
</script>
<style lang="scss">
	@import "@/static/HM-chat/css/style.scss"; 
	.up-village{
		position: fixed;
		top: 300upx;
		left: 10upx;
	}
	.block{
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
	.btn-up{
		background: #ff585c;
		margin-top: -40px;
		float: right;
		color: white;
		font-size: 10px;
	}
</style>