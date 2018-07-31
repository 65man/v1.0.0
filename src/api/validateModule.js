//============================验证模块==========================
import { accountValidateApi, agencyValidateApi } from "./apipath.js";
import { post } from './axios';

// 验证注册信息无token
export function accountValidate(params, type, cb) {
    post(accountValidateApi, params).then(res => {
        return typeof cb == "function" && cb(type, 'true')
    }).catch(err => {
        return typeof cb == "function" && cb(type, 'false', err.data.data)
    });
}

// 验证注册信息带token
export function agencyValidate(params, type, cb, token) {
    post(agencyValidateApi, params).then(res => {
        return typeof cb == "function" && cb(type, 'true')
    }).catch(err => {
        return typeof cb == "function" && cb(type, 'false', err.data.data)
    });
}