import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

import store from './store'

// 组件
import login from 'components/login/login'
import manage from 'components/manage/manage'
import stationList from 'components/stationList/stationList'
import station from 'components/station/station'
import addStation from 'components/addStation/addStation'
Vue.use(VueRouter)

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit('login', window.localStorage.getItem('token'))
}
const routes = [{
    path: '/login',
    component: login
}, {
    path: '/manage',
    meta: {
        requireAuth: true
    },
    component: manage,
    children: [{
            name: 'stationList',
            path: '/stationList',
            component: stationList
        },
        {
            name: 'station',
            path: '/station',
            component: station
        },
        {
            name: 'addStation',
            path: '/addStation',
            component: addStation
        }
    ]
}]

// 路由
const router = new VueRouter({
    routes,
    // 设置 链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置
    linkActiveClass: 'active'
})
// todo
// 没看太懂
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
router.push('login')
export default router;


