(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/cmd-page-body/cmd-page-body"],{"37e6":function(t,o,e){"use strict";e.r(o);var n=e("e547"),u=e("4413");for(var c in u)"default"!==c&&function(t){e.d(o,t,function(){return u[t]})}(c);e("6a3e");var a,r=e("f0c5"),i=Object(r["a"])(u["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);o["default"]=i.exports},4413:function(t,o,e){"use strict";e.r(o);var n=e("b3cc"),u=e.n(n);for(var c in n)"default"!==c&&function(t){e.d(o,t,function(){return n[t]})}(c);o["default"]=u.a},"6a3e":function(t,o,e){"use strict";var n=e("80eb"),u=e.n(n);u.a},"80eb":function(t,o,e){},b3cc:function(t,o,e){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var e={name:"cmd-page-body",props:{type:{type:String,default:"top"},backgroundColor:{type:String,default:""}},data:function(){return{bodyHeight:0}},computed:{setBodyClass:function(){var t=["cmd-page-body","cmd-page-body-top-bottom"];return"top"==this.type&&(t.splice(1),t.push("cmd-page-body-top")),"bottom"==this.type&&(t.splice(1),t.push("cmd-page-body-bottom")),t},setBackgroundColor:function(){var t="background: #ffffff;";return this.backgroundColor&&(t="background: ".concat(this.backgroundColor,";")),t}},mounted:function(){var o=t.getSystemInfoSync().windowHeight;o-=t.getSystemInfoSync().statusBarHeight,o-=5,"top"==this.type&&(o-=t.upx2px(88)),"bottom"==this.type&&(o-=t.upx2px(118)),"top-bottom"==this.type&&(o-=t.upx2px(206)),this.bodyHeight="min-height:".concat(o,"px")}};o.default=e}).call(this,e("543d")["default"])},e547:function(t,o,e){"use strict";var n,u=function(){var t=this,o=t.$createElement;t._self._c},c=[];e.d(o,"b",function(){return u}),e.d(o,"c",function(){return c}),e.d(o,"a",function(){return n})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/cmd-page-body/cmd-page-body-create-component',
    {
        'components/cmd-page-body/cmd-page-body-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("37e6"))
        })
    },
    [['components/cmd-page-body/cmd-page-body-create-component']]
]);