
const url = new URL(window.location)

const isProduction = process.env.NODE_ENV == 'production' ? true : false

let apiUrl = url.protocol + '//' + url.hostname + ':8080/api/'

if (isProduction) {
    apiUrl = `${url.protocol}//${url.hostname}:${url.port}/api/`
}

const env = {
    isProduction,
    API_URL: apiUrl
}

module.exports = env