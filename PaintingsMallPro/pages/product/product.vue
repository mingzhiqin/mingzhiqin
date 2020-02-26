<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in goodsData.coverImg" :key="index">
					<view class="image-wrapper">
						<image
							:src="item" 
							class="loaded" 
							mode="aspectFill"
						></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="introduce-section">
			<text class="title0">{{goodsData.name}}</text>
			<view class="price-box">
				<text class="price-tips">¥</text>
				<text class="price">{{goodsData.price}}</text>
				<text class="m-price">¥{{goodsData.cost}}</text>
			</view>
		</view>
		<view class="introduce-section">
			
			<view class="price-box">
				<text class="title2">作者</text>
				<text class="title">{{goodsData.author}}</text>
			</view>
			<view class="price-box">
				<text class="title2">题材类型</text>
				<text class="title">{{goodsData.childType}}</text>
			</view>
			<view class="price-box">
				<text class="title2">尺寸规格</text>
				<text class="title">{{goodsData.length}}*{{goodsData.width}}*{{goodsData.thickness}}</text>
			</view>
		</view>
		
		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<view class="viewImag">
				<image mode="widthFix" :src="goodsData.detailImg[0]"></image>
			</view>
			
			<!-- <rich-text :nodes="desc"></rich-text> -->
		</view>
		<view class="page-bottom">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator>
			
			<view class="viewBut">
				<button  class="add-cart-btnV" @click="car">加入购物车</button>
				<button  class="buy-now-btnV" @click="buy">立即购买</button>
			</view>
		</view>
		
		<view 
			class="popup spec" 
			:class="specClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleSpec"
		>
		</view>	
	</view>
</template>

<script>
	import share from '@/components/share';
	var token=""
	var goodsId=""
	export default{
		components: {
			share
		},
		data() {
			return {
				specClass: 'none',
				specSelected:[],
				goodsData:{},
				favorite: true,
				shareList: [],
				userInfo:{}
				
			};
		},
		onLoad(options){
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			this.userInfo = uni.getStorageSync(this.$userKey)
			token = uni.getStorageSync("token")
			goodsId = options.id; 
			this.loadGoods(goodsId)
		},
		
		methods:{
			loadGoods(id){
				var _this = this
				console.log("goodsId")
				console.log(goodsId)
				uni.request({
				    url:this.$url+'/goods/detail/'+id ,//服务器端地址
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
							_this.goodsData = res.data.data
				        }
				    },
					fail(res) {
						console.log(res)
					}
				   
				});
			},
			//购买
			buy(){
			if(!this.userInfo.nickname){
				url = '/pages/login/login';
			}else
			{
			var goodDatas=[]
			goodDatas.push(this.goodsData)
			uni.navigateTo({
				url: `/pages/order/createOrder?orders=`+encodeURIComponent(JSON.stringify(goodDatas))
			})	
			}
				
			},
			//添加购物车
			car(){
				if(!this.userInfo.nickname){
					url = '/pages/login/login';
				}else
				{
				var _this = this
				uni.request({
				    url:this.$url+'/car/add' ,//服务器端地址
				    data: {
						goodsId:goodsId
				    },
				    method: 'POST',
				    header: {
				        'content-type': 'application/json',
						'token':token,
				    },
				    success: (res) => { 
						console.log(res.data)
				        if (res.data.code == 200) {
							this.$api.msg('已添加购物车');
				        }
				    }
				   
				});
				}
			},
		
		},

	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
		padding-bottom: 160upx;
	}
	.viewImag
	{
		width: 100%;
		align-items: center;
		display: flex;
		justify-content: center;
		padding: 10px;
		
	}
	.imageDetail
	{
		
	}
	
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	
	.carousel {
		height: 722upx;
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
	}
	
	/* 标题简介 */
	.introduce-section{
		background: #fff;
		padding: 20upx 30upx;
		border-bottom: 10upx solid #F5F5F5;
		.title0{
			font-size: 16px;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}
		
		.title{
			font-size: 14px;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}
		.title2{
			font-size: 14px;
			color: #999999;
			height: 50upx;
			width: 80px;
			line-height: 50upx;
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:$uni-color-primary;
		}
		.price{
			font-size: $font-lg + 2upx;
			color: #DFC4A0;
		}
		.price-tips
		{
			font-size: $font-lg  2upx;
			color: #DFC4A0;
		}
		.m-price{
			margin:0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx); 
		}
		.bot-row{
			display:flex;
			align-items:center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;
			text{
				flex: 1;
			}
		}
	}
	/* 分享 */
	.share-section{
		display:flex;
		align-items:center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;
		.share-icon{
			display:flex;
			align-items:center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position:relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;
			&:after{
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position:absolute;
				background: $uni-color-primary;
			}
		}
		.icon-xingxing{
			position:relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}
		.tit{
			font-size: $font-base;
			margin-left:10upx;
		}
		.icon-bangzhu1{
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}
		.share-btn{
			flex: 1;
			text-align:right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}
		.icon-you{
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}
	
	.c-list{
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 30upx;
			position:relative;
		}
		.tit{
			width: 140upx;
		}
		.con{
			flex: 1;
			color: $font-color-dark;
			.selected-text{
				margin-right: 10upx;
			}
		}
		.bz-list{
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}
		.red{
			color: $uni-color-primary;
		}
	}
	
	
	/*  详情 */
	.detail-desc{
		background: #fff;
		.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;
				
			text{
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc; 
			}
		}
	}
	
	
	
	
	/* 底部操作菜单 */
	.page-bottom{
		position:fixed;
		bottom:0upx;
		z-index: 95;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100upx;
		background: rgba(255,255,255,.9);
		
		
		.viewBut
		{
			justify-content: center;
			align-items: center;
			flex-direction: row;
			display: flex;
			margin-right: 20upx;
		}
		.add-cart-btnV
		{
			background: #DFC4A0;
			height: 80upx ;
			width: 35vw;
			font-size: 18sp;
			color: #fff;
			border-top-left-radius: 5px;
			border-bottom-left-radius: 5px;
			border-top-right-radius: 0px;
			border-bottom-right-radius: 0px;
		}
		.add-cart-btnV::after
		{
			border: none;
		}
		
		.buy-now-btnV
		{
			background: #333233;
			height: 80upx ;
			width: 35vw;
			font-size: 18sp;
			color: #fff;
			border-top-left-radius: 0px;
			border-bottom-left-radius: 0px;
			border-top-right-radius: 5px;
			border-bottom-right-radius: 5px;
		}
		.p-b-btn{
			display:flex;
			flex-direction: column;
			align-items: center;
			margin-left: 20upx;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;
			.yticon{
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}
			&.active, &.active .yticon{
				color: $uni-color-primary;
			}
			.icon-fenxiang2{
				font-size: 42upx;
				transform: translateY(-2upx);
			}
			.icon-shoucang{
				font-size: 46upx;
			}
		}
		.action-btn-group{
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30,#fa436a,#F56C6C);
			margin-left: 20upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255,255,255,.5);
			}
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $font-base ;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
	
</style>
