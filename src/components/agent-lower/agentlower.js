//引入接口
import { lowerAgent, lowerAgentInfo } from "../../api/agentModule";

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
            listData: [], //1.数据
            isTable: false, //1.显示首页表格
            pageIndex: 1, //1.页码从第一页开始
            pageCount: 0, //1.总页数
            totalCount: 0, //1.总数量
            optionVal: 2, //2.绑定下拉选项
            selectList: [{
                    //2.下拉选项列表
                    key: "0",
                    value: "所有代理商"
                },
                {
                    key: "1",
                    value: "代理商名称"
                },
                {
                    key: "2",
                    value: "代理商ID"
                }
            ],
            inputVal: "", //2.搜索值
            agentLevel: 0, //2.层级
            selectLevel: [{
                //2.下拉层级选项
                key: 0,
                value: "所有代理"
            }, {
                //2.下拉层级选项
                key: 1,
                value: "直属代理"
            }, {
                //2.下拉层级选项
                key: 2,
                value: "下2级代理"
            }, {
                //2.下拉层级选项
                key: 3,
                value: "其它代理"
            }, ],
            starVal: 6,
            selectStar: [{
                    //2.下拉状态选项
                    key: 6,
                    value: "所有星级"
                },
                {
                    key: 0,
                    value: "0星代理"
                },
                {
                    key: 1,
                    value: "1星代理"
                },
                {
                    key: 2,
                    value: "2星代理"
                },
                {
                    key: 3,
                    value: "3星代理"
                },
                {
                    key: 4,
                    value: "4星代理"
                },
                {
                    key: 5,
                    value: "5星代理"
                }
            ],
            upLevelVal: 0,
            selectUpLevel: [],
            xdialogIndex: 0, //3.显示弹出层几
            isDetailed: false, //3.显示详情
            detailedData: "", //3.详情数据
            sortUDindex: -1, //4.切换排序
            bgImg: ["up", "down"], //4.切换图片
            imgIndex: 0, //4.图片索引
            sort: "", //4.排序规则
            placeholderVal: "请输入搜索值", //5.动态输入提示
            isdisable: false //5.动态输入锁定
        };
    },
    mounted() {
        var _this = this;
        _this.$store.state.headerTitle = "下级代理";
        // ====================1.首次载入默认数据====================
        // loadingTips("加载中");
        _this.getList(true);
    },
    methods: {
        // ====================1.获取数据====================
        // 2.获取列表
        getList(isEmpty, isPullDown) {
            var _this = this;
            if (_this.agentLevel == 0) {
                var level = ""
            } else if (_this.agentLevel == 1) {
                var level = +_this.$store.state.level + 1
            } else if (_this.agentLevel == 2) {
                var level = +_this.$store.state.level + 2
            } else if (_this.agentLevel == 3) {
                var level = 'all'
            }
            var params = {
                isRole: 0,
                isAgency: 1,
                nickname: _this.optionVal == 1 ? _this.inputVal : "",
                agencyId: _this.optionVal == 2 ? _this.inputVal : "",
                level: level,
                star: _this.starVal == 6 ? "" : _this.starVal,
                sort: _this.sort,
                page: _this.pageIndex
            };
            lowerAgent(params)
                .then(res => {
                    var list = "";
                    list = res["items"];
                    loadMore(_this, list, res, isEmpty, isPullDown);
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                });
        },

        // ====================2.搜索====================
        sendSearch() {
            this.sort = "";
            this.sortUDindex = -1;
            this.pageIndex = 1;
            this.getList(true);
        },

        // ====================3.查询详情====================
        // 3.点击查看代理信息
        openDetail(id) {
            var _this = this;
            loadingTips("加载中");
            lowerAgentInfo(id)
                .then(res => {
                    _this.$vux.loading.hide();
                    if (res.status == "10") {
                        res.status = "正常";
                    } else if (res.status == "2") {
                        res.status = "失效";
                    }
                    this.detailedData = res;
                    this.isDetailed = true;
                    // 判断是否可以做升级操作
                    if (
                        _this.$store.state.roles == "1" &&
                        res.level >= 3 &&
                        res.status == "正常"
                    ) {
                        _this.isUplevel = true;
                    } else {
                        _this.isUplevel = false;
                    }
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                });
        },
        // ====================4.排序、上下加载、跳转====================
        //排序
        sortUD(index) {
            var _this = this;
            if (index == _this.sortUDindex) {
                _this.imgIndex = (_this.imgIndex + 1) % _this.bgImg.length;
            } else {
                _this.imgIndex = 0;
            }
            this.sortUDindex = index;
            if (_this.sortUDindex == "0") {
                _this.sort = _this.imgIndex == "0" ? "agency_id" : "-agency_id";
            } else if (_this.sortUDindex == "1") {
                _this.sort = _this.imgIndex == "0" ? "nickname" : "-nickname";
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

        // 跳转新增代理页面
        goAddAgent() {
            this.$router.push({
                name: "addAgent"
            });
        }
    },

    watch: {
        // ====================5.监听层级,筛选框====================
        optionVal(newVal, oldVal) {
            this.inputVal = newVal == 0 ? "" : this.inputVal;
            this.isdisable = newVal == 0 ? true : false;
            this.placeholderVal = newVal == 0 ? "点击查询查看所有" : "请输入搜索值";
        },
        agentLevel(newVal, oldVal) {
            this.pageIndex = 1;
            this.getList(true);
        },
        starVal(newVal, oldVal) {
            this.pageIndex = 1;
            this.getList(true);
        }
    },
    computed: {
        imgSrc() {
            //计算图标地址
            return this.bgImg[this.imgIndex];
        }
    },
    activated() {
        var _this = this;
        _this.$refs.scroller.reset();
    }
};
