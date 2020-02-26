<template>
	<view class="contentIn">
	<view class="tab-box">
	    <block v-for="(item, index) in tabList" :key="index" >
			<view v-if="item=='我的邀请'" class="item" :class="{active:currentIndex==0}" @click="tabBtn(index)" >
			    {{item}}({{number}})
			</view>
	        <view v-if="item=='排行榜'" class="item" :class="{active:currentIndex==1}" @click="tabBtn(index)" >
	            {{item}}
	        </view>
	    </block>
	</view>
	<view class="myInvita" v-if="currentIndex==0" v-for="(item, index) in myInList" :key="index"  >
		<view class="invitaItme">
			
			<image class="icon" :src="item.avatar"></image>
			<text class="txtName">{{item.nickname}}</text>
		</view>
		<text class="txtDate">{{item.createTime}}</text>
	</view>
	
	<view class="myInvita"  v-if="currentIndex==1" v-for="(item, index) in inNoList" :key="index">
		
		<view class="invitaItme">
			<image class="icon1"  v-if="index==0" src="../../static/diyi.png"></image>
			<image class="icon1"  v-if="index==1" src="../../static/dier.png"></image>
			<image class="icon1"  v-if="index==2" src="../../static/disan.png"></image>
			<image class="icon1"  v-if="index>2" src="../../static/qita.png"></image>
			<image class="icon" :src="item.avatar"></image>
			<text class="txtName">{{item.nickname}}</text>
		</view>
		<text class="txtNumber">已邀请：{{item.number}}人</text>
	</view>
	<view class="contentIn" v-if="currentIndex==0&&myInList.length==0">
	<image src="../../static/zwsj.png" class="zanwuIcon" ></image>
	<text class="txtDate">暂无数据</text>
	</view>
	
	<view class="contentIn" v-if="currentIndex==1&&inNoList.length==0">
	<image src="../../static/zwsj.png" class="zanwuIcon" ></image>
	<text class="txtDate">暂无数据</text>
	</view>
	<button @click="nav()" class="button" v-if="currentIndex==0" style='position:fixed;bottom:0'>生成邀请海报</button>
	</view>
</template>

<script>
	var token =""
	export default {
		data() {
			return {
				  tabList:['我的邀请','排行榜'],
				  currentIndex:0,
				  number:0,
				  myInList:[
							],
				  inNoList:[{
							avatar: "http://pic4.zhimg.com/50/v2-2ef01343920e66f878b05ff380d902d7_hd.jpg",
							id: "string",
							nickname: "张三",
							number: 991
							},{
							avatar: "http://pic4.zhimg.com/50/v2-2ef01343920e66f878b05ff380d902d7_hd.jpg",
							id: "string",
							nickname: "李四",
							number: 9
							},{
							avatar: "http://pic4.zhimg.com/50/v2-2ef01343920e66f878b05ff380d902d7_hd.jpg",
							id: "string",
							nickname: "王五",
							number: 88
							},{
							avatar: "http://pic4.zhimg.com/50/v2-2ef01343920e66f878b05ff380d902d7_hd.jpg",
							id: "string",
							nickname: "小明",
							number: 91
							}]
			}
		},
		onLoad() {
			token = uni.getStorageSync("token")
			
			this.loadMyInvitaData()
			this.loadRankData()
		},
		methods: {
			tabBtn(index)
			{
				console.log(index)
			    this.currentIndex=index;
			},
			//获取我的邀请数据
			loadMyInvitaData()
			{
				var _this =this
				uni.request({
				    url:_this.$url+'/user/invite/my' ,//服务器端地址
				    data: {
						pageNum: 0,
						pageSize: 100
				    },
				    method: 'POST',
				    header: {
				        'content-type': 'application/json',
						'token':token,
				    },
				    success: (res) => { 
						console.log(res.data)
				        if (res.data.code == 200) {
							_this.myInList = res.data.data.content
							_this.number = _this.myInList.length
				        }
				    }
				   
				});
			},
			//获取我的邀请数据
			loadRankData()
			{
				var _this =this
				uni.request({
				    url:_this.$url+'/user/invite/ranking' ,//服务器端地址
				    data: {
						pageNum: 0,
						pageSize: 100
				    },
				    method: 'POST',
				    header: {
				        'content-type': 'application/json',
						'token':token,
				    },
				    success: (res) => { 
						console.log(res.data)
				        if (res.data.code == 200) {
							_this.inNoList = res.data.data.content
				        }
				    }
				   
				});
			},
			nav()
			{
				uni.navigateTo({
					url:"../showinvita/showinvita"
				})
			},
			
		}
	}
</script>

	
<style>
	.contentIn
	{
		align-items: center;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.myInvita
	{
		align-items: center;
		flex-direction: row;
		height: 54px;
		width: 100%;
		
		border-bottom: 1upx solid #F5F5F5;
		justify-content: space-between;
		display: flex;
		
	}
	.icon
	{
		width: 34px;
		margin-left: 10px;
		height: 34px;
		border-radius: 17px;
	}
	.zanwuIcon
	{
		width: 116px;
		margin-top: 50px;
		margin-bottom: 30px;
		height: 75px;
	}
	.icon1
	{
		width: 18px;
		margin-left: 10px;
		height: 24px;
	}
	.txtName
	{
		color: #333333;
		margin-left: 5px;
		font-size: 17px;
	}
	.txtNumber
	{
		color: #333333;
		align-items: center;
		justify-content: flex-start;
		display: flex;
		margin-left: 5px;
		font-size: 17px;
		width: 130px;
	}
	.txtDate
	{
		margin-right: 10px;
		color: #DDDDDD;
		font-size: 16px;
	}
	.invitaItme
	{
		
		align-items: center;
		justify-content: center;
		flex-direction: row;
		height: 54px;
		display: flex;
	}
 .tab-box{
     width: 100%;
     display: flex;
	 height: 50px;
	 box-shadow:0px 2px 5px 5px #F5F5F5;
     align-items: center;
     justify-content: space-around;
     background: #FFFFFF;
     padding: 0 20rpx;
     
 }
 .item{
     padding: 20rpx 0;
     color: #333;
	 width: 90%;
     font-size: 34rpx;
     text-align: center;
     position: relative;
 }
 .item:before{//下划线的样式
     content: '';
     position: absolute;
     width: 0;
     bottom: 0;
	 font-size: 19px;
	 color: #333233;
     left: 100%;//这个是重点，默认从右到左延伸的效果
     height: 6rpx;
     transition: 0.2s all linear;//all表示包括left和width的过渡动画
     background: #333233;
 }
 .active{
     color:#333233 ;
 }
 .active:before{
     width: 100%;
     left: 0;
 }
 .active ~ .item:before{//重点
     left: 0;
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
