import Vue from 'vue'
import numeral from 'numeral';
import Big from 'big.js';
import moment from 'moment'
// import { sprintf } from 'sprintf-js'
// import { BIconGear } from 'bootstrap-vue';

moment.locale('ko')

Vue.filter('phoneNumber', function (value) {
    if (!value) return ''

    value = value.trim().replaceAll(/-/, '')
    value = value.substring(0, 3) + '-' + value.substring(3, 7) + '-' + value.substring(7)
    return value;
})


// using numeral.js 
// =================================================
// http://numeraljs.com/
// 
numeral.zeroFormat('0');
numeral.nullFormat('0');

Vue.filter('numeral', function (v, fmt) {
    if (!v) return ''
    if (typeof v != 'string') v = v.toString()
    return numeral(v).format(fmt)
})
Vue.filter('truncate', function (v, stop, clamp) {
    if (!v) return ''
    return v.slice(0, stop) + (stop < v.length ? clamp || '...' : '')
})

Vue.filter('volume', function (v) {
    if (!v) return ''

    let n = Math.abs(Number(v))

    if (n > 1000000000) return numeral(v).divide(1000000000).format('0.00') +  '십억'
    else if (n > 1000000) return numeral(v).divide(1000000).format('0.00') +  '백만'
    else if (n > 1000) return numeral(v).format('0,0')
    else if (n > 1) return numeral(v).format('0[.]00') 
    else if (n < 0.000001) return '0.000000';

    return numeral(v).format('0.0000')
})

Vue.filter('price', function (v, digit) {
    if (!v) return ''

    let n = Math.abs(Number(v))

    if (!digit) {
        if (n > 1000000)return numeral(v).format('0,0')
        else if (n > 1000) return numeral(v).format('0,0.')
        else if (n > 100) return numeral(v).format('0.0[000]') 
        else if (n > 10) return numeral(v).format('0.00[000]') 
        else if (n > 1) return numeral(v).format('0.00[0000]') 
        else if (n > 0.01) return numeral(v).format('0.0000[000]') 
        else return numeral(v).format('0.00000000')
    }
    return new Big(v).round(digit, 0).toFixed()
    // return numeral(v).format('0.00000000')
})

Vue.filter('amount', function (v) {
    if (!v) return ''

    let n = Math.abs(Number(v))

    if (n > 1000000)return numeral(v).format('0,0')
    else if (n > 1000) return numeral(v).format('0,0.')
    else if (n > 100) return numeral(v).format('0.0') 
    else if (n > 10) return numeral(v).format('0.0') 
    else if (n > 1) return numeral(v).format('0.00') 
    else if (n > 0.0001) return numeral(v).format('0.0000') 
    
    return numeral(v).format('0.000000')
})

Vue.filter('fixedAmount', function (v, digit) {
    if (!v) return ''
    if (!digit) digit = 0
    let digitFormat = '0,0.0000000000'.substring(0,digit + 4)
    return numeral(v).format(digitFormat)
})

Vue.filter('percRatio', function (v) {
    if (!v) return ''
    return numeral(v).format('0.00') 
})

Vue.filter('percRatio4', function (v) {
    if (!v) return ''
    return numeral(v).format('0.0000') 
})

Vue.filter('diff-price', function (v) {
    if (!v) return ''

    let n = Math.abs(Number(v))

    if (n > 1000000) return numeral(v).format('0,0')
    else if (n > 1000) return numeral(v).format('0,0.')
    else if (n > 100) return numeral(v).format('0.0[000]') 
    else if (n > 10) return numeral(v).format('0.00[000]') 
    else if (n > 1) return numeral(v).format('0.00[0000]') 
    else if (n >= 0.01) return numeral(v).format('0.00[00000]') 
    else return numeral(v).format('0.00000000')
})

Vue.filter('MsDuration', function (v) {
    if (!v) return ''

    let dur = Math.floor((Date.now() - v) /1000)

    let day = Math.floor(dur / 86400)
    let hour = Math.floor((dur % 86400) / 3600)
    let min = Math.floor((dur % 3600) / 60)
    let sec = Math.floor(dur % 60)

    if (day > 0) return sprintf('%d일 %02d:%02d:%02d', day, hour, min, sec)
    return sprintf('%02d:%02d:%02d', hour, min, sec)
})

Vue.filter('timeDate', function (v) {
    if (!v) return ''
    return moment(v).format('LLL')
})