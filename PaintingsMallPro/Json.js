/* 用户 */
const userInfo = {
	status: 1,
	data: {
		id: 1,
		mobile: 18888888888,
		nickname: 'Leo yo',
		portrait: 'http://img.61ef.cn/news/201409/28/2014092805595807.jpg'
	},
	msg: '提示'
}
/* 首页轮播图 */
const carouselList = [{
		src: "/static/temp/banner.jpg",
	},
	{
		src: "/static/temp/banner.jpg",
	},
	{ 
		src: "/static/temp/banner.jpg",
	}
]
/* 商品列表 */
const goodsList = [{
		image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579511406589&di=e463fafed3245c9c30e6844508bdc4e7&imgtype=0&src=http%3A%2F%2Fmpic.tiankong.com%2F9cf%2F90c%2F9cf90cec24bf2f98d242fac6778a8e4d%2F640.jpg",
		title: "竹瞰群山笑飞燕",
		price: 1799,
		author:"李太白",
		sales: 61,
	},
	{
		image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579511406589&di=e463fafed3245c9c30e6844508bdc4e7&imgtype=0&src=http%3A%2F%2Fmpic.tiankong.com%2F9cf%2F90c%2F9cf90cec24bf2f98d242fac6778a8e4d%2F640.jpg",
		title: "云想衣裳花想容",
		price: 78,
		author:"李太白",
		sales: 16,
	},
	{
		image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579511406589&di=e463fafed3245c9c30e6844508bdc4e7&imgtype=0&src=http%3A%2F%2Fmpic.tiankong.com%2F9cf%2F90c%2F9cf90cec24bf2f98d242fac6778a8e4d%2F640.jpg",
		title: "春风拂槛露华浓",
		price: 108.8,
		author:"李太白",
		sales: 5,
	}, {
		image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579511406589&di=e463fafed3245c9c30e6844508bdc4e7&imgtype=0&src=http%3A%2F%2Fmpic.tiankong.com%2F9cf%2F90c%2F9cf90cec24bf2f98d242fac6778a8e4d%2F640.jpg",
		title: "若非群玉山头见",
		price: 265,
		author:"李太白",
		sales: 88,
	}, {
		image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579511406589&di=e463fafed3245c9c30e6844508bdc4e7&imgtype=0&src=http%3A%2F%2Fmpic.tiankong.com%2F9cf%2F90c%2F9cf90cec24bf2f98d242fac6778a8e4d%2F640.jpg",
		title: "会向瑶台月下逢",
		price: 422,
		sales: 137,
		author:"李太白",
	}, {
		image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579511406589&di=e463fafed3245c9c30e6844508bdc4e7&imgtype=0&src=http%3A%2F%2Fmpic.tiankong.com%2F9cf%2F90c%2F9cf90cec24bf2f98d242fac6778a8e4d%2F640.jpg",
		title: "清平调·其一",
		price: 179,
		sales: 95,
		author:"李太白",
	},
]

/* 购物车 */
const cartList = [
];
//详情展示页面
const detailData = {
	
	evaList: [{
			src: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
		},
		{
			src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '楼上说的好有道理。'
		}
	]
}
const shareList = [{
		type: 1,
		icon: '/static/temp/share_wechat.png',
		text: '微信好友'
	},
	{
		type: 2,
		icon: '/static/temp/share_moment.png',
		text: '朋友圈'
	},
	{
		type: 3,
		icon: '/static/temp/share_qq.png',
		text: 'QQ好友'
	},
	{
		type: 4,
		icon: '/static/temp/share_qqzone.png',
		text: 'QQ空间'
	}
]
const lazyLoadList = [{
		src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
	},
	{
		src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
	},
	{
		src: 'http://img5.imgtn.bdimg.com/it/u=2904900134,438461613&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img1.imgtn.bdimg.com/it/u=1690475408,2565370337&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.99114.com/group1/M00/7F/99/wKgGS1kVrPGAe5LmAAU2KrJmb3Q923_600_600.jpg'
	},
	{
		src: 'http://img4.imgtn.bdimg.com/it/u=261047209,372231813&fm=26&gp=0.jpg'
	},
	{
		src: 'http://i2.17173cdn.com/i7mz64/YWxqaGBf/tu17173com/20150107/eMyVMObjlbcvDEv.jpg'
	},
	{
		src: 'http://img008.hc360.cn/m4/M02/E7/87/wKhQ6FSrfU6EfUoyAAAAAITAfyc280.jpg'
	},
	{
		src: 'http://pic1.win4000.com/wallpaper/d/5991569950166.jpg'
	},
	{
		src: 'http://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/6f061d950a7b0208f9fe945e60d9f2d3572cc85e.jpg'
	},
	{
		src: 'http://pic41.nipic.com/20140429/18169759_125841756000_2.jpg'
	},
	{
		src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg'
	},
	{
		src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg'
	},
	{
		src: 'http://b-ssl.duitang.com/uploads/item/201410/02/20141002111638_tXAzU.jpeg'
	},
	{
		src: 'http://img2.ph.126.net/C4JW6f57QWSB21-8jh2UGQ==/1762596304262286698.jpg'
	},
	{
		src: 'http://att.bbs.duowan.com/forum/201405/17/190257nzcvkkdg6w2e8226.jpg'
	},
	{
		src: 'http://attach.bbs.miui.com/forum/201504/10/223644v3intigyvva0vgym.jpg'
	},
	{
		src: 'http://pic1.win4000.com/mobile/3/57888a298d61d.jpg'
	},
]

const orderList = [{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
			title: '猛虎出山',
			price: 1798.5,
			image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579511406589&di=e463fafed3245c9c30e6844508bdc4e7&imgtype=0&src=http%3A%2F%2Fmpic.tiankong.com%2F9cf%2F90c%2F9cf90cec24bf2f98d242fac6778a8e4d%2F640.jpg',
			number: 3,
			attr: ''
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
			title: '猛虎出山',
			price: 1798.5,
			image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579511406589&di=e463fafed3245c9c30e6844508bdc4e7&imgtype=0&src=http%3A%2F%2Fmpic.tiankong.com%2F9cf%2F90c%2F9cf90cec24bf2f98d242fac6778a8e4d%2F640.jpg',
			number: 3,
			attr: ''
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
			title: '猛虎出山',
			price: 1798.5,
			image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579511406589&di=e463fafed3245c9c30e6844508bdc4e7&imgtype=0&src=http%3A%2F%2Fmpic.tiankong.com%2F9cf%2F90c%2F9cf90cec24bf2f98d242fac6778a8e4d%2F640.jpg',
			number: 3,
			attr: ''
		}]
	},
	

]
const cateList = [{
		id: 1,
		name: '全部'
	},
	{
		id: 2,
		name: '人物画'
	},
	{
		id: 3,
		name: '山水画'
	},
	{
		id: 4,
		name: '风景画'
	},
	{
		id: 5,
		name: '动物画'
	},
	
	{
		pid: 1,
		name: '虎啸山林',
		dec:"这是描述啊",
		nPrice:"188.88",
		oPrice:"888.00",
		picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579584453858&di=933b558f18ee4aa6436240b805fadd19&imgtype=0&src=http%3A%2F%2Fwww.kfzimg.com%2FG06%2FM00%2F0C%2F3E%2Fp4YBAFtid3aAO4d5AAZNZDV2Klo697_b.jpg',
	},
	{
		pid: 1,
		name: '虎啸山林11',
		dec:"这是描述啊",
		nPrice:"1883.88",
		oPrice:"8883.00",
		picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579584453858&di=933b558f18ee4aa6436240b805fadd19&imgtype=0&src=http%3A%2F%2Fwww.kfzimg.com%2FG06%2FM00%2F0C%2F3E%2Fp4YBAFtid3aAO4d5AAZNZDV2Klo697_b.jpg',
	},
	{
		pid: 1,
		name: '虎啸山林23',
		dec:"这是描述啊",
		nPrice:"138.88",
		oPrice:"858.00",
		picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579584453858&di=933b558f18ee4aa6436240b805fadd19&imgtype=0&src=http%3A%2F%2Fwww.kfzimg.com%2FG06%2FM00%2F0C%2F3E%2Fp4YBAFtid3aAO4d5AAZNZDV2Klo697_b.jpg',
	},
	{
		pid: 1,
		name: '虎啸山林3',
		dec:"这是描述啊",
		nPrice:"788.88",
		oPrice:"828.00",
		picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579584453858&di=933b558f18ee4aa6436240b805fadd19&imgtype=0&src=http%3A%2F%2Fwww.kfzimg.com%2FG06%2FM00%2F0C%2F3E%2Fp4YBAFtid3aAO4d5AAZNZDV2Klo697_b.jpg'
	}]


export default {
	carouselList,
	cartList,
	detailData,
	lazyLoadList,
	userInfo,
	shareList,
	goodsList,
	orderList,
	cateList
}
