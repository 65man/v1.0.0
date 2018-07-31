import Vue from "vue";
import store from "../store";
// 时间过滤器,时间戳转日期
Vue.filter("dateFormat", (stampInt, type) => {
    var date = new Date(stampInt);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    m = m <= 9 ? "0" + m : m;
    d = d <= 9 ? "0" + d : d;
    h = h <= 9 ? "0" + h : h;
    mm = mm <= 9 ? "0" + mm : mm;
    ss = ss <= 9 ? "0" + ss : ss;
    if (type == "YYYY-MM-DD HH:mm:ss") {
        return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + ss;
    } else if (type == "YYYY-MM-DD HH:mm") {
        return y + "-" + m + "-" + d + " " + h + ":" + mm;
    } else if (type == "MM-DD") {
        return m + "-" + d;
    } else {
        return y + "-" + m + "-" + d;
    }
});

// 金钱过滤器
Vue.filter("moneyFormat", (s, n, has) => {
    if (s) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s
                .split(".")[0]
                .split("")
                .reverse(),
            r = s.split(".")[1];
        var t = "";
        for (let i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
        }
        if (has == "0") {
            return t
                .split("")
                .reverse()
                .join("");
        } else {
            return (
                t
                    .split("")
                    .reverse()
                    .join("") +
                "." +
                r
            );
        }
    } else {
        return 0;
    }
});

// 金钱过滤器
Vue.filter("levelFormat", level => {
    if (level - store.state.level == 1) {
        return "直属代理";
    } else if (level - store.state.level == 2) {
        return "下2级";
    } else {
        return "其它";
    }
});

// 百分比转换
Vue.filter("percent", num => {
    return num*100 + "%"
    // return num + "%"
});
