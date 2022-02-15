<template>
<div class="icheck-primary">
    <input
        type="checkbox"
        :id="ID"
        :checked="modelValue"
        @change="onValueChange($event)"
    />
    <label :for="ID">
        <slot />
    </label>
</div>
</template>

<style scoped>
</style>

<script>
import {v4 as uuidv4} from 'uuid';

export default {
    name: 'app-checkbox',
    props: {
        modelValue: Boolean
    },
    emits: ['update:modelValue'],
    data() {
        return {
            ID: '',
        }
    },
    methods: {
        onValueChange(event) {
            this.$emit('update:modelValue', event.target.checked);
        }
    }
}

</script>
