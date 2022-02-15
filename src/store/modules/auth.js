import router from '@/router/index';
const log = require('debug')('store:auth');

export const state = {
    token: localStorage.getItem('gatekeeper_token'),
    user: null
}


export const getters = {
    user: (state) => state.user,
    token: (state) => state.token
}

export const mutations = {
    setToken: (state, payload) => {
        state.token = payload;
    },
    setUser: (state, payload) => {
        state.user = payload;
    }
}

export const actions = {
    login: (context, payload) => {
        context.commit('setToken', payload);
        router.replace('/');
    },
    getUser: (context, payload) => {
        context.commit('setUser', payload);
    },
    logout: (context) => {
        context.commit('setToken', null);
        context.commit('setUser', null);
        localStorage.removeItem('gatekeeper_token');
        router.replace('/login');
    }
}
