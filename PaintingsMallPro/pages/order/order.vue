<template>
	<view class="content">
		<view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view 
					class="list-scroll-content" 
					scroll-y
					@scrolltolower="loadData"
				>
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>
					
					<!-- 订单列表 -->
					<view 
						v-for="(item,index) in tabItem.orderList" :key="index"
						class="order-item"
					>
						<view class="i-top b-b">
							<text class="time">订单时间：{{item.createTime}}</text>
							<text class="state" v-if="item.orderStatus==='WAITING'">待支付</text>
							<text class="state" v-if="item.orderStatus==='PAID'">待发货</text>
							<text class="state" v-if="item.orderStatus==='RECEIPT'">待收货</text>
							<text class="state" v-if="item.orderStatus==='OVER'">已完成</text>
							<text class="state" v-if="item.orderStatus==='CANCELED'">已取消</text>
						</view>
						
						<scroll-view v-if="item.goods.length > 1" class="goods-box" scroll-x>
							<view
								v-for="(goodsItem, goodsIndex) in item.goods" :key="goodsIndex"
								class="goods-item"
							>
								<image class="goods-img" :src="goodsItem.coverImg" mode="aspectFill"></image>
							</view>
						</scroll-view>
						<view 
							v-if="item.goods.length === 1" 
							class="goods-box-single"
							v-for="(goodsItem, goodsIndex) in item.goods" :key="goodsIndex"
						>
							<image class="goods-img" :src="goodsItem.coverImg" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{goodsItem.name}}</text>
								<text class="attr-box">{{goodsItem.desc}}  </text>
								
								<view class="viewNum">
								<view class="viewPrice">
									<text class="price">{{goodsItem.price}}</text>
									<text class="priceYuan">{{goodsItem.cost}}</text>
								</view>
								<text class="">x {{goodsItem.number}}</text>
								</view>
							</view>
						</view>
						
						<view class="price-box">
							共
							<text class="num">{{item.number}}</text>
							件商品 总金额
							<text class="price">{{item.price}}</text>
						</view>
						<view class="action-box b-t" v-if="item.orderStatus==='WAITING' ">
							<button class="action-btn" @click="cancelOrder(item.id)">取消订单</button>
							<button class="action-btn recom" @click="payOrder(item.id)">去支付</button>
						</view>
						<view class="action-box b-t" v-if="item.orderStatus==='PAID' ">
							<button class="action-btn" @click="cancelOrder(item.id)">取消订单</button>
						</view>
						<view class="action-box b-t" v-if="item.orderStatus==='RECEIPT' ">
							<button class="action-btn" @click="sureOrder(item)">确认收货</button>
						</view>
						<view class="action-box b-t" v-if="item.orderStatus==='CANCELED' ">
							<button class="action-btn" @click="deleteOrder(item.id)">删除订单</button>
						</view>
					</view>
					 
					
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template> 

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import Json from '@/Json';
	var token =""
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [{
						state: "",
						text: '全部',
						loadingType: 'more',
						orderList: []
					},
					{
						state: "WAITING",
						text: '待支付',
						loadingType: 'more',
						orderList: []
					},
					{
						state: "PAID",
						text: '待发货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: "RECEIPT",
						text: '待收货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: "OVER",
						text: '已完成',
						loadingType: 'more',
						orderList: []
					}
				],
			};
		},
		
		onLoad(options){
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			token = uni.getStorageSync("token")
			this.tabCurrentIndex = +options.state;
			// #ifndef MP
			this.loadData()
			// #endif
			// #ifdef MP
			if(options.state == 0){
				this.loadData()
			}
			// #endif
			
		},
		 
		methods: {
			//获取订单列表
			loadData(){
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				
				var _this =this
				var dataAll=
				{
					
				}
				
				if(state==="")
				{//全部
					 dataAll=
					{
						pageNum:"0",
						pageSize:"100"
					}
				}else
				{//非全部
					dataAll=
					{
						orderStatus:state,
						pageNum:"0",
						pageSize:"100"
					}
				}
				uni.request({
				    url:this.$url+'/order/search' ,//服务器端地址
				    data: dataAll,
				    method: 'POST',
				    header: {
				        'content-type': 'application/json',
						'token':token,
				    },
				    success: (res) => { 
						console.log(res.data)
				        if (res.data.code == 200) {
							_this.navList[index].orderList=res.data.data.content
							console.log(_this.navList)
				        }
				    }
				   
				});
			}, 

			//swiper 切换
			changeTab(e){
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			//顶部tab点击
			tabClick(index){
				this.tabCurrentIndex = index;
			},
			
			//删除订单
			deleteOrder(id){
				var _this =this
				uni.showModal({
					title:"提示",
					content:"确定要删除订单吗？",
					confirmText:"确定",
					confirmColor:"#333233",
					cancelText:"取消",
					cancelColor:"#909399",
					success() {
						uni.request({
						    url:_this.$url+'/order/delete/'+id ,//服务器端地址
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
									_this.loadData()
									uni.hideLoading()
									_this.$api.msg(res.data.data)
						        }
						    }
						   
						});
					}
				})
				
				
			},
			//取消订单
			cancelOrder(id){
				
				var _this =this
				uni.showModal({
					title:"提示",
					content:"确定要取消订单吗？",
					confirmText:"确定",
					confirmColor:"#333233",
					cancelText:"取消",
					cancelColor:"#909399",
					success() {
						uni.request({
						    url:_this.$url+'/order/cancel/'+id ,//服务器端地址
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
									_this.loadData()
									uni.hideLoading()
									_this.$api.msg(res.data.data)
						        }
						    }
						   
						});
					}
				})
				
				
			},
				payOrder(orderId){
					var _this = this
					console.log(orderId)
					uni.request({
					    url:this.$url+'/order/pay/'+orderId ,//服务器端地址
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
					       uni.requestPayment({
					           timeStamp:res.data.data.timeStamp,
					           nonceStr:res.data.data.nonceStr,
					           package: res.data.data.packageValue,
					           signType:res.data.data.signType,
					           paySign:res.data.data.paySign,
					           success(res) {
								   uni.navigateTo({
								   	url: `/pages/money/paySuccess`
								   })
					           },
					           fail(err) {
								   
					           }
					       });
							}

					    }
					   
					});
					},
			//订单状态文字和颜色
			orderStateExp(state){
				let stateTip = '',
					stateTipColor = '#333233';
					
					if(state==="WAITING")
					{
						stateTip = '待支付';
					}
					if(state==="PAID")
					{
						stateTip = '待发货';
					}
					if(state==="RECEIPT")
					{
						stateTip = '待收货';
					}
					if(state==="OVER")
					{
						stateTip = '已完成';
					}
				
				return {stateTip, stateTipColor};
			}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}
	
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: #666566;
			position: relative;
			&.current{
				color: $base-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item{
		height: auto;
	}
	.order-item{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;
		.i-top{
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right:30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			.time{
				flex: 1;
				font-size: 12px;
			}
			.state{
				color: #333233;
			}
			.del-btn{
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;
				&:after{
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		/* 多条商品 */
		.goods-box{
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;
			.goods-item{
				width: 80px;
				height: 80px;
				display: inline-block;
				border-radius: 2px;
				margin-right: 24upx;
			}
			.goods-img{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		/* 单条商品 */
		.goods-box-single{
			display: flex;
			padding: 20upx 0;
			.goods-img{
				display: block;
				width: 120upx;
				height: 120upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;
				.title{
					font-size: 14px;
					color: $font-color-dark;
					line-height: 1;
				}
				.attr-box{
					font-size: 12px;
					color:#666566;
					padding: 10upx 12upx;
				}
				
			}
		}
		
		.price-box{
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: #333233;
			.num{
				margin: 0 8upx;
				font-size: 12px;
				color: #333233;
			}
			.price{
				font-size: 16px;
				font-weight: bold;
				color: $font-color-dark;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
			
		}
		
		.viewNum{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				.priceYuan{
					font-size: 11px;
					margin-left: 10px;
					text-decoration:line-through;
					color: #BBBABB;
					&:before{
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
		}
		.viewPrice{
			display: flex;
			flex-direction: row;
			align-items: center;
			.price{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
		.action-box{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}
		.action-btn{
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: #666566;
			background: #fff;
			border-width: 1px;
			&:after{
				border-radius: 4px;
			}
			&.recom{
				background: #fff9f9;
				color: #DFC4A0;
				border-radius: 4px;
				&:after{
					border-color: #DFC4A0;
				}
			}
		}
	}
	
	
	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}
	
	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}
	
	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	
	.uni-load-more__img>view {
		position: absolute
	}
	
	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}
	
	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}
	
	.load2 {
		transform: rotate(30deg)
	}
	
	.load3 {
		transform: rotate(60deg)
	}
	
	.load1 view:nth-child(1) {
		animation-delay: 0s
	}
	
	.load2 view:nth-child(1) {
		animation-delay: .13s
	}
	
	.load3 view:nth-child(1) {
		animation-delay: .26s
	}
	
	.load1 view:nth-child(2) {
		animation-delay: .39s
	}
	
	.load2 view:nth-child(2) {
		animation-delay: .52s
	}
	
	.load3 view:nth-child(2) {
		animation-delay: .65s
	}
	
	.load1 view:nth-child(3) {
		animation-delay: .78s
	}
	
	.load2 view:nth-child(3) {
		animation-delay: .91s
	}
	
	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}
	
	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}
	
	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}
	
	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}
	
	@-webkit-keyframes load {
		0% {
			opacity: 1
		}
	
		100% {
			opacity: .2
		}
	}
</style>
