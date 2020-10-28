/**
 * version 1.1.7
 */
import apirequest from 'apiconfig.js'
import store from './store'

class mysocket {
	constructor(config = {}) {
      this.mineid=0;
	  this.ws=null;
	  this.config = {socketurl:'ws://127.0.0.1:9999/chat'};
    }
	connectserver(usign){
		this.mineid=usign;
		this.ws=uni.connectSocket({
			url: this.config.socketurl,
			complete:function(res){
				if(res.errMsg=='connectSocket:ok'){
					 console.log('成功连接服务器')
				}else{
					  uni.showModal({
						  title:'',
						  content:"链接服务器失败",
					  })
				}
			}
		})
		this.ws.onOpen(function(res) {
		});
		this.ws.onError(function(res) {
		});
		this.ws.onMessage(function(res){
			var res = JSON.parse(res.data);
			store.commit("setCurrentMsg", res)
		})
	}
}

if (!global.$mysocket) {
  global.$mysocket = new mysocket();
}

export default global.$mysocket;
