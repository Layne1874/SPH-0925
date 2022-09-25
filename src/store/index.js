import Vue from 'vue';
import Vuex from 'vuex'

//使用插件
Vue.use(Vuex);

//引入小仓库
import home from './home';
import search from './search';
import detail from './detail';
import cartlist from './cartlist';
import user from './user';
import trade from './trade';

//对外暴露一个Store实例
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        cartlist,
        user,
        trade
    }
})