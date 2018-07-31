// ====================正则匹配====================

// 正则匹配规则
const nicknameReg = /^([\u4e00-\u9fa5]|[A-Za-z0-9]){2,12}$/; //匹配代理商名字
const telephoneReg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/; //匹配联系电话
// const phoneReg = /^(1[3-9])\d{9}$/; //匹配手机号
const phoneReg = /^0?(1[3-9])[0-9]{9}$/; //匹配手机号
const passwordReg = /^[A-Za-z0-9]{6,12}$/; //匹配密码
const moneyReg = /^[A-Za-z0-9]{6,12}$/; //匹配提现

// 1.匹配代理商名字
export function checkNickname(nickname) {
    return nicknameReg.test(nickname);
}
// 2.匹配联系电话
export function checkTelephone(telephone) {
    return telephoneReg.test(telephone);
}
// 3.匹配手机号
export function checkPhone(phone) {
    return phoneReg.test(phone);
}
// 4.匹配密码
export function checkPassword(password) {
    return passwordReg.test(password);
}

// ===============封装正则匹配提示===============

// 名字提示
export function nicknameBlurTips(_this, nickname, msg) {
    if (nickname != "") {
        if (!checkNickname(nickname)) {
            _this.nicknameTips = msg;
            _this.isnicknameTips = true;
            return false;
        } else {
            return true;
        }
    }
}

// 联系电话提示
export function telephoneBlurTips(_this, telephone) {
    if (telephone != "") {
        if (!checkTelephone(telephone)) {
            _this.istelephoneTips = true;
        }
    }
}

// 手机号提示
export function phoneBlurTips(_this, phone, msg) {
    if (phone != "") {
        if (!checkPhone(phone)) {
            _this.phoneTips = msg;
            _this.isphoneTips = true;
            return false;
        } else {
            return true;
        }
    }
}

// 一次密码提示
export function passwordBlurTips(_this, password, msg) {
    if (password != "") {
        if (!checkPassword(password)) {
            _this.passwordTips = msg;
            _this.ispasswordTips = true;
        }
    }
}

// 二次密码对比
export function password2BlurTips(_this, password, password2) {
    if (
        password2 != "" &&
        password != "" &&
        password != password2
    ) {
        _this.ispassword2Tips = true;
    }
}