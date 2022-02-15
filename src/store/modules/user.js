import ApiService from '@/services/api.service'
import CryptoJS from 'crypto-js'
import debug from 'debug'
const log = debug('state:user')

const SESSION_TOKEN_KEY = 'sess_token'

export const state = {
    userId: null,   // DB에서 사용하는 user id
    loginId: null,  // 사용자가 입력한 ID (DB에서 사용하는 userId 아님)
    token: null
}

export const getters = {
    isLoggedIn(state) {
        return state.userId != null
    }
}

export const mutations = {
    UPDATE_USER(state, userInfo) {
        state.userId = userInfo.userId
        state.loginId = userInfo.loginId || null
        state.token = userInfo.token
        saveSession(state.token)
    },
    RESET(state) {
        state.userId = null
        state.loginId = null
        state.token = null
        clearSession()
    }
}

export const actions = {
    async init({ commit, state, dispatch }) {
        let token = sessionStorage.getItem(SESSION_TOKEN_KEY)

        if (token) {
            try {
                let userInfo = await ApiService.get('auth/get_userinfo', {token})
                if (userInfo) {
                    // set token too
                    userInfo = Object.assign({token}, userInfo)

                    log('userInfo %O', userInfo)
                    commit('UPDATE_USER', userInfo)

                    return
                }
                else {
                    clearSession()
                    commit('RESET')
                }
            }
            catch(e) {
                log(e)
            }
        }

        // else
        commit('RESET')
    },

    // signin(context, loginData)
    async signin({ commit, state, rootState }, { id, pw }) {
        let data = await requestSignin(id, pw)

        if (data) {
            let userInfo = {
                userId: data.userId,
                loginId: data.loginId,
                token: data.token,
            }
            commit('UPDATE_USER', userInfo)
            return userInfo
        }
        return null
    },
    reset({ commit }) {
        commit('RESET')
    },
    // signout(context)
    async signout({ commit, state, rootState }) {
        await ApiService.get('auth/signout', {})
        commit('RESET')
        return true
    }
}

// user functions
//
function clearSession() {
    log('Clear session token')
    sessionStorage.removeItem(SESSION_TOKEN_KEY)
}

function saveSession(token) {
    log('Saving session token : %O', token)
    sessionStorage.setItem(SESSION_TOKEN_KEY, token)
}

async function requestSignin(id, pw) {
    let pwHash = CryptoJS.SHA256(pw.trim()).toString(CryptoJS.enc.Hex)

    try {
        let data = await ApiService.post('auth/signin', {
            loginId: id,
            hash: pwHash
        })
        log('Login Return : %O', data)
        return data
    } catch (e) {
        log(e)
    }
    return null
}
