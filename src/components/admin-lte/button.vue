<template>
    <button
        :class="{btn: true, 'btn-block': block}"
        :type="type"
        :disabled="isDisabled"
    >
        <font-awesome-icon
            v-if="icon"
            class="font-awesome-icon mr-2"
            :icon="['fab', icon]"
        />
        <slot />
        <div v-if="loading" class="spinner-border ml-2" role="status">
            <span class="sr-only">{{ $t('labels.loading') }}</span>
        </div>
    </button>
</template>

<style scoped>
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
}

.spinner-border {
    border-width: 0.15em;
    width: 1rem;
    height: 1rem;
}
</style>

<script>
export default {
    name: 'app-button',
    props: {
        icon: String,
        type: {
            type: String,
            default: 'button'
        },
        block: String,
        theme: String,
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    computed: {
        isDisabled() {
            return this.loading || this.disabled;
        }
    }
};
</script>
