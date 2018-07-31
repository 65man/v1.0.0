import Cookies from 'js-cookie'

export function getCookie(name) {
    return Cookies.get(name)
}

export function setCookie(name, value, time) {
    return Cookies.set(name, value, { expires: time })
}

export function clearCookie(name) {
    return Cookies.remove(name)
}