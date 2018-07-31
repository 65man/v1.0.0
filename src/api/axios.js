import axios from 'axios'
import Vue from 'vue'
import ErrorMessage from '../api/ErrorMessage'
import { checkToken } from '../utils/token.js'
import { successCode } from '../api/config.js'
import { alertTips } from "../utils/messageTips.js";
import store from '../store';
import router from '../router'
// 创建实例，基本配置

const axiosInstance = axios.create({
    baseURL: GlobalConfig.SERVER_URL['baseURL'],
    timeout: 15000,
})

//过滤重新获取token
const whiteList = ['account/refresh', 'verify/captcha', 'account/signup', 'account/password', 'account/login', 'account/validate', 'password/forget', 'password/reset']

/*
// 请求数据拦截器
axiosInstance.interceptors.request.use((config) => {
    console.log('config:'+config);
    console.log(config);
    // 2.判断请求的API是否要检查Token，白名单
    if (whiteList.indexOf(config.url) == -1) {
        // 2.1调用检查token
        if (checkToken(config)) {
            //token正常,携带token
            if (config.method == 'post' || config.method == 'put') {
                config.url = config.url + '?access-token=' + store.state.token;
                console.log(config);
            } else {
                config.params['access-token'] = store.state.token;
            }
            return cb()
        }
    } else {
        //2.2 不用检查token
        return cb();
    }
    // 拦截结束
    function cb() {
        if (config.method == 'post' || config.method == 'put') {
            config.data = Vue.prototype.qs.stringify({
                ...config.data
            })
        }
        return config
    }
}, error => {
    console.log(error)
})

// 响应数据拦截器
axiosInstance.interceptors.response.use((res) => {
        res.XW_data = res.data.data
        res.XW_code = res.data.errCode
        res.XW_msg = res.data.errMsg
        res.XW_status = res.data.status
        res.XW_request = res.data.request
        console.log(res);
        return res;
    },
    (err) => {
        if (err.response && err.response.status == '401') {
            alertTips('登录验证已过期，请重新登录', function reLogin() {
                router.push({
                    name: "blank"
                });
            })
        } else if (err.response && err.response.status == '500') {
            Vue.$vux.loading.hide();
            alertTips('服务器繁忙，请稍后重试');
        } else {
            return err.response ? err.response : ErrorMessage.timeOut
        }
    }
)
*/

// ======================== 注册 axios 原生 GET POST请求 =============================
// 注册 axios GET POST请求(可以直接使用axios请求)

// ========================  GET POST PUT请求 =============================
// 注册自定义GET请求
export const get = function(url, params = {}) {
    return new Promise((resolve, reject) => {
        axiosInstance.get(url, {　　
            params: params
        }).then((res) => {
            // 成功回调
            console.log(res);
            if (successCode.has(res.XW_code)) {
                resolve(res.XW_data)
            } else {
                reject(res)
            }
        }).catch((err) => {

        })
    })
}

// 注册自定义POST请求
export const post = function(url, params = {}) {
    return new Promise((resolve, reject) => {
        axiosInstance.post(url, params).then((res) => {
            // 成功回调
            if (successCode.has(res.XW_code)) {
                resolve(res.XW_data)
            } else {
                reject(res)
            }
        }).catch((err) => {

        })
    })
}

// 注册自定义PUT请求
export const put = function(url, params = {}) {
    return new Promise((resolve, reject) => {
        axiosInstance.put(url, params).then((res) => {
            // 成功回调
            if (successCode.has(res.XW_code)) {
                resolve(res.XW_data)
            } else {
                reject(res)
            }
        }).catch((err) => {

        })
    })
}
