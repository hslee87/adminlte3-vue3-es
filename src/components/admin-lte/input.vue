<template>
<div class="input-group">
    <input
        :type="type"
        class="form-control"
        :placeholder="placeholder"
        :value="modelValue"
        :autocomplete="autocomplete"
        @change="onValueChange($event)"
    />
    <div v-if="icon" class="input-group-append">
        <div class="input-group-text">
            <font-awesome-icon :icon="icon" />
        </div>
    </div>
</div>

</template>

<style scoped>

</style>

<script>

export default {
    name: 'app-input',
    props: {
        modelValue: String,
        icon: String,
        type: String,
        placeholder: String,
        autocomplete: String
    },
    emits: ['update:modelValue'],
    setup() {
    },
    data() {
        return {
        }
    },
    methods: {
        onValueChange(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    },
}
</script>
