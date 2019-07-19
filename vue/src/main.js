import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入mint-ui
import mintui from 'mint-ui'
import 'mint-ui/lib/style.css'
import { MessageBox } from 'mint-ui'
Vue.use(mintui)


//引入axios
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://gotravel.applinzi.com/"
Vue.prototype.axios = axios
//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//引入vue-touch
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})

Vue.prototype.host = "http://gotravel.applinzi.com/"

var store = new Vuex.Store({
  //vuex中全局共享数据
  state: {
    userInfo: null, //用户信息
    isLogin: false,  //用户是否登录
    token: '',
    isliked: 0,      //是否喜欢
    isCollect: false,    //是否收藏
    agreen: [],
    userid: localStorage.getItem("userid"),     //登录id
    userData: { userData: '' }
  },
  //获取vuex中全局共享的数据
  getters: {
    isLogin(state) {
      return state.isLogin
    },
    userid(state) {
      return state.userid
    },
    userData(state) {
      return state.userData
    },
    isCollect(state) {
      return state.isCollect
    }
  },
  //修改vuex中全局共享的数据
  mutations: {
    //保存登录状态
    userStatus(state, flag) {
      state.isLogin = flag
    },
    //用户ID
    userid(state, num) {
      state.userid = num
    },
    //加入收藏夹
    isCollect(state){
      state.isCollect = true
    },
    //移出收藏夹
    disCollect(state){
      state.isCollect = false
    }
  },
  //vuex官方API还提供了一个actions，这个actions也是个对象变量，最大的作用就是里面的Action方法 
  //可以包含任意异步操作，这里面的方法是用来异步触发mutations里面的方法，actions里面自定义的函数
  //接收一个context参数和要变化的形参，context与store实例具有相同的方法和属性，所以它可以执行context.commit(' ')
  actions: {
    //获取登录状态
    userLogin({ commit }, flag) {
      commit("userStatus", flag)
    },
    userid({ commit }, num) {
      commit("userid", num)
    },
    userData(context) {
      let userid = context.state.userid
      axios.get('/travel/user', {
        params: {
          userid
        }
      }).then(result => {
        context.state.userData.userData = result.data.result[0]
        //console.log(context.state.userData)
      })
    }
  }
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  //获取用户登录成功后储存的登录标志
  let getFlag = localStorage.getItem("Flag");
  //如果登录标志存在且为isLogin，即用户已登录
  if (getFlag === "isLogin") {
    //设置vuex登录状态为已登录
    store.state.isLogin = true
    next()

    //如果登录标志不存在，即未登录
  } else {
    //用户想进入需要登录的页面，则定向回登录界面
    if (to.meta.isLogin) {
      MessageBox
        .confirm("请先登录", "您好")
        .then(action => {
          next({
            path: '/login',
          })
        })
        .catch(err => { });
      // Toast('请先登录')
      //用户进入无需登录的界面，则跳转继续
    } else {
      next()
    }
  }
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')