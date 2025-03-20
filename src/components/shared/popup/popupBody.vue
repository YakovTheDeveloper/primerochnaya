<template>
    <div :class="['popup-body', $slots.actions && 'popup-body_width']">
        <div v-if="$slots.icon" class="popup-body__icon">
            <slot name="icon"></slot>
        </div>
        <slot></slot>
        <div v-if="$slots.actions" class="popup-body__actions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.popup-body {
    padding: 80px;
    margin: 0 auto;
    background-color: var(--color-light-beige);
    border-radius: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 24px;

    transition: all 0.5s ease-in-out;

    &_width {
        width: 1326px;
        max-width: 1326px;
    }

    &__icon {
        margin-bottom: 24px;
        color: var(--color-dark-beige);
    }

    &__actions {
        width: 100%;
        display: flex;
        gap: 24px;
        margin-top: 24px;

        >* {
            flex-grow: 1;
            flex-basis: 0;
        }

        > :only-child {
            flex-basis: 100%;
        }
    }

    body.contrast &__icon {
        color: var(--color-dark-beige-contrast);
    }

}
</style>