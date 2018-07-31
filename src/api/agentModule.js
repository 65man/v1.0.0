//============================代理模块==========================
import {get, post, put } from './axios'
import { bindParentApi, addAgentApi, agentApproveApi, updateApproveApi, lowerAgentApi, lowerAgentInfoApi } from './apipath'

// 上级代理
export function bindParent() {
    return get(bindParentApi)
}

// 新增代理
export function addAgent(nickname, role_id, telephone, phone, password) {
    let params = {
        nickname,
        role_id,
        telephone,
        phone,
        password
    }
    return post(addAgentApi, params)
}

// 代理申请列表
export function agentApprove(expand, page) {
    let params = {
        expand,
        page
    }
    return get(agentApproveApi, params)
}

// GET查看审核详情，PUT-审核代理
export function updateApproveByGet(id, expand) {
    let params = {
        expand
    }
    return get(updateApproveApi + id, params)
}

// PUT-审核代理
export function updateApproveByPut(id, status) {
    let params = {
        status
    }
    return put(updateApproveApi + id, params)
}

// 查看下级代理&用户列表
export function lowerAgent(params) {
    return get(lowerAgentApi, params)
}

// 查看下级代理详情
export function lowerAgentInfo(id) {
    return get(lowerAgentInfoApi + id)
}