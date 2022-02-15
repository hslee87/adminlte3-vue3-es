<template>
    <li class="nav-item dropdown" ref="dropdown">
        <button class="nav-link" @click="toggleDropdown">
            <slot name="dropdown-button"></slot>
        </button>

        <app-dropdown-menu v-if="isOpen" :size="size">
            <slot name="dropdown-menu"></slot>
        </app-dropdown-menu>
    </li>
</template>

<style scoped>
</style>

<script>
import DropdownMenu from '@/components/dropdown-menu.comp.vue';

export default {
    name: 'app-dropdown',
    components: {
        'app-dropdown-menu': DropdownMenu
    },
    props: {
        size: String
    },
    data() {
        return {
            dropdownElement: null,
            isOpen: false
        };
    },
    mounted() {
        this.dropdownElement = this.$refs.dropdown; // as HTMLElement;
        document.addEventListener('click', this.documentClick);
    },
    unmounted() {
        document.removeEventListener('click', this.documentClick);
    },
    methods: {
        documentClick(event) {
            const target = event.target; // as HTMLElement;
            if (
                this.dropdownElement !== target &&
                !this.dropdownElement.contains(target)
            ) {
                this.isOpen = false;
            }
        },

        toggleDropdown() {
            this.isOpen = !this.isOpen;
        }
    }
};
</script>
