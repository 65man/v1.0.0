//============================我的信息模块==========================
import {get, post } from './axios'
import { resetInfoApi, resetPswApi, MyInfoApi, bindWcApi } from './apipath'

// 获取我的信息
export function MyInfo() {
    return get(MyInfoApi)
}

// 修改信息
export function resetInfo(telephone) {
    let params = {
        telephone
    }
    return post(resetInfoApi, params)
}

// 修改密码
export function resetPsw(old_password, password) {
    let params = {
        old_password,
        password
    }
    return post(resetPswApi, params)
}

// 绑定微信
export function bindWc(code) {
    let params = {
        code
    }
    return post(bindWcApi, params)
}