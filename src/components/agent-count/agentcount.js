// 引入请求
import { dataCount } from "../../api/countModule";

// 引入格式化
import { formatToMonth, formatToTimestamp } from "../../utils/format.js";

// 引入弹窗交互
import { loadingTips } from "../../utils/messageTips.js";

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
            isTable: false, //1.展示表格
            listData: "", //1.数据
            pageIndex: 1, //1.页码从第一页开始
            pageCount: 0, //1.总页数
            totalCount: 0, //1.总数量
            dateMonth: "", //2.选择月份
            navIndex: 0, //2.tab栏Index
            levelOption: 0, //3.筛选层级
            selectLevel: [{
                //3.下拉选项列表
                key: "0",
                value: "所有代理"
            }, {
                key: "1",
                value: "直属代理"
            }, {
                key: "2",
                value: "下2级代理"
            }, {
                key: "3",
                value: "其它代理"
            }],
            startTime: "",
            endTime: "",
            sort: "",
            hasReduce: false
        };
    },
    created() {
        // 获取当前时间渲染页面
        this.dateMonth = formatToMonth();
    },
    mounted() {
        var _this = this;
        _this.$store.state.headerTitle = "代理统计";
        // ====================1.首次载入默认数据====================
        var startEndTime = formatToTimestamp(this.dateMonth);
        _this.startTime = startEndTime[0];
        _this.endTime = startEndTime[1];
        _this.getList(true);
    },
    methods: {
        // ====================1.获取数据====================
        getList(isEmpty, isPullDown) {
            var _this = this;
            if (_this.navIndex == 0) {
                var urlAPI = "add";
                var type = "agency";
                var level = _this.levelOption == 0 ? "" : _this.levelOption;
            }
            if (_this.navIndex == 1) {
                var urlAPI = "play";
                var type = "total";
            }
            dataCount(
                    _this.startTime,
                    _this.endTime,
                    "-date_time",
                    _this.pageIndex,
                    type,
                    urlAPI,
                )
                .then(res => {
                    var list = "";
                    list = res["items"];
                    if (_this.navIndex == 0) {
                        for (var index in list) {
                            if (list[index].reduce != "0") {
                                _this.hasReduce = true;
                            } else {
                                _this.hasReduce = false;
                            }
                        }
                    }
                    if (_this.navIndex == 1) {
                        for (var index in list) {
                            list[index].counts =
                                list[index].total_increase - list[index].total_reduce;
                        }
                    }
                    loadMore(_this, list, res, isEmpty, isPullDown);
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                });
        },

        // ====================2.更改月份、tab栏触发====================
        changeMonth(value) {
            this.pageIndex = 1;
            var startEndTime = formatToTimestamp(this.dateMonth);
            this.startTime = startEndTime[0];
            this.endTime = startEndTime[1];
            this.getList(true);
        },
        tabIndex(index) {
            this.pageIndex = 1;
            var startEndTime = formatToTimestamp(this.dateMonth);
            this.startTime = startEndTime[0];
            this.endTime = startEndTime[1];
            this.getList(true);
        },

        //上拉加载
        selPullUp() {
            this.pageIndex++;
            this.getList(false);
        },

        //下拉刷新
        selPullDown() {
            this.pageIndex = 1;
            this.getList(true, true);
        }
    },
    // 监听层级跟游戏时间
    watch: {
        // ====================3.更改层级、游戏时间触发====================
        // 监听层级
        levelOption(newVal, oldVal) {
            this.pageIndex = 1;
            this.getList(true);
        }
    },
    activated() {
        var _this = this;
        _this.$refs.scroller.reset();
    }
};