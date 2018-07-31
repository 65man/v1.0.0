// ====================登录相关====================

// 登出
export function loginOut(_this) {
    _this.$router.push({
        name: "blank"
    });
}


// 判断是否是微信客户端
export function isweixin() {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}