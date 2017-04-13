// 对http统一处理
import axios from 'axios'
import store from './store'
import router from './router'

// axios 配置

axios.defaults.timeout = 8000;

// http request 拦截器

axios.interceptors.request.use(
    config => {
            // todo
            // 没看太明白
            // 统一添加token，怎么区别第一次登录？
            console.log(config)
            if (store.state.token) {
                config.data.token = `${store.state.token}`
            }
            return config;
    },
    err => {
        return Promise.reject(err)
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        console.log(response, 'response')
        let data = response.data
        if (data.rescode === '200') {
          return data.detail
        }
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit('logout');
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });

export default axios;
