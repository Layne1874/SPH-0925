import { reqGetSearchInfo } from "@/api";

//state:仓库存储数据的地方
const state = {
    searchList: {}
};


//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit('GETSEARCHlIST', result.data);
        }
    }
};

//mutations:修改state的唯一手段
const mutations = {
    GETSEARCHlIST(state, searchList) {
        state.searchList = searchList;
    }
};


//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    goodsList(state) {
        //state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
        //但是如果网络不好state.searchList.goodsList应该返回的是undefined
        //计算新的属性的属性值的同时至少也要带一个空数组以防万一
        return state.searchList.goodsList || [];
    },

    attrsList(state) {
        return state.searchList.attrsList || [];
    },

    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
};


export default {
    state, actions, mutations, getters
}