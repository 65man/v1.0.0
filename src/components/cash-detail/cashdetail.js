//引入接口
import {
    cashDetail,exchange
} from "../../api/incomeModule";

// 引入格式化
import {
    formatToMonth
} from "../../utils/format.js";

// 引入弹窗交互
import {
    alertTips,
    toastTips,
    confirmTips,
    loadingTips
} from "../../utils/messageTips.js";

// 引入上下拉刷新
import { loadMore } from "../../utils/loadmore.js";

import {
    TransferDomDirective as TransferDom
} from "vux";
export default {
    directives: {
        TransferDom
    },

    data() {
        return {
            listData: [], //1.数据
            isTable: false, //1.显示首页表格
            pageIndex: 1, //1.页码从第一页开始
            pageCount: 0, //1.总页数
            totalCount: 0, //1.总数量
            statusVal: 5,
            selectStatus: [{
                //2.下拉状态选项
                key: 5,
                value: "所有状态"
            }, {
                key: 0,
                value: "待审核"
            }, {
                key: 2,
                value: "已通过"
            }, {
                key: 3,
                value: "已拒绝"
            }],
            isDetailed: false, //3.弹窗详细
            detailedData: "", //3.详情数据
            sortUDindex: 1, //4.切换排序
            bgImg: ["up", "down"], //4.切换图片
            imgIndex: 1, //4.图片索引
            sort: '-created_at' //4.排序规则
        };
    },
    created() {

    },
    mounted() {
        this.$store.state.headerTitle = "提现明细";
        if (this.$route.params.target) {
            this.DetailbyID(this.$route.params.target);
            // loadingTips("加载中");
            this.getList(true);
        } else {
            // loadingTips("加载中");
            this.getList(true);
        }
    },
    methods: {
        // ====================1.获取数据====================
        getList(isEmpty, isPullDown) {
            var _this = this;
            exchange(_this.pageIndex)
                .then(res => {
                    var list = "";
                    list = res["items"];
                    loadMore(_this, list, res, isEmpty, isPullDown);
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                });
        },
        // 格式化数据
        formatData(data) {
            if (data.status == '0' || data.status == '1') {
                data.status = '待审核'
            } else if (data.status == '2') {
                data.status = '已通过'
            } else if (data.status == '3') {
                data.status = '已拒绝'
            }
            return data
        },
        // ====================3.点击查看详细====================
        listDetail(index) {
            this.isDetailed = true;
            this.detailedData = this.listData[index]
        },
        // ====================根据ID查看详细====================
        DetailbyID(id) {
            var _this = this;
            get(
                cashDetailApi + '/' + id
            ).then(res => {
                this.isDetailed = true;
                this.detailedData = _this.formatData(res);
            }).catch(err => {

            })
        },
        // ====================4.排序、上下加载====================
        //排序
        sortUD(index) {
            var _this = this;
            if (index == _this.sortUDindex) {
                _this.imgIndex = (_this.imgIndex + 1) % _this.bgImg.length;
            } else {
                _this.imgIndex = 0;
            }
            _this.sortUDindex = index;
            if (_this.sortUDindex == '2') {
                _this.sort = _this.imgIndex == '0' ? 'money' : '-money'
            } else if (_this.sortUDindex == '1') {
                _this.sort = _this.imgIndex == '0' ? 'created_at' : '-created_at';
            }
            _this.getList(true);
        },
        //上拉加载
        selPullUp() {
            this.pageIndex++;
            this.getList(false);
        },

        //下拉加载
        selPullDown() {
            this.pageIndex = 1;
            this.getList(true, true);
        },
    },
    activated() {
        this.$refs.scroller.reset();
    },
    watch: {
        // ====================5.监听状态筛选框====================
        statusVal: function(newVal, oldVal) {
            this.getList(true);
        }
    },
    computed: {
        imgSrc() {
            //计算图标地址
            return this.bgImg[this.imgIndex];
        }
    }
};
