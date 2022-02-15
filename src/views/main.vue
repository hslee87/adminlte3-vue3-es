<template>
    <div class="wrapper">
        <app-header @toggle-menu-sidebar="toggleMenuSidebar"></app-header>
        <menu-sidebar></menu-sidebar>
        <div class="content-wrapper">
            <router-view></router-view>
        </div>
        <app-footer></app-footer>
        <div
            id="sidebar-overlay"
            v-if="screenSize === 'xs' && isSidebarMenuCollapsed"
            @click="toggleMenuSidebar"
        ></div>
    </div>
</template>
<style></style>
<script>
import {Options, Vue} from 'vue-class-component';
import Header from '@/views/header.vue';
import MenuSidebar from '@/views/menu-sidebar.vue';
import Footer from '@/views/footer.vue';
import {getProfile} from '@/services/auth';

export default {
    components: {
        'app-header': Header,
        'menu-sidebar': MenuSidebar,
        'app-footer': Footer
    },
    watch: {
        watchLayoutChanges(value) {
        }
    },
    data() {
        return {
            appElement: null
        };
    },
    async mounted() {
        this.appElement = document.getElementById('app');
        this.appElement.classList.add('sidebar-mini');
        this.appElement.classList.add('layout-fixed');
        try {
            const user = await getProfile();
            this.$store.dispatch('auth/getUser', user);
        } catch (error) {
            this.$store.dispatch('auth/logout');
        }
    },
    unmounted() {
        this.appElement.classList.remove('sidebar-mini');
        this.appElement.classList.remove('layout-fixed');
    },
    computed: {
        darkModeSelected() {
            return this.$store.getters['ui/darkModeSelected'];
        },

        sidebarMenuCollapsed() {
            return this.$store.getters['ui/sidebarMenuCollapsed'];
        },

        screenSize() {
            return this.$store.getters['ui/screenSize'];
        },

        watchLayoutChanges() {
            if (!this.appElement) {
                return;
            }
            this.appElement.classList.remove('dark-mode');
            this.appElement.classList.remove('sidebar-closed');
            this.appElement.classList.remove('sidebar-collapse');
            this.appElement.classList.remove('sidebar-open');

            if (this.darkModeSelected) {
                this.appElement.classList.add('dark-mode');
            }

            if (this.sidebarMenuCollapsed && this.screenSize === 'lg') {
                this.appElement.classList.add('sidebar-collapse');
            } else if (this.sidebarMenuCollapsed && this.screenSize === 'xs') {
                this.appElement.classList.add('sidebar-open');
            } else if (!this.sidebarMenuCollapsed && this.screenSize !== 'lg') {
                this.appElement.classList.add('sidebar-closed');
                this.appElement.classList.add('sidebar-collapse');
            }
            return this.appElement.classList.value;
        }
    },
    methods: {
        toggleMenuSidebar() {
            this.$store.dispatch('ui/toggleSidebarMenu');
        }
    }
};
</script>
