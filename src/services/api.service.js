/**
 * 이용 방식 : ApiService.get/post('path_to_api', { param data ... })
 * 정상 결과 : Data
 * 오류 리턴 : null
 */
import axios from 'axios'
import env from '@/config/env'

const log = require('debug')('app:api.service')
const isProduction = process.env.NODE_ENV === 'production';

const config = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
}

const ApiService = {
    config,
    token: null
}

axios.defaults.withCredentials = true

// --------------------------------------------------------
// ApiService.setAuthorization = function(token) {
//     if (token) {
//         this.token = token
//         axios.defaults.withCredentials = true
//         axios.defaults.headers.common.Authorization = 'Bearer ' + token
//     } else {
//         this.token = null
//         axios.defaults.withCredentials = false
//         axios.defaults.headers.common.Authorization = ''
//     }
// }

function makeUrl(apiName) {
    let url = env.API_URL

    if (url.slice(-1) != '/') url += '/' // 끝에 / 를 추가

    // 시작 부분에 / 를 제거
    if (apiName.slice(0, 1) == '/') url += apiName.slice(1)
    else url += apiName

    return url
}

function errorHandler(error) {
    // 개발시, 오류 내용을 출력
    if (!isProduction) {
        if (error.response) {
            // 요청이 결과 : NOT 2xx
            log('network api request : reponse error')
            if (error.response.status != 404) {
                // Bad request
                log('Status : %O', error.response.status);
                log('Header : %O', error.response.headers);
                log('Data : %O', error.response.data);
            }
        }
        else if (error.request) {
            // 응답 없음
            log('network api request : no response')
            // console.log(error.request);
        }
        else {
            // 요청 오류
            log('network api request error : %O', error.message)
        }
    }
    return null
}

// POST to API Server
// --------------------------------------------------------
ApiService.post = function(apiName, param, errCallback) {
    let url = makeUrl(apiName)

    return axios.post(url, param, config).then(res => {
        log(`${apiName} : POST response : %O`, res.data)

        if (res.data.ret != 0) {
            log(`ApiService : ${res.data.code}, ${res.data.msg}`)
        }
        return res.data
    }).catch((error) => {
        if (errCallback) errCallback(error.response)
        return errorHandler(error)
    })
}

// GET to API Server
// --------------------------------------------------------
ApiService.get = function(apiName, queryParam, errCallback) {
    let url = makeUrl(apiName)

    return axios.get(url, {
        params: queryParam
    }).then(res => {
        log(`${apiName} : GET response : %O`, res.data)
        return res.data
    }).catch((error) => {
        if (errCallback) errCallback(error.response)
        return errorHandler(error)
    })
}

export default ApiService