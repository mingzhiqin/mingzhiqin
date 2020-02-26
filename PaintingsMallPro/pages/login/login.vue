<template>
	
	<view class="content">
		<!-- <view class="setbox" v-if="isshow==true">
		<text class="titBox">手机号码登录</text>
		<button class="button2" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" >授权手机号码登录</button>
		</view> -->
		<image class="img" src="../../static/denglu2x.png"></image>
		<text class="tit">享诚智能</text>
		<button style='position:fixed;bottom:0' v-if="isShow1==true" class="button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" >微信快捷登录</button>
		<button style='position:fixed;bottom:0' v-if="isShow2==true" class="button" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo" >微信快捷登录</button>
	</view>
</template>

<script>
	let code=""
	let enData=""
	let iv=""
	import uniPop from '@/components/uni-pop.vue'
	import helper from '../../common/utils.js';
	export default {
		components:{
		        uniPop
		    },
		data() {
			return {
				 isShow1:false,
				 isShow2:true,
				 SessionKey: '',
				 OpenId: '',
				 nickName: null,
				 avatarUrl: null,
				 isCanUse: uni.getStorageSync('isCanUse')||true//默认为true
			}
		},
		methods: {
			 wxGetUserInfo(res) {
			                let _this = this;
							 console.log("___________")
			                uni.getUserInfo({
			                    provider: 'weixin',
			                    success: function(infoRes) {
									 console.log("______成功_____")
									
									 _this.isShow2=false
									 _this.isShow1=true
									  console.log(_this.isShow2)
									  console.log(_this.isShow1)
			                        try {
			                            uni.setStorageSync('isCanUse', false);//记录是否第一次授权  false:表示不是第一次授权
									
			                        } catch (e) {}
			                    },
			                    fail(res) { 
									 console.log("______失败_____")
									 console.log(res)
								}
			                });
			            },
			
			　　　　　　//登录
			                login() {
			                let _this = this;
			                uni.login({
			                    provider: 'weixin',
			                    success: function(loginRes) {
									console.log("登录。111。。。")
									console.log(loginRes)
			                        code = loginRes.code;
										console.log("登录。222。。。")
			                            //非第一次授权获取用户信息
			                            uni.getUserInfo({
			                                provider: 'weixin',
			                                success: function(infoRes) {
												console.log("登录。。。。")
												console.log(infoRes)
			 　　　　　　　　　　　　　　　　　　　　　　//获取用户信息后向调用信息更新方法
			                                    let nickName = infoRes.userInfo.nickName; //昵称
			                                    let avatarUrl = infoRes.userInfo.avatarUrl; //头像
			                                    _this.updateUserInfo(infoRes);//调用更新信息方法
			                                }
			                            });
			            
			                        
			                    },
			                });
			            },
						//向后台更新信息
			            updateUserInfo(info) {
			                let _this = this;
							console.log("info.userInfo")
							let userInfoObj=
							{
							 avatar: info.userInfo.avatarUrl,
							 encryptedData: enData,
							 iv:iv,
							 nickname: info.userInfo.nickName,
							 sex: info.userInfo.gender	
							}
							console.log(userInfoObj)
							console.log(code)
			                uni.request({
			                    url:this.$url+'/user/login' ,//服务器端地址
			                    data: {
									inviteId:"2c934332703c275e01703d7754f00001",
			                        userInfo: userInfoObj,
			                        wxCode:code
			                    },
			                    method: 'POST',
			                    header: {
			                        'content-type': 'application/json'
			                    },
			                    success: (res) => {
									console.log("邀请登录")
									console.log(res.data)
			                        if (res.data.result == "SUCCESS") {
										
										uni.setStorageSync('token', res.data.data);
										_this.loadUser(res.data.data)
			                            // uni.navigateBack({
			                            	
			                            // })
			                        }
			                    }
			                   
			                });
			            },
						
						loadUser:function(token)
						{
							console.log("token")
							console.log(token)
							let _this = this;
							uni.request({
							    url:this.$url+'/user/userInfo' ,//服务器端地址
							    data: {
									
							    },
							    method: 'POST',
							    header: {
							        'content-type': 'application/json',
									'token':token,
							    },
							    success: (res) => { 
									console.log(res.data)
							        if (res.data.code == 200) {
										uni.setStorageSync(this.$userKey, res.data.data);
							            uni.navigateBack({
							            	
							            })
							        }
							    }
							   
							}); 
						},
						getPhoneNumber: function(e) {
							var self = this
							console.log(e);
							if (e.detail.errMsg == 'getPhoneNumber:ok') {
								enData = e.detail.encryptedData
								iv = e.detail.iv
								self.login()		
							} else {
						 
							}
							},
					
		},
		 // onLoad() 
		 // {//默认加载
		 //    this.login();
		 // }
	}
</script>

<style>
	.titBox
	{
		font-size: 18px;
		color: #FFFFFF;
		margin-left: 20px;
		font-weight: bold;
	}
	.button2
		{
			width: 90%;
			height: 40px;
			background: #fff;
			border: none;
			margin-bottom: ;
			color: #DFC4A0;
		}
		.setbox{
		      position:fixed;
		      z-index:1000;
		      left:0px;
		      right:0px;
		      width:100%;
		      height:200px; 
			  flex-direction: column;
			  justify-content: space-between;
			  display: flex;
			  padding-top: 20px;
			  padding-bottom: 20px;
			  background: #DFC4A0;
		      border: 1px solid #CFD8DC!important;
		      box-shadow:0px 3px 12px #666666;
		      -webkit-transition: all 0.3s ease;
		      transition: all 0.3s ease;
		      bottom: 0;
		  }
	
	.content
	{
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
	}
	.content2
	{
		align-items: center;
		justify-content: center;
		display: flex;
		height: 50%;
		width: 80%;
		border-radius: 10px;
		border: 1px solid #333233;
		flex-direction: column;
	}
	.img
	{
		margin-top: 50px;
		width: 220px;
		height: 220px;
	}
	.tit
	{
		font-size: 24px;
		color: #DFC4A0;
		margin-top: 20px;
		font-weight: bold;
	}
	.button
	{
		width: 90%;
		height: 40px;
		background: #DFC4A0;
		border: none;
		color: #fff;
		bottom: 0;
		margin-bottom: 20px;
		margin-top: 80px;
	}


</style>
