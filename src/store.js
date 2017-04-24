import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// vuex
const store = new Vuex.Store({
  state: {
    token: null,
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
          return (...url) => {
              let restful = url.join('/')
              return state.serverUrl + restful;
          }
      }
  }
})
export default store

