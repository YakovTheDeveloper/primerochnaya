<template>
    <input ref="nativeInput" type="text" class="input" :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
defineProps<{ modelValue: string }>();
const emit = defineEmits(['update:modelValue']);
const nativeInput = ref<HTMLInputElement | null>(null);
defineExpose({
    nativeInput
});
</script>

<style scoped lang="scss">
.input {
    padding: 48px;
    color: var(--color-dark-beige);
    border: 12px solid var(--color-beige-alpha);
    width: 100%;
    font-size: 64px;
    border-radius: 40px;

    outline-color: var(--color-beige);

    &:focus {
        border-color: var(--color-beige);
        background-color: var(--color-light-beige);
    }

    &::placeholder {
        color: var(--color-beige);
        font-weight: 700;
    }
}
</style>