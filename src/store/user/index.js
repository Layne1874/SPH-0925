import { reqGetcode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister } from "@/api";
import { getToken, removeToken, setToken } from "@/utils/token";


//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetcode(phone)
        console.log(result);
        if (result.code == 200) {
            commit('GETCODE', result.data)
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({ commit }, data) {
        commit
        let result = await reqUserRegister(data);
        // console.log(result);
        if (result.code == 200) {
            return '注册成功！'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token);
            //持久化存储token
            setToken(result.data.token)
            return 'ok!'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        }
        // else {
        //     return Promise.reject(new Error('faile'))
        // }
    },
    //退出登录
    async userLogout({ commit }) {
        //只是向服务器发起一次请求，通知服务器清除token
        let result = await reqLogout();
        if (result.code == 200) {
            commit('CLEARUSERMSG');
            return 'ok!'
        } else {
            return Promise.reject(new Error('falie'))
        }
    }
}
//mutations:修改state的唯一手段
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    //清除本地数据
    CLEARUSERMSG(state) {
        //帮仓库清除用户信息
        state.token = '';
        state.userInfo = {};
        //清除本地存储的token
        removeToken();

    }
}

//state:仓库存储数据的地方
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {

}


export default {
    state, actions, mutations, getters
}