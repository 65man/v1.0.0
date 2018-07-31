// 引入请求方式
import {
    MyInfo,
    resetInfo,
    resetPsw,
    bindWc
} from '../../api/myInfoModule';

// 引入弹窗交互
import {
    alertTips,
    loadingTips,
    confirmTips,
    toastTips
} from "../../utils/messageTips.js";

//引入正则匹配
import {
    checkNickname,
    checkTelephone,
    checkPhone,
    checkPassword,
    telephoneBlurTips,
    phoneBlurTips,
    passwordBlurTips,
    password2BlurTips
} from "../../utils/regular.js";

export default {
    data() {
        return {
            dataInfo: '', //我的信息
            isXdialog: false, //弹框
            XdialogIndex: '', //弹框一二
            telephone: '', //2联系电话
            istelephoneTips: false, //2联系电话提示框
            passwordTips: '', //1一次密码提示文本
            ispasswordTips: false, //1一次密码提示框
            ispassword2Tips: false, //1二次密码提示框
            oldPassword: '', //3旧密码
            password: '', //3新密码
            password2: '', //3新密码2
            code: '' //微信授权返回值
        };
    },
    mounted() {
        var _this = this;
        this.$store.state.headerTitle = "我的信息";
        // ====================1.首次载入默认数据====================
        loadingTips("加载中");
        this.getList();
        if (_this.$route.query.code && _this.$store.state.Wechat == 'false') {
            _this.code = _this.$route.query.code;
            _this.sendWeChatCode();
        }

    },
    methods: {
        // ====================1.获取我的信息====================
        getList: function() {
            var _this = this;
            MyInfo()
                .then(res => {
                    _this.$vux.loading.hide();
                    _this.dataInfo = res;
                }).catch(err => {
                    _this.$vux.loading.hide();
                })
        },
        // ====================2.修改基本信息====================
        // 2.判断进入离开联系电话输入框
        telephoneBlur() {
            telephoneBlurTips(this, this.telephone)
        },
        telephoneFocus() {
            this.istelephoneTips = false; //进入隐藏提示
        },
        // 2.点击修改用户信息弹框
        changeInfo: function() {
            this.telephone = this.dataInfo.telephone;
            this.istelephoneTips = false;
            this.isXdialog = true;
            this.XdialogIndex = 1;
        },
        // 2.更新信息
        updateInfo: function() {
            var _this = this;
            // 2.2判断是否匹配正则
            if (!checkTelephone(_this.telephone)) {
                return;
            }
            if (this.telephone == this.dataInfo.telephone) {
                toastTips('text', '10em', '联系方式无修改')
                return;
            }
            this.isXdialog = false;
            loadingTips('修改中');
            resetInfo(_this.telephone).then(res => {
                _this.$vux.loading.hide();
                alertTips('修改成功');
                _this.dataInfo.telephone = _this.telephone;
            }).catch(err => {
                toastTips('text', '12em', '修改失败，请稍后重试')
                _this.$vux.loading.hide();
            })

        },
        Infohide() {
            this.isXdialog = true;
        },

        // ====================3.修改密码====================
        // 3.判断进入离开一次密码输入框
        passwordBlur() {
            passwordBlurTips(this, this.password, '仅支持6~12位英文、数字组合')
        },
        passwordFocus() {
            this.ispasswordTips = false; //进入隐藏提示
        },

        // 3.判断进入离开二次密码输入框
        password2Blur() {
            password2BlurTips(this, this.password, this.password2)
        },
        password2Focus() {
            this.ispassword2Tips = false; //进入隐藏提示
        },
        // 3.点击修改密码弹框
        changePsw: function() {
            this.isXdialog = true;
            this.XdialogIndex = 2;
        },
        // 3.更新密码
        updatePsw: function() {
            var _this = this;
            // 2.2判断是否匹配正则
            if (!checkPassword(_this.password) ||
                _this.password != _this.password2
            ) {
                toastTips('text', '10em', "输入有误,请重新核对");
                return;
            }
            var params = {
                old_password: _this.oldPassword,
                password: _this.password
            };
            _this.isXdialog = false;
            loadingTips('修改中');
            resetPsw(_this.oldPassword, _this.password).then(res => {
                _this.$vux.loading.hide()
                alertTips('修改成功，下次登录使用新密码登录')
            }).catch(err => {
                _this.$vux.loading.hide()
                alertTips("原密码错误,请重新输入", _this.Pswhide)
            })
        },
        Pswhide() {
            this.isXdialog = true;
        },


        // ====================跳转分享二维码====================
        goshareqrCode() {
            this.$router.push({
                name: "shareqrCode",
                query: {
                    nickname: this.dataInfo.nickname,
                    code: this.$store.state.copyCode
                }
            });
        },
        // ====================绑定微信账号====================
        sendWeChatCode() {
            var _this = this;
            bindWc(_this.code).then(res => {
                //成功
                _this.$store.state.Wechat = true;
                setCookie('ZW-G-isWechat', 'true');
                alertTips('绑定微信成功')
            }).catch(err => {
                //失败
                if (err.data.errCode == '422') {
                    alertTips('该微信号已被绑定')
                } else {
                    alertTips('绑定失败，请稍后重试')
                }

            })
        },

        // ====================4.其它====================
        // 1.点击复制邀请码
        onCopy: function(e) {
            toastTips("text", "12em", "已复制邀请码到剪贴板");
        },
        //绑定微信
        weChatBind: function() {



            if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8513a40d3d6a961e&redirect_uri=https%3a%2f%2fm.cs.qp.gzzhongw.net%2flayout%2fmyinfo&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
            } else {
                window.location.href =
                    "https://open.weixin.qq.com/connect/qrconnect?appid=wx691c6a6d3c48a13b&redirect_uri=https%3a%2f%2fm.cs.qp.gzzhongw.net%2floading&response_type=code&scope=snsapi_login&state=2#wechat_redirect";
            }
        }
    },
    computed: {
        updatePswDisabled() {
            var _this = this;
            if (
                _this.oldPassword == "" ||
                _this.password == "" ||
                _this.password2 == ""
            ) {
                return true;
            }
            return false;

        },
        updateInfoDisabled() {
            var _this = this;
            // 判断是否输入完整
            if (
                _this.telephone == ""
            ) {
                return true;
            }
            return false;
        }
    }
}
