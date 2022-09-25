import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router';
Vue.config.productionTip = false
//引入全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination';
//引入仓库文件
import store from './store';

//引入ui文件
import { Icon, MessageBox } from 'element-ui';
Vue.component(Icon.name, Icon);
//饿了么ui注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入mockjs执行一下，但不需要在这里使用
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'

//统一引入接口api函数的全部请求函数
import * as API from '@/api'

//注册全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

//引入插件
// import VueLazyload from 'vue-lazyload'
// import atm from '@/assets/v2-5dbfe2662efe1a04fd5f4f8c1e930bc7_b.gif'
//图片懒加载--进行如下操作
// Vue.use(VueLazyload, {
//   loading: atm
// });
new Vue({
  render: h => h(App),
  //配置全局事件总线$bus
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$api = API;
  },
  //注册路由
  router,
  store
}).$mount('#app')
