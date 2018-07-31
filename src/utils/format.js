// ====================格式化数据====================

// 1.时间戳转日期到秒
export function formatToSecond(stampInt) {
    var date = new Date(stampInt);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    m = m <= 9 ? '0' + m : m;
    d = d <= 9 ? '0' + d : d;
    h = h <= 9 ? '0' + h : h;
    mm = mm <= 9 ? '0' + mm : mm;
    ss = ss <= 9 ? '0' + ss : ss;
    return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + ss;
}

// 2.获取当前月份
export function formatToMonth() {
    var now = new Date();
    if ((now.getMonth() + 1) <= 9) {
        var month = now.getFullYear() + '-0' + (now.getMonth() + 1)
    } else {
        var month = now.getFullYear() + '-' + (now.getMonth() + 1)
    }
    return month;
}

// 3.日期转时间戳
export function formatTostamp(DateStr) {
    var stamp = Date.parse(new Date(DateStr))
    return stamp;
}


// 4.传入2018-05，返回第一天，最后一天时间戳
export function formatToTimestamp(time) {
    var arrTime = (time.split('-'));
    var year = arrTime[0];
    var month = arrTime[1].replace(/\b(0+)/gi, "");
    var day = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
        day[2] = 29;
    }
    var start = new Date(time + '-01' + ' 00:00:00:000').getTime() / 1000;
    var end = new Date(time + '-' + day[month] + ' 00:00:00:000').getTime() / 1000;
    var startEndTime = [start, end]
    return startEndTime
}