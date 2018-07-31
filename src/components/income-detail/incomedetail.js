//引入接口
import {
    income,
    performance,
    rebate,
    performanceDetail
} from "../../api/incomeModule";

// 引入格式化
import { formatToMonth } from "../../utils/format.js";

// 引入弹窗交互
import {
    toastTips,
    confirmTips,
    loadingTips
} from "../../utils/messageTips.js";

// 引入上下拉刷新
import { loadMore } from "../../utils/loadmore.js";

import { TransferDomDirective as TransferDom } from "vux";

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
            dateMonth: "", //当前月份
            inputVal: "",  //搜索框的值
            isDialog: false, //弹窗
            isLoading: false, //交互等待
            textLoading: "加载中", //等待文本
            placeholder: "输入用户id搜索", //文本提示
            navIndex: 0, //tab栏
            sort: "-created_at", //4.排序规则
            sortUDindex: 3, //4.切换排序
            bgImg: ["up", "down"], //4.切换图片
            imgIndex: 1, //4.图片索引
            listDetail: {}
        };
    },
    created() {
        // 获取当前时间渲染页面
        this.dateMonth = formatToMonth();
    },
    mounted() {
        var _this = this;
        _this.$store.state.headerTitle = "收益明细";
        // ====================1.首次载入默认数据====================
        loadingTips("加载中");
        _this.getList(true);
    },
    methods: {
        getList(isEmpty, isPullDown) {
            var _this = this;
            if (_this.navIndex == 1) {
                performance(_this.pageIndex,_this.sort,_this.inputVal)
                    .then(res => {
                        _this.$vux.loading.hide();
                        var list = "";
                        list = res["items"];
                        loadMore(_this, list, res, isEmpty, isPullDown);
                    })
                    .catch(err => {
                        _this.$vux.loading.hide();
                    });
            }
            if (_this.navIndex == 0) {
                rebate(_this.pageIndex,_this.sort,_this.inputVal)
                    .then(res => {
                        _this.$vux.loading.hide();
                        var list = "";
                        list = res["items"];
                        loadMore(_this, list, res, isEmpty, isPullDown);
                    })
                    .catch(err => {
                        _this.$vux.loading.hide();
                    });
            }
        },

        // ====================4.排序、上下加载、跳转====================
        //排序
        sortUD(index) {
            console.log('index:'+index);
            var _this = this;

            console.log(index);
            if (index == _this.sortUDindex) {
                _this.imgIndex = _this.imgIndex==0? 1:0;
            } else {
                _this.imgIndex = 0;
            }
            this.sortUDindex = index;


            if (this.navIndex == '0') {
                if (_this.sortUDindex == '0') {
                    _this.sort = _this.imgIndex == '0' ? 'cost_id' : '-cost_id'
                } else if (_this.sortUDindex == '1') {
                    _this.sort = _this.imgIndex == '0' ? 'role_id' : '-role_id';
                } else if (_this.sortUDindex == '2') {
                    _this.sort = _this.imgIndex == '0' ? 'money' : '-money';
                } else if (_this.sortUDindex == '3') {
                    _this.sort = _this.imgIndex == '0' ? 'created_at' : '-created_at';
                }
            }


            if (this.navIndex == '1') {
                if (_this.sortUDindex == '0') {
                    _this.sort = _this.imgIndex == '0' ? 'performance_id' : '-performance_id'
                } else if (_this.sortUDindex == '1') {
                    _this.sort = _this.imgIndex == '0' ? 'lower_nickname' : '-lower_nickname';
                } else if (_this.sortUDindex == '2') {
                    _this.sort = _this.imgIndex == '0' ? 'performance' : '-performance';
                } else if (_this.sortUDindex == '3') {
                    _this.sort = _this.imgIndex == '0' ? 'date_time' : '-date_time';
                }
            }
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
            this.getList(true, true);
        },
        // 1.获取选择的月份
        changeMonth(value) {},
        // 2.发送搜索请求
        sendSearch() {
            this.pageIndex = 1;
            this.getList(true);
        },
        // 点击查看详细
        openDetail(id, index) {
            var _this = this;
            // console.log(index);
            performanceDetail(id).then(res => {
                _this.isDialog = true;
                _this.listData[index]["lower_ratio"] = res["lower_ratio"];
                _this.listData[index]["ratio"] = res["ratio"];
                _this.listDetail = _this.listData[index];
            });
        },
        openIncomeDetail(index){
            var _this = this;
            _this.isDialog = true;
            _this.listDetail = _this.listData[index];
        },
        // tab栏
        tabIndex(index) {
            this.listData=[];
            this.inputVal="";
            this.navIndex = index;
            this.sortUDindex=3;
            index == 0 ?(this.placeholder = "输入用户id搜索") :(this.placeholder = "输入直属代理名称搜索");
            if(index==0){
                this.sort="-created_at";
            }else{
                this.sort="-date_time";
            }
            this.getList(true);
        }
    },
    activated() {
        this.$refs.scroller.reset();
    },
    computed: {
        imgSrc() {
            //计算图标地址
            return this.bgImg[this.imgIndex];
        }
    }
};
