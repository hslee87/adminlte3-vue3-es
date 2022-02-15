<template>
    <li v-if="menuItem.type !== 'header'" class="nav-item" :class="{'menu-open': isMenuExtended}">
        <a
            class="nav-link"
            :class="{active: isMainActive || isOneOfChildrenActive}"
            @click="handleMainMenuAction"
        >
            <i class="nav-icon" :class="menuItem.icon || 'fab fa-buffer'"></i>
            <p>{{ $t(menuItem.name) }}</p>
            <i v-if="isExpandable" class="right fas fa-angle-left"></i>
        </a>
        <ul class="nav nav-treeview" v-for="item in menuItem.children">
            <li class="nav-item">
                <router-link
                    :to="item.path"
                    class="nav-link"
                    exact
                    exact-active-class="active"
                >
                    <i class="nav-icon" :class="item.icon || 'fa fa-caret-right'"></i>
                    <p>{{ $t(item.name) }}</p>
                </router-link>
            </li>
        </ul>
    </li>
    <li v-else class="nav-header">{{ $t(menuItem.name ) }}</li>
</template>

<style scoped>
.nav-item {
    cursor: pointer;
}
</style>

<script>
export default {
    props: {
        menuItem: Object,
        icon: String,
        type: String,
        placeholder: String,
        autocomplete: String
    },
    data() {
        return {
            // menuItem: null,
            isMenuExtended: false,
            isExpandable: false,
            isMainActive: false,
            isOneOfChildrenActive: false
        };
    },
    mounted() {
        this.isExpandable =
            this.menuItem &&
            this.menuItem.children &&
            this.menuItem.children.length > 0;
        this.calculateIsActive(this.$router.currentRoute.value.path);
        this.$router.afterEach(to => {
            this.calculateIsActive(to.path);
        });
    },
    methods: {
        handleMainMenuAction() {
            if (this.isExpandable) {
                this.toggleMenu();
                return;
            }
            this.$router.replace(this.menuItem.path);
        },

        toggleMenu() {
            this.isMenuExtended = !this.isMenuExtended;
        },

        calculateIsActive(url) {
            this.isMainActive = false;
            this.isOneOfChildrenActive = false;
            if (this.isExpandable) {
                this.menuItem.children.forEach(item => {
                    if (item.path === url) {
                        this.isOneOfChildrenActive = true;
                        this.isMenuExtended = true;
                    }
                });
            } else if (this.menuItem.path === url) {
                this.isMainActive = true;
            }
            if (!this.isMainActive && !this.isOneOfChildrenActive) {
                this.isMenuExtended = false;
            }
        }
    }
};
</script>
