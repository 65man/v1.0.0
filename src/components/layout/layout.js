//引入Api接口
import {
    noticeCount
} from "../../api/newsModule.js";

//引入退出账号
import {
    loginOut
} from "../../utils/index.js";
//引入cookie
import { getCookie } from "../../utils/cookies";

export default {
    data() {
        return {
            menuLeft: -100,
            menuOpacity: 0,
            menuHeight: '',
            noticeCount: 0 //消息条数
        };
    },
    created() {
        var _this = this;
        // ====================保存数据倒vuex====================
        _this.$store.state.roles = getCookie('ZW-G-isRoles');
        _this.$store.state.copyCode = getCookie('ZW-G-isCode');
        _this.$store.state.level = getCookie('ZW-G-isLv');
        _this.$store.state.maxLevel = getCookie('ZW-G-isMaxlv');
        _this.$store.state.Wechat = getCookie('ZW-G-isWechat');
    },
    mounted() {
        var _this = this;
        _this.menuHeight = _this.$refs.getmenuHeight.offsetHeight - 56;
        // ====================1.定时器获取消息条数====================
        _this.setIntervalCount();
        setInterval(function() {
            _this.setIntervalCount()
        }, 60000);
    },
    methods: {
        // ====================1.定时器获取消息条数5分钟====================
        setIntervalCount() {
            var _this = this;
            var timenow = new Date().getTime()
            var noticeCountTime = sessionStorage.getItem('XWCNT');
            if (!noticeCountTime) {
                _this.getNoticeCount(timenow);
            } else if (noticeCountTime && (timenow - noticeCountTime) >= 300000) {
                _this.getNoticeCount(timenow);
            } else if (sessionStorage.getItem('XWCUR')) {
                _this.noticeCount = sessionStorage.getItem('XWCUR')
            }
        },
        // ====================1.获取消息条数===================
        getNoticeCount(timenow) {
            var _this = this;
            noticeCount().then(res => {
                sessionStorage.setItem('XWCNT', timenow);
                sessionStorage.setItem('XWCUR', res.unread);
                _this.noticeCount = res.unread;
            }).catch(err => {

            })
        },
        // ====================2.菜单====================
        showMenu(event) {
            event.cancelBubble = true;
            this.menuLeft = this.menuLeft == 0 ? -100 : 0;
            this.menuOpacity = this.menuOpacity == 0 ? 1 : 0;
        },
        hideMenu() {
            this.menuLeft = -100;
            this.menuOpacity = 0;
        },
        gohome() {
            this.$router.push({
                name: "home"
            });
        },
        gouserList() {
            this.$router.push({
                name: "userList"
            });
        },
        gouserCount() {
            this.$router.push({
                name: "userCount"
            });
        },
        goincomeCount() {
            this.$router.push({
                name: "incomeCount"
            });
        },
        goincomeDetail() {
            this.$router.push({
                name: "incomeDetail"
            });
        },
        gocashDetail() {
            this.$router.push({
                name: "cashDetail"
            });
        },
        gocashOutlay() {
            this.$router.push({
                name: "cashOutlay"
            });
        },
        gohigherAgent() {
            this.$router.push({
                name: "higherAgent"
            });
        },
        golowerAgent() {
            this.$router.push({
                name: "lowerAgent"
            });
        },
        goaddAgent() {
            this.$router.push({
                name: "addAgent"
            });
        },
        goagentApproval() {
            this.$router.push({
                name: "examineAgent"
            });
        },
        goagentCount() {
            this.$router.push({
                name: "agentCount"
            });
        },
        gomyInfo() {
            this.$router.push({
                name: "myInfo"
            });
        },
        goshareqrCode() {
            this.$router.push({
                name: "shareqrCode"
            });
        },
        gomyMessage() {
            this.noticeCount = 0;
            sessionStorage.removeItem('XWCUR');
            this.$router.push({
                name: "myMessage"
            });
        },
        loginout() {
            loginOut(this)
        },
    }
};