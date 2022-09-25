import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from "@/api";


//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getCartList({ commit }) {
        commit
        let result = await reqCartList();
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    async deleteCartList({ commit }, skuId) {
        commit
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return '删除商品成功！'
        } else {
            return Promise.reject(new Error('faile'));
        }

    },
    //修改购物车勾选状况
    async UpdateCartList({ commit }, { skuId, isChecked }) {
        commit
        let result = await reqUpdateCheckedByid(skuId, isChecked);
        if (result.code == 200) {
            return '勾选商品成功'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除全部选中的购物车商品
    deleteAllcheckedcart({ dispatch, getters }) {
        //将返回的promise存储到一个数组里
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            //三目运算符，表示isChecked为1的商品才需要删除，否则执行空字符串，即什么都不做，但也要写，才能让语法完整
            let promise = item.isChecked == 1 ? dispatch('deleteCartList', item.skuId) : ''
            PromiseAll.push(promise);
        });
        //只有全部的promise都成功，才返回成功的结果
        //如果有一个失败，则返回即为失败的结果
        return Promise.all(PromiseAll);
    },
    //修改全部产品的状态
    updateAllCartChecked({ dispatch, state }, isChecked) {
        //数组
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach((item) => {
            //遍历数组，派发所有isChecked，购物车有多少商品就派发几次，达到全选商品或全部选的效果
            let promise = dispatch('UpdateCartList', { skuId: item.skuId, isChecked })
            promiseAll.push(promise);
        })
        //最终返回结果
        return Promise.all(promiseAll);
    }
};

//mutations:修改state的唯一手段
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};

//state:仓库存储数据的地方
const state = {
    cartList: []
};

//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    }
};


export default {
    state, actions, mutations, getters
}