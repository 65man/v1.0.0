//============================通用==========================
import {get, post, put } from './axios'
import { registerApi, bindInfoApi, bindGameIdApi, bindAgentApi, bindCheckApi } from './apipath'

//发送注册
export function register(nickname, telephone, phone, password, verify_code) {
    let params = {
        nickname,
        telephone,
        phone,
        password,
        verify_code
    }
    return post(registerApi, params)
}

//查看ID代理商信息
export function bindInfo(roleId) {
    let params = {
        roleId
    }
    return get(bindInfoApi, params)
}

//绑定ID
export function bindGameId(role_id) {
    let params = {
        role_id
    }
    return put(bindGameIdApi, params)
}

//申请代理
export function bindAgent() {
    return post(bindAgentApi)
}

//绑定ID
export function bindCheck() {
    return get(bindCheckApi)
}