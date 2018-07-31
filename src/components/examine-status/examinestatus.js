//引入退出账号
import { loginOut } from "../../utils/index.js";

//引入请求
import { bindCheck, bindAgent } from "../../api/registerModule";

//引入cookies
import { setCookie } from "../../utils/cookies.js";

// 引入时间格式化
import { formatToSecond } from "../../utils/format.js";

// 引入弹窗交互
import {
    alertTips,
    toastTips,
    loadingTips,
    confirmTips
} from "../../utils/messageTips.js";


export default {
    data() {
        return {
            title: "", //审核进度标题
            statusText: "", //审核结果文本
            status: "" //审核状态码
        };
    },
    mounted() {
        this.refreshStatus();
    },
    methods: {
        // ====================1.刷新审核状态====================
        refreshStatus() {
            var _this = this;
            loadingTips("刷新中");
            bindCheck()
                .then(res => {
                    _this.$vux.loading.hide();
                    if (res.status == 0) {
                        this.status = 0;
                        this.title = "代理申请审核中";
                        this.statusText =
                            "截止至" +
                            formatToSecond(new Date().valueOf()) +
                            ",上级代理商正在审核您的代理申请,请耐心等待。 ";
                    } else if (res.status == -1) {
                        post(bindAgentApi)
                            .then(res => {
                                _this.$vux.loading.hide();
                                _this.refreshStatus();
                            })
                            .catch(err => {
                                _this.$vux.loading.hide();
                            });
                    } else if (res.status == 2) {
                        this.status = 2;
                        this.title = "代理申请未通过";
                        this.statusText = "您的代理申请被上级代理商拒绝。";
                    } else if (res.status == 1) {
                        this.status = 1;
                        this.title = "代理申请成功";
                        setCookie("ZW-G-isAG", true);
                        this.statusText =
                            "上级代理已经同意了您的代理申请，您可以在“更多-我的信息-我的邀请码”中查看您的邀请码。";
                    }
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                });
        },
        stopStatus() {
            confirmTips(
                "您确定要撤回该次申请，该次操作不可恢复,并需要重新绑定游戏ID申请代理？",
                this.stopConfirm
            );
        },
        stopConfirm() {
            this.$router.push({
                name: "bindId"
            });
        },

        // ====================2.重新绑定代理====================
        againBindAgent() {
            confirmTips("是否重新向该代理商发送代理申请？", this.sureAagain);
        },
        sureAagain() {
            var _this = this;
            loadingTips("申请中");
            bindAgent()
                .then(res => {
                    _this.$vux.loading.hide();
                    alertTips("已重新发送代理申请,可通过登录本系统查询审核的进度。");
                    _this.refreshStatus();
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                    return;
                });
        },

        // ====================3.代理申请成功====================
        Iknow() {
            alertTips("申请成功，需重新登录", this.loginout);
        },
        // ====================4.退出登录====================
        loginout() {
            loginOut(this);
        }
    }
};