// 引入请求
import { register } from "../../api/registerModule";
import { ImgCodeByGet, ImgCodeByPost } from "../../api/codeModule";

//引入正则匹配
import {
    checkNickname,
    checkTelephone,
    checkPhone,
    checkPassword,
    nicknameBlurTips,
    telephoneBlurTips,
    phoneBlurTips,
    passwordBlurTips,
    password2BlurTips
} from "../../utils/regular.js";

//引入验证注册手机号，代理商名字
import { accountValidate } from "../../api/validateModule";

//引入cookies
import { setCookie, getCookie } from "../../utils/cookies.js";

//引入弹窗交互
import {
    toastTips,
    alertTips,
    loadingTips
} from "../../utils/messageTips.js";

export default {
    data() {
        return {
            step: 0, //1.流程进度
            imgCode: "", //1.图片验证码
            showImgCode: false, //1.显示图片验证框
            imgCodeUrl: "", //1.图片地址
            isdisabled: false, //1.手机验证码按钮
            codeSecond: "", //1.手机验证码时间
            //2.表单值
            nickname: "",
            telephone: "",
            phone: "",
            password: "",
            verify_code: "",
            password2: "", //2.二次密码
            codeTips: "发送验证码", //2.手机验证码提示
            nicknameTips: "", //3.代理商框提示文本
            isnicknameTips: false, //3.代理商提示框
            istelephoneTips: false, //3.联系电话提示框
            phoneTips: "", //3.手机号提示文本
            isphoneTips: false, //3.手机号提示框
            passwordTips: "", //3.一次密码提示文本
            ispasswordTips: false, //3.一次密码提示框
            ispassword2Tips: false, //3.二次密码提示框
            showAgreement: false, //3.显示隐藏合作协议
            selected: false //3.协议是否勾选
        };
    },
    mounted() {
        // ====================判断是否发送过验证码====================
        var _this = this;
        if (getCookie("verifycodeReg")) {
            _this.isdisabled = true;
            _this.codeSecond =
                60 -
                (parseInt(new Date().getTime() / 1000) - getCookie("verifycodeReg"));
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
        // ====================1验证码====================
        // 1.1点击获取手机验证码
        sendCode() {
            var _this = this;
            if (!checkPhone(_this.phone)) {
                toastTips("text", "12em", "请输入正确格式手机号");
            } else {
                accountValidate({
                        phone: this.phone
                    },
                    "phone",
                    this.resultValidate
                );
            }
        },
        // 1.2.获取图片验证码
        getimgCodeUrl(refresh) {
            var _this = this;
            ImgCodeByGet(_this.phone, refresh)
                .then(res => {
                    _this.imgCodeUrl = res.captcha;
                    _this.showImgCode = true;
                })
                .catch(err => {});
        },
        //1.3更换图片验证码
        ReImgCodeReUrl() {
            this.getimgCodeUrl(1);
        },
        //1.4检查图片验证码
        checkImgCode() {
            var _this = this;
            ImgCodeByPost(_this.phone, _this.imgCode, "1")
                .then(res => {
                    setCookie(
                        "verifycodeReg",
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

        // ====================2注册====================
        // 2.1发送注册请求
        sendregister() {
            var _this = this;
            // 2.2判断是否匹配正则
            if (!checkNickname(_this.nickname) ||
                !checkTelephone(_this.telephone) ||
                !checkPhone(_this.phone) ||
                !checkPassword(_this.password) ||
                _this.password != _this.password2
            ) {
                return;
            }

            // 2.3判断是否勾选协议
            if (_this.selected != true) {
                toastTips("text", "12em", "注册需要同意合作协议");
                return;
            }
            // 2.4检查有没信息是否符合
            accountValidate({
                    nickname: this.nickname,
                    phone: this.phone
                },
                "n&p",
                this.resultValidate
            );
        },

        // 2.5注册
        resultValidate(type, isCan, data) {
            var _this = this;
            if (type == "phone") {
                if (isCan == "false") {
                    _this.phoneTips = "该手机号已注册";
                    _this.isphoneTips = true;
                }
                if (isCan == "true") {
                    _this.getimgCodeUrl(1);
                }
            } else if (type == "n&p" && isCan == "false") {
                alertTips("注册信息有误，请重新核对");
                for (var index in data) {
                    if (data[index].field == "phone") {
                        this.phoneTips = "该手机号已被注册";
                        this.isphoneTips = true;
                    }
                    if (data[index].field == "nickname") {
                        this.nicknameTips = "该代理商名称已被注册";
                        this.isnicknameTips = true;
                    }
                }
            } else if (type == "n&p" && isCan == "true") {
                //2.6 进行注册
                loadingTips("注册中");
                register(
                        _this.nickname,
                        _this.telephone,
                        _this.phone,
                        _this.password,
                        _this.verify_code
                    )
                    .then(res => {
                        // 注册成功
                        _this.$vux.loading.hide();
                        setCookie("ZW-G-isTk", res["access_token"], 7);
                        setCookie("ZW-G-isReTk", res["refresh_token"], 7);
                        setCookie("ZW-G-isExpire", res["expire"], 7);
                        setCookie("ZW-G-isLv", false, 7);
                        setCookie("ZW-G-isMaxlv", false, 7);
                        setCookie("ZW-G-isID", false, 7);
                        setCookie("ZW-G-isAG", false, 7);
                        setCookie("ZW-G-isWechat", "false", 7);
                        _this.$store.state.token = res["access_token"];
                        toastTips("success", "7.5em", "注册成功");
                        setTimeout(() => {
                            _this.$router.push({
                                name: "bindWechat"
                            });
                        }, 1500);
                    })
                    .catch(err => {
                        // 注册失败
                        _this.$vux.loading.hide();
                        if (err.data.errCode == 422) {
                            for (var index in err.data.data) {
                                if (err.data.data[index].field == "phone") {
                                    alertTips("注册信息有误，请重新核对修改");
                                    this.phoneTips = "该手机号已被注册";
                                    this.isphoneTips = true;
                                }
                                if (err.data.data[index].field == "nickname") {
                                    alertTips("注册信息有误，请重新核对修改");
                                    this.nicknameTips = "该代理商名称已被注册";
                                    this.isnicknameTips = true;
                                }
                                if (err.data.data[index].field == "verify_code") {
                                    alertTips("短信验证码错误");
                                }
                            }
                        }
                    });
            }
        },

        // ====================3.交互模块====================
        // 3.1判断进入离开代理商名称输入框
        nicknameBlur() {
            nicknameBlurTips(this, this.nickname, "仅支持2~12位中英文、数字组合");
        },
        nicknameFocus() {
            //进入隐藏提示
            this.isnicknameTips = false;
        },

        // 3.2判断进入离开联系电话输入框
        telephoneBlur() {
            telephoneBlurTips(this, this.telephone);
        },
        telephoneFocus() {
            //进入隐藏提示
            this.istelephoneTips = false;
        },

        // 3.3判断进入离开手机号输入框
        phoneBlur() {
            phoneBlurTips(this, this.phone, "手机号格式错误");
        },
        phoneFocus() {
            this.isphoneTips = false;
        },

        // 3.4判断进入离开一次密码输入框
        passwordBlur() {
            passwordBlurTips(this, this.password, "仅支持6~12 位英文、数字组合");
        },
        passwordFocus() {
            this.ispasswordTips = false;
        },

        // 3.5判断进入离开二次密码输入框
        password2Blur() {
            password2BlurTips(this, this.password, this.password2);
        },
        password2Focus() {
            this.ispassword2Tips = false;
        },

        // 3.6显示隐藏合作协议
        show_agm() {
            this.showAgreement = true;
        },
        hide_agm() {
            this.showAgreement = false;
        }
    },

    // ====================4.监听按钮是否可以点击====================
    computed: {
        registerDisabled() {
            var _this = this;
            if (
                _this.nickname == "" ||
                _this.telephone == "" ||
                _this.phone == "" ||
                _this.password == "" ||
                _this.password2 == "" ||
                _this.verify_code == ""
            ) {
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