(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/showinvita/showinvita"],{"3bb6":function(t,e,n){"use strict";var o=n("81e7"),a=n.n(o);a.a},"447f":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,o,a="",i={data:function(){return{openSettingBtnHidden:!0,ewmImg:""}},onLoad:function(){a=t.getStorageSync("token"),this.loadCode(),n=this,o=t.getStorageSync(this.$userKey),console.log(o)},methods:{onShareAppMessage:function(t){return{title:"邀请您加入懿点通",path:"/pages/index/index?id="+o.id}},loadCode:function(){var e=this;t.request({url:e.$url+"/user/picture",data:{},method:"POST",header:{"content-type":"application/json",token:a},success:function(t){console.log(t.data),200==t.data.code&&(e.ewmImg=t.data.data)}})},saveEwm:function(e){t.showLoading({title:"正在保存..."}),t.downloadFile({url:n.ewmImg,success:function(e){t.hideLoading(),t.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(e){t.showToast({title:"保存成功",icon:"success",duration:2e3})},fail:function(e){console.log("fail"),console.log(e),"saveImageToPhotosAlbum:fail:auth denied"!==e.errMsg&&"saveImageToPhotosAlbum:fail auth deny"!==e.errMsg||t.showModal({title:"提示",content:"需要您授权保存相册",showCancel:!1,success:function(e){t.openSetting({success:function(e){console.log("settingdata",e),e.authSetting["scope.writePhotosAlbum"]?t.showModal({title:"提示",content:"获取权限成功,再次点击图片即可保存",showCancel:!1}):t.showModal({title:"提示",content:"获取权限失败，将无法保存到相册哦~",showCancel:!1})},fail:function(t){console.log("failData",t)},complete:function(t){console.log("finishData",t)}})}})}})}})},saveImgToLocal:function(e){t.showModal({title:"提示",content:"确定保存到相册吗",success:function(e){e.confirm?t.downloadFile({url:n.ewmImg,success:function(e){200===e.statusCode&&t.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(){t.showToast({title:"保存成功",icon:"none"})},fail:function(){t.showToast({title:"保存失败",icon:"none"})}})}}):e.cancel}})}}};e.default=i}).call(this,n("543d")["default"])},"5ff4":function(t,e,n){"use strict";n.r(e);var o=n("447f"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);e["default"]=a.a},"656f":function(t,e,n){"use strict";(function(t){n("8040"),n("921b");o(n("66fd"));var e=o(n("9a91"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"81e7":function(t,e,n){},"97aa":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})},"9a91":function(t,e,n){"use strict";n.r(e);var o=n("97aa"),a=n("5ff4");for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);n("3bb6");var s=n("2877"),c=Object(s["a"])(a["default"],o["a"],o["b"],!1,null,null,null);e["default"]=c.exports}},[["656f","common/runtime","common/vendor"]]]);