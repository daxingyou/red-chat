(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"26b0":function(e,t,n){"use strict";var a=n("ece6"),o=n.n(a);o.a},"3ac8":function(e,t,n){"use strict";n.r(t);var a=n("faaa");for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);n("26b0");var u,r,c,i,f=n("f0c5"),s=Object(f["a"])(a["default"],u,r,!1,null,null,null,!1,c,i);t["default"]=s.exports},"3f3b":function(e,t,n){"use strict";(function(e,t){n("55c5"),n("921b");var a=f(n("66fd")),o=f(n("3ac8")),u=f(n("220a")),r=f(n("de69")),c=f(n("3c28")),i=f(n("76425"));function f(e){return e&&e.__esModule?e:{default:e}}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),a.forEach(function(t){l(e,t,n[t])})}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d=function(){return n.e("colorui/components/cu-custom").then(n.bind(null,"f437"))};a.default.component("cu-custom",d),u.default.setConfig({baseUrl:"http://47.105.74.119:9998/",dataType:"json",responseType:"text",withCredentials:!0,timeOut:3e3,header:{merchcode:"cb0ac353f02a73a7c45885a862fe4de1","content-type":"application/json",Authentication:"cb0ac353f02a73a7c45885a862fe4de1",apitype:1}}),u.default.interceptors.request(function(e){return e}),u.default.interceptors.response(function(t){if("Token已经过期，请重新登陆！"!=t.data.errorHint)return 9999==parseInt(t.data.code)?(e.hideLoading(),void e.showModal({content:t.data.msg,success:function(t){t.confirm?setTimeout(function(){e.navigateTo({url:"/pages/login"})},200):setTimeout(function(){e.reLaunch({url:"/pages/index/index"})},200)}})):t;e.navigateTo({url:"/pages/login"})}),a.default.prototype.$request=u.default,a.default.prototype.$apiconfig=r.default,a.default.prototype.$mysocket=c.default,a.default.config.productionTip=!1,a.default.prototype.$store=i.default,a.default.prototype.cacheMessage=function(e,t,n,a){r.default.cacheMessage(e,t,n,a)},o.default.mpType="app";var p=new a.default(s({},o.default));t(p).$mount()}).call(this,n("6e42")["default"],n("6e42")["createApp"])},ece6:function(e,t,n){},f662:function(e,t,n){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("66fd")),u=r(n("76425"));function r(e){return e&&e.__esModule?e:{default:e}}var c={onLaunch:function(){var t=this;e.getSystemInfo({success:function(e){o.default.prototype.StatusBar=e.statusBarHeight,"android"==e.platform?o.default.prototype.CustomBar=e.statusBarHeight+50:o.default.prototype.CustomBar=e.statusBarHeight+45}}),e.getStorage({key:"userInfo",success:function(n){null!=n.data.user?(e.reLaunch({url:"./pages/index/index"}),t.$request.setConfig({header:{Authentication:n.data.token,"content-type":"application/json"}})):e.navigateTo({url:"./pages/login"})}})},onShow:function(){var t=this;null==u.default.getters.userinfo.user?e.reLaunch({url:"./pages/login"}):t.$request.setConfig({header:{Authentication:u.default.getters.userinfo.token,"content-type":"application/json"}})},onHide:function(){console.log(a("App Hide"," at App.vue:83"))}};t.default=c}).call(this,n("6e42")["default"],n("0de9")["default"])},faaa:function(e,t,n){"use strict";n.r(t);var a=n("f662"),o=n.n(a);for(var u in a)"default"!==u&&function(e){n.d(t,e,function(){return a[e]})}(u);t["default"]=o.a}},[["3f3b","common/runtime","common/vendor"]]]);