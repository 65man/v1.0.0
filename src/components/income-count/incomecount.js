//引入接口
import { incomeCount } from "../../api/incomeModule";

// 引入格式化
import { formatToMonth, formatToTimestamp } from "../../utils/format.js";

// 引入弹窗交互
import { loadingTips } from "../../utils/messageTips.js";

// 引入上下拉刷新
import { loadMore } from "../../utils/loadmore.js";

export default {
    data() {
        return {
            isTable: false, //1.展示表格
            listData: "", //1.数据
            pageIndex: 1, //1.页码从第一页开始
            pageCount: 0, //1.总页数
            totalCount: 0, //1.总数量
            dateMonth: "" //2.选择月份
        };
    },
    created() {
        // 获取当前时间渲染页面
        this.dateMonth = formatToMonth();
    },
    mounted() {
        var _this = this;
        _this.$store.state.headerTitle = "收益汇总";
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
            incomeCount(_this.startTime, _this.endTime, "-date_time", _this.pageIndex)
                .then(res => {
                    var list = "";
                    list = res["items"];
                    loadMore(_this, list, res, isEmpty, isPullDown);
                })
                .catch(err => {
                    _this.$vux.loading.hide();
                });
        },

        // ====================2.更改月份触发====================
        changeMonth(value) {
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
    activated() {
        this.$refs.scroller.reset();
    }
};