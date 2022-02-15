<template>
<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <router-link to="/" class="brand-link">
        <img
            src="/img/metamask-icon.png"
            alt="AdminLTE Logo"
            class="brand-image img-circle elevation-3"
            style="opacity: 0.8"
        />
        <span class="brand-text font-weight-light">Admin</span>
    </router-link>

    <div class="sidebar">
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
                <img
                    src="img/metamask-icon.png"
                    class="img-circle elevation-2"
                    alt="User Image"
                />
            </div>
            <div class="info">
                <span class="text-light text-bold">Address Here</span>
            </div>
        </div>

        <nav class="mt-2">
            <ul
                class="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
            >
                <!-- <li class="nav-item">
                    <router-link
                        to="/"
                        class="nav-link"
                        exact
                        exact-active-class="active"
                    >
                        <i class="nav-icon fas fa-tachometer-alt"></i>
                        <p>{{ $t("labels.dashboard") }}</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link
                        to="/profile"
                        class="nav-link"
                        active-class="active"
                    >
                        <i class="nav-icon fas fa-user"></i>
                        <p>{{ $t("labels.profile") }}</p>
                    </router-link>
                </li> -->
                <app-menu-item
                    v-for="item in menu"
                    :menuItem="item"
                ></app-menu-item>
            </ul>
        </nav>
    </div>
</aside>

</template>
<style></style>
<script>
import {Options, Vue} from 'vue-class-component';
import MenuItem from '@/components/admin-lte/menu-item.vue';

export default  {
    components: {
        'app-menu-item': MenuItem
    },
    data() {
        return {
            menu: MENU,
        }
    },
    computed: {
        user() {
            return this.$store.getters['auth/user'];
        }
    }
}

export const MENU = [
    {
        name: 'labels.dashboard',
        path: '/'
    },
    {
        name: 'labels.coinMenu',
        icon: 'fa fa-coins',
        children: [
            {
                name: 'labels.coinMenu',
                path: '/blank2'
            }
        ]
    },
    {
        name: 'labels.adminMenu4',
        icon: 'fa fa-tenge',
        children: [
            {
                name: 'labels.adminSubMenu41',
                path: '/blank4'
            }
        ]
    }
];

</script>
