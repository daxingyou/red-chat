import Vue from 'vue'
import App from './App'
import request from 'request.js'
import apiconfig from 'apiconfig.js'
import mysocket from 'mysocket.js'
import socket from 'socket.js'
import store from './store'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)




// 全局配置
request.setConfig({
  baseUrl: 'http://127.0.0.1:9998/', // 此为测试地址，需加入到域名白名单，或者更改为您自己的线上地址即可
  dataType: 'json', // 可删除，默认为json  
  responseType: 'text', // 可删除，默认为text  
  withCredentials: true,
  timeOut:3000,
  // 设置请求头，支持所有请求头设置，也可不设置，去掉header就行
  header: {
    //'merchcode': 'cb0ac353f02a73a7c45885a862fe4de1',  ///商户码 这个要第三方申请才有一个
	'content-type': 'application/json',
	//'Authentication':'cb0ac353f02a73a7c45885a862fe4de1',
    'apitype':1
  },

})

// 设置请求拦截器
request.interceptors.request(config => {
	
  // 配置参数和全局配置相同，此优先级最高，会覆盖在其他地方的相同配置参数

  // 追加请求头，推荐
  //config.header['content-type'] = 'application/json';
  //config.header.token = 'token from interceptors';


  // 覆盖请求头
  // config.header = {
    // 'content-type': 'application/json',
    // 'token': 'token from interceptors'
  // }

  // return false; // 终止请求
  // return Promise.reject('error from request interceptors'); // 向外层抛出错误，用catch捕获
  return config; // 返回修改后的配置，如未修改也需添加这行
})

// 设置响应拦截器
request.interceptors.response(res => {
	// 接收请求，执行响应操作
	// 您的逻辑......
	// return false;    // 阻止返回,页面不会接收返回值
	// return {message: '自定义值，来自拦截器'};   // 返回您自定义的值，将覆盖原始返回值
	// return Promise.reject('error from response interceptors') // 向外层抛出错误，用catch捕获
	if(res.data.errorHint == "Token已经过期，请重新登陆！"){
		uni.navigateTo({
			url:"/pages/login"
		})
		return;
	}
	else if(parseInt(res.data.code)==9999){
		uni.hideLoading();///让有加载的图标停止加载
		uni.showModal({
			content: res.data.msg,
			success: (e)=>{
				if(e.confirm){
					setTimeout(()=>{
						uni.navigateTo({
							url:"/pages/login"
						})
					}, 200)
				}else{
					setTimeout(()=>{
						uni.reLaunch({
							url:"/pages/index/index"
						})
					}, 200)
				}
			}
		});
		return;
	}
	return res; // 原样返回
})

// // 挂载到全局vue实例上，在页面中可以使用this.$request调用request实例下相应方法
Vue.prototype.$request = request;
Vue.prototype.$apiconfig = apiconfig;
Vue.prototype.$mysocket =mysocket;
Vue.prototype.$socket =socket;
Vue.config.productionTip = false;
Vue.prototype.$store = store;

App.mpType = 'app';

const app = new Vue({
    ...App
	
})

app.$mount()

