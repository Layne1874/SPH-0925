//引入路由组件
import Home from '@/pages/Home';
// import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import Paysucess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由组件
import Myorder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default [
    {
        name: 'center',
        path: '/center',
        component: Center,
        meta: { show: true },
        //个人订单中心二级路由组件
        children: [{
            path: 'myorder',
            component: Myorder
        }, {
            path: 'grouporder',
            component: GroupOrder
        }, {
            path: '/center',
            redirect: '/center/myorder'
        }]
    },
    {
        name: 'paysucess',
        path: '/paysucess',
        component: Paysucess,
        meta: { show: true }
    },
    {
        name: 'pay',
        path: '/pay',
        component: Pay,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            // ...
            if (from.path == '/trade') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须是从购物车来
            if (from.path == '/shopcart') {
                next();
            } else {
                //其他的路由组件而来，停留在当前
                next(false);
            }
        }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        name: 'detail',
        path: '/detail/:skuid?',
        component: Detail,
        meta: { show: true }
    }, {
        name: 'homeVue',
        path: '/home',
        component: Home,
        meta: { show: true }
    },
    {

        path: '/search/:keyword?',
        //路由懒加载的写法
        component: () => import('@/pages/Search'),
        meta: { show: true },
        name: "search",

        //布尔值写法
        // props: true
        //函数写法
        props: ($route) => {
            return {
                keyword: $route.params.keyword, k: $route.query.k
            }
        }
    }, {
        path: '/login',
        component: Login,
        meta: { show: false }
    }, {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        path: '*',
        redirect: '/home'
    }]