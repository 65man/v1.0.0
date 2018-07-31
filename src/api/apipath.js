// ===============封装API接口===============

// 登录√
export const loginApi = 'account/login' // POST-登录
export const refreshApi = 'account/refresh' // 重新获取登录
export const findPswCodeApi = 'password/forget' //POST-密码找回提交短信验证码
export const findPswNewApi = 'password/reset' //POST-密码找回提交新密码

// 注册√
export const registerApi = 'account/signup' //POST-发送注册
export const bindInfoApi = 'agency/check' //GET-查看ID代理商信息
export const bindGameIdApi = 'agency/bind' //PUT-绑定ID
export const bindAgentApi = 'application/apply' //POST-申请代理
export const bindCheckApi = 'application/check' //GET-查看代理申请情况

// 代理,用户√
export const lowerAgentApi = 'relation/search' //GET-查看下级代理、用户
export const lowerAgentInfoApi = 'relation/' //GET-查看下级详情
export const agentApproveApi = 'application/approve' //GET-下级代理申请列表
export const updateApproveApi = 'application/' //PUT-审核详细信息/GET查看审核详情
export const addAgentApi = 'agency/subordinate' //POST-新增代理
export const bindParentApi = 'agency/parent' //GET-查看已经绑定ID代理商信息

//提现、收益√
// export const cashTotalCanApi = 'withdraw/can' //GET-查看可提现金额
export const cashPhoneCodeApi = 'verify/withdraw' //POST-发送手机验证码
export const cashOutlayApi = 'withdraw/apply' //POST-发出提现申请
export const cashDetailApi = 'withdraw' //GET-获取提现记录
export const incomeApi = 'income' //GET-用户下级收益明细
export const incomeCountApi = 'statistics/income' //GET-收益汇总

export const performanceApi = 'performance' //GET-绩效列表 绩效奖
export const rebateApi = 'rebate' //GET-返利列表
export const performanceDetailApi = 'performance/detail' //GET-绩效列表详情
export const exchangeApi = 'exchange' // GET-兑换列表
export const exchangeCanApi = 'exchange/can' // GET-可兑换金额
export const exchangeSendApi = 'exchange/send' // POST-兑换申请

//我的信息修改信息、修改密码、绑定微信√
export const resetInfoApi = 'agency/detail' //POST-修改信息
export const resetPswApi = 'agency/password' //POST-修改密码
export const MyInfoApi = 'agency/person' //GET-我的信息
export const bindWcApi = 'agency/wechat' //POST-绑定微信

// 消息提醒√
export const noticeCountApi = 'notice/unread' //GET-消息数量
export const noticeApi = 'notice' //GET-提醒列表
export const isAllReadApi = 'notice/ignore' //get-标记已读

//数据统计√
export const dataCountAddApi = 'statistics/junior' //GET-获取新增用户新增代理
export const dataCountPlayApi = 'statistics/invite' //GET-获取活跃，玩一局用户,总用户数

//通用√
export const ImgCodeApi = 'verify/captcha' //GET-发送图片验证码 POST-检查图片验证码
export const accountValidateApi = 'account/validate' //POST-验证手机号,代理商名字
export const agencyValidateApi = 'agency/validate' //POST-验证手机号,代理商名字,ID是否绑定
