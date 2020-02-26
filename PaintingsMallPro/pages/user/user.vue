<template>  
    <view class="container">  
		
		<view class="user-section" @click="navToLogin">
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.avatar || '/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<text class="username">{{userInfo.nickname || '游客'}}</text>
				</view>
			</view>
			
		</view>
		
		<view  class="viewOrder" @click="navTo('/pages/order/order?state=0')" >
			<text class="orderTxt">我的订单</text>
			<view  class="viewOrder2" >
				<text class="orderTxtAll">查看全部</text>
				<image class="imgOrder" src="../../static/jiantou.png"></image>
			</view>
			
		</view>
			<!-- 订单 -->
			<view class="order-section">
				<view class="order-item" @click="navTo('/pages/order/order?state=1')" hover-class="common-hover"  :hover-stay-time="50">
					<image class="yticonIcon" mode="widthFix" src="../../static/daizhifu.png"></image>
					<text class="m-Txt">待支付</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=2')"  hover-class="common-hover" :hover-stay-time="50">
					<image class="yticonIcon" mode="widthFix" src="../../static/daifahuo.png"></image>
					<text class="m-Txt">待发货</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=3')" hover-class="common-hover"  :hover-stay-time="50">
					<image class="yticonIcon" mode="widthFix" src="../../static/daishouhuo.png"></image>
					<text class="m-Txt">待收货</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=4')" hover-class="common-hover"  :hover-stay-time="50">
					<image class="yticonIcon2" mode="widthFix" src="../../static/yiwancheng.png"></image>
					<text class="m-Txt">已完成</text>
				</view>
			</view>
			<!-- 其他 -->
			<view  class="viewOther" >其他</view>
			
			<view class="order-section">
				<view class="order-item" @click="navTo('/pages/address/address')" hover-class="common-hover"  :hover-stay-time="50">
					<image class="yticonIcon" mode="widthFix" src="../../static/daizhifu.png"></image>
					<text class="m-Txt">地址管理</text>
				</view>
				<view class="order-item" @click="navTo('/pages/invitation/invitation')"  hover-class="common-hover" :hover-stay-time="50">
					<image class="yticonIcon" mode="widthFix" src="../../static/daifahuo.png"></image>
					<text class="m-Txt">邀请好友</text>
				</view>
				<view class="order-item" hover-class="common-hover" :hover-stay-time="50">
					
				</view>
				<view class="order-item"   hover-class="common-hover" :hover-stay-time="50">
					
				</view>
			</view>
			</view>
		</view>
			
		
    </view>  
</template>  
<script>  
	import listCell from '@/components/mix-list-cell';
    import {  
        mapState 
    } from 'vuex';  
	let startY = 0, moveY = 0, pageAtTop = true;
	var token = ""
    export default {
		components: {
			listCell
		},
		data(){
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				userInfo:{},
			}
		},
		onLoad(){
			
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			}else if(index === 1){
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
        computed: {
			//...mapState(['hasLogin','userInfo'])
		},
        methods: {
				 loadUserCode(){
				var _this = this 
				uni.request({
				    url:this.$url+'/user/picture' ,//服务器端地址
				    data: {
						
				    },
				    method: 'POST',
				    header: {
				        'content-type': 'application/json',
						'token':token,
				    },
				    success: (res) => { 
						console.log("picture-------------")
						console.log(res.data)
				        if (res.data.code == 200) {
							
				        }
				    }
				   
				});
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url){
				if(!this.userInfo.nickname){
					url = '/pages/login/login';
				}
				uni.navigateTo({  
					url
				})  
			}, 
			navToLogin(){
				console.log(this.userInfo.nickname)
				if(!this.userInfo.nickname){
					uni.navigateTo({
						url:'/pages/login/login'
					})  
				}
				
				
	}, 
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e){
				if(pageAtTop === false){
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e){
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if(moveDistance < 0){
					this.moving = false;
					return;
				}
				this.moving = true;
				if(moveDistance >= 80 && moveDistance < 100){
					moveDistance = 80;
				}
		
				if(moveDistance > 0 && moveDistance <= 80){
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend(){
				if(this.moving === false){
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
        }  ,
		onShow() {
			
			this.userInfo = uni.getStorageSync(this.$userKey)
			token = uni.getStorageSync("token")
			console.log(token)
			this.loadUserCode()
		}
    }  
</script>  
<style lang='scss'>
	.m-Txt
	{
		font-size: 12sp;
		color: #666566;
	}
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}

	.user-section{
		height: 320upx;
		background: #E4DED4;
		padding: 100upx 30upx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.username{
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}
	}

	.vip-card-box{
		display:flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;
		.card-bg{
			position:absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}
		.b-btn{
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}
		.tit{
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			.yticon{
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}
		.e-b{
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}
	.cover-container{
		background: $page-color-base;
		padding: 0 30upx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
		.arc{
			position:absolute;
			left: 0;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		@extend %section;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		border-bottom: 20upx solid #F5F5F5;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		
		.yticonIcon{
			margin-bottom: 15upx;
			width: 60upx;
			
		}
		.yticonIcon2{
			margin-bottom: 15upx;
			
			width: 50upx;
			height:50upx;;
		}
		.yticon{
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
		}
	}
	.history-section{
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx 30upx 0;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
	
	.viewOther
	{
		height: 50px;
		padding-left: 20upx;
		font-size: 16sp;
		color: $font-color-dark;
		border-bottom: 10upx solid #F5F5F5;
		align-items: center;
		display: flex;
	}
	.viewOrder
	{
		height: 50px;
		padding-left: 20upx;
		border-bottom: 10upx solid #F5F5F5;
		justify-content: space-between;
		align-items: center;
		display: flex;
	}
	.viewOrder2
	{
		height: 50px;
		justify-content: center;
		align-items: center;
		display: flex;
	}
	.orderTxtAll
	{
		font-size: 16sp;
		color: #BBBABB;
	}
	.orderTxt
	{
		font-size: 16sp;
		color: $font-color-dark;
	}
	.imgOrder
	{
		width: 8px;
		margin-right: 10px;
		margin-left: 10px;
		height: 14px;
		
	}
	
</style>