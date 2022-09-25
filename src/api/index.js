//当前这个模块，API进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax";

//三级联动接口
//  /api/product/getBaseCategoryList get 无参数
// 发送请求，axios发送请求返回结果是Promise对象
export const reqCategoryList = () => {
    return requests({ url: '/product/getBaseCategoryList', method: 'GET' })
}

//获取banner轮播图
export const reqGetBannerList = () => mockRequests.get('/banner');

//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor');

//当前这个接口，给服务器传递一个默认参数，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

//获取产品详细信息的接口 
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'GET' });

//将产品添加到购物车当中
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取购物车列表数据接口
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'GET' })

//删除购物产品的接口
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//更新购物车数据接口
export const reqUpdateCheckedByid = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET' })

//获取验证码接口
export const reqGetcode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })

//注册信息发送给服务器
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: 'POST' })

//登录接口
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'POST' })

//获取用户信息
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'GET' })

//退出登录
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'GET' })

//获取用户地址信息
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'GET' })

//获取商品清单
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'GET' });

//提交订单接口
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'POST' })

//获取支付信息
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'GET' })

//获取订单支付状态
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'GET' })

//获取个人中心的数据
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'GET' })