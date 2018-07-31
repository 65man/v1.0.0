//============================验证通用模块==========================
import {get, post, put } from './axios'
import { ImgCodeApi, accountValidateApi, agencyValidateApi } from './apipath'

// GET-发送图片验证码 POST-检查图片验证码
export function ImgCodeByGet(phone, regenerate) {
    let params = {
        phone,
        regenerate
    }
    return get(ImgCodeApi, params)
}
export function ImgCodeByPost(phone, code, type) {
    let params = {
        phone,
        code,
        type
    }
    return post(ImgCodeApi, params)
}