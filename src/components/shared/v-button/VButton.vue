<template>
    <button :class="['btn', `btn_${variant}`, `btn_${size}`]" @click="$emit('click')">
        <span class="btn-inner">
            <slot name="icon"></slot>
            <slot></slot>
        </span>
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
    variant: 'primary' | 'secondary' | 'start' | 'special'
    size: 'small' | 'medium'
}>()

defineEmits(['click']);
</script>

<style scoped lang="scss">
.btn {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    padding: 48px;
    color: var(--color-white);
    border-radius: 40px;
    font-size: 64px;
    cursor: pointer;

    &-inner {
        display: flex;
        align-items: center;
        margin: 0 auto;
        width: fit-content;
        gap: 24px;
        font-weight: inherit;
    }

    &.btn_small {
        padding: 24px 48px;
        font-size: 48px;
    }

    &_primary {
        background-color: var(--color-beige);
    }

    &_secondary {
        background-color: transparent;
        outline: 12px solid var(--color-beige);
        color: var(--color-beige);
    }

    &_start {
        background-color: var(--color-dark-beige-80);
        outline: 12px solid var(--color-beige);
    }

    &_special {
        background-color: #fff;
        color: var(--color-dark-beige);
    }

    body.contrast &_primary {
        background-color: var(--color-beige-contrast-button);
    }

    body.contrast &_secondary {
        outline-color: var(--color-beige-contrast-button);
        color: var(--color-beige-contrast-button);
    }

    body.contrast &_start {
        outline-color: var(--color-beige-contrast-button);
    }

    body.contrast &_special {
        color: var(--color-dark-beige-contrast);

        * {
            fill: var(--color-dark-beige-contrast);
        }
    }
}
</style>