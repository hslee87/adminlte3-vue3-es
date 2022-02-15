<template>
    <div
        ref="dropdownMenu"
        class="dropdown-menu dropdown-menu-right show"
        :class="`dropdown-menu-${size}`"
        :style="fixStyles"
    >
        <slot></slot>
    </div>
</template>

<style scoped>
</style>

<script>
export default {
    name: 'app-dropdown-menu',
    props: {
        size: String
    },
    data() {
        return {
            dropdownMenuElement: null
        };
    },
    mounted() {
        this.dropdownMenuElement = this.$refs.dropdownMenu; // as HTMLElement;
    },
    computed: {
        fixStyles() {
            if (this.dropdownMenuElement) {
                const windowWidth = document.getElementById('app').offsetWidth;
                const offsetLeft = this.dropdownMenuElement.getBoundingClientRect()
                    .left;
                const offsetWidth = this.dropdownMenuElement.offsetWidth;
                const visiblePart = windowWidth - offsetLeft;

                if (offsetLeft < 0) {
                    return {
                        left: 'inherit',
                        right: `${offsetLeft - 5}px`
                    };
                } else if (visiblePart < offsetWidth) {
                    return {left: 'inherit', right: `0px`};
                }
                return {left: 'inherit', right: `0px`};
            }
            return {left: 'inherit', right: `0px`};
        }
    }
};
</script>
