<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty===true" class="empty">
			<image src="../../static/icon_b.png"  mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>
		<view v-else>
			<view class="viewDe">
				<image src="../../static/icon_b.png" class="icon_b"></image>
				<button class="butDe" @click="deleteM" >删除</button>
			</view>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="item.id">
					<view
						class="cart-item" 
						:class="{'b-b': index!==cartList.length-1}"
					>
						<view class="image-wrapper">
							<image :src="item.coverImg" 
								:class="[item.loaded]"
								mode="aspectFill" 
								lazy-load 
								@load="onImageLoad('cartList', index)" 
								@error="onImageError('cartList', index)"
							></image>
							<view 
								class="yticon icon-xuanzhong2 checkbox"
								:class="{checked: item.checked}"
								@click="check('item', index)"
							></view>
						</view>
						<view class="item-right">
							<text class="clamp title">{{item.name}}</text>
							<text class="attr">{{item.desc}}</text>
							<view class="viewLine">
							<view class="viewPrice">
								<text class="priceNow">￥{{item.price}}</text>
								<text class="priceOld">￥{{item.cost}}</text>
							</view>
							<view class="viewPrice">
								
							</view>
							<view class="viewPrice2">
								<image class="imgAdd" @click="jian({id: item.id})" src="../../static/jian.png"></image>
								<!-- <input class="inputAdd" v-model="number" type="number" /> -->
								<text class="inputAdd" >{{item.number}}</text>
								<image class="imgAdd" @click="add({id: item.id})" src="../../static/add.png"></image>
							</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image 
						:src="allChecked?'/static/selected.png':'/static/select.png'" 
						mode="aspectFit"
						@click="check('all')"
					></image>
					
				</view>
				<view class="total-box">
					<text class="price">¥{{total}}</text>
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	var token=""
	import {
		mapState
	} from 'vuex';
	import uniNumberBox from '@/components/uni-number-box.vue'
	export default {
		components: {
			uniNumberBox
		}, 
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
				hasLogin:false,
				cutId:"",
				ids:[]
			};
		},
		onLoad(){
			
		},
		onShow() {
			token = uni.getStorageSync('token')
			console.log(this.$userKey)
			var userInfo = uni.getStorageSync(this.$userKey)
			console.log(userInfo)
			this.cartList=[]
			this.allChecked= false
			this.total = 0
			if(userInfo.nickname.length>0)
			{
			this.hasLogin=true
			this.loadData();
			}else
			{	
			this.hasLogin=false
			}
				
		},
		watch:{
			//显示空白页
			cartList(e){
				let empty = e.length === 0 ? true: false;
				if(this.empty !== empty){
					this.empty = empty;
				}
			}
		},
		computed:{
			...mapState([''])
		},
		methods: {
			//请求数据
			
			async loadData(){
				var _this= this
				uni.request({
				    url:this.$url+'/car/all' ,//服务器端地址
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
							_this.cartList = res.data.data
				        }
				    }
				   
				});
			},
			add(e)
			{
				console.log(e.id)
				this.cutId = e.id
				this.addOrJ("/car/num/add/"+e.id,0)
			},
			jian(e)
			{
				this.cutId = e.id
				this.addOrJ("/car/num/decrease/"+e.id,1)
				
			},
			//增加或者减少数量
			addOrJ(method,type)
			{
				console.log(token)
				var _this = this
				uni.request({
				    url:this.$url+method ,//服务器端地址
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
							_this.addNum(type)
				        }else
						{
							_this.$api.msg(res.data.message)
						}
				    }
				   
				});
				},
			//增加或者减少数量（更新视图）
			addNum(mdType)
			{
				for(var i=0;i<this.cartList.length;i++)
				{
					if(this.cartList[i].id==this.cutId)
					{
						if(mdType==0)
						{
							this.cartList[i].number=this.cartList[i].number+1
						}else
						{
							this.cartList[i].number=this.cartList[i].number-1
						}
						
						
					}
				}
			},
			//删除事件
			deleteM()
			{
				var _this = this
				uni.showModal({
					title:"提示",
					content:"确定要删除吗？",
					confirmText:"确定",
					confirmColor:"#333233",
					cancelText:"取消",
					cancelColor:"#909399",
					success() {
						_this.deleteGoods()
					}
				})
			},
			//获取要删除的IDs
			deleteIds()
			{
				this.ids=[]
				for(var i=0;i<this.cartList.length;i++)
				{
					if(this.cartList[i].checked)
					{
						 this.ids.push(this.cartList[i].id)
						//this.cartList.splice(i, 1)
					}
				}
			},
			//删除商品
			deleteGoods()
			{
				this.deleteIds()
				console.log(this.ids)
				if(this.ids.length==0)
				{
					uni.showToast({
						title:"请至少选择一个商品",
						icon:"none"
					})
					return
				}
				var _this = this
				uni.request({
				    url:this.$url+"/car/delete" ,//服务器端地址
				    data: {
						ids:this.ids
				    },
				    method: 'POST',
				    header: {
				        'content-type': 'application/json',
						'token':token,
				    },
				    success: (res) => { 
						console.log(res.data)
						_this.$api.msg(res.data.message)
				        if (res.data.code == 200) {
							_this.cartList=[]
							_this.loadData()
				        }
				    }
				   
				});
			},
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/errorImage.jpg';
			},
			navToLogin(){
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			 //选中状态处理
			check(type, index){
				if(type === 'item'){
					this.cartList[index].checked = !this.cartList[index].checked;
				}else{
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item=>{
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			//数量
			numberChange(data){
				this.cartList[data.index].number = data.number;
				this.calcTotal();
			},
			//删除
			deleteCartItem(index){
				let list = this.cartList;
				let row = list[index];
				let id = row.id;

				this.cartList.splice(index, 1);
				this.calcTotal();
				uni.hideLoading();
			},
			//清空
			clearCart(){
				uni.showModal({
					content: '清空购物车？',
					success: (e)=>{
						if(e.confirm){
							this.cartList = [];
						}
					}
				})
			},
			//计算总价
			calcTotal(){
				let list = this.cartList;
				if(list.length === 0){
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(item=>{
					if(item.checked === true){
						total += item.price * item.number;
					}else if(checked === true){
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = Number(total.toFixed(2));
			},
			//创建订单
			createOrder(){
				var datas = this.initData()
				if(datas.length===0)
				{
					this.$api.msg("请至少选择一个商品")
					return
				}
				 
				uni.navigateTo({
					url: `/pages/order/createOrder?orders=`+encodeURIComponent(JSON.stringify(datas))+"&price="+this.total
				})
				
			},
			
			initData()
			{	
				var list=[]
				for(var i=0;i<this.cartList.length;i++)
				{
					
					if(this.cartList[i].checked)
					{
						list.push(this.cartList[i])	
					}
					
				}
				return list
			}
		}
	}
</script>

<style lang='scss'>
	.container{
		padding-bottom: 134upx;
		.viewLine
		{
			align-items: center;
			flex-direction: row;
			display: flex;
			justify-content: space-between;
		}
		.imgAdd
		{
			width: 22px;
			height: 22px;
		}
		.inputAdd
		{
			width: 25px;
			margin-left: 7px;
			margin-right: 7px;
			height: 25px;
			text-align: center;
		}
		.viewPrice2
		{
			align-items: center;
			flex-direction: row;
			display: flex;
			width: 90px;
			justify-content: center;
		}
		.viewPrice
		{
			align-items: center;
			flex-direction: row;
			display: flex;
			justify-content: center;
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
		/* 空白页 */
		.empty{
			position:fixed;
			left: 0;
			top:0;
			width: 100%;
			height: 100vh;
			padding-bottom:100upx;
			display:flex;
			justify-content: center;
			flex-direction: column;
			align-items:center;
			background: #fff;
			image{
				width: 240upx;
				height: 160upx;
				margin-bottom:30upx;
			}
			.empty-tips{
				display:flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;
				.navigator{
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}
	.icon_b
	{
		width: 66upx;
		height:  50upx;
	}
	.viewDe{
			width: 100vh;
			height: 60px;
			align-items: center;
			display: flex;
			padding-left: 20upx;
			padding-right: 20px;
			justify-content: space-between;
			background: #F5F5F5;
			flex-direction: row;
	}
	.butDe
	{
		width: 70px;
		height: 30px;
		border-radius: 4px;
		align-items: center;
		font-size: 14px;
		display: flex;
		justify-content: center;
		color:#666566 ;
		border:1px solid rgba(102,101,102,1);
	}
	/* 购物车列表项 */
	.cart-item{
		display:flex;
		position:relative;
		padding:30upx 40upx;
		.image-wrapper{
			width: 80px;
			height: 80px;
			flex-direction: row;
			display: flex;
			flex-shrink: 0;
			position:relative;
			image{
				border-radius:8upx;
			}
		}
		.checkbox{
			position:absolute;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background:#fff;
			border-radius: 50px;
		}
		
		.item-right{
			display:flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position:relative;
			padding-left: 30upx;
			.title,.price{
				font-size:$font-base + 2upx;
				color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}
			.attr{
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}
			.price{
				height: 50upx;
				line-height:50upx;
			}
		}
		.del-btn{
			padding:4upx 10upx;
			font-size:34upx; 
			height: 50upx;
			color: $font-color-light;
		}
	}
	/* 底部栏 */
	.action-section{
		/* #ifdef H5 */
		/* #endif */
		position:fixed;
		bottom:0upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 100%;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		.checkbox{
			height:52upx;
			position:relative;
			image{
				width: 52upx;
				height: 100%;
				position:relative;
				z-index: 5;
			}
		}
		.clear-btn{
			position:absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius:0 50px 50px 0;
			opacity: 0;
			transition: .2s;
			&.show{
				opacity: 1;
				width: 120upx;
			}
		}
		.total-box{
			flex: 1;
			display:flex;
			flex-direction: column;
			text-align:right;
			padding-right: 40upx;
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
			}
			.coupon{
				font-size: $font-sm;
				color: $font-color-light;
				text{
					color: $font-color-dark;
				}
			}
		}
		.confirm-btn{
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: $uni-color-primary;
		}
	}
	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked{
		color: $uni-color-primary;
	}
</style>
