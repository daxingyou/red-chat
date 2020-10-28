/**
 * version 1.1.7
 */
import request from 'request.js'
class apiconfig {
  constructor(config = {}) {
        this.baseurl= 'http://127.0.0.1:9998/';
		this.merchcode='cb0ac353f02a73a7c45885a862fe4de1';
		this.pathconfig={
		  	login:"/api/user/login", ///第三方登录,
			regist:"/api/user/register", ///第三方注册,
			checklogout:"/apicom/user/checklogout", ///第三方注册,
			registClientid:"/apicom/chat/registchater",///注册聊天通道,
			initInfo:"/apicom/commapi/initinfo",///获取用户个人信息  [usign=34],
			sendMessage:'/api/room/message/createMessage',///发送数据,
			robRedEnvelope:'/api/room/message/robRedEnvelope',///抢包,
			redEnvelopeRecords:'/api/room/message/getRedEnvelopeRecords',///获取红包记录
		    getMessagelog:'/apicom/chatlog/mochatlog',///获取历史记录,
		    upload_image:this.baseurl+'/apicom/commapi/upload_image',///图片上传地址,
			upload_voice:this.baseurl+'/apicom/commapi/upload_voice',///图片上传地址,
			searchuser:'/apicom/commapi/searchapp',///图片上传地址,
			getUinfoByid:'/apicom/set/getuserinfoByid',///图片上传地址,
			sendInvite:'/apicom/commapi/savemsgapp',///图片上传地址,
			getMsgbox:'/apicom/commapi/msgbox',///获取消息盒子的信息,
			getlevemsg:'/apicom/commapi/levemsg',///获取与某个好友的留言信息,这样在第一次加载对话的时候就去检测一次
			handlefirend:'/apicom/set/changeHandle',///同意好友请求,
			createGroup:'/apicom/set/createGroup',
			updateuserinfo:'/apicom/set/update',
			getrecentmsg:'/api/room/message/list',///最近20条记录
			findUserName:"/api/user/findUserName", ///验证用户名是否存在,
			getIndexBanner:"/api/index/getIndexBanner",///获取首页banner,
			getIndexNotice:"/api/index/getIndexNotice",///获取首页公告,
			getIndexRoom:"/api/index/getIndexRoom",/// 获取房间信息,
			getRoomType:"/api/index/getRoomType", ///获取房间类型,
			updatePassWord:"/api/user/updatePassWord", ///修改登录密码,
			updateDealPassWord:"/api/user/updateDealPassWord", ///修改交易密码,
			createRoom:"/api/user/createRoom",///创建房间,
			joinRoom:"/api/user/joinRoom",///加入房间,
			quitRoom:"/api/user/quitRoom",///退出房间,
			getBankInfo:"/api/user/getBankInfo",///获取银行卡信息,
			getBankType:"/api/user/getBankType", ///获取银行类型,
			addBankInfo:"/api/user/addBankInfo", /// 添加银行卡,
			withdrawDeposit:"/api/user/withdrawDeposit",///提现,
			//recharge:"/api/user/recharge", ///充值,
			createOrder:"/api/user/createOrder",/// 生成订单
			bandSuperior:"/api/user/bandSuperior", /// 绑定上级,
			getRunningWaterList:"/api/user/getRunningWaterList",///获取用户记录,
			getTeamInfo:"/api/team/getTeamInfo", ///, 获取团队流水
			getTeamGrade:"/api/team/getTeamGrade", /// 获取团队下级人数,
			getLuckLog:"/api/user/getLuckLog", /// 获取用户抽奖数量,
			addLuckLog:"/api/user/addLuckLog",/// 添加抽奖记录,
			getLuckInfoList:"/api/user/getLuckInfoList", ///获取奖品列表
			getSignIn:"/api/user/getSignIn", ///获取签到信息
			signIn:"/api/user/signIn", ///签到,
			onTheVillage:"/api/user/onTheVillage",
			getOnTheVillage:"/api/user/getOnTheVillage",
			getMembers:"/api/room/message/getMembers",
			getRoomInfo:"/api/room/getRoomInfo"
		}
  }
  getrecentmsg_f(config){
  	   return request.post(this.pathconfig.getrecentmsg,config); 
  }
  getlevemsg_f(config){
  	   return request.post(this.pathconfig.getlevemsg,config); 
  }
  updateuserinfo_f(config){
  	   return request.post(this.pathconfig.updateuserinfo,config); 
  }
  createGroup_f(config){
  	   return request.post(this.pathconfig.createGroup,config); 
  }
  handlefirend_f(config){
  	   return request.post(this.pathconfig.handlefirend,config); 
  }
  getMsgbox_f(config){
  	   return request.post(this.pathconfig.getMsgbox,config); 
  }
  sendInvite_f(config){
  	   return request.post(this.pathconfig.sendInvite,config); 
  }
  getUinfoByid_f(config){
  	   return request.post(this.pathconfig.getUinfoByid,config); 
  }
  searchuser_f(config){
  	   return request.post(this.pathconfig.searchuser,config); 
  }
  login_f(config){
  	   return request.post(this.pathconfig.login,config); 
  }
  regist_f(config){
  	   return request.post(this.pathconfig.regist,config); 
  }
  checklogout_f(config){
  	   return request.post(this.pathconfig.checklogout,config); 
  }
  registClientid_f(config){
  	   return request.post(this.pathconfig.registClientid,config); 
  }
  initInfo_f(config){
  	   return request.post(this.pathconfig.initInfo,config); 
  }
  sendMessage_f(config){
  	   return request.post(this.pathconfig.sendMessage,config); 
  }
  robRedEnvelope_f(config){
  	   return request.post(this.pathconfig.robRedEnvelope,config); 
  }
  getRedEnvelopeRecords_f(config){
  	   return request.post(this.pathconfig.redEnvelopeRecords,config); 
  }
  getMessagelog_f(config){
  	   return request.post(this.pathconfig.getMessagelog,config); 
  }
 findUserName_f(config){
 	   return request.post(this.pathconfig.findUserName,config); 
 }
	getIndexBanner_f(config){
		return request.post(this.pathconfig.getIndexBanner,config); 
	}
	getIndexNotice_f(config){
		return request.post(this.pathconfig.getIndexNotice,config); 
	}
	getIndexRoom_f(config){
		return request.post(this.pathconfig.getIndexRoom,config); 
	}
	getIndexRoomType_f(config){
		return request.post(this.pathconfig.getRoomType,config); 
	}
	updatePassWord_f(config){
		return request.post(this.pathconfig.updatePassWord,config); 
	}
	updateDealPassWord_f(config){
		return request.post(this.pathconfig.updateDealPassWord,config); 
	}
	createRoom_f(config){
		return request.post(this.pathconfig.createRoom,config); 
	}
	joinRoom_f(config){
		return request.post(this.pathconfig.joinRoom,config); 
	}
	quitRoom_f(config){
		return request.post(this.pathconfig.quitRoom,config); 
	}
	getBankInfo_f(config){
		return request.post(this.pathconfig.getBankInfo,config); 
	}
	getBankType_f(config){
		return request.post(this.pathconfig.getBankType,config); 
	}
	addBankInfo_f(config){
		return request.post(this.pathconfig.addBankInfo,config); 
	}
	drawings_f(config){
		return request.post(this.pathconfig.withdrawDeposit,config); 
	}
	/* recharge_f(config){
		return request.post(this.pathconfig.recharge,config); 
	} */
	createOrder_f(config){
		return request.post(this.pathconfig.createOrder,config); 
	}
	bandSuperior_f(config){
		return request.post(this.pathconfig.bandSuperior,config); 
	}
	getRunningWaterList_f(config){
		return request.post(this.pathconfig.getRunningWaterList,config); 
	}
	getTeamInfo_f(config){
		return request.post(this.pathconfig.getTeamInfo,config); 
	}
	getTeamGrade_f(config){
		return request.post(this.pathconfig.getTeamGrade,config); 
	}
	getLuckLog_f(config){
		return request.post(this.pathconfig.getLuckLog,config); 
	}
	addLuckLog_f(config){
		return request.post(this.pathconfig.addLuckLog,config); 
	}
	getLuckInfoList_f(config){
		return request.post(this.pathconfig.getLuckInfoList,config); 
	}
	getSignIn_f(config){
		return request.post(this.pathconfig.getSignIn,config); 
	}
	signIn_f(config){
		return request.post(this.pathconfig.signIn,config); 
	}
	onTheVillage_f(config){
		return request.post(this.pathconfig.onTheVillage,config); 
	}
	getOnTheVillage_f(config){
		return request.post(this.pathconfig.getOnTheVillage,config); 
	}
	getMembers_f(config){
		return request.post(this.pathconfig.getMembers,config);
	}
	getRoomInfo_f(config){
		return request.post(this.pathconfig.getRoomInfo,config);
	}
}

if (!global.$apiconfig) {
  global.$apiconfig = new apiconfig();
}

export default global.$apiconfig;