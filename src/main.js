import Vue from 'vue'
import router from './router'
import App from './App'
import store from './store'
import filters from './filter'
import FastClick from 'fastclick'


// ===============1.引入插件===============
//引入qs数据转换
import qs from 'qs';
Vue.prototype.qs = qs;
//引入点击复制
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);
// 引入弹窗组件
import {
    AlertPlugin,
    ToastPlugin,
    LoadingPlugin,
    ConfirmPlugin
} from 'vux'
Vue.use(AlertPlugin); // Alert弹窗插件
Vue.use(ToastPlugin); // Toast弹窗插件
Vue.use(LoadingPlugin); // Loading弹窗插件
Vue.use(ConfirmPlugin); // Loading弹窗插件

// ===============引入svg===============
import Icon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', Icon);

// ===============注册vux相关组件===============
import { Group, Selector, XButton, XTable, XInput, Scroller, XDialog, Datetime, ButtonTab, XTextarea, ButtonTabItem, Cell, Tab, TabItem, Step, StepItem, Countup, Grid, GridItem, Flexbox, FlexboxItem, Badge, XHeader, Checker, CheckerItem, CheckIcon, TransferDomDirective as TransferDom } from 'vux'
Vue.component('group', Group)
Vue.component('selector', Selector)
Vue.component('x-button', XButton)
Vue.component('x-table', XTable)
Vue.component('x-input', XInput)
Vue.component('scroller', Scroller)
Vue.component('x-dialog', XDialog)
Vue.component('datetime', Datetime)
Vue.component('button-tab', ButtonTab)
Vue.component('button-tab-item', ButtonTabItem)
Vue.component('x-textarea', XTextarea)
Vue.component('cell', Cell)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('step', Step)
Vue.component('step-item', StepItem)
Vue.component('countup', Countup)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('x-header', XHeader)
Vue.component('badge', Badge)
Vue.component('checker', Checker)
Vue.component('checker-item', CheckerItem)
Vue.component('check-icon', CheckIcon)



// ===============4.全局路由守卫===============
import {
    alertTips
} from "./utils/messageTips.js";
import {
    asyncRouterMap
} from '@/router'
import {
    getaccessedRouters
} from "./utils/permission.js";
import {
    getToken
} from "./utils/token.js";

//引入cookies
import { setCookie, getCookie } from "../src/utils/cookies";
// let registerRouteFresh = true
// const whiteList = ['/blank', '/loading', '/login', '/register', '/regqrcode', '/findpassword'] //白名单
// router.beforeEach((to, from, next) => {
//     if (to.path == '/login' || to.path == '/loading' || to.path == '/blank') {
//         next()
//     } else if (getToken()) {
//         // ====================根据权限动态加载路由是谁=================
//         if (registerRouteFresh && from.path != '/register' && from.path != '/bindwechat' && to.path != '/blank' && to.path != '/bindwechat') {
//             // ====================1.判断登录权限=================
//             var bind_role = getCookie('ZW-G-isID');
//             var is_agency = getCookie('ZW-G-isAG');
//             var level = getCookie('ZW-G-isLv');
//             var Maxlevel = getCookie('ZW-G-isMaxlv');
//             if (level == '1') {
//                 var roles = '1' //总代理
//             } else if (bind_role == 'false') {
//                 var roles = '4' //没绑定ID
//             } else if (bind_role != 'false' && is_agency == 'false') {
//                 var roles = '5' //代理申请中
//             } else if (level != 'false' && Maxlevel != 'false' && level >= Maxlevel) {
//                 var roles = '3' //最后一层代理
//             } else {
//                 var roles = '2' //其它代理
//             }
//             setCookie('ZW-G-isRoles', roles, 1);
//             if (roles != '4' && roles != '5') {
//                 router.addRoutes(getaccessedRouters(asyncRouterMap, roles)) //根据权限增加路由到路由表
//                 registerRouteFresh = false; //只执行一次
//                 next({...to });
//             }
//             if (roles == '4') {
//                 if (to.path == '/bindid') {
//                     alertTips(
//                         "该账号需先绑定游戏ID并申请成为代理商，方可使用本系统"
//                     );
//                     next()
//                 } else {
//                     next('/bindid');
//                 }
//                 return;
//             }
//             if (roles == '5') {
//                 if (to.path == '/examinestatus') {
//                     next()
//                 } else {
//                     next('/examinestatus');
//                 }
//                 return;
//             }
//         }
//         next()
//     } else if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//         next()
//     } else {
//         next('/login') //否则跳转到登录页面
//     }
// });

FastClick.attach(document.body);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app-box')
