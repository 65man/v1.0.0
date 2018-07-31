//============================数据统计模块==========================
import {get } from './axios'
import { dataCountAddApi, dataCountPlayApi } from './apipath'

export function dataCount(startTime, endTime, sort, page, type, urlAPI, level = '') {
    let params = {
        startTime,
        endTime,
        sort,
        page,
        type,
        level
    }
    return urlAPI == 'add' ? get(dataCountAddApi, params) : get(dataCountPlayApi, params);
}