//引入退出账号
import { loginOut } from "../../utils/index.js";
//引入接口
import { bindInfo, bindGameId, bindAgent } from "../../api/registerModule";

// 引入请求方式
import { put, get, post } from "../../api/axios.js";
//引入cookies
import { setCookie } from "../../utils/cookies.js";
// 引入弹窗交互
import {
    alertTips,
    loadingTips,
    confirmTips,
    toastTips
} from "../../utils/messageTips.js";
import {
    TransferDomDirective as TransferDom
} from "vux";
export default {
    directives: {
        TransferDom
    },
    data() {
        return {
            step: 2, //1.流程
            gameId: "", //2.绑定数据id
            idTips: "", //匹配提示
            isdisabled: true, //下一步
            isInfo: false, //代理信息
            agentInfo: "" //ID代理商信息
        };
    },
    methods: {
        // ====================1.获取代理信息====================
        getAgentInfo() {
            var _this = this;
            loadingTips("载入中");
            bindInfo(_this.gameId)
                .then(res => {
                    _this.$vux.loading.hide();
                    _this.agentInfo = res;
                    _this.isInfo = true;
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                    if (err.data.errCode == 86006) {
                        alertTips("该游戏ID已被其他用户绑定，请检查后重新输入");
                    }
                    if (err.data.errCode == 86002) {
                        alertTips("该角色ID未绑定邀请码，请先绑定");
                    }
                    if (err.data.errCode == 86001) {
                        alertTips("该角色ID不存在");
                    }
                    if (err.data.errCode == 86009) {
                        alertTips("代理商业务原因，该用户ID暂无法绑定");
                    }
                });
        },

        // ====================2.弹窗确定====================
        sureAgree() {
            this.isInfo = false;
            confirmTips(
                "您确定申请成为该代理商的下级代理吗？",
                this.sendBindID,
                this.cancel
            );
        },
        sendBindID() {
            var _this = this;
            loadingTips("申请中");
            var params = {
                role_id: _this.gameId
            };
            bindGameId(_this.gameId)
                .then(res => {
                    _this.$vux.loading.hide();
                    setCookie("ZW-G-isID", true);
                    _this.sendBindAgent();
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                    if (err.data.errCode == 86004) {
                        _this.sendBindAgent();
                    }
                    if (err.data.errCode == 86003) {
                        alertTips(err.data.errMsg);
                    }
                });
        },
        sendBindAgent() {
            var _this = this;
            bindAgent()
                .then(res => {
                    alertTips("申请已发送，可通过登录本系统查询审核的进度");
                    _this.$router.push({
                        name: "examineStatus"
                    });
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                    alertTips(err.data.errMsg);
                    if (err.data.errCode == 86005) {
                        _this.$router.push({
                            name: "examineStatus"
                        });
                    }
                });
        },
        cancel() {
            this.isInfo = true;
        },

        // ====================3.交互模块====================
        idFocus: function() {
            this.idTips = false;
        },
        idBlur: function() {},
        loginout() {
            loginOut(this);
        }
    },
    watch: {
        // ====================4监听输入框的值====================
        gameId(newval, oldval) {
            newval == "" ? (this.isdisabled = true) : (this.isdisabled = false);
        }
    },
    computed: {}
};