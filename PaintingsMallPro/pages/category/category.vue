<template>
	<view class="content">
		<view class="mp-search-box">
			<input class="ser-input" type="text" placeholder="搜索你需要的商品热门关键词"  disabled />
		</view>
				<view class="navbar">
					<scroll-view scroll-x="true" class="scoll-xCss">
					<view class="navItem" v-for="(item, index) in navList" :key="index"  @click="tabClick(index)">
						<view class="vM">
							<image class="cIcon" :src="item.icon"></image>
							<view  class="nav-item" :class="{ current: tabCurrentIndex === index }">
						{{ item.name }}
							</view>
							</view>
					</view>
					</scroll-view>
				</view>
				
		
	<view class="content2">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in navList[tabCurrentIndex].children" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item)">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
					<view  class="t-item" v-for="(item, index) in tlist" :key="index" @click="navToDetailPage(item.id)" >
						<image :src="item.coverImg"  mode="aspectFit"></image>
						<view class="t-itemView">
							<text class="title">{{item.name}}</text> 
							<text class="titleContent">{{item.desc}}</text>
							<view class="viewPrice">
								<text class="priceNow">￥{{item.price}}</text>
								<text class="priceOld">￥{{item.cost}}</text>
							</view>
						</view>
					</view>
		</scroll-view>
		</view>
	</view>
</template>

<script>
	var token= ""
	import helper from '../../common/utils.js';
	export default {
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 0,
				slist: [],
				tlist: [],
				tabCurrentIndex: 0,
							navList: [
							]
				
			}
		},
		
		onShow(option){
			this.tabCurrentIndex = 0;
			this.currentId = 0;
			this.tlist=[]
			if(helper.catePid!="")
			{
				this.initTagPid(helper.catePid)
				this.currentId = helper.cateId
			}
			
			token = uni.getStorageSync("token")
			this.loadTypeData();
		},
		onHide() {
			helper.catePid=""
			helper.cateId=""
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
			async loadTypeData(){
				var _this = this
				uni.request({
				    url:this.$url+'/goods/type/findAll' ,//服务器端地址
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
							_this.navList = res.data.data
							if(_this.currentId===0)
							{
								_this.currentId = _this.navList[0].children[0].id
							}
							
							_this.loadGoods(_this.currentId)
				        }
				    }
				   
				});
			},
			async loadGoods(id)
			{
				var _this = this
				uni.request({
				    url:this.$url+'/goods/find/byType' ,//服务器端地址
				    data: {
						id:id,
						pageNum:"0",
						pageSize:"10"
				    },
				    method: 'POST',
				    header: {
				        'content-type': 'application/json',
						'token':token,
				    },
				    success: (res) => { 
						console.log(res.data)
				        if (res.data.code == 200) {
							_this.tlist = res.data.data.content
				        }
				    }
				   
				});
			},
			initTagPid(pid)
			{
				for(var i=0;i<this.navList.length;i++)
				{
					if(pid===this.navList[i].id)
					{
						this.tabCurrentIndex = i
					}
				}
			},
			changeTab(e) {
					this.tabCurrentIndex = e.target.current;
					},
					//顶部tab点击
					tabClick(index) {
						this.tlist=[]
						this.tabCurrentIndex = index;
						this.currentId = this.navList[index].children[0].id
						this.loadGoods(this.currentId)
					},
			//一级分类点击
			tabtap(item){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				this.tlist=[]
				this.currentId = item.id;
				this.loadGoods(this.currentId)
			},
			//右侧栏滚动
			asideScroll(e){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				let scrollTop = e.detail.scrollTop;
				let tabs = this.slist.filter(item=>item.top <= scrollTop).reverse();
				if(tabs.length > 0){
					this.currentId = tabs[0].pid;
				}
			},
			//计算右侧栏每个tab的高度等信息
			calcSize(){
				let h = 0;
				this.slist.forEach(item=>{
					let view = uni.createSelectorQuery().select("#main-" + item.id);
					view.fields({
						size: true
					}, data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}).exec();
				})
				this.sizeCalcState = true;
			},
			navToList(sid, tid){
				uni.navigateTo({
					url: `/pages/product/list?fid=${this.currentId}&sid=${sid}&tid=${tid}`
				})
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
		display: flex;
		flex-direction: column;
	}
	.content2 {
		height: 100%;
		background-color: #f8f8f8;
		display: flex;
		flex-direction: row;
	}
		.mp-search-box{
			z-index: 9999;
			width: 100%;
			align-items: center;
			display: flex;
			background: #fff;
			padding: 30upx;
			justify-content: center;
			flex-direction: row;
			.ser-input{
				flex:1;
				height: 56upx;
				width: 60%;
				line-height: 56upx;
				text-align: left;
				padding-left: 20upx;
				font-size: 25upx;
				color:$font-color-base;
				border-radius: 2px;
				background: #E4DED4;
			}
		}
	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #F5F4F5;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 14sp;
		color: $font-color-base;
		position: relative;
		&.active{
			color: #ffffff;
			background: #333233;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: #ffffff;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}
	

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		height: 100px;
		justify-content: start;
		align-items: center;
		flex-direction: row;
		.t-itemView{
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin-left: 5px;
			flex-direction: column;
		}
		.viewPrice
		{
			align-items: center;
			flex-direction: row;
			display: flex;
		}
		.title{
			color: #333;
			font-size: 14px;
			font-weight: bold;
		}
		.titleContent{
			color: #999999;
			font-size: 12px;
			font-weight: bold;
		}
		
		
		.priceNow{
			color: #DFC4A0;
			font-size: 16px;
			font-weight: bold;
		}
		.priceOld{
			color: #BBBABB;
			margin-left: 10upx;
			font-size: 11px;
			text-decoration: line-through;
		}
		image{
			width: 80px;
			height: 80px;
		}
	}
	
	.swiper-box {
		height: calc(100% - 40px);
	}
	.list-scroll-content {
		height: 100%;
	}
	
	.navbar {
		display: flex;
		flex-direction: row;
		background: #fff;
		height: 140px;
		padding-left:20upx;
		padding-right: 20upx;
		z-index: 10;
		align-items: center;
		justify-content: space-between;
	}
	.navItem
	{
		width: 90px;
		margin-left: 5px;
		margin-top: 5px;
		display: inline-block;
		align-items: center;
		height: 90px;
		background: #fff;
		flex-direction: column;
	}
	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 12px;
		color:#333233;
		position: relative;
		&.current {
			color: #333233;
			&:after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 40px;
				height: 0;
				border-bottom: 4px solid #333233;
			}
		}
	}
	.cIcon
	{
		width: 50px;
		margin-left: 20px;
		height: 50px;
	}
	.scoll-xCss
	{
		width: 100%;
		background: #FFFFFF;
        white-space: nowrap;
	}
	.vM
	{
		align-content: center;
		display: flex;
		flex-direction: column;
		width: 90px;
		height: 90px;
		justify-content: center;
	}
	 .bookshelf-content {
	        white-space: nowrap; // 滚动必须加的属性
	        width: 100%;
	        height: 120px;
	        padding: 20upx;
			align-content: center;
			background: #909399;
	        margin: 0 auto;
	        .item {
	          width: 24%;
			  height: 100px;
	          margin-right: 20upx;
	          display: inline-block;
	          vertical-align: top;
			  align-content: center;
			  
			  background: #4399FC;
	          .img {
	            display: inline-block;
	            image {
	              width: 50px;
	              height: 50px;
	            }
	          }
	          .item-title {
	            display: block; // 让字体换行
	            width: 90%;
	            font-size: 30upx;
	            line-height: 40upx;
	          }
	        }
			.navItem
			{
				width: 90px;
				margin-left: 5px;
				margin-top: 5px;
				display: flex;
				align-items: center;
				height: 90px;
				background: #fff;
				flex-direction: column;
			}
			.nav-item {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 12px;
				color:#333233;
				position: relative;
				&.current {
					color: #333233;
					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 40px;
						height: 0;
						border-bottom: 4px solid #333233;
					}
				}
			}
	      }
	
</style>
