<template>
    <!-- Navbar -->
    <nav id="main-header" class="main-header navbar navbar-expand">
        <ul class="navbar-nav">
            <li class="nav-item">
                <button
                    class="nav-link"
                    role="button"
                    @click="onToggleMenuSidebar"
                >
                    <i class="fas fa-bars"></i>
                </button>
            </li>
            <!-- <li class="nav-item d-none d-sm-inline-block">
                <router-link to="/" class="nav-link">{{
                    $t('labels.home')
                }}</router-link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
                <router-link to="/" class="nav-link">{{
                    $t('labels.contact')
                }}</router-link>
            </li> -->
        </ul>

        <ul class="navbar-nav ml-auto">
            <languages-dropdown></languages-dropdown>
            <li class="nav-item">
                <a class="nav-link" role="button" @click="logout">
                    Logout
                </a>
            </li>
            <!-- 
            <messages-dropdown></messages-dropdown>
            <notifications-dropdown></notifications-dropdown>
            <languages-dropdown></languages-dropdown>
            <user-dropdown></user-dropdown>
            <li class="nav-item">
                <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                    <i class="fas fa-expand-arrows-alt"></i>
                </a>
            </li>
            -->
        </ul>
    </nav>
</template>
<style ></style>

<script>
import Languages from '@/components/languages-dropdown.comp.vue';
import AdminMixin from '@/mixins/admin.mixin';

export default {
    mixins: [ AdminMixin ],
    components: {
        'languages-dropdown': Languages
    },
    watch: {
        watchLayoutChanges(value) {},
    },
    data() {
        return {
            headerElement: null,
        };
    },
    computed: {
        watchLayoutChanges() {
            if (!this.headerElement) {
                return;
            }
            this.headerElement.classList.remove('navbar-light');
            this.headerElement.classList.remove('navbar-white');
            this.headerElement.classList.remove('navbar-dark');

            if (this.darkModeSelected) {
                this.headerElement.classList.add('navbar-dark');
            } else {
                this.headerElement.classList.add('navbar-white');
                this.headerElement.classList.add('navbar-light');
            }

            return this.headerElement.classList.value;
        },

        darkModeSelected() {
            return this.$store.getters['ui/darkModeSelected'];
        }
    },

    async mounted() {
        this.headerElement = document.getElementById('main-header');
    },

    methods: {
        onToggleMenuSidebar() {
            this.$emit('toggle-menu-sidebar');
        },

        logout() {
            this.$store.dispatch('auth/logout');
        }
    }
};
</script>
