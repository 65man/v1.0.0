//引入Api接口
import { exchangeCan, cashOutlay, cashPhoneCode, exchangeSend } from "../../api/incomeModule";

//引入倒计时
import { setCookie, getCookie } from "../../utils/cookies.js";

// 引入弹窗交互
import {
    alertTips,
    toastTips,
    confirmTips,
    loadingTips
} from "../../utils/messageTips.js";

import { TransferDomDirective as TransferDom } from "vux";

export default {
    directives: {
        TransferDom
    },
    data() {
        return {
            canExchange: 0, //可提现金额
            exchanging: 0, //提现中的金额
            exchangeSuccess: 0, //提现成功的金额
            canCash: {},
            showPrompt: false, //弹框提现说明
            showOutlay: false, //弹框提现申请
            cashVal: "", //提现金额
            gold: 0, //金币
            phone: "", //手机号
            isdisabledBtn1: true, //兑换按钮
        };
    },
    mounted() {
        this.$store.state.headerTitle = "提现";
        this.getcanExchange();
    },
    methods: {
        // ====================1.获取可提现金额====================
        getcanExchange() {
            var _this = this;
            loadingTips("加载中");
            exchangeCan()
                .then(res => {
                    _this.$vux.loading.hide();
                    _this.canExchange = parseInt(res.canExchange / 100);
                    _this.exchanging = parseInt(res.exchanging);
                    _this.exchangeSuccess = parseInt(res.exchangeSuccess);
                    _this.isdisabledBtn1 =
                        _this.canExchange >= 1 ? false : true;
                    return;
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                    _this.isdisabledBtn1 =
                        _this.canExchange >= 1 ? false : true;
                    return;
                });
        },

        // ====================2.提现====================
        // 2.点击弹出提现输入框
        openOutlay() {
            // if (getCookie("verifycodeCash")) {
            //     _this.isdisabledCode = true;
            //     _this.codeSecond =
            //         60 -
            //         (parseInt(new Date().getTime() / 1000) -
            //             getCookie("verifycodeCash"));
            //     _this.codeTips = "重新发送";
            //     var sendCodeID = setInterval(function() {
            //         _this.codeSecond--;
            //         if (_this.codeSecond == 0) {
            //             clearTimeout(sendCodeID);
            //             _this.isdisabled = false;
            //             _this.codeSecond = "";
            //             _this.codeTips = "发送验证码";
            //         }
            //     }, 1000);
            // }
            this.showOutlay = true;
        },
        // 3.点击获取手机验证码
        // sendcode() {
        //     var _this = this;
        //     cashPhoneCode()
        //         .then(res => {
        //             toastTips("success", "8em", "已发送短信验证");
        //             setCookie(
        //                 "verifycodeCash",
        //                 parseInt(new Date().getTime() / 1000),
        //                 1 / 1440
        //             );
        //             _this.isdisabledCode = true;
        //             _this.codeSecond = 60;
        //             _this.codeTips = "重新发送";
        //             var sendcodeID = setInterval(function() {
        //                 _this.codeSecond--;
        //                 if (_this.codeSecond == 0) {
        //                     clearTimeout(sendcodeID);
        //                     _this.isdisabledCode = false;
        //                     _this.codeSecond = "";
        //                     _this.codeTips = "发送验证码";
        //                 }
        //             }, 1000);
        //         })
        //         .catch(err => {
        //             if (err.data.errCode == 429) {
        //                 toastTips("text", "16em", "已发送短信验证,请勿频繁操作");
        //             }
        //         });
        // },
        // 4.发送提现申请
        sendCashOut() {
            var _this = this;
            _this.showOutlay = false;

            confirmTips(
                "您确定要消耗" +
                    _this.cashVal +
                    "元用于兑换金币：" +
                    _this.gold +
                    "个？",
                _this.AgreeConfirm,
                _this.RefuseCancel
            );
        },
        //4.提现二次确认
        AgreeConfirm() {
            var _this = this;
            loadingTips("兑换中");
            exchangeSend(_this.cashVal * 100)
                .then(res => {
                    _this.$vux.loading.hide();
                    alertTips("您的兑换申请已发出，请等待审核");
                    this.getcanExchange();
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                    if (err.data.errCode == "87001") {
                        alertTips(err.data.errMsg );
                    }
                });
        },
        RefuseCancel() {
            this.showOutlay = true;
        },
        // ====================2.提现说明====================
        // 1.点击弹出提现提示
        openPrompt() {
            this.showPrompt = true;
        },
        //设置提现金额
        setCashVal() {
            var _this = this;
            var reg = /^[1-9]\d*$/;
            if (_this.cashVal > _this.canExchange) {
                _this.cashVal = _this.canExchange;
            } else if (_this.cashVal < 1) {
                _this.cashVal = 1;
                toastTips("text", "14em", "兑换金币最小金额为1元");
            } else if (!reg.test(_this.cashVal)) {
                _this.cashVal = parseInt(_this.cashVal);
                toastTips("text", "14em", "兑换金币最小单位为元");
            }
            this.gold = parseInt(this.cashVal * 110);
        }
    },
    watch: {
        cashVal() {
            this.gold = parseInt(this.cashVal * 110);
        }
    },
    computed: {
        isdisabledBtn2: function() {
            var _this = this;
            if (_this.cashVal != "" && _this.codeVal != "") {
                return false;
            } else {
                return true;
            }
        }
    }
};
