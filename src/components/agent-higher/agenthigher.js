//引入接口
import { bindParent } from "../../api/agentModule";
// 引入弹窗交互
import { loadingTips } from "../../utils/messageTips.js";


export default {
    data() {
        return {
            data: ""
        };
    },
    mounted() {
        this.$store.state.headerTitle = "上级代理";
        // ====================1.首次载入默认数据====================
        // loadingTips("加载中");
        this.getList();
    },
    methods: {
        // 获取数据
        getList: function() {
            var _this = this;
            bindParent()
                .then(res => {
                    _this.$vux.loading.hide();
                    _this.data = res;
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                });
        }
    }
};
