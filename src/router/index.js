//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
//引入store
import store from '@/store/index'

//使用插件
Vue.use(VueRouter);

//引入routes组件
import Routes from '@/router/routes'


//先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push|replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}
// function push(location) { return originPush.call(this, location).catch(err => err) }

//配置路由
let router = new VueRouter({
    //配置路由
    routes: Routes,
    //滚动行为
    scrollBehavior() {
        // to, from, savedPosition
        //返回的这个y=0，代表的滚动条在最上方
        return { y: 0 };
    }
})

//全局守卫，前置守卫（在路由之间进行判断）
router.beforeEach(async (to, from, next) => {
    //to:可以获取到要跳转到哪个路由的信息
    //from：可以获取到从哪个路由而来的信息
    //next：放行函数，next()放行，next(path)放行到指令路由
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    //用户已经登录了
    if (token) {
        //用户已经登录了，不能去login
        if (to.path == '/login') {
            next('/home')
        } else {
            //登录，而且去的不是login
            //如果，用户名已经有的情况
            if (name) {
                next();
            } else {
                //考虑到网页刷新就会把仓库中用户信息清空，因此加上以下的条件
                //没有用户信息，派发action让仓库存储用户信息再跳转
                try {
                    //获取用户信息成功
                    await store.dispatch("getUserInfo");
                    //放行
                    next();
                } catch (error) {
                    //token失效，获取不到用户信息，则需要重新登录
                    //清除token
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    } else {
        //未登录,不能去交易相关、不能去支付相关、不能去个人中心
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            //把未登录的信息存储于地址栏中
            next('/login?redirect=' + toPath);
        } else {
            //去的不是上面这些路由
            next();
        }
    }
})


export default router