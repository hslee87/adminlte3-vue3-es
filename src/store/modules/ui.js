import {calculateWindowSize} from '@/utils/helpers';
import debug from 'debug'
const log = debug('state:ui')

export const state = {
    darkMode: true,
    sidebarMenuCollapsed: false,
    screenSize: calculateWindowSize(window.innerWidth)
}

export const getters = {
    darkModeSelected: (state) => state.darkMode,
    sidebarMenuCollapsed: (state) => state.sidebarMenuCollapsed,
    screenSize: (state) => state.screenSize
}

export const mutations = {
    toggleDarkMode: (state) => {
        state.darkMode = !state.darkMode;
    },
    toggleSidebarMenu: (state) => {
        state.sidebarMenuCollapsed = !state.sidebarMenuCollapsed;
    },
    setWindowSize: (state, payload) => {
        state.screenSize = payload;
    }
}

export const actions = {
    init({ commit, state, dispatch }) {
    },
    toggleDarkMode: (context) => {
        context.commit('toggleDarkMode');
    },
    toggleSidebarMenu: (context) => {
        context.commit('toggleSidebarMenu');
    },
    setWindowSize: (context, payload) => {
        context.commit('setWindowSize', payload);
    }
}
