import {
    refreshApi
} from "../../api/apipath";

import {
    post,
    get,
    put
} from '../../api/axios';

import {
    alertTips
} from "./messageTips.js";

import { setCookie, getCookie, clearCookie } from "../js/cookies";
import store from '../../store';
import router from '../../router'

export function getToken() {
    var expire = getCookie("ZW-G-isExpire") //获取token过期时间
    var access_token = getCookie("ZW-G-isTk") //获取token
    var refresh_token = getCookie("ZW-G-isReTk") //获取Retoken
        // ====================1.判断是否有token====================
    if (!access_token || !expire || !refresh_token) {
        return false;
    } else {
        return true;
    }
}

// 判断token是否过期了
export function checkToken() {
    var expire = getCookie("ZW-G-isExpire") //获取token过期时间
    var access_token = getCookie("ZW-G-isTk") //获取token
    var timenow = parseInt(new Date().getTime() / 1000); //获取当前时间
    // ====================判断是否要重新获取token====================
    var timeexpire = expire - timenow;
    if (timeexpire <= 200 && timeexpire >= -7000) {
        var refresh_token = getCookie("ZW-G-isReTk") //获取Retoken
            // 重新续航时间
        post(refreshApi, {
            'access_token': access_token,
            'refresh_token': refresh_token
        }).then(res => {
            // 重新登录成功保存登录数据
            store.state.token = res["access_token"];
            setCookie("ZW-G-isTk", res["access_token"], 1);
            setCookie("ZW-G-isReTk", res["refresh_token"], 1);
            setCookie("ZW-G-isExpire", res["expire"], 1);
            setCookie("ZW-G-isWechat", getCookie('ZW-G-isWechat'), 1);
            setCookie("ZW-G-isRoles", getCookie('ZW-G-isRoles'), 1);
            setCookie("ZW-G-isMaxlv", getCookie('ZW-G-isMaxlv'), 1);
            setCookie("ZW-G-isLv", getCookie('ZW-G-isLv'), 1);
            setCookie("ZW-G-isID", getCookie('ZW-G-isID'), 1);
            setCookie("ZW-G-isCode", getCookie('ZW-G-isCode'), 1);
            setCookie("ZW-G-isAG", getCookie('ZW-G-isAG'), 1);
            // if (config.method == 'get') {
            //     get(config.url, config.params)
            // } else if (config.method == 'put' || config.method == 'post') {
            //     put(config.url, config.data)
            // }
        }).catch(err => {
            alertTips('该用户已在其它地方登录', function reLogin() {
                router.push({
                    name: "blank"
                });
            })
        })
    } else if (timeexpire < -7000) {
        alertTips('登录验证已过期，请重新登录', function reLogin() {
            router.push({
                name: "blank"
            });
        })
    } else {
        store.state.token = access_token
        return true;
    }
}