//引入接口
import {
    agentApprove,
    updateApproveByGet,
    updateApproveByPut
} from "../../api/agentModule";

// 引入弹窗交互
import {
    alertTips,
    loadingTips,
    confirmTips
} from "../../utils/messageTips.js";

// 引入上下拉刷新
import { loadMore } from "../../utils/loadmore.js";

import {
    Icon,
    TransferDomDirective as TransferDom
} from "vux";
export default {
    directives: {
        TransferDom
    },
    components: {
        Icon,
    },

    data() {
        return {
            isTable: false, //1.显示列表
            listData: "", //1.列表数据
            pageIndex: 1, //1.页码从第一页开始
            pageCount: 0, //1.总页数
            totalCount: 0, //1.总数量
            showAgree: false, //2.同意弹框
            showRefuse: false, //3.拒绝弹框
            areaValue: "", //3.拒绝理由
            showDetail: false, //4.详情弹框
            detailedData: "", //4.详情数据
            updateIndex: 0 //5点击列表的索引
        };
    },

    mounted() {
        this.$store.state.headerTitle = "代理审批";
        loadingTips("加载中");
        this.getList(true);
    },
    methods: {
        //===============1.获取数据===============
        getList(isEmpty, isPullDown) {
            var _this = this;
            agentApprove("detail", _this.pageIndex)
                .then(res => {
                    _this.$vux.loading.hide();
                    var list = "";
                    list = res["items"];
                    loadMore(_this, list, res, isEmpty, isPullDown);
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                });
        },
        //===============2.点击同意按钮===============
        agreeBtn(index, event) {
            event.cancelBubble = true;
            this.updateIndex = index;
            // 获取申请代理的详细情况
            this.showAgree = true;
        },
        //2.1确定同意
        sureAgree() {
            this.showAgree = false;
            confirmTips(
                "确定要同意该代理申请吗",
                this.AgreeConfirm,
                this.AgreeonCancel
            );
        },
        // 2.2二次确定同意
        AgreeConfirm() {
            var _this = this;
            loadingTips("处理中");
            updateApproveByPut(_this.listData[_this.updateIndex].id, '1')
                .then(res => {
                    _this.$vux.loading.hide();
                    alertTips("已通过该代理的申请");
                    _this.$set(_this.listData[_this.updateIndex], "status", 1);
                    return;
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                    return;
                });
        },
        AgreeonCancel() {
            this.showAgree = true;
        },
        //===============3.点击拒绝按钮===============
        refuseBtn(index, event) {
            event.cancelBubble = true;
            this.updateIndex = index;
            this.showRefuse = true;
        },
        // 3.1确定拒绝
        sureRefuse() {
            this.showRefuse = false;
            confirmTips(
                "确定要拒绝该代理申请吗",
                this.RefuseConfirm,
                this.RefuseCancel
            );
        },
        // 3.2二次确定拒绝
        RefuseConfirm() {
            var _this = this;
            loadingTips("处理中");
            updateApproveByPut(_this.listData[_this.updateIndex].id, '2')
                .then(res => {
                    _this.$vux.loading.hide();
                    alertTips("已拒绝该代理的申请");
                    _this.$set(_this.listData[_this.updateIndex], "status", 2);
                    return;
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                    return;
                });
        },
        RefuseCancel() {
            this.showRefuse = true;
        },

        // ====================4.点击查看详细====================
        listDetail(id) {
            var _this = this;
            loadingTips("加载中");
            updateApproveByGet(id, "detail")
                .then(res => {
                    _this.$vux.loading.hide();
                    if (res.status == "0") {
                        res.status = "未处理";
                    } else if (res.status == "1") {
                        res.status = "已通过";
                    } else if (res.status == "2") {
                        res.status = "已拒绝";
                    }
                    _this.detailedData = res;
                    _this.showDetail = true;
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                });
        },
        // ====================5.上下加载====================
        // 上拉加载
        selPullUp() {
            this.pageIndex++;
            this.getList(false);
        },

        // 下拉加载
        selPullDown() {
            this.pageIndex = 1;
            this.getList(true, true);
        }
    }
};