// 引入弹窗交互
import { loadingTips, toastTips } from "../../utils/messageTips.js";

import { GroupTitle } from "vux";

export default {
    components: {
        GroupTitle,
    },
    data() {
        return {
            Totalincome: "" //总收入
        };
    },
    mounted() {
        this.$store.state.headerTitle = "概览";
    },
    methods: {
        // ====================4.点击复制邀请码====================
        onCopy: function(e) {
            toastTips("text", "12em", "已复制邀请码到剪贴板");
        }
    }
};