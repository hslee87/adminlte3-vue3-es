import { mapState, mapGetters, mapActions } from 'vuex'
import { state } from './'

export const storeComputed = {
    ...mapState({
        version: state => state.version,
        spinning: state => state.spinning,
    }),
    ...mapGetters([
    ])
}

export const storeMethods = mapActions({
    setSpin: 'setSpin',
})
