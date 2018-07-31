// 引入正则匹配
import {
    checkPhone,
    checkPassword,
    phoneBlurTips,
    passwordBlurTips
} from "../../utils/regular.js";
//引入cookie
import { setCookie, getCookie, clearCookie } from "../../utils/cookies.js";
// 引入弹窗提示
import {
    toastTips,
    loadingTips,
    alertTips
} from "../../utils/messageTips.js";
// 引入请求
import { loginByPhone } from "../../api/loginModule";

import {
    TransferDomDirective as TransferDom
} from "vux";

export default {
    directives: {
        TransferDom
    },
    data() {
        return {
            phone: "",
            password: "",
            type: "",
            rememberMe: false, //1.是否勾选
            phoneTips: "", //2.账号提示文本
            isphoneTips: false, //2.手机号格式提示
            passwordTips: "", //2.密码提示文本
            ispasswordTips: false, //2.密码格式提示
            showAgreement: false, //2.显示隐藏合作协议
            selected: true, //2.勾选合作协议
            wechat: "false"
        };
    },
    mounted() {
        var phone = getCookie("ZW-G-user");
        if (phone) {
            this.phone = getCookie("ZW-G-user");
            // this.password = getCookie("ZW-G-Psw");
            this.rememberMe = true;
        }
        this.wechat = GlobalConfig.SERVER_URL["weChat"];
    },
    methods: {
        // ====================1.发送登录请求====================
        sendlogin() {
            var _this = this;
            if (_this.phone == "" || _this.password == "" || _this.code == "") {
                toastTips("text", "10em", "请输入完整登录信息");
                return;
            }

            // 1.1判断是否匹配正则
            if (!checkPhone(this.phone) || !checkPassword(this.password)) {
                passwordBlurTips(this, this.password, "提示:6~12位");
                phoneBlurTips(this, this.phone, "手机号格式错误");
                return;
            }

            // 1.2是否有同意协议
            if (_this.selected != true) {
                toastTips("text", "12em", "需阅读并同意合作协议");
                return;
            }

            // 1.3是否点击记住我
            if (_this.rememberMe == true) {
                setCookie("ZW-G-user", this.phone, 30);
                // setCookie("ZW-G-Psw", this.password, 30);
            } else {
                clearCookie("ZW-G-user");
                // clearCookie("ZW-G-Psw");
            }

            // 1.4是否有连续失败3次记录
            if (getCookie("pwdWarn") && getCookie("userWarn") == this.phone) {
                var time =
                    60 - parseInt((new Date().getTime() - getCookie("pwdWarn")) / 1000);
                if (time <= 60 && time >= 0) {
                    alertTips("此账号连续验证失败3次，请" + time + "s后重试");
                    return;
                } else {
                    // clearCookie("pwdWarn");
                    clearCookie("userWarn");
                }
            }

            // 1.5发送登录
            loadingTips("登录中");
            loginByPhone(_this.phone, _this.password, "phone")
                .then(res => {
                    //1.5.1登录成功
                    _this.$vux.loading.hide();
                    setCookie("ZW-G-isTk", res["access_token"], 7);
                    setCookie("ZW-G-isReTk", res["refresh_token"], 7);
                    setCookie("ZW-G-isExpire", res["expire"], 7);
                    setCookie("ZW-G-isCode", res["code"], 7);
                    setCookie("ZW-G-isLv", res["level"], 7);
                    setCookie("ZW-G-isMaxlv", res["max_level"], 7);
                    setCookie("ZW-G-isID", res["bind_role"], 7);
                    setCookie("ZW-G-isAG", res["is_agency"], 7);
                    setCookie("ZW-G-isWechat", res["bind_wechat"], 7);
                    _this.$store.state.token = res["access_token"];
                    //总代跟其它代理
                    if (res["level"] == 1 || res["is_agency"] != false) {
                        _this.$router.push({
                            path: "/"
                        });
                        return;
                    }

                    //没申请绑定ID,跳转绑定ID页面
                    if (!res["bind_role"]) {
                        alertTips("该账号需先绑定游戏ID并申请成为代理商，方可使用本系统");
                        _this.$router.push({
                            name: "bindId"
                        });
                        return;
                    }
                    //绑定ID,不是代理，跳转审核页面
                    if (res["bind_role"] && !res["is_agency"]) {
                        _this.$router.push({
                            name: "examineStatus"
                        });
                        return;
                    }
                })
                .catch(err => {
                    //1.5.1登录失败
                    _this.$vux.loading.hide();
                    if (err.data.errCode == "422") {
                        alertTips("用户名或密码不正确，请重新输入");
                    } else if (err.data.errCode == "429") {
                        alertTips("此账号连续验证失败3次，请一分钟后重试");
                        var timenow = new Date().getTime();
                        setCookie("pwdWarn", timenow, 1 / 1440);
                        setCookie("userWarn", _this.phone, 1 / 1440);
                    } else if (err.data.status == 10002) {
                        alertTips(err.error);
                    }
                });
        },

        // ====================2.交互模块====================
        // 1.密码提示框提示、隐藏
        passwordFocus() {
            this.ispasswordTips = false; //进入隐藏提示
        },

        // 2.手机号提示框提示、隐藏
        phoneFocus() {
            this.isphoneTips = false; //进入隐藏提示
        },

        // 3.显示隐藏合作协议
        show_agm() {
            this.showAgreement = true;
        },
        hide_agm() {
            this.showAgreement = false;
        },

        // 4.跳转注册页面
        // goRegister() {
        //     this.$router.push({
        //         name: "register"
        //     });
        // },

        // 5.跳转找回页面
        // findPassword() {
        //     this.$router.push({
        //         name: "findPassword"
        //     });
        // },

        // 6.使用微信登录
        weChatLogin() {
            if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                window.location.href =
                    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8513a40d3d6a961e&redirect_uri=https%3a%2f%2fm.cs.qp.gzzhongw.net%2floading&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect";
            } else {
                window.location.href =
                    "https://open.weixin.qq.com/connect/qrconnect?appid=wx691c6a6d3c48a13b&redirect_uri=https%3a%2f%2fm.cs.qp.gzzhongw.net%2floading&response_type=code&scope=snsapi_login&state=2#wechat_redirect";
            }
        }
    }
};
