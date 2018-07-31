//============================登录模块==========================
import { post } from './axios'
import { loginApi, refreshApi, findPswCodeApi, findPswNewApi } from './apipath'

// 登录通过密码账号
export function loginByPhone(phone, password, type) {
    let params = {
        phone,
        password,
        type
    }
    return post(loginApi, params)
}

// 登录通过微信
export function loginByWechat(code, type) {
    let params = {
        code,
        type
    }
    return post(loginApi, params)
}

// 密码找回提交短信验证码
export function findPswCode(phone, verify_code) {
    let params = {
        phone,
        verify_code
    }
    return post(findPswCodeApi, params)
}

// 密码找回提交新密码
export function findPswNew(password, password_reset_token) {
    let params = {
        password,
        password_reset_token
    }
    return post(findPswNewApi, params)
}
