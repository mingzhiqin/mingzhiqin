<template>
	<view class="content b-t">
			<radio-group>
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<radio checked="item.default"  class="radio-group weui-input" bindchange="radioChange"></radio>
			<view class="wrapper">
				<view class="address-box">
					<text class="address">{{item.nickname}}</text>
					<text class="address">{{item.phone}}</text>
				</view>
				<view class="u-box">
					<text class="mobile">{{item.province}} {{item.city}} {{item.area}} {{item.address}}</text>
				</view>
				
			</view>
			<text class="yticon icon-bianji" @click.stop="addAddress('edit', item)"></text>
			
		</view>
		</radio-group>
		<button class="add-btn" @click="addAddress('add')">添加地址</button>
	</view>
</template>

<script>
	var token=""
	export default {
		data() {
			return {
				source: 0,
				addressList: []
			}
		},
		onLoad(option){
			this.source = option.source;
		},
		onShow() {
			token = uni.getStorageSync("token")
			this.loadadr()
		},
		methods: {
			
			loadadr()
			{	
				let _this = this;
				uni.request({
				    url:this.$url+'/user/address/all' ,//服务器端地址
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
							_this.addressList = res.data.data
				        }
				    }
				   
				}); 
			},
			//选择地址
			checkAddress(item){
				if(this.source == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
			},
			addAddress(type, item){
				if(type==="edit")
				{
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${item.id}`
				})	
				}else
				{
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}`
				})		
				}
				
			},
			//添加或修改成功之后回调
			refreshList(data, type){
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.addressList.unshift(data);
				
				console.log(data, type);
			}
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		display: flex;
		align-items: center;
		.tag{
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
		.address{
			font-size: 30upx;
			margin-left: 10px;
			color: $font-color-dark;
		}
	}
	/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */
	 
	radio .wx-radio-input.wx-radio-input-checked {
	  border-color: #333233;
	  background: #333233;
	}
	 
	/* 自定义样式.... */
	 
	radio .wx-radio-input {
	  height: 40rpx;
	  width: 40rpx;
	  margin-top: -4rpx;
	  border-radius: 50%;
	  border: 2rpx solid #333233;
	  background: transparent;
	}
	 
	/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */
	 
	radio .wx-radio-input.wx-radio-input-checked::before {
	  border-radius: 50%; /* 圆角 */
	  width: 40rpx; /* 选中后对勾大小，不要超过背景的尺寸 */
	  height: 40rpx; /* 选中后对勾大小，不要超过背景的尺寸 */
	  line-height: 40rpx;
	  text-align: center;
	  font-size: 30rpx; /* 对勾大小 30rpx */
	  color: #fff; /* 对勾颜色 白色 */
	  background: #333233;
	  transform: translate(-50%, -50%) scale(1);
	  -webkit-transform: translate(-50%, -50%) scale(1);
	}
	.u-box{
		font-size: 28upx;
		margin-left: 10px;
		color: $font-color-light;
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
	}
	.icon-bianji{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}
	
	.add-btn{
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #333233;
		background-color: #fff;
		border-radius: 4px;
		border: none;
		&::after
		{
			border: 1px solid #333233;
		}
	}
</style>
