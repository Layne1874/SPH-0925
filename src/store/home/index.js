import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";

//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getcategoryList({ commit }) {
        let result = await reqCategoryList();
        // console.log(result);
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data);
        }
    },
    //获取轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    //获取floor轮播图数据
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
        }
    }

};

//mutations:修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};

//state:仓库存储数据的地方
const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
};

//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};


export default {
    state, actions, mutations, getters
}