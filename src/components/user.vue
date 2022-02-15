<template>
    <app-dropdown class="user-menu">
        <template v-slot:dropdown-button>
            <img
                :src="
                    user && user.picture
                        ? user.picture
                        : require('@/assets/img/default-profile.png')
                "
                class="user-image img-circle elevation-2"
                alt="User Image"
            />
        </template>
        <template v-slot:dropdown-menu>
            <button
                @click="logout"
                class="btn btn-default btn-flat float-right"
            >
                {{ $t('labels.signOut') }}
            </button>
        </template>
    </app-dropdown>
</template>

<style lang="scss" scoped>
.user-menu {
    .user-image {
        width: 1.6rem !important;
        height: 1.6rem !important;
    }
    .dropdown-menu {
        width: auto;
    }
}
</style>

<script>
import Dropdown from '@/components/dropdown.comp.vue';

export default {
    name: 'user-dropdown',
    components: {
        'app-dropdown': Dropdown
    },
    computed: {
        user() {
            return this.$store.getters['auth/user'];
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout');
        }
    }
};
</script>
