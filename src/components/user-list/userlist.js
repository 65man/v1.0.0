//引入接口
import { lowerAgent } from "../../api/agentModule";

// 引入弹窗交互
import { toastTips, loadingTips } from "../../utils/messageTips.js";

// 引入上下拉刷新
import { loadMore } from "../../utils/loadmore.js";
import {
    TransferDomDirective as TransferDom,
    Flexbox, FlexboxItem, Divider
} from "vux";

export default {
    directives: {
        TransferDom,Flexbox, FlexboxItem, Divider
    },
    data() {
        return {
            isTable: false, //1.显示表格
            listData: "", //1.数据
            pageIndex: 1, //1.页码从第一页开始
            pageCount: 0, //1.总页数
            totalCount: 0, //1.总数量
            optionVal: 1, //2.绑定下拉选项
            selectList: [{
                    //2.下拉选项列表
                    key: "0",
                    value: "所有用户"
                },
                {
                    key: "1",
                    value: "游戏ID"
                }
            ],
            inputVal: "", //2.搜索值
            isDetail: false, //3.显示详情
            detailedData: "", //3.详情数据
            sortUDindex: 2, //4.切换排序
            bgImg: ["up", "down"], //4.切换图片
            imgIndex: 1, //4.图片索引
            sort: "-bind_at", //4.排序规则
            placeholderVal: "请输入搜索值", //5.动态输入提示
            isdisable: true, //5.动态输入锁定
            starttime: '开始时间',
            endtime: '结束时间',
        };
    },
    mounted() {
        // ====================1.首次载入默认数据====================
        this.$store.state.headerTitle = "用户列表";
        loadingTips("加载中");
        this.getList(true);
    },
    methods: {
        // ====================1.获取数据====================
        getList(isEmpty, isPullDown) {
            var _this = this;
            var params = {
                isRole: 1,
                isAgency: 0,
                roleId: _this.optionVal == 1 ? _this.inputVal : "",
                parentNickname: _this.optionVal == 2 ? _this.inputVal : "",
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
            this.sort = "-bind_at";
            this.sortUDindex = 2;
            this.pageIndex = 1;
            this.getList(true);
        },

        // ====================3.详情====================
        openDetail(index) {
            var _this = this;
            _this.detailedData = _this.listData[index];
            _this.isDetail = true;
            console.log(this.$store.state.addAgentInfo);
            console.log(this.listData[index].role_id);
            this.$store.state.addAgentInfo.id = this.listData[index].role_id == ''?'空':this.listData[index].role_id
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
            if (_this.sortUDindex == "0") {
                _this.sort = _this.imgIndex == "0" ? "role_id" : "-role_id";
            } else if (_this.sortUDindex == "1") {
                _this.sort =_this.imgIndex == "0" ? "parent_nickname" : "-parent_nickname";
            } else if (_this.sortUDindex == "2") {
                _this.sort = _this.imgIndex == "0" ? "cost_total" : "-cost_total";
            }else if (_this.sortUDindex == "3") {
                _this.sort = _this.imgIndex == "0" ? "bind_at" : "-bind_at";
            }
            _this.getList(true);
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
        },
        // ====================5.根据时间查询收益====================
        changestarttime(time) {
            console.log(`${this.starttime} 00:00:00:000`);
        },
        changeendtime(time) {
            console.log(`${this.starttime} 00:00:00:000`);
        },
        incomeSearch() {

        },
        tobeAgent(){
            this.$router.push({name:"addAgent"})
        }
    },
    activated() {
        this.$refs.scroller.reset();
    },

    // ====================5.监听层级,筛选框,图片====================
    watch: {
        optionVal(newVal, oldVal) {
            this.inputVal = newVal == 0 ? "" : this.inputVal;
            this.isdisable = newVal == 0 ? true : false;
            this.placeholderVal = newVal == 0 ? "点击查询查看所有" : "请输入搜索值";
        }
    },
    computed: {
        imgSrc() {
            //计算图标地址
            return this.bgImg[this.imgIndex];
        }
    }
};
