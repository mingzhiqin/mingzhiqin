<template>
	<view class="content">
		<image :src="ewmImg" class="imgBg" mode="widthFix"></image>
		<button  class="button"  style='position:fixed;bottom:0'  @click="saveEwm">保存图片</button>
	</view>
</template>

<script>
	var token=""
	var _self;
	var userInfo;
	export default {
		data() {
			return {
				
				openSettingBtnHidden: true,//是否授权
				ewmImg:"",//这是要保存的图片
			}
		},
		onLoad() {
			token = uni.getStorageSync("token")
			this.loadCode()
			 _self = this;
			userInfo = uni.getStorageSync(this.$userKey)
			console.log(userInfo)
		},
		methods: {
			onShareAppMessage(res) {
			    return {
			      title: '邀请您加入懿点通',
			      path: '/pages/index/index?id='+userInfo.id
			    }
			  },
			loadCode()
			{
				
					var _this =this
					uni.request({
					    url:_this.$url+'/user/picture' ,//服务器端地址
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
								_this.ewmImg = res.data.data
					        }
					    }
					   
					});
				},
						//保存
			            saveEwm:function(e){
							uni.showLoading({
								title:"正在保存..."
							})
							uni.downloadFile({
							  url:_self.ewmImg,
							  success: function(res) {
								uni.hideLoading()
							    uni.saveImageToPhotosAlbum({
							      filePath: res.tempFilePath,
							      success: function(data) {
							        uni.showToast({
							          title: "保存成功",
							          icon: "success",
							          duration: 2000
							        });
							      },
							      fail: function(err) {
									console.log("fail");
							        console.log(err);
									if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
									              // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
									              uni.showModal({
									                title: '提示',
									                content: '需要您授权保存相册',
									                showCancel: false,
									                success:modalSuccess=>{
									                  uni.openSetting({
									                    success(settingdata) {
									                      console.log("settingdata", settingdata)
									                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
									                        uni.showModal({
									                          title: '提示',
									                          content: '获取权限成功,再次点击图片即可保存',
									                          showCancel: false,
									                        })
									                      } else {
									                        uni.showModal({
									                          title: '提示',
									                          content: '获取权限失败，将无法保存到相册哦~',
									                          showCancel: false,
									                        })
									                      }
									                    },
									                    fail(failData) {
									                      console.log("failData",failData)
									                    },
									                    complete(finishData) {
									                      console.log("finishData", finishData)
									                    }
									                  })
									                }
									              })
									            }
							      },
							     
							    });
							  }
							});
			              
			            },
			            saveImgToLocal:function(e){
			                
			                uni.showModal({
			                    title: '提示',
			                    content: '确定保存到相册吗',
			                    success: function (res) {
			                        if (res.confirm) {
			                            
			                            uni.downloadFile({
			                                    url: _self.ewmImg,//图片地址
			                                    success: (res) =>{
			                                        if (res.statusCode === 200){
			                                            uni.saveImageToPhotosAlbum({
			                                                filePath: res.tempFilePath,
			                                                success: function() {
			                                                    uni.showToast({
			                                                        title: "保存成功",
			                                                        icon: "none"
			                                                    });
			                                                },
			                                                fail: function() {
			                                                    uni.showToast({
			                                                        title: "保存失败",
			                                                        icon: "none"
			                                                    });
			                                                }
			                                            });
			                                        } 
			                                    }
			                                })
			                            
			                            
			                        } else if (res.cancel) {
			                            
			                        }
			                    }
			                });
			                
			            }
		}
	}
</script>

<style>
	.content
	{
		align-items: center;
		display: flex;
		justify-content: center;
	}
	.imgBg
	{
		width: 90%;
		margin-top: 30px;
		margin-bottom: 30px;
		
	}
	.button
	{
		width: 90%;
		height: 46px;
		background: #333233;
		border: none;
		color: #fff;
		align-items: center;
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
		font-size: 18px;
	}
</style>
