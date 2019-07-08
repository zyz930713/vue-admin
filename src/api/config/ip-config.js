'use strict'
/* eslint-disable */

// import baseURL from '@/api'
let apiURL = ''; // 通用接口

// 测试服务器
const test = "https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin";
const normal = "https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin";

let loc = ''
if (typeof window != "undefined") {
    loc = window.location.hostname || window.location.protocol
}
if (process.env.NODE_ENV === 'development' || loc == "file:" || loc == "localhost" ) {
    // 开发服务器
    apiURL = test
} else {
    // 正式服
    apiURL = normal;
}

module.exports = {
    apiURL: apiURL,
}