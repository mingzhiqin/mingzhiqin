(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/user"],{"2f61":function(n,t,e){},"4b1dd":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;e("2f62");var o=function(){return e.e("components/mix-list-cell").then(e.bind(null,"ef40"))},i=0,r=0,c=!0,a="",u={components:{listCell:o},data:function(){return{coverTransform:"translateY(0px)",coverTransition:"0s",moving:!1,userInfo:{}}},onLoad:function(){},computed:{},methods:{loadUserCode:function(){n.request({url:this.$url+"/user/picture",data:{},method:"POST",header:{"content-type":"application/json",token:a},success:function(n){console.log("picture-------------"),console.log(n.data),n.data.code}})},navTo:function(t){this.userInfo.nickname||(t="/pages/login/login"),n.navigateTo({url:t})},navToLogin:function(){console.log(this.userInfo.nickname),this.userInfo.nickname||n.navigateTo({url:"/pages/login/login"})},coverTouchstart:function(n){!1!==c&&(this.coverTransition="transform .1s linear",i=n.touches[0].clientY)},coverTouchmove:function(n){r=n.touches[0].clientY;var t=r-i;t<0?this.moving=!1:(this.moving=!0,t>=80&&t<100&&(t=80),t>0&&t<=80&&(this.coverTransform="translateY(".concat(t,"px)")))},coverTouchend:function(){!1!==this.moving&&(this.moving=!1,this.coverTransition="transform 0.3s cubic-bezier(.21,1.93,.53,.64)",this.coverTransform="translateY(0px)")}},onShow:function(){this.userInfo=n.getStorageSync(this.$userKey),a=n.getStorageSync("token"),console.log(a),this.loadUserCode()}};t.default=u}).call(this,e("543d")["default"])},"78d3":function(n,t,e){"use strict";(function(n){e("8040"),e("921b");o(e("66fd"));var t=o(e("86ee"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},"86ee":function(n,t,e){"use strict";e.r(t);var o=e("d0aa"),i=e("fc0e");for(var r in i)"default"!==r&&function(n){e.d(t,n,function(){return i[n]})}(r);e("a8c3");var c=e("2877"),a=Object(c["a"])(i["default"],o["a"],o["b"],!1,null,null,null);t["default"]=a.exports},a8c3:function(n,t,e){"use strict";var o=e("2f61"),i=e.n(o);i.a},d0aa:function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},i=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return i})},fc0e:function(n,t,e){"use strict";e.r(t);var o=e("4b1dd"),i=e.n(o);for(var r in o)"default"!==r&&function(n){e.d(t,n,function(){return o[n]})}(r);t["default"]=i.a}},[["78d3","common/runtime","common/vendor"]]]);