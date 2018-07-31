// ====================弹窗相关====================

import Vue from 'vue'
var _this = Vue;
// alert 弹窗提示
export function alertTips(msg, onHide) {
    _this.$vux.alert.show({
        title: '温馨提示',
        content: msg,
        onShow() {},
        onHide() { typeof onHide == "function" && onHide() }
    })
}
// confirm 弹窗询问
export function confirmTips(msg, onConfirm, onCancel) {
    _this.$vux.confirm.show({
        title: '温馨提示',
        content: msg,
        onConfirm() { typeof onConfirm == "function" && onConfirm() },
        onCancel() { typeof onCancel == "function" && onCancel() }
    })
}
// confirm 弹窗询问
export function confirmDiyTips(msg, onConfirm, onCancel, confirmtext, canceltext) {
    _this.$vux.confirm.show({
        title: '温馨提示',
        content: msg,
        confirmText: confirmtext,
        cancelText: canceltext,
        onConfirm() { typeof onConfirm == "function" && onConfirm() },
        onCancel() { typeof onCancel == "function" && onCancel() }
    })
}

// toast弹窗提示
export function toastTips(type, width, msg) {
    _this.$vux.toast.show({
        text: msg,
        type: type,
        time: '1500',
        width: width,
        onShow() {},
        onHide() {}
    })
}

// loading弹窗提示等待中
export function loadingTips(msg) {
    _this.$vux.loading.show({
        text: msg
    })
}