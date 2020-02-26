<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">收货人姓名</text>
			<input class="input" type="text" v-model="addressData.nickname" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号码</text>
			<input class="input" type="number" v-model="addressData.phone" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">选择省市</text>
			<view class="txtloc" @tap="togglePopup('bottom','popup')" v-for="(item, index) in selectList" :key="index">
				{{item.txt}}<span v-show="index == 0 || index == 1">—</span>
			</view>
		</view>
				<uni-popup ref="popup" :type="type" @change="change">
					<view class="select-border">
						<view class="header">
							<view class="title">
								选择地区
							</view>
							<view class="cancel-icon" @tap="cancel('popup')">
								X
							</view>
						</view>
						<view class="select-box">
							<view class="select-item">
								<view class="select-list" @tap="tabEvent(index)" :class="indexTab == index ? 'selected' : ''" v-for="(item, index) in selectList"
								 :key="index">
									{{item.txt}}
								</view>
							</view>
							<view class="select-item-box">
								<!-- 省 -->
								<view class="province-box" v-show="proviceShow">
									<view class="select-list-cont" @tap="provinceEvent(item,index)" v-for="(item,index) in provinceData" :key="item.code">
										{{item.name}}<span class="check" v-show="index == checkOne">√</span>
									</view>
								</view>
								<!-- 市 -->
								<view class="city-box" v-show="cityShow">
									<view class="select-list-cont" @tap="cityEvent(item,index)" v-for="(item,index) in cityData" :key="item.code">
										{{item.name}}<span class="check" v-show="index==checkTwo">√</span>
									</view>
								</view> 
								<!-- 区 -->
								<view class="area-box" v-show="areaShow">
									<view class="select-list-cont" @tap="areaEvent(item,index)" v-for="(item,index) in areaData" :key="item.code">
										{{item.name}}<span class="check" v-show="index==checkThree">√</span>
									</view>
								</view>
							</view>
						</view>
					</view>
				</uni-popup>
		
		
		<view class="row b-b"> 
			<text class="tit">街道地址</text>
			<input class="input" type="text" v-model="addressData.address" placeholder="街道、楼号、门牌" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">邮政编码</text>
			<input class="input" type="text" v-model="addressData.postcode"  placeholder="请输入邮政编码" placeholder-class="placeholder" />
		</view>
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.isDefault" color="#333233" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	import cityDatas from '../../components/city.area.js'
	import uniPopup from '@/components/uni-pop.vue'
	var province=""
	var city=""
	var area=""
	var token=""
	export default {
		components: {
					uniPopup
				},
		data() {
			return {
				provinceData: cityDatas,
				cityData: [],
				areaData: [],
				selectList: [{
				txt: '请选择'
				}, {
				txt: '请选择'
				}, {
				txt: '请选择'
				}],
				tabOne: '请选择',
				indexTab: 0,
				proviceShow: true,
				areaShow: false,
				cityShow: false,
				show: false,
				type: '',
				checkOne: null,
				checkTwo: null,
				checkThree: null,
				addressData: {
					id:"",
					nickname: '',
					phone: '',
					addressName: '点击选择省/直辖市',
					address: '',
					isDefault: false,
					postcode:""
				}
			}
		},
		onLoad(option){
			token = uni.getStorageSync("token")
			let title = '新增收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				this.loadAdrDetail(option.data)
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e){
				this.addressData.default = e.detail.value;
			},
			
			//地图选择地址
			chooseLocation(){
				uni.chooseLocation({
					success: (data)=> {
						this.addressData.addressName = data.name;
						this.addressData.address = data.name;
					}
				})
			},
			
			//提交
			confirm(){
				let data = this.addressData;
				if(!data.nickname){
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.phone)){
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if(!data.address){
					this.$api.msg('请输入地址');
					return;
				}
				if(!data.postcode){
					this.$api.msg('请输入邮政编码');
					return;
				}
				if(!area||!city||!province){
					this.$api.msg('请选择省市区');
					return;
				}
				let _this = this;
				uni.request({
				    url:this.$url+'/user/address/add' ,//服务器端地址
				    data: {
						address:data.address,
						area:area,
						city:city,
						province:province,
						nickname:data.nickname,
						phone:data.phone,
						postcode:data.postcode,
						isDefault:data.isDefault,
				    },
				    method: 'POST',
				    header: {
				        'content-type': 'application/json',
						'token':token,
				    },
				    success: (res) => { 
						console.log(res.data)
				        if (res.data.code == 200) {
							this.$api.msg('添加成功');
				            uni.navigateBack({
				            	
				            })
				        }
				    }
				   
				}); 
			
			},
			loadAdrDetail(adrId)
			{
				let _this = this;
				uni.request({
				    url:this.$url+'/user/address/detail/'+adrId ,//服务器端地址
				    data: {
						
				    },
				    method: 'POST',
				    header: {
				        'content-type': 'application/json',
						'token':token,
				    },
				    success: (res) => { 
						console.log(res.data)
				        _this.addressData = res.data.data
						province = _this.addressData.province
						city = _this.addressData.city
						area = _this.addressData.area
						_this.selectList=[{txt:province},{txt:city},{txt:area}]
				    }
				   
				}); 
			},
			togglePopup(type, open) {
								this.type = type
								if (open === 'tip') {
									this.show = true
								} else {
									this.$refs[open].open()
								}
							},
							cancel(type) {
								if (type === 'tip') {
									this.show = false
									return
								}
								this.$refs[type].close()
							},
							change(e) {
								if (e.show == true) {
									uni.hideTabBar()
								} else {
									uni.showTabBar()
								}
							},
							tabEvent(index) {
								this.indexTab = index
								if (this.indexTab == 0) {
									this.proviceShow = true
									this.cityShow = false
									this.areaShow = false
									// this.checkOne = null
									this.checkTwo = null
									this.checkThree = null
									// this.cityData = []
									this.areaData = []
									// this.selectList[0].txt = "请选择"
									this.selectList[1].txt = "请选择"
									this.selectList[2].txt = "请选择"
								} else if (this.indexTab == 1) {
									this.proviceShow = false
									this.cityShow = true
									this.areaShow = false
									// this.checkTwo = null
									this.checkThree = null
									// this.areaData = []
									// this.selectList[1].txt = "请选择"
									this.selectList[2].txt = "请选择"
								} else if (this.indexTab == 2) {
									this.proviceShow = false
									this.cityShow = false
									this.areaShow = true
								}
							},
							provinceEvent(data, index) {
								this.checkOne = index
								this.selectList[0].txt = data.name
								this.indexTab = 1
								this.proviceShow = false
								this.cityShow = true
								this.areaShow = false
								this.cityData = data.cityList
								province = data.name
							},
							cityEvent(data, index) {
								this.checkTwo = index
								this.selectList[1].txt = data.name
								this.indexTab = 2
								this.proviceShow = false
								this.cityShow = false
								this.areaShow = true
								this.areaData = data.areaList
								city = data.name
							},
							areaEvent(data, index) {
								this.checkThree = index
								this.selectList[2].txt = data.name
								area = data.name
								this.cancel('popup')
							}
				
			}
		}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}
	.txtloc
	{
		font-size: 30upx;
		color: $font-color-light;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 180upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
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
	
	.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 35upx;
		}
	 
		.title {
			font-size: 34upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}
	 
		.cancel-icon {
			font-size: 34upx;
			color: rgba(153, 153, 153, 1);
		}
	 
		.check {
			padding-left: 17upx;
			color: #FF7E28;
		}
	 
		.select-box {
			height: 1024upx;
		}
	 
		.select-item {
			display: flex;
			align-items: center;
			padding-left: 50upx;
			margin-bottom: 20upx;
			border-bottom: 1px solid #F6F6F6;
		}
	 
		.select-list {
			width: 120upx;
			height: 40upx;
			text-align: center;
			overflow: hidden;
			/*超出部分隐藏*/
			text-overflow: ellipsis;
			/* 超出部分显示省略号 */
			white-space: nowrap;
			/*规定段落中的文本不进行换行 */
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333233;
			margin-right: 30upx;
			border-bottom: 1px solid #FFFFFF;
		}
	 
		.select-list-cont {
			padding-left: 67upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 40px;
		}
	 
		.selected {
			border-bottom: 1px solid #F0AD4E;
			color: rgba(255, 133, 0, 1);
		}
	
</style>
