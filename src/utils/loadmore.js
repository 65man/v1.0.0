// ====================vux上下拉刷新相关====================

export function loadMore(_this, list, res, isEmpty, isPullDown = false) {
    if (isEmpty) {
        _this.$vux.loading.hide();
        // 首次载入/下拉重置默认值
        _this.listData = [];
        _this.isTable = false;
        _this.pageCount = res["_meta"].pageCount;
        _this.totalCount = res["_meta"].totalCount;
    }
    if (isEmpty && isPullDown) {
        // 下拉刷新完成终止下拉操作
        _this.$nextTick(() => {
            _this.$refs.scroller.donePulldown();
            _this.$refs.scroller.reset();
        });
        if (_this.pageCount > 1) {
            _this.$refs.scroller.enablePullup();
        }
    }
    _this.isTable = true;
    _this.listData = _this.listData.concat(list);
    // 上拉更新数据
    if (!isEmpty) {
        _this.$nextTick(() => {
            _this.$refs.scroller.donePullup();
            _this.$refs.scroller.reset();
        });
    }
    // 如果当前页面等于总页数,禁用上拉
    if (_this.pageIndex == _this.pageCount || _this.pageCount == 0) {
        _this.$refs.scroller.disablePullup();
    }
}
