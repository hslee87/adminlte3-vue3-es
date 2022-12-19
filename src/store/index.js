import { createStore } from 'vuex'
import modules from './modules'
import dispatchActionForAllModules from './dispatch-action-for-all-modules'

// https://next.vuex.vuejs.org/guide/strict.html
// isStrict should be false in production
let isStrict = process.env.NODE_ENV !== 'production';
isStrict = false;

console.log('--- creating log')
export default createStore({
    state: {
        version: '0.1',
        spinning: false,
    },
    mutations: {
        SET_SPIN(state, value) {
            state.spinning = value ? true : false;
        }
    },
    actions: {
        async init({ commit, state, dispatch }) {
        },
        setSpin({ commit }, isSpin) {
            commit('SET_SPIN', isSpin)
        }
    },
    modules,
    strict: isStrict
})

// Automatically run the `init` action for every module,
// if one exists.
dispatchActionForAllModules('init')
