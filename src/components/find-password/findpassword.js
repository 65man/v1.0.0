//引入请求
import { findPswCode, findPswNew } from "../../api/loginModule";

import { ImgCodeByGet, ImgCodeByPost } from "../../api/codeModule";

//引入验证注册手机号，代理商名字
import { accountValidate } from "../../api/validateModule";

//引入倒计时
import { setCookie, getCookie } from "../../utils/cookies.js";

//引入弹窗交互
import {
    toastTips,
    confirmTips,
    alertTips,
    loadingTips
} from "../../utils/messageTips.js";

//引入正则匹配
import { checkPhone, checkPassword } from "../../utils/regular.js";

export default {
    data() {
        return {
            phone: "",
            verify_code: "",
            imgCode: "", //3.图片验证码
            showImgCode: false, //3.显示图片验证框
            imgCodeUrl: "", //3.图片地址
            isdisabled: false, //3.手机验证码按钮
            codeSecond: "", //3.手机验证码时间
            codeTips: "发送验证码", //3.手机验证码提示
            phoneTips: "", //手机号提示文本
            isphoneTips: false, //手机号提示框
            password: "",
            password2: "",
            showChange: false,
            ispasswordTips: false, //一次密码提示框
            ispassword2Tips: false, //二次密码提示框
            pswtoken: ""
        };
    },
    mounted() {
        var _this = this;
        if (getCookie("verifycodePsw")) {
            _this.isdisabled = true;
            _this.codeSecond =
                60 -
                (parseInt(new Date().getTime() / 1000) - getCookie("verifycodePsw"));
            _this.codeTips = "重新发送";
            var sendCodeID = setInterval(function() {
                _this.codeSecond--;
                if (_this.codeSecond == 0) {
                    clearTimeout(sendCodeID);
                    _this.isdisabled = false;
                    _this.codeSecond = "";
                    _this.codeTips = "发送验证码";
                }
            }, 1000);
        }
    },
    methods: {
        // ====================1.点击获取手机验证码====================
        // 1.1检测手机号是否已经注册
        sendCode() {
            var _this = this;
            if (_this.phone == "") {
                _this.phoneTips = "请输入手机号";
                _this.isphoneTips = true;
            } else {
                if (!checkPhone(_this.phone)) {} else {
                    accountValidate({
                            phone: _this.phone
                        },
                        "phone",
                        this.resultValidate
                    );
                }
            }
        },
        // 1.2检测手机号是否已经注册
        resultValidate(type, isCan, data) {
            var _this = this;
            if (type == "phone") {
                if (isCan == "false") {
                    _this.getimgCodeUrl(1);
                }
                if (isCan == "true") {
                    _this.phoneTips = "该手机号未注册";
                    _this.isphoneTips = true;
                }
            }
        },
        // 1.3获取图片验证码
        getimgCodeUrl(refresh) {
            var _this = this;
            ImgCodeByGet(_this.phone, refresh)
                .then(res => {
                    _this.imgCodeUrl = res.captcha;
                    _this.showImgCode = true;
                })
                .catch(err => {});
        },
        //1.4更换图片验证码
        ReImgCodeReUrl() {
            this.getimgCodeUrl(1);
        },
        //1.5检查图片验证码
        checkImgCode() {
            var _this = this;
            ImgCodeByPost(_this.phone, _this.imgCode, "2")
                .then(res => {
                    setCookie(
                        "verifycodePsw",
                        parseInt(new Date().getTime() / 1000),
                        1 / 1440
                    );
                    _this.showImgCode = false;
                    _this.imgCode = "";
                    toastTips("success", "7.5em", "已发送短信验证");
                    _this.isdisabled = true;
                    _this.codeSecond = 60;
                    _this.codeTips = "重新发送";
                    var sendCodeID = setInterval(function() {
                        _this.codeSecond--;
                        if (_this.codeSecond == 0) {
                            clearTimeout(sendCodeID);
                            _this.isdisabled = false;
                            _this.codeSecond = "";
                            _this.codeTips = "发送验证码";
                        }
                    }, 1000);
                })
                .catch(err => {
                    if (err.data.errCode == 86007) {
                        toastTips("warn", "7.5em", "验证码错误");
                    } else if (err.data.errCode == 429) {
                        _this.showImgCode = false;
                        _this.imgCode = "";
                        toastTips("text", "16em", "已发送短信验证,请勿频繁操作");
                    }
                });
        },

        // ====================2点击提交====================
        // 2.1检测手机
        submit() {
            var _this = this;
            if (!checkPhone(this.phone)) {} else {
                accountValidate({
                        phone: _this.phone
                    },
                    "phone",
                    this.sendPhoneCode
                );
            }
        },
        //2.2提交短信验证码获取password_reset_token
        sendPhoneCode(type, isCan, data) {
            var _this = this;
            if (type == "phone") {
                if (isCan == "false") {
                    findPswCode(_this.phone, _this.verify_code)
                        .then(res => {
                            _this.pswtoken = res["password_reset_token"];
                            _this.showChange = true;
                        })
                        .catch(err => {
                            if (err.data.errCode == 86007) {
                                alertTips("短信验证码错误");
                            }
                        });
                }
                if (isCan == "true") {
                    _this.phoneTips = "该手机号未注册";
                    _this.isphoneTips = true;
                }
            }
        },
        // 2.3弹框是否修改
        sureReset() {
            var _this = this;
            if (!checkPassword(this.password) || !_this.password2Blur()) {
                toastTips("text", "13em", "输入有误,请重新核对");
            } else {
                _this.showChange = false;
                confirmTips(
                    "确定把账号密码修改成：" + _this.password + "？",
                    this.AgreeConfirm,
                    this.AgreeCancel
                );
            }
        },
        // 2.4确定修改
        AgreeConfirm() {
            var _this = this;
            loadingTips("修改中");
            findPswNew(_this.password, _this.pswtoken)
                .then(res => {
                    _this.$vux.loading.hide();
                    alertTips("修改成功，可使用新密码登录", function reLogin() {
                        _this.$router.push({
                            name: "blank"
                        });
                    });
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                    alertTips("修改失败，密码长度在6~12之间，只能包含字母、数字的组合。");
                });
        },
        // 2.5取消修改
        AgreeCancel() {
            this.showChange = true;
        },

        // ====================3交互模块====================
        // 3.1判断进入离开手机号输入框
        phoneBlur() {
            if (this.phone != "") {
                if (!checkPhone(this.phone)) {
                    this.phoneTips = "手机号格式错误";
                    this.isphoneTips = true;
                }
            }
        },
        phoneFocus() {
            this.isphoneTips = false; //进入隐藏提示
        },

        //3.2判断进入离开一次密码输入框
        passwordBlur() {
            if (this.password != "") {
                if (!checkPassword(this.password)) {
                    this.ispasswordTips = true;
                }
            }
        },
        passwordFocus() {
            this.ispasswordTips = false; //进入隐藏提示
        },

        // 3.3判断进入离开二次密码输入框
        password2Blur() {
            if (
                this.password2 != "" &&
                this.password != "" &&
                this.password != this.password2
            ) {
                this.ispassword2Tips = true;
                return false;
            }
            return true;
        },
        password2Focus() {
            this.ispassword2Tips = false; //进入隐藏提示
        }
    },

    // ====================4检测是否可以点击====================
    computed: {
        submitDisabled() {
            var _this = this;
            if (_this.phone == "" || _this.verify_code == "") {
                return true;
            }
            return false;
        },
        sureResetDisabled() {
            var _this = this;
            if (_this.password == "" || _this.password2 == "") {
                return true;
            }
            return false;
        },
        sendCodeDisabled() {
            var _this = this;
            if (_this.imgCode == "") {
                return true;
            }
            return false;
        }
    }
};