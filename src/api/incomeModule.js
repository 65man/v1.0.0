//============================收益模块==========================
import { get, post } from "./axios";
import {
    rebateApi,
    exchangeCanApi,
    cashPhoneCodeApi,
    cashOutlayApi,
    cashDetailApi,
    incomeApi,
    incomeCountApi,
    performanceApi,
    performanceDetailApi,
    exchangeApi,
    exchangeSendApi
} from "./apipath";

// -查看可提现金额
export function exchangeCan() {
    return get(exchangeCanApi);
}

// 发送手机验证码
export function cashPhoneCode(type) {
    return post(cashPhoneCodeApi);
}

// 发出提现申请
export function cashOutlay(money, wechat, verify_code) {
    let params = {
        money,
        wechat,
        verify_code
    };
    return post(cashOutlayApi, params);
}

// 获取提现记录
export function cashDetail(status, sort, page) {
    let params = {
        status,
        sort,
        page
    };
    return get(cashDetailApi, params);
}

// 收益汇总
export function incomeCount(startTime, endTime, sort, page) {
    let params = {
        startTime,
        endTime,
        sort,
        page
    };
    return get(incomeCountApi, params);
}

// 用户下级收益明细
export function income(params) {
    return get(incomeApi, params);
}

// 用户下级收益明细-绩效奖
export function performance(page,sort,lowerNickname) {
    let params = {
        page,
        sort,
        lowerNickname
    };
    return get(performanceApi, params);
}
// 用户下级收益明细-返利列表
export function rebate(page,sort,roleId) {
    let params = {
        page,
        sort,
        roleId
    };
    return get(rebateApi, params);
}

// 绩效列表详情
export function performanceDetail(id) {
    let params = {
        performance_id: id
    };
    return get(performanceDetailApi, params);
}

// 提现列表
export const exchange = page => {
    let params = {
        page
    };
    return get(exchangeApi, params);
};

// 提现申请
export const exchangeSend = money => {
    let params = {
        money
    };
    return post(exchangeSendApi, params);
};
