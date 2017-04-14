import Vue from 'vue'
import App from './App'
import vueTap from 'v-tap'
import fastclick from 'fastclick'

// vuex store
import store from './store'
// 路由
import router from './router'
// axios 请求的统一处理
import axios from './http'


// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios;

var app = new Vue({
  router,
  store,
  axios,
  template: '<App/>',
  components: {
    App
  },
  data: {
    eventHub: new Vue()
  }
}).$mount('#app')

