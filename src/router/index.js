import Vue from 'vue'
import Router from 'vue-router'
// 登录
import login from '@/components/login'
import blank from '@/components/blank' //退出空白页交互
// 注册
import register from '@/components/register'
import regqrCode from '@/components/register-qrcode'
import bindId from '@/components/bind-id' //已经绑定ID禁止访问
import bindWeChat from '@/components/bind-wechat'
import examineStatus from '@/components/examine-status'
// 找回密码
import findPassword from '@/components/find-password'
// 公用头部
import layout from '@/components/layout' //不是代理禁止访问
// 概览
import home from '@/components/home' //不是代理禁止访问
// 我的用户
import userList from '@/components/user-list' //不是代理禁止访问
import userCount from '@/components/user-count' //不是代理禁止访问
// 我的收益
import incomeCount from '@/components/income-count' //不是代理禁止访问
import incomeDetail from '@/components/income-detail' //不是代理禁止访问
import cashDetail from '@/components/cash-detail' //不是代理禁止访问
import cashOutlay from '@/components/cash-outlay' //不是代理禁止访问
// 我的代理
import higherAgent from '@/components/agent-higher' //不是代理禁止访问
import lowerAgent from '@/components/agent-lower' //不是代理禁止访问
import examineAgent from '@/components/agent-examine' //不是代理禁止访问
import addAgent from '@/components/agent-add' //不是代理禁止访问
import agentCount from '@/components/agent-count' //不是代理禁止访问
// 更多功能
import myInfo from '@/components/my-info' //不是代理禁止访问
import myMessage from '@/components/my-message' //不是代理禁止访问
import shareqrCode from '@/components/share-qrcode' //不是代理禁止访问
// 微信
import loading from '@/components/loading' //不是代理禁止访问
// 修改默认密码
import changePwd from '@/components/change-pwd'

// 第一次修改默认密码
import LoginFirst from '@/components/loginFirst'


Vue.use(Router)

// 无需权限路由
export const constantRouterMap = [{
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/blank',
        name: 'blank',
        component: blank
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
    {
        path: '/regqrcode',
        name: 'regqrCode',
        component: regqrCode
    },
    {
        path: '/findpassword',
        name: 'findPassword',
        component: findPassword
    },
    {
        path: '/bindid',
        name: 'bindId',
        component: bindId,
    },
    {
        path: '/bindwechat',
        name: 'bindWechat',
        component: bindWeChat,
    },
    {
        path: '/examinestatus',
        name: 'examineStatus',
        component: examineStatus,
    },
    {
        path: '/loading',
        name: 'loading',
        component: loading,
    },
    {
        name: 'default',
        path: '/',
        redirect: '/layout/home'
    },
    //测试用的
    {
        name: 'layout',
        path: '/layout',
        component: layout,
        children:  [{
            path: 'home',
            name: 'home',
            component: home,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'userlist',
            name: 'userList',
            component: userList,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'usercount',
            name: 'userCount',
            component: userCount,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'incomecount',
            name: 'incomeCount',
            component: incomeCount,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'incomedetail',
            name: 'incomeDetail',
            component: incomeDetail,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'cashdetail',
            name: 'cashDetail',
            component: cashDetail,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'cashoutlay',
            name: 'cashOutlay',
            component: cashOutlay,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'higheragent',
            name: 'higherAgent',
            component: higherAgent,
            meta: {
                role: ['2', '3'],
            },
        },
        {
            path: 'loweragent',
            name: 'lowerAgent',
            component: lowerAgent,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'examineagent',
            name: 'examineAgent',
            component: examineAgent,
            meta: {
                role: ['2', '1'],
            },
        },
        {
            path: 'addagent',
            name: 'addAgent',
            component: addAgent,
            meta: {
                role: ['2', '1'],
            },
        },
        {
            path: 'agentcount',
            name: 'agentCount',
            component: agentCount,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'myinfo',
            name: 'myInfo',
            component: myInfo,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'mymessage',
            name: 'myMessage',
            component: myMessage,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'shareqrcode',
            name: 'shareqrCode',
            component: shareqrCode,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'changepwd',
            name: 'changepwd',
            component: changePwd,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'changepwd',
            name: 'changepwd',
            component: changePwd,
            meta: {
                role: ['2', '1', '3'],
            },
        }
    ]
    },
]


export default new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})


// 权限路由    otherLevel   firstLevel  lastLevel
export const asyncRouterMap = [{
    path: '/layout',
    name: 'layout',
    component: layout,
    meta: {
        role: ['2', '1', '3'],
    },
    children: [{
            path: 'home',
            name: 'home',
            component: home,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'userlist',
            name: 'userList',
            component: userList,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'usercount',
            name: 'userCount',
            component: userCount,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'incomecount',
            name: 'incomeCount',
            component: incomeCount,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'incomedetail',
            name: 'incomeDetail',
            component: incomeDetail,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'cashdetail',
            name: 'cashDetail',
            component: cashDetail,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'cashoutlay',
            name: 'cashOutlay',
            component: cashOutlay,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'higheragent',
            name: 'higherAgent',
            component: higherAgent,
            meta: {
                role: ['2', '3'],
            },
        },
        {
            path: 'loweragent',
            name: 'lowerAgent',
            component: lowerAgent,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'examineagent',
            name: 'examineAgent',
            component: examineAgent,
            meta: {
                role: ['2', '1'],
            },
        },
        {
            path: 'addagent',
            name: 'addAgent',
            component: addAgent,
            meta: {
                role: ['2', '1'],
            },
        },
        {
            path: 'agentcount',
            name: 'agentCount',
            component: agentCount,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'myinfo',
            name: 'myInfo',
            component: myInfo,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'mymessage',
            name: 'myMessage',
            component: myMessage,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'shareqrcode',
            name: 'shareqrCode',
            component: shareqrCode,
            meta: {
                role: ['2', '1', '3'],
            },
        },
        {
            path: 'loginFirst',
            name: 'loginFirst',
            component: LoginFirst,
            meta: {
                role: ['2', '1', '3'],
            },
        }
    ]
}];
