//============================新消息模块==========================
import {get } from './axios'
import { noticeCountApi, noticeApi, isAllReadApi } from './apipath'

// GET-消息数量
export function noticeCount() {
    return get(noticeCountApi)
}

// GET-提醒列表
export function notice(type, targetType, sort, page) {
    let params = {
        type,
        targetType,
        sort,
        page
    }
    return get(noticeApi, params)
}

// PUT-标记已读
export function isAllRead(type, targetType) {
    let params = {
        type,
        targetType
    }
    return get(isAllReadApi, params)
}