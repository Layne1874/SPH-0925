import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api";
//封装临时游客身份的模块，生成uuid
import { getUUID } from '@/utils/uuid_token'

//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取产品信息的action
    async getGoodInfo({ commit }, skuid) {
        let result = await reqGoodsInfo(skuid);
        if (result.code == 200) {
            commit('GETGOODINFO', result.data);
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        commit
        //加入购物车返回的结构
        //加入购物车以后，（发送post请求），前台将参数带给服务器
        //服务器写入数据成功，并没有返回其他数据，只是返回code==200，代表这次请求发送成功
        //因为服务器没有返回其他数据，因此不需要仓库三连存储数据的操作
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code == 200) {
            //代表服务器加入购物车成功
            return 'ok,加入购物车成功！'
        } else {
            //代表服务器加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }

};

//mutations:修改state的唯一手段
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};

//state:仓库存储数据的地方
const state = {
    goodInfo: {},
    //游客临时身份
    uuid_token: getUUID()
};

//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    categoryView(state) {
        /*state 一开始的时候可能是个空对象，这会导致state.goodInfo是 undefined ， 
        categoryView至少要是一个空对象所以要加上 || { }*/
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // skuAttrValueList(state) {
    //     return state.goodInfo.skuInfo.skuAttrValueList || [];
    // },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    },
};


export default {
    state, actions, mutations, getters
}