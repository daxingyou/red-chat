import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token:'123',
		hasLogin: false,
	    userInfo: {},
		getMsg:{},
		userstate:''
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({
			    key: 'userInfo',  
			    data: provider  
			}) 
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			state.getMsg={};
			state.userstate='';
			uni.removeStorage({  
                key: 'userInfo'  
            })
		},
		setCurrentMsg(state,provider){
			provider.type=provider.type;
			state.getMsg=provider;
		}
	},
	getters: {
		  hasLogin: (state, getters) => {
		    return state.hasLogin
		  },
		  userinfo: (state, getters) => {
			  uni.getStorage({
			      key: 'userInfo',
			      success:  (res) => {
					  state.hasLogin = true;
					  state.userInfo = res.data
			      }
			  });
		     return state.userInfo
		  } 
	 },
	actions: {
	}
})

export default store
