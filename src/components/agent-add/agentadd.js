//引入请求
import { addAgent } from "../../api/agentModule";

//引入弹窗交互
import {
    alertTips,
    loadingTips,
    toastTips,
    confirmTips
} from "../../utils/messageTips.js";

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

//引入验证注册手机号，代理商名字,ID
import { agencyValidate } from "../../api/validateModule";

import {
    TransferDomDirective as TransferDom,Group,Cell
} from "vux";
export default {
    data() {
        return {
            nicknameTips: "", //2.代理商输入提示
            isnicknameTips: false,
            role_idTips: "", //2.ID输入框提示
            isrole_idTips: false,
            istelephoneTips: false, //2.联系电话提示框
            phoneTips: "", //2.手机号输入提示
            isphoneTips: false,
            passwordTips: "",
            ispasswordTips: false, //2.一次密码提示框
            ispassword2Tips: false, //2.二次密码提示框
            nickname: "",
            role_id: "",
            telephone: "",
            phone: "",
            password: "",
            password2: "",
            showInfo: false, //信息弹窗
            remark:'' //备注信息
        };
    },
    components: {
        Group,
        Cell
    },
    mounted() {
        this.$store.state.headerTitle = "新增代理";
    },
    methods: {
        //===============发送新增请求===============
        sendAddagent() {
            var _this = this;
            // 2.2判断是否匹配正则
            if (!checkNickname(_this.nickname) ||
                !checkTelephone(_this.telephone) ||
                !checkPhone(_this.phone) ||
                !checkPassword(_this.password) ||
                _this.password != _this.password2
            ) {
                return;
            } else {
                _this.showInfo = true;
            }
        },
        sureAgree() {
            this.showInfo = false;
            agencyValidate({
                    phone: this.phone,
                    nickname: this.nickname,
                    role_id: this.role_id
                },
                "n&p&R",
                this.resultValidate,
                this.$store.state.token
            );
        },
        resultValidate(type, isCan, data) {
            var _this = this;
            if (type == "n&p&R" && isCan == "false") {
                alertTips("注册信息冲突或者有误，请重新核对修改");
                for (var index in data) {
                    if (data[index].field == "phone") {
                        this.phoneTips = "该手机号已被注册";
                        this.isphoneTips = true;
                    }
                    if (data[index].field == "nickname") {
                        this.nicknameTips = "该代理商名称已被注册";
                        this.isnicknameTips = true;
                    }
                    if (data[index].field == "role_id") {
                        alertTips(
                            "新增代理商失败，该游戏ID已注册或未绑定邀请码，请检查游戏ID是否正确"
                        );
                        this.role_idTips = "该游戏ID不正确";
                        this.isrole_idTips = true;
                    }
                }
            } else if (type == "n&p&R" && isCan == "true") {
                //3.4 进行注册
                loadingTips("新增中");
                addAgent(
                        _this.nickname,
                        _this.role_id,
                        _this.telephone,
                        _this.phone,
                        _this.password
                    )
                    .then(res => {
                        _this.$vux.loading.hide();
                        alertTips("已新增成功");
                    })
                    .catch(err => {
                        _this.$vux.loading.hide();
                        if (err.data.errCode == 422) {
                            alertTips("注册信息冲突或者有误，请重新核对修改");
                            for (var index in err.data.data) {
                                if (err.data.data[index].field == "phone") {
                                    this.phoneTips = "该手机号已被注册";
                                    this.isphoneTips = true;
                                }
                                if (err.data.data[index].field == "nickname") {
                                    this.nicknameTips = "该代理商名称已被注册";
                                    this.isnicknameTips = true;
                                }
                                if (err.data.data[index].field == "role_id") {
                                    alertTips(
                                        "新增代理商失败，该游戏ID已注册或未绑定邀请码，请检查游戏ID是否正确"
                                    );
                                    this.role_idTips = "该游戏ID不正确";
                                    this.isrole_idTips = true;
                                }
                            }
                        }
                    });
            }
        },
        //===============交互模块===============
        nicknameBlur() {
            nicknameBlurTips(this, this.nickname, "仅支持2~12位中英文、数字组合");
        },
        nicknameFocus() {
            this.isnicknameTips = false; //进入隐藏提示
        },

        // 2.判断进入离开用户ID输入框
        role_idBlur() {},
        role_idFocus() {
            this.isrole_idTips = false; //进入隐藏提示
        },

        // 3.判断进入离开联系电话输入框
        telephoneBlur() {
            telephoneBlurTips(this, this.telephone);
        },
        telephoneFocus() {
            //进入隐藏提示
            this.istelephoneTips = false;
        },
        // 4.判断进入离开手机号输入框
        phoneBlur() {
            phoneBlurTips(this, this.phone, "手机号格式错误");
        },
        phoneFocus() {
            this.isphoneTips = false; //进入隐藏提示
        },

        // 5.判断进入离开一次密码输入框
        passwordBlur() {
            passwordBlurTips(this, this.password, "仅支持6~12 位英文、数字组合");
        },
        passwordFocus() {
            this.ispasswordTips = false; //进入隐藏提示
        },

        // 6.判断进入离开二次密码输入框
        password2Blur() {
            password2BlurTips(this, this.password, this.password2);
        },
        password2Focus() {
            this.ispassword2Tips = false; //进入隐藏提示
        }
    },
    watch: {},
    //===============监听是否输入完成===============
    computed: {
        submitDisabled() {
            var _this = this;
            if (
                _this.nickname == "" ||
                _this.role_id == ""
            ) {
                return true;
            }
            return false;
        },
        roleId(){
            return this.$store.state.addAgentInfo.id
        },
        nickName(){
            return this.$store.state.addAgentInfo.nickName
        }
    }
};
