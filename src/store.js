import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// vuex
const store = new Vuex.Store({
  state: {
    token: null,
    // serverUrl: {
    //   login: 'http://192.168.17.187/hqueue/login',
    //   station: 'http://192.168.17.187/hqueue/manager/station',
    //   worker: 'http://192.168.17.187/hqueue/manager/worker',
    //   queueInfo: 'http://192.168.17.187/hqueue/manager/queueInfo',
    //   caller: 'http://192.168.17.187/hqueue/manager/caller'
    // }
    serverUrl: 'http://192.168.17.187/hqueue/'
  },
  mutations: {
    login: (state, data) => {
      localStorage.setItem('token', data)
      state.token = data;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
    }
  },
  getters: {
    postUrl(state) {
          return (url) => {
              return state.serverUrl + url;
          }
      }
  }
})
export default store

