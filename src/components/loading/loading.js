//引入退出账号
import { loginOut } from "../../utils/index.js";

// 引入弹窗提示
import {
    loadingTips,
    alertTips,
    confirmDiyTips
} from "../../utils/messageTips.js";

//引入cookie
import { setCookie, getCookie, clearCookie } from "../../utils/cookies.js";

// 引入请求
import { loginByWechat } from "../../api/loginModule";
import { post } from "../../api/axios";
import { refreshApi } from "../../api/apipath";

export default {
    beforeRouteEnter(to, from, next) {
        if (from.name == "home") {
            next({
                name: "default"
            });
        } else {
            next();
        }
    },

    data() {
        return {
            code: "",
            state: ""
        };
    },
    mounted() {
        var _this = this;
        if (_this.$route.query.code) {
            loadingTips("加载中");
            _this.code = _this.$route.query.code;
            _this.state = _this.$route.query.state;
            if (_this.state == "1") {
                var expire = getCookie("ZW-G-isExpire"); //获取token过期时间
                var access_token = getCookie("ZW-G-isTk"); //获取token
                var refresh_token = getCookie("ZW-G-isReTk"); //获取Retoken
                // ====================1.判断是否有token====================
                if (access_token && expire && refresh_token) {
                    _this.$vux.loading.hide();
                    var timenow = parseInt(new Date().getTime() / 1000); //获取当前时间
                    // ====================判断是否要重新获取token====================
                    var timeexpire = expire - timenow;
                    if (timeexpire <= 200 && timeexpire >= -7000) {
                        // 重新续航时间
                        post(refreshApi, {
                                access_token: access_token,
                                refresh_token: refresh_token
                            })
                            .then(res => {
                                // 重新登录成功保存登录数据
                                _this.$store.state.token = res["access_token"];
                                setCookie("ZW-G-isTk", res["access_token"], 7);
                                setCookie("ZW-G-isReTk", res["refresh_token"], 7);
                                setCookie("ZW-G-isExpire", res["expire"], 7);
                                setCookie("ZW-G-isWechat", getCookie("ZW-G-isWechat"), 7);
                                setCookie("ZW-G-isRoles", getCookie("ZW-G-isRoles"), 7);
                                setCookie("ZW-G-isMaxlv", getCookie("ZW-G-isMaxlv"), 7);
                                setCookie("ZW-G-isLv", getCookie("ZW-G-isLv"), 7);
                                setCookie("ZW-G-isID", getCookie("ZW-G-isID"), 7);
                                setCookie("ZW-G-isCode", getCookie("ZW-G-isCode"), 7);
                                setCookie("ZW-G-isAG", getCookie("ZW-G-isAG"), 7);
                                _this.$router.push({
                                    path: "/"
                                });
                            })
                            .catch(err => {
                                alertTips("该用户已在其它地方登录", function reLogin() {
                                    _this.$router.push({
                                        name: "blank"
                                    });
                                });
                            });
                    } else if (timeexpire < -7000) {
                        alertTips("登录验证已过期，请重新登录", function reLogin() {
                            _this.$router.push({
                                name: "blank"
                            });
                        });
                    } else {
                        _this.$router.push({
                            path: "/"
                        });
                    }
                } else {
                    _this.login();
                }
            } else {
                _this.login();
            }
        } else {
            loginOut(this);
        }
    },
    methods: {
        login() {
            //根据code获取返回结果
            var _this = this; //情况1有此绑定用户,获得登录信息 跳转页面
            loginByWechat(_this.code, "wechat")
                .then(res => {
                    _this.$vux.loading.hide();
                    //1.5.1登录成功
                    _this.$store.state.token = res["access_token"];
                    setCookie("ZW-G-isTk", res["access_token"], 7);
                    setCookie("ZW-G-isReTk", res["refresh_token"], 7);
                    setCookie("ZW-G-isExpire", res["expire"], 7);
                    setCookie("ZW-G-isCode", res["code"], 7);
                    setCookie("ZW-G-isLv", res["level"], 7);
                    setCookie("ZW-G-isMaxlv", res["max_level"], 7);
                    setCookie("ZW-G-isID", res["bind_role"], 7);
                    setCookie("ZW-G-isAG", res["is_agency"], 7);
                    setCookie("ZW-G-isWechat", res["bind_wechat"], 7);
                    _this.$router.push({
                        path: "/"
                    });
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                    if (_this.state == 2) {
                        alertTips("该微信号未绑定本系统", function goLogin() {
                            _this.$router.push({
                                name: "login"
                            });
                        });
                    } else {
                        _this.$router.push({
                            name: "login"
                        });
                    }
                });
        }
    }
};