//引入请求
import { notice, isAllRead } from "../../api/newsModule";

// 引入弹窗交互
import {
    toastTips,
    confirmTips,
    loadingTips
} from "../../utils/messageTips.js";

// 引入上下拉刷新
import { loadMore } from "../../utils/loadmore.js";

export default {
    data() {
        return {
            navIndex: 1, //1.tab栏Index
            tabVal: 2, //1.tab栏type
            radioVal: 0, //单选
            listData: [], //1.数据
            isList: true, //1.显示首页表格
            pageIndex: 1, //1.页码从第一页开始
            pageCount: 0, //1.总页数
            totalCount: 0, //1.总数量
            sort: "-created_at" //4.排序规则
        };
    },
    created() {},
    mounted() {
        var _this = this;
        _this.$store.state.headerTitle = "消息中心";
        // ====================1.首次载入默认数据====================
        loadingTips("加载中");
        _this.getList(true);
    },
    methods: {
        // ====================1.获取所有数据列表====================
        getList(isEmpty, isPullDown) {
            var _this = this;
            notice(
                    _this.tabVal,
                    _this.radioVal == 0 ? "" : _this.radioVal,
                    _this.sort,
                    _this.pageIndex
                )
                .then(res => {
                    var list = "";
                    list = res["items"];
                    // 格式化相关日期
                    for (var index in list) {
                        list[index].sender = list[index].sender == 0 ? "官方" : "待定";
                    }
                    loadMore(_this, list, res, isEmpty, isPullDown);
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                });
        },

        // ====================3.打开详情跳转====================
        openDetail(targettype, target) {
            var _this = this;
            if (targettype == "apply") {
                //标记已读
                _this.isRead(targettype);
                // 代理审批页面
                _this.$router.push({
                    name: "examineAgent"
                });
            } else if (targettype == "withdraw") {
                //标记已读
                _this.isRead(targettype);
                // 提现明细页面
                _this.$router.push({
                    name: "cashDetail",
                    params: {
                        target: target
                    }
                });
            }
        },

        // 标记已读
        isRead(targettype) {
            var _this = this;
            isAllRead(_this.tabVal, targettype)
                .then(res => {})
                .catch(err => {});
        },
        // ====================4.上下加载，切换tab栏====================
        tabIndex(index) {
            this.radioVal = 0;
            this.tabVal = index;
            this.pageIndex = 1;
            this.getList(true);
        },
        radioIndex(index) {
            this.pageIndex = 1;
            this.getList(true);
        },
        //上拉加载
        selPullUp() {
            this.pageIndex++;
            this.getList(false);
        },

        //下拉加载
        selPullDown() {
            this.pageIndex = 1;
            this.getList(true);
        }
    },
    // 监听层级
    watch: {},
    activated() {
        var _this = this;
        _this.$refs.scroller.reset();
    }
};