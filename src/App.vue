<template>
    <router-view />
    <div class="clearfix" id="blockchain-spinner" :class="spinning == true ? 'show-spinner' : 'hide-spinner'">
        <div class="sk-circle" id="text-spinner">
            <div class="sk-circle-dot"></div>
            <div class="sk-circle-dot"></div>
            <div class="sk-circle-dot"></div>
            <div class="sk-circle-dot"></div>
            <div class="sk-circle-dot"></div>
            <div class="sk-circle-dot"></div>
            <div class="sk-circle-dot"></div>
            <div class="sk-circle-dot"></div>
            <div class="sk-circle-dot"></div>
            <div class="sk-circle-dot"></div>
            <div class="sk-circle-dot"></div>
            <div class="sk-circle-dot"></div>
        </div>
    </div>
</template>

<style>
@import url('https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.3.0/css/flag-icon.min.css');
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700');

@import '~admin-lte/plugins/fontawesome-free/css/all.min.css';
@import '~admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css';
@import '~admin-lte/dist/css/adminlte.min.css';
@import '~vue-toastification/dist/index.css';
@import '~flag-icon-css/css/flag-icons.min.css';
@import '~icheck-bootstrap/icheck-bootstrap.min.css';
@import '/css/spinner.css';

#app {
    width: 100vw;
    height: 100vh;
}

.main-header .navbar-nav .nav-item .nav-link {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
}

.navbar-nav > .user-menu .user-image {
    height: 1.6rem;
    width: 1.6rem;
    margin-right: 0;
    margin-left: -8px;
}

#blockchain-spinner {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(60, 60, 60, 0.5); /* Black background with opacity */
    opacity: 1;
    z-index: 9999; /* Specify a stack order in case you're using a different order for other elements */
    cursor: progress; /* Add a pointer on hover */
}
#text-spinner {
    position: relative;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    width: 3rem;
    height: 3rem;
}
.show-spinner {
    display: block;
}
.hide-spinner {
    display: none;
}
</style>


<script>
import {calculateWindowSize} from '@/utils/helpers';
import { storeComputed } from "@/store/store-helper";

export default {
    watch: {
        currentWindowSize(value) {
            console.log(value);
        }
    },
    computed: {
        ...storeComputed,
        
        currentWindowSize() {
            if (this.$store.getters['ui/screenSize'] !== this.windowSize) {
                this.$store.dispatch('ui/setWindowSize', this.windowSize);
            }
            return this.windowSize;
        },
        windowSize() {
            return calculateWindowSize(this.$windowWidth);
        }
    },
    methods: {}
};
</script>
