<template>
	<view class="container">
		<view class="mp-search-box">
			<image src="../../static/icon_b.png" class="icon_b"></image>
			<input class="ser-input" type="text"  v-model="ipt"  placeholder="搜索你需要的商品热门关键词"   />
			<text class="srcTxt" @click="srcSub">搜索</text>
		</view>
	 <!-- 搜索历史 -->
	        <view class="searchBotBox" v-if="!isShowHist">
	            <view class="ov">
	                <view class="fl">搜索历史</view>
	                <view @tap="clearKey" class="fr grace-more-r grace-search-remove">
	                    <image src="../../static/sc.png" mode=""></image>
	                    </view>
	            </view>
	            <view class="searchHistoryBox">
	                <view class="searchHistoryBoxItem" v-for="(item,index) in searchKey" :key='index' @click="qusousuo(item)">
	                    {{item}}
	                </view>
	            </view>
	        </view>
			<view class="viewNone" v-if="goodsList.length==0&&isShowHist">
				<image class="imgNone" src="../../static/zwsj.png"></image>
				<text class="txtNone">暂无数据</text>
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
	export default {

		data() {
			return {
				goodsList: [],
				searchKey: [],
				ipt:'',
				searchClose: true,
				jiaodian:true,
				isShowHist:false,
			};
		},

		onShow() {
			token = uni.getStorageSync("token")
			try{
			    var vv = uni.getStorageSync('searchLocal') || "";
			    if(vv) {
			        this.searchKey = JSON.parse(vv);
			    } else {
			        this.searchKey = [];
			    }
			} catch(e){
			    console.log(e)
			}
		},
		methods: {
			//详情页
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				console.log(item)
				uni.navigateTo({
					url: `/pages/product/product?id=${item}`
				})
			},
			 clearKey: function() {
			                var that = this;
			                uni.showModal({
			                    title: '提示',
			                    content: '点击确定将删除所有历史信息，确定删除吗？',
			                    success: function(res) {
			                        // if (res.confirm) {
			                            that.searchKey = [];
			                            uni.setStorage({
			                                key: 'searchLocal',
			                                data: that.searchKey
			                            });
			//                      } else if (res.cancel) {
			//
			//                      }
			                    }
			                });
			 
			            },
			           
			            qusousuo(e){
			                console.log(e);
			                this.ipt = e;
			               
			            },
					srcSub()
					{
				
				                if (this.ipt == '') {
				                    uni.showToast({
				                        title: '未输入搜索关键字',
				                        icon: 'none',
				                        duration: 1000
				                    });
				                    return false;
				                }
								this.isShowHist = true
				                var that = this;
				                var newArr = that.searchKey;
				                console.log(newArr.length)
				                if(this.searchKey.indexOf(this.ipt) == -1){
				                    newArr.unshift(this.ipt);
				                }
				                if(newArr.length >= 11 ){
				                    newArr.pop()
				                }
				                console.log(newArr.length)
				                newArr = JSON.stringify(newArr);//转换成json格式的数据
				                uni.setStorage({
				                    key: 'searchLocal',
				                    data: newArr
				                });
								this.loadGoods()
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
			loadGoods()
			{
				var _this = this
				uni.request({
				    url:this.$url+'/goods/search' ,//服务器端地址
				    data: {
						keywords:_this.ipt,
						pageNum:"0",
						pageSize:"10",
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
			
		},
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			this.$api.msg('点击了搜索框');
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.$api.msg('点击了扫描');
			} else if (index === 1) {
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
		}
		// #endif
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
	
	.srcTxt
	{
		font-size: 12px;
		color: #333233;
		margin-left: 10px;
	}
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
		justify-content: space-around;
		align-items: center;
		flex-wrap:wrap;
		padding: 30upx 22upx; 
		background: #fff;
		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 23%;
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
		
	
	.viewNone
	{
		align-items: center;
		display: flex;
		justify-content: center;
		flex-direction: column;
		.imgNone
		{
			width: 116px;
			height: 75px;
			margin-top: 60px;
			
		}
		.txtNone
		{
			font-size: 11px;
			color: #BBBABB;
			margin-top: 30px;
		}
	}
	/* 猜你喜欢 */
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			margin-bottom: 10px;
			margin-top: 10px;
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
	.u1{
	        display: flex;
	        justify-content: space-between;
	        padding-top: 20upx;
	        padding-bottom: 15upx;
	        .sousuo{
	            display: flex;
	            position: relative;
	            input{
	                font-size: 24upx;
	                line-height: 28upx;
	                border-bottom:1px solid #f5f5f5;
	                width: 515upx;
	            }
	            image{
	                width: 35upx;
	                height: 35upx;
	                position: absolute;
	                right: 30upx;
	                z-index: 3;
	            }
	        }
	    }
	    .ov {
	        overflow: hidden;
	    }
	 
	    .fl {
	        float: left;
	        font-family: PingFang-SC-Medium;
	        font-size: 14px;
	        font-weight: normal;
	        font-stretch: normal;
	        line-height: 20px;
	        letter-spacing: 0px;
	        color: #333233;
	    }
	 
	    .fr {
	        float: right;
	    }
	    .fr image{
	        width:35upx;
	        height: 37upx;
	    }
	    .searchTopBox {
	        width: 100%;
	        background-color: #0b877f;
	        height: 100upx;
	        box-sizing: border-box;
	        padding-top: 15upx;
	    }
	 
	    .searchBoxRadius {
	        width: 90%;
	        height: 70upx;
	        background-color: #fff;
	        margin-left: 5%;
	        overflow: hidden;
	        border-radius: 35upx;
	    }
	 
	    .searchBoxIcon {
	        font-size: 40upx;
	        margin-top: 20upx;
	        margin-left: 20upx;
	        float: left;
	    }
	 
	    .searchBoxIpt {
	        height: 70upx;
	        line-height: 70upx;
	        margin-left: 20upx;
	        float: left;
	    }
	 
	    .searchBotBox {
	        width: 100%;
	        margin-top: 30upx;
	        padding: 15upx 3%;
	        box-sizing: border-box;
	    }
	 
	    .searchHistoryBox {
	        width: 100%;
	        box-sizing: border-box;
	        overflow: hidden;
	        margin-top: 20upx;
	    }
	 
	    .searchHistoryBoxItem {
	        float: left;
	        font-size: 12px;
	        color: #999899;
	        line-height: 49upx;
	        height: 50upx;
	        padding: 0 20upx;
	        border-radius: 50upx;
			background:#DCDFE6;
	        margin:15upx 30upx 15upx 0;
	        text-align: center;
	    }

</style>
