(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/luck/luck"],{1558:function(t,n,e){"use strict";e.r(n);var i=e("cfc9"),o=e("7745");for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);e("9cea");var u,r=e("f0c5"),c=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"6025f7d3",null,!1,i["a"],u);n["default"]=c.exports},4655:function(t,n,e){"use strict";(function(t){e("55c5"),e("921b");i(e("66fd"));var n=i(e("1558"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},7745:function(t,n,e){"use strict";e.r(n);var i=e("b50b"),o=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,function(){return i[t]})}(a);n["default"]=o.a},"9cea":function(t,n,e){"use strict";var i=e("dc2f"),o=e.n(i);o.a},b50b:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=e("2f62");function o(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},i=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.forEach(function(n){a(t,n,e[n])})}return t}function a(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var u=function(){return e.e("components/cmd-nav-bar/cmd-nav-bar").then(e.bind(null,"35f5"))},r=function(){return e.e("components/cmd-page-body/cmd-page-body").then(e.bind(null,"37e6"))},c={components:{cmdNavBar:u,cmdPageBody:r},data:function(){return{expendMoney:0,mine:"",userNum:"",surplusChance:0,list:"",width:0,animationData:{},btnDisabled:""}},onShow:function(){this.init()},computed:o({},(0,i.mapState)(["hasLogin","userInfo"])),onLoad:function(){this.getLuckInfoList()},methods:{init:function(){this.mine=this.userInfo.user,this.expendMoney=this.mine.expendMoney,this.getLuckInfo()},getLuckInfoList:function(){var t=this;this.$apiconfig.getLuckInfoList_f({}).then(function(n){t.list=n.data.data.rows,t.width=360/t.list.length})},getLuckInfo:function(){var t=this;this.$apiconfig.getLuckLog_f({data:{id:this.mine.id,userName:this.mine.userName}}).then(function(n){var e=Math.floor(t.mine.expendMoney/1e3);t.surplusChance=e-n.data.data.rows})},animation:function(n,e){var i=this.list,o=4;this.runDeg=this.runDeg||0,this.runDeg=this.runDeg+(360-this.runDeg%360)+(360*o-n*(360/i.length))+1;var a=t.createAnimation({duration:e,timingFunction:"ease"});a.rotate(this.runDeg).step(),this.animationData=a.export(),this.btnDisabled="disabled"},playReward:function(){var n=this;if(0>=this.surplusChance)t.showToast({title:"没有可用机会",icon:"none"});else{var e=this.getRandom(),i=4e3;this.animation(e,i),setTimeout(function(){t.showModal({content:n.list[e].showTitle?"抱歉，您未中奖":"恭喜，中奖"}),n.btnDisabled=""},i+1e3),this.$apiconfig.addLuckLog_f({data:{userId:this.mine.id,luckId:e,showTitle:this.list[e].showTitle,money:this.list[e].money}}).then(function(t){n.init()})}},getRandom:function(){for(var t=1e3,n=-1,e=Math.floor(Math.random()*t)+1,i=0;i<this.list.length;i++)if(e-=this.list[i].deg,e<=0)return n=i,n;return n}}};n.default=c}).call(this,e("6e42")["default"])},cfc9:function(t,n,e){"use strict";var i,o=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",function(){return o}),e.d(n,"c",function(){return a}),e.d(n,"a",function(){return i})},dc2f:function(t,n,e){}},[["4655","common/runtime","common/vendor"]]]);