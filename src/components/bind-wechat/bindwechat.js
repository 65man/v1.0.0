import {
    bindWcApi
} from "../../api/apipath.js";
// 引入请求方式
import {
    post
} from '../../api/axios.js';
// 引入弹窗交互
import {
    alertTips,
    loadingTips,
    confirmTips,
    toastTips
} from "../../utils/messageTips.js";
//引入cookies
import { getCookie, setCookie } from "../../utils/cookies.js";

export default {
    data() {
        return {
            step: 1, //流程进度
            code: '',
        };
    },
    mounted() {
        var _this = this;
        if (_this.$route.query.code && getCookie('ZW-G-isWechat') == 'false') {
            _this.code = _this.$route.query.code;
            _this.sendWeChatCode();
        }
        if (_this.$route.query.code && getCookie('ZW-G-isWechat') == 'true') {
            _this.$router.push({
                name: "bindId"
            });
        }
    },
    methods: {
        // 1.点击绑定微信
        //绑定微信
        weChatBind: function() {
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8513a40d3d6a961e&redirect_uri=https%3a%2f%2fm.cs.qp.gzzhongw.net%2fbindwechat&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
        },
        sendWeChatCode() {
            var _this = this;
            var params = {
                code: _this.code
            }
            post(bindWcApi, params).then(res => {
                //成功
                setCookie('ZW-G-isWechat', 'true');
                alertTips('绑定微信成功', function goNext() {
                    this.$router.push({
                        name: "bindId"
                    });
                })
            }).catch(err => {
                //失败
                if (err.data.errCode == '422') {
                    alertTips('该微信号已被绑定')
                } else {
                    alertTips('绑定失败，请稍后重试')
                }
            })
        },
        // 2.点击以后再说
        gobindId() {
            this.$router.push({
                name: "bindId"
            });
        }
    },
    watch: {},
    computed: {}
};