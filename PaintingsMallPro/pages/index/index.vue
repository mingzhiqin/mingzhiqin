<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box" @click="serGoods()">
			<image src="../../static/icon_b.png" class="icon_b"></image>
			<input class="ser-input"  type="text" placeholder="搜索你需要的商品热门关键词"  disabled />
		</view>
		<!-- #endif -->
		<view class="nocCss">通告:{{nocStr}}</view>
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<!-- 背景色区域 -->
			<view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view>
			<swiper class="carousel" circular @change="swiperChange">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToDetailPage(item.goodsId)">
					<image :src="item.img" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>
			<view class="labelCss">
				<view class="labelView">
					<image class="imgLabel" src="../../static/baoyou.png"></icon>
					<label class="labeltxt">顺丰包邮</label>
				</view>
				<view class="labelView">
					<image class="imgLabel" src="../../static/baozhang.png"></icon>
					<label class="labeltxt">正品保障</label>
				</view>
				<view class="labelView">
					<image class="imgLabel" src="../../static/shengqian.png"></icon>
					<label class="labeltxt">多快好省</label>
				</view>
			</view>
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item" v-for="(item, index) in menus" :key="index"  @click="navToCatePage(item.id,item.parentId)">
				<image :src="item.icon"></image>
				<text class="txtmenu">{{item.name}}</text>
			</view>
		</view>
		

		<!-- 猜你喜欢 -->
		<view class="f-header m-t">
			<view class="tit-box">
				<text class="tit">猜你喜欢</text>
			</view>
			<text ></text>
		</view>
		
		<view class="guess-section">
			<view 
				v-for="(item, index) in goodsList" :key="index"
				class="guess-item"
				
			>
				<view class="image-wrapper" @click="navToDetailPage(item.id)">
					<image :src="item.coverImg[0]" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.name}}</text>
				<text class="author">{{item.author}}</text>
				<view class="viewGood">
				<view class="viewPrice">
					<text class="priceNow">￥{{item.price}}</text>
					<text class="priceOld">￥{{item.cost}}</text>
				</view>
				<image class="goodBuy" @click="car(item.id)" src="../../static/goumai.png"></image>
				</view>
				
			</view>
		</view>
		

	</view>
</template>

<script>
	var token=""
	import helper from '../../common/utils.js';
	export default {
		data() {
			return {
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				goodsList: [],
				nocStr:"",
				menus:[], 
			};
		},
		onLoad(option) {
			console.log("onLoad")
			//邀请ID
			if(option.id)
			{
				console.log(option.id)
				helper.invitaId = option.id
			}
		},

		onShow() {
			token = uni.getStorageSync("token")
			this.loadGoods();
			this.loadBanner();
			this.loadNoc();
			this.categryData();
		},
		methods: {
			
			loadBanner()
			{
				var _this = this
				uni.request({
				    url:this.$url+'/goods/coverImg/3' ,//服务器端地址
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
							_this.carouselList = res.data.data,
							_this.swiperLength = _this.carouselList.length
				        }
				    }
				   
				});
			},
			loadGoods()
			{
				var _this = this
				uni.request({
				    url:this.$url+'/goods/recommend' ,//服务器端地址
				    data: {
						pageNum:"0",
						pageSize:"6"
				    },
				    method: 'POST',
				    header: {
				        'content-type': 'application/json',
						'token':token,
				    },
				    success: (res) => { 
						console.log(res.data)
				        if (res.data.code == 200) {
							_this.goodsList = res.data.data.content
				        }
				    }
				   
				});
			},
			loadNoc()
			{
				var _this = this
				uni.request({
				    url:this.$url+'/user/notice' ,//服务器端地址
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
							_this.nocStr = res.data.data
				        }
				    }
				   
				});
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].background;
			},
			car(goodsId){
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
			},
			categryData(){
				var _this = this
				uni.request({
				    url:this.$url+'/goods/type/recommend' ,//服务器端地址
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
							_this.menus= res.data.data
							
				        }
				    }
				   
				});
			},
			//详情页
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				console.log(item)
				uni.navigateTo({
					url: `/pages/product/product?id=${item}`
				})
			},
			//分类
			navToCatePage(item,pId) {
				//测试数据没有写id，用title代替
				console.log(item)
				console.log(pId)
				helper.cateId = item
				helper.catePid = pId
				uni.switchTab({
					url: '/pages/category/category'
				})
			},
			serGoods()
			{
				console.log("点击了")
				uni.navigateTo({
					url: `/pages/search/search`
				})
			}
		},
		
		
	}
</script>

<style lang="scss">
	/* #ifdef MP */
	.mp-search-box{
		z-index: 9999;
		width: 100%;
		align-items: center;
		display: flex;
		padding: 30upx;
		justify-content: center;
		background: #E4DED4;
		flex-direction: row;
		.ser-input{
			flex:1;
			height: 56upx;
			width: 60%;
			line-height: 56upx;
			text-align: left;
			padding-left: 20upx;
			font-size: 25upx;
			margin-left: 20upx;
			color:$font-color-base;
			border-radius: 2px;
			background: rgba(255,255,255,.6);
		}
	}
	
	page{
		.cate-section{
			position:relative;
			z-index:5;
		}
		.carousel-section{
			padding: 0;
			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}
			.carousel{
				.carousel-item{
					padding: 0;
				}
			}
			.swiper-dots{
				left:45upx;
				bottom:40upx;
			}
		}
	}
	/* #endif */
	
	
	page {
		background: #f5f5f5;
	}
	.m-t{
		margin-top: 16upx;
	}
	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding-top: 10px;

		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}
	.carousel {
		width: 100%;
		height: 350upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
		}
	}
	.labelCss{
		align-items: center;
		display: flex;
		height: 60upx;
		padding-left: 30upx;
		padding-right: 30upx;
		flex-direction: row;
		background: #E4DED4;
		justify-content: space-between;
		.labelView{
		align-items: center;
		display: flex;
		flex-direction: row;
		height: 60upx;
		justify-content: center;
		}
		.imgLabel
		{
			width: 35upx;
			height: 35upx;
		}
		.labeltxt
		{
			font-size: 24upx;
			color: #000000;
			margin-left: 10upx;
		}
	}
	.nocCss{
		height: 60upx;
		background: rgba(0,0,0,0.5);
		font-size: 28upx;
		align-items: center;
		display: flex;
		padding-left: 20upx;
		color: #ffffff;
	}
	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}
	
	/* 分类 */
	.cate-section {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap:wrap;
		padding: 30upx 22upx; 
		background: #fff;
		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 24%;
			height: 150upx;
			margin-top: 20upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
		}
		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 78upx;
			height: 78upx;
			margin-bottom: 14upx;
			opacity: .7;
		}
		
		.txtmenu
		{
			font-size: 28upx;
			color: #000;
			margin-top: 15upx;
		}
	}
	.ad-1{
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;
		image{
			width:100%;
			height: 100%; 
		}
	}
	/* 秒杀专区 */
	.seckill-section{
		padding: 4upx 30upx 24upx;
		background: #fff;
		.s-header{
			display:flex;
			align-items:center;
			height: 92upx;
			line-height: 1;
			.s-img{
				width: 140upx;
				height: 30upx;
			}
			.tip{
				font-size: $font-base;
				color: $font-color-light;
				margin: 0 20upx 0 40upx;
			}
			.timer{
				display:inline-block;
				width: 40upx;
				height: 36upx;
				text-align:center;
				line-height: 36upx;
				margin-right: 14upx;
				font-size: $font-sm+2upx;
				color: #fff;
				border-radius: 2px;
				background: rgba(0,0,0,.8);
			}
			.icon-you{
				font-size: $font-lg;
				color: $font-color-light;
				flex: 1;
				text-align: right;
			}
		}
		.floor-list{
			white-space: nowrap;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 150upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 150upx;
				height: 150upx;
				border-radius: 6upx;
			}
			
			.price{
				color: $uni-color-primary;
			}
			
		}
		
		
	}
	.viewGood{
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		
		display: flex;
		
	}
	.viewPrice
	{
		align-items: center;
		flex-direction: row;
		display: flex;
	}
	.priceNow{
		color: #333;
		font-size: 30upx;
		font-weight: bold;
	}
	.priceOld{
		color: #BBBABB;
		margin-left: 10upx;
		font-size: 20upx;
		text-decoration: line-through;
	}
	.f-header{
		display:flex;
		align-items:center;
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;
		image{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit{
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}
		.tit2{
			font-size: $font-sm;
			color: $font-color-light;
		}
		.icon-you{
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}
	.icon_b
	{
		width: 66upx;
		height:  50upx;
	}
	.goodBuy
	{
		width: 50upx;
		margin-right: 10upx;
		height: 50upx;
	}
		
		/* 团购楼层 */
	.group-section{
		background: #fff;
		.g-swiper{
			height: 650upx;
			padding-bottom: 30upx;
		}
		.g-swiper-item{
			width: 100%;
			padding: 0 30upx;
			display:flex;
		}
		image{
			width: 100%;
			height: 460upx;
			border-radius: 4px;
		}
		.g-item{
			display:flex;
			flex-direction: column;
			overflow:hidden;
		}
		.left{
			flex: 1.2;
			margin-right: 24upx;
			.t-box{
				padding-top: 20upx;
			}
		}
		
		.right{
			flex: 0.8;
			flex-direction: column-reverse;
			.t-box{
				padding-bottom: 20upx;
			}
		}
		.t-box{
			height: 160upx;
			font-size: $font-base+2upx;
			color: $font-color-dark;
			line-height: 1.6;
		}
		.price{
			color:$uni-color-primary;
		}
		.m-price{
			font-size: $font-sm+2upx;
			text-decoration: line-through;
			color: $font-color-light;
			margin-left: 8upx;
		}
		.pro-box{
			display:flex;
			align-items:center;
			margin-top: 10upx;
			font-size: $font-sm;
			color: $font-base;
			padding-right: 10upx;
		}
		.progress-box{
			flex: 1;
			border-radius: 10px;
			overflow: hidden;
			margin-right: 8upx;
		}
	}
	/* 分类推荐楼层 */
	.hot-floor{
		width: 100%;
		overflow: hidden;
		margin-bottom: 20upx;
		.floor-img-box{
			width: 100%;
			height:320upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(rgba(255,255,255,.06) 30%, #f8f8f8);
			}
		}
		.floor-img{
			width: 100%;
			height: 100%;
		}
		.floor-list{
			white-space: nowrap;
			padding: 20upx;
			padding-right: 50upx;
			border-radius: 6upx;
			margin-top:-140upx;
			margin-left: 30upx;
			background: #fff;
			box-shadow: 1px 1px 5px rgba(0,0,0,.2);
			position: relative;
			z-index: 1;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 180upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
			}
			.price{
				color: $uni-color-primary;
			}
		}
		.more{
			display:flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-shrink: 0;
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
			background: #f3f3f3;
			font-size: $font-base;
			color: $font-color-light;
			text:first-child{
				margin-bottom: 4upx;
			}
		}
	}
	/* 猜你喜欢 */
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			margin-bottom: 10px;
			border-radius: 5px 5px;
			padding-bottom: 20upx;
			 box-shadow: 2rpx 2rpx 10rpx 3rpx #f0f0f0;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-left: 10upx;
			line-height: 80upx;
		}
		
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
		
		.author{
			margin-left: 10upx;
			color: #333;
			font-size: 30upx;
		}
	}
	

</style>
