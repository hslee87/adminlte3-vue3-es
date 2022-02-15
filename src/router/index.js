
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store/index';

import Main from '@/views/main.vue';

import Dashboard from '@/views/dashboard.vue';
import Blank from '@/views/blank.vue';
import Profile from '@/views/blank.vue';
import SubMenu from '@/views/blank.vue';

import Login from '@/views/login.vue';
// import Register from '@/modules/register/register.vue';
// import ForgotPassword from '@/modules/forgot-password/forgot-password.vue';
// import RecoverPassword from '@/modules/recover-password/recover-password.vue';
// import PrivacyPolicy from '@/modules/privacy-policy/privacy-policy.vue';

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/blank',
                name: 'Blank',
                component: Blank,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/blank2',
                name: 'Blank2',
                component: Blank,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/blank4',
                name: 'Blank4',
                component: Blank,
                meta: {
                    requiresAuth: true
                }
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresUnauth: true
        }
    },
    // {
    //     path: '/register',
    //     name: 'Register',
    //     component: Register,
    //     meta: {
    //         requiresUnauth: true
    //     }
    // },
    // {
    //     path: '/forgot-password',
    //     name: 'ForgotPassword',
    //     component: ForgotPassword,
    //     meta: {
    //         requiresUnauth: true
    //     }
    // },
    // {
    //     path: '/recover-password',
    //     name: 'RecoverPassword',
    //     component: RecoverPassword,
    //     meta: {
    //         requiresUnauth: true
    //     }
    // },
    // {
    //     path: '/privacy-policy',
    //     name: 'RecoverPassword',
    //     component: PrivacyPolicy
    // }
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    linkActiveClass: 'active',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.getters['auth/token']) {
        next('/login');
    } else if (to.meta.requiresUnauth && !!store.getters['auth/token']) {
        next('/');
    } else {
        next();
    }
});

export default router;
