import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

import store from './store'

// 组件 配置页面
import login from 'components/login/login'
import manage from 'components/manage/manage'
import stationList from 'components/stationList/stationList'
import station from 'components/station/station'
import addStation from 'components/addStation/addStation'
import addWorker from 'components/addWorker/addWorker'
import batchAddWorker from 'components/batchAddWorker/batchAddWorker'
import addCaller from 'components/addCaller/addCaller'
import addQueue from 'components/addQueue/addQueue'
import editCaller from 'components/editCaller/editCaller'
import editQueue from 'components/editQueue/editQueue'
import editWorker from 'components/editWorker/editWorker'
// 页面 工作页面
import workStation from 'components/workStation/workStation'
Vue.use(VueRouter)

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit('login', window.localStorage.getItem('token'))
}
const routes = [
    {
    path: '/login',
    component: login,
    name: 'login',
    meta: {
        requireAuth: true,
        keepAlive: true
        }
    },
    {
    path: '/workStation',
    component: workStation,
    name: 'workStation',
    meta: {
        requireAuth: true,
        keepAlive: true
        }
    },
    {
    path: '/manage',
    name: 'manage',
    meta: {
        requireAuth: true,
        keepAlive: true
        },
        component: manage,
        children: [
            {
                name: 'stationList',
                path: 'stationList',
                component: stationList,
                meta: {
                    requireAuth: true,
                    keepAlive: true
                }
            },
            {
                name: 'station',
                path: 'station',
                component: station,
                // 增加一个meta字段，表明不要缓存
                meta: {
                    requireAuth: true,
                    keepAlive: false
                }
            },
            {
                name: 'addStation',
                path: 'addStation',
                component: addStation,
                meta: {
                    requireAuth: true,
                    keepAlive: true
                }
            },
            {
                name: 'addWorker',
                path: 'addWorker',
                component: addWorker,
                meta: {
                    requireAuth: true,
                    keepAlive: false
                }
            },
            {
                name: 'batchAddWorker',
                path: 'batchAddWorker',
                component: batchAddWorker,
                meta: {
                    requireAuth: true,
                    keepAlive: false
                }
            },
            {
                name: 'editWorker',
                path: 'editWorker',
                component: editWorker,
                meta: {
                    requireAuth: true,
                    keepAlive: false
                }
            },
            {
                name: 'addQueue',
                path: 'addQueue',
                component: addQueue,
                meta: {
                    requireAuth: true,
                    keepAlive: false
                }
            },
            {
                name: 'editQueue',
                path: 'editQueue',
                component: editQueue,
                meta: {
                    requireAuth: true,
                    keepAlive: false
                }
            },
            {
                name: 'addCaller',
                path: 'addCaller',
                component: addCaller,
                meta: {
                    requireAuth: true,
                    keepAlive: false
                }
            },
            {
                name: 'editCaller',
                path: 'editCaller',
                component: editCaller,
                meta: {
                    requireAuth: true,
                    keepAlive: false
                }
            }
        ]
    },
    {
    path: '*', // 其他页面，强制跳转到登录页面
    redirect: '/login'
    }
]

// 路由
const router = new VueRouter({
    routes,
    // 设置 链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置
    linkActiveClass: 'active'
})
// 跳转前验证token
router.beforeEach(({meta, path}, from, next) => {
   if (!localStorage.token) {
    store.commit('logout')
   }
   let { requireAuth = true } = meta
   if (requireAuth && !store.state.token && path !== '/login') {
      return next({path: '/login'})
   }
   next()
})
// router.push('login')
export default router;


